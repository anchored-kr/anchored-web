import Link from "next/link";

/**
 * 404 for a case-study slug that doesn't exist. Having it in this segment means the
 * page keeps the projects header/footer instead of falling back to the root
 * not-found, whose streamed response drops the root layout's <body> attributes.
 */
export default function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fc6f5]">404</p>
      <h1 className="mt-3 text-[clamp(1.7rem,4vw,2.4rem)] font-extrabold leading-tight tracking-tight">
        해당 작업물을 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-[14px] font-semibold text-white/60">This work doesn&apos;t exist</p>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">
        주소가 바뀌었거나 삭제된 페이지입니다. 전체 작업물 목록에서 다시 찾아보세요.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-lg border-[2.5px] border-os-ink bg-anchor-blue px-4 py-2 text-[13px] font-extrabold text-white transition-all active:translate-x-px active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
        >
          전체 작업물
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border-[2.5px] border-os-ink bg-os-cream px-4 py-2 text-[13px] font-extrabold text-os-ink transition-all hover:bg-white active:translate-x-px active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
        >
          데스크탑 열기
        </Link>
      </div>
    </div>
  );
}
