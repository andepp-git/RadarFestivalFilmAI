// The concept asset: a live radar scope. Concentric rings + rotating sweep + blips.
// Motion is CSS-only and collapses to static under prefers-reduced-motion (see index.css).

const TICKS = Array.from({ length: 24 }, (_, i) => i);

// Blips = festival "contacts" on the scope. Positions in % of the box; center is 50/50.
const BLIPS = [
  { x: 71, y: 26, size: 9, cls: "animate-blip", ping: true, bright: true },
  { x: 33, y: 40, size: 6, cls: "animate-blip", delay: "1.1s" },
  { x: 60, y: 68, size: 5, cls: "animate-blip", delay: "0.5s" },
  { x: 44, y: 22, size: 4, cls: "" },
  { x: 78, y: 58, size: 4, cls: "" },
  { x: 26, y: 63, size: 4, cls: "" },
];

export default function RadarScope() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]"
    >
      {/* Rings, crosshair, ticks (static) */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="scopeFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(140,224,75,0.10)" />
            <stop offset="60%" stopColor="rgba(140,224,75,0.03)" />
            <stop offset="100%" stopColor="rgba(7,11,9,0)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="94" fill="url(#scopeFill)" />
        {[34, 60, 86].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="0.6"
          />
        ))}
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="0.8"
        />
        {/* crosshair */}
        <line x1="6" y1="100" x2="194" y2="100" stroke="var(--color-line)" strokeWidth="0.5" />
        <line x1="100" y1="6" x2="100" y2="194" stroke="var(--color-line)" strokeWidth="0.5" />
        {/* outer ticks */}
        {TICKS.map((i) => {
          const a = (i / TICKS.length) * Math.PI * 2;
          const major = i % 6 === 0;
          const r1 = major ? 86 : 90;
          const cx = 100 + Math.cos(a) * r1;
          const cy = 100 + Math.sin(a) * r1;
          const ex = 100 + Math.cos(a) * 94;
          const ey = 100 + Math.sin(a) * 94;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={ex}
              y2={ey}
              stroke={major ? "var(--color-signal-deep)" : "var(--color-line-strong)"}
              strokeWidth={major ? "1" : "0.5"}
            />
          );
        })}
      </svg>

      {/* Rotating sweep, masked to the scope circle */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="radar-sweep animate-radar-spin h-full w-full origin-center" />
      </div>

      {/* Blips */}
      {BLIPS.map((b, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        >
          {b.ping && (
            <span
              className="animate-ping-ring absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: b.size * 2.2,
                height: b.size * 2.2,
                border: "1px solid var(--color-signal)",
              }}
            />
          )}
          <span
            className={`block rounded-full ${b.cls}`}
            style={{
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
              background: b.bright ? "var(--color-signal-soft)" : "var(--color-signal)",
              boxShadow: b.bright
                ? "0 0 10px 1px rgba(140,224,75,0.7)"
                : "0 0 6px 0 rgba(140,224,75,0.35)",
            }}
          />
        </div>
      ))}

      {/* Center */}
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "var(--color-signal-soft)", boxShadow: "0 0 8px 1px rgba(140,224,75,0.6)" }}
      />
    </div>
  );
}
