import { ads } from "../data/ads.js";

// Slot iklan. Kalau slotId terdaftar di src/data/ads.js, materi iklannya tayang.
// Kalau belum ada, yang muncul placeholder kosong.
//
// Materi iklan diganti lewat src/data/ads.js, bukan di file ini.

const VARIANTS = {
  // Melintang, dipasang di sela daftar festival.
  leaderboard: {
    box: "min-h-[104px] md:min-h-[124px]",
    hint: "720 x 90",
  },
  // Lebih tinggi, dipasang sebelum footer.
  billboard: {
    box: "min-h-[168px] md:min-h-[208px]",
    hint: "970 x 250",
  },
};

export default function AdSlot({ variant = "leaderboard", slotId }) {
  const v = VARIANTS[variant] ?? VARIANTS.leaderboard;
  const ad = ads[slotId];

  return (
    <aside aria-label="Ruang iklan" data-ad-slot={slotId} className="my-12 first:mt-0">
      {/* Label transparansi: pembaca harus tahu ini ruang iklan, bukan konten redaksi. */}
      <p className="mb-2 text-center font-mono-num text-[10px] tracking-[0.16em] text-[color:var(--color-faint)]">
        IKLAN
      </p>

      {ad ? (
        <a
          href={ad.href}
          target="_blank"
          // rel="sponsored" menandai ini tautan berbayar.
          rel="noopener noreferrer sponsored"
          // w-full + maxWidth: melebar sampai lebar asli gambar, lalu mengecil
          // mengikuti layar. Jangan pakai w-fit: bentrok dengan <img> w-full.
          className="group/ad mx-auto block w-full overflow-hidden rounded-[var(--radius)] border border-[color:var(--color-line)] transition-[border-color,transform] duration-300 ease-out hover:-translate-y-[2px] hover:border-[color:var(--color-signal-deep)]"
          style={{ maxWidth: ad.width }}
        >
          <img
            src={ad.src}
            alt={ad.alt}
            width={ad.width}
            height={ad.height}
            loading="lazy"
            decoding="async"
            // width/height di atas mencegah layout bergeser saat gambar termuat.
            className="block h-auto w-full"
          />
        </a>
      ) : (
        <div
          className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[var(--radius)] border border-dashed border-[color:var(--color-line-strong)] px-5 py-8 text-center ${v.box}`}
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(140,224,75,0.035) 0 10px, transparent 10px 20px)",
          }}
        >
          <p className="text-sm font-medium text-[color:var(--color-muted)]">Slot iklan tersedia</p>
          <p className="font-mono-num text-[11px] text-[color:var(--color-faint)]">{v.hint}</p>
        </div>
      )}
    </aside>
  );
}
