// Radar Festival Film AI — data snapshot (scan Epino Production, 27 Juli 2026).
// Hanya festival yang MASIH BUKA (deadline setelah 27 Jul 2026).
// Empat kolom yang ditampilkan: Festival, Deadline, Biaya, Link.
// `deadlineISO` = tanggal terdekat yang masih bisa dikejar. Urgensi dihitung live dari tanggal ini.
// `tiers` = beberapa tanggal berjenjang; yang sudah lewat otomatis di-skip.
// `tierNoun` = sebutan untuk jenjang itu (default "Tier", mis. "Tahap" untuk kontes berjenjang daftar/submit).

export const UPDATED_LABEL = "27 Juli 2026";

export const COUNTRIES = {
  IND: "India",
  USA: "Amerika Serikat",
  KAZ: "Kazakhstan",
  JPN: "Jepang",
  IDN: "Indonesia",
  MYS: "Malaysia",
  GLB: "Global / Online",
};

// cost.type: 'free' | 'paid' | 'unknown'  (dipakai untuk filter + kuat-lemahnya sinyal)
export const festivals = [
  {
    id: "digicon6-my",
    name: "DigiCon6 ASIA 2026 (Malaysia Circuit)",
    countryCode: "MYS",
    deadlineISO: "2026-07-31",
    cost: { type: "free", label: "Gratis (via MDEC)" },
    searchHint: "DigiCon6 ASIA Malaysia MDEC Rtist",
  },
  {
    id: "red-rocks",
    name: "Red Rocks AI Film Festival",
    countryCode: "USA",
    deadlineISO: "2026-08-01",
    cost: { type: "unknown", label: "Cek situs" },
    url: "https://www.prestwickproductions.com",
  },
  {
    id: "ai-film-3",
    name: "AI Film 3 Festival",
    countryCode: "USA",
    deadlineISO: "2026-08-01",
    cost: { type: "unknown", label: "Cek situs (aifilm3.com/FilmFreeway)" },
    url: "https://www.aifilm3.com/submit",
  },
  {
    id: "lifeart",
    name: "LifeArt AI Global Film Festival",
    countryCode: "USA",
    deadlineISO: "2026-08-01",
    cost: { type: "paid", label: "Berbayar (FestHome)" },
    url: "https://www.lifeartfestival.com/ai",
    tiers: [
      { label: "Regular", dateISO: "2026-08-01" },
      { label: "Late", dateISO: "2026-09-01" },
    ],
  },
  {
    id: "astana",
    name: "Astana AI Film Festival (AAIFF)",
    countryCode: "KAZ",
    deadlineISO: "2026-08-15",
    cost: { type: "free", label: "Gratis" },
    url: "https://www.aaiff.ai/",
  },
  {
    id: "austin",
    name: "Austin AI Film Festival",
    countryCode: "USA",
    deadlineISO: "2026-08-15",
    deadlineNote: "23:59 CST",
    cost: { type: "paid", label: "Ada entry fee" },
    url: "https://www.austinaifilmfest.com/terms",
  },
  {
    id: "future-vision-xprize",
    name: "Future Vision XPRIZE",
    countryCode: "GLB",
    deadlineISO: "2026-08-15",
    cost: { type: "free", label: "Gratis" },
    searchHint: "Future Vision XPRIZE film",
  },
  {
    id: "jiff-2027",
    name: "JIFF 2027 - World AI Cinema Competition",
    countryCode: "IND",
    deadlineISO: "2026-08-15",
    cost: { type: "paid", label: "Berbayar" },
    url: "https://jiffindia.org",
    tiers: [
      { label: "Early", dateISO: "2026-08-15" },
      { label: "Regular", dateISO: "2026-09-15" },
      { label: "Late", dateISO: "2026-10-15" },
      { label: "Extended", dateISO: "2026-11-15" },
      { label: "Final", dateISO: "2026-12-05" },
    ],
  },
  {
    id: "pippit",
    name: "Pippit AI Storytelling Contest",
    countryCode: "GLB",
    deadlineISO: "2026-08-30",
    deadlineNote: "waktu PT",
    cost: { type: "free", label: "Gratis" },
    url: "https://wj.byteoversea.com/q/81757/Ap5k624P/447e/",
    // Dua tahap: daftar dulu, baru kirim karya.
    tierNoun: "Tahap",
    tiers: [
      { label: "Daftar", dateISO: "2026-08-30" },
      { label: "Submit", dateISO: "2026-09-10" },
    ],
  },
  {
    id: "sparknify",
    name: "Sparknify Human vs. AI Film Festival",
    countryCode: "USA",
    deadlineISO: "2026-08-31",
    cost: { type: "paid", label: "Earlybird gratis, standar mulai $5" },
    url: "https://www.sparknify.com/human-vs-ai-film-festival",
  },
  {
    id: "iffi-goa",
    name: "IFFI Goa AI Film Festival",
    countryCode: "IND",
    deadlineISO: "2026-08-31",
    cost: { type: "free", label: "Gratis" },
    url: "https://iffigoa.org",
  },
  {
    id: "aifj",
    name: "AI Film Festival Japan (AIFJ) 2026",
    countryCode: "JPN",
    deadlineISO: "2026-09-01",
    cost: { type: "paid", label: "Berbayar" },
    url: "https://aifilm.jp/index_en.html",
  },
  {
    id: "wearehuman",
    name: "WeAreHuman Foundation Film Festival",
    countryCode: "GLB",
    deadlineISO: "2026-09-30",
    cost: { type: "free", label: "Gratis" },
    url: "https://wearehuman.foundation/en/call-for-films",
  },
  {
    id: "tyrannus",
    name: "Tyrannus Angel Awards",
    countryCode: "USA",
    deadlineISO: "2026-09-20",
    cost: { type: "unknown", label: "Cek situs" },
    url: "https://tyrannusfoundation.org",
  },
  {
    id: "slamdance-dig",
    name: "Slamdance - kategori DIG",
    countryCode: "USA",
    deadlineISO: "2026-08-10",
    cost: { type: "paid", label: "DIG/Shorts: $60-90 (tiered)" },
    url: "https://slamdance.com/festival-submit/",
    tiers: [
      { label: "Regular", dateISO: "2026-08-10" },
      { label: "Late", dateISO: "2026-09-14" },
      { label: "Extended", dateISO: "2026-10-06" },
    ],
  },
  {
    id: "ai-film-ads-bali",
    name: "AI Film & Ads Awards Bali",
    countryCode: "IDN",
    deadlineISO: "2026-10-15",
    cost: { type: "paid", label: "Berbayar (tiered)" },
    searchHint: "AI Film Ads Awards Bali megatix",
  },
  {
    id: "ai-zone",
    name: "AI ZONE International AI Film Festival 2026",
    countryCode: "GLB",
    deadlineISO: "2026-11-30",
    cost: { type: "unknown", label: "Tidak disebut" },
    url: "https://ai-zone.net/festival/",
  },
];
