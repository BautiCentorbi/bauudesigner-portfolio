"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { container, fadeUp } from "@/app/lib/animationEffects";
import { SIDE_PROJECTS, type SideProject } from "@/app/lib/sideProjects";

const VIEWPORT = { amount: 0.3, margin: "0px 0px -10% 0px", once: true };

function StatusDot({ status }: { status: SideProject["status"] }) {
  return (
    <span
      aria-hidden
      className={
        status === "active"
          ? "inline-block h-2 w-2 rounded-full bg-emerald-500"
          : "inline-block h-2 w-2 rounded-full bg-amber-500"
      }
    />
  );
}

function SideProjectCard({ project }: { project: SideProject }) {
  return (
    <motion.article
      variants={fadeUp}
      className="flex h-full flex-col border border-black/15 bg-white/40 p-6 md:p-8"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-600">
        <StatusDot status={project.status} />
        {project.statusLabel}
      </div>

      <h3 className="font-alt mt-4 text-2xl md:text-3xl font-bold tracking-tight">
        {project.name}
        {project.nameNote && (
          <span className="ml-2 align-middle text-sm font-normal text-neutral-500">
            {project.nameNote}
          </span>
        )}
      </h3>

      <p className="mt-1 text-sm md:text-base text-neutral-700">
        {project.tagline}
      </p>

      <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-800 opacity-90">
        {project.description}
      </p>

      {project.screenshots?.length ? (
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {project.screenshots.map((s) => (
            <a
              key={s.src}
              href={s.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ampliar: ${s.alt}`}
              className="group relative aspect-video overflow-hidden rounded-lg border border-black/15 bg-neutral-900"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 12rem, 45vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 flex items-end justify-end bg-black/0 p-1.5 transition-colors group-hover:bg-black/30">
                <span className="rounded-full bg-black/80 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Ampliar
                </span>
              </span>
            </a>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full border border-black/25 px-3 py-1 text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
        {project.primaryLink ? (
          <Link
            href={project.primaryLink.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm hover:opacity-85 transition-opacity"
          >
            <Github size={16} />
            {project.primaryLink.label}
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-black/20 text-neutral-500 px-5 py-2.5 text-sm cursor-default">
            <Github size={16} />
            Repo próximamente
          </span>
        )}

        {project.relatedCaseSlug && (
          <Link
            href={`/projects/${project.relatedCaseSlug}`}
            className="inline-flex items-center gap-1 text-sm underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors"
          >
            {project.relatedCaseLabel}
            <ArrowUpRight size={14} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export default function SideProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id="side-projects"
      className="scroll-mt-24 py-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ duration: reduceMotion ? 0 : undefined }}
    >
      <motion.div
        variants={fadeUp}
        className="mx-auto max-w-6xl px-4 md:px-0 mb-8"
      >
        <p className="font-alt text-xl uppercase tracking-wide text-neutral-700">
          Side Projects
        </p>
        <h2 className="text-2xl md:text-6xl font-bold tracking-tight">
          En construcción
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-neutral-700">
          Proyectos propios en curso, por fuera del trabajo con clientes. Sin
          caso cerrado todavía — los muestro tal como están.
        </p>
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 md:px-0 grid gap-6 md:grid-cols-2">
        {SIDE_PROJECTS.map((p) => (
          <SideProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </motion.section>
  );
}
