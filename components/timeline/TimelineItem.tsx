import React from "react";
import { GraduationCap, MapPin, Calendar, CheckCircle } from "lucide-react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { type EducationRecord } from "@/lib/content/education";

interface TimelineItemProps {
  item: EducationRecord;
  isLast?: boolean;
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative pl-8 sm:pl-10 pb-10 last:pb-0 group">
      {/* Vertical line indicator */}
      {!isLast && (
        <div className="absolute left-[15px] sm:left-[19px] top-6 bottom-0 w-0.5 bg-white/10 group-hover:bg-cyan-500/30 transition-colors" />
      )}

      {/* Node Dot / Icon */}
      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#0D1117] border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(61,219,255,0.2)] group-hover:border-cyan-400 group-hover:scale-110 transition-all">
        <GraduationCap className="w-4 h-4" />
      </div>

      {/* Content Card */}
      <GlassPanel variant="default" className="p-6 hover:border-cyan-400/30 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">
              {item.institution}
            </span>
            <Badge variant={item.status === "Current" ? "cyan" : "neutral"} size="sm">
              {item.status}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{item.dates}</span>
          </div>
        </div>

        <div className="text-sm font-semibold text-cyan-300 font-sans mb-2">
          {item.program}
        </div>

        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed mb-4">
          {item.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{item.location}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
            <span>{item.scoreLabel}:</span>
            <span className="font-bold">{item.score}</span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
