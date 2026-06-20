"use client";

import { create } from "zustand";
import { CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Toast = { id: number; msg: string; kind: "success" | "info" };

interface ToastState {
  toasts: Toast[];
  push: (msg: string, kind?: "success" | "info") => void;
  dismiss: (id: number) => void;
}

let counter = 1;

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  push: (msg, kind = "success") => {
    const id = counter++;
    set((s) => ({ toasts: [...s.toasts, { id, msg, kind }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3200);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/95 px-5 py-3 shadow-[var(--shadow-lift)] backdrop-blur animate-slide-in-right"
        >
          {t.kind === "success" ? (
            <CheckCircle2 className="size-5 text-emerald-500" />
          ) : (
            <Info className="size-5 text-brand-500" />
          )}
          <span className="text-sm font-medium text-ink-800">{t.msg}</span>
          <button
            onClick={() => dismiss(t.id)}
            className={cn("ml-1 grid size-6 place-items-center rounded-full text-neutral-400 hover:bg-black/5")}
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
