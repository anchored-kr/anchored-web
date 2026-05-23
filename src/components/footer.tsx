import Link from "next/link";

const links = [
  { label: "Discord", href: "https://discord.gg/anchored" },
  { label: "X (Twitter)", href: "https://x.com/anchored_kr" },
  { label: "Email", href: "mailto:contact@anchored.kr" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center">
                <span className="text-accent font-bold text-xs font-mono">
                  A
                </span>
              </div>
              <span className="font-semibold">Anchored</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Building Korea&apos;s Roblox Creator Ecosystem.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
              Links
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
              Navigate
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <a
                  href="#partners"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Anchored. All rights reserved.
          </p>
          <p className="text-xs text-muted font-mono">
            Seoul, South Korea
          </p>
        </div>
      </div>
    </footer>
  );
}
