import Image from "next/image";
import type { ComponentType } from "react";
import { FaCube, FaHdd, FaMemory, FaServer, FaTerminal } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import type {
  HomelabNodeStatus,
  HomelabService,
  ServiceStatus,
  SpecIconKey,
} from "@/lib/homelab-data";

const specIcons: Record<SpecIconKey, ComponentType<{ className?: string }>> = {
  cpu: GiProcessor,
  ram: FaMemory,
  storage: FaHdd,
  os: FaTerminal,
  docker: FaCube,
  model: FaServer,
};

export function SpecIcon({
  icon,
  className = "h-4 w-4",
}: {
  icon: SpecIconKey;
  className?: string;
}) {
  const Icon = specIcons[icon];
  return (
    <span aria-hidden="true" className="inline-flex" style={{ color: "var(--flag)" }}>
      <Icon className={className} />
    </span>
  );
}

type AnyStatus = ServiceStatus | HomelabNodeStatus;

const statusStyles: Record<
  AnyStatus,
  { label: string; border: string; text: string; background: string; dot: string }
> = {
  active: {
    label: "Active",
    border: "var(--bush)",
    text: "var(--bush)",
    background: "color-mix(in srgb, var(--bush) 10%, var(--sheet))",
    dot: "solid",
  },
  passive: {
    label: "Passive",
    border: "var(--water)",
    text: "var(--ink)",
    background: "color-mix(in srgb, var(--water) 22%, var(--sheet))",
    dot: "ring",
  },
  planned: {
    label: "Planned",
    border: "var(--gravel)",
    text: "var(--gravel)",
    background: "color-mix(in srgb, var(--gravel) 10%, var(--sheet))",
    dot: "dashed",
  },
  retired: {
    label: "Retired",
    border: "var(--gravel)",
    text: "var(--gravel)",
    background: "color-mix(in srgb, var(--gravel) 10%, var(--sheet))",
    dot: "dashed",
  },
};

/**
 * Status is never communicated by colour alone: the dot changes shape as well
 * as hue, and the label is always rendered as text.
 */
export function StatusDot({ status }: { status: AnyStatus }) {
  const style = statusStyles[status];
  const base = "inline-block h-2 w-2 shrink-0 rounded-full";

  if (style.dot === "solid") {
    return <span aria-hidden="true" className={base} style={{ backgroundColor: style.border }} />;
  }
  if (style.dot === "ring") {
    return (
      <span
        aria-hidden="true"
        className={`${base} border-2`}
        style={{ borderColor: style.border }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`${base} border border-dashed`}
      style={{ borderColor: style.border }}
    />
  );
}

export function StatusBadge({ status }: { status: AnyStatus }) {
  const style = statusStyles[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 border-2 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
      style={{
        borderColor: style.border,
        backgroundColor: style.background,
        color: style.text,
      }}
    >
      <StatusDot status={status} />
      {style.label}
    </span>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function ServiceGlyph({
  service,
  size = 20,
}: {
  service: Pick<HomelabService, "name" | "icon">;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center border-2"
      style={{
        width: size + 18,
        height: size + 18,
        borderColor: "var(--ink)",
        backgroundColor: "var(--sheet-2)",
      }}
    >
      {service.icon ? (
        <Image
          src={service.icon}
          alt=""
          width={size}
          height={size}
          className="object-contain"
        />
      ) : (
        <span
          className="font-display text-[11px] font-bold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          {initials(service.name)}
        </span>
      )}
    </span>
  );
}
