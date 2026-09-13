import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Layers } from "lucide-react";
import { resolveiqData } from "@/lib/content/projects/resolveiq";

export function ResolveIQStack() {
  return (
    <section id="stack" className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="cyan" size="sm">
            TECHNOLOGY STACK
          </Badge>
          <span className="text-xs font-mono text-slate-400">
            // COMPLETE PRODUCTION SUITE
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans mb-8">
          Categorized Architectural Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolveiqData.techStack.map((tier) => (
            <GlassPanel key={tier.category} variant="default" className="p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-center gap-2 mb-3 font-mono text-xs font-bold text-cyan-300">
                <Layers className="w-3.5 h-3.5" />
                <span>// {tier.category.toUpperCase()}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tier.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
