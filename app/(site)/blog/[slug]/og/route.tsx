import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Params {
  params: Promise<{ slug: string }>;
}

/**
 * Per-post social card, served from a stable URL (`/blog/<slug>/og.png`).
 *
 * A route handler rather than the `opengraph-image.tsx` file convention,
 * because convention routes are content-hashed (`opengraph-image-fx5gi7`) and
 * are not addressable from the metadata block. This path is stable, so
 * `generateMetadata` can point `og:image` straight at it.
 */
export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.title ?? "Blog";
  const tags = post?.tags.slice(0, 3) ?? [];
  const meta = post ? `${post.datePublished} · ${post.readingTime}` : "Mfalme·0";

  // Long headlines must shrink or they overflow the card.
  const fontSize = title.length > 68 ? 52 : title.length > 44 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F0F0F0",
          color: "#121212",
          fontFamily: "system-ui, sans-serif",
          padding: 64,
          position: "relative",
        }}
      >
        {/* Bauhaus corner blocks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 260,
            height: 260,
            background: "#D02020",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 52,
            width: 156,
            height: 156,
            background: "#F0C020",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 260,
            width: 130,
            height: 130,
            background: "#1040C0",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#D02020",
          }}
        >
          Blog
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              fontSize,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            borderTop: "6px solid #121212",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: 22,
              color: "#4A4A4A",
            }}
          >
            <div style={{ display: "flex" }}>{meta}</div>
            {tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#D02020",
                }}
              >
                {tags.map((tag) => (
                  <div key={tag} style={{ display: "flex" }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#121212",
            }}
          >
            Mfalme·0
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
