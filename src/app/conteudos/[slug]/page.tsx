import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { metadata as makeMetadata } from "@/lib/site";
import { PageIntro, ContactStrip } from "@/components/ui";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a ? makeMetadata(a.title, `/conteudos/${slug}`, a.intro) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageIntro eyebrow={a.category} title={a.title} text={a.intro} />
      <article className="section container prose">
        {a.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </section>
        ))}
        <aside className="article-note">
          Conteúdo informativo geral. As decisões contábeis, jurídicas e
          tributárias dependem da análise do caso concreto e da legislação
          aplicável.
        </aside>
      </article>
      <ContactStrip />
    </>
  );
}
