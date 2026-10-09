"use client";

import React, { useRef, useState, useEffect } from "react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(1200);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const calculateBounds = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxTrans = Math.max(trackWidth - windowWidth + 120, 0);
      setMaxTranslate(maxTrans);
    };

    calculateBounds();
    window.addEventListener("resize", calculateBounds);
    return () => window.removeEventListener("resize", calculateBounds);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const p = Math.min(Math.max(current / totalScrollable, 0), 1);
      setScrollProgress(p);

      // Determine card nearest viewport center
      const cardCount = ACHIEVEMENTS.length;
      const estimatedCenter = Math.min(
        Math.max(Math.round(p * (cardCount - 1)), 0),
        cardCount - 1
      );
      setCenterIndex(estimatedCenter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxTranslate]);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative h-[300vh]"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between py-10 site-container">
        {/* Header with Thin Progress Bar */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="mono-tag mb-2">06 — PROVEN METRICS</div>
              <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
                Impact at enterprise <span className="font-serif-italic">scale.</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--mute)]">
              {Math.round(scrollProgress * 100)}% EXPLORED
            </div>
          </div>

          {/* Thin Progress Bar */}
          <div className="w-full h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--ink)] transition-transform duration-75 origin-left"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div className="w-full my-auto overflow-visible py-8">
          <div
            ref={trackRef}
            className="flex items-center gap-6 md:gap-8 will-change-transform transition-transform duration-100 ease-out"
            style={{
              transform: `translateX(-${scrollProgress * maxTranslate}px)`,
            }}
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const isCenter = centerIndex === idx;

              return (
                <AchievementCard
                  key={item.id}
                  item={item}
                  isCenter={isCenter}
                  hasBeenSeen={scrollProgress > 0.05}
                />
              );
            })}

            {/* Ending Badge Card: and counting → */}
            <div className="flex-shrink-0 w-[240px] h-[clamp(260px,36vh,310px)] rounded-[28px] border-2 border-dashed border-[var(--line)] flex flex-col items-center justify-center p-6 text-center select-none bg-white/40">
              <span className="font-serif-italic text-2xl text-[var(--ink)] block mb-2">
                and counting →
              </span>
              <span className="font-mono text-xs text-[var(--mute)]">
                More enterprise workflows being automated daily.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Guidance */}
        <div className="font-mono text-[11px] text-[var(--mute)] flex justify-between items-center">
          <span>← SCROLL VERTICALLY TO TRAVEL HORIZONTALLY →</span>
          <span>{ACHIEVEMENTS.length} VERIFIED METRICS</span>
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  item,
  isCenter,
  hasBeenSeen,
}: {
  item: AchievementItem;
  isCenter: boolean;
  hasBeenSeen: boolean;
}) {
  const [displayedNumber, setDisplayedNumber] = useState<number>(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!hasBeenSeen || animatedRef.current) return;
    animatedRef.current = true;

    const startTime = performance.now();
    const duration = 1400; // 1.4s easeOutQuart

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart = 1 - (1 - t)^4
      const ease = 1 - Math.pow(1 - progress, 4);

      const current = ease * item.numericTarget;
      setDisplayedNumber(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayedNumber(item.numericTarget);
      }
    };

    requestAnimationFrame(animate);
  }, [hasBeenSeen, item.numericTarget]);

  return (
    <div
      className={`relative flex-shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] bg-white rounded-[28px] p-8 flex flex-col justify-between transition-all duration-500 select-none ${
        isCenter
          ? "-translate-y-3 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)]"
          : "translate-y-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
      }`}
    >
      {/* Soft Brand-Tint Glow Behind */}
      <div
        className={`absolute -inset-2 rounded-[32px] blur-xl pointer-events-none transition-opacity duration-500 -z-10 ${
          isCenter ? "opacity-70" : "opacity-30"
        }`}
        style={{ backgroundColor: item.glowColor }}
      />

      {/* Top: 72px Logo Tile + Index */}
      <div className="flex items-center justify-between w-full">
        <div className="w-[72px] h-[72px] rounded-2xl bg-[var(--paper)] flex items-center justify-center p-3 shadow-inner">
          <TechLogo
            name={
              item.logo.includes("automation")
                ? "Automation Anywhere"
                : item.logo.includes("azure")
                ? "Microsoft Azure"
                : item.logo.includes("uipath")
                ? "UiPath"
                : item.logo.includes("celonis")
                ? "Celonis Mining"
                : item.logo.includes("fastapi")
                ? "FastAPI"
                : "AWS Architect"
            }
            size={48}
            showGlow={false}
          />
        </div>
        <span className="font-mono text-xs font-bold text-[var(--mute)]">
          {item.index}
        </span>
      </div>

      {/* Bottom Row: Specs on Left, Huge EaseOutQuart Number on Right */}
      <div className="flex items-end justify-between gap-4 w-full mt-4">
        <div className="max-w-[60%]">
          <h3 className="heading-display text-lg sm:text-xl text-[var(--ink)]">
            {item.label}
          </h3>
          <div className="font-mono text-xs text-[var(--mute)] mt-0.5">
            {item.caption}
          </div>
          <div className="text-[11px] text-[var(--ink-2)] mt-2 leading-snug">
            {item.detail}
          </div>
        </div>

        {/* Huge easeOutQuart Animated Metric */}
        <div className="font-black text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight leading-none text-right font-mono">
          {item.numericTarget % 1 !== 0
            ? displayedNumber.toFixed(1)
            : Math.round(displayedNumber)}
          <span className="text-3xl sm:text-4xl">{item.suffix}</span>
        </div>
      </div>
    </div>
  );
}
