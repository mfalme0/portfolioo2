'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { label: 'Home', href: '/' },
  { label: 'Gear', href: '/gear' },
  { label: 'Homelab', href: '/homelab' },
  { label: 'LAN', href: '/LAN' },
];

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="section-grid vintage-frame relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center px-6">
      <div className="rog-hex-grid" />
      <div className="rog-scanline" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-15%] right-[-10%] h-[600px] w-[600px] rounded-full blur-[260px]"
          style={{ background: 'var(--color-accent)', opacity: 0.06 }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full blur-[240px]"
          style={{ background: 'var(--color-accent)', opacity: 0.04 }}
        />
      </div>

      <div className="rog-reveal relative z-10 w-full max-w-xl text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
          <span className="apple-eyebrow-accent">System // Route Resolution</span>
        </div>

        <div className="relative">
          <span
            className="block font-black leading-[0.85] tracking-[-0.05em] text-[clamp(6rem,22vw,11rem)]"
            style={{ color: 'var(--color-accent)', textShadow: '0 0 80px rgb(var(--accent-rgb) / 0.25)' }}
          >
            404
          </span>
        </div>

        <h1 className="apple-heading-compact mt-2 mb-6">
          Route{' '}
          <span className="font-bold" style={{ color: 'var(--color-accent)' }}>
            Not Found.
          </span>
        </h1>

        <div className="apple-card-flat mx-auto mb-10 max-w-md overflow-hidden text-left">
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--color-border)', background: 'rgb(var(--accent-rgb) / 0.04)' }}
          >
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
              resolver.log
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--accent-rgb) / 0.8)' }}>
              exit 404
            </span>
          </div>
          <div className="px-4 py-4 font-mono text-[11px] leading-relaxed">
            <p style={{ color: 'var(--color-muted)' }}>
              <span className="opacity-50">$</span> resolve{' '}
              <span style={{ color: 'var(--color-foreground)' }}>{pathname || '/unknown'}</span>
            </p>
            <p style={{ color: 'var(--color-accent)' }}>
              <span className="opacity-60">›</span> no matching route in table
              <span className="ml-0.5 inline-block w-[6px] h-[12px] align-middle" style={{ backgroundColor: 'var(--color-accent)' }} />
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <Link
            href="/"
            className="rog-btn-primary group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative flex items-center gap-2">
              Return to Base
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </span>
          </Link>
          {routes.slice(1).map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rog-btn-secondary rounded-xl border border-(--color-border) px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {r.label}
            </Link>
          ))}
        </div>

        <div className="divider-ornament">Nairobi, Kenya</div>
      </div>
    </div>
  );
}
