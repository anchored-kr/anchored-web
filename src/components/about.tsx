"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Vision() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="py-32 border-t border-border">
      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
            The Problem
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-snug tracking-tight">
                UGC game creators
                <br />
                build games.
                <br />
                <span className="text-muted">
                  But they don&apos;t have
                  <br />
                  the tools to run them.
                </span>
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-lg text-dim leading-relaxed">
                Millions of creators build games on platforms like Roblox. But
                after launch, they&apos;re on their own — no analytics, no update
                pipeline, no community tools, no monetization framework.
              </p>
              <p className="text-base text-muted leading-relaxed">
                The gap between &quot;publishing a game&quot; and &quot;running a
                game as a business&quot; is massive. Most creators never cross it.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Anchored is building the operating system that closes this gap.
              </p>
            </div>
          </div>

          <div className="mt-24 border border-border rounded-2xl p-10 md:p-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-8">
              Our Thesis
            </p>
            <blockquote className="text-2xl md:text-3xl font-bold leading-snug tracking-tight">
              &quot;The next generation of game studios won&apos;t be built by
              publishers.
              <br />
              <span className="text-muted">
                They&apos;ll be built by creators — with the right OS.&quot;
              </span>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
