export default function DiagonalDivider({ accent, flip = false }: { accent: string; flip?: boolean }) {
  return (
    <div className="relative w-full h-10 md:h-14 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div
        className="absolute inset-y-0 left-0 right-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}30, transparent)`,
          clipPath: flip
            ? 'polygon(0 100%, 100% 0%, 100% 100%)'
            : 'polygon(0 0%, 100% 100%, 0% 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
      />
    </div>
  );
}
