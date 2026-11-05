import Image from "next/image";
import Link from "next/link";
import { PageHero } from "./page-hero";
import { SectionHeading } from "./section-heading";
import { HomelabServiceExplorer } from "./homelab-explorer";
import { NodeSubnav } from "./homelab-subnav";
import { SpecIcon, StatusBadge } from "./homelab-ui";
import {
  HomelabCtaBand,
  HomelabSpecGrid,
  NodeCard,
} from "./homelab-pages";
import { homelabItems, type HomelabItem } from "@/lib/homelab-data";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Specs" },
  { id: "services", label: "Services" },
  { id: "story", label: "Story" },
  { id: "related", label: "Related" },
];

export function HomelabDetailPage({
  item,
  related,
}: {
  item: HomelabItem;
  related: HomelabItem[];
}) {
  const currentIndex = homelabItems.findIndex((node) => node.slug === item.slug);
  const nextNode = homelabItems[(currentIndex + 1) % homelabItems.length];
  const meta = [
    item.model,
    item.os,
    item.status,
    item.purchaseYear ? `Since ${item.purchaseYear}` : undefined,
  ].filter((value): value is string => Boolean(value));

  return (
    <>
      <PageHero
        eyebrow={`Homelab / ${item.category}`}
        title={
          <>
            {item.name}
            <span style={{ color: "var(--flag)" }}>.</span>
          </>
        }
        lead={item.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Homelab", path: "/homelab" },
          { name: item.name },
        ]}
        cta={{ label: `See ${item.services.length} services`, href: "#services" }}
        meta={meta}
      />

      <NodeSubnav items={sections} />

      <section
        id="overview"
        className="scroll-mt-36 border-b-[3px] py-12 md:py-16"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:px-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div
              className="relative aspect-[16/10] overflow-hidden border-[3px]"
              style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet)" }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain p-6 md:p-10"
              />
              <div className="absolute left-4 top-4">
                <StatusBadge status={item.status} />
              </div>
            </div>

            {item.tags && item.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Node roles">
                {item.tags.map((tag) => (
                  <li key={tag} className="apple-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div
              className="h-full border-[3px] p-6"
              style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet)" }}
            >
              <span className="apple-eyebrow-accent">At a glance</span>
              <p
                className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em]"
                style={{ color: "var(--gravel)" }}
              >
                {item.subtitle}
              </p>

              <dl className="mt-5" style={{ borderColor: "var(--ink)" }}>
                {item.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start justify-between gap-4 border-t-2 py-3 first:border-t-0"
                    style={{ borderColor: "var(--ink)" }}
                  >
                    <dt
                      className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "var(--gravel)" }}
                    >
                      <SpecIcon icon={spec.icon} />
                      {spec.label}
                    </dt>
                    <dd className="text-right">
                      <span className="block text-sm font-semibold leading-snug" style={{ color: "var(--ink)" }}>
                        {spec.value}
                      </span>
                      {spec.tag && (
                        <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: "var(--gravel)" }}>
                          {spec.tag}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {(item.purchaseYear || item.price) && (
                <div
                  className="mt-4 flex items-center justify-between gap-4 border-t-2 pt-3 font-mono text-[9px] uppercase tracking-[0.12em]"
                  style={{ borderColor: "var(--ink)", color: "var(--gravel)" }}
                >
                  {item.purchaseYear && <span>Since {item.purchaseYear}</span>}
                  {item.price && <span>{item.price}</span>}
                </div>
              )}
              {item.ups && (
                <div
                  className="mt-4 border-[3px] p-4"
                  style={{
                    borderColor: "var(--ink)",
                    backgroundColor: "var(--sheet)",
                  }}
                >
                  <span className="apple-eyebrow-accent" style={{ color: "var(--flag)" }}>
                    Power protection
                  </span>
                  <p className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.12em]" style={{ color: "var(--gravel)" }}>
                    {item.ups.summary}
                  </p>
                  <Link
                    href={item.ups.gearUrl}
                    className="mt-3 inline-block font-mono text-[9px] font-bold uppercase tracking-[0.14em] transition-transform hover:translate-x-1"
                    style={{ color: "var(--flag)" }}
                  >
                    UPS hardware in gear <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section
        id="specs"
        className="scroll-mt-36 border-b-[3px] py-14 md:py-20"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet-2)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <SectionHeading
            eyebrow="Full specifications"
            title={
              <>
                Inside{" "}
                <span style={{ color: "var(--flag)" }}>{item.name}.</span>
              </>
            }
            lead={item.specTitle.charAt(0) + item.specTitle.slice(1).toLowerCase() + " — the parts that matter for what this node does."}
          />
          <div className="mt-10">
            <HomelabSpecGrid item={item} />
          </div>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-36 border-b-[3px] py-14 md:py-20"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <SectionHeading
            eyebrow="Service inventory"
            title={
              <>
                Running on{" "}
                <span style={{ color: "var(--flag)" }}>{item.name}.</span>
              </>
            }
            lead={`${item.services.length} containers, managed through ${item.dockerWrapper} on ${item.os}.`}
          />
          <div className="mt-10">
            <HomelabServiceExplorer
              nodes={[{ slug: item.slug, name: item.name, services: item.services }]}
              showNodeFilter={false}
            />
          </div>
        </div>
      </section>

      <section
        id="story"
        className="scroll-mt-36 border-b-[3px] py-14 md:py-20"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Why it exists"
              title={
                <>
                  The{" "}
                  <span style={{ color: "var(--flag)" }}>story.</span>
                </>
              }
            />
          </div>
          <div
            className="border-l-[6px] pl-6 md:pl-8 lg:col-span-8"
            style={{ borderColor: "var(--flag)" }}
          >
            <p className="text-base leading-8 md:text-lg md:leading-9" style={{ color: "var(--gravel)" }}>
              {item.story}
            </p>
          </div>
        </div>
      </section>

      <section
        id="related"
        className="scroll-mt-36 border-b-[3px] py-14 md:py-20"
        style={{ borderColor: "var(--ink)", backgroundColor: "var(--sheet-2)" }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <SectionHeading
            eyebrow="Other nodes"
            title={
              <>
                Keep{" "}
                <span style={{ color: "var(--flag)" }}>looking.</span>
              </>
            }
          />

          {related.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
              {related.map((node) => (
                <NodeCard key={node.slug} item={node} />
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 pt-6" style={{ borderColor: "var(--ink)" }}>
            <Link
              href="/homelab"
              className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-x-1"
              style={{ color: "var(--flag)" }}
            >
              ← All nodes
            </Link>
            {nextNode && nextNode.slug !== item.slug && (
              <Link
                href={`/homelab/${nextNode.slug}`}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-transform hover:translate-x-1"
                style={{ color: "var(--flag)" }}
              >
                Next node: {nextNode.name} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <HomelabCtaBand />
    </>
  );
}
