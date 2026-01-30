"use client";

import React from "react";
import clsx from "clsx";

type Props = React.ComponentProps<"button"> & {
  as?: "button" | "a";
  href?: string;
  /** Cambiá colores rápido sin tocar el DOM */
  borderClassName?: string; // ej: "border-neutral-900"
  fillClassName?: string;   // ej: "bg-neutral-900"
  textClassName?: string;   // ej: "text-neutral-900"
  rounded?: string;         // ej: "rounded-lg" | "rounded-full"
  ariaLabel?: string;
};

export default function MainButton({
  as = "button",
  href,
  className,
  borderClassName = "border-black",
  fillClassName = "bg-black",
  textClassName = "text-black",
  rounded = "rounded-lg",
  children,
  ...rest
}: Props) {
  const Component: any = as === "a" ? "a" : "button";

  return (
    <Component
      href={href}
      className={clsx(
        "group relative inline-flex items-center justify-center",
        "px-6 py-3 font-medium",
        rounded,
        "border", borderClassName,
        "overflow-hidden select-none",
        // hover/focus
        "transition-transform duration-300 hover:-translate-y-0.5",
        "outline-none focus-visible:ring-2 focus-visible:ring-black/60",
        // reduce motion
        "motion-reduce:transition-none motion-reduce:hover:transform-none",
        className
      )}
      {...rest}
    >
      {/* Relleno: wipe vertical desde abajo */}
      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-x-0 bottom-0 h-full w-full",
          fillClassName,
          "translate-y-full group-hover:translate-y-0",
          "transition-transform duration-400 delay-75",
          "[ease:cubic-bezier(0.16,1,0.3,1)]",
          "will-change-transform"
        )}
      />
      {/* Etiqueta */}
      <span
        className={clsx(
          "relative z-10 transition-colors duration-300",
          textClassName,
          "group-hover:text-white"
        )}
      >
        {children}
      </span>
    </Component>
  );
}
