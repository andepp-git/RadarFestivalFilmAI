// Materi iklan yang sedang tayang.
//
// Gambarnya diambil langsung dari folder /ads di root project, jadi folder itu
// tetap jadi satu-satunya tempat menaruh file iklan. Vite yang mengurus
// optimasi + cache-busting saat build.
//
// CARA GANTI IKLAN:
// 1. Taruh gambar baru di folder /ads
// 2. Ganti import di bawah + `href` tujuannya
// Ukuran ideal: inline-1 = 720x90 (melintang), footer-1 = 970x250 (besar).
// Slot yang tidak terdaftar di sini otomatis tampil sebagai placeholder kosong.

import iklanS from "../../ads/iklanS.png";
import iklanL from "../../ads/iklanL.png";

export const ads = {
  "inline-1": {
    src: iklanS,
    width: 720,
    height: 90,
    href: "https://www.instagram.com/wujutkreasi/",
    alt: "Wujut Kreasi: custom 3D print, mini figure dan poster 3D. Kunjungi Instagram @wujutkreasi.",
  },
  "footer-1": {
    src: iklanL,
    width: 970,
    height: 250,
    href: "https://www.instagram.com/p/DbxDhjdpwmC/",
    alt: "Wujut Kreasi Merdeka Sale: potongan Rp81 ribu untuk custom 3D print, mini figure, tempelan kulkas, dan 3D poster. Berlaku sampai 31 Agustus 2026.",
  },
};
