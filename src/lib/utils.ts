import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatARS(n: number): string {
  return ARS.format(n);
}

/** Formato compacto: $1,2M / $850k */
export function formatARSCompact(n: number): string {
  if (Math.abs(n) >= 1_000_000) {
    return `$${(n / 1_000_000).toLocaleString("es-AR", {
      maximumFractionDigits: 1,
    })}M`;
  }
  if (Math.abs(n) >= 1_000) {
    return `$${Math.round(n / 1_000)}k`;
  }
  return `$${n}`;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("es-AR").format(n);
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...opts,
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
  });
}

/** "hace 3 días" */
export function relativeTime(iso: string, now: Date): string {
  const diff = now.getTime() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  const h = Math.round(min / 60);
  const d = Math.round(h / 24);
  if (min < 1) return "recién";
  if (min < 60) return `hace ${min} min`;
  if (h < 24) return `hace ${h} h`;
  if (d === 1) return "ayer";
  if (d < 30) return `hace ${d} días`;
  const m = Math.round(d / 30);
  return m === 1 ? "hace 1 mes" : `hace ${m} meses`;
}

export function daysBetween(aIso: string, bIso: string): number {
  return Math.round(
    (new Date(bIso).getTime() - new Date(aIso).getTime()) / 86400000,
  );
}

export function addMonthsISO(iso: string, months: number): string {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString();
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** id corto determinístico-ish para nuevas entidades del demo */
export function shortId(prefix = "id"): string {
  const rnd = Math.floor(performance.now() * 1000) % 1_000_000;
  return `${prefix}-${rnd.toString(36)}`;
}
