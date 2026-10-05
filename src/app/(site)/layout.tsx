import { Shell } from "@/components/v4/Shell";

/** v4 site chrome (Porto Rocha grammar): fixed sidebar + main column for /, /about, /projects/*. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
