import { motion, useReducedMotion } from "motion/react";
import FestivalCard from "./FestivalCard.jsx";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function FestivalGroup({ label, items, now }) {
  const reduce = useReducedMotion();

  return (
    <section className="mt-12 first:mt-0">
      <header className="mb-4 flex items-baseline gap-3 border-b border-[color:var(--color-line)] pb-3">
        <span aria-hidden="true" className="h-3.5 w-[3px] bg-[color:var(--color-signal)]" />
        <h2 className="font-mono-num text-base tracking-[0.04em] text-[color:var(--color-ink)]">
          {label}
        </h2>
        <span className="ml-auto font-mono-num text-xs text-[color:var(--color-muted)]">
          {String(items.length).padStart(2, "0")} festival
        </span>
      </header>

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-3"
      >
        {items.map((f) => (
          <motion.div key={f.id} variants={reduce ? undefined : item}>
            <FestivalCard festival={f} now={now} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
