"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SearchIcon } from "@/components/icons";
import { useToast } from "@/components/feedback";

const buttonClass =
  "inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-[24px] bg-secondary-400 px-6 text-[18px] leading-[22px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500 max-sm:w-full";

export function HeroSearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <form
      className="flex w-full max-w-[581px] flex-col gap-[18px] sm:flex-row sm:items-center sm:gap-4"
      onSubmit={submit}
      role="search"
    >
      <div className="flex h-[45px] w-full items-center gap-2 rounded-[24px] bg-white px-6 sm:h-[52px] sm:flex-1">
        <SearchIcon className="size-6 shrink-0 text-neutral-400" />
        <input
          type="search"
          placeholder="Course, topic, creator"
          aria-label="Search courses"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent text-[16px] leading-[26px] text-neutral-950 outline-none placeholder:text-neutral-400 sm:text-[18px] sm:leading-[29px]"
        />
      </div>
      <button
        type="submit"
        data-testid="hero-search-submit"
        className={`${buttonClass} w-full sm:w-auto`}
      >
        Search
      </button>
    </form>
  );
}

export function NewsletterForm() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("That doesn't look like a valid email address.");
      return;
    }
    setError("");
    setDone(true);
    setEmail("");
    toast("You're subscribed to the ByteSpace newsletter.", "success");
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          aria-invalid={error ? true : undefined}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
            if (done) setDone(false);
          }}
          className="h-[52px] w-full max-w-[376px] rounded-full border border-hairline px-6 text-[16px] leading-[26px] text-neutral-950 outline-none placeholder:text-neutral-950 focus:border-primary-600 max-sm:h-[48px] max-sm:text-[14px] max-sm:leading-[20px]"
        />
        <button
          type="submit"
          data-testid="newsletter-submit"
          className={`${buttonClass} max-sm:h-[48px] max-sm:text-[14px] max-sm:leading-[20px]`}
        >
          Search
        </button>
      </div>
      {error ? (
        <p role="alert" className="text-[13px] leading-[20px] text-primary-800">
          {error}
        </p>
      ) : null}
      {done && !error ? (
        <p role="status" data-testid="newsletter-success" className="text-[13px] leading-[20px] text-primary-800">
          Thanks! We&apos;ll send new releases to {email || "your inbox"}.
        </p>
      ) : null}
      <p className="max-w-[504px] text-[12px] leading-[19px] text-neutral-950 max-sm:text-[13px] max-sm:leading-[24px]">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our
        company.
      </p>
    </form>
  );
}
