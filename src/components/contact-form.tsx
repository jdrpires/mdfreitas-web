"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { validateContact, requestText, type ContactData } from "@/lib/contact";
import { emailMessage, whatsappMessage } from "@/lib/channels";
import { services } from "@/lib/site";
export function ContactForm({
  email,
  whatsapp,
}: {
  email: string;
  whatsapp: string;
}) {
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState("");
  const available = Boolean(email || whatsapp);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPrepared("");
    if (!available) return;
    const form = new FormData(e.currentTarget);
    const data: ContactData = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      service: String(form.get("service") || ""),
      message: String(form.get("message") || ""),
      consent: form.get("consent") === "on",
    };
    const issue = validateContact(data);
    if (issue) {
      setError(issue);
      return;
    }
    setPrepared(requestText(data));
  }
  if (!available)
    return (
      <section
        className="contact-form"
        aria-label="Disponibilidade do atendimento"
      >
        <h2>Em breve, mais perto de você.</h2>
        <p>
          Os canais de atendimento ainda serão disponibilizados. Assim que
          estiverem disponíveis, você poderá conversar com a M D’Freitas por
          aqui.
        </p>
        <p>Nenhuma solicitação pode ser enviada por este site neste momento.</p>
      </section>
    );
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => {
        setPrepared("");
        setError("");
      }}
    >
      <h2>Conte um pouco sobre você.</h2>
      <p>
        Prepare sua mensagem e escolha um dos canais disponíveis para concluir o
        envio.
      </p>
      <div className="form-grid">
        <label>
          Seu nome
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Como podemos chamar você?"
          />
        </label>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="voce@empresa.com.br"
          />
        </label>
      </div>
      <label>
        Empresa <span>(opcional)</span>
        <input
          name="company"
          autoComplete="organization"
          maxLength={160}
          placeholder="Nome da sua empresa"
        />
      </label>
      <label>
        Como podemos ajudar?
        <select name="service" required defaultValue="">
          <option value="" disabled>
            Selecione um assunto
          </option>
          {services.map((s) => (
            <option key={s.title}>{s.title}</option>
          ))}
          <option>Outra necessidade</option>
        </select>
      </label>
      <label>
        Sua mensagem
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder="Compartilhe o momento e as necessidades do seu negócio."
        />
      </label>
      <label className="checkbox-label">
        <input type="checkbox" name="consent" required />
        <span>
          Li a{" "}
          <Link href="/politica-de-privacidade">Política de Privacidade</Link> e
          estou ciente do uso dos dados para atendimento.
        </span>
      </label>
      <p className="form-message error" role="alert">
        {error}
      </p>
      <p className="form-message" role="status">
        {prepared
          ? "Mensagem preparada. Abra o canal abaixo e confirme o envio por lá. Nenhuma mensagem foi enviada automaticamente."
          : ""}
      </p>
      <button className="button button-dark" type="submit">
        Preparar mensagem <ArrowUpRight size={18} />
      </button>
      {prepared && (
        <div className="prepared-channels">
          {whatsapp && (
            <a
              className="button button-dark"
              href={whatsappMessage(whatsapp, prepared)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir WhatsApp com mensagem <ArrowUpRight size={18} />
            </a>
          )}
          {email && (
            <a
              className="button button-dark"
              href={emailMessage(email, "Contato — M D’Freitas", prepared)}
            >
              Abrir aplicativo de e-mail <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      )}
      <small>
        Evite incluir senhas, documentos ou dados financeiros sensíveis.
      </small>
    </form>
  );
}
