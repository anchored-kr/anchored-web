import Link from "next/link";
import { Desktop } from "@/components/os/Desktop";
import { caseStudies } from "@/data/desktopItems";
import { t } from "@/data/i18n";

/**
 * The desktop is a client app, so this server component carries the page's
 * semantic spine: one <h1>, the positioning statement, and crawlable links to
 * every case study. It mirrors what the desktop shows (the welcome window renders
 * server-side too) rather than hiding extra keywords from visitors.
 */
export default function Home() {
  return (
    <>
      <div className="sr-only">
        <h1>Anchored — We turn IP &amp; content into Roblox games</h1>
        <p>
          앵커드는 IP·콘텐츠·브랜드를 Roblox에서 실제로 플레이되는 게임으로 만드는 에이전시입니다.
          기획부터 개발, 출시, 라이브옵스까지 한 팀에서 책임집니다.
        </p>
        <nav aria-label="Work">
          <ul>
            {caseStudies.map((a) => (
              <li key={a.slug}>
                <Link href={`/projects/${a.slug}`}>
                  {a.title} — {t(a.tagline, "ko")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Desktop />
    </>
  );
}
