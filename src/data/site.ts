const img = (name: string) => `/images/${name}.png`;

export const images = {
  heroPerson: img("29a52a24_578x541"),
  featureStack: img("0d6596fb_435x596"),
  courseHero: img("71d7929e_720x479"),
  avatar96: img("b44979e1_96x96"),
  coneLime: img("5b3686bc_189x189"),
  coneLime2: img("f9c0e0fd_189x189"),
  coneGrey: img("6be36b89_189x189"),
  ornament1: img("e3b55902_387x387"),
  ornament2: img("92fc70a3_372x372"),
  ornament3: img("8670b841_344x344"),
  ornament4: img("cda676fe_332x332"),
  ornament5: img("f1057d71_334x333"),
  ornament6: img("24321b88_359x358"),
  ornament7: img("d5e9c4dc_223x223"),
} as const;

export const avatars = {
  stack43: [
    img("9ef8cb32_52x52"),
    img("b44979e1_96x96"),
    img("83fb3e04_43x43"),
    img("f3cf29a8_43x43"),
    img("5824acac_43x43"),
    img("7fdccc78_43x43"),
    img("1e078348_43x43"),
  ],
  stack32: [
    img("b44979e1_96x96"),
    img("3fe55918_32x32"),
    img("0577f0e9_80x80"),
    img("d0cd3adb_32x32"),
  ],
  small: [img("9ef8cb32_52x52"), img("efb6f620_52x52"), img("13d1f8e8_52x52")],
  testimonial: {
    sarah: img("0577f0e9_80x80"),
    james: img("63c4be83_80x80"),
    alex: img("728c3b1d_80x80"),
  },
} as const;

export type Course = {
  title: string;
  author: string;
  thumbnail: string;
  lessons: string;
  duration: string;
  comments: string;
  level: string;
  price: string;
  priceSuffix: string;
  rating: string;
  extraStudents: string;
};

const meta = {
  author: "by purepearl studio",
  lessons: "17 Lessons",
  duration: "2 hours 16 mins",
  comments: "59 Comments",
  level: "Beginner",
  price: "$25",
  priceSuffix: "/lifetime",
  rating: "4.5",
  extraStudents: "26+",
};

export const courses: Course[] = [
  { ...meta, title: "Learn Figma from Basic", thumbnail: img("93ad9f9e_341x195") },
  { ...meta, title: "Build Digital Asset", thumbnail: img("c8826419_341x195") },
  { ...meta, title: "the Power of Big Data", thumbnail: img("4f3bdea5_341x195") },
  { ...meta, title: "Balancing Productivity and Self-Care", thumbnail: img("72e18d90_341x195") },
  { ...meta, title: "Mastering Money Management", thumbnail: img("a8978945_341x195") },
  { ...meta, title: "From Idea to Startup Success", thumbnail: img("69362b02_341x195") },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/search" },
  { label: "Creators", href: "/creator" },
] as const;

export const footerBrowse: { label: string; href: string }[] = [
  { label: "Featured Courses", href: "/search" },
  { label: "Featured Categories", href: "/search" },
  { label: "Business", href: "/search" },
  { label: "IT", href: "/search" },
  { label: "Design", href: "/search" },
  { label: "Development", href: "/search" },
  { label: "Marketing", href: "/search" },
  { label: "Photography", href: "/search" },
  { label: "Finance", href: "/search" },
  { label: "Sport", href: "/search" },
];

export const footerPlatform: { label: string; href: string }[] = [
  { label: "Become a Creator", href: "/creator" },
  { label: "Affiliate Program", href: "/creator" },
  { label: "Contact", href: "/" },
  { label: "Help", href: "/" },
  { label: "About", href: "/" },
];
