import Image from "next/image";
import Link from "next/link";
import { PageHero } from "./page-hero";
import {
  getSetupDevices,
  setupCategories,
  type SetupCategory,
  type SetupDevice,
} from "@/lib/setup-data";
import { ImageCredit, TrademarkNotice } from "./trademark-notice";

function SetupCard({
  category,
  index,
}: {
  category: SetupCategory;
  index: number;
}) {
  const count = getSetupDevices(category.slug).length;

  return (
    <Link
      href={`/setup/${category.slug}`}
      className="group apple-card-flat flex min-h-56 flex-col justify-between p-6 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] font-bold tracking-[0.18em]" style={{ color: "var(--flag)" }}>
          0{index + 1}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: "var(--gravel)" }}>
          {count} {count === 1 ? "device" : "devices"}
        </span>
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          {category.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
          {category.description}
        </p>
        <span className="mt-5 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-transform group-hover:translate-x-1" style={{ color: "var(--flag)" }}>
          Explore {category.shortName} →
        </span>
      </div>
    </Link>
  );
}

export function SetupIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="The setup"
        title={<>The gear I use, <span style={{ color: "var(--flag)" }}>and why.</span></>}
        lead="A practical field guide to the peripherals on my desk: what each device does, why I chose it and how it fits into the way I work and play."
        crumbs={[{ name: "Home", path: "/" }, { name: "Setup" }]}
        cta={{ label: "Browse the setup", href: "#setup-categories" }}
        meta={["7 categories", "Personal gear notes"]}
      />
      <section id="setup-categories" className="w-full py-14 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="apple-eyebrow-accent">Browse by category</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                What’s on the desk.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
              Each category has its own page, with individual device notes as they’re added.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {setupCategories.map((category, index) => (
              <SetupCard key={category.slug} category={category} index={index} />
            ))}
          </div>
          <div className="mt-12 border-t pt-6" style={{ borderColor: "var(--rule)" }}>
            <TrademarkNotice />
          </div>
        </div>
      </section>
    </>
  );
}

export function SetupCategoryPage({ category }: { category: SetupCategory }) {
  const devices = getSetupDevices(category.slug);

  return (
    <>
      <PageHero
        eyebrow={`Setup / ${category.name}`}
        title={<>{category.name} <span style={{ color: "var(--flag)" }}>I use.</span></>}
        lead={category.detail}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Setup", path: "/setup" },
          { name: category.name },
        ]}
        cta={{ label: "All setup categories", href: "/setup" }}
        meta={[`${devices.length} ${devices.length === 1 ? "device" : "devices"}`, "Personal notes"]}
      />
      <section className="w-full py-14 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          {devices.length ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {devices.map((device, index) => (
                <DeviceCard key={device.slug} device={device} index={index} />
              ))}
            </div>
          ) : (
            <div className="apple-card-flat p-7 md:p-10">
              <span className="apple-eyebrow-accent">Device notes in progress</span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
                No {category.name.toLowerCase()} write-ups yet.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
                This page is ready for device-by-device notes: what I use it for, why I chose it, the details that matter and any trade-offs. Individual devices will appear here as those write-ups are added.
              </p>
              <Link href="/setup" className="mt-6 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--flag)" }}>
                ← Back to all categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/**
 * Fraction of a fault card's width given to the working side of the panel.
 * Clamped so a bad value can never collapse either half to nothing.
 */
function faultSplit(fault: SetupDevice["fault"]): number {
  return Math.min(Math.max(fault?.split ?? 0.5, 0.05), 0.95);
}

function DeviceCard({ device, index }: { device: SetupDevice; index: number }) {
  const split = faultSplit(device.fault);

  return (
    <Link
      href={`/setup/${device.category}/${device.slug}`}
      className="group apple-card-flat block overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="relative aspect-square w-full"
        style={{ backgroundColor: "var(--paper)" }}
      >
        {device.image ? (
          device.fault ? (
            /* The dead side of the panel is drawn, not described. Each half is a
               clipping window onto the *same* full-card placement of the image:
               the inner wrapper is sized to the whole card and offset so both
               halves line up, and overflow-hidden keeps only each one's slice.
               Sizing the image to the half box instead would repeat the product
               twice rather than split it. */
            <div className="absolute inset-0 flex">
              <div
                className="relative h-full overflow-hidden"
                style={{ width: `${split * 100}%` }}
              >
                <div
                  className="absolute inset-y-0 flex items-center justify-center"
                  style={{ width: `${100 / split}%`, left: 0 }}
                >
                  <Image
                    src={device.image}
                    alt={`${device.name} — working half`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-contain p-4"
                  />
                </div>
              </div>
              <div
                className="relative h-full overflow-hidden"
                style={{ width: `${(1 - split) * 100}%` }}
                aria-hidden="true"
              >
                <div
                  className="absolute inset-y-0 flex items-center justify-center"
                  style={{
                    width: `${100 / (1 - split)}%`,
                    left: `${(-100 * split) / (1 - split)}%`,
                  }}
                >
                  <Image
                    src={device.image}
                    alt=""
                    fill
                    sizes="0px"
                    className="object-contain p-4"
                    style={{ filter: "grayscale(1) brightness(0.45)" }}
                  />
                </div>
                <span
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent 3px)",
                  }}
                />
              </div>
            </div>
          ) : (
            <Image
              src={device.image}
              alt={device.name}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-contain p-4"
            />
          )
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-6 text-center">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: "var(--gravel)" }}
            >
              {device.brand}
            </span>
            <span
              className="font-display text-sm font-bold leading-snug"
              style={{ color: "var(--fg)" }}
            >
              {device.model}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] font-bold tracking-[0.18em]" style={{ color: "var(--flag)" }}>
            DEVICE_{String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.14em]"
            style={{ color: device.fault ? "var(--flag)" : device.status === "current" ? "var(--bush)" : "var(--gravel)" }}
          >
            {device.fault ? "Fault" : device.status}
          </span>
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          {device.name}
        </h2>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--gravel)" }}>
          {[device.brand, device.model].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
          {device.summary}
        </p>
        <span className="mt-5 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-transform group-hover:translate-x-1" style={{ color: "var(--flag)" }}>
          Why this device →
        </span>
      </div>
    </Link>
  );
}

export function SetupDevicePage({
  category,
  device,
}: {
  category: SetupCategory;
  device: SetupDevice;
}) {
  const sections = [
    { title: "Why I chose it", content: device.why },
    { title: "How I use it", content: device.dailyUse },
    { title: "Trade-offs", content: device.tradeoffs },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Setup / ${category.name} / ${device.status}`}
        title={<>{device.name} <span style={{ color: "var(--flag)" }}>in my setup.</span></>}
        lead={device.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Setup", path: "/setup" },
          { name: category.name, path: `/setup/${category.slug}` },
          { name: device.name },
        ]}
        cta={{ label: `More ${category.name.toLowerCase()}`, href: `/setup/${category.slug}` }}
        meta={[device.brand, device.model, device.status].filter(Boolean)}
      />
      <article className="w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-14 lg:grid-cols-12">
          {device.image && (
            <div
              className="relative aspect-[16/9] w-full overflow-hidden lg:col-span-12"
              style={{ backgroundColor: "var(--paper)" }}
            >
              <Image
                src={device.image}
                alt={device.name}
                fill
                priority
                sizes="(min-width: 1024px) 92vw, 100vw"
                className="object-contain p-4"
              />
            </div>
          )}
          <div className="space-y-4 lg:col-span-8">
            {device.fault && (
              <section
                className="apple-card-flat p-6 md:p-8"
                style={{ borderLeft: "3px solid var(--flag)" }}
              >
                <span className="apple-eyebrow-accent" style={{ color: "var(--flag)" }}>
                  Fault report
                </span>
                <h2
                  className="mt-4 font-display text-xl font-bold tracking-tight"
                  style={{ color: "var(--fg)" }}
                >
                  {device.fault.headline}
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--gravel)" }}>
                  {device.fault.detail}
                </p>
              </section>
            )}
            {sections.map((section) => (
              <section key={section.title} className="apple-card-flat p-6 md:p-8">
                <span className="apple-eyebrow-accent">{section.title}</span>
                <p className="mt-4 text-sm leading-7" style={{ color: "var(--gravel)" }}>{section.content}</p>
              </section>
            ))}
            {device.notes && (
              <section className="apple-card-flat p-6 md:p-8">
                <span className="apple-eyebrow-accent">Notes from use</span>
                <p className="mt-4 text-sm leading-7" style={{ color: "var(--gravel)" }}>{device.notes}</p>
              </section>
            )}
          </div>
          <aside className="h-fit apple-card-flat p-6 lg:col-span-4">
            <span className="apple-eyebrow-accent">At a glance</span>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>{device.role}</p>
            {device.specifications.length > 0 && (
              <dl className="mt-6 divide-y" style={{ borderColor: "var(--rule)" }}>
                {device.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 py-3" style={{ borderTop: "1px solid var(--rule)" }}>
                    <dt className="text-xs" style={{ color: "var(--gravel)" }}>{spec.label}</dt>
                    <dd className="text-right text-xs font-semibold" style={{ color: "var(--fg)" }}>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>
        </div>
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <div className="space-y-2 border-t pt-6" style={{ borderColor: "var(--rule)" }}>
            <ImageCredit category={device.category} slug={device.slug} />
            <TrademarkNotice />
          </div>
        </div>
      </article>
    </>
  );
}
