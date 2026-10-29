import Image from "next/image";
import type { GalleryPhoto } from "../lib/wedding";

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
      {photos.map((photo, index) => (
        <figure
          key={index}
          className={`relative mb-3 w-full break-inside-avoid overflow-hidden sm:mb-4 ${photo.aspect}`}
        >
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div
              role="img"
              aria-label={photo.alt}
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand via-cream to-gold-light/40"
            >
              <span className="font-script text-3xl text-gold/70">
                Photo {index + 1}
              </span>
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}