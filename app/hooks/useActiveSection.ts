// app/hooks/useActiveSection.ts
"use client";

import { useEffect, useMemo, useState } from "react";

type Options = {
  /** Offset desde el top para contemplar el header fijo */
  offset?: number; // px
};

/**
 * Observa las secciones por id y devuelve cuál está activa.
 * Compensa el header fijo leyendo --nav-h o usando offset explícito.
 */
export function useActiveSection(ids: string[], options?: Options) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const idsKey = useMemo(() => ids.join("|"), [ids]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const headerOffset =
      options?.offset ?? readNavHeightCssVar() ?? /* fallback */ 96;

    const io = new IntersectionObserver(
      (entries) => {
        // 1) si hay intersectados, elijo el de mayor ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive((visible.target as HTMLElement).id);
          return;
        }

        // 2) fallback: “sección pasada” más cercana al scroll actual
        const y = window.scrollY + headerOffset + 1;
        let best: HTMLElement | null = null;
        let bestDist = Infinity;
        for (const el of els) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= y && y - top < bestDist) {
            bestDist = y - top;
            best = el;
          }
        }
        if (best) setActive(best.id);
      },
      {
        // Compensamos header y dejamos margen inferior para que no cambie
        // demasiado pronto al acercarse al siguiente bloque
        root: null,
        rootMargin: `-${headerOffset}px 0px -70% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [idsKey, options?.offset]);

  return active;
}

function readNavHeightCssVar(): number | null {
  const v = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-h"
  );
  const n = parseInt(v || "", 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}
