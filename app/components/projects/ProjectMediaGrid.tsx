"use client";

import Image from "next/image";
import type { ProjectMedia } from "@/app/lib/projects";
import clsx from "clsx";

function aspectClass(aspect?: ProjectMedia["aspect"]) {
  switch (aspect) {
    case "21/9":
      return "aspect-[21/9]";
    case "16/9":
      return "aspect-[16/9]";
    case "4/3":
      return "aspect-[4/3]";
    case "3/4":
      return "aspect-[3/4]";
    case "1/1":
      return "aspect-square";
    default:
      return "aspect-[16/9]";
  }
}

export default function ProjectMediaGrid({
  items,
  layout,
}: {
  items: ProjectMedia[];
  layout: "twoUp" | "oneFull" | "twoUpPlusOne" | "twoUpPlusOneExtended";
}) {
  if (layout === "oneFull") {
    const first = items[0];
    if (!first) return null;
    return (
      <div className="border border-black/15">
        <div className={clsx("relative", aspectClass(first.aspect))}>
          <Image src={first.src} alt={first.alt} fill className="object-cover" />
        </div>
      </div>
    );
  }

  if (layout === "twoUp") {
    return (
      <div className="border border-black/15">
        <div className="grid md:grid-cols-2">
          {items.slice(0, 2).map((m, i) => (
            <div key={i} className={clsx("relative", i === 0 ? "md:border-r border-black/15" : "")}>
              <div className={clsx("relative", m.aspect ? aspectClass(m.aspect) : "aspect-4/3 md:aspect-16/10")}>
                <Image src={m.src} alt={m.alt} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const [a, b, c] = items;
  const extra = items.slice(3);
  const baseGrid = (
    <>
      <div className="grid md:grid-cols-2">
        {[a, b].map((m, i) => (
          <div key={i} className={clsx("relative", i === 0 ? "md:border-r border-black/15" : "")}>
            <div className={clsx("relative", m?.aspect ? aspectClass(m.aspect) : "aspect-4/3 md:aspect-16/10")}>
              {m && <Image src={m.src} alt={m.alt} fill className="object-cover" />}
            </div>
          </div>
        ))}
      </div>

      {c && (
        <div className="relative border-t border-black/15">
          <div className={clsx("relative", c.aspect ? aspectClass(c.aspect) : "aspect-video md:aspect-21/9")}>
            <Image src={c.src} alt={c.alt} fill className="object-cover" />
          </div>
        </div>
      )}
    </>
  );

  if (layout === "twoUpPlusOne") {
    return <div className="border border-black/15">{baseGrid}</div>;
  }

  // twoUpPlusOneExtended
  return (
    <div className="border border-black/15">
      {baseGrid}
      {extra.length > 0 && (
        <div className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extra.map((m, i) => (
              <div key={i} className={clsx("relative", m?.aspect ? aspectClass(m.aspect) : "aspect-4/3 md:aspect-16/10")}>
                <Image src={m.src} alt={m.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
