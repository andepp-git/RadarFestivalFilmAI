import { countdownLabel, statusOf } from "../lib/deadline.js";

// Signal strength = deadline proximity. Same accent hue, varied intensity.
const STYLES = {
  urgent: {
    dot: "var(--color-signal-soft)",
    glow: "0 0 9px 1px rgba(140,224,75,0.75)",
    text: "text-[color:var(--color-signal-soft)]",
    pulse: true,
  },
  soon: {
    dot: "var(--color-signal)",
    glow: "0 0 6px 0 rgba(140,224,75,0.4)",
    text: "text-[color:var(--color-signal)]",
    pulse: false,
  },
  open: {
    dot: "var(--color-signal-deep)",
    glow: "none",
    text: "text-[color:var(--color-muted)]",
    pulse: false,
  },
  closed: {
    dot: "var(--color-lewat)",
    glow: "none",
    text: "text-[color:var(--color-lewat)]",
    pulse: false,
  },
};

export default function CountdownChip({ iso, now }) {
  const status = statusOf(iso, now);
  const s = STYLES[status];
  return (
    <span className={`inline-flex items-center gap-2 font-mono-num text-[13px] ${s.text}`}>
      <span className="relative flex h-2 w-2">
        {s.pulse && (
          <span
            className="animate-ping-ring absolute inline-flex h-full w-full rounded-full"
            style={{ border: "1px solid var(--color-signal)" }}
          />
        )}
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: s.dot, boxShadow: s.glow }}
        />
      </span>
      {countdownLabel(iso, now)}
    </span>
  );
}
