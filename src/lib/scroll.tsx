"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

interface ScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollTo = (target: string | HTMLElement, options: { offset?: number; duration?: number } = {}) => {
    if (lenisRef.current && !prefersReduced) {
      lenisRef.current.scrollTo(target, {
        offset: options.offset ?? 0,
        duration: options.duration ?? 1.2,
      });
    } else {
      const element = typeof target === "string" ? document.querySelector(target) : target;
      if (element) {
        element.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}

export function scrollToTarget(target: string, offset = 0) {
  const el = document.querySelector(target);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
