import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies, folders, statusColor, statusLabel } from "@/data/desktopItems";
import { isLang, t, ui, htmlLang, type Lang } from "@/data/i18n";

export const metadata: Metadata = {
  title: "작업물",
  description:
    "앵커드가 기획·개발·운영한 Roblox 게임과 생태계 프로젝트 — Speed Obby, Swarmrot, GOKUI, Telum, Anchored Guild, Anchored School.",
  alternates: { canonical: "/projects" },
};

/** Grouped by the same folders the desktop uses, so both surfaces tell one story. */
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: raw } = await searchParams;
  const lang: Lang = isLang(raw) ? raw : "ko";
  const suffix = lang === "ko" ? "" : `?lang=${lang}`;

  const groups = folders
    .map((f) => ({
      folder: f,
      items: caseStudies.filter((a) => f.children.includes(a.id)),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14" lang={htmlLang[lang]}>
      <header>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fc6f5]">
          Anchored — {t(ui.worksTitle, lang)}
        </p>
        <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-tight tracking-tight">
          {t(ui.worksTitle, lang)}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/80">{t(ui.worksLead, lang)}</p>
      </header>

      <div className="mt-12 space-y-12">
        {groups.map(({ folder, items }) => (
          <section key={folder.id} aria-labelledby={`g-${folder.id}`}>
            <h2 id={`g-${folder.id}`} className="flex items-center gap-2 font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/90">
              <span aria-hidden="true" className="text-[15px]">{folder.icon}</span>
              {folder.title}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/projects/${a.slug}${suffix}`}
                    className="group flex h-full flex-col rounded-[10px] border-[2.5px] border-os-ink bg-os-cream p-5 text-os-ink transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ boxShadow: "4px 4px 0 0 rgba(8,22,43,0.85)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true" className="text-[22px]">{a.icon}</span>
                      <span className="text-[15px] font-extrabold leading-tight">{a.title}</span>
                      {a.status && (
                        <span
                          className="ml-auto shrink-0 rounded border-[1.5px] border-os-ink px-1.5 font-mono text-[8.5px] font-bold text-white"
                          style={{ background: statusColor[a.status] }}
                        >
                          {statusLabel[a.status]}
                        </span>
                      )}
                    </div>
                    {a.tagline && (
                      <p className="mt-2.5 text-[13px] leading-relaxed text-os-ink/85">{t(a.tagline, lang)}</p>
                    )}
                    <span className="mt-4 font-mono text-[11px] font-bold text-anchor-blue-dark group-hover:underline">
                      {t(ui.ctaCaseStudy, lang)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
