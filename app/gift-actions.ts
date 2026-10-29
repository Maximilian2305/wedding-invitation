"use server";

import { giftItems } from "../lib/giftsConfig";
import { getSupabase } from "../lib/supabase";

export type GiftResult = { ok: true } | { ok: false; error: string };

export async function submitGiftResponse(
  formData: FormData,
): Promise<GiftResult> {
  // Hidden spam trap. Real guests leave it empty.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { ok: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const amount = String(formData.get("amount") ?? "").trim();
  const companions = Number(formData.get("companions") ?? 0);
  const transferMade = formData.get("transfer_made") === "on";
  const gifts = Array.from(new Set(formData.getAll("gifts").map(String)));

  if (!name || !email) {
    return { ok: false, error: "Please enter your name and email." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (name.length > 100 || email.length > 200 || amount.length > 40) {
    return { ok: false, error: "One of your answers is too long." };
  }
  if (message.length > 1000) {
    return { ok: false, error: "Your message is too long." };
  }
  if (!Number.isInteger(companions) || companions < 0 || companions > 20) {
    return {
      ok: false,
      error: "Please choose a valid number of people coming with you.",
    };
  }

  const validIds = new Set(giftItems.map((item) => item.id));
  if (gifts.length > 40 || gifts.some((id) => !validIds.has(id))) {
    return { ok: false, error: "One of the gifts you chose is not on the list." };
  }
  if (gifts.length === 0 && !transferMade) {
    return {
      ok: false,
      error: "Please choose a gift, or tick that you have made a transfer.",
    };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return {
      ok: false,
      error: "This page is not ready yet. Please try again later.",
    };
  }

  const { error } = await supabase.from("gift_responses").insert({
    name,
    email,
    gifts,
    companions,
    transfer_made: transferMade,
    amount: transferMade && amount ? amount : null,
    message: message || null,
  });

  if (error) {
    console.error("Supabase error:", error.message);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}