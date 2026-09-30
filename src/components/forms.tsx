"use client";

import { SearchIcon } from "@/components/icons";

const buttonClass =
  "inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500";

export function HeroSearchBar() {
  return (
    <form
      className="flex w-full max-w-[581px] items-center gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex h-[52px] flex-1 items-center gap-2 rounded-[24px] bg-white px-6">
        <SearchIcon className="size-6 shrink-0 text-neutral-400" />
        <input
          type="search"
          placeholder="Course, topic, creator"
          aria-label="Search courses"
          className="w-full bg-transparent text-[18px] leading-[29px] text-neutral-950 outline-none placeholder:text-neutral-400"
        />
      </div>
      <button type="submit" className={buttonClass}>
        Search
      </button>
    </form>
  );
}

export function NewsletterForm() {
  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-wrap items-center gap-6">
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          className="h-[52px] w-full max-w-[376px] rounded-full border border-hairline px-6 text-[16px] leading-[26px] text-neutral-950 outline-none placeholder:text-neutral-950 focus:border-primary-600"
        />
        <button type="submit" className={buttonClass}>
          Search
        </button>
      </div>
      <p className="max-w-[504px] text-[12px] leading-[19px] text-neutral-950">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our
        company.
      </p>
    </form>
  );
}
