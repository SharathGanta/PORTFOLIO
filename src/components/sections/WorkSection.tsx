"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function WorkSection() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-padding site-container relative">
      {/* Section Tag & Heading */}
      <div className="mb-14">
        <div className="mono-tag mb-3 rv" style={{ "--i": 0 } as React.CSSProperties}>
          03 — SELECTED WORK
        </div>
        <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl rv" style={{ "--i": 1 } as React.CSSProperties}>
          Enterprise solutions <span className="font-serif-italic">architected.</span>
        </h2>
      </div>

      {/* Accordion Gallery (Desktop: Horizontal Flex Panels; Mobile: Vertical Accordion) */}
      <div className="hidden lg:flex gap-3 h-[min(78svh,620px)] w-full items-stretch">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              onClick={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              tabIndex={0}
              role="region"
              aria-expanded={isOpen}
              aria-label={project.title}
              className={`panel-container relative rounded-[28px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none border border-black/10 ${
                isOpen
                  ? "flex-[8] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] cursor-default"
                  : "flex-[1] bg-white/70 hover:bg-white hover:border-black/20"
              }`}
            >
              {/* SLIM SPINE VIEW (When Folded) */}
              <div
                className={`spine-content absolute inset-0 flex flex-col justify-between items-center py-8 transition-opacity duration-300 ${
                  isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span className="font-mono text-xs font-bold text-[var(--mute)]">
                  {project.index}
                </span>

                <div className="vertical-title-wrapper flex items-center justify-center -rotate-90 whitespace-nowrap origin-center my-auto">
                  <span className="font-bold text-sm tracking-tight text-[var(--ink)]">
                    {project.title}
                  </span>
                </div>

                <div className="plus-btn w-9 h-9 rounded-full bg-[var(--soft)] flex items-center justify-center text-[var(--ink)] transition-transform duration-300">
                  <span className="font-bold text-base leading-none">+</span>
                </div>
              </div>

              {/* EXPANDED FULL VIEW (When Open) */}
              <div
                className={`expanded-content absolute inset-0 p-8 sm:p-10 grid grid-cols-2 gap-8 items-center transition-opacity duration-500 ${
                  isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Left Side: Project Specs */}
                <div className="flex flex-col justify-between h-full overflow-y-auto pr-2">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink-2)]">
                        {project.index}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)]">
                        {project.kicker}
                      </span>
                    </div>

                    <h3 className="heading-display text-2xl sm:text-3xl text-[var(--ink)] mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[var(--ink-2)] mb-6">
                      {project.description}
                    </p>

                    {/* 2-Column Feature List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[var(--ink-2)]">
                          <span className="font-bold text-[var(--ink)] mt-0.5">›</span>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Tech Chips */}
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--line)]">
                      {project.tech.map((t, tIdx) => (
                        <div
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--soft)] text-xs font-mono text-[var(--ink)]"
                        >
                          <TechLogo name={t} size={14} />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* GitHub link omitted per Rule 1 if null */}
                    {project.github && (
                      <div className="mt-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-pill-primary text-xs"
                        >
                          View on GitHub ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Illustrative Mini-UI */}
                <div className="h-full flex flex-col justify-center relative">
                  <IllustrativeUI type={project.uiType} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Accordion */}
      <div className="lg:hidden flex flex-col gap-4">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              className="card-premium overflow-hidden border border-black/10 transition-all duration-300"
            >
              <button
                onClick={() => setActiveId(isOpen ? "" : project.id)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--mute)]">{project.index}</span>
                  <span className="font-bold text-lg text-[var(--ink)]">{project.title}</span>
                </div>
                <span className="font-mono text-xl transition-transform duration-300">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-[var(--line)]">
                  <span className="font-mono text-[10px] uppercase text-[var(--mute)] block mb-2">
                    {project.kicker}
                  </span>
                  <p className="text-xs leading-relaxed text-[var(--ink-2)] mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs text-[var(--ink-2)] flex items-start gap-1.5">
                        <span className="font-bold text-[var(--ink)]">›</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-[var(--soft)] font-mono text-[10px] text-[var(--ink)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <IllustrativeUI type={project.uiType} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .panel-container:hover .plus-btn {
          transform: rotate(90deg);
        }
      `}</style>
    </section>
  );
}

function IllustrativeUI({ type }: { type: ProjectItem["uiType"] }) {
  return (
    <div className="relative w-full h-[360px] bg-[#f9f8f6] rounded-2xl border border-[var(--line)] p-4 flex flex-col justify-between overflow-hidden shadow-inner">
      {/* Label: Illustrative UI */}
      <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">
          // Illustrative UI · Architecture Preview
        </span>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>

      {type === "orchestration-dashboard" && (
        <div className="my-auto space-y-3 font-mono text-[10px]">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2 rounded-lg border border-gray-200">
              <span className="text-gray-400 block text-[8px]">BOTS DEPLOYED</span>
              <span className="text-base font-bold text-[var(--ink)]">80+</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-200">
              <span className="text-gray-400 block text-[8px]">UPTIME SLA</span>
              <span className="text-base font-bold text-[var(--ink)]">99.9%</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-200">
              <span className="text-gray-400 block text-[8px]">EFFORT SAVED</span>
              <span className="text-base font-bold text-[var(--ink)]">70%</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200 space-y-1.5">
            <div className="flex justify-between text-gray-500">
              <span>AA360-FLEET-WORKER-01</span>
              <span className="text-emerald-600 font-semibold">RUNNING · 100%</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>UIPATH-UNATTENDED-PROD</span>
              <span className="text-emerald-600 font-semibold">ONLINE · 0 ERR</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>TELEMETRY SMS/EMAIL DISPATCH</span>
              <span className="text-gray-700">HEARTBEAT OK</span>
            </div>
          </div>
        </div>
      )}

      {type === "agent-graph" && (
        <div className="my-auto flex flex-col items-center gap-2 font-mono text-[9px]">
          <div className="bg-white px-3 py-1.5 rounded-md border border-gray-300 font-bold shadow-sm">
            Planner Agent [LangGraph State]
          </div>
          <div className="h-4 w-px bg-gray-400" />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-white p-2 rounded-md border border-gray-300 text-center">
              <span className="font-semibold block">RAG Retriever</span>
              <span className="text-gray-400 text-[8px]">Vector DB + Embeddings</span>
            </div>
            <div className="bg-white p-2 rounded-md border border-gray-300 text-center">
              <span className="font-semibold block">AutoGen Solvers</span>
              <span className="text-gray-400 text-[8px]">Multi-Agent Dialogue</span>
            </div>
          </div>
          <div className="h-4 w-px bg-gray-400" />
          <div className="bg-white px-3 py-1.5 rounded-md border border-gray-300 font-bold text-gray-700 shadow-sm">
            Guardrails: Prompt Security & Hallucination Filter
          </div>
        </div>
      )}

      {type === "integration-pipeline" && (
        <div className="my-auto space-y-3 font-mono text-[10px]">
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <span className="font-bold">SAP ECC / S4HANA</span>
            <span className="text-gray-400 text-[8px]">RFC / BAPI</span>
            <span className="font-semibold text-gray-700">⇄ REST GATEWAY</span>
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <span className="font-bold">SALESFORCE (SFDC)</span>
            <span className="text-gray-400 text-[8px]">REST API v58</span>
            <span className="font-semibold text-gray-700">⇄ IAM TOKEN AUTH</span>
          </div>
          <div className="text-center text-[9px] text-gray-500">
            Bidirectional Transaction Sync · 0 Latency Drops
          </div>
        </div>
      )}

      {type === "mining-analytics" && (
        <div className="my-auto space-y-2.5 font-mono text-[9px]">
          <div className="bg-white p-2.5 rounded-lg border border-gray-200 flex justify-between items-center">
            <span>CELONIS EVENT LOGS</span>
            <span className="font-bold text-[var(--ink)]">1,420,000 CASES</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-gray-200 flex justify-between items-center">
            <span>BOTTLENECK CYCLE REDUCTION</span>
            <span className="font-bold text-[var(--ink)]">-60% LATENCY</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-gray-200 flex justify-between items-center">
            <span>COE AUTOMATION DISCOVERY</span>
            <span className="font-bold text-[var(--ink)]">ROI-DRIVEN SCORE</span>
          </div>
        </div>
      )}

      {/* Bottom status bar */}
      <div className="pt-2 border-t border-[var(--line)] flex justify-between items-center font-mono text-[8px] text-[var(--mute)]">
        <span>STATUS: PRODUCTION ARCHITECTURE</span>
        <span>LATENCY: &lt; 20ms</span>
      </div>
    </div>
  );
}
