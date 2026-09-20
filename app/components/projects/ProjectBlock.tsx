"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectBlock, ProjectCase as ProjectCaseType, ProjectMedia } from "@/app/lib/projects";
import { fadeUp } from "@/app/lib/animationEffects";
import ProjectMediaGrid from "./ProjectMediaGrid";

const REVEAL_VIEWPORT = { once: true, amount: 0.3, margin: "0px 0px -10% 0px" };

/** Envuelve cada bloque con un fade-up sutil al entrar en viewport. */
function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

function SectionShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 md:px-0">{children}</div>;
}

/** Solo monta el <video> (y dispara la descarga) cuando está por entrar en viewport. */
function LazyVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useInView(ref, { once: true, margin: "200px 0px" });

  return (
    <div ref={ref} className="h-full w-full">
      {isNear && (
        <video
          className="h-full w-full object-cover"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-label={label}
        />
      )}
    </div>
  );
}

function aspectClass(aspect?: ProjectMedia["aspect"]) {
  switch (aspect) {
    case "21/9":
      return "aspect-[21/9]";
    case "16/9":
      return "aspect-[16/9]";
    case "4/3":
      return "aspect-[4/3]";
    case "1/1":
      return "aspect-square";
    default:
      return "aspect-[16/9]";
  }
}

function BlockRenderer({ block }: { block: ProjectBlock }) {
  switch (block.kind) {
    case "richText":
      return (
        <Reveal>
          <section className={block.tone === "dark" ? "bg-black text-white py-16" : "py-16"}>
            <SectionShell>
              <p
                className={[
                  block.align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
                  "text-base md:text-xl leading-relaxed opacity-90",
                ].join(" ")}
              >
                {block.text}
              </p>
            </SectionShell>
          </section>
        </Reveal>
      );

    case "mediaGrid":
      if (!block.items?.length) return null;
      return (
        <Reveal>
          <section className="py-0">
            <SectionShell>
              <ProjectMediaGrid layout={block.layout} items={block.items} />
            </SectionShell>
          </section>
        </Reveal>
      );

    case "sectionTitle":
      return (
        <Reveal>
          <section className="py-8">
            <SectionShell>
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-black" />
                <h3 className="text-lg md:text-2xl font-bold uppercase">{block.title}</h3>
                <span className="h-px flex-1 bg-black" />
              </div>
            </SectionShell>
          </section>
        </Reveal>
      );

    case "video":
      return (
        <Reveal>
          <section className="py-0">
            <SectionShell>
              <div className={aspectClass(block.aspect)}>
                <LazyVideo src={block.src} label={block.label} />
              </div>
            </SectionShell>
          </section>
        </Reveal>
      );

    case "highlights":
      return (
        <Reveal>
          <section className="py-12">
            <SectionShell>
              <div className="flex items-end justify-between gap-4">
                <h3 className="text-lg md:text-2xl font-bold uppercase">
                  {block.title ?? "Highlights"}
                </h3>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {block.items.map((it) => (
                  <div key={it.label} className="border border-black/15 p-4">
                    <p className="text-sm text-neutral-600">{it.label}</p>
                    <p className="font-semibold">{it.value}</p>
                  </div>
                ))}
              </div>
            </SectionShell>
          </section>
        </Reveal>
      );

    case "stack":
      return (
        <Reveal>
          <section className="py-10">
            <SectionShell>
              <h3 className="text-lg md:text-2xl font-bold uppercase">
                {block.title ?? "Stack"}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {block.items.map((t) => (
                  <span key={t} className="rounded-full border border-black/25 px-3 py-1 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </SectionShell>
          </section>
        </Reveal>
      );

    case "deliverables":
      return (
        <Reveal>
          <section className="py-10">
            <SectionShell>
              <h3 className="text-lg md:text-2xl font-bold uppercase">
                {block.title ?? "Entregables"}
              </h3>
              <ul className="mt-4 list-disc pl-5 space-y-2">
                {block.items.map((d) => (
                  <li key={d} className="text-neutral-800">
                    {d}
                  </li>
                ))}
              </ul>
            </SectionShell>
          </section>
        </Reveal>
      );

    case "closing":
      return (
        <Reveal>
          <section className="py-16">
            <SectionShell>
              <div className="grid gap-10 md:grid-cols-12 items-end">
                <div className="md:col-span-8">
                  <p className="text-neutral-900/90 leading-relaxed">{block.leftText}</p>
                </div>

                <div className="md:col-span-4 text-right">
                  <h3 className="font-bold uppercase text-2xl md:text-4xl leading-none">
                    {block.rightTitle}
                  </h3>
                  <div className="mt-3 flex flex-wrap justify-end gap-2">
                    {block.rightTags.map((t) => (
                      <span key={t} className="inline-flex items-center rounded-full bg-black text-white px-3 py-1 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionShell>
          </section>
        </Reveal>
      );

    case "crosslink":
      return (
        <Reveal>
          <section className="py-10">
            <SectionShell>
              <Link
                href={block.href}
                className="group block border border-black/15 p-6 md:p-8 transition-colors hover:border-black/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-600">
                      {block.eyebrow}
                    </p>
                    <h3 className="mt-1 text-xl md:text-2xl font-bold">
                      {block.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm md:text-base text-neutral-700">
                      {block.description}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap">
                    {block.linkLabel}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            </SectionShell>
          </section>
        </Reveal>
      );

    default:
      return null;
  }
}

export default function ProjectBlocks({ project }: { project: ProjectCaseType }) {
  return (
    <>
      {project.blocks.map((block, idx) => (
        <BlockRenderer key={`${block.kind}-${idx}`} block={block} />
      ))}
    </>
  );
}
