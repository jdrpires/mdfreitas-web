"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { validateContact, requestText, type ContactData } from "@/lib/contact";
import { services } from "@/lib/site";
export function ContactForm({
  email,
  whatsapp,
}: {
  email: string;
  whatsapp: string;
}) {
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const available = Boolean(email || whatsapp);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("");
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
    const text = requestText(data);
    if (whatsapp) {
      // whatsapp is a validated absolute https://wa.me/ URL, not an internal route.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`${whatsapp}?text=${encodeURIComponent(text)}`);
      setStatus(
        "O WhatsApp será aberto com sua mensagem. Confirme o envio por lá.",
      );
    } else if (email) {
      window.location.assign(
        `mailto:${email}?subject=${encodeURIComponent(`Contato: ${data.service}`)}&body=${encodeURIComponent(text)}`,
      );
      setStatus(
        "Seu aplicativo de e-mail será aberto. Confirme o envio por lá.",
      );
    } else {
      const url = URL.createObjectURL(
        new Blob([text], { type: "text/plain;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "solicitacao-mdfreitas.txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(
        "Solicitação preparada para download. Nenhuma mensagem foi enviada. Guarde o arquivo até que os canais de atendimento estejam disponíveis.",
      );
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <h2>Conte um pouco sobre você.</h2>
      <p>
        {available
          ? "Prepare sua mensagem e finalize o envio no canal de atendimento."
          : "Os canais de atendimento serão disponibilizados em breve. Você pode preencher e baixar sua solicitação; este formulário ainda não envia mensagens."}
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
        {status}
      </p>
      <button className="button button-dark" type="submit">
        {available ? "Preparar mensagem" : "Baixar solicitação"}
        {available ? <ArrowUpRight size={18} /> : <Download size={18} />}
      </button>
      <small>
        Evite incluir senhas, documentos ou dados financeiros sensíveis.
      </small>
    </form>
  );
}
