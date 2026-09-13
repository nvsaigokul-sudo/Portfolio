import React from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GlassPanel } from "@/components/common/GlassPanel";
import { SkillChip } from "@/components/skills/SkillChip";
import { skillsData } from "@/lib/content/skills";

export function SkillGrid() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills & Competencies"
      className="relative py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="03"
          tag="TECHNICAL SKILLS"
          title="Engineered Capabilities & Technologies"
          subtitle="Categorized toolchains across systems programming, persistence, distributed streaming, and applied AI."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <GlassPanel
              key={category.category}
              variant="default"
              className="p-6 flex flex-col justify-between hover:border-cyan-400/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold font-mono text-cyan-300">
                    // {category.category.toUpperCase()}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">
                    {category.skills.length} TOOLS
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans mb-5">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                {category.skills.map((skill) => (
                  <SkillChip
                    key={skill.name}
                    name={skill.name}
                    note={skill.note}
                  />
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
