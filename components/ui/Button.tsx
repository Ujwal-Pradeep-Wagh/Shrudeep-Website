import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "whatsapp" | "dark" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline-brand-600",
    secondary:
      "bg-white text-slate-900 border border-slate-300 hover:border-brand-600 hover:text-brand-700 focus-visible:outline-brand-600",
    whatsapp:
      "bg-whatsapp text-white hover:bg-whatsapp-dark focus-visible:outline-whatsapp",
    dark: "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900",
    ghost:
      "bg-transparent text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-600",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5 text-sm sm:text-base",
    lg: "px-6 py-3.5 text-base",
  };

  return cn(base, variants[variant], sizes[size], className);
}
