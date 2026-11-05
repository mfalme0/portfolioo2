"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HomelabItem, HomelabService, ServiceStatus } from "@/lib/homelab-data";
import { ServiceGlyph, StatusBadge, StatusDot } from "./homelab-ui";
import { buttonBase } from "./buttons";

type ExplorerNode = Pick<HomelabItem, "slug" | "name" | "services">;

type StatusFilter = "all" | ServiceStatus;

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "passive", label: "Passive" },
  { value: "planned", label: "Planned" },
];

interface ServiceEntry {
  service: HomelabService;
  nodeName: string;
}

function matchesQuery(service: HomelabService, query: string): boolean {
  if (!query) return true;
  const haystack = `${service.name} ${service.description ?? ""}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function HomelabServiceExplorer({
  nodes,
  showNodeFilter = true,
}: {
  nodes: ExplorerNode[];
  showNodeFilter?: boolean;
}) {
  const searchId = useId();
  const [status, setStatus] = useState<StatusFilter>("all");
  const [nodeSlug, setNodeSlug] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ServiceEntry | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  const rows = useMemo(
    () =>
      nodes.flatMap((node) =>
        node.services.map((service) => ({ service, nodeName: node.name, nodeSlug: node.slug }))
      ),
    [nodes]
  );

  // Counts follow the node filter but ignore the status/search filters, so the
  // tab numbers stay stable while the user narrows the list.
  const scopedRows = useMemo(
    () => (nodeSlug === "all" ? rows : rows.filter((row) => row.nodeSlug === nodeSlug)),
    [rows, nodeSlug]
  );

  const counts = useMemo(
    () => ({
      all: scopedRows.length,
      active: scopedRows.filter((row) => row.service.status === "active").length,
      passive: scopedRows.filter((row) => row.service.status === "passive").length,
      planned: scopedRows.filter((row) => row.service.status === "planned").length,
    }),
    [scopedRows]
  );

  const filtered = useMemo(
    () =>
      scopedRows.filter(
        (row) =>
          (status === "all" || row.service.status === status) &&
          matchesQuery(row.service, query)
      ),
    [scopedRows, status, query]
  );

  return (
    <div>
      <div className="mb-7 space-y-4 border-b-2 pb-6" style={{ borderColor: "var(--ink)" }}>
        <div className="flex flex-wrap items-center gap-2">
          {statusFilters.map((filter) => {
            const isActive = status === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatus(filter.value)}
                aria-pressed={isActive}
                className="border-2 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors"
                style={{
                  borderColor: "var(--ink)",
                  backgroundColor: isActive ? "var(--ink)" : "transparent",
                  color: isActive ? "var(--sheet)" : "var(--ink)",
                }}
              >
                {filter.label}
                <span className="ml-1.5 opacity-70">{counts[filter.value]}</span>
              </button>
            );
          })}
          <span
            className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: "var(--gravel)" }}
            aria-live="polite"
          >
            {filtered.length} {filtered.length === 1 ? "service" : "services"}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {showNodeFilter && nodes.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--gravel)" }}
              >
                Node
              </span>
              {[{ slug: "all", name: "Both" }, ...nodes].map((node) => {
                const isActive = nodeSlug === "all" ? node.slug === "all" : node.slug === nodeSlug;
                return (
                  <button
                    key={node.slug}
                    type="button"
                    onClick={() => setNodeSlug(node.slug)}
                    aria-pressed={isActive}
                    className="border-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-colors"
                    style={{
                      borderColor: "var(--ink)",
                      backgroundColor: isActive ? "var(--bush)" : "transparent",
                      color: isActive ? "var(--sheet)" : "var(--ink)",
                    }}
                  >
                    {node.name}
                  </button>
                );
              })}
            </div>
          )}

          <div className="sm:ml-auto sm:w-64">
            <label htmlFor={searchId} className="sr-only">
              Search services
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services…"
              className="w-full border-2 px-3 py-2 font-mono text-[11px] placeholder:opacity-60"
              style={{
                borderColor: "var(--ink)",
                backgroundColor: "var(--sheet)",
                color: "var(--ink)",
              }}
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="border-2 p-8 text-center"
          style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet)" }}
        >
          <p className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
            No services match that filter.
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--gravel)" }}>
            Try another status, node, or search term.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ service, nodeName }) => (
            <li key={`${nodeName}-${service.name}`}>
              <button
                type="button"
                onClick={() => setSelected({ service, nodeName })}
                className="apple-card-flat group flex h-full w-full flex-col gap-4 p-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <ServiceGlyph service={service} />
                  <StatusDot status={service.status} />
                </div>
                <div>
                  <h3
                    className="font-display text-lg font-bold leading-tight tracking-tight"
                    style={{ color: "var(--ink)" }}
                  >
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>
                      {service.description}
                    </p>
                  )}
                </div>
                <div
                  className="mt-auto flex items-center justify-between gap-3 border-t-2 pt-3 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{ borderColor: "var(--ink)", color: "var(--gravel)" }}
                >
                  <span>{nodeName}</span>
                  <span>{service.port ? `:${service.port}` : "no port"}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {selected && (
          <ServiceModal entry={selected} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceModal({ entry, onClose }: { entry: ServiceEntry; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, [onClose]);

  const { service, nodeName } = entry;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "color-mix(in srgb, var(--ink) 55%, transparent)",
          backdropFilter: "blur(3px)",
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[88dvh] w-full max-w-lg overflow-y-auto border-[3px] p-6 md:p-8"
        style={{
          borderColor: "var(--ink)",
          backgroundColor: "var(--sheet)",
          boxShadow: "8px 8px 0 var(--ink)",
        }}
      >
        <div className="flex items-start gap-4">
          <ServiceGlyph service={service} size={26} />
          <div className="min-w-0 flex-1">
            <StatusBadge status={service.status} />
            <h2
              id="service-modal-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight"
              style={{ color: "var(--ink)" }}
            >
              {service.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="flex h-8 w-8 shrink-0 items-center justify-center border-2 font-mono text-sm font-bold transition-colors"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <p
          className="mt-4 inline-flex items-center gap-2 border-2 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{ borderColor: "var(--ink)", color: "var(--gravel)" }}
        >
          <span className="inline-block h-1.5 w-1.5" style={{ backgroundColor: "var(--flag)" }} />
          {nodeName}
        </p>

        {service.description && (
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--gravel)" }}>
            {service.description}
          </p>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="border-2 p-3" style={{ borderColor: "var(--ink)" }}>
            <dt
              className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--gravel)" }}
            >
              Port
            </dt>
            <dd className="mt-1 font-mono text-sm font-bold" style={{ color: "var(--ink)" }}>
              {service.port ?? "—"}
            </dd>
          </div>
          <div className="border-2 p-3" style={{ borderColor: "var(--ink)" }}>
            <dt
              className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--gravel)" }}
            >
              Status
            </dt>
            <dd className="mt-1">
              <StatusBadge status={service.status} />
            </dd>
          </div>
        </dl>

        {service.url && (
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] underline"
            style={{ color: "var(--flag)", textUnderlineOffset: "4px" }}
          >
            Open service
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {service.dockerHubUrl && (
          <a
            href={service.dockerHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} rog-btn-secondary mt-6 w-full`}
          >
            <span className="relative flex items-center gap-2">
              Docker Hub
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}
