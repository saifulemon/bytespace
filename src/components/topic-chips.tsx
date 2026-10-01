"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/ui";
import { searchTabs } from "@/data/site";

const tabRows = [
  ["Featured", "Music", "Drawing & Painting", "Marketing", "Animation", "Social Media", "UI/UX Design", "Creative Marketing"],
  ["Digital Illustration", "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", "Photography"],
  ["Productivity", "Web Development", "Data Science", "Cooking", "+ More"],
];

const allTopics = [...new Set(tabRows.flat().filter((label) => label !== "+ More"))];

/** Topic tabs route to the matching /search category tab, everything else to a query. */
export function topicHref(label: string): string {
  return searchTabs.includes(label)
    ? `/search?tab=${encodeURIComponent(label)}`
    : `/search?q=${encodeURIComponent(label)}`;
}

function Chip({ label }: { label: string }) {
  const router = useRouter();

  if (label === "+ More") {
    return <MoreTopics />;
  }

  const active = tabRows[0][0] === label;

  return (
    <button
      type="button"
      data-testid={`topic-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      onClick={() => router.push(topicHref(label))}
      className={`rounded-[24px] px-3 py-[6px] text-[12px] leading-[16px] font-medium transition-colors sm:px-4 sm:py-3 sm:text-[16px] sm:leading-[19px] ${
        active
          ? "bg-secondary-400 text-neutral-950"
          : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
      }`}
    >
      {label}
    </button>
  );
}

function MoreTopics() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        data-testid="topic-more"
        onClick={() => setOpen(true)}
        className="text-[14px] leading-[19px] font-medium text-primary-800 sm:text-[16px]"
      >
        + More
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Explore more topics"
        description="Pick a topic and we'll take you to the matching courses."
        size="lg"
        testId="topics-modal"
      >
        <div className="flex flex-wrap gap-3">
          {allTopics.map((label) => (
            <button
              key={label}
              type="button"
              data-testid={`topic-option-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              onClick={() => {
                setOpen(false);
                router.push(topicHref(label));
              }}
              className="rounded-[24px] border border-hairline bg-neutral-50 px-4 py-2.5 text-[16px] leading-[26px] font-medium text-neutral-700 transition-colors hover:border-primary-600 hover:text-neutral-950"
            >
              {label}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

/** Home category chip rows — `variant="rows"` keeps the three wrapped rows of the design. */
export function TopicChips({ variant }: { variant: "rows" | "flat" }) {
  if (variant === "rows") {
    return (
      <>
        {tabRows.map((row, i) => (
          <div key={i} className="flex flex-wrap justify-center gap-4">
            {row.map((label) => (
              <Chip key={label} label={label} />
            ))}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {tabRows.flat().map((label, i) => (
        <Chip key={`${label}-${i}`} label={label} />
      ))}
    </>
  );
}
