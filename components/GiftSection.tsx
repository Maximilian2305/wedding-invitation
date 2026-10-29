"use client";

import { useState, type FormEvent } from "react";
import { submitGiftResponse } from "../app/gift-actions";
import type { GiftItem } from "../lib/giftsConfig";

type DonationInfo = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  note: string;
};

const fieldClass =
  "w-full border-b border-gold/40 bg-transparent px-1 py-3 font-sans text-base text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-gold";

const labelClass =
  "block font-sans text-xs uppercase tracking-[0.25em] text-muted";

export default function GiftSection({
  items,
  categories,
  donation,
}: {
  items: GiftItem[];
  categories: string[];
  donation: DonationInfo;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showAccount, setShowAccount] = useState(false);
  const [transferMade, setTransferMade] = useState(false);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({
    name: "",
    gifts: [] as string[],
    transfer: false,
    companions: 0,
  });

  const selectedNames = items
    .filter((item) => selected.includes(item.id))
    .map((item) => item.name);

  function toggleGift(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(donation.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (selected.length === 0 && !transferMade) {
      setError("Please choose a gift, or tick that you have made a transfer.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    selected.forEach((id) => formData.append("gifts", id));
    if (transferMade) {
      formData.set("transfer_made", "on");
      formData.set("amount", amount);
    }

    setSummary({
      name: String(formData.get("name") ?? ""),
      gifts: selectedNames,
      transfer: transferMade,
      companions: Number(formData.get("companions") ?? 0),
    });
    setStatus("sending");

    try {
      const result = await submitGiftResponse(formData);
      if (result.ok) {
        setStatus("sent");
      } else {
        setError(result.error);
        setStatus("idle");
      }
    } catch {
      setError("Could not send. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-xl border border-gold/40 bg-cream p-10 text-center">
        <p className="font-script text-5xl text-gold">Thank you</p>
        <p className="mt-4 font-serif text-xl text-ink">
          {summary.name}, we are so grateful for your love.
        </p>
        {summary.gifts.length > 0 && (
          <p className="mt-4 font-sans text-base text-muted">
            Your gifts: {summary.gifts.join(", ")}.
          </p>
        )}
        {summary.transfer && (
          <p className="mt-2 font-sans text-base text-muted">
            Thank you for your transfer. We will confirm it on our side.
          </p>
        )}
        {summary.companions > 0 && (
          <p className="mt-2 font-sans text-base text-muted">
            We have noted {summary.companions}{" "}
            {summary.companions === 1 ? "person" : "people"} coming with you.
          </p>
        )}
      </div>
    );
  }

  const choiceText =
    [
      selected.length > 0
        ? `${selected.length} gift${selected.length > 1 ? "s" : ""} chosen`
        : "",
      transferMade ? "transfer confirmed" : "",
    ]
      .filter(Boolean)
      .join(" and ") || "Choose a gift or send a transfer, then add your details.";

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      {/* Spam trap. Guests never see this field. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Gift list */}
      <div>
        <h3 className="text-center font-serif text-3xl text-ink">
          Choose your gifts
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-center font-sans text-base text-muted">
          Tap one gift or many. Other guests can choose the same gifts too.
        </p>

        {categories.map((category) => {
          const group = items.filter((item) => item.category === category);
          if (group.length === 0) return null;

          return (
            <div key={category} className="mt-10">
              <h4 className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-gold">
                {category}
              </h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                {group.map((item) => {
                  const isSelected = selected.includes(item.id);

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => toggleGift(item.id)}
                        className={`flex h-full w-full items-start justify-between gap-4 border p-5 text-left transition-colors ${
                          isSelected
                            ? "border-gold bg-gold/10"
                            : "border-gold/30 bg-cream hover:border-gold"
                        }`}
                      >
                        <span>
                          <span className="block font-serif text-xl text-ink">
                            {item.name}
                          </span>
                          <span className="mt-1 block font-sans text-sm text-muted">
                            {item.description}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center border text-sm ${
                            isSelected
                              ? "border-gold bg-gold text-ivory"
                              : "border-gold/40 text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Donation */}
      <div className="mx-auto max-w-xl border border-gold/30 bg-cream p-6 text-center sm:p-10">
        <h3 className="font-serif text-3xl text-ink">Send a monetary gift</h3>
        <p className="mt-3 font-sans text-base text-muted">
          Prefer to give by bank transfer? Tap the button to see our account
          details.
        </p>

        <button
          type="button"
          onClick={() => setShowAccount((value) => !value)}
          aria-expanded={showAccount}
          className="mt-6 bg-gold px-8 py-4 font-sans text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-ink"
        >
          {showAccount ? "Hide account details" : "Donate"}
        </button>

        {showAccount && (
          <div className="mt-8 space-y-6 text-left">
            <div className="space-y-5 border-y border-gold/30 py-6 text-center">
              <div>
                <p className={labelClass}>Bank</p>
                <p className="mt-1 font-serif text-2xl text-ink">
                  {donation.bankName}
                </p>
              </div>
              <div>
                <p className={labelClass}>Account name</p>
                <p className="mt-1 font-serif text-2xl text-ink">
                  {donation.accountName}
                </p>
              </div>
              <div>
                <p className={labelClass}>Account number</p>
                <p className="mt-1 font-serif text-3xl tracking-widest text-ink tabular-nums">
                  {donation.accountNumber}
                </p>
                <button
                  type="button"
                  onClick={copyAccountNumber}
                  className="mt-3 border border-gold px-5 py-2 font-sans text-xs uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-ivory"
                >
                  {copied ? "Copied" : "Copy number"}
                </button>
              </div>
            </div>

            <p className="text-center font-serif text-lg italic text-ink/70">
              {donation.note}
            </p>

            <label className="flex cursor-pointer items-start gap-3 border border-gold/40 bg-ivory p-4">
              <input
                type="checkbox"
                checked={transferMade}
                onChange={(event) => setTransferMade(event.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#b08d57]"
              />
              <span className="font-sans text-base text-ink">
                I have made the transfer
              </span>
            </label>

            {transferMade && (
              <div>
                <label htmlFor="amount" className={labelClass}>
                  Amount sent (optional)
                </label>
                <input
                  id="amount"
                  type="text"
                  maxLength={40}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="For example ₦50,000"
                  className={fieldClass}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guest details */}
      <div className="mx-auto max-w-xl space-y-8">
        <h3 className="text-center font-serif text-3xl text-ink">
          Your details
        </h3>

        <div>
          <label htmlFor="gift-name" className={labelClass}>
            Full name
          </label>
          <input
            id="gift-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="gift-email" className={labelClass}>
            Email
          </label>
          <input
            id="gift-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="gift-companions" className={labelClass}>
            People coming with you
          </label>
          <select
            id="gift-companions"
            name="companions"
            defaultValue="0"
            className={`${fieldClass} cursor-pointer`}
          >
            {Array.from({ length: 11 }, (_, n) => n).map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "Just me" : n === 1 ? "1 person" : `${n} people`}
              </option>
            ))}
          </select>
          <p className="mt-2 font-sans text-sm text-muted">
            Please do not count yourself.
          </p>
        </div>

        <div>
          <label htmlFor="gift-message" className={labelClass}>
            A note for the couple (optional)
          </label>
          <textarea
            id="gift-message"
            name="message"
            rows={3}
            maxLength={1000}
            placeholder="Share a few kind words"
            className={`${fieldClass} resize-none`}
          />
        </div>

        {selectedNames.length > 0 && (
          <p className="text-center font-sans text-sm leading-relaxed text-muted">
            Your gifts: {selectedNames.join(", ")}
          </p>
        )}

        <p className="text-center font-serif text-lg italic text-muted">
          {choiceText}
        </p>

        {error && (
          <p role="alert" className="text-center font-sans text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-gold px-8 py-4 font-sans text-sm uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-ink disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Confirm and reserve"}
        </button>
      </div>
    </form>
  );
}