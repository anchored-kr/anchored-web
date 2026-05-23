"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { projects, categoryLabels, type Project } from "@/data/projects";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const c = animate(count, target, { duration: 2, ease: "easeOut" });
      return c.stop;
    }
  }, [inView, count, target]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

const tracks = [
  { icon: "👥", label: "Creator Community", detail: "200+ creators in Guild" },
  { icon: "🎮", label: "Game Operations", detail: "4 live Roblox projects" },
  { icon: "🎓", label: "Education Programs", detail: "Camps, workshops, incubation" },
  { icon: "📊", label: "Data & LiveOps", detail: "Analytics-driven updates" },
  { icon: "🎪", label: "Events & Meetups", detail: "50+ online/offline events" },
  { icon: "🤝", label: "Partnerships", detail: "15+ platform & brand partners" },
];

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
        className="group block p-8 border border-border rounded-2xl hover:border-border-hover hover:bg-white/[0.015] transition-all h-full"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
          {categoryLabels[project.category]}
        </span>
        <h3 className="text-lg font-semibold mt-4 mb-3 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{project.descriptionKo}</p>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section id="projects" className="py-32 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
            Built on Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            We&apos;ve operated the ecosystem
            <br />
            <span className="text-muted">before building the OS.</span>
          </h2>
          <p className="text-lg text-dim max-w-2xl leading-relaxed mb-16">
            앵커드는 Roblox 생태계에서 커뮤니티, 게임 운영, 교육, 이벤트, 데이터
            분석을 직접 수행하며 크리에이터가 실제로 필요한 것을 학습했습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {tracks.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 border border-border rounded-2xl hover:border-border-hover transition-colors"
            >
              <span className="text-2xl">{t.icon}</span>
              <p className="text-sm font-semibold mt-4">{t.label}</p>
              <p className="text-xs text-muted mt-1">{t.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border pt-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-8">
            Featured Projects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-sm text-muted hover:text-white transition-colors"
            >
              View all projects
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
