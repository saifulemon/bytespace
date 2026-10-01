"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGETS = "section, main > div, [data-reveal]";
const SKIP = '[role="dialog"], [data-reveal-skip]';

/**
 * Fades/slides every top-level block (sections, main children, explicit
 * [data-reveal] hooks) in as it scrolls into view. Uses a rAF-throttled
 * scroll check so fast scrolling can never skip a block, and reveals
 * anything already on screen right after hydration for a load-in effect.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter((el) => {
      if (el.closest(SKIP)) return false;
      if (el.hasAttribute("data-reveal")) return true;
      if (el.tagName === "SECTION") return !el.parentElement?.closest("section");
      return !el.querySelector("section");
    });
    if (!targets.length) return;

    const remaining = new Set(targets);
    for (const el of targets) el.classList.add("reveal-block");

    const check = () => {
      const limit = window.innerHeight - 60;
      for (const el of Array.from(remaining)) {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-revealed");
          remaining.delete(el);
        }
      }
      if (!remaining.size) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Let the hidden state paint first so the reveal transition plays.
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(check);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf1);
    };
  }, [pathname]);

  return null;
}
