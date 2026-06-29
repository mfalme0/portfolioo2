'use client';

import type { GearSpec } from '@/lib/gear-data';

export default function ConnectivityTerminal({
  slug,
  connectivity,
}: {
  slug: string;
  connectivity: GearSpec[];
}) {
  const terminalId = `terminal_id:[${slug}_io]`;
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  return (
    <div className="w-full rounded-lg border border-white/[0.06] bg-black/40 overflow-hidden font-mono">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-white/[0.03]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[9px] text-zinc-600 tracking-wider ml-2">connectivity_terminal</span>
      </div>

      {/* Terminal body */}
      <div className="px-3 py-3 space-y-1.5 text-[10px] leading-relaxed">
        <div className="text-zinc-600">$ {terminalId}</div>
        <div className="text-zinc-600">$ system_uptime: {now}</div>
        <div className="text-zinc-500">$ scan_ports --all</div>
        {connectivity.map((port, i) => (
          <div key={i} className="flex items-start gap-2 text-zinc-400">
            <span className="text-zinc-600 shrink-0">[{i + 1}]</span>
            <span className="text-emerald-400/80 shrink-0">[PORT]</span>
            <span className="text-zinc-300">{port.label}</span>
            {port.tag && (
              <span className="text-zinc-600">
                // <span className="text-zinc-500">{port.tag}</span>
              </span>
            )}
          </div>
        ))}
        <div className="text-emerald-400/60 mt-1">
          $ scan complete — {connectivity.length} port{connectivity.length > 1 ? 's' : ''} detected
        </div>
      </div>
    </div>
  );
}
