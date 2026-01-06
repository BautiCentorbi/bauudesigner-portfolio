// about.data.ts
export type ExperienceItem = {
  year: string;
  company: string;
  role: string;
  summary: string;
  tags: string[];
  link?: string;

  // si ya estás usando estos en Experience.tsx puedes dejarlos también:
  subtitle?: string;
  roleTitle?: string;
  achievements?: string[];
};

type Metric = { label: string; value: string };
type CTA = { href: string; label: string };

export type AboutData = {
  poster: {
    kicker: string;
    titleA: string;
    titleB: string;
    titleC: string;
  };
  photo: { src: string; alt: string };
  bio: string;
  capabilities: string[];
  metrics: Metric[];
  experience: ExperienceItem[];

  // ⬇️ estos son opcionales para que no rompa si los quitás
  year?: string;
  tag?: string;
  cta?: CTA;
};

// Usa el tipo explícito para que TS conozca todas las claves
export const ABOUT: AboutData = {
  poster: {
    kicker: "SOBRE MÍ",
    titleA: "Diseño identidades",
    titleB: "y construyo sitios",
    titleC: "rápidos y claros.",
  },
  photo: { src: "/images/BCentorbi.webp", alt: "Bautista Centorbi" },
  bio: "Soy Bautista. Me muevo entre branding, UI e implementación front-end (Next.js + Tailwind + Motion) para lanzar productos con criterio, claridad y performance.",
  capabilities: [
    "Dirección de arte",
    "Identidad & sistemas visuales",
    "UX/UI design",
    "Front-end (Next.js)",
    "Estrategia & contenido",
    "Optimización SEO",
    "Colaboración ágil",
  ],
  metrics: [
    { label: "Años construyendo", value: "3+" },
    { label: "Clientes", value: "12+" },
    { label: "Sectores", value: "Vino, Seguridad, Salud, Consultoría" },
  ],
  experience: <ExperienceItem[]>[
    {
      year: "Ago. 2025 - Actualidad",
      company: "Santé Winebar",
      subtitle: "Vinoteca boutique en Mendoza",
      roleTitle: "Diseñador Gráfico",
      summary:
        "Diseño de piezas gráficas para degustaciones y eventos organizados por Santé, un espacio boutique de vinos y experiencias sensoriales. Desarrollo de flyers y material visual respetando la identidad existente de la marca y manteniendo coherencia estética con bodegas colaboradoras.",
      achievements:
        ["Consolidación visual de las comunicaciones gráficas del bar, respetando y estandarizando su identidad visual sin haber sido el autor original del branding."],
      tags: ["Eventos", "Vino", "Redes Sociales", "Diseño Gráfico"],
    },
    {
      year: "Jun. 2025 - Actualidad",
      company: "Blindaje",
      subtitle: "Seguridad Privada Integral",
      roleTitle:
        "Diseñador de Identidad Visual, Social Media & Desarrollador Web",
      summary:
        "Participé en la construcción visual completa de la marca, desde su identidad conceptual hasta su aplicación en medios digitales y físicos. Llevé adelante el diseño y desarrollo de la web institucional utilizando Next.js, React, TailwindCSS y Framer Motion, optimizando su rendimiento en Vercel con altos estándares de SEO, accesibilidad y experiencia de usuario. También diseñé elementos de uso interno y externo, incluyendo indumentaria corporativa, cartelería, señalética y piezas para redes, asegurando coherencia estética y claridad comunicacional.",
      achievements: [
        "Lanzamiento de la web institucional con +95 PageSpeed en rendimiento, SEO y performance.",
        "Estandarización completa de la identidad visual en todos los canales.",
        "Desarrollo de un sistema de comunicación claro, moderno y consistente.",
      ],
      tags: ["Identidad", "UI", "Next.js", "Motion"],
      link: "#proyectos",
    },
    {
      year: "Jul. 2025 - Actualidad",
      company: "MUTA AI",
      subtitle: "Consultora de Automatización y Gestión",
      roleTitle:
        "Frontend Developer, Consultor Creativo & Posicionamiento Digital",
      summary:
        "Formé parte del proceso de creación y construcción visual de la marca, definiendo su identidad conceptual y estética. Diseñé y desarrollé el sitio web institucional con un enfoque moderno y dinámico, integrando un lenguaje visual que comunica eficiencia, claridad y cercanía. También colaboré en la estructuración de contenidos para redes, alineando tono, discurso y diferenciación en un mercado donde predominan propuestas genéricas.",
      achievements: [
        "Lanzamiento de una marca con estética distintiva en un sector altamente saturado.",
        "Desarrollo de un sitio web claro, veloz y visualmente coherente con su propósito.",
      ],
      tags: ["Branding", "UI", "Next.js"],
      link: "#proyectos",
    },
    {
      year: "Sep. 2024 - Actualidad",
      company: "Bodega iMatorras",
      subtitle: "Tupungato",
      roleTitle: "Diseñador de Comunicación Visual y Contenidos",
      summary:
        "Me desempeño en la dirección visual y producción de piezas gráficas para redes sociales y medios editoriales (brochures, listas de precios, presentaciones, etc.). Trabajo la coherencia estética de la marca, su narrativa y el tono comunicacional, con foco en transmitir la identidad del terroir, el origen y la esencia de la bodega. Además, colaboro en la articulación visual y comunicativa con distribuidores en otras provincias, asegurando consistencia en todos los puntos de contacto.",
      achievements: [
        "Construcción de una estética sólida y reconocible en redes.",
        "Profesionalización de la narrativa de marca.",
        "Fidelización y consolidación de comunidad sin recurrir a pauta inicial.",
      ],
      tags: ["Dirección de arte", "Redes", "Optimización"],
    },
    {
      year: "Ago. 2024 - Mar. 2025",
      company: "Medikids",
      subtitle: "Centro médico infantil",
      roleTitle: "Diseñador para Redes Sociales",
      summary:
        "Diseño de placas informativas, campañas visuales y edición de reels institucionales bajo un lineamiento preexistente, aportando mejoras visuales y optimización estética de los contenidos comunicacionales.",
      achievements:
        ["Mantenimiento y refinamiento de la identidad visual institucional de la clínica en medios digitales."],
      tags: [
        "Diseño para RR.SS",
        "Redes Sociales",
        "Edición de Video",
        "Salud",
        "Pediatría",
      ],
    },
    {
      year: "Dic. 2024 - Feb. 2025",
      company: "La Cantina",
      subtitle: "Propuesta gastronómica de Michelini i Mufatto",
      roleTitle: "Community Manager y Diseñador Gráfico",
      summary:
        "Gestión integral de redes sociales y diseño de piezas gráficas para el espacio gastronómico de Michelini i Mufatto e iMatorras. Creación de menús, invitaciones, cupones y material promocional digital, manteniendo coherencia visual con las bodegas asociadas.",
      achievements: [
        "Estandarización de la identidad visual y consolidación del tono gráfico del espacio durante su etapa operativa.",
      ],
      tags: [
        "Diseño Gráfico",
        "Redes Sociales",
        "Diseño de Menú",
        "Identidad Visual",
        "Gastronomía",
      ],
    },
    {
      year: "Jun. 2023 - Ene. 2025",
      company: "Asociación Deportiva Anzorena",
      subtitle: "Club deportivo y equipo de básquet mendocino",
      roleTitle: "Community Manager y Diseñador",
      summary:
        "Diseño de material gráfico para redes sociales y gestión integral de la comunicación digital del club. Coordinación con encargados de categorías, cobertura visual de partidos y desarrollo de contenido audiovisual. Participación activa en decisiones visuales de uniformes y estética del estadio.",
      achievements: [
        "+198% de crecimiento en seguidores y +1000% de alcance orgánico durante 2024-2025.",
        "Modernización de la comunicación del club y referencia local en gestión digital deportiva."],
      tags: [
        "Redes Sociales",
        "Diseño Gráfico",
        "Deporte",
        "Fotografía",
        "Community Management",
      ],
    },
  ],

  // ⬇️ estos son los que te faltaban según el error
  year: "2025",
  tag: "Branding • Web",
  cta: { href: "#contacto", label: "Hablemos" },
};
