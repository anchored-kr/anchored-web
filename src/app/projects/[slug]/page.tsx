import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, categoryLabels } from "@/data/projects";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} | Anchored`, description: project.description };
}

const statusLabels: Record<string, string> = { live: "Live", "in-progress": "In Progress", upcoming: "Upcoming" };

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          All Projects
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs tracking-[0.2em] uppercase text-muted">
            {categoryLabels[project.category]}
          </span>
          {project.status && (
            <span className="text-xs tracking-wider uppercase text-muted">
              {statusLabels[project.status]}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
          {project.title}
        </h1>

        <div className="space-y-6 mb-12">
          <p className="text-xl text-dim leading-relaxed">{project.description}</p>
          <p className="text-base text-muted leading-relaxed">{project.descriptionKo}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-20">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border text-muted">
              {tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <div className="border-t border-border pt-16">
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-8">Related</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/projects/${r.slug}`}
                  className="group p-6 border border-border rounded-2xl hover:border-border-hover transition-colors"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
                    {categoryLabels[r.category]}
                  </span>
                  <h3 className="mt-3 font-semibold group-hover:text-white transition-colors">{r.title}</h3>
                  <p className="mt-2 text-xs text-muted line-clamp-2">{r.descriptionKo}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
