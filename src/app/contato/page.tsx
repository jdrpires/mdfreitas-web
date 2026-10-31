import { business } from "@/lib/business";
import { greeting, whatsappMessage } from "@/lib/channels";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { contact, metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Contato",
  "/contato",
  "Conheça os canais disponíveis da M D’Freitas e prepare uma mensagem para conversar sobre as necessidades da sua empresa.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="VAMOS CONVERSAR"
        title="O próximo passo começa com uma boa conversa."
        text="Queremos entender o seu momento e o que faz sentido para o futuro da sua empresa."
      />
      <section className="section container contact-grid">
        <div>
          <p className="eyebrow">UMA CONVERSA COM PROPÓSITO</p>
          <h2>
            Seu negócio merece
            <br />
            um olhar próximo.
          </h2>
          <p>
            Compartilhe suas dúvidas e necessidades. O primeiro passo é entender
            como podemos ajudar.
          </p>
          {contact.whatsapp && (
            <a
              className="text-link"
              href={whatsappMessage(contact.whatsapp, greeting)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar pelo WhatsApp{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          {contact.email && (
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          )}
          <div className="office-details">
            <h3>Onde estamos</h3>
            <address>{business.address}</address>
            <p>Responsável: {business.responsible}</p>
          </div>
          {!contact.email && !contact.whatsapp && (
            <p className="article-note">
              Os canais de atendimento ainda serão disponibilizados. Aguarde a
              atualização desta página para iniciar uma conversa.
            </p>
          )}
        </div>
        <ContactForm email={contact.email} whatsapp={contact.whatsapp} />
      </section>
    </>
  );
}
