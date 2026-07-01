import type { NextConfig } from "next";

// En CI (GitHub Pages) se define NEXT_PUBLIC_BASE_PATH="/pharma-dream-web".
// En local queda vacío para que el dev server funcione normal.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // Requerido para `output: export` (no hay servidor que optimice).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
