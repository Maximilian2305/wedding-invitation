export type GiftItem = {
  /** Short unique id. Do not change an id after guests start choosing gifts. */
  id: string;
  name: string;
  description: string;
  /** Must match one of the names in giftCategories */
  category: string;
};

export const giftCategories = [
  "Big gifts",
  "Home appliances",
  "Kitchen",
  "Bedroom and bathroom",
  "Living room and decor",
];

export const giftItems: GiftItem[] = [
  // Big gifts
  {
    id: "car",
    name: "A car",
    description: "A car for our new family, or a part payment towards one",
    category: "Big gifts",
  },
  {
    id: "solar",
    name: "Solar and inverter system",
    description: "Solar panels and an inverter for steady light at home",
    category: "Big gifts",
  },
  {
    id: "honeymoon",
    name: "Honeymoon trip",
    description: "Flights or a hotel stay for our honeymoon",
    category: "Big gifts",
  },
  {
    id: "home-fund",
    name: "Home fund",
    description: "A contribution towards our first home",
    category: "Big gifts",
  },

  // Home appliances
  {
    id: "fridge",
    name: "Refrigerator",
    description: "Double door, frost free",
    category: "Home appliances",
  },
  {
    id: "freezer",
    name: "Deep freezer",
    description: "Chest freezer for the home",
    category: "Home appliances",
  },
  {
    id: "washing-machine",
    name: "Washing machine",
    description: "Front load, automatic",
    category: "Home appliances",
  },
  {
    id: "air-conditioner",
    name: "Air conditioner",
    description: "1.5 horse power split unit",
    category: "Home appliances",
  },
  {
    id: "television",
    name: "Television",
    description: "55 inch smart TV",
    category: "Home appliances",
  },
  {
    id: "generator",
    name: "Generator",
    description: "Quiet and fuel saving",
    category: "Home appliances",
  },
  {
    id: "standing-fan",
    name: "Standing fan",
    description: "Quiet and strong",
    category: "Home appliances",
  },
  {
    id: "water-dispenser",
    name: "Water dispenser",
    description: "Hot and cold water",
    category: "Home appliances",
  },

  // Kitchen
  {
    id: "gas-cooker",
    name: "Gas cooker",
    description: "4 burners with oven",
    category: "Kitchen",
  },
  {
    id: "microwave",
    name: "Microwave oven",
    description: "25 litres or bigger",
    category: "Kitchen",
  },
  {
    id: "blender",
    name: "Blender",
    description: "A strong blender for daily use",
    category: "Kitchen",
  },
  {
    id: "air-fryer",
    name: "Air fryer",
    description: "Large family size",
    category: "Kitchen",
  },
  {
    id: "pot-set",
    name: "Cooking pot set",
    description: "Non stick, 5 piece",
    category: "Kitchen",
  },
  {
    id: "dinner-set",
    name: "Dinner set",
    description: "12 piece, plain white or cream",
    category: "Kitchen",
  },
  {
    id: "cutlery",
    name: "Cutlery set",
    description: "Stainless steel, 24 piece",
    category: "Kitchen",
  },
  {
    id: "kettle",
    name: "Electric kettle",
    description: "Fast boiling, 1.8 litres",
    category: "Kitchen",
  },
  {
    id: "rice-cooker",
    name: "Rice cooker",
    description: "Large size, with steamer",
    category: "Kitchen",
  },

  // Bedroom and bathroom
  {
    id: "bed",
    name: "Bed and mattress",
    description: "King size, firm and comfortable",
    category: "Bedroom and bathroom",
  },
  {
    id: "bedsheets",
    name: "Bedsheet set",
    description: "King size, neutral colours",
    category: "Bedroom and bathroom",
  },
  {
    id: "duvet",
    name: "Duvet and pillow set",
    description: "Soft and warm",
    category: "Bedroom and bathroom",
  },
  {
    id: "towels",
    name: "Towel set",
    description: "Soft cotton, white or cream",
    category: "Bedroom and bathroom",
  },

  // Living room and decor
  {
    id: "sofa",
    name: "Sofa set",
    description: "Comfortable, in neutral colours",
    category: "Living room and decor",
  },
  {
    id: "dining-set",
    name: "Dining table and chairs",
    description: "Seats 6",
    category: "Living room and decor",
  },
  {
    id: "curtains",
    name: "Curtains and rails",
    description: "For the living room and bedroom",
    category: "Living room and decor",
  },
  {
    id: "rug",
    name: "Living room rug",
    description: "Soft, in cream or beige",
    category: "Living room and decor",
  },
  {
    id: "wall-art",
    name: "Framed wall art",
    description: "A piece to warm up our home",
    category: "Living room and decor",
  },
];

export const donation = {
  bankName: "FIRST BANK",
  accountName: "JOHNSON JOY HAPPINESS",
  accountNumber: "3234288413",
  note: "Please use your name as the transfer narration, then tick the box below after you send.",
};