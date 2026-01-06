"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

/* -------------------- Tipos -------------------- */
export type EducationItem = {
  id: string;
  title: string; // "Diplomatura en UI"
  institution: string; // "Universidad X"
  year: string; // "2024"
  duration?: string; // "6 meses"
  certificateSrc?: string; // /certs/ui-ux.webp (opcional)
  description?: string; // breve overview
  highlights?: string[]; // bullets: logros/aprendizajes
  url?: string; // link externo (opcional)
  trackId?: "ux-ui" | "frontend-react";
};

export type EducationProps = {
  items: EducationItem[];
  className?: string;
};

/* -------------------- Modal accesible -------------------- */
function EducationModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: EducationItem | null;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogId = useId();

  // Bloquear scroll fondo
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Foco inicial en botón Cerrar
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  if (!open || !item) return null;

  return (
    <div
      aria-labelledby={`${dialogId}-title`}
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-60"
    >
      {/* Backdrop oscuro + blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenido */}
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl">
          {/* Cerrar */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
          >
            ×
          </button>

          <div className="grid grid-cols-12 gap-6 p-6 md:p-8">
            {/* Certificado */}
            <div className="col-span-12 md:col-span-6">
              <div className="relative w-full overflow-hidden rounded-xl bg-neutral-200 aspect-4/3">
                {item.certificateSrc ? (
                  <Image
                    src={item.certificateSrc}
                    alt={`Certificado de ${item.title}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 90vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-neutral-500">
                    Sin vista previa
                  </div>
                )}
              </div>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm underline underline-offset-4 decoration-neutral-300 hover:decoration-black"
                >
                  Ver más →
                </a>
              ) : null}
            </div>

            {/* Detalle */}
            <div className="col-span-12 md:col-span-6">
              <h3
                id={`${dialogId}-title`}
                className="text-2xl font-semibold leading-tight"
              >
                {item.title}
              </h3>
              <p className="mt-1 text-neutral-600">
                {item.institution} · {item.year}
                {item.duration ? ` · ${item.duration}` : ""}
              </p>

              {item.description ? (
                <p className="mt-4 leading-relaxed text-neutral-800">
                  {item.description}
                </p>
              ) : null}

              {item.highlights?.length ? (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-neutral-800 mb-1">
                    Aprendizajes / logros:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-700 text-sm">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Tarjeta (bloque azul) -------------------- */
function EducationCard({
  item,
  onOpen,
}: {
  item: EducationItem;
  onOpen: (it: EducationItem) => void;
}) {
  return (
    <div
      className={clsx(
        // full-bleed + bordes arriba/abajo
        "relative w-screen mx-auto",
        "border-y border-foreground/40"
      )}
    >
      {/* Contenido centrado en ancho, pero texto alineado a la izquierda */}
      <div className="mx-auto max-w-6xl px-4 md:px-0 py-8 md:py-10">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Columna texto */}
          <div className="col-span-12 md:col-span-8 text-left">
            <h4 className="text-xl md:text-2xl font-semibold leading-tight">
              {item.title}
            </h4>

            <p className="mt-1 text-sm md:text-base text-neutral-600">
              {item.institution} · {item.year}
              {item.duration ? ` · ${item.duration}` : ""}
            </p>

            {item.highlights?.length ? (
              <ul className="mt-4 list-disc pl-5 space-y-1 text-sm md:text-[0.95rem] leading-relaxed text-neutral-700">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Columna certificado (misma “banda” de padding) */}
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <button
              onClick={() => onOpen(item)}
              className="group relative w-full md:max-w-xs overflow-hidden rounded-xl border border-neutral-200 bg-white"
              aria-label={`Abrir certificado de ${item.title}`}
            >
              <div className="relative aspect-4/3 w-full">
                {item.certificateSrc ? (
                  <Image
                    src={item.certificateSrc}
                    alt={`Certificado de ${item.title}`}
                    fill
                    sizes="(min-width: 768px) 20rem, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-neutral-500">
                    Ver certificado
                  </div>
                )}
              </div>

              <span className="absolute bottom-2 right-2 rounded-full bg-black/80 px-2 py-0.5 text-xs text-white">
                Ampliar
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Sección completa -------------------- */

const TRACKS: Record<
  NonNullable<EducationItem["trackId"]>,
  { title: string; subtitle?: string; order: number }
> = {
  "ux-ui": {
    title: "Carrera Desarrollador UX/UI",
    subtitle: "Trayecto de formación (Coderhouse)",
    order: 1,
  },
  "frontend-react": {
    title: "Carrera Desarrollo Frontend React",
    subtitle: "Trayecto de formación (Coderhouse)",
    order: 2,
  },
};

export default function EducationSection({ items, className }: EducationProps) {
  const data = useMemo(() => items ?? [], [items]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<EducationItem | null>(null);

  const openModal = (it: EducationItem) => {
    setCurrent(it);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setCurrent(null), 180);
  };

  // Agrupar por trackId (y ordenar)
  const grouped = useMemo(() => {
    const groups = new Map<string, EducationItem[]>();

    for (const it of data) {
      const key = it.trackId ?? "otros";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(it);
    }

    // Orden dentro de cada grupo (por año desc)
    for (const [k, arr] of groups) {
      arr.sort((a, b) => Number(b.year) - Number(a.year));
      groups.set(k, arr);
    }

    // Orden de grupos (según TRACKS.order; "otros" al final)
    const entries = Array.from(groups.entries()).sort(([a], [b]) => {
      const oa =
        a === "otros" ? 999 : TRACKS[a as keyof typeof TRACKS]?.order ?? 50;

      const ob =
        b === "otros" ? 999 : TRACKS[b as keyof typeof TRACKS]?.order ?? 50;

      return oa - ob;
    });

    return entries;
  }, [data]);

  return (
    <section
      id="education"
      className={clsx("scroll-mt-28 overflow-x-hidden", className)}
    >
      {/* Encabezado centrado en el contenedor */}
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <header className="mb-6 md:mb-10">
          <p className="text-sm tracking-[0.22em] uppercase text-neutral-500">
            Educación
          </p>
          <h2 className="mt-2 font-black leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,6vw,4rem)]">
            Certificaciones, <span className="text-neutral-400">cursos</span> y
            formación.
          </h2>
        </header>
      </div>

      {/* Bloques por carrera (separadores + cards intactas) */}
      {/* Bloques por carrera (separadores + cards intactas) */}
      <div className="space-y-12">
        {grouped.map(([trackKey, list], idx) => {
          const meta =
            trackKey === "otros"
              ? null
              : TRACKS[trackKey as keyof typeof TRACKS];

          return (
            <div key={trackKey} className="space-y-6">
              {/* Separador de carrera - FULL BLEED BAND */}
              <div
                className={clsx(
                  "relative w-screen mx-auto",
                  "border-y border-foreground/40",
                  "bg-foreground"
                )}
              >
                <div className="mx-auto max-w-6xl px-4 md:px-0 py-10 md:py-12">
                  <div className="flex items-end justify-between gap-6">
                    <div className="text-left">
                      <p className="text-md tracking-[0.22em] uppercase text-neutral-100">
                        {trackKey === "otros" ? "Otros" : "Carrera"}
                      </p>

                      <h3 className="text-white mt-2 text-xl md:text-4xl font-semibold tracking-[-0.01em]">
                        {trackKey === "otros"
                          ? "Cursos y certificaciones"
                          : meta?.title}
                      </h3>

                      {meta?.subtitle ? (
                        <p className="mt-2 text-lg text-neutral-100">
                          {meta.subtitle}
                        </p>
                      ) : null}
                    </div>

                    <div className="text-md text-neutral-300">
                      {list.length} {list.length === 1 ? "curso" : "cursos"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tus tarjetas full-bleed intactas */}
              <div className="space-y-4">
                {list.map((item) => (
                  <EducationCard key={item.id} item={item} onOpen={openModal} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <EducationModal open={open} onClose={closeModal} item={current} />
    </section>
  );
}
