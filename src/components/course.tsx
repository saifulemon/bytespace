import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CheckIcon, SignalIcon, StarIcon, UsersIcon } from "@/components/icons";
import { GridBackdrop } from "@/components/decor";
import { Footer, Header, HeaderSlot } from "@/components/site";
import { images } from "@/data/site";

export type CourseTab = "about" | "lessons" | "reviews";

const tabs: { key: CourseTab; label: string; href: string }[] = [
  { key: "about", label: "About", href: "/course" },
  { key: "lessons", label: "lesson", href: "/course/lessons" },
  { key: "reviews", label: "Reviews", href: "/course/reviews" },
];

export function CourseShell({
  activeTab,
  tabPtClass,
  bodyPbClass,
  bodyWidthClass = "lg:w-[725px]",
  children,
}: {
  activeTab: CourseTab;
  tabPtClass: string;
  bodyPbClass: string;
  bodyWidthClass?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <Header />
      <section className="relative isolate w-full overflow-hidden bg-primary-800">
        <GridBackdrop />
        <HeaderSlot />
        <CourseHero />
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 lg:px-[120px] lg:pb-0">
          <div className={`flex flex-wrap gap-4 pt-14 lg:w-[725px] ${tabPtClass}`}>
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                className={
                  tab.key === activeTab
                    ? "inline-flex h-[43px] items-center rounded-[24px] border-2 border-[#7f30f7] bg-secondary-400 px-4 text-[16px] leading-[19px] font-medium text-neutral-950"
                    : "inline-flex h-[43px] items-center rounded-[24px] bg-neutral-50 px-4 text-[16px] leading-[19px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                }
              >
                {tab.key === "lessons" ? (activeTab === "about" ? "Lessons" : "Lesson") : tab.label}
              </Link>
            ))}
          </div>

          <div className={`mt-10 flex-1 ${bodyWidthClass} ${bodyPbClass}`}>{children}</div>

          <div className="mt-14 lg:hidden">
            <EnrollCard />
          </div>
        </div>
      </section>

      <aside className="pointer-events-none absolute inset-x-0 top-[416px] hidden lg:block">
        <div className="pointer-events-auto mx-auto max-w-[1440px] px-[120px]">
          <div className="ml-auto w-[412px]">
            <EnrollCard />
          </div>
        </div>
      </aside>

      <Footer />
    </div>
  );
}

function CourseHero() {
  return (
    <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-[52px] pb-16 lg:px-[122px] lg:pb-[62px]">
      <div className="flex flex-wrap items-start justify-between gap-6 lg:w-[1283px]">
        <div className="flex max-w-[860px] flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-[28px] leading-[34px] font-semibold tracking-[-0.01em] text-neutral-50 [word-spacing:-1.2px] md:text-[36px] md:leading-[43px]">
              Build Digital Asset: A Comprehensive Guide
            </h1>
            <p className="font-heading text-[18px] leading-[22px] font-semibold tracking-[-0.01em] text-neutral-50 md:text-[20px] md:leading-[24px]">
              Unlock the Power of Digital Creation with Expert Guidance
            </p>
          </div>

          <p className="text-[18px] leading-[22px] font-medium text-[#f1f4fe]">by purepearl studio</p>

          <div className="flex flex-wrap gap-4">
            <Pill icon={<SignalIcon className="size-6 text-primary-800" />} label="Intermediate" />
            <Pill icon={<StarIcon className="size-6 text-primary-800" />} label="4.8 (172 reviews)" />
            <Pill icon={<UsersIcon className="size-6 text-primary-800" />} label="199 Students" />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-[24px] bg-secondary-400 px-6 text-[16px] leading-6 font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-6">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          Share
        </button>
      </div>

      <div className="relative mt-[59px] ml-[3px] aspect-[720/479] w-full max-w-[720px] overflow-hidden rounded-[16px] bg-[#e9e9e9]">
        <Image
          src={images.courseHero}
          alt="Course preview"
          fill
          sizes="(max-width: 1024px) 100vw, 720px"
          className="object-cover"
        />
        <button
          type="button"
          aria-label="Play preview"
          className="absolute top-1/2 left-1/2 grid size-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[24px] border border-[#4f4f4f] bg-[rgba(61,61,61,0.24)] backdrop-blur-[40px] ml-[16px] mt-[16.5px] transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 60 60" aria-hidden className="size-[60px]">
            <path
              fill="#f5f2ff"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 30a30 30 0 1 0 60 0a30 30 0 1 0-60 0ZM23 15L43 29L23 43Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Pill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex h-10 items-center gap-2 rounded-[24px] bg-white px-6 text-[16px] leading-[19px] font-medium text-neutral-950">
      {icon}
      {label}
    </span>
  );
}

const lessons = [
  { n: "01", title: "Introduction to Digital Assets", time: "12 mins" },
  { n: "02", title: "Design Principles for Impacts", time: "21 mins" },
  { n: "03", title: "Advanced Techniques in Digital Creation", time: "16 mins" },
];

const includes = [
  "Learning Resources",
  "Quality Lesson Videos",
  "Certificate of Completion",
  "Private Consultation",
];

export function EnrollCard() {
  return (
    <div className="rounded-[24px] border border-hairline bg-white p-[39px]">
      <div className="flex flex-col gap-6 pr-[9px]">
        <h2 className="font-heading text-[20px] leading-[24px] font-semibold tracking-[-0.01em] text-neutral-950">
          112 Lessons (24 hours)
        </h2>

        <div className="flex flex-col gap-3">
          {lessons.map((lesson) => (
            <div key={lesson.n} className="flex items-start justify-between gap-3">
              <div className="flex gap-2">
                <span className="w-[24px] shrink-0 text-[16px] leading-[19px] font-medium text-neutral-950">
                  {lesson.n}
                </span>
                <span className="max-w-[198px] text-[16px] leading-[19px] font-medium text-neutral-950">
                  {lesson.title}
                </span>
              </div>
              <span className="shrink-0 text-[16px] leading-[26px] text-primary-800">{lesson.time}</span>
            </div>
          ))}
          <p className="text-[16px] leading-[26px] text-neutral-700">99 more videos</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <p className="text-[16px] leading-[26px] text-neutral-700">
          Ready to Dive In? Enroll Now and Start Building Your Digital Future!
        </p>

        <div className="flex items-baseline">
          <span className="font-heading text-[36px] leading-[38px] font-semibold tracking-[-0.01em] text-primary-800">
            $25
          </span>
          <span className="text-[16px] leading-[26px] text-neutral-700">/lifetime</span>
        </div>

        <button
          type="button"
          className="h-[46px] w-full rounded-[24px] bg-secondary-400 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
        >
          Enroll Now
        </button>
      </div>

      <h3 className="mt-6 font-heading text-[20px] leading-[24px] font-semibold tracking-[-0.01em] text-neutral-950">
        This course include
      </h3>

      <ul className="mt-6 flex flex-col gap-3">
        {includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[16px] leading-[26px] text-neutral-700">
            <CheckIcon className="size-6 shrink-0 text-primary-800" />
            {item}
          </li>
        ))}
      </ul>

      <hr className="mt-6 -mb-px border-[#d1d1d1]" />

      <div className="mt-6 flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <Image
            src="/images/bfd09b20_52x52.png"
            alt=""
            width={52}
            height={52}
            className="size-[52px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-[18px] leading-[22px] font-medium text-neutral-950">PurePearl Studio</span>
            <span className="text-[16px] leading-[26px] text-neutral-700">Professional Creator</span>
          </div>
        </div>

        <p className="text-[16px] leading-[26px] text-neutral-700">
          Ready to Dive In? Enroll Now and Start Building Your Digital Future!
        </p>

        <Link
          href="/creator"
          className="inline-flex h-[35px] w-fit items-center rounded-[24px] border border-hairline px-4 text-[16px] leading-[19px] font-medium text-neutral-700 transition-colors hover:border-neutral-400"
        >
          See Full Profile
        </Link>
      </div>
    </div>
  );
}
