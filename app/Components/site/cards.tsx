import React from "react";
import Link from "next/link";
import type { ServicePillar, PcService } from "@/lib/services";
import type { CaseStudy } from "@/lib/case-studies";
import type { Guide } from "@/lib/guides";
import { FiArrowUpRight } from "react-icons/fi";

export function MetricCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail?: string;
}) {
  return (
    <div className="apple-card-flat p-5 h-full">
      <div className="font-display text-3xl md:text-4xl font-bold leading-none" style={{ color: "var(--flag)" }}>
        {value}
      </div>
      <div className="mt-3 text-[10px] font-mono font-bold tracking-[0.18em] uppercase" style={{ color: "var(--fg)" }}>
        {label}
      </div>
      {detail && (
        <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>
          {detail}
        </p>
      )}
    </div>
  );
}

export function PillarCard({ pillar }: { pillar: ServicePillar }) {
  return (
    <Link
      href={pillar.href}
      className="group block h-full"
      aria-label={pillar.name}
    >
      <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <span className="apple-eyebrow-accent">{pillar.name}</span>
          <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "var(--flag)" }} />
        </div>
        <p className="text-sm font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
          {pillar.short}
        </p>
        <ul className="mt-4 space-y-1.5 flex-1">
          {pillar.services.slice(0, 5).map((s) => (
            <li key={s.label} className="flex items-start gap-2 text-xs" style={{ color: "var(--gravel)" }}>
              <span className="mt-[5px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
              {s.label}
            </li>
          ))}
        </ul>
        {pillar.pricing && (
          <div className="mt-4 pt-3 font-mono text-[10px] font-bold tracking-[0.12em] uppercase" style={{ borderTop: "1px solid var(--rule)", color: "var(--flag)" }}>
            {pillar.pricing}
          </div>
        )}
      </div>
    </Link>
  );
}

export function PcServiceCard({ service }: { service: PcService }) {
  return (
    <Link href={service.href} className="group block h-full" aria-label={service.name}>
      <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
        <span className="apple-eyebrow-accent">{service.name}</span>
        <p className="text-sm leading-relaxed mt-3 flex-1" style={{ color: "var(--gravel)" }}>
          {service.blurb}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {service.audience.slice(0, 4).map((a) => (
            <span key={a} className="apple-tag">{a}</span>
          ))}
        </div>
        <span className="mt-5 font-mono text-[10px] font-bold tracking-[0.14em] uppercase inline-flex items-center gap-1.5" style={{ color: "var(--flag)" }}>
          {service.cta}
          <FiArrowUpRight className="text-xs" />
        </span>
      </div>
    </Link>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="group block h-full" aria-label={study.title}>
      <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center justify-between gap-3">
          <span className="apple-tag">{study.category}</span>
          <span className="text-[9px] font-mono font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--gravel)" }}>
            {study.kind}
          </span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
          {study.title}
        </h3>
        <p className="text-xs leading-relaxed mt-2 flex-1" style={{ color: "var(--gravel)" }}>
          {study.summary}
        </p>
        <span className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] uppercase inline-flex items-center gap-1.5" style={{ color: "var(--flag)" }}>
          Read case study
          <FiArrowUpRight className="text-xs" />
        </span>
      </div>
    </Link>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="group block h-full" aria-label={guide.title}>
      <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center gap-2">
          <span className="apple-tag">{guide.cluster}</span>
          <span className="text-[9px] font-mono tracking-[0.1em] uppercase" style={{ color: "var(--gravel)" }}>
            {guide.readingTime}
          </span>
        </div>
        <h3 className="text-base font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
          {guide.title}
        </h3>
        <p className="text-xs leading-relaxed mt-2 flex-1" style={{ color: "var(--gravel)" }}>
          {guide.description}
        </p>
        <span className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] uppercase inline-flex items-center gap-1.5" style={{ color: "var(--flag)" }}>
          Read guide
          <FiArrowUpRight className="text-xs" />
        </span>
      </div>
    </Link>
  );
}