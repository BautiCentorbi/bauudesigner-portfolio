"use client";

import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

/* ---------- Tipos públicos ---------- */
export type LogoItem = {
  id: string;
  title: string;
  year: string | number;
  img: string; // /public/logos/*.webp|png|svg
};

// Discriminada: si asLink=true → href obligatorio; si false/omitido → sin href
type Base = { item: LogoItem; className?: string; ariaLabel?: string };
type Linky = Base & { asLink: true; href: LinkProps["href"] };
type Divy = Base & { asLink?: false; href?: never };
export type LogoTileProps = Linky | Divy;

/* ---------- Anim ---------- */
const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants;

/* ---------- UI interna ---------- */
function TileInner({ item }: { item: LogoItem }) {
  return (
    <>
      <div className="absolute inset-0 grid place-items-center">
        <Image
          src={item.img}
          alt={item.title}
          width={600}
          height={600}
          className="
            max-h-[52%] w-auto object-contain
            brightness-0 saturate-100 opacity-90
            transition-all duration-300
            group-hover:brightness-100 group-hover:saturate-100 group-hover:opacity-100
          "
        />
      </div>

      <div className="absolute left-3 bottom-3 text-neutral-600 text-[13px] flex gap-2 items-center">
        <span className="text-xl">{item.title}</span>
        <span className="text-xl text-neutral-400">{item.year}</span>
      </div>
    </>
  );
}

/* ---------- Componente único ---------- */
export function LogoTile(props: LogoTileProps) {
  const { item, className, ariaLabel } = props;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
      className={clsx(
        // leve achique del contenedor
        "group relative aspect-square outline-1 outline-gray-300", "bg-black/3",
        className
      )}
    >
      {props.asLink ? (
        <Link
          href={props.href}
          aria-label={ariaLabel ?? item.title}
          className="absolute inset-0 block p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
        >
          <TileInner item={item} />
        </Link>
      ) : (
        <div
          role="img"
          aria-label={ariaLabel ?? item.title}
          className="absolute inset-0 block p-3"
        >
          <TileInner item={item} />
        </div>
      )}
    </motion.div>
  );
}

/* ---------- Grid (responsive + 3/2 centrados en desktop) ---------- */
export function LogosRow({
  items,
  className,
}: {
  items: LogoItem[];
  className?: string;
}) {
  return (
    <section id="logos" className={clsx("py-8 md:py-10", className)}>
      <div className="mx-auto max-w-6xl px-4 md:px-0">
        <div
          className={clsx(
            // responsive base
            "grid ",
            // mobile: 2 por fila, tablet+: 3 por fila
            "grid-cols-2 md:grid-cols-3"
          )}
        >
          <div className="flex flex-col justify-center p-6">
            <h3 className="font-alt text-lg md:text-3xl font-semibold text-neutral-800 tracking-tight mb-3">
              Identidad visual sólida
            </h3>
            <p className="text-neutral-800 leading-relaxed font-inter text-md md:text-xl">
              Desarrollo marcas auténticas que transmiten esencia, propósito
              y diferenciación real. Cada logo es diseñado para ser versátil,
              memorable y adaptable a entornos digitales y físicos.
            </p>
          </div>
          {items.map((item, i) => {
            // Si hay 5 elementos exactamente:
            // fila 1: i=0,1,2 (cols 1-3)
            // fila 2: i=3,4 -> centrados en md+: col-start-2 y col-start-3
            const centerSecondRow =
              items.length === 5 && i >= 3
                ? i === 3
                  ? "md:col-start-2"
                  : "md:col-start-3"
                : undefined;

            return (
              <LogoTile
                key={item.id}
                item={item}
                className={clsx(
                  "h-full", // asegura tamaño consistente
                  centerSecondRow
                )}
              />
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
