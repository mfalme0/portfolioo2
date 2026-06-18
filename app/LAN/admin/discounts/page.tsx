'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

export default function AdminDiscountsPage() {
  const { accent } = useTheme();
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'percentage', value: '', maxUses: '', expiresAt: '', eventId: '' });
  const [events, setEvents] = useState<any[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch('/api/discounts').then(r => r.json()),
      fetch('/api/events?all=true').then(r => r.json()),
    ]).then(([codesData, eventsData]) => { setCodes(codesData); setEvents(eventsData); })
    .finally(() => setLoading(false));
  }, []);

  async function createCode(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, value: form.value, maxUses: form.maxUses ? parseInt(form.maxUses) : null, expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null, eventId: form.eventId || null }),
      });
      if (!res.ok) { const data = await res.json(); alert(data.error || 'Failed to create'); return; }
      const newCode = await res.json();
      setCodes(prev => [newCode, ...prev]);
      setShowForm(false);
      setForm({ code: '', type: 'percentage', value: '', maxUses: '', expiresAt: '', eventId: '' });
    } catch { alert('Failed to create discount code'); }
  }

  async function toggleActive(id: string, current: boolean) {
    await fetch('/api/discounts/' + id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !current }) });
    setCodes(prev => prev.map(c => c.id === id ? { ...c, active: !current } : c));
  }

  async function deleteCode(id: string) {
    if (!confirm('Delete this discount code?')) return;
    await fetch('/api/discounts/' + id, { method: 'DELETE' });
    setCodes(prev => prev.filter(c => c.id !== id));
  }

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">LOADING...</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="relative z-10 max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">Discount Management</div>
            <h1 className="text-3xl font-black text-white mt-1 tracking-[-0.02em] uppercase">Discount Codes</h1>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 text-black text-xs font-semibold transition-all uppercase tracking-wider"
            style={{ backgroundColor: hoveredBtn === 'toggleForm' ? accent + 'cc' : accent }}
            onMouseEnter={() => setHoveredBtn('toggleForm')}
            onMouseLeave={() => setHoveredBtn(null)}>
            {showForm ? 'CANCEL' : '+ NEW CODE'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={createCode} className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 mb-8 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">Create Discount Code</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Code</label>
                <input type="text" value={form.code} onChange={e => setForm(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm font-mono focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'code' ? accent + '4d' : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('code')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Type</label>
                <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'type' ? accent + '4d' : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('type')}
                  onBlur={() => setFocusedField(null)}>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">{form.type === 'percentage' ? 'Percentage (%)' : 'Amount (KES)'}</label>
                <input type="number" step="0.01" value={form.value} onChange={e => setForm(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'value' ? accent + '4d' : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('value')}
                  onBlur={() => setFocusedField(null)} required />
              </div>
              <div>
                <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Max Uses</label>
                <input type="number" value={form.maxUses} onChange={e => setForm(prev => ({ ...prev, maxUses: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'maxUses' ? accent + '4d' : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('maxUses')}
                  onBlur={() => setFocusedField(null)} placeholder="Unlimited" />
              </div>
              <div>
                <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Expires</label>
                <input type="datetime-local" value={form.expiresAt} onChange={e => setForm(prev => ({ ...prev, expiresAt: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'expiresAt' ? accent + '4d' : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('expiresAt')}
                  onBlur={() => setFocusedField(null)} />
              </div>
              <div>
                <label className="block text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Event (optional)</label>
                <select value={form.eventId} onChange={e => setForm(prev => ({ ...prev, eventId: e.target.value }))}
                  className="w-full bg-zinc-900/50 border px-3 py-2 text-white text-sm focus:outline-none transition-colors"
                  style={{ borderColor: focusedField === 'eventId' ? accent + '4d' : 'rgba(255,255,255,0.06)' }}
                  onFocus={() => setFocusedField('eventId')}
                  onBlur={() => setFocusedField(null)}>
                  <option value="">All Events</option>
                  {events.map((event: any) => (<option key={event.id} value={event.id}>{event.title}</option>))}
                </select>
              </div>
            </div>
            <button type="submit"
              className="px-6 py-2.5 text-black text-xs font-semibold transition-all uppercase tracking-wider"
              style={{ backgroundColor: hoveredBtn === 'create' ? accent + 'cc' : accent }}
              onMouseEnter={() => setHoveredBtn('create')}
              onMouseLeave={() => setHoveredBtn(null)}>CREATE CODE</button>
          </form>
        )}

        {codes.length === 0 ? (
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-12 text-center">
            <p className="text-zinc-600 text-sm">No discount codes yet</p>
          </div>
        ) : (
          <div className="space-y-px bg-white/[0.04] border border-white/[0.04]">
            {codes.map(code => (
              <div key={code.id} className="bg-white/[0.02] backdrop-blur-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-900/50 border border-white/[0.06] px-4 py-2">
                    <span className="text-white font-mono text-sm font-bold">{code.code}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm">{code.type === 'percentage' ? code.value + '% OFF' : 'KES ' + code.value + ' OFF'}</div>
                    <div className="text-zinc-600 text-xs font-mono mt-0.5">
                      Used {code.usedCount}/{code.maxUses || '∞'} &middot;
                      {code.expiresAt ? ' Expires ' + new Date(code.expiresAt).toLocaleDateString() : ' No expiry'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleActive(code.id, code.active)}
                    className={'px-3 py-1.5 border text-[10px] font-mono transition-all ' + (code.active ? 'border-emerald-500/20 text-emerald-400' : 'border-white/[0.06] text-zinc-600')}
                    style={!code.active ? { color: hoveredBtn === 'toggle-' + code.id ? accent : '#52525b', borderColor: hoveredBtn === 'toggle-' + code.id ? accent + '4d' : 'rgba(255,255,255,0.06)' } : undefined}
                    onMouseEnter={() => setHoveredBtn('toggle-' + code.id)}
                    onMouseLeave={() => setHoveredBtn(null)}>
                    {code.active ? 'ACTIVE' : 'INACTIVE'}
                  </button>
                  <button onClick={() => deleteCode(code.id)}
                    className="px-3 py-1.5 text-[10px] font-mono transition-all"
                    style={{ border: '1px solid ' + accent + '33', color: accent, backgroundColor: hoveredBtn === 'del-' + code.id ? accent + '4d' : 'transparent' }}
                    onMouseEnter={() => setHoveredBtn('del-' + code.id)}
                    onMouseLeave={() => setHoveredBtn(null)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}