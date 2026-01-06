"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { NAV_ITEMS } from "@/app/lib/nav";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useLenis } from "@/app/providers/ScrollProvider";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const EASE = "[ease:cubic-bezier(0.16,1,0.3,1)]";
const DURATION_FILL = "duration-300";
const DURATION_BORDER = "duration-150";

function SwipeNavItem({
  id,
  label,
  active,
  onClick,
  className,
}: {
  id: string;
  label: string;
  active: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  return (
    <Link
      href={`#${id}`}
      onClick={onClick}
      className={clsx(
        "group relative inline-flex items-center",
        "px-3 py-2 text-xl transition-colors",
        active ? "font-bold text-white" : "text-neutral-800 hover:text-white",
        className
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

        {/* 4) SUBRAYADO */}
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

function getNavH() {
  const navHVar = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-h"
  );
  const navH = parseInt((navHVar || "96").trim(), 10);
  return Number.isFinite(navH) ? navH : 96;
}

export default function NavBar() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // Mide el alto real del header y lo expone como --nav-h
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () =>
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);

    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("load", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", setVar);
    };
  }, []);

  // Cierra con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const { scrollTo } = useLenis();

  const handleNavClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const el = document.querySelector(`#${id}`);
      if (el instanceof HTMLElement) {
        const navH = getNavH();
        scrollTo(el, { offset: -navH, duration: 0.9 });
      }
      history.replaceState(null, "", `#${id}`);
      setOpen(false);
    };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 bg-gray-200">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label="Volver al inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("body", { duration: 0.9 });
              setOpen(false);
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

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-3 justify-end">
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
                  onClick={handleNavClick(item.id)}
                />
              </li>
            ))}
          </ul>

          {/* MOBILE TOGGLE (se OCULTA cuando open=true, para que no haya dos X) */}
          <button
            type="button"
            className={clsx(
              "md:hidden inline-flex items-center justify-center",
              "rounded-md border border-black/20 w-11 h-11",
              "hover:bg-black/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60",
              open && "opacity-0 pointer-events-none" // mantiene espacio, pero desaparece
            )}
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY + PANEL */}
      <div
        id="mobile-nav"
        className={clsx(
          "md:hidden",
          "fixed inset-0 z-40",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className={clsx(
            "absolute inset-0 bg-black/30 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Panel */}
        <div
          className={clsx(
            "absolute right-0 top-0 h-full w-[82%] max-w-sm bg-gray-200",
            "border-l border-black/10",
            "pt-var(--nav-h)",
            "transition-transform duration-300",
            EASE,
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* X DEL PANEL: ABSOLUTO AL PANEL (NO lo afecta el padding-top) */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="
              absolute right-4 top-2.5 z-10
              inline-flex items-center justify-center
              rounded-md border border-black/20
              w-11 h-11
              hover:bg-black/5
              transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60
            "
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="px-4 py-4">
            <span className="text-sm text-neutral-700">Navegación</span>

            <ul className="mt-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <SwipeNavItem
                    id={item.id}
                    label={item.label}
                    active={active === item.id}
                    onClick={handleNavClick(item.id)}
                    className="w-full justify-start text-2xl"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
