import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, CheckCircle2, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GlassPanel } from "@/components/common/GlassPanel";
import { FocusAreaCard } from "@/components/about/FocusAreaCard";
import { profileData } from "@/lib/content/profile";

export function About() {
  return (
    <section
      id="about"
      aria-label="Engineering Profile"
      className="relative py-24 sm:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01"
          tag="ENGINEERING PROFILE"
          title="Architecting Resilient Backend & Applied AI Systems"
          subtitle="Combining systems discipline with explainable, evidence-backed machine intelligence."
        />

        {/* Two-Column Layout (PRD Section 18) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Professional Summary & Engineering Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <GlassPanel variant="cyan" glow={false} className="p-8">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>// PROFESSIONAL SUMMARY</span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans mb-6">
                {profileData.professionalSummary}
              </p>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-slate-500">CURRENT STATUS:</span>{" "}
                  <span className="text-cyan-300 font-semibold">Undergraduate / Actively Building</span>
                </div>
                <div>
                  <span className="text-slate-500">LOCATION:</span>{" "}
                  <span className="text-slate-200">India</span>
                </div>
              </div>
            </GlassPanel>

            {/* Engineering Principles Callout (PRD Section 18) */}
            <div className="rounded-xl p-6 bg-gradient-to-r from-amber-500/10 via-[#111722] to-transparent border border-amber-500/30">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-amber-400 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>CORE PRINCIPLE: EVIDENCE OVER HALLUCINATION</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                &ldquo;The system prefers explicit uncertainty over hallucination — it will not fabricate a root cause without adequate evidence.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-slate-400">
                  Seen in the ResolveIQ Incident Intelligence Platform
                </span>
                <Link
                  href="/work/resolveiq"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <span>Explore Safety State</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Categorical Focus Area Cards (No invented proficiency % - PRD Section 18 & 31) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profileData.focusAreas.map((area, idx) => (
              <FocusAreaCard
                key={area.title}
                title={area.title}
                description={area.description}
                tags={area.tags}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
