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
  return {
    title: `${project.title} | Anchored`,
    description: project.description,
  };
}

const statusColors: Record<string, string> = {
  live: "bg-green-500/20 text-green-400 border-green-500/30",
  "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const statusLabels: Record<string, string> = {
  live: "Live",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const related = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          All Projects
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            {categoryLabels[project.category]}
          </span>
          {project.status && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${statusColors[project.status]}`}
            >
              {statusLabels[project.status]}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          {project.title}
        </h1>

        <div className="space-y-6 mb-12">
          <p className="text-lg text-foreground/90 leading-relaxed">
            {project.description}
          </p>
          <p className="text-base text-muted leading-relaxed">
            {project.descriptionKo}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-16">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-lg bg-surface border border-border text-muted font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <>
            <div className="h-px line-gradient opacity-50 mb-16" />
            <div>
              <h2 className="text-xl font-semibold mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/projects/${r.slug}`}
                    className="group p-5 rounded-xl border border-border bg-surface/50 card-hover"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                      {categoryLabels[r.category]}
                    </span>
                    <h3 className="mt-2 font-semibold group-hover:text-accent transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted line-clamp-2">
                      {r.descriptionKo}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
