import { ImageResponse } from "next/og";
export const alt = "M D’Freitas — Consultoria & Contabilidade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#10291F",
        color: "#F2EBE5",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 80,
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 28, color: "#C3AA93" }}>
        M D’Freitas · Consultoria & Contabilidade
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 64 }}>
        <span>Clareza para decidir.</span>
        <span>Confiança para crescer.</span>
      </div>
      <div style={{ fontSize: 22, color: "#C3AA93" }}>mdfreitas.com.br</div>
    </div>,
    size,
  );
}
