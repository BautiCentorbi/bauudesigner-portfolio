// lib/projects.ts

export type ProjectTag = string;

export type ProjectMedia = {
  src: string;
  alt: string;
  aspect?: "16/9" | "4/3" | "3/4" | "1/1" | "21/9" | "auto";
  href?: string;
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
      layout: "twoUp" | "oneFull" | "twoUpPlusOne" | "twoUpPlusOneExtended";
      items: ProjectMedia[];
    }
  | {
      kind: "sectionTitle";
      title: string;
    }
  | {
      kind: "video";
      src: string;
      label: string;
      aspect?: ProjectMedia["aspect"];
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
    }
  | {
      kind: "crosslink";
      eyebrow: string;
      title: string;
      description: string;
      href: string;
      linkLabel: string;
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

const BEPASS = {
  bepass_header:
    "BePass es una consultora de gestión que integra estrategia, procesos y tecnología para acompañar a empresas en su evolución hacia modelos más eficientes y escalables. El proyecto abarcó la creación completa de la identidad de marca y el desarrollo de una plataforma web moderna, performante y preparada para crecer.",
  bepass_body:
    "El desafío fue construir una marca sólida desde cero y trasladarla a un producto digital funcional, claro y coherente. El proceso comenzó con la definición del sistema de identidad y continuó con el diseño y desarrollo de una web orientada a comunicar valor, generar confianza y servir como base para futuras iteraciones del negocio.",
  bepass_items: [
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
  // 1) BePass (ex MUTA AI, rebranding 2026)
  {
    slug: "bepass",
    clientLabel: "Cliente:",
    clientName: "BePass",
    year: 2025,
    tags: ["Branding", "Web Development"],
    heroIntro: BEPASS.bepass_header,
    // TODO: reemplazar por assets propios de BePass (heroImage, logos, video demo)
    heroImage: {
      src: "/images/projects/Projects-MUTA.webp",
      alt: "BePass — Identidad de marca y desarrollo web para consultora de gestión, Mendoza",
    },
    primaryCta: {
      label: "Visitar sitio web",
      href: "https://bepass.com.ar",
    },
    secondaryCta: {
      label: "Abrir sitio",
      href: "https://bepass.com.ar",
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
      { kind: "richText", tone: "dark", align: "center", text: BEPASS.bepass_body },

      // BRANDING (texto + grilla brandbook)
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: "Se desarrolló el sistema de identidad de BePass desde cero, definiendo logotipo, tipografías, paleta cromática y criterios de aplicación. El objetivo fue lograr una marca contemporánea, clara y flexible, capaz de trasladarse con coherencia al producto digital.",
      },
      {
        kind: "mediaGrid",
        layout: "twoUpPlusOne",
        items: [
          {
            // TODO: reemplazar por assets de marca de BePass
            src: "/images/projects/muta/brand-w&b.webp",
            alt: "BePass · Construcción del logotipo",
          },
          {
            src: "/images/projects/muta/brand-2.webp",
            alt: "BePass · Logotipo completo",
          },
          {
            src: "/images/projects/muta/brand-app.webp",
            alt: "BePass · Aplicación del logotipo",
          },
        ],
      },
      {
        kind: "sectionTitle",
        title: "Web",
      },
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: "El sitio prioriza velocidad de carga y jerarquía clara por sobre efectos innecesarios: microinteracciones puntuales, tipografía legible y una arquitectura de información pensada para convertir visitas en consultas. El formulario de contacto corre sobre Resend con protección reCAPTCHA, y el proyecto está armado para sumar secciones sin rehacer la base.",
      },
      // WEB (video demo)
      {
        kind: "video",
        src: "/videos/BePass-Web_Demo.webm",
        label: "BePass · Web demo",
        aspect: "16/9",
      },


      {
        kind: "deliverables",
        title: "Entregables",
        items: BEPASS.bepass_items,
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
          "BePass fue concebido como un proyecto integral, donde la identidad visual y la tecnología trabajan en conjunto. Desde los primeros bocetos en wireframes hasta el desarrollo final, el foco estuvo puesto en crear una base digital sólida, optimizada y escalable, capaz de acompañar el crecimiento de la marca en el tiempo.",
        rightTitle: "BePass",
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
      alt: "Blindaje — Identidad de marca y desarrollo web para empresa de seguridad privada, Mendoza",
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
        tone: "dark",
        align: "center",
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
            src: "/images/projects/blindaje/brand-w&b.webp",
            alt: "Blindaje · Construcción del logotipo",
          },
          {
            src: "/images/projects/blindaje/brand-2.webp",
            alt: "Blindaje · Logotipo completo",
          },
          {
            src: "/images/projects/blindaje/brand-app.webp",
            alt: "Blindaje · Aplicación del logotipo",
          },
        ],
      },
      {
        kind: "sectionTitle",
        title: "Web",
      },
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text: "En la web, cada sección responde a una pregunta que se hace un cliente potencial: qué servicios ofrece, cómo trabaja y cómo contactarla. Esa estructura ordenada, sumada a una identidad visual sobria, es lo que traslada la sensación de profesionalismo del papel a la pantalla.",
      },

      {
        kind: "video",
        src: "/videos/Blindaje-Web_Demo.webm",
        label: "Blindaje · Web demo",
        aspect: "16/9",
      },

      {
        kind: "deliverables",
        title: "Entregables",
        items: BLINDAJE.blindaje_items,
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
          "Blindaje es un proyecto concebido de manera integral, donde la identidad visual y la tecnología se alinean para comunicar seguridad, profesionalismo y control. Desde la construcción de la marca hasta el desarrollo frontend, el foco estuvo puesto en crear una presencia digital sólida y preparada para escalar junto al crecimiento de la empresa.",
        rightTitle: "Blindaje",
        rightTags: ["Branding", "Web Development"],
      },
      {
        kind: "crosslink",
        eyebrow: "Side project en curso",
        title: "Blindaje Digital",
        description:
          "Misma razón social, otra empresa: el software de gestión de accesos, seguridad operativa y convivencia que estoy construyendo como brazo tecnológico de Blindaje Seguridad Privada.",
        href: "/#side-projects",
        linkLabel: "Conocer Blindaje Digital",
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
    heroIntro:
      "iMatorras es una bodega que combina tradición y visión contemporánea. El proyecto se enfocó en construir un sistema de marca refinado y coherente, capaz de transmitir identidad, origen y carácter en cada punto de contacto.",
    heroImage: {
      src: "/images/projects/Projects-iMatorras.webp",
      alt: "iMatorras — Sistema de marca y dirección de arte para bodega, Mendoza",
    },
    primaryCta: { label: "Ver caso completo", href: "https://imatorras.com" },

    blocks: [
      {
        kind: "highlights",
        title: "Resumen",
        items: [
          { label: "Rol", value: "Diseñador de Marca & Dirección de Arte" },
          {
            label: "Objetivo",
            value:
              "Consolidar un sistema de identidad visual sobrio y flexible, capaz de transmitir origen, tradición y carácter en cada punto de contacto de la bodega.",
          },
          {
            label: "Entrega",
            value:
              "Sistema de identidad completo, brandbook y aplicaciones para medios editoriales, digitales y de packaging.",
          },
        ],
      },
      {
        kind: "richText",
        tone: "dark",
        align: "center",
        text:
          "Trabajar la marca de una bodega con historia implica un riesgo concreto: quedar anclada al pasado, o renovarse perdiendo lo que la hace reconocible. El objetivo fue encontrar ese punto medio, con un sistema flexible que pudiera escalar a nuevas aplicaciones sin resignar consistencia.",
      },
      {
        kind: "sectionTitle",
        title: "Identidad",
      },
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text:
          "El resultado es un lenguaje visual atemporal: paleta cromática contenida, jerarquías claras y un sistema versátil, pensado para convivir en soportes editoriales, digitales y de packaging sin perder personalidad.",
      },
      {
        kind: "mediaGrid",
        layout: "twoUpPlusOne",
        items: [
          { src: "/images/projects/imatorras/brand-w&b.webp", alt: "iMatorras · Construcción del logotipo" },
          { src: "/images/projects/imatorras/brand-2.webp", alt: "iMatorras · Logotipo completo" },
          { src: "/images/projects/imatorras/brand-app.webp", alt: "iMatorras · Aplicación del logotipo" },
        ],
      },
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text:
          "Como parte del sistema, se desarrolló un brandbook que documenta criterios de uso, proporciones, aplicaciones y lineamientos visuales para mantener consistencia en todos los medios.",
      },
      {
        kind: "mediaGrid",
        layout: "oneFull",
        items: [
          {
            src: "/images/projects/imatorras/brandbook-cover.webp",
            alt: "iMatorras · Brandbook",
            href: "/downloads/Matorras_Brandbook.pdf",
            aspect: "4/3",
          },
        ],
      },
      {
        kind: "deliverables",
        title: "Entregables",
        items: ["Brand system", "Guías", "Aplicaciones", "Assets"],
      },
      {
        kind: "closing",
        leftText: "",
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
    heroIntro:
      "LF5A es una liga deportiva con un fuerte componente social, inclusivo y comunitario. El proyecto se centró en construir una identidad visual sólida y coherente, capaz de representar los valores del deporte adaptado, la inclusión y el trabajo colectivo, y trasladarlos de forma clara y reconocible al ecosistema digital.",
    heroImage: {
      src: "/images/projects/Projects-LF5A.webp",
      alt: "Liga de F5 Adaptado — Identidad visual para liga de fútbol 5 adaptado, Mendoza",
    },
    primaryCta: {
      label: "Visitar Instagram",
      href: "https://instagram.com/futbol5adaptado",
    },

    blocks: [
      {
        kind: "highlights",
        title: "Resumen",
        items: [
          { label: "Rol", value: "Diseñador Gráfico & Community Manager" },
          {
            label: "Objetivo",
            value:
              "Construir una identidad visual accesible y consistente que representara los valores del deporte adaptado, la inclusión y el trabajo colectivo.",
          },
          {
            label: "Entrega",
            value:
              "Sistema de marca, aplicaciones visuales y piezas para comunicación institucional, eventos y redes sociales.",
          },
        ],
      },
      {
        kind: "richText",
        tone: "dark",
        align: "center",
        text:
          "Una liga de deporte adaptado necesita comunicar dos cosas al mismo tiempo: seriedad institucional y calidez humana. El reto fue construir una marca lo suficientemente flexible para convivir con comunicación institucional, difusión de eventos y piezas para redes, sin perder carácter ni consistencia visual.",
      },
      {
        kind: "sectionTitle",
        title: "Identidad",
      },
      {
        kind: "richText",
        tone: "light",
        align: "left",
        text:
          "El sistema combina tipografías funcionales y una paleta con presencia y legibilidad, pensada para destacar en entornos digitales y reforzar el sentido de pertenencia de la comunidad LF5A: una identidad reconocible, adaptable y lista para crecer junto a la liga.",
      },
      {
        kind: "mediaGrid",
        layout: "twoUpPlusOneExtended",
        items: [
          { src: "/images/projects/lf5a/brand-w&b.webp", alt: "LF5A · Logo en Blanco y Negro" },
          { src: "/images/projects/lf5a/brand-2.webp", alt: "LF5A · Logo Completo y Variantes" },
          { src: "/images/projects/lf5a/brand-app-1.webp", alt: "LF5A · Aplicación 01", aspect: "3/4" },
          { src: "/images/projects/lf5a/brand-app-2.webp", alt: "LF5A · Aplicación 02", aspect: "3/4" },
          { src: "/images/projects/lf5a/brand-app-3.webp", alt: "LF5A · Aplicación 03", aspect: "3/4" },
          { src: "/images/projects/lf5a/brand-app-4.webp", alt: "LF5A · Aplicación 04", aspect: "3/4" },
        ],
      },
      {
        kind: "deliverables",
        title: "Entregables",
        items: ["Sistema de marca", "Aplicaciones", "Guía rápida", "Assets"],
      },
      {
        kind: "closing",
        leftText: "",
        rightTitle: "Liga de F5 Adaptado",
        rightTags: ["Visual Identity", "Social Content"],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}




