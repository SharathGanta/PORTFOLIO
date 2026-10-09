"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function ContactSection() {
  const { scrollTo } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <section id="contact" className="section-padding site-container relative">
      <div className="mono-tag mb-4 rv" style={{ "--i": 0 } as React.CSSProperties}>
        07 — GET IN TOUCH
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 items-start justify-between">
        <div>
          {/* Giant Heading with Letter Hop Effect */}
          <h2 className="heading-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-10 select-none">
            <span className="block">
              {line1.split("").map((char, index) => (
                <span
                  key={index}
                  className="letter-hop inline-block transition-transform duration-200"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="block text-[var(--mute)] font-serif-italic">
              {line2.split("").map((char, index) => (
                <span
                  key={index}
                  className="letter-hop inline-block transition-transform duration-200"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h2>

          {/* Email with Underline & Copy Chip */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)] hover:text-[var(--ink-2)] underline underline-offset-8 decoration-2 decoration-[var(--line)] hover:decoration-[var(--ink)] transition-colors"
            >
              {PROFILE.email}
            </a>

            <button
              onClick={copyEmail}
              className="px-4 py-1.5 rounded-full bg-white border border-[var(--line)] hover:border-[var(--ink)] text-xs font-mono font-semibold text-[var(--ink)] shadow-sm transition-all duration-200 active:scale-95 flex items-center gap-1.5"
              aria-live="polite"
              aria-label="Copy email address"
            >
              {copied ? (
                <span className="text-emerald-700 font-bold">Copied ✓</span>
              ) : (
                <span>Copy 📋</span>
              )}
            </button>
          </div>

          {/* Direct Channels */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-[var(--line)] font-mono text-xs sm:text-sm">
            <div>
              <span className="text-[var(--mute)] block text-[10px] mb-1">PHONE</span>
              <a
                href={PROFILE.phoneHref}
                className="font-bold text-[var(--ink)] hover:underline"
              >
                {PROFILE.phone}
              </a>
            </div>

            <div>
              <span className="text-[var(--mute)] block text-[10px] mb-1">LINKEDIN</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--ink)] hover:underline flex items-center gap-1"
              >
                <span>sharath-pawar</span>
                <span>↗</span>
              </a>
            </div>

            <div>
              <span className="text-[var(--mute)] block text-[10px] mb-1">LOCATION</span>
              <span className="font-bold text-[var(--ink)]">
                {PROFILE.location}
              </span>
            </div>
          </div>
        </div>

        {/* Circular Spinning "Say Hello" Text Badge */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-8">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Spinning SVG circle */}
            <svg
              className="spin-badge absolute inset-0 w-full h-full"
              viewBox="0 0 160 160"
            >
              <path
                id="textPathCircle"
                d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                fill="none"
              />
              <text className="font-mono text-[9px] uppercase tracking-[0.22em] fill-[var(--ink)] font-bold">
                <textPath href="#textPathCircle" startOffset="0%">
                  · SAY HELLO · GET IN TOUCH · ARCHITECT ·
                </textPath>
              </text>
            </svg>

            {/* Center Arrow or Initial */}
            <button
              onClick={() => scrollTo("#hero")}
              aria-label="Back to top"
              className="w-14 h-14 rounded-full bg-[var(--ink)] text-white flex items-center justify-center text-sm font-bold shadow-md hover:scale-105 transition-transform"
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--mute)]">
        <div>
          © {new Date().getFullYear()} {PROFILE.name}. Verified from résumé.
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollTo("#hero")}
            className="hover:text-[var(--ink)] transition-colors underline underline-offset-4"
          >
            Back to top ↑
          </button>
          <span>·</span>
          <span>Built with Next.js 15 &amp; React 19</span>
        </div>
      </footer>

      <style jsx>{`
        .letter-hop:hover {
          transform: translateY(-10px);
        }
        .spin-badge {
          animation: spinText 18s linear infinite;
        }
        @keyframes spinText {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
