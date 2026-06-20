"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

export function Drawer({
  open,
  onClose,
  children,
  width = "max-w-xl",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
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
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink-950/40 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-full bg-[var(--surface-white)] shadow-[var(--shadow-lift)] animate-slide-in-right flex flex-col sm:rounded-l-[32px] overflow-hidden",
          width,
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-white/80 text-ink-700 shadow-sm hover:bg-white transition"
          aria-label="Cerrar"
        >
          <X className="size-4.5" />
        </button>
        {children}
      </div>
    </div>
  );
}
