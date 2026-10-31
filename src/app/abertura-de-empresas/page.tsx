import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageIntro, ContactStrip } from "@/components/ui";
import { companyServices } from "@/lib/business";
import { metadata as makeMetadata } from "@/lib/site";
const service = companyServices.opening;
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
        <h2>Entender o seu projeto</h2>
        <p>
          A orientação considera a atividade, a estrutura pretendida e as
          particularidades do negócio para organizar os próximos passos.
        </p>
        <h2>Avaliar as exigências aplicáveis</h2>
        <p>
          Enquadramento tributário, dados cadastrais e procedimentos de
          formalização são analisados de acordo com as características de cada
          atividade.
        </p>
        <h2>Acompanhar os procedimentos</h2>
        <p>
          O acompanhamento segue o escopo definido com o cliente. Registros e
          análises dependem das exigências e da atuação dos órgãos competentes.
        </p>
        <nav className="related-services" aria-label="Outras soluções">
          <Link className="text-link" href="/servicos">
            <ArrowLeft size={16} /> Todos os serviços
          </Link>
          <Link
            className="text-link"
            href={`/${companyServices.regularization.slug}`}
          >
            {companyServices.regularization.name} <ArrowUpRight size={16} />
          </Link>
        </nav>
      </section>
      <ContactStrip />
    </>
  );
}
