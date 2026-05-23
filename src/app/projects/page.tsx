"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  projects,
  categoryLabels,
  type ProjectCategory,
  type Project,
} from "@/data/projects";

const categories: ("all" | ProjectCategory)[] = [
  "all",
  "games",
  "community",
  "education",
  "events",
  "partnerships",
];

const categoryDisplay: Record<string, string> = {
  all: "All",
  ...categoryLabels,
};

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-1 rounded-md bg-border/50 text-muted font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs text-muted group-hover:text-accent transition-colors">
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

export default function ProjectsPage() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            Projects & Stories
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            프로젝트와 활동
          </h1>
          <p className="mt-4 text-base text-muted max-w-2xl leading-relaxed">
            앵커드는 게임, 커뮤니티, 교육, 이벤트, 파트너십을 통해 Roblox
            생태계를 만들어가고 있습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm rounded-lg font-mono transition-all ${
                active === cat
                  ? "bg-accent text-background"
                  : "text-muted border border-border hover:border-accent/50 hover:text-accent"
              }`}
            >
              {categoryDisplay[cat]}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
