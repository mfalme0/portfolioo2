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
        source: '/setup/keyboards/aula-s2022',
        destination: '/setup/keyboards/aula-f2022',
        permanent: true,
      },
      {
        source: '/setup/monitors/benq-zowie-xl-27',
        destination: '/setup/monitors/zowie-xl2731',
        permanent: true,
      },
      {
        source: '/setup/ups/apc-back-ups-1400xs',
        destination: '/setup/ups/apc-back-ups-bx1400ui',
        permanent: true,
      },
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
