"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  SESSION_SECONDS,
  createSessionToken,
  passwordMatches,
} from "../../lib/adminAuth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!passwordMatches(password)) {
    // A short pause makes password guessing slower
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redirect("/admin?error=1");
  }

  const token = createSessionToken();
  if (!token) redirect("/admin?error=1");

  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { path: "/admin", maxAge: 0 });
  redirect("/admin");
}