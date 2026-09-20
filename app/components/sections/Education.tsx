"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import MainButton from "../shared/MainButton";

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
  urlLabel?: string; // texto del botón (opcional)
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

  if (!item) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          aria-labelledby={`${dialogId}-title`}
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {/* Backdrop oscuro + blur */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          {/* Contenido */}
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div
              className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
          {/* Cerrar */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
          >
            <X className="h-4 w-4" aria-hidden />
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

              {item.url ? (
                <MainButton
                  as="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full flex justify-center"
                  ariaLabel={`Abrir proyecto de ${item.title}`}
                >
                  {item.urlLabel ?? "Ver proyecto"}
                </MainButton>
              ) : null}
            </div>
          </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------- Fila condensada -------------------- */
function EducationRow({
  item,
  onOpen,
}: {
  item: EducationItem;
  onOpen: (it: EducationItem) => void;
}) {
  return (
    <button
      onClick={() => onOpen(item)}
      aria-label={`Ver detalle de ${item.title}`}
      className="group flex w-full items-center justify-between gap-4 border-b border-foreground/15 py-3 text-left last:border-b-0 hover:bg-neutral-100/60 transition-colors"
    >
      <div className="min-w-0">
        <span className="font-semibold">{item.title}</span>
        <span className="text-neutral-600">
          {" "}
          — {item.institution} · {item.year}
          {item.duration ? ` · ${item.duration}` : ""}
        </span>
      </div>
      <span className="shrink-0 text-xs text-neutral-500 underline underline-offset-4 decoration-neutral-300 group-hover:decoration-neutral-600">
        Ver detalle
      </span>
    </button>
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
            Certificaciones, <span className="text-pink-400">cursos</span> y
            formación.
          </h2>
        </header>
      </div>

      {/* Bloques por carrera: encabezado liviano + lista condensada */}
      <div className="mx-auto max-w-6xl px-4 md:px-0 space-y-8">
        {grouped.map(([trackKey, list]) => {
          const meta =
            trackKey === "otros"
              ? null
              : TRACKS[trackKey as keyof typeof TRACKS];

          return (
            <div key={trackKey}>
              <div className="flex items-baseline justify-between gap-4 border-b border-foreground/40 pb-2">
                <h3 className="text-base md:text-lg font-semibold tracking-tight">
                  {trackKey === "otros"
                    ? "Otros cursos y certificaciones"
                    : meta?.title}
                </h3>
                <span className="shrink-0 text-xs text-neutral-500">
                  {list.length} {list.length === 1 ? "curso" : "cursos"}
                </span>
              </div>

              <div>
                {list.map((item) => (
                  <EducationRow key={item.id} item={item} onOpen={openModal} />
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
