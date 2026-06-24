import Link from "next/link";
import { AnchorLogo } from "@/components/anchor-logo";

/** Dark, minimal chrome for the long-form case-study pages (linked from the desktop). */
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-anchor-night text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-anchor-night/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-white/90 transition-colors hover:text-white">
            <AnchorLogo className="h-5 w-5" />
            <span className="font-mono text-[13px] font-extrabold tracking-tight">Anchored OS</span>
          </Link>
          <Link href="/" className="font-mono text-[12px] font-bold text-white/55 transition-colors hover:text-white">
            ← Back to desktop
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-[13px] text-white/45">
          <span>© {new Date().getFullYear()} Anchored</span>
          <a href="mailto:contact@anchored.kr" className="hover:text-white">contact@anchored.kr</a>
        </div>
      </footer>
    </div>
  );
}
