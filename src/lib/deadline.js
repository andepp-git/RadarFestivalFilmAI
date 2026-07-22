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

/** Semua tanggal yang berlaku untuk satu festival: tiers kalau ada, kalau tidak deadlineISO tunggal. */
function candidateDates(festival) {
  return festival.tiers?.length
    ? festival.tiers
    : [{ label: undefined, dateISO: festival.deadlineISO }];
}

/**
 * Tanggal-tanggal yang MASIH bisa dikejar (belum lewat), terurut dari yang terdekat.
 * Untuk festival bertingkat (tiers), tier yang sudah lewat otomatis di-drop dari daftar ini
 * tanpa men-drop festivalnya (selama masih ada tier lain yang buka).
 */
export function upcomingCandidates(festival, now = new Date()) {
  return candidateDates(festival)
    .filter((c) => daysUntil(c.dateISO, now) >= 0)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

/** Tanggal terdekat yang masih bisa dikejar, atau null kalau festival sudah lewat semua tier-nya. */
export function primaryDeadline(festival, now = new Date()) {
  return upcomingCandidates(festival, now)[0] ?? null;
}

/** Festival dianggap masih buka kalau minimal satu tanggal (deadline atau tier) belum lewat. */
export function isOpen(festival, now = new Date()) {
  return primaryDeadline(festival, now) !== null;
}

export function googleSearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
