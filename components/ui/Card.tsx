import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "amber";
  className?: string;
}) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    brand: "bg-brand-50 text-brand-800",
    amber: "bg-amber-100 text-amber-900",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
