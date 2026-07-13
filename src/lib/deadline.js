// Live deadline logic. Semua dihitung dari tanggal SEKARANG (bukan tanggal snapshot),
// supaya countdown tetap benar setelah di-deploy.

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];
const MONTHS_LONG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function atMidnight(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function parse(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Sisa hari dari hari ini sampai deadline (0 = hari ini, negatif = lewat). */
export function daysUntil(iso, now = new Date()) {
  const target = parse(iso);
  const today = atMidnight(now);
  return Math.round((target - today) / 86_400_000);
}

/**
 * Status sinyal berdasarkan kedekatan deadline.
 * urgent <= 7 hari · soon <= 30 hari · open > 30 hari · closed sudah lewat.
 */
export function statusOf(iso, now = new Date()) {
  const d = daysUntil(iso, now);
  if (d < 0) return "closed";
  if (d <= 7) return "urgent";
  if (d <= 30) return "soon";
  return "open";
}

/** "20 Jul 2026" */
export function formatShort(iso) {
  const dt = parse(iso);
  return `${dt.getDate()} ${MONTHS_SHORT[dt.getMonth()]} ${dt.getFullYear()}`;
}

/** "Juli 2026" — dipakai untuk header grup. */
export function monthLabel(iso) {
  const dt = parse(iso);
  return `${MONTHS_LONG[dt.getMonth()]} ${dt.getFullYear()}`;
}

/** Teks countdown ringkas untuk chip. */
export function countdownLabel(iso, now = new Date()) {
  const d = daysUntil(iso, now);
  if (d < 0) return "Lewat";
  if (d === 0) return "Hari ini";
  if (d === 1) return "Besok";
  return `${d} hari lagi`;
}

/** Kunci grup "YYYY-MM" untuk sorting bulan yang stabil. */
export function monthKey(iso) {
  return iso.slice(0, 7);
}

export function googleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
