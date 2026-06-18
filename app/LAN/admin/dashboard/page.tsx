'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

interface DashboardData {
  totalRevenue: string;
  totalAttendees: number;
  activeDiscounts: number;
  orderStats: { status: string; count: number }[];
  recentOrders: any[];
  events: any[];
}

export default function AdminDashboard() {
  const { accent } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredEvents, setHoveredEvents] = useState(false);
  const [hoveredAttendees, setHoveredAttendees] = useState(false);
  const [hoveredOrders, setHoveredOrders] = useState(false);
  const [hoveredDiscounts, setHoveredDiscounts] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/stats')
      .then(res => {
        if (res.status === 401) router.push('/LAN/admin/login');
        return res.json();
      })
      .then(setData)
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">LOADING...</div></div>;
  }

  const paidCount = data?.orderStats?.find(s => s.status === 'paid')?.count || 0;
  const pendingCount = data?.orderStats?.find(s => s.status === 'pending')?.count || 0;

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">Command Center</div>
            <h1 className="text-3xl font-black text-white mt-1 tracking-[-0.02em] uppercase">Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/LAN/admin/events"
              className="px-4 py-2 border text-zinc-400 text-[10px] font-mono transition-all"
              style={{ color: hoveredEvents ? accent : '#a1a1aa', borderColor: hoveredEvents ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
              onMouseEnter={() => setHoveredEvents(true)}
              onMouseLeave={() => setHoveredEvents(false)}>Events</Link>
            <Link href="/LAN/admin/attendees"
              className="px-4 py-2 border text-zinc-400 text-[10px] font-mono transition-all"
              style={{ color: hoveredAttendees ? accent : '#a1a1aa', borderColor: hoveredAttendees ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
              onMouseEnter={() => setHoveredAttendees(true)}
              onMouseLeave={() => setHoveredAttendees(false)}>Attendees</Link>
            <Link href="/LAN/admin/orders"
              className="px-4 py-2 border text-zinc-400 text-[10px] font-mono transition-all"
              style={{ color: hoveredOrders ? accent : '#a1a1aa', borderColor: hoveredOrders ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
              onMouseEnter={() => setHoveredOrders(true)}
              onMouseLeave={() => setHoveredOrders(false)}>Orders</Link>
            <Link href="/LAN/admin/discounts"
              className="px-4 py-2 border text-zinc-400 text-[10px] font-mono transition-all"
              style={{ color: hoveredDiscounts ? accent : '#a1a1aa', borderColor: hoveredDiscounts ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
              onMouseEnter={() => setHoveredDiscounts(true)}
              onMouseLeave={() => setHoveredDiscounts(false)}>Discounts</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.04] mb-10">
          <div className="bg-white/[0.02] backdrop-blur-xl p-6">
            <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Total Revenue</div>
            <div className="text-2xl font-bold text-white">KES {parseFloat(data?.totalRevenue || '0').toLocaleString()}</div>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-xl p-6">
            <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Attendees</div>
            <div className="text-2xl font-bold text-white">{data?.totalAttendees || 0}</div>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-xl p-6">
            <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Paid Orders</div>
            <div className="text-2xl font-bold text-emerald-400">{paidCount}</div>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-xl p-6">
            <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Active Codes</div>
            <div className="text-2xl font-bold" style={{ color: accent }}>{data?.activeDiscounts || 0}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.04]">
          <div className="bg-white/[0.02] backdrop-blur-xl">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
            </div>
            <div className="p-6">
              {data?.recentOrders?.length === 0 ? (
                <p className="text-zinc-600 text-sm">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {data?.recentOrders?.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <div>
                        <div className="text-white text-sm">{order.customerName}</div>
                        <div className="text-zinc-600 text-xs font-mono">{order.customerEmail}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">KES {order.totalAmount}</div>
                        <div className={`text-xs font-mono`} style={{ color: order.status === 'paid' ? '#34d399' : order.status === 'pending' ? '#eab308' : accent }}>
                          {order.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h2 className="text-sm font-semibold text-white">Events Overview</h2>
            </div>
            <div className="p-6">
              {data?.events?.length === 0 ? (
                <p className="text-zinc-600 text-sm">No events created</p>
              ) : (
                <div className="space-y-3">
                  {data?.events?.map((event: any) => (
                    <div key={event.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <div>
                        <div className="text-white text-sm">{event.title}</div>
                        <div className="text-zinc-600 text-xs font-mono">{event.ticketCount} tickets</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">KES {parseFloat(event.revenue).toLocaleString()}</div>
                        <div className={`text-xs font-mono ${event.published ? 'text-emerald-400' : 'text-zinc-600'}`}>
                          {event.published ? 'PUBLISHED' : 'DRAFT'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
