"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { ExperienceItem } from "@/app/data/about.data";
import { useLenis } from "@/app/providers/ScrollProvider";

function getNavH() {
  const navHVar = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-h",
  );
  const navH = parseInt((navHVar || "96").trim(), 10);
  return Number.isFinite(navH) ? navH : 96;
}

type Props = {
  items: ExperienceItem[];
  /** Altura mínima por bloque en múltiplos de viewport (120 = 120vh) */
  sectionVH?: number;
};

/* -------------------- Hook: activo por centro de viewport -------------------- */
function useActiveByCenter(count: number, opts?: { topOffset?: number }) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!count) return;
    let raf = 0;

    const readNavH = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
      const n = parseInt(v || "0", 10);
      return Number.isFinite(n) && n > 0 ? n : 96;
    };

    const measure = () => {
      const header = opts?.topOffset ?? readNavH();
      const centerY = window.scrollY + header + window.innerHeight * 0.33; // “centro” algo alto para lectura

      let bestIdx = 0;
      let bestDist = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        const mid = (top + bottom) / 2;
        const d = Math.abs(centerY - mid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      });

      setActive(bestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // medición inicial
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, opts?.topOffset]);

  return { itemRefs, active };
}

/* -------------------- Sticky izquierdo (simple) -------------------- */
function ExperienceSticky({
  exp,
  progress,
}: {
  exp: ExperienceItem;
  progress: number; // 0..1
}) {
  const { scrollTo } = useLenis();

  return (
    <div className="md:sticky md:top-[calc(var(--nav-h,88px)+16px)] space-y-5">
      {/* Progreso de lectura */}
      <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full bg-white transition-[width] duration-200"
          style={{ width: `${Math.round(progress * 100)}%` }}
          aria-hidden
        />
      </div>

      <div className="rounded-2xl border border-neutral-700/80 bg-neutral-900/70 p-5 backdrop-blur">
        <div className="flex items-baseline justify-between">
          <time className="text-lg font-semibold text-white">{exp.year}</time>
          <span className="text-xs uppercase tracking-wider text-neutral-400">Experiencia</span>
        </div>
        <h4 className="mt-1 text-xl font-semibold tracking-tight text-white">{exp.company}</h4>
        <p className="text-neutral-400">{exp.subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4">
          {exp.link ? (
            <Link
              href={exp.link}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold border border-white bg-white text-black hover:-translate-y-0.5 transition"
            >
              Ver caso
            </Link>
          ) : (
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el instanceof HTMLElement) {
                  scrollTo(el, { offset: -getNavH(), duration: 0.9 });
                }
                history.replaceState(null, "", "#contact");
              }}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold border border-neutral-600 bg-neutral-800 text-white hover:-translate-y-0.5 transition"
            >
              Hablemos
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Ítem derecha -------------------- */
function ExperienceCard({
  exp,
  idx,
  itemRefs,
  sectionVH,
}: {
  exp: ExperienceItem;
  idx: number;
  itemRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
  sectionVH: number;
}) {
  return (
    <li
      ref={(el) => {
        itemRefs.current[idx] = el;
      }}
      className="grid grid-cols-12 gap-4 md:gap-6"
      style={{ minHeight: `min(${sectionVH}vh, 600px)` }}
    >
      {/* Año */}
      <div className="col-span-12 md:col-span-2">
        <time
          dateTime={exp.year}
          className="inline-block rounded-lg border border-neutral-700 px-3 py-1 text-sm font-semibold text-white"
        >
          {exp.year}
        </time>
      </div>

      {/* Contenido */}
      <div className="col-span-12 md:col-span-10">
        <article className="rounded-xl border border-neutral-700/80 bg-neutral-900/60 p-6 hover:bg-neutral-900 transition">
          {/* Título */}
          <h4 className="text-2xl font-semibold tracking-tight text-white">
            {exp.company}
            {exp.subtitle && (
              <span className="text-neutral-400 font-normal"> — {exp.subtitle}</span>
            )}
          </h4>

          {/* Rol */}
          {exp.roleTitle && (
            <p className="mt-1 text-xl text-neutral-300">
              <strong>Rol:</strong> {exp.roleTitle}
            </p>
          )}

          {/* Descripción */}
          <p className="mt-3 text-lg leading-relaxed text-neutral-200">
            {exp.summary}
          </p>

          {/* Logros */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-neutral-200 mb-1">
                Logros clave:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-300 text-sm">
                {exp.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs text-neutral-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link */}
          {exp.link && (
            <div className="mt-5">
              <Link
                href={exp.link}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold border border-white bg-white text-black hover:-translate-y-0.5 transition"
              >
                Ver caso
              </Link>
            </div>
          )}
        </article>
      </div>
    </li>
  );
}

/* -------------------- Sección completa (MVP, con título arriba) -------------------- */
export default function ExperienceSection({ items, sectionVH = 120 }: Props) {
  const safe = useMemo(() => items ?? [], [items]);
  const { itemRefs, active } = useActiveByCenter(safe.length);
  const progress = safe.length > 0 ? (active + 1) / safe.length : 0;
  const current = safe[active] ?? safe[0];

  return (
    <section id="experiencia">
      {/* Título único de la sección */}
      <h3 className="font-bold text-4xl uppercase tracking-[0.18em] text-white mb-5">
        Experiencia
      </h3>

      {/* Grid principal */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-10">
        {/* Izquierda sticky */}
        <aside className="col-span-12 md:col-span-4">
          {current && <ExperienceSticky exp={current} progress={progress} />}
        </aside>

        {/* Derecha lista */}
        <div className="col-span-12 md:col-span-8">
          <ul className="space-y-10">
            {safe.map((exp, idx) => (
              <ExperienceCard
                key={`${exp.year}-${exp.company}-${idx}`}
                exp={exp}
                idx={idx}
                itemRefs={itemRefs}
                sectionVH={sectionVH}
              />
            ))}
            
          </ul>
        </div>
      </div>
    </section>
  );
}



