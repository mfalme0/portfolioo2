'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
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

/* ═══ MONITOR FEATURES ═══ */
function MonitorFeatures({ item }: { item: GearItem }) {
  const panel = findSpec(item, ['PANEL']);
  const refresh = findSpec(item, ['REFRESH']);
  const response = findSpec(item, ['RESPONSE']);
  const color = findSpec(item, ['COLOR', 'BRIGHTNESS']);
  const adaptive = findSpec(item, ['ADAPTIVE', 'FEATURES']);
  const resolution = findSpec(item, ['RESOLUTION']);
  const hz = parseNum(refresh?.value);
  const barCount = Math.max(4, Math.min(12, Math.round(hz / 20) || 6));

  return (
    <>
      {/* Panel Technology */}
      <SectionShell
        eyebrow="Panel Technology"
        title="Engineered for Visual Fidelity"
        desc={`Display technology powering the ${item.name}.`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">Display Matrix</span>
              </div>
              <div className="space-y-4">
                {panel && (
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                    <span className="text-[10px] font-mono text-zinc-500">PANEL TYPE</span>
                    <span className="text-xs font-semibold text-white">{panel.value}</span>
                  </div>
                )}
                {resolution && (
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                    <span className="text-[10px] font-mono text-zinc-500">RESOLUTION</span>
                    <span className="text-xs font-semibold text-white">{resolution.value}</span>
                  </div>
                )}
                {refresh && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">REFRESH RATE</span>
                    <span className="text-sm font-black text-[#FF003C]">{refresh.value}</span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="space-y-3">
              <p className="text-sm text-zinc-400 font-mono leading-relaxed">{item.description}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">{response?.label || 'RESPONSE'}</div>
                  <div className="text-xs font-semibold text-white/85 mt-1">{response?.value || '—'}</div>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">{color?.label || 'COLOR'}</div>
                  <div className="text-xs font-semibold text-white/85 mt-1">{color?.value || '—'}</div>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">{adaptive?.label || 'ADAPTIVE'}</div>
                  <div className="text-xs font-semibold text-white/85 mt-1">{adaptive?.value || '—'}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* Motion Clarity */}
      <section className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rog-strix-eyebrow mb-4">Motion Clarity</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
              Built for Speed
            </h2>
            <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
              How the {item.name} handles fast-moving frames with precision.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
                <div className="flex items-end justify-between mb-4">
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
                  {resolution ? `${resolution.value} · ` : ''}{barCount} sample frames — higher refresh reduces motion blur between transitions.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="space-y-4">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-4 h-4 text-[#FF003C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40">Response Time</span>
                  </div>
                  <span className="text-lg font-black text-white">{response?.value || '—'}</span>
                  <span className="text-[10px] font-mono text-zinc-600 ml-2">GtG</span>
                </div>
                <p className="text-sm text-zinc-400 font-mono leading-relaxed">
                  With {response?.value || 'fast'} response time and {refresh?.value || 'high'} refresh rate, motion blur is minimized for competitive gaming.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══ KEYBOARD FEATURES ═══ */
function KeyboardFeatures({ item }: { item: GearItem }) {
  const layout = findSpec(item, ['LAYOUT']);
  const switches = findSpec(item, ['SWITCHES', 'BUILD']);
  const polling = findSpec(item, ['POLLING']);
  const keycaps = findSpec(item, ['KEYCAPS']);
  const mount = findSpec(item, ['MOUNT']);
  const battery = findSpec(item, ['BATTERY']);
  const isGasket = item.tags?.some((t) => /GASKET/i.test(t));
  const isHotswap = item.tags?.some((t) => /HOT-SWAP/i.test(t));

  return (
    <>
      {/* Switch & Feel */}
      <SectionShell
        eyebrow="Switch & Feel"
        title="Typing Mechanism"
        desc={`What's underneath every keypress on the ${item.name}.`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 flex flex-col items-center">
              <div className="relative w-32 h-40">
                <svg width="128" height="160" viewBox="0 0 128 160" fill="none" className="w-full h-full">
                  <rect x="14" y="100" width="100" height="18" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                  <motion.rect
                    x="34" y="0" width="60" height="16" rx="3"
                    fill="rgba(255,255,255,0.12)" stroke="rgba(255,60,60,0.6)" strokeWidth="1.5"
                    initial={{ y: 10 }}
                    whileInView={{ y: [10, 86, 10] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, times: [0, 0.5, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
                  />
                  <line x1="64" y1="26" x2="64" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <motion.circle
                    cx="64" cy="26" r="3" fill="#FF003C"
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: [0.3, 1, 0.3] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, times: [0, 0.5, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
                  />
                </svg>
              </div>
              <div className="flex gap-3 mt-4">
                {isGasket && <span className="text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded border border-white/10 text-white/50">GASKET MOUNT</span>}
                {isHotswap && <span className="text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded border border-white/10 text-white/50">HOT-SWAP</span>}
                <span className="text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded border border-white/10 text-white/50">{polling?.value || '1000Hz'}</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {layout && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">LAYOUT</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{layout.value}</div>
                    {layout.tag && <div className="text-[7px] font-mono text-zinc-600 uppercase tracking-wider">{layout.tag}</div>}
                  </div>
                )}
                {switches && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">SWITCHES</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{switches.value}</div>
                    {switches.tag && <div className="text-[7px] font-mono text-zinc-600 uppercase tracking-wider">{switches.tag}</div>}
                  </div>
                )}
                {keycaps && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">KEYCAPS</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{keycaps.value}</div>
                  </div>
                )}
                {battery && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">BATTERY</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{battery.value}</div>
                  </div>
                )}
              </div>
              <p className="text-sm text-zinc-400 font-mono leading-relaxed">{item.description}</p>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* Acoustics & Build */}
      <section className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rog-strix-eyebrow mb-4">Acoustics & Build</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
              Sound & Structure
            </h2>
            <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
              How the {item.name} sounds and feels during use.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { label: 'Mount Type', value: mount?.value || (isGasket ? 'Silicone Gasket' : 'Tray Mount'), desc: isGasket ? 'Gasket mounting provides a bouncy, responsive typing feel with improved acoustics.' : 'Traditional tray mount for reliable, consistent key feel.' },
              { label: 'Sound Dampening', value: isGasket ? 'Integrated Foam' : 'Standard', desc: isGasket ? 'Built-in sound-dampening foam absorbs pinging noises and echoes.' : 'Standard construction with minimal dampening.' },
              { label: 'Connectivity', value: item.connectivity?.map(c => c.value).join(' / ') || 'Wired', desc: 'Multiple connection options for versatile setup compatibility.' },
            ].map((feature, i) => (
              <Reveal key={feature.label}>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-6 h-full">
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40 mb-2">{feature.label}</div>
                  <div className="text-sm font-semibold text-white mb-3">{feature.value}</div>
                  <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══ MOUSE FEATURES ═══ */
function MouseFeatures({ item }: { item: GearItem }) {
  const sensor = findSpec(item, ['SENSOR', 'DPI']);
  const weight = findSpec(item, ['WEIGHT']);
  const wireless = findSpec(item, ['WIRELESS', 'BATTERY']);
  const switches = findSpec(item, ['SWITCHES']);
  const polling = findSpec(item, ['POLLING']);
  const g = parseNum(weight?.value);
  const pct = g > 0 ? Math.min(100, Math.max(4, ((g - 40) / (130 - 40)) * 100)) : 0;

  return (
    <>
      {/* Sensor Technology */}
      <SectionShell
        eyebrow="Sensor Technology"
        title="Precision Tracking"
        desc={`The optical sensor and tracking capabilities of the ${item.name}.`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF003C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l6-6m0 0l6-6m-6 6l-6-6m6 6l6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">OPTICAL SENSOR</div>
                  {sensor && <div className="text-sm font-semibold text-white mt-0.5">{sensor.value}</div>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {sensor && sensor.tag && (
                  <div className="border border-white/[0.06] rounded-lg p-3 text-center">
                    <div className="text-[9px] font-mono text-zinc-500">{sensor.tag}</div>
                  </div>
                )}
                {polling && (
                  <div className="border border-white/[0.06] rounded-lg p-3 text-center">
                    <div className="text-[7px] font-bold tracking-[0.2em] uppercase text-white/40">POLLING</div>
                    <div className="text-xs font-semibold text-white mt-1">{polling.value}</div>
                  </div>
                )}
                {wireless && (
                  <div className="border border-white/[0.06] rounded-lg p-3 text-center">
                    <div className="text-[7px] font-bold tracking-[0.2em] uppercase text-white/40">WIRELESS</div>
                    <div className="text-xs font-semibold text-white mt-1">{wireless.value}</div>
                  </div>
                )}
                {switches && (
                  <div className="border border-white/[0.06] rounded-lg p-3 text-center">
                    <div className="text-[7px] font-bold tracking-[0.2em] uppercase text-white/40">SWITCHES</div>
                    <div className="text-xs font-semibold text-white mt-1">{switches.value}</div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="space-y-4">
              <p className="text-sm text-zinc-400 font-mono leading-relaxed">{item.description}</p>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex items-end justify-between mb-4">
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">Weight</span>
                  {weight && <span className="text-xl font-black text-white tabular-nums">{weight.value}</span>}
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
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
}

/* ═══ AUDIO FEATURES ═══ */
function AudioFeatures({ item }: { item: GearItem }) {
  const driver = findSpec(item, ['DRIVER']);
  const freq = findSpec(item, ['FREQ', 'SURROUND']);
  const impedance = findSpec(item, ['IMPEDANCE', 'OUTPUT']);
  const mic = findSpec(item, ['MIC']);
  const isIEM = item.slug.startsWith('kz');
  const isHeadset = item.slug.startsWith('logitech');

  return (
    <>
      {/* Driver Technology */}
      <SectionShell
        eyebrow="Driver Technology"
        title="Sound Engineering"
        desc={`The acoustic architecture of the ${item.name}.`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF003C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">{isIEM ? 'DRIVER CONFIG' : isHeadset ? 'DRIVER TYPE' : 'AUDIO SYSTEM'}</div>
                  {driver && <div className="text-sm font-semibold text-white mt-0.5">{driver.value}</div>}
                </div>
              </div>
              <div className="flex items-center gap-1 h-20 mb-4">
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
                <p className="text-[10px] font-mono text-zinc-600 text-center">{freq.value}</p>
              )}
            </div>
          </Reveal>
          <Reveal>
            <div className="space-y-3">
              <p className="text-sm text-zinc-400 font-mono leading-relaxed">{item.description}</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {driver && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">DRIVER</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{driver.value}</div>
                  </div>
                )}
                {freq && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">FREQUENCY</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{freq.value}</div>
                  </div>
                )}
                {impedance && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">IMPEDANCE</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{impedance.value}</div>
                  </div>
                )}
                {mic && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">MICROPHONE</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{mic.value}</div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* Connectivity */}
      {item.connectivity && item.connectivity.length > 0 && (
        <section className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="rog-strix-eyebrow mb-4">Connectivity</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                I/O & Compatibility
              </h2>
              <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                Connection options available on the {item.name}.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {item.connectivity.map((conn, i) => (
                <Reveal key={i}>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-3">
                    {conn.icon && <span className="text-lg text-white/50">{conn.icon}</span>}
                    <div className="min-w-0 flex-1">
                      <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">{conn.label}</div>
                      <div className="text-[10px] font-semibold text-white/80 truncate">{conn.value}</div>
                    </div>
                    {conn.tag && <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-wider shrink-0">{conn.tag}</span>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ═══ CONTROLLER FEATURES ═══ */
function ControllerFeatures({ item }: { item: GearItem }) {
  const battery = findSpec(item, ['BATTERY']);
  const triggers = findSpec(item, ['TRIGGERS', 'SENSORS']);
  const dpad = findSpec(item, ['D-PAD', 'TOUCHPAD']);
  const connectivity = findSpec(item, ['CONNECTIVITY']);
  const audio = findSpec(item, ['AUDIO']);

  const points = [
    { label: 'Triggers', spec: triggers, x: 22, y: 18 },
    { label: 'D-Pad', spec: dpad, x: 78, y: 45 },
    { label: 'Battery', spec: battery, x: 22, y: 72 },
    { label: 'Connectivity', spec: connectivity, x: 78, y: 78 },
  ].filter((p) => p.spec);

  return (
    <>
      {/* Input Layout */}
      <SectionShell
        eyebrow="Input Layout"
        title="Ergonomics & Control"
        desc={`How the ${item.name} fits in your hands.`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 h-72">
              <svg width="100%" height="100%" viewBox="0 0 160 100" fill="none" className="opacity-30">
                <rect x="10" y="30" width="140" height="50" rx="25" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                <circle cx="45" cy="55" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <circle cx="115" cy="55" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
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
                  <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,0,60,0.4)]" style={{ background: '#FF003C' }} />
                  <span className="text-[7px] font-mono uppercase tracking-wider text-white/50">{p.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {triggers && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">TRIGGERS</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{triggers.value}</div>
                  </div>
                )}
                {dpad && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">D-PAD</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{dpad.value}</div>
                  </div>
                )}
                {battery && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">BATTERY</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{battery.value}</div>
                  </div>
                )}
                {connectivity && (
                  <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                    <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">CONNECT</div>
                    <div className="text-xs font-semibold text-white/85 mt-1">{connectivity.value}</div>
                  </div>
                )}
              </div>
              {audio && (
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#FF003C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                  <div>
                    <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">AUDIO</div>
                    <div className="text-xs text-white/80">{audio.value}</div>
                  </div>
                </div>
              )}
              <p className="text-sm text-zinc-400 font-mono leading-relaxed pt-2">{item.description}</p>
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
}

/* ═══ POWER FEATURES ═══ */
function PowerFeatures({ item }: { item: GearItem }) {
  const capacity = findSpec(item, ['CAPACITY']);
  const output = findSpec(item, ['OUTPUT']);
  const outlets = findSpec(item, ['OUTLETS']);
  const protection = findSpec(item, ['PROTECTION']);
  const runtime = findSpec(item, ['RUNTIME']);
  const battery = findSpec(item, ['BATTERY']);

  return (
    <SectionShell
      eyebrow="Power Protection"
      title="Reliable Power Delivery"
      desc={`Power capacity and protection features of the ${item.name}.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-[#FF003C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">Power Rating</span>
            </div>
            <div className="space-y-4">
              {capacity && (
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] font-mono text-zinc-500">CAPACITY</span>
                  <span className="text-lg font-black text-white">{capacity.value}</span>
                </div>
              )}
              {output && (
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] font-mono text-zinc-500">MAX OUTPUT</span>
                  <span className="text-sm font-semibold text-white">{output.value}</span>
                </div>
              )}
              {runtime && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">RUNTIME</span>
                  <span className="text-sm font-semibold text-white">{runtime.value}</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-3">
            <p className="text-sm text-zinc-400 font-mono leading-relaxed">{item.description}</p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {outlets && (
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">OUTLETS</div>
                  <div className="text-xs font-semibold text-white/85 mt-1">{outlets.value}</div>
                </div>
              )}
              {protection && (
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">PROTECTION</div>
                  <div className="text-xs font-semibold text-white/85 mt-1">{protection.value}</div>
                </div>
              )}
              {battery && (
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <div className="text-[8px] font-bold tracking-[0.25em] uppercase text-white/40">BATTERY TYPE</div>
                  <div className="text-xs font-semibold text-white/85 mt-1">{battery.value}</div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ═══ SYSTEM FEATURES ═══ */
function SystemFeatures({ item }: { item: GearItem }) {
  const cooling = findSpec(item, ['COOLING']);
  const display = findSpec(item, ['DISPLAY']);
  const audio = findSpec(item, ['AUDIO']);
  const network = findSpec(item, ['NETWORK']);
  const battery = findSpec(item, ['BATTERY']);
  const weight = findSpec(item, ['WEIGHT']);

  return (
    <SectionShell
      eyebrow="System Architecture"
      title="Built for Performance"
      desc={`Design and engineering of the ${item.name}.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-[#FF003C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/40">Chassis Design</span>
            </div>
            <div className="space-y-4">
              {cooling && (
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] font-mono text-zinc-500">COOLING</span>
                  <span className="text-xs font-semibold text-white">{cooling.value}</span>
                </div>
              )}
              {display && (
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] font-mono text-zinc-500">DISPLAY</span>
                  <span className="text-xs font-semibold text-white">{display.value}</span>
                </div>
              )}
              {network && (
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] font-mono text-zinc-500">NETWORKING</span>
                  <span className="text-xs font-semibold text-white">{network.value}</span>
                </div>
              )}
              {battery && (
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-[10px] font-mono text-zinc-500">BATTERY</span>
                  <span className="text-xs font-semibold text-white">{battery.value}</span>
                </div>
              )}
              {weight && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">WEIGHT</span>
                  <span className="text-xs font-semibold text-white">{weight.value}</span>
                </div>
              )}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="space-y-4">
            <p className="text-sm text-zinc-400 font-mono leading-relaxed">{item.description}</p>
            {audio && (
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 flex items-center gap-3">
                <svg className="w-4 h-4 text-[#FF003C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                <div>
                  <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">AUDIO</div>
                  <div className="text-xs text-white/80">{audio.value}</div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

export default function CategoryFeatures({ item }: { item: GearItem }) {
  switch (item.category) {
    case 'display':
      return <MonitorFeatures item={item} />;
    case 'keyboard':
      return <KeyboardFeatures item={item} />;
    case 'mouse':
      return <MouseFeatures item={item} />;
    case 'audio':
      return <AudioFeatures item={item} />;
    case 'controller':
      return <ControllerFeatures item={item} />;
    case 'power':
      return <PowerFeatures item={item} />;
    case 'system':
      return <SystemFeatures item={item} />;
    default:
      return null;
  }
}
