"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Stage = "closed" | "opening" | "reveal" | "gone";

type EnvelopeIntroProps = {
  partner1: string;
  partner2: string;
  dateLong: string;
  /** Background music, for example "/audio/wedding-song.mp3" */
  musicSrc?: string;
  children: ReactNode;
};

export default function EnvelopeIntro({
  partner1,
  partner2,
  dateLong,
  musicSrc,
  children,
}: EnvelopeIntroProps) {
  const [stage, setStage] = useState<Stage>("closed");
  const [playing, setPlaying] = useState(false);
  const [musicFailed, setMusicFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const locked = stage === "closed" || stage === "opening";

  // Always start at the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Stop the page from scrolling while the envelope is closed
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  // Move from one stage to the next after a delay
  useEffect(() => {
    const steps: Partial<Record<Stage, [Stage, number]>> = {
      opening: ["reveal", 2600],
      reveal: ["gone", 1200],
    };
    const next = steps[stage];
    const id = next ? setTimeout(() => setStage(next[0]), next[1]) : undefined;

    return () => {
      if (id) clearTimeout(id);
    };
  }, [stage]);

  function open() {
    if (stage !== "closed") return;
    setStage("opening");

    // Browsers only allow sound after a tap, so the music starts here
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  return (
    <>
      {/* The real website. It stays locked until the envelope opens. */}
      <div
        className={`flex flex-1 flex-col ${locked ? "intro-locked" : ""}`}
        inert={locked}
      >
        {children}
      </div>

      {/* Background music */}
      {musicSrc && (
        <audio
          ref={audioRef}
          src={musicSrc}
          loop
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setMusicFailed(true)}
        />
      )}

      {musicSrc && !musicFailed && stage !== "closed" && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? "Turn music off" : "Turn music on"}
          className="fixed bottom-5 left-5 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-gold-light/60 bg-burgundy-dark/70 text-gold-light backdrop-blur-sm transition-colors hover:bg-gold hover:text-burgundy-dark"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            {playing ? (
              <>
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 5.5a9 9 0 0 1 0 13" />
              </>
            ) : (
              <path d="m16 9 5 6m0-6-5 6" />
            )}
          </svg>
        </button>
      )}

      {stage !== "gone" && (
        <div
          data-stage={stage}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
          className="env-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#7d2236_0%,#5e1426_55%,#3f0b18_100%)] px-6 text-center"
        >
          {/* Thin gold frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 border border-gold-light/40 sm:inset-8"
          />

          <p className="env-intro-text relative font-sans text-xs uppercase tracking-[0.4em] text-gold-light sm:text-sm">
            You are invited
          </p>
          <p className="env-intro-text relative mt-4 font-script text-6xl leading-tight text-ivory sm:text-7xl">
            {partner1} &amp; {partner2}
          </p>

          <div
            className="env-group relative mt-10 w-[min(86vw,420px)]"
            onClick={open}
          >
            <div className="env-scene relative aspect-[4/3] w-full">
              {/* Back of the envelope */}
              <div className="absolute inset-0 bg-[#e9dcc0] shadow-2xl shadow-black/40" />

              {/* The letter inside */}
              <div className="env-letter absolute inset-x-[7%] top-[10%] h-[80%] bg-ivory p-2 shadow-md">
                <div className="flex h-full flex-col items-center border border-gold/40 px-3 pt-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
                    Together with Our families
                  </p>
                  <p className="mt-3 font-script text-4xl leading-tight text-burgundy sm:text-5xl">
                    {partner1} &amp; {partner2}
                  </p>
                  <p className="mt-3 font-serif text-sm italic text-ink/70">
                    invite you to celebrate their wedding
                  </p>
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.25em] text-ink/70">
                    {dateLong}
                  </p>
                </div>
              </div>

              {/* Front of the envelope */}
              <div
                className="absolute inset-0 z-20 bg-[#f1e6cf]"
                style={{
                  clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
                }}
              />

              {/* Flap */}
              <div
                className="env-flap absolute inset-x-0 top-0 h-[55%] bg-[#e2d2b0]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />

              {/* Wax seal button */}
              <button
                type="button"
                aria-label="Open the invitation"
                onClick={(event) => {
                  event.stopPropagation();
                  open();
                }}
                className="env-seal absolute left-1/2 top-[55%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold font-script text-2xl text-burgundy-dark shadow-lg"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-gold-light/50"
                />
                <span className="relative">
                  {partner1.charAt(0)}&amp;{partner2.charAt(0)}
                </span>
              </button>
            </div>

            <p className="env-intro-text mt-8 font-sans text-xs uppercase tracking-[0.35em] text-ivory/80">
              Tap the seal to open
            </p>
          </div>
        </div>
      )}
    </>
  );
}