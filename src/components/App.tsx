"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function App() {
  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-hidden selection:bg-[var(--ink)] selection:text-[var(--paper)]">
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <CertificationsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
}
