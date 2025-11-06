"use client";

import Image from "next/image";
import clsx from "clsx";

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

  return (
    <section
      aria-label="Clientes que confían en mí"
      className={clsx("relative w-screen left-1/2 right-1/2 -mx-[50vw]", className)}
    >
      {/* Pausa en hover con group */}
      <div className="group relative overflow-hidden py-6 md:py-8">
        {/* Wrapper ÚNICO que se anima */}
        <div
          className="marquee flex will-change-transform"
          style={
            {
              // var para controlar duración (igual que antes, pero robusto)
              "--marquee-duration": `${durationSec}s`,
            } as React.CSSProperties
          }
        >
          {/* TRACK A (misma estética que tenías) */}
          <div className="track flex min-w-max flex-none items-center gap-10 md:gap-16">
            {TRACK.map((logo, i) => (
              <div
                key={`a-${logo.id}-${i}`}
                className={clsx("shrink-0 flex items-center justify-center", "px-2")}
              >
                {/* Contenedor uniforme por alto */}
                <div className={clsx("relative", logoHeightClass)}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={220}
                    height={80}
                    sizes="(min-width: 1024px) 220px, 33vw"
                    className="h-full w-auto object-contain
                               brightness-0 saturate-100 text-foreground
                               opacity-90 transition-opacity duration-200
                               group-hover:opacity-100"
                    priority={i < 6}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* TRACK B (idéntico; aria-hidden para accesibilidad) */}
          <div className="px-8 md:px-12 track flex min-w-max flex-none items-center gap-10 md:gap-16" aria-hidden="true">
            {TRACK.map((logo, i) => (
              <div
                key={`b-${logo.id}-${i}`}
                className={clsx("shrink-0 flex items-center justify-center", "px-2")}
              >
                <div className={clsx("relative", logoHeightClass)}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={220}
                    height={80}
                    sizes="(min-width: 1024px) 220px, 33vw"
                    className="h-full w-auto object-contain
                               brightness-0 saturate-100 text-foreground
                               opacity-90 transition-opacity duration-200
                               group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradientes sutiles en bordes (fade) — igual que tenías */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-gray-200 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-gray-200 to-transparent" />
      </div>

      {/* Estilos: loop perfecto y pausa en hover (mismo espíritu que el tuyo) */}
      <style jsx global>{`
        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0); /* desplaza exactamente 1 pista */
          }
        }
        .marquee {
          animation: marquee-scroll var(--marquee-duration) linear infinite;
        }
        /* Pausa en hover */
        .group:hover .marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
