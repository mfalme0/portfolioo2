'use client';
import { Suspense, useEffect, useState } from 'react';
import { useTheme } from '../../Context/theme';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/Components/header';

function ThankYouContent() {
  const { accent } = useTheme();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const [order, setOrder] = useState<any>(null);
  const [backBtnHovered, setBackBtnHovered] = useState(false);
  const [supportHovered, setSupportHovered] = useState(false);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders?id=${orderId}`)
        .then(res => res.json())
        .then(data => setOrder(data))
        .catch(() => {});
    }
  }, [orderId]);

  return (
    <div className="max-w-lg mx-auto p-6 pt-24 text-center">
      <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-10">
        <div className="w-16 h-16 border rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ borderColor: accent + '33', backgroundColor: accent + '0d' }}>
          <svg className="w-8 h-8" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase mb-2">Payment Initiated</div>
        <h1 className="text-3xl font-black text-white mb-4 tracking-[-0.02em] uppercase">Check Your Phone</h1>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
          Enter your M-Pesa PIN on the STK Push sent to your phone to complete payment.
          Your tickets will be emailed to you once confirmed.
        </p>

        {order && (
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 mb-6 text-left">
            <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-1">Order Reference</div>
            <div className="text-white font-mono text-sm">#{order.id?.slice(0, 8).toUpperCase()}</div>
            {order.totalAmount && (
              <div className="text-zinc-500 text-xs mt-2">Amount: KES {order.totalAmount}</div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/LAN"
            onMouseEnter={() => setBackBtnHovered(true)}
            onMouseLeave={() => setBackBtnHovered(false)}
            className="py-3 text-black text-sm font-semibold transition-all uppercase tracking-wider"
            style={{ backgroundColor: accent, ...(backBtnHovered ? { filter: 'brightness(1.2)' } : {}) }}>
            BACK TO EVENTS
          </Link>
          <a href="mailto:support@lanparty.com"
            onMouseEnter={() => setSupportHovered(true)}
            onMouseLeave={() => setSupportHovered(false)}
            className="text-zinc-600 text-[10px] font-mono transition-colors"
            style={{ color: supportHovered ? accent : undefined }}>
            Need help? Contact support
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <Header />
      {/* Grid + noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <Suspense fallback={<div className="max-w-lg mx-auto p-6 pt-24 text-center"><div className="text-zinc-600 text-[10px] font-mono tracking-widest animate-pulse">LOADING...</div></div>}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
}
