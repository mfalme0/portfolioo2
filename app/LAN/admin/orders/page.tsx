'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

export default function AdminOrdersPage() {
  const { accent } = useTheme();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/orders')
      .then(res => {
        if (res.status === 401) router.push('/LAN/admin/login');
        return res.json();
      })
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><div className="text-zinc-600 font-mono text-[10px] tracking-widest animate-pulse">LOADING...</div></div>;
  }

  const totalRevenue = orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + parseFloat(o.totalAmount || '0'), 0);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase">Order Management</div>
            <h1 className="text-3xl font-black text-white mt-1 tracking-[-0.02em] uppercase">Orders</h1>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Total Revenue</div>
            <div className="text-xl font-bold" style={{ color: accent }}>KES {totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-12 text-center">
            <p className="text-zinc-600 text-sm">No orders yet</p>
          </div>
        ) : (
          <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Order ID</th>
                  <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Customer</th>
                  <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Amount</th>
                  <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Status</th>
                  <th className="text-left p-4 text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="p-4"><span className="text-xs font-mono" style={{ color: accent }}>#{order.id.slice(0, 8).toUpperCase()}</span></td>
                    <td className="p-4">
                      <div className="text-white text-sm">{order.customerName}</div>
                      <div className="text-zinc-600 text-xs">{order.customerEmail}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white text-sm">KES {parseFloat(order.totalAmount).toLocaleString()}</div>
                      {parseFloat(order.discountAmount || '0') > 0 && <div className="text-emerald-500 text-xs">-KES {order.discountAmount} discount</div>}
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] font-mono px-2 py-0.5 border ${
                        order.status === 'paid' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20' :
                        order.status === 'pending' ? 'bg-yellow-950/30 text-yellow-400 border-yellow-500/20' :
                        ''
                      }`} style={
                        order.status !== 'paid' && order.status !== 'pending'
                          ? { backgroundColor: accent + '4d', color: accent, borderColor: accent + '33' }
                          : undefined
                      }>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4"><span className="text-zinc-600 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
