"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

/* -------------------- Tipos -------------------- */
export type EducationItem = {
  id: string;
  title: string;           // "Diplomatura en UI"
  institution: string;     // "Universidad X"
  year: string;            // "2024"
  duration?: string;       // "6 meses"
  certificateSrc?: string; // /certs/ui-ux.webp (opcional)
  description?: string;    // breve overview
  highlights?: string[];   // bullets: logros/aprendizajes
  url?: string;            // link externo (opcional)
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
    <button
      onClick={() => onOpen(item)}
      className={clsx(
        "group relative w-full overflow-hidden rounded-xl",
        "bg-[rgb(58,29,245)] text-white", // azul intenso
        "px-5 py-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold leading-tight">{item.title}</h4>
          <p className="text-white/80 text-sm">
            {item.institution} · {item.year}
            {item.duration ? ` · ${item.duration}` : ""}
          </p>
        </div>
        <span
          aria-hidden
          className="translate-y-1 rounded-full border border-white/30 px-2 py-0.5 text-xs"
        >
          Ver
        </span>
      </div>
    </button>
  );
}

/* -------------------- Sección completa -------------------- */
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
    // pequeño delay para evitar flicker al cerrar
    setTimeout(() => setCurrent(null), 180);
  };

  return (
    <section id="educacion" className={clsx("scroll-mt-28", className)}>
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        {/* Encabezado simple a la izquierda */}
        <header className="mb-6 md:mb-10">
          <p className="text-sm tracking-[0.22em] uppercase text-neutral-500">
            Educación
          </p>
          <h2 className="mt-2 font-black leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,6vw,4rem)]">
            Certificaciones, <span className="text-neutral-400">cursos</span> y
            formación.
          </h2>
        </header>

        {/* Layout: los bloques azules “alineados a la derecha” */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Columna vacía para empujar a la derecha en desktop */}
          <div className="col-span-12 md:col-span-7" />

          {/* Columna derecha con las tarjetas */}
          <div className="col-span-12 md:col-span-5 space-y-4">
            {data.map((item) => (
              <EducationCard key={item.id} item={item} onOpen={openModal} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <EducationModal open={open} onClose={closeModal} item={current} />
    </section>
  );
}
