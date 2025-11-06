"use client";

import ClientsMarquee, { type ClientLogo } from "../clients/ClientMarquee";

/** Ejemplo de data. Ajusta rutas a /public/clients/... */
const CLIENT_LOGOS:  ClientLogo[] = [
  { id: "muta",     src: "/logos/Logos-MUTA.webp",      alt: "MUTA" },
  { id: "imatorras",      src: "/logos/Logos-iMatorras.webp",       alt: "Bodega iMatorras" },
  { id: "anzorena",  src: "/logos/Logos-Anzorena.webp",  alt: "Anzorena Básquet" },
  { id: "blindaje", src: "/logos/Logos-Blindaje.webp",  alt: "Blindaje" },
  { id: "lf5a",     src: "/logos/Logos-LF5A.webp",      alt: "Liga de Fútbol 5 Adaptado" },
  { id: "sante",   src: "/logos/Logos-Sante.webp",    alt: "Santé Wine Club" },
  { id: "somosdeportistas",     src: "/logos/Logos-Somos_Deportistas.webp", alt: "Somos Deportistas Mendoza" },
  { id: "medikids",     src: "/logos/Logos-Medikids.webp",      alt: "Medikids" },
  { id: "lacantina",     src: "/logos/Logos-La_Cantina.webp",      alt: "La Cantina" },
  // agrega los que quieras…
];

export default function ClientsSection() {
  return (
    <section className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 md:px-0 mb-6">
        <p className="font-alt text-xl uppercase tracking-wide text-neutral-700">
          Clientes
        </p>
        <h2 className="text-2xl md:text-6xl font-bold tracking-tight">
          ¿Quiénes confían en mí?
        </h2>
      </div>

      <ClientsMarquee
        logos={CLIENT_LOGOS}
        // puedes subir o bajar velocidad con durationSec
        durationSec={28}
        // puedes ajustar el alto visual de cada logo acá:
        logoHeightClass="h-12 md:h-14"
        // y darle un fondo si querés: className="bg-foreground/5"
      />
    </section>
  );
}
