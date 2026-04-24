export function GrainOverlay() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.18] mix-blend-overlay z-50"
    >
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}

export function Aura() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 h-[1100px] w-[1100px] max-w-[140vw] max-h-[140vw] rounded-full blur-3xl animate-breathe animate-drift"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(232,228,219,0.22) 0%, rgba(232,228,219,0.08) 35%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,228,219,0.15) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

export function Vignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.75) 100%)",
      }}
    />
  );
}
