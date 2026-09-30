import type { Metadata } from "next";
import Image from "next/image";
import { CourseCard } from "@/components/CourseCard";
import { GridBackdrop } from "@/components/decor";
import { FilterIcon, LevelIcon, SortIcon } from "@/components/icons";
import { Footer, Header, HeaderSlot } from "@/components/site";
import { courses, images } from "@/data/site";

export const metadata: Metadata = { title: "PurePearl Studio — ByteSpace" };

const bio = `Welcome to the creative world of [Creator's Name]. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!
ive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.`;

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

export default function CreatorPage() {
  return (
    <>
      <Header />
      <section className="relative isolate w-full overflow-hidden bg-primary-800">
        <GridBackdrop />
        <HeaderSlot />

        <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-[52px] pb-[82px] lg:px-[122px]">
          <div className="flex flex-col gap-10 min-[1440px]:w-[1198px]">
            <div className="flex items-start gap-6">
              <Image
                src={images.avatar96}
                alt="PurePearl Studio"
                width={96}
                height={96}
                className="size-24 shrink-0 rounded-[24px] object-cover"
              />

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-heading text-[28px] leading-[34px] font-semibold tracking-[-0.01em] text-neutral-50 md:text-[36px] md:leading-[43px]">
                    PurePearl Studio
                  </h1>
                  <span className="inline-flex h-[35px] items-center rounded-[24px] bg-secondary-400 px-6 text-[16px] leading-[19px] font-medium text-neutral-950">
                    Creator
                  </span>
                </div>
                <p className="text-[18px] leading-[29px] text-neutral-50">
                  Passionate UI/UX, Web designer
                </p>
              </div>
            </div>

            <p className="whitespace-pre-line text-[18px] leading-[29px] text-neutral-50">{bio}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 min-[1440px]:w-[1198px]">
            <div className="flex flex-wrap gap-4">
              <Stat value="3" label="Products" />
              <Stat value="12" label="Followers" />
            </div>

            <button
              type="button"
              className="inline-flex h-[46px] items-center rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-ink transition-colors hover:bg-secondary-500"
            >
              Follow
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1440px] px-6 lg:px-[120px]">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-[62px] min-[1440px]:-ml-px">
          <div className="flex flex-wrap gap-4">
            <Chip icon={<FilterIcon className="size-5" />} label="Filter" />
            <Chip icon={<LevelIcon className="size-5" />} label="Level" />
            <Chip icon={<CategoryFilterIcon />} label="Category" />
          </div>
          <Chip icon={<SortIcon className="size-5" />} label="Most relevant" />
        </div>

        <div className="mt-10 grid grid-cols-1 justify-items-center gap-10 pb-[61px] sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:-ml-px min-[1440px]:w-[1199px]">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex h-[46px] items-center gap-2 rounded-[24px] bg-white px-6 text-[18px] leading-[22px] font-medium text-neutral-950">
      <span className="text-primary-600">{value}</span>
      {label}
    </span>
  );
}
