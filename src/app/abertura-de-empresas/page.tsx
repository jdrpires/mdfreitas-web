import { permanentRedirect } from "next/navigation";
// Preserva endereços antigos sem apresentar uma oferta ainda não confirmada.
export default function Page() {
  permanentRedirect("/servicos");
}
