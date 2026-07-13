const FILTERS = [
  { key: "all", label: "Semua" },
  { key: "free", label: "Gratis" },
  { key: "paid", label: "Berbayar" },
  { key: "unknown", label: "Cek situs" },
];

const SORTS = [
  { key: "deadline", label: "Terdekat" },
  { key: "nama", label: "A-Z" },
];

export default function Toolbar({ sort, setSort, filter, setFilter, count, total }) {
  return (
    <div className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-[color:var(--color-base)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-3.5 md:flex-row md:items-center md:justify-between md:px-8">
        {/* Live count */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping-ring absolute inline-flex h-full w-full rounded-full"
              style={{ border: "1px solid var(--color-signal)" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--color-signal)", boxShadow: "0 0 6px 0 rgba(140,224,75,0.5)" }}
            />
          </span>
          <span className="font-mono-num text-[13px] text-[color:var(--color-muted)]">
            <span className="text-[color:var(--color-ink)]">{String(count).padStart(2, "0")}</span>
            <span className="text-[color:var(--color-faint)]">/{String(total).padStart(2, "0")}</span> festival terpantau
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {/* Cost filter chips */}
          <div role="group" aria-label="Filter biaya" className="flex flex-wrap items-center gap-1.5">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${
                    active
                      ? "border-[color:var(--color-signal)] bg-[rgba(140,224,75,0.12)] text-[color:var(--color-signal-soft)]"
                      : "border-[color:var(--color-line)] text-[color:var(--color-muted)] hover:border-[color:var(--color-line-strong)] hover:text-[color:var(--color-ink)]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Sort segmented */}
          <div
            role="group"
            aria-label="Urutkan"
            className="flex items-center rounded-full border border-[color:var(--color-line)] p-0.5"
          >
            {SORTS.map((s) => {
              const active = sort === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSort(s.key)}
                  className={`rounded-full px-3 py-1 text-[12.5px] font-medium transition-colors duration-200 ${
                    active
                      ? "bg-[color:var(--color-signal)] text-[color:var(--color-base)]"
                      : "text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
