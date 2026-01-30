"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLenis } from "@/app/providers/ScrollProvider";
import MainButton from "../shared/MainButton";
import { easeOut, container, fadeUp } from "@/app/lib/animationEffects";

export default function Hero() {
  const { scrollTo } = useLenis();

  return (
    <motion.div
      className="px-12 max-lg:px-6 max-sm:px-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
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
            <Link href="#contact">
              <MainButton
                href="#contact"
                className="
                  mt-12 font-inter text-2xl w-full my-4
                  max-lg:mt-6 max-lg:text-lg max-lg:w-full
                "
                rounded="rounded-full"
              >
                Contactame
              </MainButton>
            </Link>

            <span className="font-alt text-2xl font-bold uppercase block max-lg:text-xl">
              Bautista Centorbi
            </span>
            <p className="font-sans text-2xl leading-[0.9] max-lg:text-xl">
              Frontend Developer &amp; Graphic Designer
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
            Construyo{" "}
            <span className="transition-colors duration-300 hover:text-blue-600">
              Experiencias
            </span>
          </motion.span>
        </div>
      </h1>
    </motion.div>
  );
}
