"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // Naranja de marca Masa Ideas — CTA principal (identidad)
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 focus-visible:ring-brand-300",
  // Píldora delineada cálida
  secondary:
    "bg-[var(--surface-white)] text-ink-900 border-[1.5px] border-ink-900/90 hover:bg-ink-900 hover:text-cream-canvas active:scale-[0.98] focus-visible:ring-ink-700/30",
  ghost:
    "text-ink-700 hover:bg-ink-900/5 active:bg-ink-900/10 focus-visible:ring-brand-200",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300",
  // Píldora ink (gesto Mastercard) — énfasis secundario fuerte
  dark: "bg-ink-900 text-cream-canvas hover:bg-ink-800 active:scale-[0.98] focus-visible:ring-ink-700/40",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3.5 text-[13px] gap-1.5 rounded-full",
  md: "h-10 px-5 text-sm gap-2 rounded-full",
  lg: "h-12 px-7 text-[15px] gap-2 rounded-full",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none select-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  ),
);
Button.displayName = "Button";
