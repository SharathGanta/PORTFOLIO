"use client";

import React, { useRef, useState, useEffect } from "react";
import { EXPERIENCE } from "@/lib/data";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height - windowHeight * 0.5;

      if (total <= 0) return;

      const current = windowHeight * 0.6 - rect.top;
      const p = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding site-container relative"
    >
      {/* Section Tag & Heading */}
      <div className="mb-16">
        <div className="mono-tag mb-3 rv" style={{ "--i": 0 } as React.CSSProperties}>
          05 — CAREER &amp; EDUCATION PATH
        </div>
        <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl rv" style={{ "--i": 1 } as React.CSSProperties}>
          One continuous <span className="font-serif-italic">trajectory.</span>
        </h2>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 md:pl-12">
        {/* Background Faint Spine */}
        <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] top-4 bottom-8 w-[2px] bg-[var(--line)]" />

        {/* Foreground Ink Spine (drawn by scroll progress) */}
        <div
          className="absolute left-[11px] sm:left-[19px] md:left-[23px] top-4 bottom-8 w-[2px] bg-[var(--ink)] origin-top transition-transform duration-75"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />

        {/* Timeline Stops */}
        <div className="space-y-12">
          {EXPERIENCE.map((item, index) => {
            const stopFraction = (index + 0.5) / (EXPERIENCE.length + 1);
            const isLit = scrollProgress >= stopFraction;

            return (
              <div
                key={item.id}
                className="relative flex items-start group"
              >
                {/* Stop Node Dot */}
                <div
                  className={`absolute -left-[24px] sm:-left-[32px] md:-left-[36px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-white ${
                    isLit
                      ? "border-[var(--ink)] shadow-[0_0_12px_rgba(13,13,13,0.25)] scale-110"
                      : "border-gray-300 scale-95"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      isLit ? "bg-[var(--ink)]" : "bg-transparent"
                    }`}
                  />
                </div>

                {/* Stop Card */}
                <div
                  className={`card-premium p-6 sm:p-8 w-full transition-all duration-300 border ${
                    isLit
                      ? "border-black/15 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                      : "border-black/5 opacity-80"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <span className="font-mono text-xs font-bold text-[var(--mute)]">
                      {item.period}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink-2)] self-start sm:self-auto">
                      {item.type === "education" ? "Degree" : "Leadership"}
                    </span>
                  </div>

                  <h3 className="heading-display text-xl sm:text-2xl text-[var(--ink)]">
                    {item.role}
                  </h3>

                  <div className="font-mono text-xs font-semibold text-[var(--ink-2)] mt-1 mb-4">
                    {item.company} {item.location && `· ${item.location}`}
                  </div>

                  <ul className="space-y-2 mt-4 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                    {item.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="font-bold text-[var(--ink)] mt-0.5">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* End Stop: Next — Your team? */}
          <div className="relative flex items-start">
            <div className="absolute -left-[24px] sm:-left-[32px] md:-left-[36px] top-6 w-5 h-5 rounded-full border-2 border-dashed border-[var(--ink)] flex items-center justify-center bg-white">
              <span className="text-[8px] font-mono font-bold">›</span>
            </div>

            <div className="card-premium p-6 sm:p-8 w-full border-2 border-dashed border-[var(--ink)] bg-transparent hover:bg-white/60 transition-colors">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--mute)]">
                <span>NEXT PHASE</span>
              </div>
              <h3 className="heading-display text-xl sm:text-2xl text-[var(--ink)]">
                Next — <span className="font-serif-italic">Your team?</span>
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-2)] mt-2 leading-relaxed">
                Available for enterprise Digital Transformation leadership, Generative AI architecture, and large-scale autonomous agent program consulting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
