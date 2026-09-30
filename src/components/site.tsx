"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CartIcon, LogoMark } from "@/components/icons";
import { NewsletterForm } from "@/components/forms";
import { footerBrowse, footerPlatform, navLinks } from "@/data/site";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-[40px] lg:px-[120px]", className)} {...props} />
  );
}

export function Logo({
  dark = false,
  wordmark = true,
}: {
  dark?: boolean;
  wordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className="relative block h-[37px] w-[171px] shrink-0"
      aria-label="ByteSpace home"
    >
      <LogoMark className="absolute top-0 left-0 h-[31.5px] w-[28.9px] text-secondary-400" />
      {wordmark ? (
        <span
          className={cn(
            "absolute top-[7px] left-[37px] font-logo text-[24px] leading-[30px] font-bold whitespace-nowrap",
            dark ? "text-neutral-950" : "text-neutral-50",
          )}
        >
          ByteSpace
        </span>
      ) : null}
    </Link>
  );
}

/**
 * Fixed-position spacer that replaces <Header /> inside a hero section so the
 * layout keeps the 120px the header used to occupy in flow. The real header is
 * rendered at page root instead (see <Header />).
 */
export function HeaderSlot() {
  return <div aria-hidden="true" className="h-[120px] w-full" />;
}

export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = tone === "dark" || stuck;
  const fg = dark ? "text-neutral-950" : "text-neutral-50";
  const navLink = cn("text-[16px] transition-[color,opacity] duration-300 hover:opacity-70", fg);
  const actionLink = cn(
    "text-[16px] leading-6 transition-[color,opacity] duration-300 hover:opacity-70",
    fg,
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full motion-reduce:transition-none",
        "transition-[height,background-color,box-shadow] duration-300 ease-out",
        stuck
          ? "h-[80px] bg-white/85 shadow-[0_1px_0_0_#e5e6e8,0_18px_44px_-30px_rgba(16,24,40,0.5)] backdrop-blur-xl"
          : "h-[120px] bg-transparent shadow-none backdrop-blur-none",
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <div
          className={cn(
            "lg:ml-[2px] transition-[color] duration-300",
            stuck ? "lg:self-center" : "lg:mt-[35px] lg:self-start",
          )}
        >
          <Logo dark={dark} />
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-start gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={cn(navLink, l.label === "Home" ? "leading-[19px]" : "leading-[26px]")}
            >
              <span className={l.label === "Home" ? "font-medium" : ""}>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className={cn("flex items-center gap-6 transition-[color] duration-300", fg)}>
          <Link href="/login" className={cn(actionLink, "hidden sm:inline")}>
            Sign In
          </Link>
          <Link href="/register" className={cn(actionLink, "hidden sm:inline")}>
            Join Us
          </Link>
          <button type="button" aria-label="Cart" className="grid size-6 place-items-center">
            <CartIcon className="size-6" />
          </button>
        </div>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-hairline bg-white">
      <Container className="flex flex-col gap-[130px] pt-[70px] pb-[48px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[92px]">
          <div className="flex w-full shrink-0 flex-col gap-[45px] lg:w-[528px]">
            <div className="flex flex-col gap-4">
              <div className="h-[37px]">
                <Logo dark />
              </div>
              <p className="text-[14px] leading-[22px] text-neutral-950">
                Stay Up to date with our latest features and releases by joining our newsletter.
              </p>
            </div>

            <NewsletterForm />
          </div>

          <div className="flex flex-1 flex-wrap gap-10 lg:flex-nowrap lg:items-start lg:justify-between">
            <div className="flex w-[167px] shrink-0 flex-col gap-6">
              <span className="text-[16px] leading-6 text-neutral-950">Browse</span>
              <ul className="flex flex-col gap-4">
                {footerBrowse.slice(0, 5).map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </ul>
            </div>

            <ul className="flex w-[167px] shrink-0 flex-col gap-4 lg:pt-[48px]">
              {footerBrowse.slice(5).map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </ul>

            <div className="flex w-[166px] shrink-0 flex-col gap-6">
              <span className="text-[16px] leading-6 text-neutral-950">Platform</span>
              <ul className="flex flex-col gap-4">
                {footerPlatform.map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">
          <div className="h-px w-full bg-hairline" />
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <p className="text-[12px] leading-[19px] text-neutral-950">
              @ 2023 ByteSpace. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6">
              {["Privacy Policy", "Terms of Service", "Cookies Settings"].map((l) => (
                <span key={l} className="text-[12px] leading-[19px] text-neutral-950">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li className="text-[14px] leading-[22px]">
      <Link href={href} className="leading-[22px] text-neutral-950 hover:text-primary-600">
        {label}
      </Link>
    </li>
  );
}

export function Button({
  variant = "lime",
  className,
  ...props
}: { variant?: "lime" | "blue" | "outline" | "white" } & ComponentProps<"button">) {
  const variants: Record<string, string> = {
    lime: "bg-secondary-400 text-neutral-950 hover:bg-secondary-500",
    blue: "bg-primary-600 text-white hover:bg-primary-700",
    outline: "border border-hairline text-neutral-950 hover:border-neutral-950",
    white: "bg-white text-neutral-950 hover:bg-neutral-50",
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-[46px] items-center justify-center gap-2 rounded-[24px] px-6 text-[18px] leading-[22px] font-medium transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex h-[43px] items-center rounded-full bg-neutral-50 px-4 text-[16px] leading-[19px] font-medium text-neutral-700">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-[588px] font-heading text-[36px] leading-[43px] font-semibold tracking-[-0.01em] text-neutral-950 md:text-[44px] md:leading-[53px]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[917px] text-[18px] leading-[29px] text-body">{description}</p>
      ) : null}
    </div>
  );
}
