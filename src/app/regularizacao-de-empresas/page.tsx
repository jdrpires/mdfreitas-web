import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageIntro, ContactStrip } from "@/components/ui";
import { companyServices } from "@/lib/business";
import { metadata as makeMetadata } from "@/lib/site";
const service = companyServices.regularization;
export const metadata = makeMetadata(
  service.name,
  `/${service.slug}`,
  service.description,
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow={service.name}
        title={service.headline}
        text={service.description}
      />
      <section className="section container prose">
        <h2>Identificar as pendências</h2>
        <p>
          O primeiro passo é conhecer a situação cadastral, fiscal e documental
          da empresa, a partir das informações e documentos disponíveis.
        </p>
        <h2>Organizar as providências</h2>
        <p>
          As medidas necessárias são avaliadas conforme a natureza das
          pendências e as exigências aplicáveis, respeitando a realidade de cada
          empresa.
        </p>
        <h2>Acompanhar a organização das obrigações</h2>
        <p>
          O apoio segue o escopo acordado e as condições de cada caso. A
          conclusão dos procedimentos depende da análise e das exigências dos
          órgãos competentes.
        </p>
        <nav className="related-services" aria-label="Outras soluções">
          <Link className="text-link" href="/servicos">
            <ArrowLeft size={16} /> Todos os serviços
          </Link>
          <Link className="text-link" href={`/${companyServices.opening.slug}`}>
            {companyServices.opening.name} <ArrowUpRight size={16} />
          </Link>
        </nav>
      </section>
      <ContactStrip />
    </>
  );
}
