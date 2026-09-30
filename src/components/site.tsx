"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CartIcon, CloseIcon, LogoMark, MenuIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/forms";
import { Modal } from "@/components/ui";
import { useCart } from "@/components/cart";
import { footerBrowse, footerPlatform, infoPages, navLinks } from "@/data/site";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-10 lg:px-[120px]", className)}
      {...props}
    />
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
      className="relative block h-[26px] w-[120px] shrink-0 sm:h-[37px] sm:w-[171px]"
      aria-label="ByteSpace home"
    >
      <LogoMark className="absolute top-0 left-0 h-[21.3px] w-[19.6px] text-secondary-400 sm:h-[31.5px] sm:w-[28.9px]" />
      {wordmark ? (
        <span
          className={cn(
            "absolute top-[4px] left-[26px] font-logo text-[18px] leading-[22px] font-bold whitespace-nowrap sm:top-[7px] sm:left-[37px] sm:text-[24px] sm:leading-[30px]",
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
  return <div aria-hidden="true" className="h-[76px] w-full sm:h-[120px]" />;
}

/** Underline that scales in when the link points at the current route. */
function ActiveMarker({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-[3px] right-0 left-0 h-[2px] origin-left rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none",
        on ? "scale-x-100" : "scale-x-0",
      )}
    />
  );
}

/** Link text plus its active underline, so the bar matches the text width. */
function NavLabel({
  children,
  active,
  className,
}: {
  children: ReactNode;
  active: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative", active && "font-medium", className)}>
      {children}
      <ActiveMarker on={active} />
    </span>
  );
}

/** Does `href` own the current pathname? Catalog detail pages count as Courses. */
function useIsActive() {
  const pathname = usePathname();
  return (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/search")
      return pathname.startsWith("/search") || pathname.startsWith("/course");
    return pathname === href || pathname.startsWith(`${href}/`);
  };
}

export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();
  const isActive = useIsActive();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onWide = () => {
      if (mq.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  const stuck = scrolled || menuOpen;
  const dark = tone === "dark" || stuck;
  const fg = dark ? "text-neutral-950" : "text-neutral-50";
  const navLink = cn(
    "relative text-[16px] transition-[color,opacity] duration-300 hover:opacity-70 after:absolute after:-inset-x-1 after:-inset-y-3 after:content-['']",
    fg,
  );
  const actionLink = cn(
    "relative text-[16px] leading-6 transition-[color,opacity] duration-300 hover:opacity-70 after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']",
    fg,
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full motion-reduce:transition-none",
        "transition-[height,background-color,box-shadow] duration-300 ease-out",
        stuck
          ? "h-[64px] bg-white shadow-[0_1px_0_0_#e5e6e8,0_18px_44px_-30px_rgba(16,24,40,0.5)] sm:h-[80px]"
          : "h-[76px] bg-transparent shadow-none sm:h-[120px]",
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
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(navLink, l.label === "Home" ? "leading-[19px]" : "leading-[26px]")}
              >
                <NavLabel active={active} className={l.label === "Home" ? "font-medium" : undefined}>
                  {l.label}
                </NavLabel>
              </Link>
            );
          })}
        </nav>

        <div className={cn("flex items-center gap-6 transition-[color] duration-300", fg)}>
          <Link
            href="/login"
            aria-current={isActive("/login") ? "page" : undefined}
            className={cn(actionLink, "hidden sm:inline")}
          >
            <NavLabel active={isActive("/login")}>Sign In</NavLabel>
          </Link>
          <Link
            href="/register"
            aria-current={isActive("/register") ? "page" : undefined}
            className={cn(actionLink, "hidden sm:inline")}
          >
            <NavLabel active={isActive("/register")}>Join Us</NavLabel>
          </Link>
          <button
            type="button"
            aria-label="Cart"
            data-testid="header-cart"
            onClick={cart.open}
            className="relative grid size-6 place-items-center after:absolute after:-inset-[10px] after:content-['']"
          >
            <CartIcon className="size-6" />
          </button>
          <button
            type="button"
            className="relative -mr-2 grid size-10 place-items-center after:absolute after:-inset-[2px] after:content-[''] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-hairline bg-white shadow-[0_18px_44px_-30px_rgba(16,24,40,0.5)] md:hidden"
        >
          <Container className="flex flex-col py-3">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="border-b border-neutral-100 py-3 text-[16px] leading-[26px] text-neutral-950 last:border-b-0 hover:text-primary-600"
                >
                  <NavLabel active={active}>{l.label}</NavLabel>
                </Link>
              );
            })}
            <div className="mt-3 flex items-center gap-3 border-t border-neutral-100 pt-3 sm:hidden">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                aria-current={isActive("/login") ? "page" : undefined}
                className="inline-flex h-[44px] flex-1 items-center justify-center rounded-[24px] border border-hairline text-[16px] leading-6 text-neutral-950"
              >
                <NavLabel active={isActive("/login")}>Sign In</NavLabel>
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                aria-current={isActive("/register") ? "page" : undefined}
                className="inline-flex h-[44px] flex-1 items-center justify-center rounded-[24px] bg-secondary-400 text-[16px] leading-6 text-neutral-950"
              >
                <NavLabel active={isActive("/register")}>Join Us</NavLabel>
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  const [info, setInfo] = useState<string | null>(null);
  const page = info ? infoPages[info] : null;

  return (
    <footer className="w-full border-t border-hairline bg-white">
      <Container className="flex flex-col gap-14 pt-12 pb-10 md:gap-24 md:pt-[70px] md:pb-[48px] min-[1440px]:gap-[130px]!">
        <div className="flex flex-col gap-10 md:gap-12 min-[1440px]:flex-row min-[1440px]:gap-[92px]!">
          <div className="flex w-full shrink-0 flex-col gap-8 md:gap-[45px] min-[1440px]:w-[528px]">
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

          <div className="flex flex-1 flex-wrap gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-10 min-[1440px]:flex-nowrap min-[1440px]:items-start min-[1440px]:justify-between">
            <div className="flex w-[calc(50%_-_12px)] shrink-0 flex-col gap-6 sm:w-[calc(50%_-_20px)] md:w-[167px]">
              <span className="text-[16px] leading-6 text-neutral-950">Browse</span>
              <ul className="flex flex-col gap-4">
                {footerBrowse.slice(0, 5).map((l) => (
                  <FooterLink key={l.label} {...l} />
                ))}
              </ul>
            </div>

            <ul className="flex w-[calc(50%_-_12px)] shrink-0 flex-col gap-4 sm:w-[calc(50%_-_20px)] md:w-[167px] min-[1440px]:pt-[48px]">
              {footerBrowse.slice(5).map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </ul>

            <div className="flex w-[calc(50%_-_12px)] shrink-0 flex-col gap-6 sm:w-[calc(50%_-_20px)] md:w-[166px]">
              <span className="text-[16px] leading-6 text-neutral-950">Platform</span>
              <ul className="flex flex-col gap-4">
                {footerPlatform.map((l) =>
                  infoPages[l.label] ? (
                    <li key={l.label} className="text-[14px] leading-[22px]">
                      <button
                        type="button"
                        data-testid={`footer-${l.label.toLowerCase()}`}
                        onClick={() => setInfo(l.label)}
                        className="relative inline-block leading-[22px] text-neutral-950 after:absolute after:-inset-x-2 after:-inset-y-2 after:content-[''] hover:text-primary-600"
                      >
                        {l.label}
                      </button>
                    </li>
                  ) : (
                    <FooterLink key={l.label} {...l} />
                  ),
                )}
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
                <button
                  key={l}
                  type="button"
                  data-testid={`footer-${l.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setInfo(l)}
                  className="relative inline-block text-left text-[12px] leading-[19px] text-neutral-950 after:absolute after:-inset-x-2 after:-inset-y-2 after:content-[''] hover:text-primary-600"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Modal
        open={page !== null}
        onClose={() => setInfo(null)}
        title={page?.title ?? ""}
        testId="footer-info-modal"
        footer={
          <button
            type="button"
            onClick={() => setInfo(null)}
            className="inline-flex h-[42px] items-center justify-center rounded-[24px] bg-secondary-400 px-5 text-[16px] leading-[26px] font-medium text-neutral-950 transition-colors hover:bg-secondary-500"
          >
            Got it
          </button>
        }
      >
        <div className="flex flex-col gap-4">
          {page?.body.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-[26px] text-neutral-700">
              {paragraph}
            </p>
          ))}
        </div>
      </Modal>
    </footer>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li className="text-[14px] leading-[22px]">
      <Link
        href={href}
        className="relative inline-block leading-[22px] text-neutral-950 after:absolute after:-inset-x-2 after:-inset-y-2 after:content-[''] hover:text-primary-600"
      >
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
        <span className="inline-flex h-[34px] items-center rounded-full bg-neutral-50 px-4 text-[14px] leading-[19px] font-medium text-neutral-700 sm:h-[43px] sm:text-[16px]">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-[588px] font-heading text-[27px] leading-[33px] font-semibold tracking-[-0.01em] text-neutral-950 sm:text-[36px] sm:leading-[43px] md:text-[44px] md:leading-[53px]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[917px] text-[13px] leading-[20px] text-body sm:text-[18px] sm:leading-[29px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
