import type { Metadata } from "next";
import { business, confirmedServiceNames, companyServices } from "./business";
import { validEmail, whatsappUrl } from "./channels";
export const site = {
  name: "M D’Freitas",
  description:
    "Consultoria e contabilidade com visão estratégica, organização e proximidade para apoiar as decisões do seu negócio.",
  url: business.url,
};
export const contact = {
  email: validEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? business.email),
  whatsapp: whatsappUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? business.whatsappNumber,
  ),
  privacyEmail: validEmail(process.env.NEXT_PUBLIC_PRIVACY_EMAIL),
};
export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "M D’Freitas — Consultoria & Contabilidade",
  url: site.url,
};
export function metadata(
  title: string,
  path: string,
  description = site.description,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [`${site.url}/opengraph-image`],
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      locale: "pt_BR",
      type: "website",
      siteName: site.name,
      images: [
        {
          url: `${site.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "M D’Freitas — Consultoria & Contabilidade",
        },
      ],
    },
  };
}
export const services = [
  {
    title: confirmedServiceNames[0],
    text: "Uma visão ampla do seu negócio para transformar desafios em decisões bem fundamentadas.",
    icon: "strategy",
    href: "/servicos#consultoria-empresarial",
    id: "consultoria-empresarial",
  },
  {
    title: confirmedServiceNames[1],
    text: "Clareza sobre o fluxo de caixa, planejamento e organização para uma gestão mais consciente.",
    icon: "finance",
    href: "/servicos#gestao-financeira",
    id: "gestao-financeira",
  },
  {
    title: confirmedServiceNames[2],
    text: "Informações contábeis que vão além das obrigações e ajudam a enxergar o próximo passo.",
    icon: "accounting",
    href: "/contabilidade-consultiva",
    id: "contabilidade",
  },
  {
    title: confirmedServiceNames[3],
    text: "Acompanhamento das rotinas trabalhistas com atenção às pessoas e aos processos.",
    icon: "people",
    href: "/servicos#departamento-pessoal",
    id: "departamento-pessoal",
  },
  {
    title: confirmedServiceNames[4],
    text: "Organização das obrigações fiscais e análise do contexto tributário da sua empresa.",
    icon: "fiscal",
    href: "/servicos#departamento-fiscal",
    id: "departamento-fiscal",
  },
  {
    title: confirmedServiceNames[5],
    text: companyServices.opening.description,
    icon: "business",
    href: "/abertura-de-empresas",
    id: "abertura-de-empresas",
  },
  {
    title: confirmedServiceNames[6],
    text: companyServices.regularization.description,
    icon: "regularization",
    href: "/regularizacao-de-empresas",
    id: "regularizacao-de-empresas",
  },
];
