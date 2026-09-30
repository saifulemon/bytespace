import type { Metadata } from "next";
import { CourseShell } from "@/components/course";
import { StarIcon } from "@/components/icons";
import { ReviewList } from "@/components/reviews-view";

export const metadata: Metadata = { title: "Reviews — ByteSpace" };

const breakdown = [
  { filled: 260, count: "720" },
  { filled: 103, count: "120" },
  { filled: 27, count: "21" },
  { filled: 10, count: "12" },
  { filled: 15, count: "16" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[20px] leading-[24px] font-semibold tracking-[-0.01em] text-neutral-950">
      {children}
    </h2>
  );
}

export default function ReviewsPage() {
  return (
    <CourseShell activeTab="reviews" tabPtClass="lg:pt-[79px]" bodyPbClass="lg:pb-[91px]" bodyWidthClass="min-[1440px]:w-[723px]">
      <div className="flex flex-col gap-6">
        <Heading>What Learners Are Saying</Heading>
        <p className="text-[16px] leading-[26px] text-neutral-700">
          Discover what our learners have to say about their experience with &apos;Build Digital
          Assets: A Comprehensive Guide.&apos; Read reviews and ratings from individuals who have
          embarked on the transformative journey of mastering digital asset creation.
        </p>

        <div className="flex flex-col gap-6 rounded-[16px] border border-hairline bg-white p-[39px] lg:flex-row lg:items-center lg:gap-6">
          <div className="flex h-[140px] w-[129px] shrink-0 flex-col items-center justify-center rounded-[8px] bg-secondary-400 max-lg:mx-auto">
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

          <ReviewList />
        </div>
      </div>
    </CourseShell>
  );
}
