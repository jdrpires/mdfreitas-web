import { PageIntro, ContactStrip } from "@/components/ui";
import { metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Sobre a M D’Freitas",
  "/sobre",
  "Conheça a proposta da M D’Freitas: proximidade, organização e visão consultiva para apoiar cada etapa da gestão empresarial.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="NOSSA ESSÊNCIA"
        title="Um olhar atento ao que faz seu negócio único."
        text="Consultoria e contabilidade com proximidade, responsabilidade e visão de longo prazo."
      />
      <section className="section container prose">
        <h2>Mais do que acompanhar. Compreender.</h2>
        <p>
          A M D’Freitas nasce de uma visão: as informações contábeis precisam
          fazer sentido para quem empreende. A organização das rotinas e a
          interpretação dos números devem caminhar juntas.
        </p>
        <p>
          Nossa proposta é construir relações de confiança por meio da escuta,
          da clareza e de um atendimento que considere o contexto de cada
          empresa.
        </p>
        <h2>Como pensamos o trabalho</h2>
        <p>
          Entender o negócio, organizar informações e apoiar decisões são os
          pilares da nossa abordagem consultiva. Valorizamos o planejamento e a
          comunicação próxima, com atenção aos detalhes que impactam a gestão.
        </p>
        <h2>Modernização com propósito</h2>
        <p>
          A tecnologia faz parte da nossa visão de evolução. Cada melhoria deve
          facilitar a rotina do cliente, respeitar a privacidade das informações
          e preservar o cuidado no atendimento.
        </p>
      </section>
      <ContactStrip />
    </>
  );
}
