import type { Metadata } from "next";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  LevelIcon,
  SearchIcon,
  SortIcon,
} from "@/components/icons";
import { GridBackdrop } from "@/components/decor";
import { CourseCard } from "@/components/CourseCard";
import { Footer, Header, HeaderSlot } from "@/components/site";
import { courses } from "@/data/site";

export const metadata: Metadata = { title: "Find Your Next Course — ByteSpace" };

const tabs = [
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

const results = Array.from({ length: 3 }).flatMap((_, cycle) =>
  courses.map((course) => ({ ...course, key: `${cycle}-${course.title}` })),
);

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-12 items-center gap-1 rounded-[24px] border border-hairline bg-white px-[15px] text-[16px] leading-[19px] font-medium text-neutral-700 transition-colors hover:border-neutral-400"
    >
      <span className="grid size-6 place-items-center">{icon}</span>
      {label}
    </button>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <section className="relative isolate h-[360px] w-full overflow-hidden bg-primary-800">
        <GridBackdrop />
        <HeaderSlot />

        <div className="absolute inset-x-0 top-[164px] flex flex-col items-center gap-8 px-6">
          <h1 className="text-center font-heading text-[28px] leading-[34px] font-semibold tracking-[-0.01em] text-neutral-50 md:text-[36px] md:leading-[43px]">
            Find Your Next Course
          </h1>

          <form className="flex w-full max-w-[624px] items-center justify-between gap-4">
            <label className="flex h-[52px] min-w-0 flex-1 items-center gap-2 rounded-[24px] bg-white px-6">
              <SearchIcon className="size-6 shrink-0 text-neutral-400" />
              <input
                type="search"
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-[18px] leading-[29px] text-neutral-950 outline-none placeholder:text-neutral-400"
              />
            </label>
            <button
              type="button"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
            >
              Courses
              <ChevronDownIcon className="size-6" />
            </button>
          </form>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1440px] px-6 lg:px-[120px]">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-[72px] min-[1440px]:-ml-px">
          <div className="flex flex-wrap gap-4">
            <Chip icon={<FilterIcon className="size-5" />} label="Filter" />
            <Chip icon={<LevelIcon className="size-5" />} label="Level" />
            <Chip icon={<CategoryFilterIcon />} label="Category" />
          </div>
          <Chip icon={<SortIcon className="size-5" />} label="Most relevant" />
        </div>

        <div className="mt-8 flex flex-wrap gap-4 min-[1440px]:justify-between">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={
                i === 0
                  ? "inline-flex h-[43px] items-center rounded-[24px] bg-secondary-400 px-4 text-[16px] leading-[19px] font-medium text-neutral-950"
                  : "inline-flex h-[43px] items-center rounded-[24px] bg-neutral-50 px-4 text-[16px] leading-[19px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-[77px] grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:ml-px min-[1440px]:w-[1199px]">
          {results.map((course) => (
            <CourseCard key={course.key} course={course} />
          ))}
        </div>

        <nav className="mt-[72px] flex items-center justify-center gap-6 pb-[72px] lg:translate-x-[25px]">
          <button
            type="button"
            aria-label="Previous page"
            className="grid h-12 w-14 place-items-center rounded-[24px] border border-hairline bg-white text-neutral-700 transition-colors hover:border-neutral-400"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          {["1", "2", "3", "4", "5"].map((page) => (
            <button
              key={page}
              type="button"
              className={
                page === "1"
                  ? "font-heading text-[20px] leading-[28px] font-semibold text-hairline"
                  : "font-heading text-[20px] leading-[28px] font-semibold text-neutral-950 hover:text-primary-600"
              }
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            className="grid h-12 w-14 place-items-center rounded-[24px] border border-hairline bg-white text-neutral-950 transition-colors hover:border-neutral-400"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </nav>
      </main>

      <Footer />
    </>
  );
}

function CategoryFilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-5"
    >
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}
