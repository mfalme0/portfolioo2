'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { HomelabService } from '@/lib/homelab-data';

const statusConfig = {
  active: { label: 'ACTIVE', color: 'bg-emerald-500', textColor: 'text-emerald-400', borderColor: 'border-emerald-500/20', bgColor: 'bg-emerald-500/5' },
  passive: { label: 'PASSIVE', color: 'bg-amber-500', textColor: 'text-amber-400', borderColor: 'border-amber-500/20', bgColor: 'bg-amber-500/5' },
  planned: { label: 'PLANNED', color: 'bg-zinc-500', textColor: 'text-zinc-400', borderColor: 'border-zinc-500/20', bgColor: 'bg-zinc-500/5' },
};

export default function ServiceModal({
  service,
  machineName,
  onClose,
}: {
  service: HomelabService;
  machineName: string;
  onClose: () => void;
}) {
  const cfg = statusConfig[service.status];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-xl p-6 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full border border-white/[0.06] text-zinc-500 hover:text-white hover:border-white/[0.15] transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            {service.icon && (
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden"
                style={{ backgroundColor: `rgba(255,255,255,0.04)`, border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <img src={service.icon} alt={service.name} className="w-6 h-6 object-contain" />
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`relative flex h-2.5 w-2.5`}>
                  {service.status === 'active' && (
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${cfg.color} opacity-75`} />
                  )}
                  <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${cfg.color}`} />
                </span>
                <span className={`text-[9px] font-bold tracking-[0.25em] uppercase ${cfg.textColor}`}>
                  {cfg.label}
                </span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight mt-1">
                {service.name}
              </h2>
            </div>
          </div>

          {/* Machine label */}
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[8px] font-mono tracking-wider border border-white/[0.06] bg-white/[0.03] text-zinc-500 mb-4">
            <svg className="w-3 h-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            {machineName}
          </div>

          {/* Description */}
          {service.description && (
            <p className="text-sm text-zinc-400 font-mono leading-relaxed mb-6">
              {service.description}
            </p>
          )}

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {service.port && (
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-1">PORT</div>
                <div className="text-sm font-semibold text-white font-mono">{service.port}</div>
              </div>
            )}
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-1">STATUS</div>
              <div className={`text-sm font-semibold font-mono ${cfg.textColor}`}>{cfg.label}</div>
            </div>
          </div>

          {service.url && (
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-cyan-500/70 hover:text-cyan-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {service.url}
            </a>
          )}

          {service.dockerHubUrl && (
            <a
              href={service.dockerHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border"
              style={{
                borderColor: 'rgba(0, 200, 255, 0.15)',
                color: 'rgba(0, 200, 255, 0.7)',
                background: 'rgba(0, 200, 255, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.3)';
                e.currentTarget.style.background = 'rgba(0, 200, 255, 0.08)';
                e.currentTarget.style.boxShadow = '0 0 20px -8px rgba(0, 200, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 200, 255, 0.15)';
                e.currentTarget.style.background = 'rgba(0, 200, 255, 0.04)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.983 1.166c-1.357 0-2.642.528-3.6 1.486l-4.13 4.13-4.13 4.13c-.914.914-1.486 2.157-1.486 3.514 0 1.358.528 2.643 1.486 3.6l4.13 4.13 4.13 4.13c.914.914 2.157 1.486 3.514 1.486 1.358 0 2.643-.528 3.6-1.486l4.13-4.13 4.13-4.13c.914-.914 1.486-2.157 1.486-3.514 0-1.358-.528-2.643-1.486-3.6l-4.13-4.13-4.13-4.13c-.914-.915-2.157-1.486-3.514-1.486zm0 2c.892 0 1.786.348 2.457 1.02l3.943 3.943 3.943 3.943c.672.672 1.02 1.594 1.02 2.457 0 .893-.348 1.786-1.02 2.457l-3.943 3.943-3.943 3.943c-.672.672-1.594 1.02-2.457 1.02-.893 0-1.786-.348-2.457-1.02l-3.943-3.943-3.943-3.943c-.672-.672-1.02-1.594-1.02-2.457 0-.893.348-1.786 1.02-2.457l3.943-3.943 3.943-3.943c.672-.672 1.565-1.02 2.457-1.02zm-1.643 5.643c-.42 0-.78.15-1.08.45l-3.54 3.54c-.3.3-.45.66-.45 1.08 0 .42.15.78.45 1.08l3.54 3.54c.3.3.66.45 1.08.45.42 0 .78-.15 1.08-.45l3.54-3.54c.3-.3.45-.66.45-1.08 0-.42-.15-.78-.45-1.08l-3.54-3.54c-.3-.3-.66-.45-1.08-.45z" />
              </svg>
              DOCKER HUB
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
