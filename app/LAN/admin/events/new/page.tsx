'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

export default function NewEventPage() {
  const { accent } = useTheme();
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', slug: '', description: '', date: '', endDate: '', location: '',
    bannerUrl: '', posterUrl: '', maxAttendees: '', published: false,
  });
  const [tickets, setTickets] = useState([{ name: '', description: '', price: '', quantity: '', maxPerOrder: '10' }]);
  const [saving, setSaving] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  function addTicket() { setTickets(prev => [...prev, { name: '', description: '', price: '', quantity: '', maxPerOrder: '10' }]); }
  function removeTicket(idx: number) { setTickets(prev => prev.filter((_, i) => i !== idx)); }
  function updateTicket(idx: number, field: string, value: string) { setTickets(prev => prev.map((t, i) => i === idx ? { ...t, [field]: value } : t)); }

  function generateSlug(title: string) {
    setForm(prev => ({ ...prev, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), title }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          maxAttendees: form.maxAttendees ? parseInt(form.maxAttendees) : undefined,
          date: new Date(form.date).toISOString(),
          endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
        }),
      });
      if (!res.ok) { const data = await res.json(); alert(data.error || 'Failed to create event'); return; }
      const event = await res.json();
      for (const ticket of tickets) {
        await fetch('/api/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: event.id, name: ticket.name, description: ticket.description, price: ticket.price, quantity: parseInt(ticket.quantity), maxPerOrder: parseInt(ticket.maxPerOrder) }),
        });
      }
      router.push('/LAN/admin/events');
    } catch { alert('Failed to create event'); }
    finally { setSaving(false); }
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="relative z-10 max-w-3xl mx-auto p-6">
        <div className="mb-10">
          <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">Event Creation</div>
          <h1 className="text-3xl font-black text-white mt-1 tracking-[-0.02em] uppercase">New Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 space-y-6">
            <h2 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">Event Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Title</label>
                <input type="text" value={form.title} onChange={e => generateSlug(e.target.value)}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'title' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Slug</label>
                <input type="text" value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm font-mono focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'slug' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('slug')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Location</label>
                <input type="text" value={form.location} onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'location' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Description</label>
              <textarea value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} rows={4}
                className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ borderColor: focusedField === 'description' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Start Date</label>
                <input type="datetime-local" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'date' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('date')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">End Date</label>
                <input type="datetime-local" value={form.endDate} onChange={e => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'endDate' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('endDate')}
                  onBlur={() => setFocusedField(null)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Banner Image URL</label>
                <input type="url" value={form.bannerUrl} onChange={e => setForm(prev => ({ ...prev, bannerUrl: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'bannerUrl' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('bannerUrl')}
                  onBlur={() => setFocusedField(null)} />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Poster Image URL</label>
                <input type="url" value={form.posterUrl} onChange={e => setForm(prev => ({ ...prev, posterUrl: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'posterUrl' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('posterUrl')}
                  onBlur={() => setFocusedField(null)} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Max Attendees</label>
              <input type="number" value={form.maxAttendees} onChange={e => setForm(prev => ({ ...prev, maxAttendees: e.target.value }))}
                className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ borderColor: focusedField === 'maxAttendees' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                onFocus={() => setFocusedField('maxAttendees')}
                onBlur={() => setFocusedField(null)}
                placeholder="Leave empty for unlimited" />
            </div>

            <label className="flex items-center gap-3">
              <input type="checkbox" checked={form.published} onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))} className="w-4 h-4" style={{ accentColor: accent }} />
              <span className="text-white text-sm">Publish immediately</span>
            </label>
          </div>

          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-sm font-semibold text-white">Ticket Types</h2>
              <button type="button" onClick={addTicket}
                className="px-3 py-1.5 border text-zinc-400 text-[10px] font-mono transition-all"
                style={{ borderColor: hoveredBtn === 'addTicket' ? `${accent}4d` : 'rgba(255,255,255,0.06)', color: hoveredBtn === 'addTicket' ? accent : '#a1a1aa' }}
                onMouseEnter={() => setHoveredBtn('addTicket')}
                onMouseLeave={() => setHoveredBtn(null)}>+ Add Ticket</button>
            </div>

            {tickets.map((ticket, idx) => (
              <div key={idx} className="border border-white/[0.06] bg-zinc-900/30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">Ticket {idx + 1}</span>
                  {tickets.length > 1 && (
                    <button type="button" onClick={() => removeTicket(idx)}
                      className="text-[10px] font-mono"
                      style={{ color: hoveredBtn === `remove-${idx}` ? `${accent}cc` : accent }}
                      onMouseEnter={() => setHoveredBtn(`remove-${idx}`)}
                      onMouseLeave={() => setHoveredBtn(null)}>Remove</button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Name</label>
                    <input type="text" value={ticket.name} onChange={e => updateTicket(idx, 'name', e.target.value)}
                      className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                      style={{ borderColor: focusedField === `ticketName-${idx}` ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                      onFocus={() => setFocusedField(`ticketName-${idx}`)}
                      onBlur={() => setFocusedField(null)} required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Price (KES)</label>
                    <input type="number" step="0.01" value={ticket.price} onChange={e => updateTicket(idx, 'price', e.target.value)}
                      className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                      style={{ borderColor: focusedField === `ticketPrice-${idx}` ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                      onFocus={() => setFocusedField(`ticketPrice-${idx}`)}
                      onBlur={() => setFocusedField(null)} required />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Description</label>
                  <input type="text" value={ticket.description} onChange={e => updateTicket(idx, 'description', e.target.value)}
                    className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                    style={{ borderColor: focusedField === `ticketDesc-${idx}` ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                    onFocus={() => setFocusedField(`ticketDesc-${idx}`)}
                    onBlur={() => setFocusedField(null)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Quantity</label>
                    <input type="number" value={ticket.quantity} onChange={e => updateTicket(idx, 'quantity', e.target.value)}
                      className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                      style={{ borderColor: focusedField === `ticketQty-${idx}` ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                      onFocus={() => setFocusedField(`ticketQty-${idx}`)}
                      onBlur={() => setFocusedField(null)} required />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Max Per Order</label>
                    <input type="number" value={ticket.maxPerOrder} onChange={e => updateTicket(idx, 'maxPerOrder', e.target.value)}
                      className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                      style={{ borderColor: focusedField === `ticketMax-${idx}` ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                      onFocus={() => setFocusedField(`ticketMax-${idx}`)}
                      onBlur={() => setFocusedField(null)} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="px-8 py-3 text-black text-sm font-semibold transition-all disabled:opacity-50 uppercase tracking-wider"
              style={{ backgroundColor: hoveredBtn === 'submit' ? `${accent}cc` : accent }}
              onMouseEnter={() => setHoveredBtn('submit')}
              onMouseLeave={() => setHoveredBtn(null)}>
              {saving ? 'CREATING...' : 'CREATE EVENT'}
            </button>
            <button type="button" onClick={() => router.back()}
              className="px-8 py-3 border text-zinc-400 text-sm font-mono transition-all"
              style={{ borderColor: hoveredBtn === 'cancel' ? `${accent}4d` : 'rgba(255,255,255,0.06)', color: hoveredBtn === 'cancel' ? accent : '#a1a1aa' }}
              onMouseEnter={() => setHoveredBtn('cancel')}
              onMouseLeave={() => setHoveredBtn(null)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
