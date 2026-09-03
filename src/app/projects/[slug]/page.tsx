import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  caseStudies,
  caseStudyBySlug,
  folderOfApp,
  statusColor,
  statusLabel,
} from "@/data/desktopItems";
import { isLang, t, ui, htmlLang, type Lang } from "@/data/i18n";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((a) => ({ slug: a.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = caseStudyBySlug(slug);
  if (!app) return {};
  return {
    title: app.title,
    description: t(app.summary, "ko") || t(app.tagline, "ko"),
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${app.title} | Anchored`,
      description: t(app.tagline, "ko"),
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang: raw } = await searchParams;
  const lang: Lang = isLang(raw) ? raw : "ko";
  const suffix = lang === "ko" ? "" : `?lang=${lang}`;

  const app = caseStudyBySlug(slug);
  if (!app) notFound();

  const folder = folderOfApp(app.id);
  const related = caseStudies
    .filter((a) => a.id !== app.id && folderOfApp(a.id)?.id === folder?.id)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-6 py-14" lang={htmlLang[lang]}>
      <Link
        href={`/projects${suffix}`}
        className="inline-flex items-center gap-2 rounded font-mono text-[12px] font-bold text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        ← {t(ui.allWorks, lang)}
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2.5">
          {folder && (
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8fc6f5]">
              {folder.title}
            </span>
          )}
          {app.status && (
            <span
              className="rounded border-[1.5px] border-os-ink px-1.5 font-mono text-[9px] font-bold text-white"
              style={{ background: statusColor[app.status] }}
            >
              {statusLabel[app.status]}
            </span>
          )}
        </div>

        <h1 className="mt-3 flex items-center gap-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-tight tracking-tight">
          <span aria-hidden="true">{app.icon}</span>
          {app.title}
        </h1>
        {app.tagline && <p className="mt-3 text-[17px] font-semibold text-white/90">{t(app.tagline, lang)}</p>}
      </header>

      {app.summary && (
        <p className="mt-6 text-[15px] leading-relaxed text-white/85">{t(app.summary, lang)}</p>
      )}

      {app.role && (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {app.role.map((r) => (
            <li
              key={t(r, "ko")}
              className="rounded-md border border-[#8fc6f5]/40 bg-anchor-blue/15 px-2.5 py-1 font-mono text-[11px] font-bold text-[#8fc6f5]"
            >
              {t(r, lang)}
            </li>
          ))}
        </ul>
      )}

      {app.bullets && (
        <section className="mt-10">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
            {t(ui.weDid, lang)}
          </h2>
          <ul className="mt-3 space-y-2.5">
            {app.bullets.map((b) => (
              <li key={t(b, "ko")} className="flex gap-2.5 text-[15px] leading-relaxed text-white/85">
                <span aria-hidden="true" className="mt-1 text-[#8fc6f5]">▸</span>
                <span>{t(b, lang)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {app.meta && (
        <dl className="mt-10 overflow-hidden rounded-[10px] border border-white/15 bg-white/[0.04]">
          {app.meta.map((m, i) => (
            <div
              key={m.label}
              className={`flex items-center justify-between px-4 py-3 ${i ? "border-t border-white/10" : ""}`}
            >
              <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/60">{m.label}</dt>
              <dd className="text-[13.5px] font-bold text-white">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {app.links && app.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {app.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-[2.5px] border-os-ink bg-anchor-blue px-4 py-2 text-[13px] font-extrabold text-white transition-all active:translate-x-px active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
            >
              {t(l.label, lang)} ↗
            </a>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
            {t(ui.related, lang)}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/projects/${r.slug}${suffix}`}
                  className="flex h-full flex-col rounded-[10px] border border-white/15 bg-white/[0.04] p-4 transition-colors hover:border-white/35 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="flex items-center gap-2 text-[14px] font-bold">
                    <span aria-hidden="true">{r.icon}</span>
                    {r.title}
                  </span>
                  {r.tagline && (
                    <span className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white/70">
                      {t(r.tagline, lang)}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
