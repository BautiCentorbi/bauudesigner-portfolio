"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

type ScrollCtx = {
  lenis: Lenis | null;
  /** helper para scrollear desde cualquier parte */
  scrollTo: (target: string | HTMLElement, opts?: Parameters<Lenis["scrollTo"]>[1]) => void;
};

const ScrollContext = createContext<ScrollCtx>({ lenis: null, scrollTo: () => {} });

/** Hook oficial para consumir el contexto */
export function useLenis() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ✅ Lenis v1 API (paquete 'lenis')
    const instance = new Lenis({
      smoothWheel: true,           // reemplaza smoothWheel/smoothTouch
      duration: 0.8,                     // segundos aprox.
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 1.5,              // opcional
    });

    setLenis(instance);

    const raf = (time: number) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      instance.destroy();
    };
  }, []);

  const scrollTo: ScrollCtx["scrollTo"] = (target, opts) => {
    if (!lenis) return;
    lenis.scrollTo(target, opts);
  };

  return (
    <ScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}
