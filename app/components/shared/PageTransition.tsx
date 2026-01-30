"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { easeOut } from "@/app/lib/animationEffects";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.35, ease: easeOut },
  },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : { variants: pageVariants, initial: "initial", animate: "animate", exit: "exit" };

  return (
    <LayoutGroup>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div key={pathname} {...motionProps}>
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
