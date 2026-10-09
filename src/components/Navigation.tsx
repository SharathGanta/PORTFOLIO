"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Navigation() {
  const { scrollTo } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Measure scroll progress & 40px threshold
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress((scrollY / maxScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const sectionElements: HTMLElement[] = [];
    NAV.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) sectionElements.push(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollTo(`#${id}`, { offset: -30 });
  };

  return (
    <>
      {/* 2px Ink Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-50 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Main Navbar Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 pointer-events-none transition-all duration-300">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials mark + Name */}
          <div className="pointer-events-auto flex items-center gap-3">
            <button
              onClick={() => scrollTo("#hero")}
              aria-label="Back to top"
              className={`initials-mark w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs tracking-wider transition-all duration-300 ${
                scrolled
                  ? "bg-[var(--ink)] text-white border-transparent shadow-md"
                  : "bg-transparent text-[var(--ink)] border border-[var(--ink)]"
              }`}
            >
              {PROFILE.initials}
            </button>
            <span
              className={`font-semibold text-sm tracking-tight text-[var(--ink)] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Center / Right: Nav Pill (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className={`pointer-events-auto hidden md:flex items-center p-1.5 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5"
                : "bg-transparent"
            }`}
          >
            <div className="relative flex items-center gap-1">
              {NAV.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-colors duration-250 z-10 ${
                      isActive ? "text-white" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-[var(--ink)] rounded-full -z-10 transition-all duration-300 ease-out" />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="pointer-events-auto md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-xs font-bold tracking-tight text-[var(--ink)] shadow-sm"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--paper)] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "opacity-0 pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
      >
        <div className="flex justify-between items-center pt-2">
          <div className="w-10 h-10 rounded-full border border-[var(--ink)] flex items-center justify-center font-mono font-bold text-xs">
            {PROFILE.initials}
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[var(--ink)] flex items-center justify-center text-sm font-semibold"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 my-auto">
          {NAV.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left transition-transform duration-300 hover:translate-x-2"
              style={{
                transitionDelay: `${mobileMenuOpen ? i * 50 : 0}ms`,
              }}
            >
              <span className="font-mono text-xs text-[var(--mute)]">{item.index}</span>
              <span className="text-3xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--mute)] transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-[var(--line)] flex justify-between items-center text-xs font-mono text-[var(--mute)]">
          <span>{PROFILE.location}</span>
          <span>{PROFILE.role}</span>
        </div>
      </div>

      <style jsx>{`
        .initials-mark:hover {
          transform: rotate(360deg);
        }
      `}</style>
    </>
  );
}
