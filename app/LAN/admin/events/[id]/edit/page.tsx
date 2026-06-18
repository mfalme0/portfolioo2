'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

export default function EditEventPage() {
  const { accent } = useTheme();
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title, slug: data.slug, description: data.description,
          date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '',
          endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : '',
          location: data.location, bannerUrl: data.bannerUrl || '', posterUrl: data.posterUrl || '',
          maxAttendees: data.maxAttendees?.toString() || '', published: data.published,
        });
        setTickets(data.ticketTypes || []);
      });
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/events/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, maxAttendees: form.maxAttendees ? parseInt(form.maxAttendees) : null, date: new Date(form.date).toISOString(), endDate: form.endDate ? new Date(form.endDate).toISOString() : null }),
      });
      if (!res.ok) { const data = await res.json(); alert(data.error || 'Failed to update'); return; }
      router.push('/LAN/admin/events');
    } catch { alert('Failed to update'); }
    finally { setSaving(false); }
  }

  if (!form) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">LOADING...</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="relative z-10 max-w-3xl mx-auto p-6">
        <div className="mb-10">
          <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">Event Editor</div>
          <h1 className="text-3xl font-black text-white mt-1 tracking-[-0.02em] uppercase">Edit Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 space-y-6">
            <h2 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">Event Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Title</label>
                <input type="text" value={form.title} onChange={e => setForm((prev: any) => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'title' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Slug</label>
                <input type="text" value={form.slug} onChange={e => setForm((prev: any) => ({ ...prev, slug: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm font-mono focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'slug' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('slug')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Location</label>
                <input type="text" value={form.location} onChange={e => setForm((prev: any) => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'location' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Description</label>
              <textarea value={form.description} onChange={e => setForm((prev: any) => ({ ...prev, description: e.target.value }))} rows={4}
                className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ borderColor: focusedField === 'description' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Start Date</label>
                <input type="datetime-local" value={form.date} onChange={e => setForm((prev: any) => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'date' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('date')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">End Date</label>
                <input type="datetime-local" value={form.endDate} onChange={e => setForm((prev: any) => ({ ...prev, endDate: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'endDate' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('endDate')}
                  onBlur={() => setFocusedField(null)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Banner URL</label>
                <input type="url" value={form.bannerUrl} onChange={e => setForm((prev: any) => ({ ...prev, bannerUrl: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'bannerUrl' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('bannerUrl')}
                  onBlur={() => setFocusedField(null)} />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Poster URL</label>
                <input type="url" value={form.posterUrl} onChange={e => setForm((prev: any) => ({ ...prev, posterUrl: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'posterUrl' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('posterUrl')}
                  onBlur={() => setFocusedField(null)} />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Max Attendees</label>
              <input type="number" value={form.maxAttendees} onChange={e => setForm((prev: any) => ({ ...prev, maxAttendees: e.target.value }))}
                className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ borderColor: focusedField === 'maxAttendees' ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                onFocus={() => setFocusedField('maxAttendees')}
                onBlur={() => setFocusedField(null)} />
            </div>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={form.published} onChange={e => setForm((prev: any) => ({ ...prev, published: e.target.checked }))} className="w-4 h-4" style={{ accentColor: accent }} />
              <span className="text-white text-sm">Published</span>
            </label>
          </div>

          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6">
            <h2 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3 mb-4">Tickets</h2>
            {tickets.length === 0 ? (
              <p className="text-zinc-600 text-sm">No tickets configured</p>
            ) : (
              <div className="space-y-3">
                {tickets.map((ticket: any) => (
                  <div key={ticket.id} className="border border-white/[0.06] bg-zinc-900/30 p-4 flex justify-between items-center">
                    <div>
                      <div className="text-white text-sm font-medium">{ticket.name}</div>
                      <div className="text-zinc-600 text-xs font-mono mt-1">KES {ticket.price} &middot; {ticket.remaining}/{ticket.quantity} remaining</div>
                    </div>
                    <div className="text-xs text-zinc-600 font-mono">Max {ticket.maxPerOrder}/order</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="px-8 py-3 text-black text-sm font-semibold transition-all disabled:opacity-50 uppercase tracking-wider"
              style={{ backgroundColor: hoveredBtn === 'submit' ? `${accent}cc` : accent }}
              onMouseEnter={() => setHoveredBtn('submit')}
              onMouseLeave={() => setHoveredBtn(null)}>
              {saving ? 'SAVING...' : 'SAVE CHANGES'}
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
