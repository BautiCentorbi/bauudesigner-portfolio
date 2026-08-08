"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useLenis } from "@/app/providers/ScrollProvider";
import MainButton from "../shared/MainButton";
import { easeOut, container, fadeUp } from "@/app/lib/animationEffects";

const CYCLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CYCLE_WORDS = [
  { text: "Experiencias", colorClass: "text-cyan-500" },
  { text: "Identidades", colorClass: "text-pink-400" },
];

/** Palabra rotativa: sube en cubic-bezier y alterna color en cada ciclo */
function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % CYCLE_WORDS.length),
      2500,
    );
    return () => clearInterval(id);
  }, []);

  const current = CYCLE_WORDS[index];

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={current.text}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: CYCLE_EASE }}
          className={clsx("inline-block", current.colorClass)}
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Variantes de forma para cada trazo: cada ciclo dibuja una versión ligeramente distinta */
const DOODLE_LINES = [
  {
    color: "#67e8f9",
    strokeWidth: 2.5,
    periodMs: 3200,
    variants: [
      "M14 18 C 60 6, 96 22, 108 52",
      "M10 30 C 50 10, 90 12, 112 48",
      "M18 8 C 55 22, 84 36, 104 58",
    ],
  },
  {
    color: "#f9a8d4",
    strokeWidth: 3,
    periodMs: 3900,
    variants: [
      "M46 118 Q 90 102 140 118 T 234 116",
      "M40 112 Q 100 128 150 110 T 240 122",
      "M50 122 Q 95 106 145 122 T 230 112",
    ],
  },
  {
    color: "#67e8f9",
    strokeWidth: 2.5,
    periodMs: 2700,
    variants: [
      "M278 24 L288 34 M280 40 L290 30 M284 20 L284 44",
      "M276 30 L292 30 M284 22 L284 38 M279 24 L289 36",
      "M280 22 L286 40 M280 40 L286 22 M283 20 L283 42",
    ],
  },
];

/** Un trazo que se dibuja, se sostiene y se borra, ciclando entre un par de formas */
function DoodleLine({
  color,
  strokeWidth,
  variants,
  periodMs,
  reduceMotion,
}: {
  color: string;
  strokeWidth: number;
  variants: string[];
  periodMs: number;
  reduceMotion: boolean;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % variants.length),
      periodMs,
    );
    return () => clearInterval(id);
  }, [periodMs, variants.length, reduceMotion]);

  const pathVariants: Variants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.9, ease: CYCLE_EASE },
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.6, ease: CYCLE_EASE },
    },
  };

  if (reduceMotion) {
    return (
      <path
        d={variants[0]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.8}
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.path
        key={idx}
        d={variants[idx]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </AnimatePresence>
  );
}

/** Doodle de 3 trazos "dibujados a mano" que llaman la atención sobre el CTA, en loop continuo */
function ContactDoodle() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 320 140"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-x-1 -inset-y-2 sm:-inset-x-4 sm:-inset-y-4 md:-inset-x-10 md:-inset-y-10"
      fill="none"
    >
      {DOODLE_LINES.map((line, i) => (
        <DoodleLine key={i} {...line} reduceMotion={!!reduceMotion} />
      ))}
    </svg>
  );
}

export default function Hero() {
  const { scrollTo } = useLenis();

  return (
    <motion.div
      className="px-12 max-lg:px-6 max-sm:px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h1
        className="
          flex flex-col font-bold uppercase items-center h-full
          leading-[0.8]

          /* MOBILE/TABLET (colapsa y baja tamaño) */
          max-lg:text-[8rem]
          max-md:text-[6rem]
          max-sm:text-[3.5rem]
          max-sm:leading-[0.9]
          max-sm:text-center

          /* DESKTOP: escala editorial entre 1280 y 1920 sin romper */
          lg:text-[clamp(8.75rem,11vw,14rem)]
        "
      >
        {/* Línea 1 */}
        <div
          className="
            flex text-left

            /* desktop: ritmo editorial controlado */
            lg:gap-[clamp(0.75rem,1.2vw,1rem)]

            /* responsive: colapsa */
            max-lg:flex-col max-lg:gap-6 max-lg:w-full
            max-sm:text-center
          "
        >
          <motion.span
            variants={fadeUp}
            className="w-full uppercase max-lg:text-center"
          >
            Mucho más que{" "}
            <span className="transition-colors duration-300 hover:text-blue-600">
              Diseño
            </span>
          </motion.span>

          <motion.div
            variants={fadeUp}
            className="
              text-left mt-auto w-fit
              max-lg:mt-0 max-lg:w-full max-lg:text-center
            "
          >
            <div className="relative mt-12 max-lg:mt-6">
              <ContactDoodle />
              <Link href="#contact">
                <MainButton
                  className="
                    font-inter text-2xl w-full my-4
                    max-lg:text-lg max-lg:w-full
                  "
                  rounded="rounded-full"
                >
                  Contactame
                </MainButton>
              </Link>
            </div>

            <span className="font-alt text-2xl font-bold uppercase block max-lg:text-xl">
              Bautista Centorbi
            </span>
            <p className="font-sans text-2xl leading-[0.9] max-lg:text-xl">
              Diseñador Gráfico &amp; Desarrollador Web
            </p>
            <p className="text-lg text-slate-700 max-lg:text-base">
              Mendoza, Argentina
            </p>
          </motion.div>
        </div>

        {/* Línea 2 */}
        <div
          className="
            flex text-right

            lg:gap-[clamp(0.75rem,1.2vw,1rem)]

            max-lg:flex-col-reverse max-lg:gap-8 max-lg:w-full max-lg:text-center
          "
        >
          <motion.a
            variants={fadeUp}
            href="#projects"
            aria-label="Ir a proyectos"
            className="
              inline-flex

              /* desktop: en vez de mt-48 fijo, escalamos para 1280/1366/1600 */
              lg:mt-[clamp(3rem,10vh,12rem)]

              max-lg:mt-6 max-lg:justify-center
            "
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#projects", { offset: -96, duration: 1 });
            }}
          >
            <span
              className="
                group relative inline-flex items-center justify-center
                w-28 h-28 rounded-full overflow-hidden
                transition-transform duration-300 hover:-translate-y-0.5
                outline-none focus-visible:ring-2 focus-visible:ring-black/60

                max-sm:w-20 max-sm:h-20
              "
            >
              <span
                className="
                  pointer-events-none absolute inset-0 rounded-full
                  border border-black
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-150
                "
              />
              <span
                className="
                  pointer-events-none absolute inset-x-0 bottom-0
                  h-full w-full bg-black
                  translate-y-full group-hover:translate-y-0
                  transition-transform duration-400 delay-100
                  [ease:cubic-bezier(0.16,1,0.3,1)]
                  will-change-transform
                "
              />
              <ChevronDown
                size={64}
                className="
                  relative z-10 transition-colors duration-300
                  text-black group-hover:text-white
                  max-sm:w-10 max-sm:h-10
                "
              />
            </span>
          </motion.a>

          <motion.span
            variants={fadeUp}
            className="w-full uppercase max-lg:text-center"
          >
            Construyo <CyclingWord />
          </motion.span>
        </div>
      </h1>
    </motion.div>
  );
}
