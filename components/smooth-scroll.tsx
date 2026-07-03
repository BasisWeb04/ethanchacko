"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

const NAV_OFFSET = -72;

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Reduced motion: skip Lenis entirely and let native scrolling handle it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis = instance;

    let rafId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor clicks in the capture phase, before Next's Link
    // handler, so nav and CTA clicks glide to the section instead of jumping.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      let hash = "";
      if (href.startsWith("#")) hash = href;
      else if (href.startsWith("/#") && window.location.pathname === "/")
        hash = href.slice(1);
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();
      e.stopPropagation();
      instance.scrollTo(el as HTMLElement, { offset: NAV_OFFSET });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // Start each newly-navigated page at the top, in sync with Lenis.
  useEffect(() => {
    if (lenis && !window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
