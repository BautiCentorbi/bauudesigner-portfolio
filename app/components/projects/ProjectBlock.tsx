"use client";

import type { ProjectBlock, ProjectCase as ProjectCaseType } from "@/app/lib/projects";
import ProjectMediaGrid from "./ProjectMediaGrid";

function SectionShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 md:px-0">{children}</div>;
}

function BlockRenderer({ block }: { block: ProjectBlock }) {
  switch (block.kind) {
    case "richText":
      return (
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
      );

    case "mediaGrid":
      if (!block.items?.length) return null;
      return (
        <section className="py-0">
          <SectionShell>
            <ProjectMediaGrid layout={block.layout} items={block.items} />
          </SectionShell>
        </section>
      );

    case "highlights":
      return (
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
      );

    case "stack":
      return (
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
      );

    case "deliverables":
      return (
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
      );

    case "closing":
      return (
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
