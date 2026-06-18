'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/app/Context/theme';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaChevronRight, FaUsers } from 'react-icons/fa';

const SORT_OPTIONS = ['Upcoming', 'Past', 'All'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  endDate: string | null;
  location: string;
  bannerUrl: string | null;
  posterUrl: string | null;
  maxAttendees: number | null;
  published: boolean;
}

function getEventStatus(date: string, endDate: string | null): 'upcoming' | 'active' | 'past' {
  const now = new Date();
  const eventDate = new Date(date);
  if (endDate) {
    const end = new Date(endDate);
    if (now > end) return 'past';
    if (now >= eventDate && now <= end) return 'active';
    return 'upcoming';
  }
  return now > eventDate ? 'past' : 'upcoming';
}

function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function tick() {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-3xl md:text-5xl font-black text-white font-mono tabular-nums leading-none">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-[7px] tracking-[0.3em] text-zinc-600 uppercase mt-1">{unit}</div>
        </div>
      ))}
    </div>
  );
}

export function CustomEvents() {
  const { accent } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLinkHover, setEventsLinkHover] = useState(false);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setEvents(data); })
      .catch(() => {});
  }, []);

  const { scrollY } = useScroll();
  const shardY = useTransform(scrollY, [0, 800], [-100, 100]);

  const nextEvent = events
    .filter(e => getEventStatus(e.date, e.endDate) !== 'past')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  if (!nextEvent) return null;

  const eventDate = new Date(nextEvent.date);

  return (
    <section className="relative w-full bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {nextEvent.bannerUrl && (
        <div className="absolute inset-0 z-0">
          <img src={nextEvent.bannerUrl} alt="" className="w-full h-full object-cover opacity-15 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
        </div>
      )}

      <motion.div style={{ y: shardY }} className="absolute right-[-5%] top-[15%] w-[40vw] h-[60vh] z-0 opacity-10 pointer-events-none">
        <div className="w-full h-full blur-3xl" style={{ background: `linear-gradient(to bottom left, ${accent}33, transparent, transparent)` }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 py-32 md:py-48">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-12" style={{ backgroundColor: accent }} />
          <span className="text-[9px] tracking-[0.5em] uppercase font-bold animate-pulse" style={{ color: accent }}>Next Event</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-[-0.03em] uppercase leading-[0.9] mb-8">
              {nextEvent.title}
            </h2>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-zinc-400">
                <FaCalendarAlt style={{ color: accent }} className="flex-shrink-0" />
                <span className="text-sm md:text-base">{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <FaMapMarkerAlt style={{ color: accent }} className="flex-shrink-0" />
                <span className="text-sm md:text-base">{nextEvent.location}</span>
              </div>
              {nextEvent.maxAttendees && (
                <div className="flex items-center gap-3 text-zinc-400">
                  <FaUsers style={{ color: accent }} className="flex-shrink-0" />
                  <span className="text-sm md:text-base">{nextEvent.maxAttendees} max attendees</span>
                </div>
              )}
            </div>

            <Countdown targetDate={eventDate} />

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href={`/LAN/${nextEvent.slug}`}
                className="group relative px-10 py-5 font-black text-lg uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-3 overflow-hidden">
                <div className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `linear-gradient(to right, ${accent}dd, ${accent}, ${accent}dd)` }} />
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
                <span className="relative z-10 text-black flex items-center gap-3 group-hover:scale-[1.02] transition-transform">
                  Get Tickets <FaTicketAlt />
                </span>
              </Link>
              <Link href="#events-list"
                className="group px-8 py-5 font-black text-sm uppercase tracking-[0.25em] border border-white/[0.1] text-zinc-400 hover:text-white transition-all duration-300"
                style={{ borderColor: eventsLinkHover ? accent + '4d' : undefined }}
                onMouseEnter={() => setEventsLinkHover(true)}
                onMouseLeave={() => setEventsLinkHover(false)}>
                All Events &darr;
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
            className="hidden lg:block relative">
            {nextEvent.posterUrl ? (
              <div className="relative border border-white/[0.06] overflow-hidden group">
                <img src={nextEvent.posterUrl} alt={`${nextEvent.title} poster`}
                  className="w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              </div>
            ) : nextEvent.bannerUrl ? (
              <div className="relative h-96 border border-white/[0.06] overflow-hidden group">
                <img src={nextEvent.bannerUrl} alt={nextEvent.title}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function DynamicEvents() {
  const { accent } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [sort, setSort] = useState<SortOption>('Upcoming');
  const [loading, setLoading] = useState(true);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setEvents(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const processEvents = useCallback((eventList: Event[], sortOption: SortOption) => {
    const statusMap = new Map(eventList.map(e => [e.id, getEventStatus(e.date, e.endDate)]));
    const filtered = sortOption === 'All'
      ? eventList
      : eventList.filter(e => statusMap.get(e.id) === sortOption.toLowerCase());
    return filtered.sort((a, b) => {
      const aPast = statusMap.get(a.id) === 'past';
      const bPast = statusMap.get(b.id) === 'past';
      if (aPast && bPast) return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (!aPast && !bPast) return new Date(a.date).getTime() - new Date(b.date).getTime();
      return aPast ? 1 : -1;
    });
  }, []);

  const activeCount = events.filter(e => getEventStatus(e.date, e.endDate) !== 'past').length;
  const sortedEvents = processEvents(events, sort);

  return (
    <section id="events-list" className="w-full py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: accent, opacity: 0.03 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-16">
          <div className="h-[1px] w-12" style={{ backgroundColor: accent }} />
          <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Registry</span>
          <span className="text-[9px] font-mono text-zinc-700">({events.length} events)</span>
        </motion.div>

        <header className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
            className="text-[3rem] sm:text-[5rem] md:text-[7rem] font-black leading-[0.82] tracking-[-0.04em] text-white uppercase">
            All
            <br />
            <span style={{ WebkitTextStroke: `2px ${accent}`, color: 'transparent' }}>Events.</span>
          </motion.h2>
        </header>

        <div className="flex items-center justify-between mb-12">
          <div className="flex gap-1">
            {SORT_OPTIONS.map(option => (
              <button key={option} onClick={() => setSort(option)}
                className={`relative px-5 py-2.5 text-[8px] font-mono tracking-[0.25em] uppercase border transition-all duration-300
                  ${sort === option
                    ? 'bg-white/[0.04]'
                    : 'bg-transparent border-white/[0.06] text-zinc-600 hover:border-white/20 hover:text-zinc-400'
                  }`}
                  style={sort === option ? { borderColor: accent + '66', color: accent } : undefined}>
                {sort === option && (
                  <motion.div layoutId="sortBg" className="absolute inset-0" style={{ backgroundColor: accent + '08' }} />
                )}
                <span className="relative z-10">{option} {option !== 'All' && `(${option === 'Upcoming' ? activeCount : events.length - activeCount})`}</span>
              </button>
            ))}
          </div>
          <div className="text-[9px] font-mono tracking-[0.2em] text-zinc-700">
            {sortedEvents.length} result{sortedEvents.length !== 1 ? 's' : ''}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">LOADING EVENTS...</div>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/[0.04]">
            <p className="text-zinc-600 text-sm font-mono tracking-wider uppercase">No {sort.toLowerCase()} events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
            {sortedEvents.slice(0, 9).map((event, i) => {
              const status = getEventStatus(event.date, event.endDate);
              return (
                <motion.div key={event.id} initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-60px' }} className="bg-[#050505]">
                  <Link href={`/LAN/${event.slug}`} className="block h-full">
                    <div className="bg-white/[0.02] border border-white/[0.06] group transition-all duration-500 h-full flex flex-col relative overflow-hidden"
                      style={{ borderColor: hoveredEventId === event.id ? accent + '4d' : undefined }}
                      onMouseEnter={() => setHoveredEventId(event.id)}
                      onMouseLeave={() => setHoveredEventId(null)}>
                      <div className={`absolute top-3 right-3 z-10 px-2 py-1 text-[7px] font-mono tracking-[0.2em] uppercase border
                        ${status === 'past' ? 'border-zinc-800 text-zinc-700' : status === 'active' ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-zinc-800'}`}
                        style={status === 'upcoming' ? { borderColor: accent + '4d', color: accent, backgroundColor: accent + '0d' } : undefined}>
                        {status}
                      </div>

                      {event.bannerUrl ? (
                        <div className="relative h-40 overflow-hidden">
                          <img src={event.bannerUrl} alt={event.title}
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                        </div>
                      ) : (
                        <div className="h-24 bg-white/[0.01] border-b border-white/[0.04]" />
                      )}

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-base font-bold transition-colors mb-2 leading-tight"
                          style={{ color: hoveredEventId === event.id ? accent : '#fff' }}>{event.title}</h3>
                        <div className="flex flex-col gap-1.5 text-[10px] text-zinc-600 font-mono mb-3">
                          <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-[8px]" style={{ color: accent + '80' }} /> {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-[8px]" style={{ color: accent + '80' }} /> {event.location}</span>
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-grow">{event.description}</p>
                        <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                          <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-600 uppercase transition-colors"
                            style={{ color: hoveredEventId === event.id ? accent : undefined }}>
                            View Event
                          </span>
                          <FaChevronRight className="text-zinc-700 text-[10px] transition-all duration-300"
                            style={{ color: hoveredEventId === event.id ? accent : undefined, transform: hoveredEventId === event.id ? 'translateX(4px)' : undefined }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {sortedEvents.length > 9 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-12 text-center">
            <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-700 uppercase">+{sortedEvents.length - 9} more events</span>
          </motion.div>
        )}

        <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="mt-24 pt-12 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-10 opacity-30">
          <div className="flex gap-10 text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            <span>Status: {activeCount > 0 ? 'Active' : 'Idle'}</span>
            <span>Events: {events.length}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 h-1 border border-white/20" />
            ))}
          </div>
          <div className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase">// END_OF_REGISTRY</div>
        </motion.footer>
      </div>
    </section>
  );
}
