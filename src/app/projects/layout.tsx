import Link from "next/link";
import { AnchorLogo } from "@/components/anchor-logo";

/** Dark, minimal chrome for the long-form case-study pages (linked from the desktop). */
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="anchor-wall min-h-dvh text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-anchor-night/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-1 py-1 text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <AnchorLogo className="h-5 w-5" />
            <span className="font-mono text-[13px] font-extrabold tracking-tight">Anchored OS</span>
          </Link>
          <Link
            href="/"
            className="rounded-md px-2 py-1 font-mono text-[12px] font-bold text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ← Back to desktop
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 text-[13px] text-white/70">
          <span>© {new Date().getFullYear()} Anchored</span>
          <a
            href="mailto:contact@anchored.kr"
            className="rounded transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            contact@anchored.kr
          </a>
        </div>
      </footer>
    </div>
  );
}
