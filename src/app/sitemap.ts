import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { articles } from "@/lib/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/sobre",
    "/servicos",
    "/contabilidade-consultiva",
    "/abertura-de-empresas",
    "/conteudos",
    "/contato",
    "/politica-de-privacidade",
    ...articles.map((a) => `/conteudos/${a.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
