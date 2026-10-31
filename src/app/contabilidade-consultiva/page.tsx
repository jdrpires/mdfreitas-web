import { PageIntro, ContactStrip } from "@/components/ui";
import { metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Contabilidade Consultiva",
  "/contabilidade-consultiva",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="CONTABILIDADE CONSULTIVA"
        title="Informação que se transforma em direção."
        text="Um olhar que conecta a rotina contábil às escolhas de quem empreende."
      />
      <section className="section container prose">
        <h2>Números com contexto</h2>
        <p>
          Conhecer receitas, despesas, ativos e obrigações ajuda a compreender a
          situação da empresa. A abordagem consultiva busca dar contexto a essas
          informações para apoiar uma gestão mais consciente.
        </p>
        <h2>Uma relação construída no diálogo</h2>
        <p>
          Cada negócio tem particularidades. Por isso, a interpretação dos dados
          deve considerar o setor, o modelo de operação e os objetivos de quem
          está à frente da empresa.
        </p>
        <h2>Organização para planejar</h2>
        <p>
          Rotinas contábeis organizadas e informações consistentes favorecem o
          planejamento. As análises e orientações são definidas conforme as
          necessidades e o escopo contratado.
        </p>
      </section>
      <ContactStrip />
    </>
  );
}
