"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(items.length - 1);
  const lastIndex = items.length - 1;

  return (
    <div>
      <div className="max-md:overflow-hidden">
        <div
          className="grid grid-cols-1 items-start gap-[41px] max-md:flex max-md:gap-0 max-md:transition-transform max-md:duration-500 max-md:[transform:translateX(calc(var(--slide)*-100%))] md:grid-cols-2 xl:grid-cols-3"
          style={{ "--slide": index } as CSSProperties}
        >
          {items.map((t) => (
            <div key={t.name} className="max-md:flex max-md:w-full max-md:shrink-0 max-md:justify-center">
              <figure className="flex w-full max-w-[373px] flex-col gap-6 rounded-[24px] bg-white p-6">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="size-20 rounded-full object-cover"
                />
                <figcaption className="flex flex-col">
                  <span className="font-heading text-[20px] leading-[28px] font-semibold tracking-[-0.01em] text-black max-sm:leading-[24px]">
                    {t.name}
                  </span>
                  <span className="text-[18px] leading-[29px] text-primary-800">
                    {t.role}
                  </span>
                </figcaption>
                <blockquote className="text-[18px] leading-[29px] text-[#4f4f4f]">
                  {t.quote}
                </blockquote>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setIndex(Math.max(0, index - 1))}
          className="grid size-10 place-items-center rounded-full border border-hairline bg-white text-neutral-950"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? "h-2 w-6 rounded-full bg-neutral-950"
                  : "size-2 rounded-full bg-neutral-300"
              }
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setIndex(Math.min(lastIndex, index + 1))}
          className="grid size-10 place-items-center rounded-full border border-hairline bg-white text-neutral-950"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
