import type { NextConfig } from "next";

// GitHub Pages serves this repo under a project subpath (/anchored-web); Vercel and
// custom domains serve at the root. Gate the basePath on an explicit deploy target so
// the same build works on both. The Pages workflow sets DEPLOY_TARGET=github-pages.
const isPages = process.env.DEPLOY_TARGET === "github-pages";
const basePath = isPages ? "/anchored-web" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
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
