"use client";

import Link from "next/link";
import { track, type TrackEventName } from "@/components/analytics/track";
import { buttonClasses, type ButtonVariant, type ButtonSize } from "./Button";

export function TrackedCta({
  href,
  event,
  meta,
  variant = "primary",
  size = "md",
  className,
  external,
  children,
}: {
  href: string;
  event: TrackEventName;
  meta?: Record<string, string>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={() => track(event, meta)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={() => track(event, meta)}>
      {children}
    </Link>
  );
}
