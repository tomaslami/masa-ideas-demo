import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[var(--muted)]">{hint}</span>}
    </label>
  );
}

const base =
  "w-full border border-[var(--border)] bg-[var(--surface-white)] px-4 text-sm text-ink-900 outline-none transition placeholder:text-neutral-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(base, "h-11 rounded-full", className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(base, "py-3 min-h-20 resize-y rounded-[20px]", className)} {...props} />
));
Textarea.displayName = "Textarea";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(base, "h-11 rounded-full pr-9 cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23696969%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[right_0.75rem_center] bg-no-repeat", className)} {...props}>
    {children}
  </select>
));
Select.displayName = "Select";
