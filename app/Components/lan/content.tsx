"use client";

import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGamepad,
  FaImages,
  FaInfoCircle,
} from "react-icons/fa";
import { useTheme } from '@/app/Context/theme';
import LanGallery from './zunguka';

import lanv1 from "./images/lanv1.jpg";
import lanv2 from "./images/lanv2.jpg";

const PAST_EVENTS = [
  { id: 1, date: "December 11, 2025", location: "Kikuyu, Kenya", description: "testing the waters with a focus on tactical FPS titles, led by the **Delta Force** series", imageUrl: lanv2, games: " Delta Force" },
  { id: 2, date: "October 3, 2025", location: "Kikuyu, Kenya", description: "The inaugural event, A competitive night focused on intense tactics and team play, with the primary theme being **Counter-Strike**.", imageUrl: lanv1, games: "Counter-Strike 2, Valorant" },
];

const EventCard = ({ event, accent }: { event: { id: number; date: string; location: string; description: string; imageUrl: string | StaticImageData; games: string }; accent: string }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] overflow-hidden group transition-all duration-500 rounded-sm"
      style={{ borderColor: hover ? accent + '4d' : undefined }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className="relative overflow-hidden h-56">
        <Image src={event.imageUrl} alt={`LAN Event: ${event.date}`} fill loading="lazy"
          className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-extrabold text-white drop-shadow-md">{event.date}</h3>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2" style={{ color: accent }}><FaMapMarkerAlt /><span className="text-sm font-bold uppercase tracking-wider">{event.location}</span></div>
          <div className="flex items-start gap-2" style={{ color: accent + 'b3' }}><FaGamepad className="mt-1 flex-shrink-0" /><span className="text-sm italic text-zinc-400">{event.games}</span></div>
        </div>
        <p className="text-sm text-zinc-500 border-t border-white/[0.04] pt-3 leading-relaxed flex gap-2">
          <FaInfoCircle className="mt-1 flex-shrink-0" style={{ color: accent + '80' }} />
          <span dangerouslySetInnerHTML={{ __html: event.description.replace(/\*\*(.*?)\*\*/g, `<strong style="color:${accent}">$1</strong>`) }} />
        </p>
      </div>
    </div>
  );
};

export default function LanPage() {
  const { accent } = useTheme();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-mono relative overflow-hidden">
      {/* Persistent grid + noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />

      {/* Red ambient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-15%] h-[800px] w-[800px] rounded-full opacity-[0.03]" style={{ backgroundColor: accent, filter: 'blur(200px)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full opacity-[0.02]" style={{ backgroundColor: accent, filter: 'blur(150px)' }} />
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        ::selection { background: ${accent}4d; color: #fff; }
      `}</style>

      <div className="relative z-10 pt-8 px-6">
        <div className="max-w-5xl mx-auto pt-24">
          {/* HEADER */}
          <div className="text-center mb-16 mt-8 opacity-0 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-[-0.03em] uppercase">
              LAN <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accent}cc, ${accent}, ${accent}cc)` }}>Events</span>
            </h1>
            <div className="h-[2px] w-24 mx-auto mt-4" style={{ backgroundImage: `linear-gradient(to right, ${accent}, ${accent}cc)` }} />
            <p className="text-[9px] tracking-[0.4em] text-zinc-600 uppercase font-mono mt-4">{'Gaming. Friends. Fun.'}</p>
          </div>

          <div className="space-y-16">
            {/* GALLERY */}
            <section className="opacity-0 animate-fade-in">
              <h2 className="text-2xl font-black text-white uppercase tracking-[-0.02em] mb-6 flex items-center gap-3 border-b border-white/[0.06] pb-2">
                <FaImages style={{ color: accent }} /> Gallery
              </h2>
              <LanGallery />
            </section>

            {/* PAST EVENTS */}
            <section ref={(el) => { sectionRefs.current[0] = el as HTMLDivElement | null; }} className="opacity-0">
              <h2 className="text-2xl font-black text-white uppercase tracking-[-0.02em] mb-8 flex items-center gap-3 border-b border-white/[0.06] pb-2">
                <FaCalendarAlt style={{ color: accent }} /> Past Showcase
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04]">
                {PAST_EVENTS.map((event) => (
                  <div key={event.id} className="bg-[#050505]"><EventCard event={event} accent={accent} /></div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-24 mb-6 text-[9px] text-zinc-700 uppercase tracking-[0.3em] border-t border-white/[0.04] pt-6 w-full text-center font-mono">
            {'LAN System v2.0 // '}<span style={{ color: accent + '80' }}>Gaming, Friends, & Fun</span>{' // End of Line'}
          </footer>
        </div>
      </div>
    </div>
  );
}
