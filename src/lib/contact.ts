import { confirmedServiceNames } from "./business.ts";
import { validEmail } from "./channels.ts";
export type ContactData = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
};
export function validateContact(data: ContactData): string | null {
  if (data.name.trim().length < 2 || data.name.length > 100)
    return "Informe seu nome, entre 2 e 100 caracteres.";
  if (!validEmail(data.email)) return "Informe um e-mail válido.";
  if (data.company.length > 160)
    return "O nome da empresa deve ter até 160 caracteres.";
  if (![...confirmedServiceNames, "Outra necessidade"].includes(data.service))
    return "Selecione o assunto da conversa.";
  if (data.message.trim().length < 10 || data.message.length > 3000)
    return "Escreva uma mensagem entre 10 e 3.000 caracteres.";
  if (!data.consent) return "Confirme que leu a Política de Privacidade.";
  return null;
}
export function requestText(data: ContactData) {
  return `Solicitação de contato — M D’Freitas\n\nNome: ${data.name.trim()}\nE-mail: ${data.email.trim()}\nEmpresa: ${data.company.trim() || "Não informada"}\nAssunto: ${data.service}\n\n${data.message.trim()}`;
}
