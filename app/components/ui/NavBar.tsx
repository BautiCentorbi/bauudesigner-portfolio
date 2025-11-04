"use client";
import Link from "next/link";
import clsx from "clsx";
import { NAV_ITEMS } from "@/app/lib/nav";
import { useActiveSection } from "@/app/hooks/useActiveSection";

export default function NavBar() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4">
        <ul className="flex h-16 items-center gap-4">
          {/* Accesibilidad: saltar al contenido */}
          <li className="sr-only focus:not-sr-only">
            <a href="#home" className="px-3 py-1 rounded bg-white text-black">
              Saltar al contenido
            </a>
          </li>

          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={clsx(
                  "inline-block px-3 py-2 text-md transition-colors",
                  active === item.id
                    ? "font-bold"
                    : "text-neutral-800 hover:text-blue-600",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
