import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt =
  "Bautista Centorbi — Diseñador Gráfico y Desarrollador Web en Mendoza, Argentina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoBuffer = readFileSync(
    join(process.cwd(), "public/logos/Infinite_Graphics-Logo_VERTICAL.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ebebeb",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={140} height={140} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 64,
            fontWeight: 700,
            color: "#111111",
            letterSpacing: "-0.02em",
          }}
        >
          Bautista Centorbi
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#4a4a4a",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Diseñador Gráfico &amp; Desarrollador Web · Mendoza, Argentina
        </div>
      </div>
    ),
    { ...size }
  );
}
