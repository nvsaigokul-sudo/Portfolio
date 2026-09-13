import React from "react";
import { cn } from "@/lib/utils/cn";

interface SkillChipProps {
  name: string;
  note?: string;
}

export function SkillChip({ name, note }: SkillChipProps) {
  return (
    <div
      className={cn(
        "group relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/40 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-200 cursor-default"
      )}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_#3DDBFF] transition-all" />
      <span className="font-mono text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
        {name}
      </span>
      {note && (
        <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 border-l border-white/10 pl-2">
          {note}
        </span>
      )}
    </div>
  );
}
