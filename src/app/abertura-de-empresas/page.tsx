import { PageIntro, ContactStrip } from "@/components/ui";
import { metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Abertura De Empresas",
  "/abertura-de-empresas",
  "Orientação para planejar a abertura de sua empresa, avaliar a estrutura do negócio e organizar os documentos e próximos passos.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="ABERTURA DE EMPRESAS"
        title="Um começo bem pensado faz diferença."
        text="Orientação para transformar sua ideia em um negócio com estrutura e organização."
      />
      <section className="section container prose">
        <h2>01. Entender o seu projeto</h2>
        <p>
          O primeiro passo é compreender a atividade, os sócios, o modelo de
          operação e as perspectivas do negócio. Essas informações orientam as
          escolhas seguintes.
        </p>
        <h2>02. Avaliar a estrutura</h2>
        <p>
          Natureza jurídica, regime tributário, atividades econômicas e
          exigências de licenciamento precisam ser avaliados em conjunto. A
          adequação depende de cada caso e das regras vigentes.
        </p>
        <h2>03. Organizar os próximos passos</h2>
        <p>
          Acompanhamos a definição de documentos e etapas necessárias conforme o
          escopo acordado. Prazos e custos variam de acordo com a atividade, a
          localização e os órgãos envolvidos.
        </p>
      </section>
      <ContactStrip />
    </>
  );
}
