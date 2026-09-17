// app/lib/nav.ts
export type NavItem = {
  id: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "projects", label: "Proyectos" },
  { id: "side-projects", label: "Side Projects" },
  { id: "about", label: "Sobre Mi" },
  { id: "education", label: "Educación" },
  { id: "contact", label: "Contacto" },
];
