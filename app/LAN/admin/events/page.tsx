'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

export default function AdminEventsPage() {
  const { accent } = useTheme();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredNew, setHoveredNew] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/events?all=true')
      .then(res => {
        if (res.status === 401) router.push('/LAN/admin/login');
        return res.json();
      })
      .then(setEvents)
      .finally(() => setLoading(false));
  }, [router]);

  async function deleteEvent(id: string) {
    if (!confirm('Delete this event? This cannot be undone.')) return;
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  async function togglePublish(id: string, current: boolean) {
    await fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !current }),
    });
    setEvents(prev => prev.map(e => e.id === id ? { ...e, published: !current } : e));
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
            <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">Event Management</div>
            <h1 className="text-3xl font-black text-white mt-1 tracking-[-0.02em] uppercase">Events</h1>
          </div>
          <Link href="/LAN/admin/events/new"
            className="px-6 py-3 text-black text-xs font-semibold transition-all uppercase tracking-wider"
            style={{ backgroundColor: hoveredNew ? `${accent}cc` : accent }}
            onMouseEnter={() => setHoveredNew(true)}
            onMouseLeave={() => setHoveredNew(false)}>+ New Event</Link>
        </div>

        {events.length === 0 ? (
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-12 text-center">
            <p className="text-zinc-600 text-sm mb-4">No events yet</p>
            <Link href="/LAN/admin/events/new" className="text-sm hover:underline" style={{ color: accent }}>Create your first event</Link>
          </div>
        ) : (
          <div className="space-y-px bg-white/[0.04] border border-white/[0.04]">
            {events.map(event => (
              <div key={event.id}
                className="bg-white/[0.02] backdrop-blur-xl p-6 flex items-center justify-between transition-colors"
                style={{ border: hoveredItem === `row-${event.id}` ? `1px solid ${accent}33` : '1px solid transparent' }}
                onMouseEnter={() => setHoveredItem(`row-${event.id}`)}
                onMouseLeave={() => setHoveredItem(null)}>
                <div className="flex items-center gap-6">
                  {event.bannerUrl && (
                    <img src={event.bannerUrl} alt="" className="w-20 h-20 object-cover grayscale-[20%]" />
                  )}
                  <div>
                    <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                    <div className="text-zinc-600 text-xs font-mono mt-1">
                      {new Date(event.date).toLocaleDateString()} &middot; {event.location}
                    </div>
                    <div className="flex gap-3 mt-2">
                      <span className={`text-[9px] font-mono px-2 py-0.5 ${event.published ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border border-white/10'}`}>
                        {event.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-600">/{event.slug}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePublish(event.id, event.published)}
                    className="px-3 py-1.5 border text-zinc-400 text-[10px] font-mono transition-all"
                    style={{ borderColor: hoveredItem === `pub-${event.id}` ? `${accent}4d` : 'rgba(255,255,255,0.06)', color: hoveredItem === `pub-${event.id}` ? accent : '#a1a1aa' }}
                    onMouseEnter={() => setHoveredItem(`pub-${event.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}>
                    {event.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link href={`/LAN/admin/events/${event.id}/edit`}
                    className="px-3 py-1.5 border text-zinc-400 text-[10px] font-mono transition-all"
                    style={{ borderColor: hoveredItem === `edit-${event.id}` ? `${accent}4d` : 'rgba(255,255,255,0.06)', color: hoveredItem === `edit-${event.id}` ? accent : '#a1a1aa' }}
                    onMouseEnter={() => setHoveredItem(`edit-${event.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}>Edit</Link>
                  <button onClick={() => deleteEvent(event.id)}
                    className="px-3 py-1.5 text-[10px] font-mono transition-all"
                    style={{ border: `1px solid ${accent}33`, color: accent, backgroundColor: hoveredItem === `del-${event.id}` ? `${accent}4d` : 'transparent' }}
                    onMouseEnter={() => setHoveredItem(`del-${event.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
