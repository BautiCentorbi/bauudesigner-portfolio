import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/app/lib/projects";
import ProjectCase from "@/app/components/projects/ProjectCase";

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.clientName} — ${project.tags.join(" & ")}`;
  const description = truncate(
    `${project.heroIntro} Proyecto de diseño gráfico y desarrollo web realizado en Mendoza, Argentina.`,
    160
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/projects/${project.slug}`,
      images: [
        {
          url: project.heroImage.src,
          alt: project.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.heroImage.src],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return <ProjectCase project={project} />;
}
