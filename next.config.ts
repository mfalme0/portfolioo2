import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Turbopack (the Next 16 default) runs the remark/rehype pipeline in Rust, so
// plugins must be referenced by package name string. Plugins that need
// non-serialisable options cannot be used under Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
    rehypePlugins: ["rehype-slug"],
  },
});

const nextConfig: NextConfig = {
  // `mdx` lets files under /content be imported as components. /content lives
  // outside app/, so this does not create any extra routes.
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  serverExternalPackages: ['intasend-node'],
};

export default withMDX(nextConfig);
