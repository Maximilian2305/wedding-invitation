"use client";

import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full border-b border-gold/40 bg-transparent px-1 py-3 font-sans text-base text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-gold";

const labelClass =
  "block font-sans text-xs uppercase tracking-[0.25em] text-muted";

export default function RsvpForm({ deadline }: { deadline: string }) {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [guestName, setGuestName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setStatus("sending");
    setGuestName(String(data.name ?? ""));

    // Local test only. We will replace this with Supabase later.
    console.log("RSVP received (local test):", data);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-gold/40 bg-ivory p-10 text-center">
        <p className="font-script text-5xl text-gold">Thank you</p>
        <p className="mt-4 font-serif text-xl text-ink">
          {attending === "yes"
            ? `We can’t wait to celebrate with you, ${guestName}.`
            : `We will miss you, ${guestName}, and thank you for letting us know.`}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 border border-gold/30 bg-ivory p-6 sm:p-10"
    >
      <p className="text-center font-serif text-lg italic text-muted">
        Kindly reply by {deadline}
      </p>

      <div>
        <label htmlFor="name" className={labelClass}>
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 ..."
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Will you attend?</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { value: "yes", text: "Joyfully accepts" },
            { value: "no", text: "Regretfully declines" },
          ].map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer border px-4 py-3 text-center font-sans text-sm transition-colors ${
                attending === option.value
                  ? "border-gold bg-gold text-ivory"
                  : "border-gold/40 text-ink hover:border-gold"
              }`}
            >
              <input
                type="radio"
                name="attending"
                value={option.value}
                checked={attending === option.value}
                onChange={() => setAttending(option.value as "yes" | "no")}
                className="sr-only"
              />
              {option.text}
            </label>
          ))}
        </div>
      </fieldset>

      {attending === "yes" && (
        <div>
          <label htmlFor="guests" className={labelClass}>
            Number of guests (including you)
          </label>
          <select
            id="guests"
            name="guests"
            defaultValue="1"
            className={`${fieldClass} cursor-pointer`}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className={labelClass}>
          A message for the couple (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Share a wish or a memory"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold px-8 py-4 font-sans text-sm uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-ink disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send RSVP"}
      </button>
    </form>
  );
}