import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
export function Brand() {
  const configured =
    process.env.NEXT_PUBLIC_LOGO_PATH || "/branding/mdfreitas-logo.png";
  const display = "/branding/mdfreitas-logo-display.png";
  const useDisplay =
    configured === "/branding/mdfreitas-logo.png" &&
    existsSync(path.join(process.cwd(), "public", display));
  const source = useDisplay ? display : configured;
  const safe = /^\/branding\/[a-zA-Z0-9_-]+\.(?:png|webp|jpg|jpeg)$/.test(
    configured,
  );
  if (safe && existsSync(path.join(process.cwd(), "public", configured)))
    return (
      <Image
        src={source}
        unoptimized
        loading="eager"
        alt="M D’Freitas — Consultoria & Contabilidade"
        width={useDisplay ? 1320 : 1774}
        height={useDisplay ? 708 : 887}
        sizes="(max-width: 800px) 190px, 220px"
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
