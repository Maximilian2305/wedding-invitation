"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculate(target: number): TimeLeft {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

type CountdownProps = {
  targetDate: string;
  /** Use light text, for dark or video backgrounds */
  light?: boolean;
};

export default function Countdown({ targetDate, light = false }: CountdownProps) {
  // Starts empty so the server and browser show the same thing at first
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => setTime(calculate(target));

    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [targetDate]);

  const items = [
    { label: "Days", value: time?.days },
    { label: "Hours", value: time?.hours },
    { label: "Minutes", value: time?.minutes },
    { label: "Seconds", value: time?.seconds },
  ];

  const boxClass = light
    ? "border border-ivory/40 bg-black/25 py-3 backdrop-blur-sm sm:py-5"
    : "border border-gold/40 bg-ivory/70 py-3 backdrop-blur-sm sm:py-5";

  const numberClass = light ? "text-ivory" : "text-ink";
  const labelClass = light ? "text-ivory/80" : "text-muted";

  return (
    <div
      className="mx-auto grid max-w-xl grid-cols-4 gap-2 sm:gap-6"
      aria-label="Countdown to the wedding"
    >
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className={boxClass}>
            <span
              className={`block font-serif text-3xl font-light tabular-nums sm:text-5xl ${numberClass}`}
            >
              {item.value === undefined
                ? "00"
                : String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span
            className={`mt-2 block font-sans text-[10px] uppercase tracking-[0.25em] sm:text-xs ${labelClass}`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}