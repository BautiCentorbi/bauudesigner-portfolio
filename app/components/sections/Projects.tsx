"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  motion,
  type Variants,
  type Transition,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { PROJECTS as CASES } from "@/app/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}


const PROJECTS: Project[] = CASES.map((p) => ({
  id: p.slug,
  slug: p.slug,
  title: p.clientName,
  tags: p.tags,
  img: p.heroImage.src, // si no existe img, usa heroImage
}));


type Project = {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  img: string;
};

const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

const sectionContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.15, staggerChildren: 0.18 },
  },
};

const headingUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45, ease: easeOut } },
};

// Ajustes de viewport para disparar “in-view” de forma fluida
const VIEWPORT = {
  amount: 0.45, // ~45% del elemento visible
  margin: "0px 0px -10% 0px", // arranca un poco antes
  once: true, // animar cada vez que entra (cámbialo a true si querés 1 sola vez)
};


function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function pairAtPairIndex(pairIndex: number): [Project, Project] {
  const pairs = Math.ceil(PROJECTS.length / 2);
  const pi = mod(pairIndex, pairs);
  const a = (pi * 2) % PROJECTS.length;
  const b = (a + 1) % PROJECTS.length;
  return [PROJECTS[a], PROJECTS[b]];
}


function ProjectCard({
  p,
  side,
  delay = 0,
}: {
  p: Project;
  side: "left" | "right";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={clsx(
        "relative z-0 block w-full overflow-hidden",
        "rounded-2xl md:rounded-none py-4 md:py-0",
        side === "left" && "md:rounded-l-2xl",
        side === "right" && "md:rounded-r-2xl"
      )}
    >
      <Link href={`/projects/${p.slug}`} className="group block relative">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          layoutId={`project-hero-${p.slug}`}
          transition={{
            delay,
            duration: reduceMotion ? 0 : 0.45,
            ease: easeOut,
          }}
          className="relative aspect-16/10 overflow-hidden"
        >
          <Image
            src={p.img}
            alt={p.title}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </motion.div>

        {/* overlay igual que ahora */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className={clsx(
              "absolute inset-x-0 bottom-0 h-24 md:h-32",
              "bg-linear-to-t from-black/80 to-transparent",
              "opacity-100 translate-y-0",
              "md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0",
              "transition-all duration-300",
              "rounded-2xl md:rounded-none",
              side === "left" && "md:rounded-bl-2xl",
              side === "right" && "md:rounded-br-2xl"
            )}
          />
          <div
            className={clsx(
              "absolute inset-x-0 bottom-0 p-4 md:p-6",
              "opacity-100 translate-y-0",
              "md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0",
              "transition-all duration-300",
              side === "left"
                ? "text-right pr-6 md:pr-10"
                : "text-left pl-6 md:pl-10"
            )}
          >
            <h3 className="font-alt text-white text-xl md:text-2xl font-semibold leading-tight">
              {p.title}
            </h3>
            <div
              className={clsx(
                "mt-2 flex flex-wrap gap-2",
                side === "left" ? "justify-end" : "justify-start"
              )}
            >
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/90 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


function WipeButton({
  dir = "right",
  onClick,
}: {
  dir?: "left" | "right";
  onClick: () => void;
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Ver anteriores" : "Ver siguientes"}
      className="
        group relative inline-flex items-center justify-center
        w-16 h-16 rounded-full overflow-hidden
        border border-black/10 bg-white
        shadow-sm shadow-black/10
        transition-transform duration-300 hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60
      "
    >
      {/* capa de wipe (negra) */}
      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-0 bg-black",
          "transition-transform duration-300 [ease:cubic-bezier(0.16,1,0.3,1)]",
          dir === "right"
            ? "-translate-x-full group-hover:translate-x-0"
            : "translate-x-full group-hover:translate-x-0"
        )}
      />
      {/* chevron: por defecto negro, en hover blanco */}
      <Icon
        size={28}
        className="relative z-10 transition-colors duration-300 text-black group-hover:text-white"
      />
    </button>
  );
}

export default function ProjectsGallery() {
  const [page, setPage] = useState(0);
  const [left, right] = useMemo(() => pairAtPairIndex(page), [page]);
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="projects"
      className="scroll-mt-24 py-12"
      variants={sectionContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ duration: reduceMotion ? 0 : undefined }}
    >
      {/* Heading */}
      <motion.div
        variants={headingUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto max-w-6xl px-4 md:px-0 mb-6"
      >
        <p className="font-alt text-xl uppercase tracking-wide text-neutral-700">
          Proyectos
        </p>
        <h2 className="text-2xl md:text-6xl font-bold tracking-tight">
          Mis trabajos recientes
        </h2>
      </motion.div>

      {/* FULL-BLEED WRAPPER */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] isolate">
        {/* Flecha izq */}
        <motion.div
          variants={headingUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="z-20 pointer-events-none absolute inset-y-0 left-0 w-1/2 flex items-center"
        >
          <div className="pointer-events-auto pl-3 md:pl-6">
            <WipeButton dir="left" onClick={() => setPage((p) => p - 1)} />
          </div>
        </motion.div>

        {/* Flecha der */}
        <motion.div
          variants={headingUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="z-20 pointer-events-none absolute inset-y-0 right-0 w-1/2 flex items-center justify-end"
        >
          <div className="pointer-events-auto pr-3 md:pr-6">
            <WipeButton dir="right" onClick={() => setPage((p) => p + 1)} />
          </div>
        </motion.div>

        {/* GRID */}
        <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {/* dentro de tu grid: */}
            <ProjectCard
              p={left}
              side="left"
              delay={0.0}
              key={`left-${left.id}`}
            />

            <ProjectCard
              p={right}
              side="right"
              delay={0.08}
              key={`right-${right.id}`}
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
