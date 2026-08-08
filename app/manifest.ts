import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bautista Centorbi — Diseño Gráfico & Desarrollo Web",
    short_name: "B. Centorbi",
    description:
      "Diseño de identidad visual, branding y desarrollo web. Con base en Mendoza, Argentina, trabajando con clientes en toda Latinoamérica, Estados Unidos y Europa.",
    start_url: "/",
    display: "standalone",
    background_color: "#ebebeb",
    theme_color: "#ebebeb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
