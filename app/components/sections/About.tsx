"use client";

import Image from "next/image";
import Link from "next/link";
import { ABOUT } from "@/app/data/about.data";
import ReactMarkdown from "react-markdown";
import ExperienceSection from "./Experience";
import { useLenis } from "@/app/providers/ScrollProvider";

export default function AboutSplit() {
  const { scrollTo } = useLenis();

  const cta = ABOUT.cta;

  return (
    <section id="about" className="scroll-mt-28">
      {/* Poster headline */}
      <header className="mx-auto max-w-6xl px-4 md:px-0">
        <p className="text-sm tracking-[0.22em] uppercase text-neutral-500">
          {ABOUT.poster.kicker}
        </p>
        <h1 className="mt-4 font-black leading-[0.92] tracking-[-0.02em] text-[clamp(2.4rem,7vw,7rem)]">
          {ABOUT.poster.titleA}
          <br className="hidden md:block" />
          <span className="block">{ABOUT.poster.titleB}</span>
          <span className="block text-neutral-400">{ABOUT.poster.titleC}</span>
        </h1>
      </header>

      {/* BLOQUE SUPERIOR (foto + bio + capacidades + métricas + CTA TODO AQUÍ) */}
      <div className="mx-auto max-w-6xl px-4 md:px-0 mt-10 md:mt-16 grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-10">
        {/* Foto */}
        <figure className="col-span-12 md:col-span-4">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-200">
            <Image
              src={ABOUT.photo.src}
              alt={ABOUT.photo.alt}
              fill
              sizes="(min-width:1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Etiquetas y CTA debajo de la foto */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm uppercase tracking-wider text-neutral-500">
              {ABOUT.tag}
            </span>
            <span className="text-lg font-semibold">{ABOUT.year}</span>
          </div>

          {cta?.href && cta?.label ? (
            <a
              href={cta.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(cta.href, { offset: -96, duration: 1 });
              }}
              className="mt-3 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold border border-black bg-black text-white hover:-translate-y-0.5 transition"
            >
              {cta.label}
            </a>
          ) : null}
        </figure>

        {/* Bio + Capacidades + Métricas */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          {/* Bio */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 backdrop-blur">
            <div className="text-lg md:text-xl leading-relaxed">
              <ReactMarkdown
                components={{
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                }}
              >
                {ABOUT.bio}
              </ReactMarkdown>
            </div>
          </div>

          {/* Capacidades + Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Block title="Capacidades">
              <ul className="space-y-2">
                {ABOUT.capabilities.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 rounded-xl border border-neutral-200/80 bg-white/60 px-4 py-2 backdrop-blur hover:bg-white transition"
                  >
                    <span className="size-1.5 rounded-full bg-black" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Capacidades">
              <ul className="divide-y divide-neutral-200/80">
                {ABOUT.principles.map((p) => (
                  <li key={p} className="py-3">
                    <span className="text-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </div>

      {/* EXPERIENCIA: AHORA FULL-WIDTH DEL CONTENEDOR PADRE (SIN STICKY IZQ) */}
      <div className="mx-auto max-w-6xl px-4 md:px-0 mt-16">
        <ExperienceSection items={ABOUT?.experience ?? []} />
      </div>
    </section>
  );
}

/* ---------- Helper ---------- */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 backdrop-blur">
      <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}
