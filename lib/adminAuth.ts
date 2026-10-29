import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

export const ADMIN_COOKIE = "admin_session";
export const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Checks the typed password without leaking timing information */
export function passwordMatches(input: string): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;

  const a = createHmac("sha256", "compare").update(input).digest();
  const b = createHmac("sha256", "compare").update(secret).digest();
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string | null {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;

  const expires = String(Date.now() + SESSION_SECONDS * 1000);
  return `${expires}.${sign(expires, secret)}`;
}

function isValidToken(token: string | undefined): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;

  const expiresAt = Number(expires);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = Buffer.from(sign(expires, secret));
  const actual = Buffer.from(signature);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function isAdmin(): Promise<boolean> {
  // Wait for a real visitor before using the current time
  await connection();

  const store = await cookies();
  return isValidToken(store.get(ADMIN_COOKIE)?.value);
}