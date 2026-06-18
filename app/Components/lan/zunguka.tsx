"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import lan1 from "./images/lan1.jpg";
import lan2 from "./images/lan2.jpg";
import lan3 from "./images/lan3.jpg";
import lan4 from "./images/lan4.jpg";
import lan5 from "./images/lan5.jpg";
import lan6 from "./images/lanv1.jpg";
import lan7 from "./images/lanv2.jpg";
import lan8 from "./images/lan8.jpg";

const photos = [
  { id: 1, src: lan1, alt: "LAN Event 1" },
  { id: 2, src: lan2, alt: "LAN Event 2" },
  { id: 3, src: lan3, alt: "LAN Event 3" },
  { id: 4, src: lan4, alt: "LAN Event 4" },
  { id: 5, src: lan5, alt: "LAN Event 5" },
  { id: 6, src: lan6, alt: "LAN Event 6" },
  { id: 7, src: lan7, alt: "LAN Event 7" },
  { id: 8, src: lan8, alt: "LAN Event 8" },
];

export default function PhotoGrid() {
  const [selected, setSelected] = useState<typeof photos[0] | null>(null);

  const handleNext = () => {
    if (!selected) return;
    const curr = photos.findIndex((img) => img.id === selected.id);
    setSelected(photos[(curr + 1) % photos.length]);
  };

  const handlePrev = () => {
    if (!selected) return;
    const curr = photos.findIndex((img) => img.id === selected.id);
    setSelected(photos[(curr - 1 + photos.length) % photos.length]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
        {photos.map((img, index) => (
          <motion.div key={img.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.05 * index }}
            className="relative w-full h-56 overflow-hidden group cursor-pointer bg-[#050505]"
            onClick={() => setSelected(img)}>
            <Image src={img.src} alt={img.alt} fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw" />
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500/0 group-hover:border-red-500/50 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500/0 group-hover:border-red-500/50 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500/0 group-hover:border-red-500/50 transition-all duration-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-500/0 group-hover:border-red-500/50 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl mx-4 h-[80vh] flex items-center justify-center">
              <Image src={selected.src} alt={selected.alt} fill className="object-contain" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white text-3xl p-2 hover:text-red-400 transition-colors"><FaTimes /></button>
              <button onClick={handlePrev} className="absolute left-4 text-white text-3xl p-2 hover:text-red-400 transition-colors"><FaChevronLeft /></button>
              <button onClick={handleNext} className="absolute right-4 text-white text-3xl p-2 hover:text-red-400 transition-colors"><FaChevronRight /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
