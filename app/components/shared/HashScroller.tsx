"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/app/providers/ScrollProvider";

const MAX_WAIT_MS = 2000;

function getNavH() {
  const navHVar = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-h",
  );
  const navH = parseInt((navHVar || "96").trim(), 10);
  return Number.isFinite(navH) ? navH : 96;
}

// Al llegar a "/" desde otra ruta con un hash (ej. /#contact), espera a que la
// sección exista en el DOM y recién ahí scrollea. Next no puede resolverlo solo
// porque la home aparece con la transición de página y Lenis controla el scroll.
export default function HashScroller() {
  const pathname = usePathname();
  const { scrollTo, lenis } = useLenis();

  useEffect(() => {
    if (pathname !== "/" || !lenis) return;

    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let raf = 0;
    const start = performance.now();

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        scrollTo(el, { offset: -getNavH(), duration: 0.9 });
        return;
      }
      if (performance.now() - start < MAX_WAIT_MS) {
        raf = requestAnimationFrame(tryScroll);
      }
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
    // scrollTo cambia en cada render del provider; solo importa cuándo cambia la ruta o Lenis.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, lenis]);

  return null;
}
