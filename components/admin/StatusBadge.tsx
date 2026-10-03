import { cn } from "@/lib/utils";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/config";

const toneByStatus: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-violet-100 text-violet-800",
  qualified: "bg-cyan-100 text-cyan-800",
  "proposal-sent": "bg-amber-100 text-amber-800",
  negotiation: "bg-orange-100 text-orange-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-slate-200 text-slate-600",
  "follow-up": "bg-pink-100 text-pink-800",
};

export function StatusBadge({ status }: { status: string }) {
  const tone =
    toneByStatus[status as LeadStatus] ?? "bg-slate-100 text-slate-700";
  const label =
    LEAD_STATUS_LABELS[status as LeadStatus] ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tone
      )}
    >
      {label}
    </span>
  );
}
