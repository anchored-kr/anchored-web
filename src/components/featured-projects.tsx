"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { projects, categoryLabels, type Project } from "@/data/projects";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block relative p-6 rounded-2xl border border-border bg-surface/50 card-hover h-full"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
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

          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-muted leading-relaxed mb-4">
            {project.descriptionKo}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-1 rounded-md bg-border/50 text-muted font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-1 text-xs text-muted group-hover:text-accent transition-colors">
            <span>Read more</span>
            <svg
              className="w-3 h-3 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px line-gradient opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            Projects & Stories
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            We build the ecosystem
            <br />
            <span className="text-muted">through projects.</span>
          </h2>
          <p className="mt-4 text-base text-muted max-w-2xl leading-relaxed">
            게임, 커뮤니티, 교육, 이벤트, 파트너십. 앵커드의 모든 활동은 Roblox
            크리에이터 생태계를 확장하기 위한 프로젝트입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-border rounded-lg hover:border-accent/50 hover:text-accent transition-all group"
          >
            View All Projects
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
