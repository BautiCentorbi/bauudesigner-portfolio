import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/app/lib/projects";
import ProjectCase from "@/app/components/projects/ProjectCase";

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
