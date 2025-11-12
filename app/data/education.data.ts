import type { EducationItem } from "@/app/components/sections/Education";

export const EDUCATION: EducationItem[] = [
  {
    id: "uiux-2024",
    title: "Diplomatura en Diseño UI",
    institution: "Universidad de Mendoza",
    year: "2024",
    duration: "6 meses",
    certificateSrc: "/certs/ui-diploma.webp",
    description:
      "Formación intensiva en diseño de interfaces orientado a claridad, usabilidad y consistencia.",
    highlights: [
      "Sistemas de diseño y componentes escalables",
      "Accesibilidad aplicada (WCAG)",
      "Prototipado de alta fidelidad en Figma",
    ],
  },
  {
    id: "next-2025",
    title: "Next.js Avanzado",
    institution: "Platzi",
    year: "2025",
    duration: "20 h",
    certificateSrc: "/certs/next-advanced.webp",
    description:
      "SSR/SSG, acciones del servidor, optimización de imágenes y despliegue en Vercel.",
    highlights: [
      "Mejora de TTFB y Core Web Vitals",
      "Rutas app/ y Server Actions",
      "Optimización de bundles y caché",
    ],
    url: "https://platzi.com/...",
  },
  {
    id: "seo-2023",
    title: "SEO Técnico",
    institution: "Coursera",
    year: "2023",
    duration: "12 h",
    certificateSrc: "/certs/seo-tech.webp",
    description:
      "Fundamentos de indexación, performance, metadatos y auditorías con Lighthouse.",
    highlights: ["Core Web Vitals", "Estructura HTML semántica", "Sitemaps"],
  },
];
