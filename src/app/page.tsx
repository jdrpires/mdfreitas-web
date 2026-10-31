import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  Handshake,
  Layers3,
  MoveUpRight,
  MonitorSmartphone,
} from "lucide-react";
import { ContactButton, ServiceGrid, ContactStrip } from "@/components/ui";
import { contact, metadata as makeMetadata } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
export const metadata = makeMetadata(
  "Mais do que números. Estratégia para o seu crescimento.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="small-line" /> CONSULTORIA & CONTABILIDADE
            </p>
            <h1>
              Mais do que números.
              <br />
              <span>Estratégia para o seu crescimento.</span>
            </h1>
            <p>Estratégia, organização e confiança para o seu negócio.</p>
            <div className="hero-actions">
              <ContactButton>Converse com a gente</ContactButton>
              <Link className="text-link" href="/servicos">
                Conheça nossas soluções <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="hero-note">
              <span className="note-dot" /> Organização que inspira confiança.
              Estratégia que move.
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-top">
              <span>PERSPECTIVA É O PONTO DE PARTIDA.</span>
              <MoveUpRight size={25} />
            </div>
            <div className="arch arch-one" />
            <div className="arch arch-two" />
            <div className="arch arch-three" />
            <div className="art-word">
              Um olhar além
              <br />
              dos números.
            </div>
            <div className="art-bottom">
              <span>VISÃO · EQUILÍBRIO · CRESCIMENTO</span>
              <span>01 — ∞</span>
            </div>
          </div>
        </div>
        <div className="container hero-baseline">
          <span>SEU NEGÓCIO, COM MAIS DIREÇÃO.</span>
          <a href="#solucoes" aria-label="Explore nossas soluções">
            Explore <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <div className="values-bar">
        <div className="container">
          <span>Estratégia para decidir</span>
          <i />
          <span>Organização para evoluir</span>
          <i />
          <span>Confiança para crescer</span>
        </div>
      </div>
      <section className="section" id="solucoes">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SOLUÇÕES QUE SE CONECTAM</p>
              <h2>
                O seu negócio no centro.
                <br />A estratégia em cada detalhe.
              </h2>
            </div>
            <p>
              Da rotina contábil às decisões que definem o futuro, um olhar
              integrado para cada momento da sua empresa.
            </p>
          </div>
          <ServiceGrid />
        </div>
      </section>
      <section className="about-section">
        <div className="container about-grid">
          <div className="about-panel">
            <span className="eyebrow">NOSSA ESSÊNCIA</span>
            <p>
              Entender.
              <br />
              Organizar.
              <br />
              <em>Evoluir.</em>
            </p>
            <span className="panel-caption">
              CADA NEGÓCIO TEM UMA HISTÓRIA.
              <br />A SUA MERECE UM OLHAR PRÓPRIO.
            </span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">SOBRE A M D’FREITAS</p>
            <h2>
              Proximidade para entender.
              <br />
              Estratégia para transformar.
            </h2>
            <p>
              Acreditamos que uma boa contabilidade começa com uma boa conversa.
              Conhecer a realidade de cada empresa é o primeiro passo para
              orientar escolhas com responsabilidade.
            </p>
            <p>
              Unimos organização, visão consultiva e atenção aos detalhes para
              tornar as informações mais claras e as decisões mais conscientes.
            </p>
            <Link className="text-link" href="/sobre">
              Conheça nossa forma de pensar <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">UMA PARCERIA COM PROPÓSITO</p>
              <h2>
                O cuidado está na forma
                <br />
                como trabalhamos.
              </h2>
            </div>
            <p>
              Princípios que orientam nossa atuação e a relação que queremos
              construir com cada cliente.
            </p>
          </div>
          <div className="difference-grid">
            {[
              [
                Compass,
                "Visão estratégica",
                "Conectamos as informações do dia a dia aos objetivos do seu negócio.",
              ],
              [
                Handshake,
                "Atendimento próximo",
                "Escuta, diálogo e orientação que respeitam o seu momento.",
              ],
              [
                Layers3,
                "Processos organizados",
                "Mais clareza nas rotinas para apoiar uma gestão responsável.",
              ],
              [
                MonitorSmartphone,
                "Olhar para o futuro",
                "Tecnologia como caminho para uma experiência mais simples.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Compass;
              return (
                <div key={String(title)}>
                  <I size={26} strokeWidth={1.3} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="digital-section">
        <div className="container digital-grid">
          <div>
            <p className="eyebrow">PRÓXIMOS CAPÍTULOS</p>
            <h2>
              Uma experiência cada
              <br />
              vez mais conectada.
            </h2>
          </div>
          <div>
            <p>
              Estamos construindo as bases de uma jornada digital que aproxima
              você das informações do seu negócio.
            </p>
            <p>
              Portal do cliente, documentos e novas formas de interação fazem
              parte da nossa visão de futuro. Essas funcionalidades ainda estão
              em planejamento.
            </p>
            <span className="outline-tag">EM EVOLUÇÃO, COM PROPÓSITO</span>
          </div>
        </div>
      </section>
      <section className="section insights">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONHECIMENTO QUE ORIENTA</p>
              <h2>
                Boas decisões começam
                <br />
                com boas informações.
              </h2>
            </div>
            <Link className="text-link" href="/conteudos">
              Explore os conteúdos <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="insight-grid">
            <Link href="/conteudos/contabilidade-consultiva">
              <span className="article-category">GESTÃO & ESTRATÉGIA</span>
              <h3>O que a contabilidade pode revelar sobre o seu negócio?</h3>
              <span className="card-link">
                Leia o artigo <ArrowUpRight size={18} />
              </span>
            </Link>
            <Link href="/conteudos/planejamento-empresarial">
              <span className="article-category">EMPREENDEDORISMO</span>
              <h3>
                Antes de abrir uma empresa, comece pelas perguntas certas.
              </h3>
              <span className="card-link">
                Leia o artigo <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <ContactStrip />
      <section className="section container contact-grid" id="contato">
        <div>
          <p className="eyebrow">VAMOS CONVERSAR</p>
          <h2>
            Conte o seu momento.
            <br />
            Vamos pensar no próximo passo.
          </h2>
          <p>
            Compartilhe suas necessidades para iniciar uma conversa sobre o seu
            negócio.
          </p>
        </div>
        <ContactForm email={contact.email} whatsapp={contact.whatsapp} />
      </section>
    </>
  );
}
