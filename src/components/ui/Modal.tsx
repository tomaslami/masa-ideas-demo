"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  children,
  className,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/45 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full max-w-lg rounded-[28px] bg-[var(--surface-white)] shadow-[var(--shadow-lift)] animate-scale-in",
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
            <h2 className="text-base font-semibold text-ink-900">{title}</h2>
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-full text-ink-700 hover:bg-black/5"
              aria-label="Cerrar"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
