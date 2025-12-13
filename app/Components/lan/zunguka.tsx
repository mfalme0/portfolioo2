"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// --- IMPORT YOUR PHOTOS HERE ---
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
    const currentIndex = photos.findIndex((img) => img.id === selected.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelected(photos[nextIndex]);
  };

  const handlePrev = () => {
    if (!selected) return;
    const currentIndex = photos.findIndex((img) => img.id === selected.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelected(photos[prevIndex]);
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="relative w-full h-56 rounded-lg overflow-hidden border border-green-700/50 shadow-lg group cursor-pointer"
            onClick={() => setSelected(img)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-5xl mx-4 h-[80vh] flex items-center justify-center">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain rounded-lg"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white text-3xl p-2 hover:text-green-400"
              >
                <FaTimes />
              </button>

              {/* Previous */}
              <button
                onClick={handlePrev}
                className="absolute left-4 text-white text-3xl p-2 hover:text-green-400"
              >
                <FaChevronLeft />
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="absolute right-4 text-white text-3xl p-2 hover:text-green-400"
              >
                <FaChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
