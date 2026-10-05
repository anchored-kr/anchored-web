import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productions, productionBySlug } from "@/data/v4";
import { ProjectView } from "@/components/v4/ProjectView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = productionBySlug(slug);
  if (!p) return {};
  const en = p.app.tagline && typeof p.app.tagline !== "string" ? p.app.tagline.en : undefined;
  return { title: `${p.name} — Anchored`, description: en };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  if (!productionBySlug(slug)) notFound();
  return <ProjectView slug={slug} />;
}
