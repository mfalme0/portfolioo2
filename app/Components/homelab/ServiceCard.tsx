'use client';

import type { HomelabService } from '@/lib/homelab-data';

const statusConfig = {
  active: { dot: 'bg-emerald-400', ping: 'bg-emerald-400', label: 'ACTIVE', labelColor: 'text-emerald-400' },
  passive: { dot: 'bg-amber-400', ping: 'bg-amber-400', label: 'PASSIVE', labelColor: 'text-amber-400' },
  planned: { dot: 'bg-zinc-500', ping: 'bg-zinc-500', label: 'PLANNED', labelColor: 'text-zinc-500' },
};

export default function ServiceCard({ service }: { service: HomelabService }) {
  const cfg = statusConfig[service.status];

  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {service.icon && (
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md overflow-hidden"
                style={{ backgroundColor: `rgba(255,255,255,0.04)`, border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <img src={service.icon} alt={service.name} className="w-3.5 h-3.5 object-contain" />
              </span>
            )}
            <span className="relative flex h-2 w-2">
              {service.status === 'active' && (
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${cfg.ping} opacity-75`} />
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${cfg.dot}`} />
            </span>
            <h4 className="text-sm font-semibold text-white/85 truncate">{service.name}</h4>
          </div>
          {service.description && (
            <p className="text-[11px] text-zinc-500 font-mono leading-relaxed mt-1">
              {service.description}
            </p>
          )}
        </div>
        <span className={`shrink-0 text-[8px] font-bold tracking-[0.2em] uppercase ${cfg.labelColor}`}>
          {cfg.label}
        </span>
      </div>

      {service.port && (
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-mono tracking-wider bg-zinc-900/80 border border-zinc-800 text-zinc-500">
            <span className="text-zinc-600">PORT</span> {service.port}
          </span>
        </div>
      )}

      {service.url && (
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[9px] font-mono tracking-wider text-cyan-500/70 hover:text-cyan-400 transition-colors"
        >
          {service.url}
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      )}

      {service.dockerHubUrl && (
        <a
          href={service.dockerHubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[9px] font-mono tracking-wider text-sky-500/60 hover:text-sky-400 transition-colors"
        >
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.983 1.166c-1.357 0-2.642.528-3.6 1.486l-4.13 4.13-4.13 4.13c-.914.914-1.486 2.157-1.486 3.514 0 1.358.528 2.643 1.486 3.6l4.13 4.13 4.13 4.13c.914.914 2.157 1.486 3.514 1.486 1.358 0 2.643-.528 3.6-1.486l4.13-4.13 4.13-4.13c.914-.914 1.486-2.157 1.486-3.514 0-1.358-.528-2.643-1.486-3.6l-4.13-4.13-4.13-4.13c-.914-.915-2.157-1.486-3.514-1.486zm0 2c.892 0 1.786.348 2.457 1.02l3.943 3.943 3.943 3.943c.672.672 1.02 1.594 1.02 2.457 0 .893-.348 1.786-1.02 2.457l-3.943 3.943-3.943 3.943c-.672.672-1.594 1.02-2.457 1.02-.893 0-1.786-.348-2.457-1.02l-3.943-3.943-3.943-3.943c-.672-.672-1.02-1.594-1.02-2.457 0-.893.348-1.786 1.02-2.457l3.943-3.943 3.943-3.943c.672-.672 1.565-1.02 2.457-1.02z" />
          </svg>
          Docker Hub
        </a>
      )}
    </div>
  );
}
