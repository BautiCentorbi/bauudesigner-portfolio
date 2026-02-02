"use client";

import Image from "next/image";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";

/** Tipo de logo (ruta en /public/clients/* de preferencia) */
export type ClientLogo = {
  id: string;
  src: string;
  alt: string;
};

/** Props del marquee */
export type ClientsMarqueeProps = {
  logos: ClientLogo[];
  className?: string;
  /** Alto de cada logo (tailwind). Default: h-12 md:h-14 */
  logoHeightClass?: string;
  /** Duración del loop (segundos). Default: 28 */
  durationSec?: number;
};

export default function ClientsMarquee({
  logos,
  className,
  logoHeightClass = "h-12 md:h-14",
  durationSec = 28,
}: ClientsMarqueeProps) {
  // Usamos dos pistas idénticas para loop perfecto (estética intacta)
  const TRACK = logos;
  const trackClass = "track flex min-w-max flex-none items-center";
  const [repeatCount, setRepeatCount] = useState(2);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const containerEl = containerRef.current;
    const measureEl = measureRef.current;
    if (!containerEl || !measureEl) return;

    let rafId = 0;

    const updateRepeats = () => {
      const containerWidth = containerEl.getBoundingClientRect().width;
      const baseWidth = measureEl.getBoundingClientRect().width;
      if (containerWidth <= 0 || baseWidth <= 0) return;
      const needed = Math.max(2, Math.ceil(containerWidth / baseWidth) + 1);
      setRepeatCount((prev) => (prev === needed ? prev : needed));
    };

    updateRepeats();
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateRepeats);
    });
    resizeObserver.observe(containerEl);
    resizeObserver.observe(measureEl);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [TRACK.length]);

  useLayoutEffect(() => {
    const marqueeEl = marqueeRef.current;
    const trackEl = trackRef.current;
    if (!marqueeEl || !trackEl) return;

    let rafId = 0;
    let lastTs = 0;
    let offset = 0;
    let trackWidth = 0;
    let isVisible = true;
    let isPaused = false;
    let isPageHidden = false;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateWidth = () => {
      trackWidth = trackEl.getBoundingClientRect().width;
      if (trackWidth > 0) {
        offset = offset % trackWidth;
      }
    };

    const tick = (ts: number) => {
      if (prefersReduced || !isVisible || isPaused || isPageHidden || trackWidth <= 0) {
        lastTs = ts;
        rafId = requestAnimationFrame(tick);
        return;
      }
      const dt = ts - lastTs;
      lastTs = ts;

      const speed = trackWidth / (durationSec * 2500);
      offset = (offset + speed * dt) % trackWidth;
      marqueeEl.style.transform = `translate3d(${-offset}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    updateWidth();
    rafId = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    resizeObserver.observe(trackEl);

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(marqueeEl);

    const onMouseEnter = () => {
      isPaused = true;
    };
    const onMouseLeave = () => {
      isPaused = false;
      lastTs = performance.now();
    };
    marqueeEl.addEventListener("mouseenter", onMouseEnter);
    marqueeEl.addEventListener("mouseleave", onMouseLeave);

    const onVisibilityChange = () => {
      isPageHidden = document.visibilityState === "hidden";
      lastTs = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
      marqueeEl.removeEventListener("mouseenter", onMouseEnter);
      marqueeEl.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [durationSec]);

  return (
    <section
      aria-label="Clientes que confían en mí"
      className={clsx("relative w-screen left-1/2 right-1/2 -mx-[50vw]", className)}
    >
      {/* Pausa en hover con group */}
      <div ref={containerRef} className="group relative overflow-hidden py-6 md:py-8">
        {/* Medición de un set único (fuera de flujo) */}
        <div
          ref={measureRef}
          className="pointer-events-none absolute left-0 top-0 -z-10 opacity-0"
          aria-hidden="true"
        >
          <div className={trackClass}>
            {TRACK.map((logo, i) => (
              <div
                key={`m-${logo.id}-${i}`}
                className={clsx("shrink-0 flex items-center justify-center", "px-2")}
              >
                <div className={clsx("relative", logoHeightClass)}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={240}
                    height={80}
                    sizes="(min-width: 1024px) 220px, 33vw"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wrapper ÚNICO que se anima */}
        <div
          ref={marqueeRef}
          className="marquee flex will-change-transform"
        >
          {/* TRACK A (misma estética que tenías) */}
          <div ref={trackRef} className={trackClass}>
            {Array.from({ length: repeatCount }).flatMap((_, repeatIndex) =>
              TRACK.map((logo, i) => (
                <div
                  key={`a-${repeatIndex}-${logo.id}-${i}`}
                  className={clsx("shrink-0 flex items-center justify-center", "px-2")}
                >
                  {/* Contenedor uniforme por alto */}
                  <div className={clsx("relative", logoHeightClass)}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={240}
                      height={80}
                      sizes="(min-width: 1024px) 220px, 33vw"
                      className="h-full w-auto object-contain
                               brightness-0 saturate-100 text-foreground
                               opacity-90 transition-opacity duration-200
                               group-hover:opacity-100"
                      priority={repeatIndex === 0 && i < 6}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* TRACK B (idéntico; aria-hidden para accesibilidad) */}
          <div className={trackClass} aria-hidden="true">
            {Array.from({ length: repeatCount }).flatMap((_, repeatIndex) =>
              TRACK.map((logo, i) => (
                <div
                  key={`b-${repeatIndex}-${logo.id}-${i}`}
                  className={clsx("shrink-0 flex items-center justify-center", "px-2")}
                >
                  <div className={clsx("relative", logoHeightClass)}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={240}
                      height={80}
                      sizes="(min-width: 1024px) 220px, 33vw"
                      className="h-full w-auto object-contain
                               brightness-0 saturate-100 text-foreground
                               opacity-90 transition-opacity duration-200
                               group-hover:opacity-100"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Gradientes sutiles en bordes (fade) — igual que tenías */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-gray-200 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-gray-200 to-transparent" />
      </div>

      {/* Estilos: loop perfecto y pausa en hover (mismo espíritu que el tuyo) */}
      <style jsx global>{`
        .marquee {
          --marquee-gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .marquee {
            --marquee-gap: 4rem;
          }
        }
        .track {
          gap: var(--marquee-gap);
          padding-right: var(--marquee-gap);
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
