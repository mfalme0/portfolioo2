'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

export default function AdminAttendeesPage() {
  const { accent } = useTheme();
  const [attendees, setAttendees] = useState<any[]>([]);
  const [eventMap, setEventMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hoveredRemove, setHoveredRemove] = useState(false);
  const [hoveredSingle, setHoveredSingle] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/attendees')
      .then(res => {
        if (res.status === 401) router.push('/LAN/admin/login');
        return res.json();
      })
      .then(data => {
        setAttendees(data.attendees || []);
        setEventMap(data.eventMap || {});
      })
      .finally(() => setLoading(false));
  }, [router]);

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === attendees.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(attendees.map(a => a.id)));
    }
  }

  async function removeSelected() {
    if (selected.size === 0) return;
    if (!confirm(`Remove ${selected.size} attendee${selected.size > 1 ? 's' : ''}? This cannot be undone.`)) return;
    for (const id of selected) {
      await fetch(`/api/attendees?id=${id}`, { method: 'DELETE' });
    }
    setAttendees(prev => prev.filter(a => !selected.has(a.id)));
    setSelected(new Set());
  }

  async function removeSingle(id: string) {
    if (!confirm('Remove this attendee? This cannot be undone.')) return;
    await fetch(`/api/attendees?id=${id}`, { method: 'DELETE' });
    setAttendees(prev => prev.filter(a => a.id !== id));
  }

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">LOADING...</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">Attendee Management</div>
            <h1 className="text-3xl font-black text-white mt-1 tracking-[-0.02em] uppercase">Attendees</h1>
            <div className="text-zinc-600 text-xs font-mono mt-1">{attendees.length} registered</div>
          </div>
          {selected.size > 0 && (
            <button onClick={removeSelected}
              className="px-6 py-3 text-black text-xs font-semibold transition-all uppercase tracking-wider flex items-center gap-2"
              style={{ backgroundColor: hoveredRemove ? `${accent}cc` : `${accent}cc` }}
              onMouseEnter={() => setHoveredRemove(true)}
              onMouseLeave={() => setHoveredRemove(false)}>
              Remove {selected.size} Selected
            </button>
          )}
        </div>

        {attendees.length === 0 ? (
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-12 text-center">
            <p className="text-zinc-600 text-sm">No attendees yet</p>
          </div>
        ) : (
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="p-4 w-12">
                      <input type="checkbox" onChange={toggleSelectAll}
                        checked={selected.size === attendees.length && attendees.length > 0}
                        className="w-4 h-4 cursor-pointer" style={{ accentColor: accent }} />
                    </th>
                    <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Ticket #</th>
                    <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Name</th>
                    <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Email</th>
                    <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Phone</th>
                    <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Event</th>
                    <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Checked In</th>
                    <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Date</th>
                    <th className="p-4 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map(att => (
                    <tr key={att.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <input type="checkbox" checked={selected.has(att.id)} onChange={() => toggleSelect(att.id)}
                          className="w-4 h-4 cursor-pointer" style={{ accentColor: accent }} />
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-mono" style={{ color: accent }}>{att.ticketNumber}</span>
                      </td>
                      <td className="p-4">
                        <div className="text-white text-sm font-medium">{att.name}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-zinc-400 text-xs">{att.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-zinc-500 text-xs font-mono">{att.phone || '—'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-zinc-400 text-xs">{eventMap[att.eventId] || 'Unknown'}</div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[9px] font-mono px-2 py-0.5 border ${
                          att.checkedIn
                            ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20'
                            : 'bg-zinc-900 text-zinc-500 border-white/10'
                        }`}>
                          {att.checkedIn ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-zinc-600 text-xs font-mono">{new Date(att.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => removeSingle(att.id)}
                          className="px-2 py-1 text-[9px] font-mono transition-all"
                          style={{ border: `1px solid ${accent}33`, color: accent, backgroundColor: hoveredSingle === att.id ? `${accent}4d` : 'transparent' }}
                          onMouseEnter={() => setHoveredSingle(att.id)}
                          onMouseLeave={() => setHoveredSingle(null)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-[9px] font-mono tracking-[0.2em] text-zinc-700 uppercase text-center">
          {attendees.length} attendee{attendees.length !== 1 ? 's' : ''} registered
        </div>
      </div>
    </div>
  );
}
