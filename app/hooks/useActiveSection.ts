"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
  offset?: number; // px
};

export function useActiveSection(ids: string[], options?: Options) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const idsKey = useMemo(() => ids.join("|"), [ids]);

  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const headerOffset =
      options?.offset ?? readNavHeightCssVar() ?? /* fallback */ 96;

    let raf = 0;

    const compute = () => {
      raf = 0;

      // y = línea “de lectura” justo debajo del nav
      const y = window.scrollY + headerOffset + 1;

      // Elegimos la última sección cuyo top <= y
      let bestId = els[0]?.id ?? "";

      for (const el of els) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= y) bestId = el.id;
        else break; // els está en orden DOM; si no, quitá este break
      }

      if (bestId && bestId !== activeRef.current) {
        setActive(bestId);
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    // 1) Actualiza por scroll/resize (lo importante)
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // 2) IO solo para recalcular cuando hay cambios de layout (imagenes, fuentes)
    const io = new IntersectionObserver(schedule, {
      root: null,
      rootMargin: `-${headerOffset}px 0px -60% 0px`,
      threshold: [0],
    });
    els.forEach((el) => io.observe(el));

    // Inicial
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [idsKey, options?.offset]);

  return active;
}

function readNavHeightCssVar(): number | null {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  const n = parseInt(v || "", 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}
