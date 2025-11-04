"use client";
import { useEffect, useState } from "react";

/**
 * Detecta qué sección (por ID) está visible en el viewport.
 * Ideal para resaltar el link activo del NavBar.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // cuando entra/sale de pantalla
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [sectionIds.join(",")]);

  return active;
}
