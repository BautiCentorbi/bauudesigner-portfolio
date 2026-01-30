import {type Variants, type Transition } from "framer-motion";


export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

export const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.3 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};