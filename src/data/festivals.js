// Radar Festival Film AI — data snapshot (scan Epino Production, 10 Agustus 2026).
// Hanya festival yang MASIH BUKA (deadline setelah 10 Agu 2026).
// Kolom yang ditampilkan: Festival, Deadline, Biaya, Hadiah, Link.
// `deadlineISO` = tanggal terdekat yang masih bisa dikejar. Urgensi dihitung live dari tanggal ini.
// `tiers` = beberapa tanggal berjenjang; yang sudah lewat otomatis di-skip.
// `tierNoun` = sebutan untuk jenjang itu (default "Tier", mis. "Tahap" untuk kontes berjenjang daftar/submit).
// `prize.weight` = besaran hadiah: 'mega' (>= $100rb) · 'big' ($10rb-$100rb) · 'std' (di bawah itu).
//   Dipakai buat mengatur seberapa terang sorotannya. Festival tanpa data hadiah: kosongkan saja.

export const UPDATED_LABEL = "10 Agustus 2026";

export const COUNTRIES = {
  IND: "India",
  USA: "Amerika Serikat",
  KAZ: "Kazakhstan",
  JPN: "Jepang",
  IDN: "Indonesia",
  DEU: "Jerman",
  EGY: "Mesir",
  ITA: "Italia",
  KOR: "Korea Selatan",
  MYS: "Malaysia",
  GLB: "Global / Online",
};

// cost.type: 'free' | 'paid' | 'unknown'  (dipakai untuk filter + kuat-lemahnya sinyal)
export const festivals = [
  {
    id: "jiff-2027",
    name: "JIFF 2027 - World AI Cinema Competition",
    countryCode: "IND",
    deadlineISO: "2026-08-15",
    cost: { type: "paid", label: "Berbayar" },
    prize: { label: "hingga $80.000", weight: "big" },
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
    // CATATAN: di festival-tracker-AI-film.md (scan 10 Agu) entri ini ada di bagian
    // SUDAH LEWAT, padahal deadline-nya 15 Agu dan waktu itu belum lewat.
    // Sengaja dipertahankan atas permintaan Andepp: hadiahnya terlalu besar untuk dilewatkan.
    // Jangan dihapus otomatis saat sinkron scan mingguan; hapus hanya kalau 15 Agu 2026 benar-benar lewat.
    id: "future-vision-xprize",
    name: "Future Vision XPRIZE",
    countryCode: "GLB",
    deadlineISO: "2026-08-15",
    cost: { type: "free", label: "Gratis" },
    prize: { label: "$2,6 juta", weight: "mega" },
    url: "https://futurevisionxprize.com/",
  },
  {
    id: "siggraph-asia",
    name: "SIGGRAPH Asia 2026 - AI Film Frontiers Workshop",
    countryCode: "MYS",
    deadlineISO: "2026-08-23",
    cost: { type: "free", label: "Gratis" },
    url: "https://asia.siggraph.org/2026/submissions/workshops/ai-film-frontiers-workshop/",
  },
  {
    id: "cairo",
    name: "AI Cinema Festival Cairo",
    countryCode: "EGY",
    deadlineISO: "2026-08-23",
    cost: { type: "unknown", label: "Cek situs" },
    url: "https://cairo.aicinemafestival.com/",
  },
  {
    id: "aaff-asia",
    name: "2nd Asia AI Film Festival (AAFF)",
    countryCode: "KOR",
    deadlineISO: "2026-08-25",
    cost: { type: "paid", label: "$10" },
    url: "https://aaff.iacst.org/",
  },
  {
    id: "pippit",
    name: "Pippit AI Storytelling Contest",
    countryCode: "GLB",
    deadlineISO: "2026-08-30",
    deadlineNote: "waktu PT",
    cost: { type: "free", label: "Gratis" },
    prize: { label: "$32.000+", weight: "big" },
    url: "https://wj.byteoversea.com/q/81757/Ap5k624P/447e/",
    // Dua tahap: daftar dulu, baru kirim karya.
    tierNoun: "Tahap",
    tiers: [
      { label: "Daftar", dateISO: "2026-08-30" },
      { label: "Submit", dateISO: "2026-09-10" },
    ],
  },
  {
    id: "astana",
    name: "Astana AI Film Festival (AAIFF)",
    countryCode: "KAZ",
    // Diperpanjang dari 15 Agu.
    deadlineISO: "2026-08-31",
    cost: { type: "free", label: "Gratis" },
    prize: { label: "$1 juta", weight: "mega" },
    url: "https://www.aaiff.ai/",
  },
  {
    id: "ai-motion-iulm",
    name: "AI.motion - Festival Italiano Cinema & AI (IULM Milan)",
    countryCode: "ITA",
    deadlineISO: "2026-08-31",
    cost: { type: "free", label: "Gratis" },
    url: "https://www.iulm.it/en/news-ed-eventi/news/ai-motion-festival-italiano-del-cinema-e-audiviosivo-intelligenza-artificiale",
  },
  {
    id: "biberach",
    name: "German AI Film Festival (Biberach)",
    countryCode: "DEU",
    deadlineISO: "2026-08-31",
    cost: { type: "unknown", label: "Cek situs (Festhome)" },
    prize: { label: "EUR 2.000", weight: "std" },
    url: "https://filmmakers.festhome.com/en/festival/ai-filmfestival",
    verify: true,
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
    id: "sparknify",
    name: "Sparknify Human vs. AI Film Festival",
    countryCode: "USA",
    deadlineISO: "2026-08-31",
    cost: { type: "paid", label: "Earlybird gratis, standar mulai $5" },
    prize: { label: "$3.000", weight: "std" },
    url: "https://www.sparknify.com/human-vs-ai-film-festival",
  },
  {
    id: "lifeart",
    name: "LifeArt AI Global Film Festival",
    countryCode: "USA",
    deadlineISO: "2026-09-01",
    cost: { type: "paid", label: "Berbayar (FestHome)" },
    url: "https://www.lifeartfestival.com/ai",
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
    id: "higgsfield",
    name: "Higgsfield Global Film Festival",
    countryCode: "GLB",
    deadlineISO: "2026-09-03",
    cost: { type: "paid", label: "Perlu langganan Higgsfield" },
    prize: { label: "$1 juta", weight: "mega" },
    url: "https://higgsfield.ai/contests/higgsfield-global-film-festival",
  },
  {
    id: "tyrannus",
    name: "Tyrannus Angel Awards",
    countryCode: "USA",
    deadlineISO: "2026-09-20",
    cost: { type: "unknown", label: "Cek situs" },
    prize: { label: "$48.000 (grant)", weight: "big" },
    url: "https://tyrannusfoundation.org",
  },
  {
    id: "wearehuman",
    name: "WeAreHuman Foundation Film Festival",
    countryCode: "GLB",
    deadlineISO: "2026-09-30",
    cost: { type: "free", label: "Gratis" },
    prize: { label: "EUR 10.000", weight: "big" },
    url: "https://wearehuman.foundation/en/call-for-films",
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
    prize: { label: "$500 (grand prize)", weight: "std" },
    url: "https://ai-zone.net/festival/",
  },
  {
    id: "berlin-2",
    name: "Berlin AI Film Festival (Edisi ke-2)",
    countryCode: "DEU",
    deadlineISO: "2026-12-31",
    cost: { type: "paid", label: "$10-25 (cek situs)" },
    searchHint: "Berlin AI Film Festival 2nd edition",
    verify: true,
  },
];
