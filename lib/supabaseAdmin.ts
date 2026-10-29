import { createClient } from "@supabase/supabase-js";

export type GiftRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  gifts: string[];
  companions: number;
  transfer_made: boolean;
  amount: string | null;
  message: string | null;
};

export function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-GB", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export async function getAdminData(): Promise<{
  gifts: GiftRow[];
  error: string | null;
}> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    return {
      gifts: [],
      error: "SUPABASE_URL or SUPABASE_SECRET_KEY is missing in .env.local.",
    };
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { data, error } = await supabase
    .from("gift_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Admin data error:", error.message);

  return {
    gifts: (data ?? []) as GiftRow[],
    error: error?.message ?? null,
  };
}