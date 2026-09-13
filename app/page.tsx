import React from "react";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { FeaturedWorkIndex } from "@/components/work/FeaturedWorkIndex";
import { SkillGrid } from "@/components/skills/SkillGrid";
import { CredentialsSection } from "@/components/credentials/CredentialsSection";
import { Timeline } from "@/components/timeline/Timeline";
import { Contact } from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <FeaturedWorkIndex />
      <SkillGrid />
      <CredentialsSection />
      <Timeline />
      <Contact />
    </div>
  );
}
