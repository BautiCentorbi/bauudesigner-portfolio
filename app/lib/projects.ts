// lib/projects.ts

export type ProjectTag = string;

export type ProjectMedia = {
  src: string;
  alt: string;
  aspect?: "16/9" | "4/3" | "1/1" | "21/9" | "auto";
};

export type ProjectBlock =
  | {
      kind: "richText";
      tone?: "light" | "dark";
      align?: "left" | "center";
      text: string;
    }
  | {
      kind: "mediaGrid";
      layout: "twoUp" | "oneFull" | "twoUpPlusOne";
      items: ProjectMedia[];
    }
  | {
      kind: "highlights";
      title?: string;
      items: Array<{ label: string; value: string }>;
    }
  | {
      kind: "stack";
      title?: string;
      items: string[];
    }
  | {
      kind: "deliverables";
      title?: string;
      items: string[];
    }
  | {
      kind: "closing";
      leftText: string;
      rightTitle: string;
      rightTags: ProjectTag[];
    };

export type ProjectCase = {
  slug: string;
  clientLabel?: string;
  clientName: string;
  year?: number;
  tags: ProjectTag[];

  heroIntro: string;
  heroImage: { src: string; alt: string };

  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };

  blocks: ProjectBlock[];
};

const MUTA = {
  muta_header:
    "MUTA AI es una consultora de gestión que integra estrategia, procesos y tecnología para acompañar a empresas en su evolución hacia modelos más eficientes y escalables. El proyecto abarcó la creación completa de la identidad de marca y el desarrollo de una plataforma web moderna, performante y preparada para crecer.",
  muta_body:
    "El desafío fue construir una marca sólida desde cero y trasladarla a un producto digital funcional, claro y coherente. El proceso comenzó con la definición del sistema de identidad y continuó con el diseño y desarrollo de una web orientada a comunicar valor, generar confianza y servir como base para futuras iteraciones del negocio.",
  muta_items: [
    "Sistema de identidad visual completo",
    "Diseño de logotipo y aplicaciones",
    "Wireframes conceptuales y definición de arquitectura",
    "Diseño UI y sistema de componentes",
    "Desarrollo frontend en Next.js",
    "Landing institucional con 8 secciones",
    "Formulario de contacto funcional",
    "Deploy y configuración productiva",
  ],
};
const BLINDAJE = {
  blindaje_header:
    "Blindaje es una empresa de seguridad privada en Mendoza que ofrece soluciones de seguridad integral con un enfoque 360°. El proyecto consistió en la creación completa de la identidad de marca y el desarrollo de una web institucional orientada a transmitir profesionalismo, confianza y posicionamiento premium.",
  blindaje_body:
    "Blindaje nace con una propuesta clara: integrar análisis, seguridad física, seguridad electrónica y consultoría estratégica para proteger personas, bienes y operaciones de punta a punta. El desafío fue traducir esa propuesta a una identidad visual coherente y a una plataforma digital que comunique solidez, orden y profesionalismo desde el primer contacto.",
  blindaje_items: [
    "Sistema de identidad visual completo",
    "Diseño de logotipo y aplicaciones",
    "Wireframes conceptuales y definición de arquitectura",
    "Diseño UI y sistema de componentes",
    "Desarrollo frontend en Next.js",
    "Landing institucional con 8 secciones",
    "Formulario de contacto funcional",
    "Deploy y configuración productiva",
  ],
};

export const PROJECTS: ProjectCase[] = [
  // 1) MUTA AI (igual a tu grilla)
  {
    slug: "muta-ai",
    clientLabel: "Cliente:",
    clientName: "MUTA AI",
    year: 2025,
    tags: ["Branding", "Web Development"],
    heroIntro: MUTA.muta_header,
    // Uso la misma imagen de tu grilla para mantener consistencia inmediata
    heroImage: {
      src: "/images/projects/Projects-MUTA.webp",
      alt: "MUTA AI",
    },
    primaryCta: {
      label: "Visitar sitio web",
      href: "https://www.mutaconsultora.com.ar",
    },
    secondaryCta: {
      label: "Abrir sitio",
      href: "https://www.mutaconsultora.com.ar",
    },

    blocks: [
      {
        kind: "highlights",
        title: "Resumen",
        items: [
          { label: "Rol", value: "Diseñador & Frontend Developer" },
          {
            label: "Objetivo",
            value:
              "Construir identidad de marca y una plataforma web moderna orientada a comunicar valor, generar confianza y escalar con el negocio.",
          },
          {
            label: "Entrega",
            value:
              "Identidad visual completa, diseño UI, desarrollo en Next.js, formulario funcional, deploy y SEO técnico.",
          },
        ],
      },

      // Intro general
      { kind: "richText", tone: "dark", align: "center", text: MUTA.muta_body },

      // BRANDING (texto + grilla brandbook)
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: "Se desarrolló el sistema de identidad de MUTA AI desde cero, definiendo logotipo, tipografías, paleta cromática y criterios de aplicación. El objetivo fue lograr una marca contemporánea, clara y flexible, capaz de trasladarse con coherencia al producto digital.",
      },
      {
        kind: "mediaGrid",
        layout: "twoUpPlusOne",
        items: [
          {
            src: "/images/projects/muta/brand-w&b.png",
            alt: "MUTA AI · Construcción del logotipo",
          },
          {
            src: "/images/projects/muta/brand-2.png",
            alt: "MUTA AI · Logotipo completo",
          },
          {
            src: "/images/projects/muta/brand-app.png",
            alt: "MUTA AI · Aplicación del logotipo",
          },
        ],
      },

      // WEB (texto + grilla 2 screens)
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: "La web fue diseñada y desarrollada como una plataforma moderna y performante, priorizando claridad, accesibilidad y SEO técnico. Se implementaron animaciones sutiles y una arquitectura lista para escalar, incluyendo formulario funcional con Resend y reCAPTCHA.",
      },
      {
        kind: "mediaGrid",
        layout: "twoUp",
        items: [
          {
            src: "/projects/muta/web-1.webp",
            alt: "MUTA AI · Web institucional",
          },
          {
            src: "/projects/muta/web-2.webp",
            alt: "MUTA AI · Secciones y navegación",
          },
        ],
      },
      
      {
        kind: "deliverables",
        title: "Entregables",
        items: MUTA.muta_items,
      },
      {
        kind: "stack",
        title: "Stack",
        items: [
          "Next.js",
          "TypeScript",
          "TailwindCSS",
          "Framer Motion",
          "Lenis Scroll",
          "Resend",
          "Google reCAPTCHA",
          "Vercel",
        ],
      },

      {
        kind: "closing",
        leftText:
          "MUTA AI fue concebido como un proyecto integral, donde la identidad visual y la tecnología trabajan en conjunto. Desde los primeros bocetos en wireframes hasta el desarrollo final, el foco estuvo puesto en crear una base digital sólida, optimizada y escalable, capaz de acompañar el crecimiento de la marca en el tiempo.",
        rightTitle: "MUTA AI",
        rightTags: ["Branding", "Web Development"],
      },
    ],
  },

  // 2) Blindaje (igual a tu grilla + FIX tags)
  {
    slug: "blindaje",
    clientLabel: "Cliente:",
    clientName: "Blindaje", // tu grilla lo tiene con mayúscula inicial, lo respeto
    year: 2025,
    tags: ["Branding", "Web Development"], // FIX: antes estaba como un string único
    heroIntro: BLINDAJE.blindaje_header,
    heroImage: {
      src: "/images/projects/Projects-Blindaje.webp",
      alt: "Blindaje",
    },
    primaryCta: { label: "Visitar sitio web", href: "https://blindaje.com.ar" },
    secondaryCta: { label: "Abrir sitio", href: "https://blindaje.com.ar" },

    blocks: [
      {
        kind: "highlights",
        title: "Resumen",
        items: [
          { label: "Rol", value: "Diseñador & Frontend Developer" },
          {
            label: "Objetivo",
            value:
              "Construir una identidad sólida y una presencia digital profesional que transmita confianza, autoridad y calidad de servicio.",
          },
          {
            label: "Entrega",
            value:
              "Identidad visual completa, web institucional, formularios de contacto y configuración productiva.",
          },
        ],
      },

      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: BLINDAJE.blindaje_body,
      },
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: "La identidad de Blindaje fue desarrollada desde cero, definiendo un sistema visual sobrio y contemporáneo que refuerza su carácter corporativo y premium. Se trabajó sobre logotipo, paleta cromática, tipografía y criterios de aplicación, asegurando consistencia en todos los puntos de contacto de la marca.",
      },

      {
        kind: "mediaGrid",
        layout: "twoUpPlusOne",
        items: [
          {
            src: "/projects/blindaje/brand-1.webp",
            alt: "Blindaje · Construcción del logotipo",
          },
          {
            src: "/projects/blindaje/brand-2.webp",
            alt: "Blindaje · Logotipo completo",
          },
          {
            src: "/projects/blindaje/brand-3.webp",
            alt: "Blindaje · Aplicación del logotipo",
          },
        ],
      },
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: "La web institucional fue diseñada y desarrollada para comunicar confianza y posicionamiento premium desde el primer contacto, con una estructura clara de servicios, metodología y canales de consulta.",
      },

      {
        kind: "mediaGrid",
        layout: "twoUp",
        items: [
          {
            src: "/projects/blindaje/screen-1.webp",
            alt: "Blindaje · Web institucional",
          },
          {
            src: "/projects/blindaje/screen-2.webp",
            alt: "Blindaje · Secciones y servicios",
          },
        ],
      },

      {
        kind: "closing",
        leftText:
          "Blindaje es un proyecto concebido de manera integral, donde la identidad visual y la tecnología se alinean para comunicar seguridad, profesionalismo y control. Desde la construcción de la marca hasta el desarrollo frontend, el foco estuvo puesto en crear una presencia digital sólida y preparada para escalar junto al crecimiento de la empresa.",
        rightTitle: "Blindaje",
        rightTags: ["Branding", "Web Development"],
      },
    ],
  },

  // 3) iMatorras (ESTABA EN TU GRILLA, lo agrego a lib)
  {
    slug: "imatorras",
    clientLabel: "Cliente:",
    clientName: "iMatorras",
    year: 2025,
    tags: ["Brand System", "Art Direction"],
    heroIntro: " LOREM_MED",
    heroImage: {
      src: "/images/projects/Projects-iMatorras.webp",
      alt: "iMatorras",
    },
    primaryCta: { label: "Ver caso completo", href: "https://imatorras.com" },

    blocks: [
      { kind: "richText", tone: "dark", align: "center", text: "LOREM_SHORT" },
      {
        kind: "mediaGrid",
        layout: "twoUpPlusOne",
        items: [
          { src: "/projects/imatorras/img-1.webp", alt: "Imagen 1" },
          { src: "/projects/imatorras/img-2.webp", alt: "Imagen 2" },
          { src: "/projects/imatorras/img-3.webp", alt: "Imagen 3" },
        ],
      },
      {
        kind: "deliverables",
        title: "Entregables",
        items: ["Brand system", "Guías", "Aplicaciones", "Assets"],
      },
      {
        kind: "closing",
        leftText: " LOREM_LONG",
        rightTitle: "iMatorras",
        rightTags: ["Brand System", "Art Direction"],
      },
    ],
  },

  // 4) LF5A (igual a tu grilla, tags ajustadas)
  {
    slug: "lf5a",
    clientLabel: "Cliente:",
    clientName: "Liga de F5 Adaptado",
    year: 2025,
    tags: ["Visual Identity", "Social Content"],
    heroIntro: "LOREM_MED",
    heroImage: {
      src: "/images/projects/Projects-LF5A.webp",
      alt: "Liga de F5 Adaptado",
    },
    primaryCta: {
      label: "Ver caso completo",
      href: "https://instagram.com/futbol5adaptado",
    },

    blocks: [
      { kind: "richText", tone: "dark", align: "center", text: "LOREM_SHORT" },
      {
        kind: "mediaGrid",
        layout: "oneFull",
        items: [{ src: "/projects/lf5a/img-1.webp", alt: "Imagen full" }],
      },
      {
        kind: "deliverables",
        title: "Entregables",
        items: ["Sistema de marca", "Aplicaciones", "Guía rápida", "Assets"],
      },
      {
        kind: "closing",
        leftText: "LOREM_LONG",
        rightTitle: "Liga de F5 Adaptado",
        rightTags: ["Visual Identity", "Social Content"],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
