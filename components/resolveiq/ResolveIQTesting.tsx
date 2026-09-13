import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { CheckCircle2, TestTube2, Cpu, Activity, Flame } from "lucide-react";
import { resolveiqData } from "@/lib/content/projects/resolveiq";

export function ResolveIQTesting() {
  const testing = resolveiqData.testingStrategy;

  return (
    <section id="testing" className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="cyan" size="sm">
            VERIFICATION & RELIABILITY
          </Badge>
          <span className="text-xs font-mono text-slate-400">
            // COMPREHENSIVE TEST SUITE
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans mb-3">
          Testing Strategy & Chaos Validation
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl mb-8">
          Reliability is engineered from unit test thresholds up to high-throughput load and fault injection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testing.map((test) => (
            <GlassPanel key={test.category} variant="default" className="p-6 hover:border-cyan-400/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold">
                    <TestTube2 className="w-4 h-4 text-cyan-400" />
                    <span>{test.category}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    {test.tooling}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mt-3">
                  {test.validates}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Automated Pipeline Stage</span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
