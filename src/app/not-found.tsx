import Link from "next/link";
import type { Metadata } from "next";
import { AnchorLogo } from "@/components/anchor-logo";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

/** Styled 404 — the framework default was an unstyled white page. */
export default function NotFound() {
  return (
    <main className="anchor-wall grid min-h-dvh place-items-center px-6 py-16 text-white">
      <div className="w-full max-w-md rounded-[10px] border-[2.5px] border-os-ink bg-os-cream text-os-ink" style={{ boxShadow: "7px 7px 0 0 rgba(8,22,43,0.92)" }}>
        <div
          className="flex h-9 items-center gap-2 border-b-[2.5px] border-os-ink px-2.5"
          style={{ backgroundImage: "linear-gradient(180deg, color-mix(in srgb, #0072ce 78%, #ffffff) 0%, #0072ce 55%)" }}
        >
          <AnchorLogo className="h-3.5 w-3.5 text-white" />
          <span className="font-mono text-[12px] font-bold tracking-tight text-white">Error 404</span>
        </div>

        <div className="p-6 sm:p-7">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue-dark">404</p>
          <h1 className="mt-1 text-[19px] font-extrabold leading-tight">페이지를 찾을 수 없습니다</h1>
          <p className="mt-1 text-[13px] font-semibold text-os-ink/60">Page not found</p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-os-ink/85">
            주소가 바뀌었거나 삭제된 페이지입니다. 데스크탑에서 다시 찾아보세요.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border-[2.5px] border-os-ink bg-anchor-blue px-3.5 py-2 text-[12.5px] font-extrabold text-white transition-all active:translate-x-px active:translate-y-px"
              style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
            >
              데스크탑 열기
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-lg border-[2.5px] border-os-ink bg-os-cream px-3.5 py-2 text-[12.5px] font-extrabold text-os-ink transition-all hover:bg-white active:translate-x-px active:translate-y-px"
              style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
            >
              작업물 보기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
