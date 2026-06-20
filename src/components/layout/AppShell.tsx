"use client";

import { Sidebar } from "./Sidebar";
import { MobileBottomNav, MobileTopBar } from "./MobileNav";
import { Toaster } from "@/components/ui/toast";
import { useHydrated } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  return (
    <div className="min-h-full">
      <Sidebar />
      <MobileTopBar />
      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-[1400px] px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-10 lg:pt-6">
          {hydrated ? children : <BootSplash />}
        </div>
      </main>
      <MobileBottomNav />
      <Toaster />
    </div>
  );
}

function BootSplash() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-500" />
        <p className="text-sm text-[var(--muted)]">Cargando el sistema…</p>
      </div>
    </div>
  );
}
