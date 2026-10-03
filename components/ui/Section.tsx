import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-18 lg:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl sm:mb-14",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-brand-700 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg text-slate-600">{lead}</p>}
    </div>
  );
}
