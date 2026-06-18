'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../Context/theme';
import { useParams, useSearchParams } from 'next/navigation';
import Header from '@/app/Components/header';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaTicketAlt, FaShieldAlt, FaLock, FaUser, FaEnvelope, FaPhone, FaTag, FaTrash } from 'react-icons/fa';

export default function PurchasePage() {
  const { accent } = useTheme();
  const params = useParams();
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [discountCode, setDiscountCode] = useState(searchParams.get('discount') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [backLinkHovered, setBackLinkHovered] = useState(false);
  const [backLinkErrorHovered, setBackLinkErrorHovered] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [discountFocused, setDiscountFocused] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [removeHoveredId, setRemoveHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const itemsParam = searchParams.get('items');
    if (!itemsParam) { setError('No items selected'); return; }

    fetch(`/api/events?slug=${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        return fetch(`/api/tickets?eventId=${data.id}`);
      })
      .then(res => res.json())
      .then(ticketData => {
        setTickets(ticketData);
        try {
          const items = JSON.parse(searchParams.get('items') || '[]');
          const qtyMap: Record<string, number> = {};
          items.forEach((item: any) => { qtyMap[item.ticketId] = item.quantity; });
          setQuantities(qtyMap);
        } catch {}
        setDataLoaded(true);
      })
      .catch(() => setError('Failed to load event'));
  }, [params.slug, searchParams]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!event) return;
    setLoading(true);
    setError('');

    const items = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketId, quantity]) => ({ ticketId, quantity }));

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          items, customerName: form.name, customerEmail: form.email,
          customerPhone: form.phone || undefined, discountCode: discountCode || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Checkout failed'); return; }
      window.location.href = data.checkoutUrl;
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  if (error && !dataLoaded) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <Header />
        <div className="max-w-md mx-auto px-6 pt-32 text-center">
          <div className="text-6xl font-black text-white/10 mb-6">!</div>
          <h1 className="text-xl text-white font-bold mb-2">Checkout Error</h1>
          <p className="text-sm mb-8" style={{ color: accent }}>{error}</p>
          <Link href={`/LAN/${params.slug}`}
            onMouseEnter={() => setBackLinkErrorHovered(true)}
            onMouseLeave={() => setBackLinkErrorHovered(false)}
            className="inline-flex items-center gap-2 px-6 py-3 border text-[10px] font-mono tracking-wider uppercase transition-all"
            style={{ borderColor: accent + '4d', color: accent, backgroundColor: backLinkErrorHovered ? accent + '1a' : undefined }}>
            <FaChevronLeft /> Back to Event
          </Link>
        </div>
      </div>
    );
  }

  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-[#050505]">
        <Header />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-6 h-6 border rounded-full animate-spin mx-auto mb-4" style={{ borderColor: accent + '4d', borderTopColor: accent }} />
            <div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">PREPARING CHECKOUT...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <style>{`::selection{background:${accent}4d;color:#fff}`}</style>
      <Header />

      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] h-[400px] w-[400px] rounded-full opacity-[0.03]" style={{ backgroundColor: accent, filter: 'blur(120px)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href={`/LAN/${params.slug}`}
            onMouseEnter={() => setBackLinkHovered(true)}
            onMouseLeave={() => setBackLinkHovered(false)}
            className="inline-flex items-center gap-2 text-zinc-500 text-[9px] font-mono tracking-[0.3em] uppercase transition-colors mb-8 group"
            style={{ color: backLinkHovered ? accent : undefined }}>
            <FaChevronLeft className="text-[8px] group-hover:-translate-x-1 transition-transform" /> Back to Event
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-10">
          <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase mb-2">Secure Checkout</div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-[-0.02em] uppercase">Complete Your Order</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3">
            <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
              <div className="border-b border-white/[0.06] px-6 py-4">
                <h2 className="text-white text-sm font-semibold flex items-center gap-2">
                  <FaUser style={{ color: accent }} className="text-[12px]" /> Your Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">
                    <FaUser style={{ color: accent + '80' }} /> Full Name
                  </label>
                  <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    className="w-full bg-zinc-900/50 border border-white/[0.06] px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={nameFocused ? { borderColor: accent + '4d' } : undefined}
                    required placeholder="John Doe" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">
                    <FaEnvelope style={{ color: accent + '80' }} /> Email Address
                  </label>
                  <input type="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    className="w-full bg-zinc-900/50 border border-white/[0.06] px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={emailFocused ? { borderColor: accent + '4d' } : undefined}
                    required placeholder="john@example.com" />
                  <p className="text-zinc-700 text-[8px] font-mono mt-1.5 tracking-wider uppercase">Tickets will be sent to this address</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">
                    <FaPhone style={{ color: accent + '80' }} /> Phone (M-Pesa)
                  </label>
                  <input type="tel" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                    className="w-full bg-zinc-900/50 border border-white/[0.06] px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                    style={phoneFocused ? { borderColor: accent + '4d' } : undefined}
                    placeholder="2547XXXXXXXX" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">
                    <FaTag style={{ color: accent + '80' }} /> Discount Code
                  </label>
                  <input type="text" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                    onFocus={() => setDiscountFocused(true)}
                    onBlur={() => setDiscountFocused(false)}
                    className="w-full bg-zinc-900/50 border border-white/[0.06] px-4 py-3 text-white text-sm font-mono focus:outline-none transition-colors uppercase tracking-wider"
                    style={discountFocused ? { borderColor: accent + '4d' } : undefined}
                    placeholder="ENTER CODE" />
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3"
                    style={{ backgroundColor: accent + '33', borderColor: accent + '33' }}>
                    <p className="text-xs font-mono" style={{ color: accent }}>{error}</p>
                  </motion.div>
                )}

                <button type="submit" disabled={loading || !hasItems}
                  onMouseEnter={() => setSubmitHovered(true)}
                  onMouseLeave={() => setSubmitHovered(false)}
                  className={`relative w-full py-4 font-black text-base text-center transition-all uppercase tracking-wider overflow-hidden group
                    ${loading || !hasItems ? 'bg-white/[0.04] text-zinc-600 cursor-not-allowed' : 'text-black'}`}
                  style={!loading && hasItems ? {
                    background: submitHovered
                      ? `linear-gradient(to right, ${accent}, #f43f5e)`
                      : `linear-gradient(to right, ${accent}, #e11d48)`,
                  } : undefined}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border border-black/30 border-t-black rounded-full animate-spin" />
                      REDIRECTING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaLock /> Pay KES {total.toLocaleString()}
                    </span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2">
                  <FaShieldAlt className="text-zinc-700" />
                  <span className="text-zinc-700 text-[8px] font-mono tracking-wider uppercase">Secured by IntaSend &middot; M-Pesa &amp; Card</span>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2">
            <div className="sticky top-24 border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl">
              <div className="border-b border-white/[0.06] px-6 py-4">
                <h2 className="text-white text-sm font-semibold flex items-center gap-2">
                  <FaTicketAlt style={{ color: accent }} /> Order Summary
                </h2>
              </div>

              <div className="p-6">
                {event && (
                  <div className="mb-4 pb-4 border-b border-white/[0.04]">
                    <div className="text-white text-xs font-semibold">{event.title}</div>
                    <div className="text-zinc-600 text-[9px] font-mono mt-0.5">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  {tickets.map(ticket => {
                    const qty = quantities[ticket.id] || 0;
                    if (qty === 0) return null;
                    return (
                      <div key={ticket.id} className="flex justify-between items-start border-b border-white/[0.04] pb-3">
                        <div className="flex-1">
                          <div className="text-white text-xs font-semibold">{ticket.name}</div>
                          <div className="text-zinc-600 text-[10px] font-mono">Qty: {qty}</div>
                          <button onClick={() => updateQty(ticket.id, 0)}
                            onMouseEnter={() => setRemoveHoveredId(ticket.id)}
                            onMouseLeave={() => setRemoveHoveredId(null)}
                            className="text-[8px] font-mono mt-1 flex items-center gap-1 transition-colors"
                            style={{ color: removeHoveredId === ticket.id ? accent : accent }}>
                            <FaTrash className="text-[8px]" /> Remove
                          </button>
                        </div>
                        <div className="text-white text-sm font-mono tabular-nums">KES {(parseFloat(ticket.price) * qty).toLocaleString()}</div>
                      </div>
                    );
                  })}

                  {totalItems === 0 && !error && (
                    <div className="text-zinc-600 text-xs text-center py-6 font-mono">No items in your order</div>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  <div className="flex justify-between text-zinc-500 text-xs">
                    <span className="font-mono">Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                    <span className="font-mono tabular-nums">KES {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white text-base font-black">
                    <span className="tracking-wider uppercase">Total</span>
                    <span className="font-mono tabular-nums" style={{ color: accent }}>KES {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2 text-zinc-700 text-[8px] font-mono tracking-wider uppercase">
                    <FaLock className="text-[10px]" /> Encrypted Payment
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
