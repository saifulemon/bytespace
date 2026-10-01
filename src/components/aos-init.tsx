"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 80,
      once: true,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    AOS.refresh();
  }, [pathname]);

  return null;
}
