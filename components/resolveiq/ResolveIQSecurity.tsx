import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Shield, Lock, Key, Database, FileCheck } from "lucide-react";
import { resolveiqData } from "@/lib/content/projects/resolveiq";

export function ResolveIQSecurity() {
  const sec = resolveiqData.securityArchitecture;

  return (
    <section id="security" className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="cyan" size="sm">
            SECURITY MODEL
          </Badge>
          <span className="text-xs font-mono text-slate-400">
            // ZERO-TRUST ARCHITECTURE
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-sans mb-3">
          {sec.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl mb-8">
          {sec.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sec.features.map((feat) => (
            <GlassPanel key={feat.name} variant="default" className="p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-center gap-2.5 mb-3 text-cyan-300 font-mono text-xs font-bold">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>{feat.name}</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {feat.explanation}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
