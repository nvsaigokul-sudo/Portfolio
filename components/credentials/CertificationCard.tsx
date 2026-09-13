import React from "react";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/common/Badge";
import { Award, Calendar } from "lucide-react";
import { type CertificationRecord } from "@/lib/content/certifications";

interface CertificationCardProps {
  certification: CertificationRecord;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <GlassPanel variant="default" className="p-6 flex flex-col justify-between hover:border-cyan-400/30 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="cyan" size="sm">
            {certification.category}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <Calendar className="w-3 h-3 text-cyan-400" />
            <span>{certification.issueDate}</span>
          </div>
        </div>

        <h3 className="text-base font-semibold text-white font-sans mb-1 line-clamp-2">
          {certification.title}
        </h3>
        <p className="text-xs font-mono text-cyan-300 mb-3">
          {certification.issuer}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          {certification.description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
        <span>VERIFIED CREDENTIAL</span>
        <Award className="w-4 h-4 text-cyan-400/60" />
      </div>
    </GlassPanel>
  );
}
