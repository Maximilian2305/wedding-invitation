export type GalleryPhoto = {
  alt: string;
  /** Put photos in public/gallery and use a path like "/gallery/photo-1.jpg". Leave empty for a placeholder. */
  src?: string;
  /** Tailwind aspect ratio class, this gives the masonry look */
  aspect: string;
};

export const wedding = {
  partner1: "JOY ",
  partner2: "OBI",

  // The countdown uses this. +01:00 is Lagos time (WAT).
  dateISO: "2027-01-04T11:00:00+01:00",
  dateLong: "Monday, 4th January 2027",
  city: "ACHINA, ANAMBRA STATE Nigeria",
  hashtag: "#JoyHappinessAndObiCollins",
  rsvpDeadline: "SUNDAY, 3rd January 2027",

  invitation: {
    eyebrow: "You are invited",
    title: "Join us for our wedding",
    paragraphs: [
      "With joy in our hearts and thanks to God, together with our families, we invite you to celebrate the day we say “I do”.",
      "Your love and support have shaped our journey, and we would be honoured to have you with us as we begin this new chapter.",
    ],
    signoff: "JOY weds OBI",
  },

  story: [
    {
      year: "it begins",
      title: "We met",
      text: "A mutual friend introduced us at a small dinner. We talked for hours and forgot to eat.",
    },
    {
      year: "Love grows",
      title: "Our first trip",
      text: "A weekend away turned into a long list of inside jokes, and we knew this was something special.",
    },
    {
      year: "Love deepens",
      title: "He asked",
      text: "On a quiet evening, with no crowd and no fuss, Obi asked the question and Joy said yes.",
    },
    {
      year: "2027",
      title: "Forever begins",
      text: "Now we are ready to start our life together, and we want you there to share it.",
    },
  ],

  ceremony: {
    label: "The Ceremony",
    time: "10:00 AM",
    venue: "Holy Trinity Catholic Church",
    address: "Achina, Anambra State, Nigeria",
    note: "Please be seated by 10:00 AM.",
  },

  reception: {
    label: "The Reception",
    time: "2:00 PM",
    venue: "HOLY TRINITY CATHOLIC CHURCH PREMISES",
    address: "Achina, Anambra State, Nigeria",
    note: "Dinner, music, and dancing to follow.",
  },

  venue: {
    name: "HOLY TRINITY CATHOLIC CHURCH PREMISES",
    address: "Achina, Anambra State, Nigeria",
    mapsUrl:
      "https://www.google.com/maps/place/Holy+tirnity+catholic+church+achina/@5.9736923,7.0722441,11.84z/data=!4m6!3m5!1s0x10430b0011c18ff5:0x23cdbf4ada049906!8m2!3d5.9753544!4d7.1318996!16s%2Fg%2F11zz9wsqfl?authuser=0&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D" +
      encodeURIComponent("HOLY TRINITY CATHOLIC CHURCH PREMISES, Achina, Anambra State, Nigeria"),
    tip: "Parking is available on site. We suggest leaving early because of traffic.",
  },

   dressCode: {
    title: "Colour of the day",
    text: "Our colours are burgundy, peach, white, and gold. Please wear any of these colours, alone or mixed together, and help us paint the day.",
    swatches: [
      { name: "Burgundy", hex: "#800020" },
      { name: "Peach", hex: "#f7c1a3" },
      { name: "White", hex: "#ffffff" },
      { name: "Gold", hex: "#c9a24a" },
    ],
  },
  

  
gallery: [
  {
    alt: "Joy and Obi laughing together",
    src: "/gallery/photo-1.jpg",
    aspect: "aspect-[3/5]",
  },
  
  {
    alt: "Joy and Obi on a dinner date",
    src: "/gallery/photo-3.jpg",
    aspect: "aspect-[3/5]",
  },
  {
    alt: "Joy and Obi on their engagement day",
    src: "/gallery/photo-4.jpg",
    aspect: "aspect-[3/5]",
  },
  
  
] as GalleryPhoto[],

};