"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects, categoryLabels, type ProjectCategory, type Project } from "@/data/projects";

const categories: ("all" | ProjectCategory)[] = ["all", "games", "community", "education", "events", "partnerships"];
const categoryDisplay: Record<string, string> = { all: "All", ...categoryLabels };

const statusLabels: Record<string, string> = { live: "Live", "in-progress": "In Progress", upcoming: "Upcoming" };

function Card({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block p-8 border border-border rounded-2xl hover:border-border-hover hover:bg-white/[0.02] transition-all h-full"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
            {categoryLabels[project.category]}
          </span>
          {project.status && (
            <span className="text-[10px] tracking-wider uppercase text-muted">
              {statusLabels[project.status]}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-3 group-hover:text-white transition-colors">{project.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{project.descriptionKo}</p>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Projects</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">프로젝트와 활동</h1>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                active === cat
                  ? "bg-white text-black"
                  : "text-muted border border-border hover:border-border-hover"
              }`}
            >
              {categoryDisplay[cat]}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => <Card key={p.slug} project={p} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
