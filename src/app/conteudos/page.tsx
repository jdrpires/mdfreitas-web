import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { articles } from "@/lib/articles";
import { metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata("Conteúdos e artigos", "/conteudos");
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="CONHECIMENTO QUE ORIENTA"
        title="Novas perspectivas para melhores decisões."
        text="Leituras sobre contabilidade, gestão e empreendedorismo, com clareza e atenção à realidade dos negócios."
      />
      <section className="section container insight-grid">
        {articles.map((a) => (
          <Link href={`/conteudos/${a.slug}`} key={a.slug}>
            <span className="article-category">{a.category}</span>
            <h2>{a.title}</h2>
            <p>{a.intro}</p>
            <span className="card-link">
              Leia o artigo <ArrowUpRight size={18} />
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
