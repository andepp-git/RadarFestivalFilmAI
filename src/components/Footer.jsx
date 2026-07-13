import { InstagramLogo } from "@phosphor-icons/react";
import { UPDATED_LABEL } from "../data/festivals.js";

const IG_URL = "https://www.instagram.com/epino_production/";

export default function Footer() {
  return (
    <footer className="relative mx-auto mt-20 max-w-[1180px] px-5 pb-14 md:px-8">
      <div className="border-t border-[color:var(--color-line)] pt-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand + curator */}
          <div>
            <p className="text-lg font-semibold tracking-tight text-[color:var(--color-ink)]">
              Radar Festival Film <span className="text-[color:var(--color-signal)]">AI</span>
            </p>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-signal)]"
            >
              <InstagramLogo size={18} weight="regular" />
              Kurasi oleh Epino Production
              <span className="text-[color:var(--color-faint)]">· @epino_production</span>
            </a>
          </div>

          {/* Meta + disclaimer */}
          <div className="max-w-[42ch] md:text-right">
            <p className="font-mono-num text-xs text-[color:var(--color-faint)]">
              Diperbarui {UPDATED_LABEL} · scan mingguan
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--color-muted)]">
              Verifikasi ke situs resmi tiap festival sebelum submit atau bayar. Deadline dan biaya
              bisa berubah sewaktu-waktu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
