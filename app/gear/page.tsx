'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// --- Imports ---
import Header from "../Components/header";
import Footer from "../Components/footer";
import GearLoader from "../Components/game/loader";

// Rigs
import PerformanceSpecs from "../Components/game/hero";
import SecondaryRigSpecs from "../Components/game/rig2";

// Keyboards
import AulaF75Showcase from '../Components/game/aulaf75';
import AulaS2022Showcase from '../Components/game/s2022';

// Mice
import GProWireless from '../Components/game/gpro';
import AulaSC660Showcase from '../Components/game/sc660';
import GloriousModelOShowcase from '../Components/game/glorious';

// Audio
import KZEDXUltraShowcase from '../Components/game/kzedx';
import G935Headset from '../Components/game/g935';

// Display
import TARGMonitor from '../Components/game/targ';

// Power
import APCBackUPS from '../Components/game/ups';

function SectionBlock({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-28">
      {/* Optional tiny category label (keeps your vibe consistent) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        <div className="flex items-end justify-between border-b border-white/5 pb-4 mb-6">
          <div className="text-[11px] font-mono tracking-[0.35em] uppercase text-zinc-500">
            {label}
          </div>
          {hint ? (
            <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-700">
              {hint}
            </div>
          ) : null}
        </div>
      </div>

      {children}
    </section>
  );
}

export default function GearPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-green-500 selection:text-black">
      <AnimatePresence mode="wait">
        {loading && <GearLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div
        className={`transition-opacity duration-700 ${
          loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        <Header />

        <main className="flex flex-col">
          {/* RIGS */}
          <SectionBlock id="rigs" label="SYSTEMS" hint="PRIMARY + SECONDARY">
            <PerformanceSpecs />
            <SecondaryRigSpecs />
          </SectionBlock>

          {/* KEYBOARDS */}
          <SectionBlock id="keyboards" label="KEYBOARDS" hint="ACTIVE + RETIRED">
            <AulaF75Showcase />
            <AulaS2022Showcase />
          </SectionBlock>

          {/* MICE */}
          <SectionBlock id="mice" label="MICE" hint="COMPETITIVE + DAILY + LEGACY">
            <GProWireless />
            <AulaSC660Showcase />
            <GloriousModelOShowcase />
          </SectionBlock>

          {/* AUDIO */}
          <SectionBlock id="audio" label="AUDIO" hint="IEMS + HEADSET">
            <KZEDXUltraShowcase />
            <G935Headset />
          </SectionBlock>

          {/* DISPLAY */}
          <SectionBlock id="display" label="DISPLAY" hint="MAIN MONITOR">
            <TARGMonitor />
          </SectionBlock>

          {/* POWER */}
          <SectionBlock id="power" label="POWER" hint="UPS + PROTECTION">
            <APCBackUPS />
          </SectionBlock>
        </main>

        <Footer />
      </div>
    </div>
  );
}