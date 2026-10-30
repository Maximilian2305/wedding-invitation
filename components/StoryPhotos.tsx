"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

const columnClasses: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

function StoryPhoto({
  photo,
  index,
  columns,
  isLastOdd,
}: {
  photo: Photo;
  index: number;
  columns: number;
  isLastOdd: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Photos are visible by default, so they always show even if the animation cannot run
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let armed = false;

    // Only photos that are still below the screen wait to slide up
    const frame = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        armed = true;
        setHidden(true);
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && armed) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 4) * 150}ms` }}
      className={`transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        hidden ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      } ${index % 2 === 1 && columns > 1 ? "md:mt-12" : ""} ${
        isLastOdd ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-full" : ""
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-gold/50 shadow-lg shadow-black/30">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover object-[50%_30%] transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function StoryPhotos({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;

  const columns = Math.min(photos.length, 4);

  return (
    <div
      className={`mx-auto grid w-full grid-cols-2 items-start gap-4 ${columnClasses[columns]}`}
      style={{ maxWidth: `${columns * 260}px` }}
    >
      {photos.map((photo, index) => (
        <StoryPhoto
          key={`${index}-${photo.src}`}
          photo={photo}
          index={index}
          columns={columns}
          isLastOdd={photos.length % 2 === 1 && index === photos.length - 1}
        />
      ))}
    </div>
  );
}