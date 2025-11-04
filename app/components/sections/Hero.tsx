"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import MainButton from "../ui/MainButton";

const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.18,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function Hero() {
  return (
    <motion.div
      className="px-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <h1 className="flex flex-col text-[14rem] font-bold leading-[0.8] items-center h-full">
        {/* Línea 1 */}
        <div className="flex gap-4 text-left">
          {/* Título parte 1 */}
          <motion.span variants={fadeUp} className="w-full uppercase">
            Mucho más que{" "}
            <span className="transition-colors duration-300 hover:text-blue-600">
              Diseño
            </span>
          </motion.span>

          {/* Mini bio */}
          <motion.div variants={fadeUp} className="text-left mt-auto w-fit">
            <Link href="#contact">
              <MainButton href="#contact" className="mt-12 font-inter text-2xl w-full my-4" rounded="rounded-full">Contactame</MainButton>
            </Link>
            <span className="font-alt text-2xl font-bold uppercase block">
              Bautista Centorbi
            </span>
            <p className="font-sans text-2xl leading-[0.9]">
              Frontend Developer &amp; Graphic Designer
            </p>
            <p className="text-lg text-slate-700">Mendoza, Argentina</p>
          </motion.div>
        </div>

        {/* Línea 2 */}
        <div className="flex gap-4 text-right">
          <motion.a
            variants={fadeUp}
            href="#projects"
            aria-label="Ir a proyectos"
            className="mt-48 inline-flex"
          >
            <span
              className="
      group relative inline-flex items-center justify-center
      w-28 h-28 rounded-full
      overflow-hidden   /* <- recorta el relleno */
      transition-transform duration-300 hover:-translate-y-0.5
      outline-none focus-visible:ring-2 focus-visible:ring-black/60
    "
            >
              {/* 1) BORDE (aparece primero) */}
              <span
                className="
        pointer-events-none absolute inset-0 rounded-full
        border border-black
        opacity-0 group-hover:opacity-100
        transition-opacity duration-150
      "
              />

              {/* 2) RELLENO: rectángulo que sube (wipe) */}
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

              {/* 3) ICONO: negro -> blanco cuando el fill cubre */}
              <ChevronDown
                size={64}
                className="
        relative z-10 transition-colors duration-300
        text-black group-hover:text-white
      "
              />
            </span>
          </motion.a>

          {/* Título parte 2 */}
          <motion.span variants={fadeUp} className="w-full uppercase">
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
