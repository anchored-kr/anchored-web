"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { projects, categoryLabels, type Project } from "@/data/projects";

const statusLabel: Record<string, string> = {
  live: "Live", "in-progress": "In Progress", upcoming: "Upcoming",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block p-8 border border-border rounded-2xl hover:border-border-hover hover:bg-white/[0.02] transition-all"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
            {categoryLabels[project.category]}
          </span>
          {project.status && (
            <span className="text-[10px] tracking-wider uppercase text-muted">
              {statusLabel[project.status]}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed mb-6">
          {project.descriptionKo}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted group-hover:text-dim transition-colors">
          <span>Read more</span>
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
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
    <section id="projects" className="py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            We build the ecosystem
            <br />
            <span className="text-muted">through projects.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-sm text-muted hover:text-white transition-colors"
          >
            View all projects
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
