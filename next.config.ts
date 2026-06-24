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
};

export default nextConfig;
