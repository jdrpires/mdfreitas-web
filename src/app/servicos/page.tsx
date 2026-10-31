import { PageIntro, ContactStrip, ServiceGrid } from "@/components/ui";
import { services, metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Serviços",
  "/servicos",
  "Explore soluções em consultoria empresarial, gestão financeira, contabilidade, departamento pessoal e departamento fiscal.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="NOSSAS SOLUÇÕES"
        title="Cuidado com os detalhes. Visão do todo."
        text="Soluções contábeis, financeiras e empresariais pensadas para acompanhar cada etapa da sua jornada."
      />
      <section className="section container">
        <ServiceGrid />
      </section>
      <section className="service-details container">
        {services.map((s) => (
          <article id={s.id} key={s.id}>
            <span className="eyebrow">SOLUÇÃO ESPECIALIZADA</span>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <p>
              O escopo de atendimento é definido a partir de uma conversa sobre
              as necessidades, a estrutura e o momento da sua empresa. Assim,
              podemos avaliar prioridades e propor uma atuação adequada à sua
              realidade.
            </p>
          </article>
        ))}
      </section>
      <ContactStrip />
    </>
  );
}
