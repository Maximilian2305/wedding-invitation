"use client";

import { useState } from "react";

type HeroVideoProps = {
  src: string;
  poster?: string;
};

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <>
      {!failed && (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      {/* Dark layer so the text is easy to read on top of the video */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"
      />

      {/* Soft gold glow, also acts as the background if the video is missing */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,185,130,0.22),transparent_60%)]"
      />

      {!failed && (
        <button
          type="button"
          onClick={() => setMuted((value) => !value)}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="absolute bottom-6 right-6 z-20 border border-ivory/60 bg-black/30 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.25em] text-ivory backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold sm:bottom-10 sm:right-10 sm:text-xs"
        >
          {muted ? "Sound off" : "Sound on"}
        </button>
      )}
    </>
  );
}