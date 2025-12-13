"use client";

import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGamepad,
  FaImages,
  FaInfoCircle,
  FaClock,
  FaTicketAlt,
  FaChevronRight,
} from "react-icons/fa";
import LanGallery from './zunguka'; 

// Import your images
import lanv1 from "./images/lanv1.jpg";
import lanv2 from "./images/lanv2.jpg";

// --- DATA CONFIGURATION ---
const NEXT_EVENT = {
  date: "Friday, February 7, 2026",
  time: "7:00 PM - Late",
  location: "Kikuyu, Kenya (Exact location on day)",
  games: "Delta Force, Counter-Strike, + Ragers like Pico Park Classic Edition",
  registrationLink: "https://forms.gle/vCU3foYFR51nwnCB8",
  pricing: [
    {
      title: "Standard Entry",
      price: "KES 650",
      description: "Includes access to the LAN event with food and drinks.",
      highlight: false,
    },
    {
      title: "Exclusive Monster Flavours",
      price: "KES 450",
      description: "Special option with exclusive Monster energy drinks included.",
      highlight: true,
    },
  ],
};

const PAST_EVENTS = [
  {
    id: 1,
    date: "November 11, 2025",
    location: "Kikuyu, Kenya",
    description:
      "testing the waters with a focus on tactical FPS titles, led by the **Delta Force** series",
    imageUrl: lanv2, // StaticImageData
    games: " Delta Force",
  },
  {
    id: 2,
    date: "September 2, 2025",
    location: "Kikuyu, Kenya",
    description:
      "The inaugural event,A competitive night focused on intense tactics and team play, with the primary theme being **Counter-Strike**. .",
    imageUrl: lanv1, // StaticImageData
    games: "Counter-Strike 2, Valorant,",
  },
];

export default function LanPage() {
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

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-green-400 font-mono flex flex-col items-center p-6 selection:bg-green-900 selection:text-white">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
        }
      `}</style>

      {/* --- HEADER --- */}
      <div className="text-center mb-16 mt-8 opacity-0 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
          LAN <span className="text-green-500">Events</span>
        </h1>
        <div className="h-1 w-24 bg-green-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
      </div>

      <div className="w-full max-w-5xl space-y-16">
        {/* --- UPCOMING EVENT INFO --- */}
        <section>
          <h2 className="text-3xl font-bold text-green-500 mb-6 flex items-center gap-3 border-b border-green-800/30 pb-2">
            <FaCalendarAlt /> Upcoming Event
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Card */}
            <InfoCard
              icon={<FaCalendarAlt className="text-red-500" />}
              ref={(el) => {
                sectionRefs.current[0] = el as HTMLDivElement | null;
              }}
            >
              <div className="text-xs uppercase opacity-50 tracking-wider">
                Next LAN Date
              </div>
              <div className="text-lg md:text-xl font-bold text-white">
                {NEXT_EVENT.date}
              </div>
              <div className="flex items-center gap-2 mt-2 text-green-300/80 text-sm">
                <FaClock /> {NEXT_EVENT.time}
              </div>
            </InfoCard>

            {/* Location Card */}
            <InfoCard
              icon={<FaMapMarkerAlt className="text-blue-500" />}
              ref={(el) => {
                sectionRefs.current[1] = el as HTMLDivElement | null;
              }}
            >
              <div className="text-xs uppercase opacity-50 tracking-wider">
                Location
              </div>
              <div className="text-lg md:text-xl font-bold text-white leading-tight">
                {NEXT_EVENT.location}
              </div>
            </InfoCard>

            {/* Games Card */}
            <InfoCard
              icon={<FaGamepad className="text-yellow-500" />}
              ref={(el) => {
                sectionRefs.current[2] = el as HTMLDivElement | null;
              }}
            >
              <div className="text-xs uppercase opacity-50 tracking-wider">
                Featured Games
              </div>
              <div className="text-lg md:text-xl font-bold text-white leading-tight">
                {NEXT_EVENT.games}
              </div>
            </InfoCard>
          </div>
        </section>

        {/* --- PRICING & REGISTRATION SECTION --- */}
        <section
          ref={(el) => {
            sectionRefs.current[3] = el as HTMLDivElement | null;
          }}
          className="opacity-0"
        >
          <h2 className="text-3xl font-bold text-green-500 mb-6 flex items-center gap-3 border-b border-green-800/30 pb-2">
            <FaTicketAlt /> Entry Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEXT_EVENT.pricing.map((tier, index) => (
              <PricingCard key={index} tier={tier} />
            ))}
          </div>

          {/* --- MAIN CALL TO ACTION --- */}
          <div className="mt-12 flex justify-center">
            <a
              href={NEXT_EVENT.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-5 bg-green-600 hover:bg-green-500 text-black font-black text-xl uppercase tracking-widest transition-all duration-300 clip-path-slant shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:-translate-y-1 block text-center"
            >
              <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.1)_3px)] opacity-20 pointer-events-none" />
              <span className="flex items-center gap-3 relative z-10">
                {`>>> INITIALIZE REGISTRATION`}{" "}
                <FaChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </a>
          </div>
          <p className="text-center text-green-800 text-xs mt-4 uppercase tracking-widest animate-pulse">
            * Limited slots available per session *
          </p>
        </section>

             <LanGallery  />

        {/* --- PAST EVENTS --- */}
        <section
          ref={(el) => {
            sectionRefs.current[4] = el as HTMLDivElement | null;
          }}
          className="opacity-0"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 border-b border-white/10 pb-2">
            <FaImages className="text-green-500" /> Past Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PAST_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>

      {/* --- FOOTER --- */}
      <footer className="mt-24 mb-6 text-xs text-green-800/80 uppercase tracking-[0.2em] border-t border-green-900/30 pt-6 w-full max-w-5xl text-center">
        LAN System v2.0 // Gaming, Friends, & Fun // End of Line
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---
const InfoCard = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; icon: React.ReactNode }
>(({ children, icon }, ref) => (
  <div
    ref={ref}
    className="opacity-0 bg-black/70 backdrop-blur-sm p-6 rounded-xl border border-green-800/40 flex items-start gap-4 shadow-lg hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition duration-300 group"
  >
    <div className="text-3xl pt-1 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
));
InfoCard.displayName = "InfoCard";

const PricingCard = ({
  tier,
}: {
  tier: { title: string; price: string; description: string; highlight: boolean };
}) => (
  <div
    className={`relative p-8 rounded-2xl border transition duration-300 flex flex-col items-center gap-4 text-center group overflow-hidden
      ${
        tier.highlight
          ? "bg-green-900/10 border-green-500/60 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
          : "bg-black/60 border-green-800/40 hover:border-green-400"
      }`}
  >
    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#000_3px)] opacity-10 pointer-events-none" />
    <div className="text-xl font-bold text-white uppercase tracking-wider z-10">
      {tier.title}
    </div>
    <div className="text-5xl font-black text-green-400 drop-shadow-md z-10">
      {tier.price}
    </div>
    <div className="h-px w-12 bg-green-500/50 my-2" />
    <div className="text-sm text-gray-400 z-10 max-w-xs">{tier.description}</div>
  </div>
);

const EventCard = ({
  event,
}: {
  event: {
    id: number;
    date: string;
    location: string;
    description: string;
    imageUrl: string | StaticImageData;
    games: string;
  };
}) => (
  <div className="bg-black/80 rounded-xl border border-green-900/50 overflow-hidden group hover:border-green-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1">
    <div className="relative overflow-hidden h-56">
      <Image
        src={event.imageUrl}
        alt={`LAN Event: ${event.date}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2 drop-shadow-md">
          {event.date}
        </h3>
      </div>
    </div>

    <div className="p-5 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-400">
          <FaMapMarkerAlt />
          <span className="text-sm font-bold uppercase tracking-wider">
            {event.location}
          </span>
        </div>
        <div className="flex items-start gap-2 text-yellow-500">
          <FaGamepad className="mt-1 flex-shrink-0" />
          <span className="text-sm italic opacity-90">{event.games}</span>
        </div>
      </div>

      <p className="text-sm text-gray-400 border-t border-green-900/50 pt-3 leading-relaxed flex gap-2">
        <FaInfoCircle className="mt-1 flex-shrink-0 text-green-600" />
        <span
          dangerouslySetInnerHTML={{
            __html: event.description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
          }}
        />
      </p>
    </div>
  </div>
);
