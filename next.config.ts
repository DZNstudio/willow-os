import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'export',
  images: { unoptimized: true },
  turbopack: {
    // Pin the workspace root so Next stops walking up to the parent
    // directory's lockfile when the project sits inside a monorepo-ish layout.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
