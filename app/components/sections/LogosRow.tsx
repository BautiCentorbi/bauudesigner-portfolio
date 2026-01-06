"use client";

import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

export type LogoItem = {
  id: string;
  title: string;
  year: string | number;
  img: string;
};

type Base = { item: LogoItem; className?: string; ariaLabel?: string };
type Linky = Base & { asLink: true; href: LinkProps["href"] };
type Divy = Base & { asLink?: false; href?: never };
export type LogoTileProps = Linky | Divy;

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants;

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
            md:brightness-0 md:saturate-100
            transition-all duration-300
            group-hover:brightness-100 group-hover:saturate-100 group-hover:opacity-100
          "
        />
      </div>

      {/* Caption: responsive SOLO para <md (md+ queda igual que antes: text-xl) */}
      <div className="absolute left-3 bottom-3 text-neutral-600 flex gap-2 items-center">
        <span className="text-base sm:text-lg md:text-xl">{item.title}</span>
        <span className="text-base sm:text-lg md:text-xl text-neutral-400">
          {item.year}
        </span>
      </div>
    </>
  );
}

export function LogoTile(props: LogoTileProps) {
  const { item, className, ariaLabel } = props;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
      className={clsx(
        "group relative aspect-square outline-1 outline-gray-300",
        "bg-black/3",
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
            "grid",
            // Desktop: igual a tu layout actual
            "grid-cols-2 md:grid-cols-3",
            // Espaciado (si ya te funciona, dejalo; esto solo mejora mobile)
            "gap-3 sm:gap-4 md:gap-0"
          )}
        >
          {/* TEXTO: en mobile ocupa 2 columnas (full width). En desktop queda igual. */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-center p-4 sm:p-6">
            <h3 className="font-alt text-lg md:text-3xl font-semibold text-neutral-800 tracking-tight mb-3">
              Identidad visual sólida
            </h3>
            <p className="text-neutral-800 leading-relaxed font-inter text-base sm:text-lg md:text-xl">
              Desarrollo marcas auténticas que transmiten esencia, propósito y diferenciación real.
              Cada logo es diseñado para ser versátil, memorable y adaptable a entornos digitales y físicos.
            </p>
          </div>

          {/* LOGOS: desktop igual, centrado 3/2 intacto */}
          {items.map((item, i) => {
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
                className={clsx(centerSecondRow)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
