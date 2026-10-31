import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
export function Brand() {
  const configured =
    process.env.NEXT_PUBLIC_LOGO_PATH || "/branding/mdfreitas-logo.png";
  const safe = /^\/branding\/[a-zA-Z0-9_-]+\.(?:png|webp|jpg|jpeg)$/.test(
    configured,
  );
  if (safe && existsSync(path.join(process.cwd(), "public", configured)))
    return (
      <Image
        src={configured}
        alt="M D’Freitas — Consultoria & Contabilidade"
        width={250}
        height={125}
        sizes="(max-width: 580px) 180px, 200px"
        className="brand-image"
      />
    );
  return (
    <span className="brand-text">
      <span>M D’Freitas</span>
      <small>CONSULTORIA & CONTABILIDADE</small>
    </span>
  );
}
