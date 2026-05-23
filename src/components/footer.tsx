import Link from "next/link";
import { AnchorLogo } from "./anchor-logo";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AnchorLogo className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase">Anchored</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Building Korea&apos;s Roblox Creator Ecosystem.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">Navigate</p>
            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Projects", href: "/projects" },
                { label: "Partners", href: "#partners" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">Connect</p>
            <ul className="space-y-3">
              {[
                { label: "Discord", href: "https://discord.gg/anchored" },
                { label: "X", href: "https://x.com/anchored_kr" },
                { label: "Email", href: "mailto:contact@anchored.kr" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Anchored</p>
          <p className="text-xs text-muted">Seoul, South Korea</p>
        </div>
      </div>
    </footer>
  );
}
