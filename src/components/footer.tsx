import Link from "next/link";
import { Brand } from "./brand";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/lib/business";
import { greeting, whatsappMessage } from "@/lib/channels";
import { contact, services } from "@/lib/site";
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link href="/">
            <Brand />
          </Link>
          <p>
            Clareza para decidir.
            <br />
            Confiança para crescer.
          </p>
        </div>
        <div>
          <h2>Institucional</h2>
          <Link href="/sobre">Sobre a M D’Freitas</Link>
          <Link href="/servicos">Nossos serviços</Link>
          <Link href="/conteudos">Conteúdos e artigos</Link>
        </div>
        <div>
          <h2>Soluções</h2>
          <nav className="footer-services" aria-label="Navegação de serviços">
            {services.map((service) => (
              <Link key={service.id} href={service.href}>
                {service.title}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>Converse com a gente</h2>
          <Link href="/contato">
            Entre em contato <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          {contact.email && (
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          )}
          {contact.whatsapp && (
            <a
              href={whatsappMessage(contact.whatsapp, greeting)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
          <address>{business.address}</address>
          <span>
            Atendimento próximo.
            <br />
            Visão de longo prazo.
          </span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} M D’Freitas. Todos os direitos
          reservados.
        </span>
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>
      </div>
    </footer>
  );
}
