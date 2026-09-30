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
  categories: string[];
  tags: string[];
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

export const courseCategories = [
  "Design",
  "Development",
  "IT & Software",
  "Business",
  "Marketing",
  "Photography",
] as const;

export const courses: Course[] = [
  {
    ...meta,
    title: "Learn Figma from Basic",
    thumbnail: img("93ad9f9e_341x195"),
    categories: ["Design", "Development"],
    tags: [
      "Featured",
      "UI/UX Design",
      "Drawing & Painting",
      "Creative Marketing",
      "Graphic Design",
      "Photography",
      "Digital Illustration",
    ],
  },
  {
    ...meta,
    title: "Build Digital Asset",
    thumbnail: img("c8826419_341x195"),
    categories: ["Design", "Photography"],
    tags: [
      "Featured",
      "UI/UX Design",
      "Animation",
      "Creative Marketing",
      "Graphic Design",
      "Digital Illustration",
      "Film & Video",
    ],
  },
  {
    ...meta,
    title: "the Power of Big Data",
    thumbnail: img("4f3bdea5_341x195"),
    categories: ["IT & Software", "Development"],
    tags: ["Featured", "Marketing", "Social Media", "Data Science", "Web Development"],
  },
  {
    ...meta,
    title: "Balancing Productivity and Self-Care",
    thumbnail: img("72e18d90_341x195"),
    categories: ["Business", "Marketing"],
    tags: ["Featured", "Cooking", "Music", "Social Media", "Productivity", "Crafts"],
  },
  {
    ...meta,
    title: "Mastering Money Management",
    thumbnail: img("a8978945_341x195"),
    categories: ["Business", "Marketing"],
    tags: [
      "Featured",
      "Marketing",
      "Creative Marketing",
      "Freelance & Entrepreneurship",
      "Photography",
    ],
  },
  {
    ...meta,
    title: "From Idea to Startup Success",
    thumbnail: img("69362b02_341x195"),
    categories: ["Business", "Development"],
    tags: [
      "Featured",
      "Animation",
      "Social Media",
      "Marketing",
      "Freelance & Entrepreneurship",
      "Web Development",
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/search" },
  { label: "Creators", href: "/creator" },
] as const;

export const courseTitle = "Build Digital Asset: A Comprehensive Guide";

/**
 * Real, topic-matching YouTube videos behind the preview player, keyed by the
 * preview title used in `usePreview()`. Every id was verified as public and
 * embeddable; a missing key simply falls back to the simulated clip.
 */
export const previewVideos: Record<string, string> = {
  [courseTitle]: "YqQx75OPRa0",
  "Module 1: Introduction to Digital Assets": "jQ1sfKIl50E",
  "Module 2: Design Principles for Impact": "9EPTM91TBDU",
  "Module 4: User-Centric Design Strategies": "t0aCoqXKFOU",
  "Module 5: Interactive Media and Engagement": "3JB5BQfcIQc",
  "Module 6: Project Showcase and Critique": "w-PoV_sIWos",
  "Module 7: Optimizing Digital Assets for Various Platforms": "pxTx8uQxUOM",
};

/** Category tabs shown on /search and as topic chips on the home page. */
export const searchTabs: string[] = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Cooking",
];

export const footerBrowse: { label: string; href: string }[] = [
  { label: "Featured Courses", href: "/search?tab=Featured" },
  { label: "Featured Categories", href: "/search?category=Design" },
  { label: "Business", href: "/search?category=Business" },
  { label: "IT", href: "/search?category=IT%20%26%20Software" },
  { label: "Design", href: "/search?category=Design" },
  { label: "Development", href: "/search?category=Development" },
  { label: "Marketing", href: "/search?category=Marketing" },
  { label: "Photography", href: "/search?category=Photography" },
  { label: "Finance", href: "/search?category=Business" },
  { label: "Sport", href: "/search" },
];

export const footerPlatform: { label: string; href: string }[] = [
  { label: "Become a Creator", href: "/creator" },
  { label: "Affiliate Program", href: "/creator" },
  { label: "Contact", href: "" },
  { label: "Help", href: "" },
  { label: "About", href: "" },
];

/** Footer/header text links that open a dialog instead of navigating. */
export const infoPages: Record<string, { title: string; body: string[] }> = {
  "Privacy Policy": {
    title: "Privacy Policy",
    body: [
      "ByteSpace collects only the information you provide when creating an account, enrolling in a course or joining the newsletter — your name, email address and the courses you are interested in.",
      "We use that information to run your account, deliver course content and send the updates you asked for. We never sell your personal data, and you can request a copy or a full deletion at any time from your account settings.",
      "Questions? Write to privacy@bytespace.example and we will get back to you within a few working days.",
    ],
  },
  "Terms of Service": {
    title: "Terms of Service",
    body: [
      "By using ByteSpace you agree to keep your login credentials private, to use course material for personal learning only, and to respect the intellectual property of our creators.",
      "Course access is granted per licence (for example /lifetime) and may not be resold or redistributed. Creators keep ownership of their content and grant ByteSpace the right to host and stream it.",
      "We may update these terms from time to time; continued use of the platform after a change means you accept the new version.",
    ],
  },
  "Cookies Settings": {
    title: "Cookies Settings",
    body: [
      "We use strictly necessary cookies to keep you signed in and to remember your cart, plus optional analytics cookies that help us understand which courses are popular.",
      "You can clear or block cookies in your browser at any time. Blocking necessary cookies will sign you out and empty your saved cart.",
    ],
  },
  Contact: {
    title: "Contact",
    body: [
      "Have a question about a course, your account or a partnership? Our team is happy to help.",
      "Email: hello@bytespace.example — Support: support@bytespace.example — Phone: +1 (555) 012-3456 (Mon–Fri, 9:00–18:00).",
      "We usually reply within one working day.",
    ],
  },
  Help: {
    title: "Help Center",
    body: [
      "Enrolling: pick a course, press Enroll Now and complete checkout — your course appears in the cart and in your account straight away.",
      "Payments: we accept all major cards. Refunds are available within 14 days if you have watched less than 30% of the course.",
      "Still stuck? Use the Contact link to reach a human.",
    ],
  },
  About: {
    title: "About ByteSpace",
    body: [
      "ByteSpace is a course marketplace where independent creators publish in-depth classes on design, business and technology.",
      "Over 12,000 students learn here, guided by 70+ courses from creators such as PurePearl Studio. Our goal is simple: practical teaching, honest reviews and lifetime access to what you buy.",
    ],
  },
};
