"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_FAMILIES, SkillElement } from "@/lib/data";
import { TechLogo, isBrand } from "@/components/ui/TechLogo";

export function SkillsSection() {
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillElement>(SKILLS[0]);

  return (
    <section id="skills" className="section-padding site-container relative">
      {/* Section Tag & Heading */}
      <div className="mb-10">
        <div className="mono-tag mb-3 rv" style={{ "--i": 0 } as React.CSSProperties}>
          02 — PERIODIC TABLE OF MY STACK
        </div>
        <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl rv" style={{ "--i": 1 } as React.CSSProperties}>
          The elements of my <span className="font-serif-italic">architecture.</span>
        </h2>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-10 rv" style={{ "--i": 2 } as React.CSSProperties}>
        {SKILL_FAMILIES.map((family) => {
          const isSelected = selectedFamily === family;
          return (
            <button
              key={family}
              onClick={() => setSelectedFamily(family)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
                isSelected
                  ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-sm"
                  : "bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink)]"
              }`}
            >
              {family}
            </button>
          );
        })}
      </div>

      {/* Two-Column Grid: Periodic Table (Left) + Inspector Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Periodic Grid: 4 cols mobile, 8 cols desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {SKILLS.map((skill, index) => {
            const matchesFilter = selectedFamily === "All" || skill.family === selectedFamily;
            const isCurrent = activeSkill.atomicNumber === skill.atomicNumber;
            const col = index % 8;
            const row = Math.floor(index / 8);
            const delayMs = (row + col) * 40;

            return (
              <button
                key={skill.atomicNumber}
                onClick={() => setActiveSkill(skill)}
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
                className={`relative flex flex-col justify-between p-2.5 aspect-square rounded-xl text-left transition-all duration-300 border ${
                  matchesFilter ? "opacity-100 scale-100" : "opacity-25 grayscale pointer-events-none"
                } ${
                  isCurrent
                    ? "bg-white border-[var(--ink)] shadow-[0_6px_20px_rgba(0,0,0,0.08)] -translate-y-1 z-10"
                    : "bg-white/80 border-[var(--line)] hover:border-black/30 hover:bg-white hover:-translate-y-0.5"
                }`}
                style={{
                  transitionDelay: `${delayMs}ms`,
                }}
                aria-label={`${skill.name} (${skill.symbol}) - ${skill.family}`}
              >
                {/* Top: Atomic Number & Brand Indicator */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-[10px] text-[var(--mute)]">
                    {String(skill.atomicNumber).padStart(2, "0")}
                  </span>
                  {skill.isBrand && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      title="Official brand"
                    />
                  )}
                </div>

                {/* Center: 2-Letter Symbol */}
                <div className="font-bold text-lg text-[var(--ink)] tracking-tight">
                  {skill.symbol}
                </div>

                {/* Bottom: Name */}
                <div className="font-mono text-[9px] text-[var(--mute)] truncate w-full">
                  {skill.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sticky Inspector Panel (320px wide) */}
        <aside className="sticky top-24 card-premium p-6 sm:p-7 flex flex-col items-center text-center overflow-hidden border border-black/5">
          {/* Logo Stage with 150px Pop Animation */}
          <div className="relative w-[150px] h-[150px] flex items-center justify-center my-4 group">
            {/* Soft Brand Glow */}
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: activeSkill.color || "rgba(13,13,13,0.15)" }}
            />

            <div className="inspector-pop relative z-10 w-full h-full flex items-center justify-center">
              <TechLogo
                name={activeSkill.name}
                size={110}
                showGlow={false}
              />
            </div>
          </div>

          {/* Skill Title & Atomic Specs */}
          <div className="w-full pt-2 border-t border-[var(--line)]">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink-2)] font-semibold">
                No. {String(activeSkill.atomicNumber).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-[var(--mute)] font-medium">
                [{activeSkill.symbol}]
              </span>
            </div>

            <h3 className="heading-display text-2xl text-[var(--ink)] mt-1">
              {activeSkill.name}
            </h3>

            <div className="inline-block mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--mute)]">
              {activeSkill.family}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[var(--ink-2)] text-left">
              {activeSkill.description}
            </p>

            {/* Projects Using This Skill */}
            {activeSkill.projects.length > 0 && (
              <div className="mt-5 pt-4 border-t border-[var(--line)] text-left">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] block mb-2">
                  Referenced Architecture
                </span>
                <div className="space-y-1.5">
                  {activeSkill.projects.map((proj, pIdx) => (
                    <div
                      key={pIdx}
                      className="text-xs font-semibold text-[var(--ink)] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
                      <span>{proj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style jsx>{`
        .inspector-pop {
          animation: logoPop 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes logoPop {
          0% {
            transform: scale(0.85);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
