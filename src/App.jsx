import { Fragment, useEffect, useMemo, useState } from "react";
import { festivals } from "./data/festivals.js";
import { daysUntil, monthKey, monthLabel, isOpen, primaryDeadline } from "./lib/deadline.js";
import GrainOverlay from "./components/GrainOverlay.jsx";
import Hero from "./components/Hero.jsx";
import Toolbar from "./components/Toolbar.jsx";
import FestivalGroup from "./components/FestivalGroup.jsx";
import AdSlot from "./components/AdSlot.jsx";
import Footer from "./components/Footer.jsx";

function groupByMonth(items, now) {
  const map = new Map();
  for (const f of items) {
    const iso = primaryDeadline(f, now).dateISO;
    const k = monthKey(iso);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(f);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, list]) => ({
      key,
      label: monthLabel(primaryDeadline(list[0], now).dateISO),
      items: list,
    }));
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [sort, setSort] = useState("deadline");
  const [filter, setFilter] = useState("all");

  // Keep the live countdown honest without churning the tree.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 3_600_000);
    return () => clearInterval(id);
  }, []);

  // Festival yang sudah lewat semua tanggalnya (deadline maupun tier terakhir) di-drop, bukan cuma ditandai.
  const openFestivals = useMemo(() => festivals.filter((f) => isOpen(f, now)), [now]);

  const sorted = useMemo(() => {
    const arr = openFestivals.filter((f) => filter === "all" || f.cost.type === filter);
    if (sort === "nama") {
      arr.sort((a, b) => a.name.localeCompare(b.name, "id"));
    } else {
      arr.sort((a, b) => {
        const da = primaryDeadline(a, now).dateISO;
        const db = primaryDeadline(b, now).dateISO;
        return da.localeCompare(db) || a.name.localeCompare(b.name);
      });
    }
    return arr;
  }, [sort, filter, openFestivals, now]);

  const groups =
    sort === "deadline"
      ? groupByMonth(sorted, now)
      : sorted.length
        ? [{ key: "az", label: "Terurut A-Z", items: sorted }]
        : [];

  const nearestDays = useMemo(() => {
    const ds = openFestivals.map((f) => daysUntil(primaryDeadline(f, now).dateISO, now));
    return ds.length ? Math.min(...ds) : 0;
  }, [openFestivals, now]);

  return (
    <>
      <GrainOverlay />
      <div className="relative z-10">
        <Hero total={openFestivals.length} nearestDays={nearestDays} />

        <Toolbar
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
          count={sorted.length}
          total={openFestivals.length}
        />

        <main id="jadwal" className="mx-auto max-w-[1180px] scroll-mt-20 px-5 pt-12 md:px-8">
          {groups.length > 0 ? (
            groups.map((g, i) => (
              <Fragment key={g.key}>
                <FestivalGroup label={g.label} items={g.items} now={now} />
                {/* Iklan 1: di sela daftar, setelah grup bulan pertama. */}
                {i === 0 && <AdSlot slotId="inline-1" variant="leaderboard" />}
              </Fragment>
            ))
          ) : (
            <div className="rounded-[var(--radius)] border border-dashed border-[color:var(--color-line-strong)] py-20 text-center">
              <p className="font-mono-num text-sm text-[color:var(--color-muted)]">
                Tidak ada sinyal untuk filter ini.
              </p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-4 text-sm text-[color:var(--color-signal)] underline underline-offset-4"
              >
                Reset filter
              </button>
            </div>
          )}

          {/* Iklan 2: penutup daftar, sebelum footer. */}
          <AdSlot slotId="footer-1" variant="billboard" />
        </main>

        <Footer />
      </div>
    </>
  );
}
