import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Trophy, CheckCircle2, Calendar } from "lucide-react";
import { achievementsData } from "@/lib/content/achievements";

export function AchievementCard() {
  const achievement = achievementsData[0];

  return (
    <GlassPanel
      variant="cyan"
      glow={false}
      className="p-6 sm:p-8 hover:border-cyan-400/50 transition-all duration-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="sm">
            {achievement.badge}
          </Badge>
          <span className="text-xs font-mono text-cyan-300">
            {achievement.organization}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>{achievement.year}</span>
        </div>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white font-sans">
            {achievement.title}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            National-Level 72-Hour Machine Learning Sprint
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
        {achievement.description}
      </p>

      <div className="space-y-2 pt-4 border-t border-white/10">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          // Applied Engineering Highlights
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {achievement.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 font-sans leading-snug">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
