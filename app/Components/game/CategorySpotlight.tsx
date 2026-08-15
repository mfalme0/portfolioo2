'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { GearItem, GearSpec } from '@/lib/gear-data';

function findSpec(item: GearItem, labels: string[]): GearSpec | undefined {
  const wanted = labels.map((l) => l.toUpperCase());
  return item.specs.find((s) => wanted.some((w) => s.label.toUpperCase().includes(w)));
}

function parseNum(value?: string): number {
  if (!value) return 0;
  const m = value.replace(/,/g, '').match(/(\d+(\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatChip({ spec }: { spec?: GearSpec }) {
  if (!spec) return null;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
      {spec.icon && <span className="text-base text-white/50">{spec.icon}</span>}
      <div className="min-w-0">
        <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">{spec.label}</div>
        <div className="text-xs font-semibold text-white/85 truncate">{spec.value}</div>
      </div>
    </div>
  );
}

function SectionShell({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rog-strix-eyebrow mb-4">{eyebrow}</div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
            {title}
          </h2>
          <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">{desc}</p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ═══ MONITOR — panel / motion deep-dive ═══ */
function MonitorSpotlight({ item }: { item: GearItem }) {
  const panel = findSpec(item, ['PANEL']);
  const refresh = findSpec(item, ['REFRESH']);
  const response = findSpec(item, ['RESPONSE']);
  const color = findSpec(item, ['COLOR', 'BRIGHTNESS']);
  const adaptive = findSpec(item, ['ADAPTIVE', 'FEATURES']);
  const resolution = findSpec(item, ['RESOLUTION']);
  const hz = parseNum(refresh?.value);
  const barCount = Math.max(4, Math.min(12, Math.round(hz / 20) || 6));

  return (
    <SectionShell
      eyebrow="Panel Performance"
      title="Built for Motion Clarity"
      desc={`How the ${item.name} panel handles fast-moving frames.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="flex items-end justify-between mb-2">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">Frame Cadence</span>
              {refresh && <span className="text-2xl font-black text-white tabular-nums">{refresh.value}</span>}
            </div>
            <div className="flex items-end gap-1.5 h-24 mt-6">
              {Array.from({ length: barCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${30 + ((i * 37) % 70)}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 rounded-t"
                  style={{ background: i % 2 === 0 ? '#FF003C' : 'rgba(255,255,255,0.15)' }}
                />
              ))}
            </div>
            <p className="text-[10px] font-mono text-zinc-600 mt-4">
              {resolution ? `${resolution.value} · ` : ''}{barCount} sample frames per visualized window — higher refresh means less motion blur between them.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatChip spec={panel} />
              <StatChip spec={response} />
              <StatChip spec={color} />
              <StatChip spec={adaptive} />
            </div>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed pt-2">{item.description}</p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ═══ KEYBOARD — switch / feel deep-dive ═══ */
function KeyboardSpotlight({ item }: { item: GearItem }) {
  const layout = findSpec(item, ['LAYOUT']);
  const switches = findSpec(item, ['SWITCHES', 'BUILD']);
  const polling = findSpec(item, ['POLLING']);
  const rgb = findSpec(item, ['RGB']);
  const isGasket = item.tags?.some((t) => /GASKET/i.test(t));
  const isHotswap = item.tags?.some((t) => /HOT-SWAP/i.test(t));

  return (
    <SectionShell
      eyebrow="Switch & Feel"
      title="Typing Mechanism"
      desc={`What's underneath every keypress on the ${item.name}.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 flex flex-col items-center">
            <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
              <rect x="10" y="90" width="100" height="16" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <motion.rect
                x="30" width="60" height="14" rx="3"
                fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                initial={{ y: 10 }}
                whileInView={{ y: [10, 78, 10] }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, times: [0, 0.5, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
              />
              <line x1="60" y1="24" x2="60" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
            <div className="flex gap-4 mt-4">
              {isGasket && <span className="rog-tag text-[8px]">GASKET MOUNT</span>}
              {isHotswap && <span className="rog-tag text-[8px]">HOT-SWAP</span>}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatChip spec={layout} />
              <StatChip spec={switches} />
              <StatChip spec={polling} />
              <StatChip spec={rgb} />
            </div>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed pt-2">{item.description}</p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ═══ MOUSE — sensor / weight deep-dive ═══ */
function MouseSpotlight({ item }: { item: GearItem }) {
  const sensor = findSpec(item, ['SENSOR', 'DPI']);
  const weight = findSpec(item, ['WEIGHT']);
  const wireless = findSpec(item, ['WIRELESS', 'BATTERY']);
  const switches = findSpec(item, ['SWITCHES', 'RGB']);
  const g = parseNum(weight?.value);
  const pct = g > 0 ? Math.min(100, Math.max(4, ((g - 40) / (130 - 40)) * 100)) : 0;

  return (
    <SectionShell
      eyebrow="Sensor & Grip"
      title="Precision by the Gram"
      desc={`Weight and tracking characteristics of the ${item.name}.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="flex items-end justify-between mb-4">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">Weight</span>
              {weight && <span className="text-2xl font-black text-white tabular-nums">{weight.value}</span>}
            </div>
            <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, #FF003C, rgba(255,0,60,0.4))' }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-zinc-600 mt-2">
              <span>40g ULTRALIGHT</span>
              <span>130g STANDARD</span>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatChip spec={sensor} />
              <StatChip spec={weight} />
              <StatChip spec={wireless} />
              <StatChip spec={switches} />
            </div>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed pt-2">{item.description}</p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ═══ AUDIO — driver / soundstage deep-dive ═══ */
function AudioSpotlight({ item }: { item: GearItem }) {
  const driver = findSpec(item, ['DRIVER']);
  const freq = findSpec(item, ['FREQ', 'SURROUND']);
  const impedance = findSpec(item, ['IMPEDANCE', 'OUTPUT']);
  const mic = findSpec(item, ['MIC']);

  return (
    <SectionShell
      eyebrow="Sound Signature"
      title="Driver & Soundstage"
      desc={`Acoustic profile of the ${item.name}.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="flex items-center gap-1 h-20">
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 20 + Math.abs(Math.sin(i * 0.6)) * 70;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, duration: 0.4 }}
                    className="flex-1 rounded-full"
                    style={{ background: i % 3 === 0 ? '#FF003C' : 'rgba(255,255,255,0.15)' }}
                  />
                );
              })}
            </div>
            {freq && (
              <p className="text-[10px] font-mono text-zinc-600 mt-4 text-center">{freq.value}</p>
            )}
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatChip spec={driver} />
              <StatChip spec={freq} />
              <StatChip spec={impedance} />
              <StatChip spec={mic} />
            </div>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed pt-2">{item.description}</p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ═══ CONTROLLER — input layout deep-dive ═══ */
function ControllerSpotlight({ item }: { item: GearItem }) {
  const battery = findSpec(item, ['BATTERY']);
  const triggers = findSpec(item, ['TRIGGERS', 'SENSORS']);
  const dpad = findSpec(item, ['D-PAD', 'TOUCHPAD']);
  const connectivity = findSpec(item, ['CONNECTIVITY']);

  const points = [
    { label: 'Triggers', spec: triggers, x: 22, y: 20 },
    { label: 'D-Pad / Touch', spec: dpad, x: 78, y: 45 },
    { label: 'Battery', spec: battery, x: 22, y: 75 },
    { label: 'Link', spec: connectivity, x: 78, y: 80 },
  ].filter((p) => p.spec);

  return (
    <SectionShell
      eyebrow="Input Layout"
      title="Built for the Grip"
      desc={`Key input points on the ${item.name}.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 h-64">
            <svg width="100%" height="100%" viewBox="0 0 160 100" fill="none" className="opacity-40">
              <rect x="10" y="30" width="140" height="50" rx="25" stroke="rgba(255,0,60,0.3)" strokeWidth="2" />
              <circle cx="45" cy="55" r="10" stroke="rgba(255,0,60,0.3)" strokeWidth="1.5" />
              <circle cx="115" cy="55" r="10" stroke="rgba(255,0,60,0.3)" strokeWidth="1.5" />
            </svg>
            {points.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="absolute flex flex-col items-center gap-1"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,0,60,0.4)]" style={{ background: '#FF003C' }} />
                <span className="text-[7px] font-mono uppercase tracking-wider text-white/50 whitespace-nowrap">{p.label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatChip spec={triggers} />
              <StatChip spec={dpad} />
              <StatChip spec={battery} />
              <StatChip spec={connectivity} />
            </div>
            <p className="text-sm text-zinc-400 font-mono leading-relaxed pt-2">{item.description}</p>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

export default function CategorySpotlight({ item }: { item: GearItem }) {
  switch (item.category) {
    case 'display':
      return <MonitorSpotlight item={item} />;
    case 'keyboard':
      return <KeyboardSpotlight item={item} />;
    case 'mouse':
      return <MouseSpotlight item={item} />;
    case 'audio':
      return <AudioSpotlight item={item} />;
    case 'controller':
      return <ControllerSpotlight item={item} />;
    default:
      return null;
  }
}
