export function PageHeader({
  title,
  subtitle,
  eyebrow,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <span className="eyebrow mb-2.5">{eyebrow}</span>}
        <h1 className="text-[28px] font-medium tracking-display text-ink-900 sm:text-[34px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-sm text-[var(--muted)] sm:text-[15px]">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
