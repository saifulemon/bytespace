"use client";

import { useMemo, useState } from "react";
import { useToast } from "@/components/feedback";
import {
  activeFilterCount,
  CourseGrid,
  creatorPool,
  defaultCatalogState,
  FilterChips,
  FilterModal,
  filterCourses,
  type CatalogState,
  type ModalMode,
} from "@/components/catalog";

export function FollowRow() {
  const toast = useToast();
  const [following, setFollowing] = useState(false);

  const toggle = () => {
    setFollowing((v) => {
      toast(v ? "You unfollowed PurePearl Studio." : "You're now following PurePearl Studio.", "success");
      return !v;
    });
  };

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 min-[1440px]:w-[1198px]">
      <div className="flex flex-wrap gap-4">
        <span className="inline-flex h-[46px] items-center gap-2 rounded-[24px] bg-white px-6 text-[18px] leading-[22px] font-medium text-neutral-950">
          <span className="text-primary-600">3</span>
          Products
        </span>
        <span className="inline-flex h-[46px] items-center gap-2 rounded-[24px] bg-white px-6 text-[18px] leading-[22px] font-medium text-neutral-950">
          <span className="text-primary-600">{following ? "13" : "12"}</span>
          Followers
        </span>
      </div>

      <button
        type="button"
        data-testid="follow-button"
        aria-pressed={following}
        onClick={toggle}
        className={
          following
            ? "inline-flex h-[46px] items-center rounded-[24px] border border-hairline bg-white px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:border-neutral-400"
            : "inline-flex h-[46px] items-center rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-ink transition-colors hover:bg-secondary-500"
        }
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export function CreatorCourses() {
  const toast = useToast();
  const pool = useMemo(() => creatorPool(), []);
  const [state, setState] = useState<CatalogState>(defaultCatalogState);
  const [mode, setMode] = useState<ModalMode | null>(null);

  const results = useMemo(() => filterCourses(pool, state), [pool, state]);
  const active = activeFilterCount(state) > 0;

  const reset = () => setState(defaultCatalogState);

  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 lg:px-[120px]">
      <FilterChips
        className="flex flex-wrap items-center justify-between gap-4 pt-[62px] min-[1440px]:-ml-px"
        state={state}
        onOpen={setMode}
      />

      {active ? (
        <div className="mt-8 flex flex-wrap items-center gap-4" data-testid="active-filters">
          <span className="text-[16px] leading-[26px] text-neutral-700">
            <strong className="font-medium text-neutral-950">{results.length}</strong>{" "}
            {results.length === 1 ? "course" : "courses"}
          </span>
          <button
            type="button"
            data-testid="clear-all"
            onClick={reset}
            className="text-[16px] leading-[26px] font-medium text-primary-600 hover:underline"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <CourseGrid
        items={results}
        className="mt-10 grid grid-cols-1 justify-items-center gap-10 pb-[61px] sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:-ml-px min-[1440px]:w-[1199px]"
        onReset={reset}
      />

      <FilterModal
        mode={mode}
        state={state}
        onClose={() => setMode(null)}
        onApply={(draft) => {
          setState((s) => ({ ...s, ...draft, page: 1 }));
          setMode(null);
          toast("Filters applied.");
        }}
      />
    </main>
  );
}
