"use client";

import { LogosRow, type LogoItem } from "./LogosRow";

const LOGOS: LogoItem[] = [
  { id: "muta", title: "Muta AI", year: 2025, img: "/logos/Logos-MUTA.webp" },
  { id: "blindaje", title: "Blindaje", year: 2025, img: "/logos/Logos-Blindaje.webp" },
  { id: "lf5a", title: "Liga de F5 Adaptado", year: 2025, img: "/logos/Logos-LF5A.webp" },
  { id: "waytogo", title: "Way To Go", year: 2023, img: "/logos/Logos-WayToGo.webp" },
  { id: "caffe", title: "Caffè", year: 2022, img: "/logos/Logos-Caffe.webp" },
];

export default function LogoGallery() {
  return (
    <section id="logos" aria-labelledby="logos-heading" className="scroll-mt-24 py-0">
      <div className="mx-auto max-w-6xl px-4 md:px-0 mb-6">
        <p className="font-alt text-xl uppercase tracking-wide text-neutral-700">
          Branding & Identidad
        </p>
        <h2 id="logos-heading" className="text-2xl md:text-6xl font-bold tracking-tight">
          Galería de Logos
        </h2>
      </div>

      <LogosRow items={LOGOS} />
    </section>
  );
}
