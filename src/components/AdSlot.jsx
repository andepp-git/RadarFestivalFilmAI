// Slot iklan. Sekarang masih placeholder.
//
// CARA PASANG IKLAN ASLI:
// Ganti isi <div data-ad-body> di bawah dengan materi iklan (gambar berlink,
// <ins> AdSense, atau embed jaringan iklan lain). Wrapper luar sudah mengatur
// ukuran, jarak, dan label "Iklan" — jangan dihapus supaya iklan tetap
// terdeklarasi jelas ke pembaca.

const VARIANTS = {
  // Melintang, dipasang di sela daftar festival.
  leaderboard: {
    box: "min-h-[104px] md:min-h-[124px]",
    hint: "728 x 90",
  },
  // Lebih tinggi, dipasang sebelum footer.
  billboard: {
    box: "min-h-[168px] md:min-h-[208px]",
    hint: "970 x 250",
  },
};

export default function AdSlot({ variant = "leaderboard", slotId }) {
  const v = VARIANTS[variant] ?? VARIANTS.leaderboard;

  return (
    <aside
      aria-label="Ruang iklan"
      data-ad-slot={slotId}
      className="my-12 first:mt-0"
    >
      <div
        className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[var(--radius)] border border-dashed border-[color:var(--color-line-strong)] px-5 py-8 text-center ${v.box}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(140,224,75,0.035) 0 10px, transparent 10px 20px)",
        }}
      >
        {/* Label transparansi: pembaca harus tahu ini ruang iklan. */}
        <span className="absolute left-3 top-3 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-base)] px-2 py-0.5 font-mono-num text-[10px] tracking-[0.16em] text-[color:var(--color-faint)]">
          IKLAN
        </span>

        <div data-ad-body className="flex flex-col items-center gap-1.5">
          <p className="text-sm font-medium text-[color:var(--color-muted)]">
            Slot iklan tersedia
          </p>
          <p className="font-mono-num text-[11px] text-[color:var(--color-faint)]">
            {v.hint}
          </p>
        </div>
      </div>
    </aside>
  );
}
