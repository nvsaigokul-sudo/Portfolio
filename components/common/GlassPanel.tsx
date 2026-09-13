import React from "react";
import { cn } from "@/lib/utils/cn";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "cyan" | "amber" | "green" | "red";
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function GlassPanel({
  variant = "default",
  glow = false,
  children,
  className,
  ...props
}: GlassPanelProps) {
  const variantStyles = {
    default: "border-white/10 hover:border-white/20",
    cyan: glow
      ? "border-cyan-400/40 shadow-[0_0_25px_rgba(61,219,255,0.15)]"
      : "border-cyan-400/20 hover:border-cyan-400/40",
    amber: glow
      ? "border-amber-400/50 shadow-[0_0_25px_rgba(245,158,11,0.18)]"
      : "border-amber-400/30 hover:border-amber-400/50",
    green: glow
      ? "border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.18)]"
      : "border-emerald-400/30 hover:border-emerald-400/50",
    red: glow
      ? "border-red-400/50 shadow-[0_0_25px_rgba(239,68,68,0.18)]"
      : "border-red-400/30 hover:border-red-400/50",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl bg-[#0D1117]/80 backdrop-blur-md border p-6 transition-all duration-300",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
