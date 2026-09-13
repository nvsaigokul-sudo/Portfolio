import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Calendar, CheckCircle2, Code } from "lucide-react";
import { trainingData } from "@/lib/content/training";

export function TrainingCard() {
  const training = trainingData[0];

  return (
    <GlassPanel variant="default" className="p-6 sm:p-8 hover:border-cyan-400/30 transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="sm">
            PROFESSIONAL TRAINING
          </Badge>
          <span className="text-xs font-mono text-slate-400">
            {training.provider}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>{training.duration}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 font-sans">
        {training.title}
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
        {training.description}
      </p>

      <div className="space-y-2">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          // Technologies & Frameworks Practiced
        </div>
        <div className="flex flex-wrap gap-1.5">
          {training.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}
