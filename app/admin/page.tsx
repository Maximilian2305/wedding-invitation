import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { isAdmin } from "../../lib/adminAuth";
import { giftCategories, giftItems } from "../../lib/giftsConfig";
import {
  formatDate,
  getAdminData,
  type GiftRow,
} from "../../lib/supabaseAdmin";
import { wedding } from "../../lib/wedding";
import { loginAdmin, logoutAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Guest list",
  robots: { index: false, follow: false },
};

const buttonClass =
  "inline-block border border-gold px-5 py-3 font-sans text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ivory";
const thClass =
  "pb-3 pr-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted";
const tdClass =
  "border-t border-gold/20 py-3 pr-4 align-top font-sans text-sm text-ink";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-gold/30 bg-ivory p-5 text-center">
      <p className="font-serif text-4xl text-ink">{value}</p>
      <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}

export default function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-svh flex-1 items-center justify-center bg-cream px-6">
          <p className="font-sans text-sm text-muted">Loading...</p>
        </main>
      }
    >
      <AdminContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: loginError } = await searchParams;

  // Login screen
  if (!(await isAdmin())) {
    return (
      <main className="flex min-h-svh flex-1 items-center justify-center bg-cream px-6 py-16">
        <form
          action={loginAdmin}
          className="w-full max-w-sm space-y-6 border border-gold/30 bg-ivory p-8 text-center"
        >
          <p className="font-script text-4xl text-gold">
            {wedding.partner1} &amp; {wedding.partner2}
          </p>
          <h1 className="font-serif text-3xl text-ink">Guest list</h1>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            className="w-full border-b border-gold/40 bg-transparent px-1 py-3 text-center font-sans text-base text-ink outline-none transition-colors focus:border-gold"
          />
          {loginError && (
            <p role="alert" className="font-sans text-sm text-red-700">
              That password is not correct.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gold px-6 py-3 font-sans text-sm uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-ink"
          >
            Open
          </button>
        </form>
      </main>
    );
  }

  const { gifts, error } = await getAdminData();

  const nameById = new Map(
    giftItems.map((item): [string, string] => [item.id, item.name]),
  );

  // Which guests chose which gift
  const whoByGift = new Map<string, GiftRow[]>();
  for (const row of gifts) {
    for (const id of row.gifts) {
      const list = whoByGift.get(id) ?? [];
      list.push(row);
      whoByGift.set(id, list);
    }
  }

  const giftsChosen = gifts.reduce((sum, row) => sum + row.gifts.length, 0);
  const transfers = gifts.filter((row) => row.transfer_made).length;
  const extraPeople = gifts.reduce((sum, row) => sum + row.companions, 0);
  const notChosen = giftItems
    .filter((item) => !whoByGift.has(item.id))
    .map((item) => item.name);

  return (
    <main className="flex-1 bg-cream px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-script text-4xl text-gold">
              {wedding.partner1} &amp; {wedding.partner2}
            </p>
            <h1 className="font-serif text-4xl text-ink">Guest list</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/export/gifts" className={buttonClass}>
              Download CSV
            </Link>
            <form action={logoutAdmin}>
              <button type="submit" className={buttonClass}>
                Log out
              </button>
            </form>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 border border-red-300 bg-red-50 p-4 font-sans text-sm text-red-800"
          >
            Could not load some data: {error}
          </p>
        )}

        {/* Numbers */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat label="Responses" value={gifts.length} />
          <Stat label="Gifts chosen" value={giftsChosen} />
          <Stat label="Transfers marked" value={transfers} />
          <Stat label="Extra people coming" value={extraPeople} />
        </div>

        {/* Gifts and who chose them */}
        <section className="mt-14">
          <h2 className="font-serif text-3xl text-ink">Gifts and who chose them</h2>

          {giftsChosen === 0 && (
            <p className="mt-4 font-sans text-sm text-muted">
              No gifts chosen yet.
            </p>
          )}

          {giftCategories.map((category) => {
            const chosenItems = giftItems.filter(
              (item) =>
                item.category === category &&
                (whoByGift.get(item.id)?.length ?? 0) > 0,
            );
            if (chosenItems.length === 0) return null;

            return (
              <div key={category} className="mt-8">
                <h3 className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-gold">
                  {category}
                </h3>
                <ul className="grid gap-4 md:grid-cols-2">
                  {chosenItems.map((item) => {
                    const guests = whoByGift.get(item.id) ?? [];
                    return (
                      <li key={item.id} className="border border-gold/30 bg-ivory p-5">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="font-serif text-xl text-ink">{item.name}</p>
                          <span className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-gold">
                            {guests.length} {guests.length === 1 ? "guest" : "guests"}
                          </span>
                        </div>
                        <ul className="mt-3 space-y-1 font-sans text-sm text-muted">
                          {guests.map((guest) => (
                            <li key={guest.id}>
                              {guest.name}
                              {guest.companions > 0 ? ` (+${guest.companions})` : ""}
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {giftsChosen > 0 && notChosen.length > 0 && (
            <p className="mt-8 font-sans text-sm leading-relaxed text-muted">
              <span className="uppercase tracking-[0.2em] text-gold">
                Not chosen yet:
              </span>{" "}
              {notChosen.join(", ")}
            </p>
          )}
        </section>

        {/* Everyone who registered */}
        <section className="mt-14">
          <h2 className="font-serif text-3xl text-ink">Everyone who registered</h2>
          <div className="mt-4 overflow-x-auto border border-gold/30 bg-ivory p-4">
            {gifts.length === 0 ? (
              <p className="font-sans text-sm text-muted">No responses yet.</p>
            ) : (
              <table className="w-full min-w-[820px] text-left">
                <thead>
                  <tr>
                    <th className={thClass}>Date</th>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Email</th>
                    <th className={thClass}>Gifts</th>
                    <th className={thClass}>Coming with</th>
                    <th className={thClass}>Transfer</th>
                    <th className={thClass}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {gifts.map((row) => (
                    <tr key={row.id}>
                      <td className={tdClass}>{formatDate(row.created_at)}</td>
                      <td className={tdClass}>{row.name}</td>
                      <td className={tdClass}>{row.email}</td>
                      <td className={tdClass}>
                        {row.gifts.map((id) => nameById.get(id) ?? id).join(", ") ||
                          "None"}
                      </td>
                      <td className={tdClass}>{row.companions}</td>
                      <td className={tdClass}>
                        {row.transfer_made
                          ? `Yes${row.amount ? `, ${row.amount}` : ""}`
                          : "No"}
                      </td>
                      <td className={`${tdClass} max-w-xs whitespace-pre-line`}>
                        {row.message ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}