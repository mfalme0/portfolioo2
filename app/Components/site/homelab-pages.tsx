import Image from "next/image";
import Link from "next/link";
import { PageHero } from "./page-hero";
import { SectionHeading } from "./section-heading";
import { StatusBadge, StatusDot, SpecIcon } from "./homelab-ui";
import { HomelabServiceExplorer } from "./homelab-explorer";
import {
  getHomelabStats,
  type HomelabItem,
  type HomelabStats,
} from "@/lib/homelab-data";

export function NodeCard({ item }: { item: HomelabItem }) {
  return (
    <Link
      href={`/homelab/${item.slug}`}
      className="group apple-card-flat flex flex-col overflow-hidden"
    >
      <div
        className="relative aspect-[16/10] border-b-[3px]"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4">
          <StatusBadge status={item.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div
          className="flex items-center justify-between gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{ color: "var(--gravel)" }}
        >
          <span>{item.category}</span>
          <span>{item.services.length} services</span>
        </div>

        <h3
          className="mt-3 font-display text-3xl font-black uppercase leading-none tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          {item.name}
        </h3>
        <p
          className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em]"
          style={{ color: "var(--gravel)" }}
        >
          {item.model}
        </p>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
          {item.description}
        </p>

        <dl
          className="mt-6 grid grid-cols-3 border-t-2 pt-4"
          style={{ borderColor: "var(--ink)" }}
        >
          {[
            { label: "CPU", value: item.cpu },
            { label: "RAM", value: item.ram },
            { label: "Storage", value: item.storage },
          ].map((spec) => (
            <div key={spec.label}>
              <dt
                className="font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--gravel)" }}
              >
                {spec.label}
              </dt>
              <dd className="mt-1 text-xs font-semibold leading-snug" style={{ color: "var(--ink)" }}>
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <span
          className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-transform group-hover:translate-x-1"
          style={{ color: "var(--flag)" }}
        >
          Open node <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function StatStrip({ stats }: { stats: HomelabStats }) {
  const cells = [
    { label: "Nodes", value: String(stats.nodes), detail: "physical machines" },
    {
      label: "Services",
      value: String(stats.services),
      detail: `${stats.activeServices} active · ${stats.passiveServices} passive`,
    },
    { label: "Storage", value: stats.storageLabel, detail: "across both nodes" },
    { label: "Memory", value: stats.ramLabel, detail: "combined RAM" },
  ];

  return (
    <section aria-label="Homelab at a glance" className="w-full" style={{ backgroundColor: "var(--paper)" }}>
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-14 md:py-14">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {cells.map((cell) => (
            <div
              key={cell.label}
              className="border-[3px] p-5 md:p-6"
              style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet)" }}
            >
              <dt
                className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--flag)" }}
              >
                {cell.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-black leading-none tracking-tight md:text-4xl" style={{ color: "var(--ink)" }}>
                {cell.value}
              </dd>
              <dd className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: "var(--gravel)" }}>
                {cell.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function DiagramBox({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div
      className="w-full max-w-sm border-[3px] p-4 text-center"
      style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet)" }}
    >
      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--flag)" }}>
        {label}
      </span>
      <p className="mt-1 font-display text-base font-bold uppercase tracking-tight" style={{ color: "var(--ink)" }}>
        {value}
      </p>
      {detail && (
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: "var(--gravel)" }}>
          {detail}
        </p>
      )}
    </div>
  );
}

function FlowArrow() {
  return (
    <span aria-hidden="true" className="font-mono text-xl leading-none" style={{ color: "var(--flag)" }}>
      ↓
    </span>
  );
}

export function HomelabCtaBand() {
  return (
    <section
      className="border-y-[3px]"
      style={{ borderColor: "var(--ink)", backgroundColor: "var(--flag)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-14 md:py-16">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--paper)" }}>
            Built for reliability
          </span>
          <h2 className="mt-3 font-display text-3xl font-black uppercase leading-none tracking-tight md:text-4xl" style={{ color: "var(--paper)" }}>
            Need infrastructure that stays up?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--paper)" }}>
            I design, build and maintain the same kind of setup for small teams: monitoring,
            backups, automation and a plan for when hardware fails.
          </p>
        </div>
        <Link
          href="/work-with-me"
          className="inline-flex shrink-0 items-center gap-2 border-[3px] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          style={{
            borderColor: "var(--ink)",
            backgroundColor: "var(--paper)",
            color: "var(--ink)",
            boxShadow: "4px 4px 0 var(--ink)",
          }}
        >
          Work with me <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export function HomelabIndexPage({ items }: { items: readonly HomelabItem[] }) {
  const stats = getHomelabStats();

  return (
    <>
      <PageHero
        eyebrow="Homelab"
        title={
          <>
            Two machines.{" "}
            <span style={{ color: "var(--flag)" }}>A lot of services.</span>
          </>
        }
        lead="The infrastructure behind everything else on this site: a pair of low-power machines running media, automation, backups and monitoring around the clock."
        crumbs={[{ name: "Home", path: "/" }, { name: "Homelab" }]}
        cta={{ label: "Browse the rack", href: "#rack" }}
        meta={[`${stats.nodes} nodes`, `${stats.services} services`, "Nairobi, Kenya"]}
      />

      <StatStrip stats={stats} />

      <section
        id="rack"
        className="scroll-mt-32 border-y-[3px] py-14 md:py-20"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <SectionHeading
            eyebrow="The rack"
            title={
              <>
                Hardware with a{" "}
                <span style={{ color: "var(--flag)" }}>job to do.</span>
              </>
            }
            lead="One node carries the media and automation stack. The other keeps the house running and picks up the slack when the power drops."
          />
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
            {items.map((item) => (
              <NodeCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-32 py-14 md:py-20"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <SectionHeading
            eyebrow="Service inventory"
            title={
              <>
                Everything that{" "}
                <span style={{ color: "var(--flag)" }}>runs here.</span>
              </>
            }
            lead="Filter by node or status, then open any service for its port and container details."
          />
          <div className="mt-10">
            <HomelabServiceExplorer nodes={items.map((item) => ({ slug: item.slug, name: item.name, services: item.services }))} />
          </div>
        </div>
      </section>

      <section
        id="wiring"
        className="section-grid scroll-mt-32 border-y-[3px] py-14 md:py-20"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet-2)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <SectionHeading
            eyebrow="How it's wired"
            title={
              <>
                One network.{" "}
                <span style={{ color: "var(--flag)" }}>Two nodes.</span>
              </>
            }
            lead="Both machines sit behind the same router and switch. Potato carries the heavy media workload; Small Potato runs the house and stays alive on battery during outages."
          />

          <figure
            className="mt-10 border-[3px] p-6 md:p-10"
            style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
          >
            <div className="flex flex-col items-center gap-3">
              <DiagramBox label="WAN" value="Fibre uplink" detail="Static IP · port forwarded where needed" />
              <FlowArrow />
              <DiagramBox label="Edge" value="Router · 1 GbE switch" detail="VLANs · DHCP reservations" />
              <FlowArrow />
              <div className="grid w-full gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/homelab/${item.slug}`}
                    className="group border-[3px] p-4 transition-colors"
                    style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet)" }}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-lg font-black uppercase tracking-tight" style={{ color: "var(--ink)" }}>
                        {item.name}
                      </span>
                      <StatusDot status={item.status} />
                    </span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: "var(--gravel)" }}>
                      {item.services.length} services · {item.storage}
                    </span>
                    <span className="mt-2 inline-block font-mono text-[9px] font-bold uppercase tracking-[0.14em] transition-transform group-hover:translate-x-1" style={{ color: "var(--flag)" }}>
                      Open node →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <figcaption className="mt-6 border-t-2 pt-4 text-center font-mono text-[9px] uppercase tracking-[0.12em]" style={{ borderColor: "var(--ink)", color: "var(--gravel)" }}>
              Docker on both nodes · CasaOS dashboards · UPS-backed automation
            </figcaption>
          </figure>
        </div>
      </section>

      <HomelabCtaBand />
    </>
  );
}

export function HomelabSpecGrid({ item }: { item: HomelabItem }) {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {item.specs.map((spec) => (
        <div
          key={spec.label}
          className="border-[3px] p-5"
          style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
        >
          <div className="flex items-center justify-between gap-3">
            <SpecIcon icon={spec.icon} className="h-5 w-5" />
            {spec.tag && (
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--gravel)" }}>
                {spec.tag}
              </span>
            )}
          </div>
          <dt className="mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--flag)" }}>
            {spec.label}
          </dt>
          <dd className="mt-1 font-display text-lg font-bold leading-tight" style={{ color: "var(--ink)" }}>
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
