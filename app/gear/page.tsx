'use client'

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// --- Imports ---
import Header from "../Components/header";
import PerformanceSpecs from "../Components/game/hero";       // Main Rig
import SecondaryRigSpecs from "../Components/game/rig2";      // Secondary Rig     
import Footer from "../Components/footer";                    // Game Over Footer
import GearLoader from "../Components/game/loader";       // System Boot Loader

export default function GearPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-green-500 selection:text-black">
      

      <AnimatePresence mode="wait">
        {loading && <GearLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>


      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        
        <Header />

        <main className="flex flex-col"> 

          <PerformanceSpecs />

          <SecondaryRigSpecs />

    

        </main>

        <Footer />
      </div>
    </div>
  );
}