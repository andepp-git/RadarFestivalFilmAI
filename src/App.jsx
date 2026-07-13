import { useEffect, useMemo, useState } from "react";
import { festivals } from "./data/festivals.js";
import { daysUntil, monthKey, monthLabel } from "./lib/deadline.js";
import GrainOverlay from "./components/GrainOverlay.jsx";
import Hero from "./components/Hero.jsx";
import Toolbar from "./components/Toolbar.jsx";
import FestivalGroup from "./components/FestivalGroup.jsx";
import Footer from "./components/Footer.jsx";

function groupByMonth(items) {
  const map = new Map();
  for (const f of items) {
    const k = monthKey(f.deadlineISO);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(f);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, list]) => ({ key, label: monthLabel(list[0].deadlineISO), items: list }));
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

  const sorted = useMemo(() => {
    const arr = festivals.filter((f) => filter === "all" || f.cost.type === filter);
    if (sort === "nama") {
      arr.sort((a, b) => a.name.localeCompare(b.name, "id"));
    } else {
      arr.sort(
        (a, b) => a.deadlineISO.localeCompare(b.deadlineISO) || a.name.localeCompare(b.name)
      );
    }
    return arr;
  }, [sort, filter]);

  const groups =
    sort === "deadline"
      ? groupByMonth(sorted)
      : sorted.length
        ? [{ key: "az", label: "Terurut A-Z", items: sorted }]
        : [];

  const nearestDays = useMemo(() => {
    const ds = festivals.map((f) => daysUntil(f.deadlineISO, now)).filter((d) => d >= 0);
    return ds.length ? Math.min(...ds) : 0;
  }, [now]);

  return (
    <>
      <GrainOverlay />
      <div className="relative z-10">
        <Hero total={festivals.length} nearestDays={nearestDays} />

        <Toolbar
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
          count={sorted.length}
          total={festivals.length}
        />

        <main id="jadwal" className="mx-auto max-w-[1180px] scroll-mt-20 px-5 pt-12 md:px-8">
          {groups.length > 0 ? (
            groups.map((g) => (
              <FestivalGroup key={g.key} label={g.label} items={g.items} now={now} />
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
        </main>

        <Footer />
      </div>
    </>
  );
}
