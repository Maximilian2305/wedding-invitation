import { isAdmin } from "../../../../lib/adminAuth";
import { giftItems } from "../../../../lib/giftsConfig";
import { formatDate, getAdminData } from "../../../../lib/supabaseAdmin";

// Wraps a value for CSV and blocks spreadsheet formulas
function cell(value: unknown): string {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^(?:[=@\t\r]|[+\-](?!\d))/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(rows: unknown[][]): string {
  // The first character helps Excel read special letters correctly
  return "\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  if (!(await isAdmin())) {
    return new Response("Not allowed", { status: 401 });
  }

  const { type } = await params;
  if (type !== "gifts") {
    return new Response("Not found", { status: 404 });
  }

  const { gifts, error } = await getAdminData();
  if (error) {
    return new Response("Could not load the data", { status: 500 });
  }

  const nameById = new Map(
    giftItems.map((item): [string, string] => [item.id, item.name]),
  );

  const rows: unknown[][] = [
    ["Date", "Name", "Email", "Gifts", "Coming with", "Transfer made", "Amount", "Note"],
    ...gifts.map((row) => [
      formatDate(row.created_at),
      row.name,
      row.email,
      row.gifts.map((id) => nameById.get(id) ?? id).join("; "),
      row.companions,
      row.transfer_made ? "Yes" : "No",
      row.amount ?? "",
      row.message ?? "",
    ]),
  ];

  return new Response(toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="guest-gifts.csv"',
      "Cache-Control": "no-store",
    },
  });
}