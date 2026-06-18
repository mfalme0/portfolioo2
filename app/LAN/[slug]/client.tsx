'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '../../Context/theme';
import Header from '@/app/Components/header';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaChevronLeft, FaUsers, FaClock, FaTag, FaMinus, FaPlus, FaShieldAlt } from 'react-icons/fa';

interface Ticket {
  id: string;
  eventId: string;
  name: string;
  description: string | null;
  price: string;
  currency: string;
  remaining: number;
  quantity: number;
  maxPerOrder: number;
}

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

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) return null;

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-lg md:text-2xl font-black text-white font-mono tabular-nums leading-none bg-white/[0.03] border border-white/[0.06] px-3 py-2 min-w-[48px]">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-[6px] tracking-[0.3em] text-zinc-600 uppercase mt-1">{unit}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventDetailClient({ slug }: { slug: string }) {
  const { accent } = useTheme();
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [discountCode, setDiscountCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorLinkHovered, setErrorLinkHovered] = useState(false);
  const [allEventsHovered, setAllEventsHovered] = useState(false);
  const [posterHovered, setPosterHovered] = useState(false);
  const [hoveredTicketId, setHoveredTicketId] = useState<string | null>(null);
  const [hoveredMinusId, setHoveredMinusId] = useState<string | null>(null);
  const [hoveredPlusId, setHoveredPlusId] = useState<string | null>(null);
  const [discountFocused, setDiscountFocused] = useState(false);
  const [continueHovered, setContinueHovered] = useState(false);

  useEffect(() => {
    fetch(`/api/events?slug=${slug}`)
      .then(res => res.json())
      .then(async (eventData) => {
        setEvent(eventData);
        const ticketRes = await fetch(`/api/tickets?eventId=${eventData.id}`);
        const ticketData = await ticketRes.json();
        setTickets(ticketData);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  function updateQty(ticketId: string, qty: number) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    setQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max(0, Math.min(qty, ticket.maxPerOrder, ticket.remaining)),
    }));
  }

  const total = tickets.reduce((sum, t) => sum + parseFloat(t.price) * (quantities[t.id] || 0), 0);
  const hasItems = Object.values(quantities).some(q => q > 0);
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

  function buildPurchaseUrl() {
    const items = Object.entries(quantities)
      .filter(([_, q]) => q > 0)
      .map(([id, qty]) => ({ ticketId: id, quantity: qty }));
    const params = new URLSearchParams();
    params.set('items', JSON.stringify(items));
    if (discountCode) params.set('discount', discountCode.toUpperCase());
    return `/LAN/${slug}/purchase?${params.toString()}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <Header />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-6 h-6 border rounded-full animate-spin mx-auto mb-4" style={{ borderColor: accent + '4d', borderTopColor: accent }} />
            <div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">LOADING EVENT...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <Header />
        <div className="max-w-5xl mx-auto px-6 pt-32 text-center">
          <div className="text-6xl font-black text-white/10 mb-6">404</div>
          <h1 className="text-2xl text-white font-bold mb-2">Event Not Found</h1>
          <p className="text-zinc-600 text-sm mb-8">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/LAN"
            onMouseEnter={() => setErrorLinkHovered(true)}
            onMouseLeave={() => setErrorLinkHovered(false)}
            className="inline-flex items-center gap-2 px-6 py-3 border text-[10px] font-mono tracking-wider uppercase transition-all"
            style={{ borderColor: accent + '4d', color: accent, backgroundColor: errorLinkHovered ? accent + '1a' : undefined }}>
            <FaChevronLeft /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-[#050505]">
      <style>{`::selection{background:${accent}4d;color:#fff}`}</style>
      <Header />

      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full opacity-[0.03]" style={{ backgroundColor: accent, filter: 'blur(150px)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-rose-500 opacity-[0.02]" style={{ filter: 'blur(120px)' }} />
      </div>

      {/* Hero Banner */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        {event.bannerUrl ? (
          <img src={event.bannerUrl} alt={event.title}
            className="w-full h-full object-cover opacity-40 grayscale-[20%]" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-[#050505] to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <Link href="/LAN"
              onMouseEnter={() => setAllEventsHovered(true)}
              onMouseLeave={() => setAllEventsHovered(false)}
              className="inline-flex items-center gap-2 text-zinc-500 text-[9px] font-mono tracking-[0.3em] uppercase transition-colors mb-6 group"
              style={{ color: allEventsHovered ? accent : undefined }}>
              <FaChevronLeft className="text-[8px] group-hover:-translate-x-1 transition-transform" /> All Events
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.03em] uppercase leading-[0.9] max-w-4xl">
              {event.title}
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Info Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] border border-white/[0.04]">
              <div className="bg-[#050505] p-6">
                <div className="flex items-start gap-4">
                  <FaCalendarAlt style={{ color: accent }} className="mt-1" />
                  <div>
                    <div className="text-[8px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-1">Date & Time</div>
                    <div className="text-white text-sm font-semibold leading-tight">{formattedDate}</div>
                    <div className="flex items-center gap-1 text-zinc-500 text-xs mt-1"><FaClock className="text-[10px]" /> {formattedTime}</div>
                  </div>
                </div>
              </div>
              <div className="bg-[#050505] p-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt style={{ color: accent }} className="mt-1" />
                  <div>
                    <div className="text-[8px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-1">Location</div>
                    <div className="text-white text-sm font-semibold leading-tight">{event.location}</div>
                  </div>
                </div>
              </div>
              <div className="bg-[#050505] p-6">
                <div className="flex items-start gap-4">
                  <FaUsers style={{ color: accent }} className="mt-1" />
                  <div>
                    <div className="text-[8px] font-mono tracking-[0.3em] text-zinc-600 uppercase mb-1">Capacity</div>
                    <div className="text-white text-sm font-semibold leading-tight">{event.maxAttendees ? `${event.maxAttendees} max` : 'Unlimited'}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
              <Countdown targetDate={eventDate} />
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6 border-b border-white/[0.06] pb-3">
                <div className="h-[1px] w-8" style={{ backgroundColor: accent }} />
                <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">About</span>
              </div>
              <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line max-w-3xl">{event.description}</div>
            </motion.div>

            {/* Poster */}
            {event.posterUrl && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
                <img src={event.posterUrl} alt={`${event.title} poster`}
                  onMouseEnter={() => setPosterHovered(true)}
                  onMouseLeave={() => setPosterHovered(false)}
                  className="w-full max-w-md border border-white/[0.06] grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                  style={posterHovered ? { borderColor: accent + '33' } : undefined} />
              </motion.div>
            )}
          </div>

          {/* Right: Tickets Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-1">
            <div className="sticky top-24 border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl overflow-hidden">
              <div className="border-b border-white/[0.06] px-6 py-4"
                style={{ background: `linear-gradient(to right, ${accent}1a, rgba(225,29,72,0.1))` }}>
                <h2 className="text-white font-black text-base uppercase tracking-[-0.02em] flex items-center gap-2">
                  <FaTicketAlt style={{ color: accent }} /> Get Tickets
                </h2>
              </div>

              {tickets.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-zinc-600 text-sm">No tickets available yet</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {tickets.map(ticket => (
                    <div key={ticket.id}
                      onMouseEnter={() => setHoveredTicketId(ticket.id)}
                      onMouseLeave={() => setHoveredTicketId(null)}
                      className="border border-white/[0.06] p-4 transition-all duration-300"
                      style={{ borderColor: hoveredTicketId === ticket.id ? accent + '33' : undefined }}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="text-white text-sm font-semibold transition-colors"
                            style={{ color: hoveredTicketId === ticket.id ? accent : undefined }}>
                            {ticket.name}
                          </div>
                          {ticket.description && (
                            <div className="text-zinc-600 text-[11px] mt-0.5">{ticket.description}</div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-white text-base font-black font-mono">KES {ticket.price}</div>
                          <div className={`text-[9px] font-mono mt-0.5 ${ticket.remaining <= 5 ? '' : 'text-zinc-600'}`}
                            style={ticket.remaining <= 5 ? { color: accent } : undefined}>
                            {ticket.remaining <= 0 ? 'SOLD OUT' : `${ticket.remaining} left`}
                          </div>
                        </div>
                      </div>
                      {ticket.remaining > 0 ? (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(ticket.id, (quantities[ticket.id] || 0) - 1)}
                              onMouseEnter={() => setHoveredMinusId(ticket.id)}
                              onMouseLeave={() => setHoveredMinusId(null)}
                              className="w-7 h-7 border border-white/[0.06] text-white flex items-center justify-center text-[10px] hover:bg-white/5 disabled:opacity-30 transition-all"
                              style={hoveredMinusId === ticket.id ? { borderColor: accent + '4d' } : undefined}
                              disabled={!quantities[ticket.id]}>
                              <FaMinus />
                            </button>
                            <span className="text-white text-sm w-8 text-center font-mono tabular-nums">{quantities[ticket.id] || 0}</span>
                            <button onClick={() => updateQty(ticket.id, (quantities[ticket.id] || 0) + 1)}
                              onMouseEnter={() => setHoveredPlusId(ticket.id)}
                              onMouseLeave={() => setHoveredPlusId(null)}
                              className="w-7 h-7 border border-white/[0.06] text-white flex items-center justify-center text-[10px] hover:bg-white/5 disabled:opacity-30 transition-all"
                              style={hoveredPlusId === ticket.id ? { borderColor: accent + '4d' } : undefined}
                              disabled={(quantities[ticket.id] || 0) >= Math.min(ticket.maxPerOrder, ticket.remaining)}>
                              <FaPlus />
                            </button>
                          </div>
                          <span className="text-zinc-700 text-[9px] font-mono">max {ticket.maxPerOrder}</span>
                        </div>
                      ) : (
                        <div className="mt-3 pt-3 border-t border-white/[0.04]">
                          <span className="text-[9px] font-mono tracking-wider uppercase" style={{ color: accent }}>Sold Out</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Discount Code */}
              <div className="px-6 pb-4">
                <div className="border border-white/[0.06] p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTag className="text-zinc-600 text-[10px]" />
                    <label className="text-[8px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Discount Code</label>
                  </div>
                  <input type="text" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                    onFocus={() => setDiscountFocused(true)}
                    onBlur={() => setDiscountFocused(false)}
                    className="w-full bg-zinc-900/50 border border-white/[0.06] px-3 py-2 text-white text-xs font-mono focus:outline-none transition-colors uppercase tracking-wider"
                    style={discountFocused ? { borderColor: accent + '4d' } : undefined}
                    placeholder="ENTER CODE" />
                </div>
              </div>

              {/* Total & CTA */}
              <div className="border-t border-white/[0.06] bg-white/[0.01] px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-400 text-xs font-mono tracking-wider uppercase">{totalItems > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''}` : 'No items'}</span>
                  <div className="text-right">
                    <div className="text-[8px] font-mono tracking-[0.2em] text-zinc-700 uppercase">Total</div>
                    <div className="text-white text-xl font-black font-mono tabular-nums">
                      {total > 0 ? `KES ${total.toLocaleString()}` : 'KES 0'}
                    </div>
                  </div>
                </div>

                <Link href={hasItems ? buildPurchaseUrl() : '#'}
                  onMouseEnter={() => setContinueHovered(true)}
                  onMouseLeave={() => setContinueHovered(false)}
                  className={`relative w-full py-4 text-sm font-black text-center transition-all uppercase tracking-wider flex items-center justify-center gap-2 overflow-hidden
                    ${hasItems ? 'text-black' : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed'}`}
                  style={hasItems ? {
                    background: continueHovered
                      ? `linear-gradient(to right, ${accent}, #f43f5e)`
                      : `linear-gradient(to right, ${accent}, #e11d48)`,
                  } : undefined}
                  onClick={e => { if (!hasItems) e.preventDefault(); }}>
                  <span className="relative z-10 flex items-center gap-2">
                    {hasItems ? (
                      <><FaTicketAlt /> Continue — KES {total.toLocaleString()}</>
                    ) : 'Select Tickets'}
                  </span>
                </Link>

                <div className="flex items-center justify-center gap-2 mt-3">
                  <FaShieldAlt className="text-zinc-700 text-[10px]" />
                  <span className="text-zinc-700 text-[8px] font-mono tracking-wider uppercase">Secured checkout</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-32 mb-8 text-[9px] text-zinc-700 uppercase tracking-[0.3em] border-t border-white/[0.04] pt-6 w-full max-w-7xl mx-auto text-center font-mono px-6">
        LAN System v2.0 // <span style={{ color: accent + '80' }}>{event.title}</span> // End of Line
      </footer>
    </div>
  );
}
