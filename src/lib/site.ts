import type { Metadata } from "next";
export const site = {
  name: "M D’Freitas",
  description:
    "Consultoria e contabilidade com visão estratégica, organização e proximidade para apoiar as decisões do seu negócio.",
  url: "https://mdfreitas.com.br",
};
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
export const contact = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
  whatsapp: /^\d{10,15}$/.test(number) ? `https://wa.me/${number}` : "",
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
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      locale: "pt_BR",
      type: "website",
      siteName: site.name,
    },
  };
}
export const services = [
  {
    title: "Consultoria empresarial",
    text: "Uma visão ampla do seu negócio para transformar desafios em decisões bem fundamentadas.",
    icon: "strategy",
    href: "/servicos#consultoria-empresarial",
    id: "consultoria-empresarial",
  },
  {
    title: "Gestão financeira",
    text: "Clareza sobre o fluxo de caixa, planejamento e organização para uma gestão mais consciente.",
    icon: "finance",
    href: "/servicos#gestao-financeira",
    id: "gestao-financeira",
  },
  {
    title: "Contabilidade",
    text: "Informações contábeis que vão além das obrigações e ajudam a enxergar o próximo passo.",
    icon: "accounting",
    href: "/contabilidade-consultiva",
    id: "contabilidade",
  },
  {
    title: "Departamento pessoal",
    text: "Acompanhamento das rotinas trabalhistas com atenção às pessoas e aos processos.",
    icon: "people",
    href: "/servicos#departamento-pessoal",
    id: "departamento-pessoal",
  },
  {
    title: "Departamento fiscal",
    text: "Organização das obrigações fiscais e análise do contexto tributário da sua empresa.",
    icon: "fiscal",
    href: "/servicos#departamento-fiscal",
    id: "departamento-fiscal",
  },
  {
    title: "Abertura de empresas",
    text: "Orientação desde as primeiras escolhas para começar com uma estrutura bem planejada.",
    icon: "business",
    href: "/abertura-de-empresas",
    id: "abertura-de-empresas",
  },
];
