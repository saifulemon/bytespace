"use client";

import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@/components/icons";

type Review = {
  avatar: string;
  name: string;
  role: string;
  when: string;
  quote: string;
};

const reviews: Review[] = [
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

const filters = ["All rating", "5", "4", "3", "2", "1"];

/** Every review in this list is 5-star, which is what the design shows. */
const REVIEW_RATING = 5;

function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="size-6 text-[#4b4c53]" />
      ))}
    </div>
  );
}

export function ReviewList() {
  const [active, setActive] = useState("All rating");
  const shown =
    active === "All rating" || Number(active) === REVIEW_RATING ? reviews : [];

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {filters.map((filter) => {
          const selected = filter === active;
          const isAll = filter === "All rating";
          return (
            <button
              key={filter}
              type="button"
              data-testid={`review-filter-${filter.toLowerCase().replace(/\s+/g, "-")}`}
              aria-pressed={selected}
              onClick={() => setActive(filter)}
              className={
                selected
                  ? "inline-flex h-[43px] items-center rounded-[24px] bg-secondary-400 px-4 text-[16px] leading-[19px] font-medium text-neutral-950"
                  : "inline-flex h-12 items-center gap-1 rounded-[24px] bg-neutral-50 px-4 text-[16px] leading-[19px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              }
            >
              {isAll ? null : <StarIcon className="size-6 text-[#4b4c53]" />}
              {filter}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-6" data-testid="review-list">
        {shown.length > 0 ? (
          shown.map((review, idx) => (
            <article
              key={review.name}
              data-testid="review-card"
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
          ))
        ) : (
          <div
            data-testid="review-empty"
            className="flex flex-col items-center gap-4 rounded-[24px] border border-hairline bg-neutral-50 p-[39px] text-center"
          >
            <p className="text-[18px] leading-[29px] font-medium text-neutral-950">
              No {active}-star reviews yet
            </p>
            <p className="text-[15px] leading-[24px] text-neutral-700">
              Every review in this sample is 5-star. Clear the filter to read them all.
            </p>
            <button
              type="button"
              data-testid="review-clear"
              onClick={() => setActive("All rating")}
              className="inline-flex h-[46px] items-center justify-center rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
            >
              Show all reviews
            </button>
          </div>
        )}
      </div>
    </>
  );
}
