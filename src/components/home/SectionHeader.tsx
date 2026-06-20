import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function SectionHeader({
  icon: Icon,
  title,
  hint,
  href,
  linkLabel,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon className="size-4" strokeWidth={2.2} />
        </span>
        <div>
          <h2 className="text-[15px] font-semibold leading-tight text-ink-900">{title}</h2>
          {hint && <p className="mt-0.5 text-xs text-[var(--muted)]">{hint}</p>}
        </div>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          {linkLabel}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
