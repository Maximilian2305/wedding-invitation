import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.error("Supabase keys are missing. Check your .env.local file.");
    return null;
  }

  return createClient(url, key, { auth: { persistSession: false } });
}