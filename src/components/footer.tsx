import Link from "next/link";
import { Brand } from "./brand";
import { contact } from "@/lib/site";
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
          <Link href="/contabilidade-consultiva">Contabilidade consultiva</Link>
          <Link href="/abertura-de-empresas">Abertura de empresas</Link>
          <Link href="/servicos#gestao-financeira">Gestão financeira</Link>
        </div>
        <div>
          <h2>Converse com a gente</h2>
          <Link href="/contato">Entre em contato ↗</Link>
          {contact.email && (
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          )}
          {contact.whatsapp && (
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
          )}
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
