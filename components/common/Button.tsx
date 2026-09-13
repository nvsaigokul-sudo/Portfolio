import React from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "amber" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(61,219,255,0.3)] active:scale-[0.98]",
      secondary:
        "bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
      amber:
        "bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.98]",
      outline:
        "bg-transparent text-slate-300 border border-slate-700 hover:border-cyan-400/50 hover:text-cyan-300 active:scale-[0.98]",
      ghost:
        "bg-transparent text-slate-400 hover:text-slate-100 hover:bg-white/5 active:scale-[0.98]",
      danger:
        "bg-red-500/20 text-red-300 border border-red-400/40 hover:bg-red-500/30 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs font-mono tracking-wider rounded-md",
      md: "px-4 py-2 text-sm font-medium rounded-lg",
      lg: "px-6 py-3 text-base font-medium rounded-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-200 font-sans cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
