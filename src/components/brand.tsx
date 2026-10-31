import Image from "next/image";
export function Brand() {
  const path = process.env.NEXT_PUBLIC_LOGO_PATH;
  if (path?.startsWith("/branding/") && !path.includes(".."))
    return (
      <Image
        src={path}
        alt="M D’Freitas — Consultoria & Contabilidade"
        width={250}
        height={125}
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
