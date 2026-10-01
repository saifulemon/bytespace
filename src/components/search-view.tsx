"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon, SearchIcon } from "@/components/icons";
import { GridBackdrop } from "@/components/decor";
import { HeaderSlot } from "@/components/site";
import { useToast } from "@/components/feedback";
import {
  activeFilterCount,
  buildPool,
  CourseGrid,
  defaultCatalogState,
  FilterChips,
  FilterModal,
  filterCourses,
  Pagination,
  scopeOptions,
  sortOptions,
  TopicTabs,
  type CatalogState,
  type ModalMode,
  type Scope,
} from "@/components/catalog";
import { courseCategories, searchTabs } from "@/data/site";

const PAGE_SIZE = 18;

export function SearchView() {
  const toast = useToast();
  const pool = useMemo(() => buildPool(15, PAGE_SIZE), []);
  const [state, setState] = useState<CatalogState>(defaultCatalogState);
  const [mode, setMode] = useState<ModalMode | null>(null);
  const [input, setInput] = useState("");
  const [scopeOpen, setScopeOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  // One-time seed of deep links (?q / ?tab / ?category / ?in) coming from the
  // home, footer and category cards. This reads an external system at mount;
  // the alternative (useSearchParams) would move the whole route out of static
  // prerendering, which the spec requires.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const tab = params.get("tab");
    const category = params.get("category");
    const scope = params.get("in");

    setState((s) => {
      const next = { ...s };
      if (tab && searchTabs.includes(tab)) next.tab = tab;
      if (q && !(tab && searchTabs.includes(tab)) && searchTabs.includes(q)) {
        next.tab = q;
      } else if (q) {
        next.query = q;
        next.page = 1;
      }
      if (category && (courseCategories as readonly string[]).includes(category)) {
        next.categories = [category];
        next.page = 1;
      }
      if (scope && scopeOptions.some((o) => o.value === scope)) next.scope = scope as Scope;
      return next;
    });

    if (q && !searchTabs.includes(q)) setInput(q);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!scopeOpen) return;
    const onDown = (e: PointerEvent) => {
      if (scopeRef.current && !scopeRef.current.contains(e.target as Node)) setScopeOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setScopeOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [scopeOpen]);

  const results = useMemo(() => filterCourses(pool, state), [pool, state]);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(state.page, totalPages);
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const patch = (p: Partial<CatalogState>) => setState((s) => ({ ...s, ...p, page: 1 }));

  const scrollToResults = () => {
    const el = resultsRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patch({ query: input.trim() });
    if (input.trim()) toast(`Showing courses for “${input.trim()}”`);
    scrollToResults();
  };

  const resetAll = () =>
    setState({
      ...defaultCatalogState,
      query: "",
      scope: "courses",
    });

  const query = state.query.trim();
  const summaryActive =
    query.length > 0 || state.tab !== "Featured" || activeFilterCount(state) > 0;

  const scopeLabel =
    scopeOptions.find((o) => o.value === state.scope)?.label ?? "Courses";

  return (
    <>
      <section data-aos="fade-up" className="relative isolate h-[430px] w-full overflow-hidden bg-primary-800 sm:h-[360px]">
        <GridBackdrop />
        <HeaderSlot />

        <div className="absolute inset-x-0 top-[164px] flex flex-col items-center gap-8 px-6">
          <h1 className="text-center font-heading text-[28px] leading-[34px] font-semibold tracking-[-0.01em] text-neutral-50 md:text-[36px] md:leading-[43px]">
            Find Your Next Course
          </h1>

          <form
            className="flex w-full max-w-[624px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            onSubmit={submit}
            role="search"
          >
            <label className="flex h-[52px] w-full min-w-0 items-center gap-2 rounded-[24px] bg-white px-6 sm:flex-1">
              <SearchIcon className="size-6 shrink-0 text-neutral-400" />
              <input
                type="search"
                placeholder="Search"
                aria-label="Search courses"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[18px] leading-[29px] text-neutral-950 outline-none placeholder:text-neutral-400"
              />
            </label>

            <div className="relative w-full shrink-0 sm:w-auto" ref={scopeRef}>
              <button
                type="button"
                data-testid="scope-toggle"
                aria-haspopup="listbox"
                aria-expanded={scopeOpen}
                onClick={() => setScopeOpen((v) => !v)}
                className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500 sm:w-auto"
              >
                {scopeLabel}
                <ChevronDownIcon
                  className={cn("size-6 transition-transform duration-200", scopeOpen && "rotate-180")}
                />
              </button>

              {scopeOpen ? (
                <ul
                  role="listbox"
                  aria-label="Search within"
                  data-testid="scope-menu"
                  className="absolute right-0 bottom-[calc(100%+8px)] z-30 w-[200px] rounded-[16px] border border-hairline bg-white py-1 shadow-[0_18px_44px_-24px_rgba(16,24,40,0.5)]"
                >
                  {scopeOptions.map((option) => {
                    const active = option.value === state.scope;
                    return (
                      <li key={option.value}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          data-testid={`scope-${option.value}`}
                          onClick={() => {
                            patch({ scope: option.value });
                            setScopeOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-[16px] leading-[26px] transition-colors",
                            active
                              ? "bg-neutral-50 font-medium text-neutral-950"
                              : "text-neutral-700 hover:bg-neutral-50",
                          )}
                        >
                          {option.label}
                          {active ? (
                            <span className="text-primary-600" aria-hidden>
                              ✓
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1440px] px-6 lg:px-[120px]">
        <FilterChips
          className="pt-[72px] min-[1440px]:-ml-px"
          state={state}
          onOpen={setMode}
        />

        <div ref={resultsRef} />

        <TopicTabs active={state.tab} onSelect={(tab) => patch({ tab })} />

        {summaryActive ? (
          <div className="mt-8 flex flex-wrap items-center gap-3" data-testid="active-filters">
            <span className="text-[16px] leading-[26px] text-neutral-700">
              <strong className="font-medium text-neutral-950">{results.length}</strong>{" "}
              {results.length === 1 ? "course" : "courses"}
              {query ? ` for “${query}”` : ""}
            </span>

            {state.tab !== "Featured" ? (
              <SummaryPill onRemove={() => patch({ tab: "Featured" })}>{state.tab}</SummaryPill>
            ) : null}
            {state.categories.map((c) => (
              <SummaryPill
                key={c}
                onRemove={() =>
                  patch({ categories: state.categories.filter((x) => x !== c) })
                }
              >
                {c}
              </SummaryPill>
            ))}
            {state.levels.map((l) => (
              <SummaryPill key={l} onRemove={() => patch({ levels: [] })}>
                {l}
              </SummaryPill>
            ))}
            {state.sort !== "relevant" ? (
              <SummaryPill onRemove={() => patch({ sort: "relevant" })}>
                {sortOptions.find((s) => s.value === state.sort)?.label}
              </SummaryPill>
            ) : null}
            {query ? (
              <SummaryPill onRemove={() => patch({ query: "" })}>“{query}”</SummaryPill>
            ) : null}

            <button
              type="button"
              data-testid="clear-all"
              onClick={resetAll}
              className="text-[16px] leading-[26px] font-medium text-primary-600 hover:underline"
            >
              Clear all
            </button>
          </div>
        ) : null}

        <CourseGrid
          items={visible}
          className="mt-[77px] grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:ml-px min-[1440px]:w-[1199px]"
          onReset={resetAll}
        />

        <Pagination
          page={current}
          totalPages={totalPages}
          onPage={(page) => {
            setState((s) => ({ ...s, page }));
            scrollToResults();
          }}
          className="mt-[72px] flex items-center justify-center gap-6 pb-[72px] lg:translate-x-[25px]"
        />

        <FilterModal
          mode={mode}
          state={state}
          onClose={() => setMode(null)}
          onApply={(draft) => {
            setState((s) => ({ ...s, ...draft, page: 1 }));
            setMode(null);
            toast("Filters applied.");
            scrollToResults();
          }}
        />
      </main>
    </>
  );
}

function SummaryPill({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex h-[34px] items-center gap-2 rounded-[24px] border border-hairline bg-white px-4 text-[14px] leading-[19px] font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950"
    >
      {children}
      <span aria-hidden className="text-[15px] leading-none">
        ×
      </span>
      <span className="sr-only">Remove filter</span>
    </button>
  );
}
