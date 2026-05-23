"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { projects, categoryLabels, type Project } from "@/data/projects";

const statusColors: Record<string, string> = {
  live: "bg-green-500/20 text-green-400 border-green-500/30",
  "in-progress": "bg-accent/20 text-accent border-accent/30",
  upcoming: "bg-blue/20 text-blue-light border-blue/30",
};

const statusLabels: Record<string, string> = {
  live: "Live",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

const categoryEmojis: Record<string, string> = {
  games: "🎮", community: "👥", education: "🎓", events: "🎪", partnerships: "🤝",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouse = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      style={{ perspective: 800 }}
    >
      <motion.a
        ref={ref}
        href={`/projects/${project.slug}`}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className="interactive group block relative p-6 rounded-2xl border border-border bg-surface/50 h-full overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(241,196,0,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{categoryEmojis[project.category]}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue">{categoryLabels[project.category]}</span>
            </div>
            {project.status && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
          <p className="text-sm text-muted leading-relaxed mb-5">{project.descriptionKo}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-border/50 text-muted font-mono">{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted group-hover:text-accent transition-colors">
            <span>Read more</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.a>
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
          <span className="text-xs font-mono text-blue uppercase tracking-widest">Projects & Stories</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            We build the ecosystem
            <br /><span className="text-muted">through projects.</span>
          </h2>
          <p className="mt-4 text-base text-muted max-w-2xl leading-relaxed">
            게임, 커뮤니티, 교육, 이벤트, 파트너십. 앵커드의 모든 활동은 Roblox 크리에이터 생태계를 확장하기 위한 프로젝트입니다.
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
          className="mt-14 text-center"
        >
          <Link
            href="/projects"
            className="interactive inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold border border-border rounded-xl hover:border-accent/50 hover:text-accent transition-all group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">View All Projects</span>
            <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
