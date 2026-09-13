import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Server, Brain, Network, ShieldCheck } from "lucide-react";

interface FocusAreaCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

const icons = [Server, Brain, Network, ShieldCheck];

export function FocusAreaCard({ title, description, tags, index }: FocusAreaCardProps) {
  const Icon = icons[index % icons.length];

  return (
    <GlassPanel
      variant="default"
      className="group hover:border-cyan-400/40 transition-all duration-300 p-5 rounded-xl flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_12px_rgba(61,219,255,0.3)] transition-all">
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-slate-100 font-sans group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed font-sans mb-4">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassPanel>
  );
}
