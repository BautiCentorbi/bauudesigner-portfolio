"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { NAV_ITEMS } from "@/app/lib/nav";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useLenis } from "@/app/providers/ScrollProvider";

const EASE = "[ease:cubic-bezier(0.16,1,0.3,1)]";
const DURATION_FILL = "duration-300";
const DURATION_BORDER = "duration-150";

function SwipeNavItem({
  id,
  label,
  active,
  onClick,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={`#${id}`}
      onClick={onClick}
      className={clsx(
        "group relative inline-flex items-center",
        "px-3 py-2 text-xl transition-colors",
        active ? "font-bold text-white" : "text-neutral-800 hover:text-white"
      )}
    >
      <span className="relative overflow-hidden rounded-md">
        {/* 1) BORDE */}
        <span
          aria-hidden
          className={clsx(
            "pointer-events-none absolute inset-0 rounded-md border border-black",
            "opacity-0 group-hover:opacity-100",
            DURATION_BORDER
          )}
        />

        {/* 2) FILL (wipe L→R) */}
        <span
          aria-hidden
          className={clsx(
            "pointer-events-none absolute inset-y-0 left-0 w-full bg-black",
            "-translate-x-full group-hover:translate-x-0",
            active && "translate-x-0",
            `transition-transform ${DURATION_FILL} ${EASE}`
          )}
        />

        {/* 3) TEXTO */}
        <span
          className={clsx(
            "relative z-10 px-2 py-1 transition-colors duration-300",
            active ? "text-white" : "group-hover:text-white"
          )}
        >
          {label}
        </span>

        {/* 4) SUBRAYADO sincronizado */}
        <span
          aria-hidden
          className={clsx(
            "absolute -bottom-1 left-0 h-0.5 bg-black origin-left",
            "w-0 group-hover:w-full",
            active && "w-full",
            `transition-[width] ${DURATION_FILL} ${EASE}`
          )}
        />
      </span>
    </Link>
  );
}

export default function NavBar() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const { scrollTo } = useLenis();

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4">
        {/* FLEX principal → logo izq / nav der */}
        <div className="flex h-16 items-center justify-between">
          {/* 🖋️ LOGO IZQUIERDA */}
          <Link
            href="/"
            aria-label="Volver al inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("body", { duration: 0.9 });
            }}
            className="inline-flex items-center gap-2 hover:opacity-90 hover:-translate-y-px transition-all duration-200 motion-reduce:transition-none"
          >
            <Image
              src="/logos/Infinite_Graphics-Logo.webp"
              alt="Infinite Graphics"
              width={170}
              height={40}
              priority
              className="h-5 w-auto object-contain md:h-7"
            />
          </Link>

          {/* 🧭 NAV DERECHO */}
          <ul className="flex items-center gap-3 justify-end">
            {/* Accesibilidad */}
            <li className="sr-only focus:not-sr-only">
              <a href="#home" className="px-3 py-1 rounded bg-white text-black">
                Saltar al contenido
              </a>
            </li>

            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <SwipeNavItem
                  id={item.id}
                  label={item.label}
                  active={active === item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(`#${item.id}`);
                    if (el instanceof HTMLElement) {
                      scrollTo(el, { offset: -96, duration: 0.9 });
                    }
                    history.replaceState(null, "", `#${item.id}`);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
