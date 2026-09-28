import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card for the blog index, at the stable path `/blog/og.png`. */
export function GET() {
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
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 300,
            height: 300,
            background: "#D02020",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            width: 180,
            height: 180,
            background: "#F0C020",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 220,
            height: 220,
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
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
            }}
          >
            Notes from the work
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 30,
              color: "#4A4A4A",
            }}
          >
            Build logs, post-mortems and architecture notes
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "6px solid #121212",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#4A4A4A" }}>
            Joseph Gitau Chege · Nairobi
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
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
