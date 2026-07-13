import { motion, useReducedMotion } from "motion/react";
import { CaretRight } from "@phosphor-icons/react";
import RadarScope from "./RadarScope.jsx";

const IG_URL = "https://www.instagram.com/epino_production/";

export default function Hero({ total, nearestDays }) {
  const reduce = useReducedMotion();
  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <header className="relative mx-auto max-w-[1180px] px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left: title lockup */}
        <div className="order-2 md:order-1">
          <motion.h1
            {...rise}
            aria-label="Radar Festival Film AI"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-[color:var(--color-ink)] sm:text-6xl lg:text-[4.2rem]"
          >
            <span aria-hidden="true">
              Radar Festival
              <br />
              Film <span className="text-[color:var(--color-signal)]">AI</span>
            </span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-sm text-[color:var(--color-muted)]"
          >
            by{" "}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-signal-deep)] decoration-1 underline-offset-4 transition-colors hover:text-[color:var(--color-signal)] hover:decoration-[color:var(--color-signal)]"
            >
              Epino Production
            </a>
          </motion.p>

          <motion.p
            {...rise}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-[color:var(--color-muted)]"
          >
            Jadwal festival film AI yang masih buka, internasional dan nasional.{" "}
            <span className="font-mono-num text-[color:var(--color-signal-soft)]">{total}</span>{" "}
            festival aktif, deadline terdekat{" "}
            <span className="font-mono-num text-[color:var(--color-signal-soft)]">
              {nearestDays} hari
            </span>{" "}
            lagi.
          </motion.p>

          <motion.div
            {...rise}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <a
              href="#jadwal"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-signal)] px-6 py-3 text-sm font-semibold text-[color:var(--color-base)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Lihat jadwal
              <CaretRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Right: the scope */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2"
        >
          <RadarScope />
        </motion.div>
      </div>
    </header>
  );
}
