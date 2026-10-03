"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "page_view", path: pathname }),
        keepalive: true,
      });
    } catch {
      // ignore
    }
  }, [pathname]);

  return null;
}
