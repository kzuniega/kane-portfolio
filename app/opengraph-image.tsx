import { ImageResponse } from "next/og";

export const alt = "Kane Zuniega — Personal Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px", background: "#ffffff", color: "#000000" }}>
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 4 }}>PERSONAL PORTFOLIO</div>
      <div style={{ display: "flex", fontSize: 100, letterSpacing: -5 }}>Kane Zuniega<span>.</span></div>
      <div style={{ display: "flex", fontSize: 24, borderTop: "1px solid #e5e5e5", paddingTop: 24 }}>Selected work / Software Engineer</div>
    </div>,
    size,
  );
}
