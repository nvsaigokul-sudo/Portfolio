"use client";

import React, { useState } from "react";
import { FileDown, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { profileData } from "@/lib/content/profile";

interface ResumeButtonProps {
  variant?: "primary" | "secondary" | "amber" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ResumeButton({
  variant = "primary",
  size = "md",
  className,
}: ResumeButtonProps) {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If user clicks, open static path or inform if static placeholder
    setDownloadNotice("Downloading Resume PDF...");
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <a
        href={profileData.resumeUrl}
        download="N_V_Sai_Gokul_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleResumeClick}
        className="inline-block"
      >
        <Button variant={variant} size={size} className={className}>
          <FileDown className="w-4 h-4" />
          <span>Resume</span>
        </Button>
      </a>

      {downloadNotice && (
        <span
          role="status"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono bg-console-surface border border-cyan-500/40 text-cyan-300 px-2 py-1 rounded shadow-lg z-50 animate-fadeIn"
        >
          {downloadNotice}
        </span>
      )}
    </div>
  );
}
