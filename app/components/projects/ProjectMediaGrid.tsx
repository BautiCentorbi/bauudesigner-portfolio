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

function MediaFrame({
  media,
  aspectFallback,
}: {
  media?: ProjectMedia;
  aspectFallback: string;
}) {
  const aspect = media?.aspect ? aspectClass(media.aspect) : aspectFallback;
  const image = (
    <div className={clsx("relative", aspect)}>
      {media && <Image src={media.src} alt={media.alt} fill className="object-cover" />}
    </div>
  );

  if (media?.href) {
    return (
      <a
        href={media.href}
        target="_blank"
        rel="noreferrer"
        aria-label={media.alt}
        className="block"
      >
        {image}
      </a>
    );
  }

  return image;
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
        <MediaFrame media={first} aspectFallback="aspect-[16/9]" />
      </div>
    );
  }

  if (layout === "twoUp") {
    return (
      <div className="border border-black/15">
        <div className="grid md:grid-cols-2">
          {items.slice(0, 2).map((m, i) => (
            <div key={i} className={clsx("relative", i === 0 ? "md:border-r border-black/15" : "")}>
              <MediaFrame media={m} aspectFallback="aspect-4/3 md:aspect-16/10" />
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
            <MediaFrame media={m} aspectFallback="aspect-4/3 md:aspect-16/10" />
          </div>
        ))}
      </div>

      {c && (
        <div className="relative border-t border-black/15">
          <MediaFrame media={c} aspectFallback="aspect-video md:aspect-21/9" />
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
              <MediaFrame key={i} media={m} aspectFallback="aspect-4/3 md:aspect-16/10" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
