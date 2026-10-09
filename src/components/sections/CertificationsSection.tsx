"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="bg-white border-y border-[var(--line)] py-20 md:py-28 relative"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: Sticky Heading & Count */}
          <div className="lg:sticky lg:top-28">
            <div className="mono-tag mb-3 rv" style={{ "--i": 0 } as React.CSSProperties}>
              04 — CERTIFICATIONS & EXCELLENCE
            </div>
            <h2 className="heading-display text-4xl sm:text-5xl rv" style={{ "--i": 1 } as React.CSSProperties}>
              Always <span className="font-serif-italic">learning.</span>
            </h2>
            <div className="mt-4 font-mono text-xs text-[var(--mute)] uppercase tracking-wider rv" style={{ "--i": 2 } as React.CSSProperties}>
              0{CERTIFICATIONS.length} VERIFIED CREDENTIALS &amp; METHODOLOGIES
            </div>
            <p className="mt-4 text-xs text-[var(--ink-2)] leading-relaxed max-w-sm rv" style={{ "--i": 3 } as React.CSSProperties}>
              Continuous architectural education across cloud design, enterprise Agile ways of working, and Lean Six Sigma process optimization.
            </p>
          </div>

          {/* Right: Ink-Flood Index List */}
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={cert.id}
                tabIndex={0}
                className="cert-row group relative px-6 py-8 flex items-center justify-between cursor-default outline-none transition-colors duration-300 overflow-hidden"
                style={{ "--i": index + 2 } as React.CSSProperties}
              >
                {/* Ink flood background (scaleX 0 -> 1) */}
                <div
                  className="ink-flood absolute inset-0 bg-[var(--ink)] origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 -z-0"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 flex-1">
                  <span className="font-mono text-xs text-[var(--mute)] group-hover:text-white/60 group-focus-visible:text-white/60 transition-colors">
                    {cert.index}
                  </span>
                  <div>
                    <h3 className="font-bold text-xl sm:text-2xl text-[var(--ink)] group-hover:text-white group-focus-visible:text-white transition-colors tracking-tight">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="font-mono text-xs text-[var(--mute)] group-hover:text-white/80 group-focus-visible:text-white/80 transition-colors">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--soft)] group-hover:bg-white/20 group-hover:text-white text-[var(--ink-2)] transition-colors">
                        {cert.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow slide-in */}
                <div className="relative z-10 font-mono text-xl text-transparent group-hover:text-white group-focus-visible:text-white -translate-x-3 group-hover:translate-x-0 group-focus-visible:translate-x-0 transition-all duration-300">
                  ↗
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
