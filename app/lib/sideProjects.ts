// app/lib/sideProjects.ts
// Proyectos propios en curso: no son case studies de cliente (ver app/lib/projects.ts),
// por eso viven con una estructura más liviana y un lenguaje visual distinto.

export type SideProjectStatus = "active" | "concept";

export type SideProjectLink = {
  label: string;
  href: string;
};

export type SideProjectScreenshot = {
  src: string;
  alt: string;
};

export type SideProject = {
  slug: string;
  name: string;
  nameNote?: string; // ej. "(nombre provisional)"
  tagline: string;
  description: string;
  tags: string[];
  status: SideProjectStatus;
  statusLabel: string;
  screenshots?: SideProjectScreenshot[];
  primaryLink?: SideProjectLink;
  relatedCaseSlug?: string;
  relatedCaseLabel?: string;
};

export const SIDE_PROJECTS: SideProject[] = [
  {
    slug: "cm-suite",
    name: "CM-Suite",
    nameNote: "(nombre provisional)",
    tagline: "Suite propia para gestionar el trabajo de Community Manager",
    description:
      "Herramienta de uso interno para llevar el trabajo de Community Manager sobre varios clientes desde un solo lugar: workspace tipo Notion por cliente, calendario editorial con 3 vistas (Calendario, Kanban, Lista) y flujo de aprobación con el cliente, y analytics multi-plataforma arrancando por Instagram. MVP funcional en uso real con clientes, todavía en desarrollo activo.",
    tags: ["Next.js", "TypeScript", "Prisma", "Neon", "NextAuth"],
    status: "active",
    statusLabel: "En desarrollo activo — repo público, uso interno",
    screenshots: [
      {
        src: "/cm-suite/Main-Dashboard.png",
        alt: "CM-Suite · Panel de clientes, gestión multi-cliente desde un solo lugar",
      },
      {
        src: "/cm-suite/Client-Calendar_View.png",
        alt: "CM-Suite · Calendario editorial de un cliente, vista Calendario",
      },
      {
        src: "/cm-suite/Client-Kanban_View.png",
        alt: "CM-Suite · Flujo de aprobación en tablero Kanban",
      },
      {
        src: "/cm-suite/Client_Main-Dashboard_1.png",
        alt: "CM-Suite · Workspace de cliente con analytics de Instagram y link de solo lectura",
      },
      {
        src: "/cm-suite/User-Main_View.png",
        alt: "CM-Suite · Vista del cliente sobre su propio calendario de contenido",
      },
      {
        src: "/cm-suite/User-Changes_Modal.png",
        alt: "CM-Suite · El cliente aprueba o pide cambios sobre una pieza de contenido",
      },
    ],
    primaryLink: {
      label: "Ver repositorio",
      href: "https://github.com/BautiCentorbi/infinitgraphics-dashboard",
    },
  },
  {
    slug: "blindaje-digital",
    name: "Blindaje Digital",
    tagline:
      "Plataforma de seguridad, monitoreo y convivencia para barrios y empresas",
    description:
      "Software de gestión de accesos, seguridad operativa y convivencia para barrios privados, consorcios y empresas: control de ingresos, rondas de seguridad con geolocalización, botón de pánico, reservas de amenities y reportes. Nace como el brazo tecnológico de Blindaje Seguridad Privada, con arquitectura pensada para operar también como SaaS independiente.",
    tags: ["Control de accesos", "Rondas GPS", "Emergencias", "Convivencia"],
    status: "concept",
    statusLabel: "En desarrollo — concepto de producto, repo próximamente",
    relatedCaseSlug: "blindaje",
    relatedCaseLabel: "Ver caso de Blindaje Seguridad Privada",
  },
];
