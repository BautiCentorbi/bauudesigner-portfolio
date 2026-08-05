"use client";

import { ChevronUp } from "lucide-react";
import { motion, type Variants, type Transition } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { easeOut } from "@/app/lib/animationEffects";
import { useLenis } from "@/app/providers/ScrollProvider";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "#projects" },
  { label: "Logotipos", href: "#logos" },
  { label: "Sobre Mí", href: "#about" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Educación", href: "#education" },
  { label: "Contacto", href: "#contact" },
];

export default function Footer() {
  const { scrollTo } = useLenis();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // En home: scrollea dentro de la página. Fuera de home (ej. /projects/[slug]),
  // las anclas de las secciones no existen, así que navegamos de vuelta a "/"
  // (con el hash, para que intente ubicarse en la sección al llegar).
  const goTo = (href: string) => {
    if (href === "/") {
      if (isHome) {
        scrollTo("body", { duration: 0.9 });
      } else {
        router.push("/");
      }
      return;
    }

    if (isHome) {
      scrollTo(href, { offset: -96, duration: 1 });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <footer className="w-full bg-gray-200">
      {/* Top section */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          {/* Left: Big title */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-6">
              <h2 className="text-[44px] leading-[1.05] tracking-tight md:text-[72px]">
                {isHome ? "Ver proyectos" : "Volver al inicio"}
              </h2>

              {/* Circle arrow button (estilo referencia) */}
              <motion.a
                variants={fadeUp}
                href={isHome ? "#projects" : "/"}
                aria-label={isHome ? "Ir a proyectos" : "Volver al inicio"}
                className="mt-48 inline-flex"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(isHome ? "#projects" : "/");
                }}
              >
                <span
                  className="
      group relative inline-flex items-center justify-center
      w-28 h-28 rounded-full
      overflow-hidden   /* <- recorta el relleno */
      transition-transform duration-300 hover:-translate-y-0.5
      outline-none focus-visible:ring-2 focus-visible:ring-black/60
    "
                >
                  {/* 1) BORDE (aparece primero) */}
                  <span
                    className="
        pointer-events-none absolute inset-0 rounded-full
        border border-black
        opacity-0 group-hover:opacity-100
        transition-opacity duration-150
      "
                  />

                  {/* 2) RELLENO: rectángulo que sube (wipe) */}
                  <span
                    className="
        pointer-events-none absolute inset-x-0 bottom-0
        h-full w-full bg-black
        translate-y-full group-hover:translate-y-0
        transition-transform duration-400 delay-100
        [ease:cubic-bezier(0.16,1,0.3,1)]
        will-change-transform
      "
                  />

                  {/* 3) ICONO: negro -> blanco cuando el fill cubre */}
                  <ChevronUp
                    size={64}
                    className="
        relative z-10 transition-colors duration-300
        text-black group-hover:text-white
      "
                  />
                </span>
              </motion.a>
            </div>
          </div>

          {/* Right: Single column links */}
          <nav
            className="md:col-span-5 md:justify-self-end"
            aria-label="Footer navigation"
          >
            <ul className="space-y-4 text-[20px] leading-tight text-black/45 md:text-[24px]">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href === "/" ? "/" : `/${item.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(item.href);
                    }}
                    className="group relative inline-block pb-1 transition-colors hover:text-black/80 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black/30"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 [ease:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
            <div className="md:col-span-4">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  goTo("/");
                }}
                className="font-alt text-sm font-bold uppercase tracking-tight hover:opacity-70 transition-opacity"
              >
                Bautista Centorbi
              </Link>
            </div>

            {/* Location */}
            <div className="md:col-span-4 md:text-center">
              <p className="text-xs text-black/60">Mendoza, Argentina</p>
            </div>

            {/* Email */}
            <div className="md:col-span-4 md:text-right">
              <a
                href="mailto:bcentorbi.designer@gmail.com"
                className="text-xs text-black/60 transition hover:text-black/85 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-black/30"
              >
                bcentorbi.designer@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
