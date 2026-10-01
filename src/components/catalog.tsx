"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  CategoryFilterIcon,
  FilterIcon,
  LevelIcon,
  SortIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { Modal, ModalOption } from "@/components/ui";
import { CourseCard } from "@/components/CourseCard";
import { courseCategories, courses, searchTabs, type Course } from "@/data/site";

export type PoolItem = Course & { uid: string };
export type Scope = "courses" | "creators" | "categories";
export type SortKey = "relevant" | "title-asc" | "title-desc";

export type CatalogState = {
  tab: string;
  query: string;
  scope: Scope;
  categories: string[];
  levels: string[];
  sort: SortKey;
  page: number;
};

export const defaultCatalogState: CatalogState = {
  tab: "Featured",
  query: "",
  scope: "courses",
  categories: [],
  levels: [],
  sort: "relevant",
  page: 1,
};

export const levelOptions = ["Beginner", "Intermediate", "Advanced"];

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "relevant", label: "Most relevant" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
];

export const scopeOptions: { value: Scope; label: string }[] = [
  { value: "courses", label: "Courses" },
  { value: "creators", label: "Creators" },
  { value: "categories", label: "Categories" },
];

/** Repeats the seeded courses `cycles` times so pagination has a real dataset. */
export function buildPool(cycles: number, perPage: number): PoolItem[] {
  return Array.from({ length: cycles * courses.length }, (_, i) => {
    // Every page after the first is offset by one course so "Next page" always
    // surfaces a different set. Page 0 keeps the seeded order byte-for-byte.
    const page = perPage > 0 ? Math.floor(i / perPage) : 0;
    const course = courses[(i + page) % courses.length];
    return { ...course, uid: `${i}-${course.title}` };
  });
}

export function creatorPool(): PoolItem[] {
  return courses.map((course, i) => ({ ...course, uid: `${i}-${course.title}` }));
}

export function activeFilterCount(state: CatalogState): number {
  return (
    state.categories.length +
    state.levels.length +
    (state.sort !== "relevant" ? 1 : 0)
  );
}

export function filterCourses(pool: PoolItem[], state: CatalogState): PoolItem[] {
  const query = state.query.trim().toLowerCase();

  const filtered = pool.filter((course) => {
    if (state.tab !== "Featured" && !course.tags.includes(state.tab)) return false;
    if (state.categories.length && !state.categories.some((c) => course.categories.includes(c)))
      return false;
    if (state.levels.length && !state.levels.includes(course.level)) return false;
    if (query) {
      if (state.scope === "creators" && !course.author.toLowerCase().includes(query)) return false;
      if (state.scope === "categories" && !course.categories.some((c) => c.toLowerCase().includes(query)))
        return false;
      if (
        state.scope === "courses" &&
        !(
          course.title.toLowerCase().includes(query) ||
          course.tags.some((t) => t.toLowerCase().includes(query)) ||
          course.categories.some((c) => c.toLowerCase().includes(query))
        )
      )
        return false;
    }
    return true;
  });

  if (state.sort === "title-asc") return filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (state.sort === "title-desc") return filtered.sort((a, b) => b.title.localeCompare(a.title));
  return filtered;
}

const chipBase =
  "inline-flex h-12 items-center gap-1 rounded-[24px] bg-white px-[15px] text-[16px] leading-[19px] font-medium transition-colors";
const chipIdle = "border border-hairline text-neutral-700 hover:border-neutral-400";
const chipActive = "border border-neutral-950 text-neutral-950 hover:border-neutral-950";

function ChipButton({
  icon,
  label,
  active,
  onClick,
  testId,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  testId: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      aria-pressed={active}
      onClick={onClick}
      className={cn(chipBase, active ? chipActive : chipIdle, className)}
    >
      <span className="grid size-6 place-items-center">{icon}</span>
      {label}
    </button>
  );
}

export type ModalMode = "all" | "level" | "category" | "sort";

export function FilterChips({
  className,
  state,
  onOpen,
}: {
  className: string;
  state: CatalogState;
  onOpen: (mode: ModalMode) => void;
}) {
  const count = activeFilterCount(state);
  const levelLabel = state.levels.length === 1 ? `Level: ${state.levels[0]}` : "Level";
  const categoryLabel = state.categories.length
    ? `Category (${state.categories.length})`
    : "Category";
  const sortLabel = sortOptions.find((s) => s.value === state.sort)?.label ?? "Most relevant";

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <ChipButton
          icon={<FilterIcon className="size-5" />}
          label={count ? `Filter (${count})` : "Filter"}
          active={count > 0}
          onClick={() => onOpen("all")}
          testId="chip-filter"
        />
        <ChipButton
          icon={<LevelIcon className="size-5" />}
          label={levelLabel}
          active={state.levels.length > 0}
          onClick={() => onOpen("level")}
          testId="chip-level"
        />
        <ChipButton
          icon={<CategoryFilterIcon className="size-5" />}
          label={categoryLabel}
          active={state.categories.length > 0}
          onClick={() => onOpen("category")}
          testId="chip-category"
        />
        <ChipButton
          className="lg:ml-auto"
          icon={<SortIcon className="size-5" />}
          label={sortLabel}
          active={state.sort !== "relevant"}
          onClick={() => onOpen("sort")}
          testId="chip-sort"
        />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[14px] leading-[20px] font-medium text-neutral-950">{title}</h3>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

type Draft = { categories: string[]; levels: string[]; sort: SortKey };

function FilterDialog({
  mode,
  initial,
  onClose,
  onApply,
}: {
  mode: ModalMode;
  initial: Draft;
  onClose: () => void;
  onApply: (draft: Draft) => void;
}) {
  const [draft, setDraft] = useState<Draft>(initial);

  const toggle = (key: "categories" | "levels", value: string) => {
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value],
    }));
  };

  const title =
    mode === "level"
      ? "Filter by level"
      : mode === "category"
        ? "Filter by category"
        : mode === "sort"
          ? "Sort courses"
          : "Filter courses";

  const description =
    mode === "all"
      ? "Narrow the list by category and level, then choose how to sort it."
      : mode === "sort"
        ? "Choose the order you want the courses in."
        : "Pick an option and apply it to the list.";

  return (
    <Modal
      open
      onClose={onClose}
      title={title}
      description={description}
      testId="filter-modal"
      footer={
        <>
          <button
            type="button"
            data-testid="filter-clear"
            onClick={() => setDraft({ categories: [], levels: [], sort: "relevant" })}
            className="inline-flex h-[42px] items-center justify-center rounded-[24px] border border-hairline px-5 text-[16px] leading-[26px] font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950"
          >
            Clear all
          </button>
          <button
            type="button"
            data-testid="filter-apply"
            onClick={() => onApply(draft)}
            className="inline-flex h-[42px] items-center justify-center rounded-[24px] bg-secondary-400 px-5 text-[16px] leading-[26px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
          >
            Apply filters
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        {mode === "all" || mode === "category" ? (
          <Section title="Category">
            <ModalOption
              role="option"
              active={draft.categories.length === 0}
              onClick={() => setDraft((d) => ({ ...d, categories: [] }))}
            >
              All categories
            </ModalOption>
            {courseCategories.map((category) => (
              <ModalOption
                key={category}
                role="option"
                active={draft.categories.includes(category)}
                onClick={() => toggle("categories", category)}
              >
                {category}
              </ModalOption>
            ))}
          </Section>
        ) : null}

        {mode === "all" || mode === "level" ? (
          <Section title="Level">
            <ModalOption
              role="option"
              active={draft.levels.length === 0}
              onClick={() => setDraft((d) => ({ ...d, levels: [] }))}
            >
              All levels
            </ModalOption>
            {levelOptions.map((level) => (
              <ModalOption
                key={level}
                role="option"
                active={draft.levels.includes(level)}
                onClick={() => setDraft((d) => ({ ...d, levels: [level] }))}
              >
                {level}
              </ModalOption>
            ))}
          </Section>
        ) : null}

        {mode === "all" || mode === "sort" ? (
          <Section title="Sort by">
            {sortOptions.map((option) => (
              <ModalOption
                key={option.value}
                role="option"
                active={draft.sort === option.value}
                onClick={() => setDraft((d) => ({ ...d, sort: option.value }))}
              >
                {option.label}
              </ModalOption>
            ))}
          </Section>
        ) : null}
      </div>
    </Modal>
  );
}

export function FilterModal({
  mode,
  state,
  onClose,
  onApply,
}: {
  mode: ModalMode | null;
  state: CatalogState;
  onClose: () => void;
  onApply: (draft: Draft) => void;
}) {
  if (!mode) return null;
  return (
    <FilterDialog
      mode={mode}
      initial={{ categories: state.categories, levels: state.levels, sort: state.sort }}
      onClose={onClose}
      onApply={onApply}
    />
  );
}

export function TopicTabs({
  active,
  onSelect,
  className = "mt-8 flex flex-wrap gap-4 min-[1440px]:justify-between",
}: {
  active: string;
  onSelect: (tab: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {searchTabs.map((tab) => (
        <button
          key={tab}
          type="button"
          data-testid={`tab-${tab.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          aria-pressed={tab === active}
          onClick={() => onSelect(tab)}
          className={
            tab === active
              ? "inline-flex h-[43px] items-center rounded-[24px] bg-secondary-400 px-4 text-[16px] leading-[19px] font-medium text-neutral-950"
              : "inline-flex h-[43px] items-center rounded-[24px] bg-neutral-50 px-4 text-[16px] leading-[19px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onPage,
  className,
}: {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
  className: string;
}) {
  if (totalPages <= 1) return null;

  const go = (delta: number) => {
    const next = page + delta;
    onPage(next < 1 ? totalPages : next > totalPages ? 1 : next);
  };

  return (
    <nav className={className} aria-label="Pagination">
      <button
        type="button"
        aria-label="Previous page"
        data-testid="page-prev"
        onClick={() => go(-1)}
        className="grid h-12 w-14 place-items-center rounded-[24px] border border-hairline bg-white text-neutral-700 transition-colors hover:border-neutral-400"
      >
        <ChevronLeftIcon className="size-6" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          data-testid={`page-${n}`}
          aria-current={n === page ? "page" : undefined}
          onClick={() => onPage(n)}
          className={
            n === page
              ? "font-heading text-[20px] leading-[28px] font-semibold text-hairline"
              : "font-heading text-[20px] leading-[28px] font-semibold text-neutral-950 hover:text-primary-600"
          }
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        data-testid="page-next"
        onClick={() => go(1)}
        className="grid h-12 w-14 place-items-center rounded-[24px] border border-hairline bg-white text-neutral-950 transition-colors hover:border-neutral-400"
      >
        <ChevronRightIcon className="size-6" />
      </button>
    </nav>
  );
}

export function CourseGrid({
  items,
  className,
  onReset,
}: {
  items: PoolItem[];
  className: string;
  onReset: () => void;
}) {
  if (items.length > 0) {
    return (
      <div className={className}>
        {items.map((item) => (
          <CourseCard key={item.uid} course={item} />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        data-testid="empty-state"
        className="col-span-full flex w-full flex-col items-center gap-4 rounded-[24px] border border-hairline bg-neutral-50 px-6 py-16 text-center"
      >
        <p className="text-[18px] leading-[29px] font-medium text-neutral-950">
          No courses match these filters
        </p>
        <p className="max-w-[440px] text-[15px] leading-[24px] text-neutral-700">
          Try another level or category, or clear everything to see the full course library again.
        </p>
        <button
          type="button"
          data-testid="empty-clear"
          onClick={onReset}
          className="inline-flex h-[46px] items-center justify-center rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
