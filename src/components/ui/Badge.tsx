import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  dot,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dot)} />}
      {children}
    </span>
  );
}
