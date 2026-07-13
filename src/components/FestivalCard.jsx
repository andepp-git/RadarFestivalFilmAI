import { ArrowUpRight, MagnifyingGlass, Warning } from "@phosphor-icons/react";
import { formatShort, statusOf, googleSearchUrl } from "../lib/deadline.js";
import { COUNTRIES } from "../data/festivals.js";
import CountdownChip from "./CountdownChip.jsx";

const RAIL = {
  urgent: "var(--color-signal-soft)",
  soon: "var(--color-signal)",
  open: "var(--color-signal-deep)",
  closed: "var(--color-lewat)",
};

const COST_BADGE = {
  free: "border-[color:var(--color-signal)] text-[color:var(--color-signal-soft)] bg-[rgba(140,224,75,0.08)]",
  paid: "border-[color:var(--color-line-strong)] text-[color:var(--color-ink)]",
  unknown: "border-dashed border-[color:var(--color-line-strong)] text-[color:var(--color-faint)]",
};

function tierShort(iso) {
  return formatShort(iso).replace(/ \d{4}$/, "");
}

export default function FestivalCard({ festival, now }) {
  const { name, countryCode, deadlineISO, deadlineNote, cost, url, searchHint, verify, tiers } =
    festival;
  const status = statusOf(deadlineISO, now);
  const [day, month, year] = formatShort(deadlineISO).split(" ");
  const extraTiers = tiers?.slice(1) ?? [];

  return (
    <article
      className="group relative overflow-hidden rounded-[var(--radius)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-[color:var(--color-signal-deep)] hover:bg-[color:var(--color-surface-2)]"
    >
      {/* Signal rail: same hue, intensity keyed to deadline proximity */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ background: RAIL[status] }}
      />

      <div className="grid grid-cols-1 gap-5 p-5 pl-6 md:grid-cols-[minmax(150px,190px)_1fr_auto] md:items-center md:gap-6 md:p-6 md:pl-7">
        {/* Deadline */}
        <div className="flex flex-col gap-2">
          <div className="font-mono-num text-[1.7rem] leading-none tracking-tight">
            {day} {month}
            <span className="ml-1 text-[color:var(--color-faint)]">{year}</span>
          </div>
          <CountdownChip iso={deadlineISO} now={now} />
          {deadlineNote && (
            <span className="font-mono-num text-[11px] text-[color:var(--color-faint)]">
              {deadlineNote}
            </span>
          )}
          {extraTiers.length > 0 && (
            <div className="mt-0.5 flex flex-wrap gap-1.5">
              {extraTiers.map((t) => (
                <span
                  key={t.label}
                  className="rounded-full border border-[color:var(--color-line)] px-2 py-0.5 font-mono-num text-[10.5px] text-[color:var(--color-muted)]"
                >
                  {t.label} {tierShort(t.dateISO)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Identity: name + country + biaya */}
        <div className="min-w-0">
          <h3 className="text-balance text-lg font-medium leading-snug text-[color:var(--color-ink)]">
            {name}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <span
              className="font-mono-num text-[11px] tracking-[0.14em] text-[color:var(--color-muted)]"
              title={COUNTRIES[countryCode]}
            >
              {countryCode}
            </span>
            <span className="text-[color:var(--color-line-strong)]">/</span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium ${COST_BADGE[cost.type]}`}
            >
              {cost.label}
            </span>
            {verify && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[color:var(--color-lewat)]">
                <Warning size={13} weight="fill" />
                perlu verifikasi
              </span>
            )}
          </div>
        </div>

        {/* Link action */}
        <div className="md:justify-self-end">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka situs ${name}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line-strong)] px-4 py-2 text-sm font-medium text-[color:var(--color-ink)] transition-colors duration-200 hover:border-[color:var(--color-signal)] hover:bg-[color:var(--color-signal)] hover:text-[color:var(--color-base)] focus-visible:bg-[color:var(--color-signal)] focus-visible:text-[color:var(--color-base)]"
            >
              Buka situs
              <ArrowUpRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <div className="flex flex-col items-start gap-1 md:items-end">
              <a
                href={googleSearchUrl(searchHint)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Cari ${name} di Google`}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[color:var(--color-line-strong)] px-4 py-2 text-sm font-medium text-[color:var(--color-muted)] transition-colors duration-200 hover:border-[color:var(--color-signal)] hover:text-[color:var(--color-signal)]"
              >
                <MagnifyingGlass size={15} weight="bold" />
                Cari
              </a>
              <span className="font-mono-num text-[10px] text-[color:var(--color-faint)]">
                belum ada link resmi
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
