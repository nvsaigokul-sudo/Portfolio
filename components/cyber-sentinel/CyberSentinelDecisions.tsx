import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import { cyberSentinelData } from "@/lib/content/projects/cyberSentinel";

export function CyberSentinelDecisions() {
  return (
    <section id="decisions" className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="red" size="sm">
            ENGINEERING RATIONALE
          </Badge>
          <span className="text-xs font-mono text-slate-400">
            // ARCHITECTURAL TRADE-OFFS
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans mb-8">
          Key Systems Decisions & Justifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cyberSentinelData.engineeringDecisions.map((dec, idx) => (
            <GlassPanel
              key={idx}
              variant="default"
              className="p-6 sm:p-8 hover:border-red-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-2 mb-3 text-red-300 font-mono text-xs font-semibold">
                  <HelpCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{dec.question}</span>
                </div>

                <div className="mb-4 inline-block px-3 py-1 rounded bg-red-500/10 border border-red-400/20 text-xs font-mono font-bold text-white">
                  Decision: {dec.decision}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {dec.rationale}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Production Rationale Verified</span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
