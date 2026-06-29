'use client';

export default function ActiveService({ label = 'SERVICE_STATUS' }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/15">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-[9px] font-mono tracking-wider text-emerald-300 uppercase">{label}: ACTIVE</span>
    </div>
  );
}
