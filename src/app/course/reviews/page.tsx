import type { Metadata } from "next";
import Image from "next/image";
import { CourseShell } from "@/components/course";
import { StarIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Reviews — ByteSpace" };

const breakdown = [
  { filled: 260, count: "720" },
  { filled: 103, count: "120" },
  { filled: 27, count: "21" },
  { filled: 10, count: "12" },
  { filled: 15, count: "16" },
];

const reviews = [
  {
    avatar: "/images/efb6f620_52x52.png",
    name: "PurePearl Studio",
    role: "UI/UX Designer",
    when: "a year ago",
    quote:
      '"The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!"',
  },
  {
    avatar: "/images/13d1f8e8_52x52.png",
    name: "Albert Flores",
    role: "UI/UX Designer",
    when: "a year ago",
    quote:
      "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
  },
  {
    avatar: "/images/63c4be83_80x80.png",
    name: "Cody Fisher",
    role: "UI/UX Designer",
    when: "a year ago",
    quote:
      "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
  },
  {
    avatar: "/images/9ef8cb32_52x52.png",
    name: "Brooklyn Simmons",
    role: "UI/UX Designer",
    when: "a year ago",
    quote:
      "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
  },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[20px] leading-[24px] font-semibold tracking-[-0.01em] text-neutral-950">
      {children}
    </h2>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="size-6 text-[#4b4c53]" />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <CourseShell activeTab="reviews" tabPtClass="lg:pt-[79px]" bodyPbClass="lg:pb-[91px]" bodyWidthClass="lg:w-[723px]">
      <div className="flex flex-col gap-6">
        <Heading>What Learners Are Saying</Heading>
        <p className="text-[16px] leading-[26px] text-neutral-700">
          Discover what our learners have to say about their experience with &apos;Build Digital
          Assets: A Comprehensive Guide.&apos; Read reviews and ratings from individuals who have
          embarked on the transformative journey of mastering digital asset creation.
        </p>

        <div className="flex flex-col gap-6 rounded-[16px] border border-hairline bg-white p-[39px] sm:flex-row sm:items-center sm:gap-6">
          <div className="flex h-[140px] w-[129px] shrink-0 flex-col items-center justify-center rounded-[8px] bg-secondary-400">
            <span className="text-[14px] leading-[17px] font-medium text-neutral-950">Ratings</span>
            <span className="font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-neutral-950">
              4.7
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-1">
            {breakdown.map((row) => (
              <div key={row.count} className="flex h-[26px] items-center gap-4">
                <div className="h-2 w-[282px] overflow-hidden rounded-[24px] bg-neutral-100">
                  <div
                    className="h-2 rounded-[24px] bg-secondary-400"
                    style={{ width: `${(row.filled / 282) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="size-6 text-[#4b4c53]" />
                  ))}
                </div>
                <span className="text-[16px] leading-[26px] text-neutral-700">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Heading>Individual Reviews:</Heading>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="inline-flex h-[43px] items-center rounded-[24px] bg-secondary-400 px-4 text-[16px] leading-[19px] font-medium text-neutral-950"
            >
              All rating
            </button>
            {["5", "4", "3", "2", "1"].map((n) => (
              <button
                key={n}
                type="button"
                className="inline-flex h-12 items-center gap-1 rounded-[24px] bg-neutral-50 px-4 text-[16px] leading-[19px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                <StarIcon className="size-6 text-[#4b4c53]" />
                {n}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {reviews.map((review, idx) => (
              <article
                key={review.name}
                className="flex flex-col gap-6 rounded-[24px] border border-hairline p-[39px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-3">
                      <Image
                        src={review.avatar}
                        alt=""
                        width={52}
                        height={52}
                        className="size-[52px] rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-[18px] leading-[22px] font-medium text-neutral-950">
                          {review.name}
                        </span>
                        <span
                          className={`text-[16px] text-neutral-700 ${idx === 0 ? "leading-6" : "leading-[26px]"}`}
                        >
                          {review.role}
                        </span>
                      </div>
                    </div>
                    <Stars />
                  </div>
                  <span
                    className={`shrink-0 text-[16px] text-neutral-700 ${idx === 0 ? "leading-6" : "leading-[26px]"}`}
                  >
                    {review.when}
                  </span>
                </div>

                <p className={`text-[16px] text-neutral-700 ${idx === 0 ? "leading-6" : "leading-[26px]"}`}>
                  {review.quote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </CourseShell>
  );
}
