import React from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "amber" | "green" | "red" | "neutral";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "cyan",
  size = "sm",
  children,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    red: "bg-red-500/10 text-red-300 border-red-500/30",
    neutral: "bg-white/5 text-slate-300 border-white/10",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs tracking-wider",
    md: "px-3 py-1 text-sm tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono font-medium select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
