"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function AboutSection() {
  const prefersReduced = usePrefersReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMouseX = useRef(0);
  const lastTime = useRef(0);

  // Damped pendulum swing + subtle idle sway
  useEffect(() => {
    if (prefersReduced) return;

    let animFrame: number;
    let t = 0;

    const updatePhysics = () => {
      t += 0.03;

      // Spring physics towards 0 (or idle sway)
      const idleSway = Math.sin(t) * 1.5;
      const spring = -0.06 * (angleRef.current - idleSway);
      velocityRef.current = (velocityRef.current + spring) * 0.94;
      angleRef.current += velocityRef.current;

      setSwingAngle(angleRef.current);
      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 16);
      const dx = e.clientX - lastMouseX.current;

      // Impart velocity proportional to mouse speed
      const v = (dx / dt) * 1.8;
      velocityRef.current = Math.max(Math.min(velocityRef.current + v * 0.25, 12), -12);

      lastMouseX.current = e.clientX;
      lastTime.current = now;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [prefersReduced]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <section id="about" className="section-padding site-container relative">
      {/* Section Tag & Heading */}
      <div className="mb-14">
        <div className="mono-tag mb-3 rv" style={{ "--i": 0 } as React.CSSProperties}>
          01 — ABOUT ME
        </div>
        <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl rv" style={{ "--i": 1 } as React.CSSProperties}>
          Architecture meets <span className="font-serif-italic">execution.</span>
        </h2>
      </div>

      {/* Three Column Grid: minmax(0,1fr) 320px minmax(0,1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 lg:gap-10 items-stretch">
        
        {/* Left Column: Summary & CTAs */}
        <div className="card-premium p-8 sm:p-10 flex flex-col justify-between rv" style={{ "--i": 2 } as React.CSSProperties}>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-4">
              Overview
            </span>
            <h3 className="heading-display text-2xl sm:text-3xl mb-6">
              Hi, I&apos;m {PROFILE.name.split(" ")[0]}.
            </h3>
            <p className="text-[var(--ink-2)] text-base sm:text-lg leading-relaxed mb-6">
              {PROFILE.resumeSummary}
            </p>
            <p className="text-[var(--mute)] text-sm sm:text-base leading-relaxed">
              {PROFILE.additionalSummaryLine}
            </p>
          </div>

          <div className="pt-8 mt-6 border-t border-[var(--line)] flex flex-wrap gap-3">
            <a
              href={PROFILE.resumePath}
              download="Sharath_Kumar_Ganta_Resume.pdf"
              className="btn-pill-primary text-xs"
            >
              Download Résumé ↓
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-secondary text-xs"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Center Column: Hanging Lanyard ID Card */}
        <div className="flex flex-col items-center justify-start relative pt-4 rv" style={{ "--i": 3 } as React.CSSProperties}>
          {/* Lanyard Top Attachment & Strap */}
          <div className="relative flex flex-col items-center z-20 pointer-events-none">
            {/* Ceiling bracket */}
            <div className="w-12 h-2.5 bg-[var(--ink)] rounded-full mb-1 shadow-sm" />
            {/* Strap: 30x56 px with scrolling text */}
            <div className="w-[30px] h-[56px] bg-[var(--ink)] overflow-hidden relative shadow-inner rounded-t-sm flex items-center justify-center">
              <div className="strap-text text-[8px] font-mono font-bold tracking-widest text-[#f4f2ee] uppercase whitespace-nowrap -rotate-90">
                {PROFILE.name.toUpperCase()} · AI ARCHITECT ·
              </div>
            </div>
            {/* Metal Clip */}
            <div className="relative -mt-1 flex flex-col items-center">
              <div className="w-8 h-3.5 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 rounded-sm shadow-sm border border-black/20" />
              <div className="w-4 h-4 border-2 border-gray-400 rounded-full -mt-1" />
            </div>
          </div>

          {/* Damped Pendulum Swing Wrapper */}
          <div
            ref={cardRef}
            className="card-swing-wrapper w-[300px] h-[408px] mt-2 cursor-pointer select-none"
            style={{
              transform: `rotate(${swingAngle}deg)`,
              transformOrigin: "top center",
              perspective: "1000px",
            }}
            onClick={() => setIsFlipped((prev) => !prev)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label="Developer ID Card. Press Enter to flip"
          >
            {/* Card 3D Flip Container */}
            <div
              className={`card-flipper relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* FRONT OF ID CARD */}
              <div className="card-face card-front absolute inset-0 bg-white rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.08)] flex flex-col justify-between overflow-hidden p-6 [backface-visibility:hidden]">
                {/* Punch slot */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-200 rounded-full border border-gray-300" />

                {/* Top Black Band */}
                <div className="mt-4 bg-[var(--ink)] text-white px-3 py-1.5 rounded-lg flex items-center justify-between font-mono text-[10px] font-bold tracking-wider">
                  <span>DEVELOPER ID</span>
                  <span className="text-gray-400">ARCHITECT</span>
                </div>

                {/* Centered Portrait with Halo Ring */}
                <div className="relative mx-auto mt-3 group">
                  <div className="w-[128px] h-[156px] rounded-xl overflow-hidden relative border border-black/10 bg-gray-100 shadow-inner">
                    <Image
                      src="/portrait-bust.webp"
                      alt={PROFILE.name}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl border border-gray-200 pointer-events-none" />
                </div>

                {/* Identity Info */}
                <div className="text-center mt-2">
                  <div className="font-bold text-base tracking-tight text-[var(--ink)]">
                    {PROFILE.name}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--mute)] mt-0.5">
                    {PROFILE.role}
                  </div>
                </div>

                {/* Meta Rows */}
                <div className="mt-2 pt-2 border-t border-gray-100 font-mono text-[10px] space-y-1 text-left text-[var(--ink-2)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--mute)]">ID NO:</span>
                    <span className="font-semibold">{PROFILE.idCard.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--mute)]">DEPT:</span>
                    <span className="font-semibold truncate max-w-[170px]">{PROFILE.idCard.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--mute)]">VALID TILL:</span>
                    <span className="font-semibold">{PROFILE.idCard.validTill}</span>
                  </div>
                </div>

                {/* Bottom Barcode & Holographic Foil */}
                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="font-mono text-[9px] tracking-widest text-gray-500 select-none">
                    ||||| ||| |||| || |||||| |
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-400 border border-gray-300 flex items-center justify-center text-[7px] font-mono font-bold text-gray-600">
                    SEC
                  </div>
                </div>
              </div>

              {/* BACK OF ID CARD */}
              <div className="card-face card-back absolute inset-0 bg-white rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.08)] flex flex-col justify-between overflow-hidden p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                {/* Punch slot */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-200 rounded-full border border-gray-300" />

                <div className="mt-4">
                  <div className="font-mono text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider mb-2">
                    What I Am
                  </div>
                  <div className="space-y-2 text-left font-mono text-[11px] leading-snug text-[var(--ink-2)]">
                    {PROFILE.idCard.whatIAm.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-[var(--ink)] font-bold">›</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature & Return notice */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono text-[9px] text-[var(--mute)]">AUTHORIZED SIGNATURE</span>
                    <span className="font-serif-italic text-sm text-[var(--ink)]">Sharath K. Ganta</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center font-mono text-[10px] text-[var(--mute)]">
                    If found, say hello · <span className="font-semibold text-[var(--ink)]">{PROFILE.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Facts & Quote */}
        <div className="card-premium p-8 sm:p-10 flex flex-col justify-between rv" style={{ "--i": 4 } as React.CSSProperties}>
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-4">
              Quick Facts
            </span>

            <div className="space-y-4 divide-y divide-[var(--line)]">
              <div className="pt-3 first:pt-0">
                <span className="font-mono text-xs text-[var(--mute)] block">Location</span>
                <span className="font-semibold text-sm sm:text-base text-[var(--ink)]">{PROFILE.location}</span>
              </div>
              <div className="pt-3">
                <span className="font-mono text-xs text-[var(--mute)] block">Education</span>
                <span className="font-semibold text-sm sm:text-base text-[var(--ink)]">B. Tech, JNTU Hyderabad</span>
              </div>
              <div className="pt-3">
                <span className="font-mono text-xs text-[var(--mute)] block">Current Role</span>
                <span className="font-semibold text-sm sm:text-base text-[var(--ink)]">Automation Lead, Aligned Automation</span>
              </div>
              <div className="pt-3">
                <span className="font-mono text-xs text-[var(--mute)] block">Email</span>
                <a href={`mailto:${PROFILE.email}`} className="font-semibold text-sm sm:text-base text-[var(--ink)] hover:underline">
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[var(--line)] bg-[var(--paper)]/50 p-4 rounded-xl">
            <span className="font-mono text-[11px] text-[var(--mute)] block mb-1">ARCHITECT PRINCIPLE</span>
            <p className="font-serif-italic text-base sm:text-lg text-[var(--ink)]">
              &ldquo;{PROFILE.idCard.quote}&rdquo;
            </p>
          </div>
        </div>

      </div>

      <style jsx>{`
        .strap-text {
          animation: strapScroll 8s linear infinite;
        }
        @keyframes strapScroll {
          0% {
            transform: rotate(-90deg) translateX(0);
          }
          100% {
            transform: rotate(-90deg) translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
