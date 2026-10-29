import Countdown from "../components/Countdown";
import EnvelopeIntro from "../components/EnvelopeIntro";
import Gallery from "../components/Gallery";
import GiftSection from "../components/GiftSection";
import HeroVideo from "../components/HeroVideo";
import Reveal from "../components/Reveal";
import SectionHeading, { Divider } from "../components/SectionHeading";
import { donation, giftCategories, giftItems } from "../lib/giftsConfig";
import { wedding } from "../lib/wedding";

export default function Home() {
  const { partner1, partner2 } = wedding;

  return (
    <EnvelopeIntro
      partner1={partner1}
      partner2={partner2}
      dateLong={wedding.dateLong}
      musicSrc="/audio/wedding-song.mp3"
    >
      <main className="flex-1">
        {/* HERO WITH VIDEO BACKGROUND */}
        <section
          id="top"
          className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-burgundy-dark px-6 py-24 text-center"
        >
          <HeroVideo src="/video/wedding.mp4" />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 z-10 border border-ivory/30 sm:inset-8"
          />

          <div className="relative z-10 w-full max-w-3xl">
            <p
              className="fade-up font-sans text-xs uppercase tracking-[0.4em] text-gold-light sm:text-sm"
              style={{ animationDelay: "0.1s" }}
            >
              We are getting married
            </p>

            <h1
              className="fade-up mt-8 flex flex-col items-center justify-center font-script text-7xl leading-[1.1] text-ivory sm:flex-row sm:gap-6 sm:text-8xl md:text-9xl"
              style={{ animationDelay: "0.3s" }}
            >
              <span>{partner1}</span>
              <span className="font-serif text-4xl font-light text-gold-light sm:text-6xl">
                &amp;
              </span>
              <span>{partner2}</span>
            </h1>

            <div className="fade-up" style={{ animationDelay: "0.5s" }}>
              <Divider />
              <p className="mt-8 font-serif text-2xl text-ivory sm:text-3xl">
                {wedding.dateLong}
              </p>
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-ivory/80 sm:text-sm">
                {wedding.city}
              </p>
            </div>

            <div className="fade-up mt-12" style={{ animationDelay: "0.7s" }}>
              <Countdown targetDate={wedding.dateISO} light />
            </div>

            <div className="fade-up mt-12" style={{ animationDelay: "0.9s" }}>
              <a
                href="#gifts"
                className="inline-block border border-ivory px-8 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-ivory hover:text-burgundy-dark"
              >
                Send a gift/RSVP
              </a>
            </div>
          </div>

          <div
            aria-hidden
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-ivory/80">
              Scroll
            </span>
            <span className="scroll-line block h-10 w-px bg-gold-light" />
          </div>
        </section>

        {/* INVITATION */}
        <section id="invitation" className="bg-surface-alt px-6 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold-light">
              {wedding.invitation.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light text-paper sm:text-5xl">
              {wedding.invitation.title}
            </h2>
            <Divider />
            <div className="mt-10 space-y-6">
              {wedding.invitation.paragraphs.map((text, index) => (
                <p
                  key={`${index}-${text}`}
                  className="font-serif text-xl italic leading-relaxed text-paper/80 sm:text-2xl"
                >
                  {text}
                </p>
              ))}
            </div>
            <p className="mt-10 font-script text-5xl text-gold-light">
              {wedding.invitation.signoff}
            </p>
          </Reveal>
        </section>

        {/* OUR STORY */}
        <section id="story" className="bg-surface px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <SectionHeading eyebrow="How it began" title="Our Story" />
            </Reveal>
            <ol className="border-l border-gold/40">
              {wedding.story.map((item, index) => (
                <li
                  key={`${index}-${item.title}`}
                  className="relative pb-12 pl-8 last:pb-0 sm:pl-10"
                >
                  <span
                    aria-hidden
                    className="absolute -left-[5.5px] top-2 h-2.5 w-2.5 rotate-45 bg-gold"
                  />
                  <Reveal delay={index * 80}>
                    {item.year && (
                      <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-light">
                        {item.year}
                      </p>
                    )}
                    <h3 className="mt-2 font-serif text-3xl text-paper">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-base leading-relaxed text-paper-soft">
                      {item.text}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CEREMONY AND RECEPTION */}
        <section id="details" className="bg-surface-deep px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading eyebrow="The day" title="Wedding Details" />
            </Reveal>
            <div className="grid gap-8 md:grid-cols-2">
              {[wedding.ceremony, wedding.reception].map((event, index) => (
                <Reveal key={event.label} delay={index * 120}>
                  <div className="h-full border border-gold/30 bg-card p-8 text-center sm:p-12">
                    <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold-light">
                      {event.label}
                    </p>
                    <p className="mt-6 font-serif text-5xl font-light text-paper">
                      {event.time}
                    </p>
                    <div className="mx-auto my-6 h-px w-12 bg-gold/50" />
                    <h3 className="font-serif text-2xl text-paper">
                      {event.venue}
                    </h3>
                    <p className="mt-2 font-sans text-base text-paper-soft">
                      {event.address}
                    </p>
                    <p className="mt-4 font-serif text-lg italic text-paper/80">
                      {event.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* VENUE */}
        <section id="venue" className="bg-surface px-6 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow="Where" title="The Venue" />
            <h3 className="font-serif text-3xl text-paper">
              {wedding.venue.name}
            </h3>
            <p className="mt-3 font-sans text-base text-paper-soft">
              {wedding.venue.address}
            </p>
            <p className="mt-4 font-serif text-lg italic text-paper/80">
              {wedding.venue.tip}
            </p>
            <a
              href={wedding.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block bg-gold px-8 py-4 font-sans text-xs uppercase tracking-[0.3em] text-burgundy-dark transition-colors hover:bg-gold-light"
            >
              Open in Google Maps
            </a>
          </Reveal>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="bg-surface-alt px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading eyebrow="Moments" title="Our Gallery" />
            </Reveal>
            <Reveal>
              <Gallery photos={wedding.gallery} />
            </Reveal>
          </div>
        </section>

        {/* DRESS CODE */}
        <section id="dress-code" className="bg-surface px-6 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow="What to wear" title="Dress Code" />
            <h3 className="font-serif text-3xl text-paper">
              {wedding.dressCode.title}
            </h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-paper-soft">
              {wedding.dressCode.text}
            </p>
            <ul className="mt-10 flex flex-wrap items-start justify-center gap-6">
              {wedding.dressCode.swatches.map((swatch, index) => (
                <li
                  key={`${index}-${swatch.name}`}
                  className="flex w-20 flex-col items-center"
                >
                  <span
                    className="h-14 w-14 rounded-full border border-gold/40 shadow-sm"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="mt-3 font-sans text-xs uppercase tracking-[0.15em] text-paper-soft">
                    {swatch.name}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* GIFTS AND DONATIONS */}
        <section id="gifts" className="bg-surface-alt px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <SectionHeading
                eyebrow="With gratitude"
                title="Gifts and Blessings"
              />
              <p className="mx-auto -mt-6 mb-14 max-w-2xl text-center font-serif text-xl italic leading-relaxed text-paper/80">
                Your presence is the greatest gift. If you would like to bless
                us further, choose from our gift list, send a monetary gift, or
                do both. Then tell us how many people are coming with you.
              </p>
            </Reveal>
            <Reveal>
              <GiftSection
                items={giftItems}
                categories={giftCategories}
                donation={donation}
              />
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-surface-deep px-6 py-16 text-center">
          <p className="font-script text-5xl text-gold-light">
            {wedding.partner1} &amp; {wedding.partner2}
          </p>
          <p className="mt-4 font-serif text-lg text-paper">
            {wedding.dateLong}
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-paper-soft">
            {wedding.hashtag}
          </p>
        </footer>
      </main>
    </EnvelopeIntro>
  );
}