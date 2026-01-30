"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/app/lib/animationEffects";
import Image from "next/image";
import Link from "next/link";
import type { ProjectCase as ProjectCaseType } from "@/app/lib/projects";
import ProjectBlocks from "./ProjectBlock";
import { ArrowUpRight } from "lucide-react";

function TagPill({ label, inverted }: { label: string; inverted?: boolean }) {
  return (
    <span
      className={
        inverted
          ? "inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-xs"
          : "inline-flex items-center rounded-full border border-black/25 px-3 py-1 text-sm"
      }
    >
      {label}
    </span>
  );
}

export default function ProjectCase({ project }: { project: ProjectCaseType }) {
  return (
    <main className="bg-gray-200">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 md:px-0 pt-24 md:pt-28 pb-10">
        <div className="grid gap-10 md:grid-cols-12 items-start">
          {/* Intro left */}
          <div className="md:col-span-5">
            <p className="text-md md:text-xl leading-relaxed text-neutral-900/90">
              {project.heroIntro}
            </p>
          </div>

          {/* Client right */}
          <div className="md:col-span-7">
            <div className="text-right">
              <p className="text-neutral-600 text-lg md:text-2xl leading-none">
                {project.clientLabel ?? "Cliente:"}
              </p>

              <h1 className="font-bold uppercase tracking-tight leading-[0.85] text-[clamp(2.6rem,6vw,5.5rem)]">
                {project.clientName}
              </h1>
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {project.tags.map((t) => (
                <TagPill key={t} label={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Image + CTA */}
        <div className="mt-10 grid gap-6 md:grid-cols-12 items-center">
          <div className="md:col-span-9">
            <div className="relative w-full overflow-hidden border border-black/15">
              <div className="relative aspect-video">
                <Image
                  src={project.heroImage.src}
                  alt={project.heroImage.alt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex md:flex-col items-center md:items-end gap-3 md:gap-4">
            {project.primaryCta && (
              <Link
                href={project.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm md:text-base w-full md:w-auto"
              >
                {project.primaryCta.label}
              </Link>
            )}

            {project.secondaryCta && (
              <motion.a
                variants={fadeUp}
                initial="hidden"
                animate="show"
                href={project.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                aria-label={project.secondaryCta.label}
                className="inline-flex lg:mt-[clamp(1rem,2vh,4rem)] max-lg:mt-6 max-lg:justify-center"
              >
                <span className="group relative inline-flex items-center justify-center w-28 h-28 rounded-full overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-black/60 max-sm:w-20 max-sm:h-20">
                  <span className="pointer-events-none absolute inset-0 rounded-full border border-black opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-400 delay-100 [ease:cubic-bezier(0.16,1,0.3,1)] will-change-transform" />
                  <ArrowUpRight
                    size={64}
                    className="relative z-10 transition-colors duration-300 text-black group-hover:text-white max-sm:w-10 max-sm:h-10"
                  />
                </span>
              </motion.a>
            )}
          </div>
        </div>
      </section>

      {/* BLOQUES (modular) */}
      <ProjectBlocks project={project} />
    </main>
  );
}
