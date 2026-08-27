import type { NextConfig } from "next";

// Serverful build (no static export): /api/roblox proxies Roblox stats server-side,
// which a static export cannot host. Live hosting is Vercel; the old GitHub Pages
// deploy (which needed `output: "export"` + a basePath) has been removed.
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Pin the workspace root to this project. Without this, a stray lockfile in $HOME
  // makes Next infer the root there, so Turbopack idents include the Korean parent
  // directory (앵커드) and its truncation panics mid-character ("not a char boundary").
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
