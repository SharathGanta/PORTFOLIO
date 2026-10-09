"use client";

import React from "react";

export const BRAND_MAP: Record<string, { file: string; color: string; label: string }> = {
  "Python": { file: "python.svg", color: "#3776AB", label: "Python" },
  "JavaScript": { file: "javascript.svg", color: "#F7DF1E", label: "JavaScript" },
  "HTML5": { file: "html5.svg", color: "#E34F26", label: "HTML5" },
  "HTML5 & CSS": { file: "html5.svg", color: "#E34F26", label: "HTML5 & CSS" },
  "CSS": { file: "css3.svg", color: "#1572B6", label: "CSS3" },
  ".NET / C#": { file: "dotnet.svg", color: "#512BD4", label: ".NET" },
  ".NET": { file: "dotnet.svg", color: "#512BD4", label: ".NET" },
  "FastAPI": { file: "fastapi.svg", color: "#009688", label: "FastAPI" },
  "AWS Architect": { file: "aws.svg", color: "#FF9900", label: "Amazon Web Services" },
  "AWS": { file: "aws.svg", color: "#FF9900", label: "AWS" },
  "Microsoft Azure": { file: "azure.svg", color: "#0078D4", label: "Microsoft Azure" },
  "Azure": { file: "azure.svg", color: "#0078D4", label: "Azure" },
  "LLM Integration": { file: "openai.svg", color: "#10A37F", label: "LLM / OpenAI" },
  "Azure OpenAI": { file: "openai.svg", color: "#10A37F", label: "Azure OpenAI" },
  "LangChain": { file: "langchain.svg", color: "#1C3C3C", label: "LangChain" },
  "LangGraph": { file: "langchain.svg", color: "#2E5B88", label: "LangGraph" },
  "AutoGen": { file: "autogen.svg", color: "#0078D4", label: "Microsoft AutoGen" },
  "Automation Anywhere": { file: "automationanywhere.svg", color: "#FF6A00", label: "Automation Anywhere" },
  "UiPath": { file: "uipath.svg", color: "#FA4616", label: "UiPath" },
  "Power Automate": { file: "powerautomate.svg", color: "#0066FF", label: "Power Automate" },
  "Blue Prism": { file: "blueprism.svg", color: "#002D72", label: "Blue Prism" },
  "Celonis Mining": { file: "celonis.svg", color: "#00F2FE", label: "Celonis Process Mining" },
  "Celonis": { file: "celonis.svg", color: "#00F2FE", label: "Celonis" },
  "WorkFusion": { file: "workfusion.svg", color: "#00B4D8", label: "WorkFusion" },
  "MySQL": { file: "mysql.svg", color: "#4479A1", label: "MySQL" },
  "MongoDB": { file: "mongodb.svg", color: "#47A248", label: "MongoDB" },
  "Power BI": { file: "powerbi.svg", color: "#F2C811", label: "Power BI" },
  "SAP Integration": { file: "sap.svg", color: "#0FAAFF", label: "SAP ERP" },
  "SAP": { file: "sap.svg", color: "#0FAAFF", label: "SAP" },
  "Salesforce (SFDC)": { file: "salesforce.svg", color: "#00A1E0", label: "Salesforce" },
  "Salesforce": { file: "salesforce.svg", color: "#00A1E0", label: "Salesforce" },
};

export const CONCEPT_MAP: Record<string, (size: number) => React.ReactNode> = {
  "Agentic AI": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
      <path d="m5.6 5.6 2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" />
    </svg>
  ),
  "RAG Architecture": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h10M4 18h6" />
      <circle cx="18" cy="15" r="3" />
      <path d="m21 18 2 2" />
    </svg>
  ),
  "AI Governance": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  "Memory Management": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h4m-4 4h8m-8 4h12" />
    </svg>
  ),
  "Enterprise Architecture": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </svg>
  ),
  "Disaster Recovery": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15.5-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.5 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  "Vector Databases": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  "REST & SOAP": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M6 12h.01M10 12h4M18 12h.01" />
    </svg>
  ),
  "Agile & Scrum": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6" />
      <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
    </svg>
  ),
  "Six Sigma (6σ)": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 8c2-2 6-2 8 0s0 4-2 4-6 0-6 4 4 4 6 4" />
    </svg>
  ),
  "DevOps & CI/CD": (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V14a2 2 0 0 0-2-2H9v-1a2 2 0 0 1 2-2h2.07A8 8 0 0 1 19 12a7.92 7.92 0 0 1-6 4.93z" />
    </svg>
  ),
};

export function isBrand(name: string): boolean {
  return name in BRAND_MAP;
}

export function TechLogo({
  name,
  size = 40,
  className = "",
  showGlow = false,
}: {
  name: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}) {
  const brand = BRAND_MAP[name];

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-md opacity-25 pointer-events-none"
            style={{ backgroundColor: brand.color }}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/logos/${brand.file}`}
          alt={brand.label}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain pointer-events-none select-none transition-transform duration-300"
          loading="lazy"
        />
      </div>
    );
  }

  const conceptRenderer = CONCEPT_MAP[name];
  if (conceptRenderer) {
    return (
      <div
        className={`relative inline-flex items-center justify-center text-[var(--ink)] ${className}`}
        style={{ width: size, height: size }}
      >
        {conceptRenderer(size * 0.72)}
      </div>
    );
  }

  // Fallback geometric glyph
  return (
    <div
      className={`inline-flex items-center justify-center font-mono font-bold text-xs uppercase text-[var(--ink)] bg-[var(--soft)] rounded-md ${className}`}
      style={{ width: size, height: size }}
    >
      {name.slice(0, 2)}
    </div>
  );
}
