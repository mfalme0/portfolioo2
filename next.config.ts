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
  // Posts whose slugs changed after publication. These URLs have been indexed
  // and shared, so they must keep resolving.
  async redirects() {
    return [
      {
        source: '/blog/when-system-design-gets-so-fucked-you-need-a-pen-and-paper',
        destination: '/blog/system-design-pen-and-paper',
        permanent: true,
      },
      {
        source: '/blog/self-hosting-is-fcked',
        destination: '/blog/self-hosting-bad-idea',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
