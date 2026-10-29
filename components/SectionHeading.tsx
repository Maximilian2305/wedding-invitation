export function Divider() {
  return (
    <div
      aria-hidden
      className="mx-auto mt-6 flex items-center justify-center gap-3"
    >
      <span className="h-px w-12 bg-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-12 bg-gold/50" />
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center sm:mb-16">
      <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl font-light text-ink sm:text-5xl">
        {title}
      </h2>
      <Divider />
    </div>
  );
}