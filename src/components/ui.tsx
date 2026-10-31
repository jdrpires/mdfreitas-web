import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  ChartNoAxesCombined,
  Calculator,
  UsersRound,
  Files,
  Building2,
} from "lucide-react";
import { services, contact } from "@/lib/site";
export function ContactButton({
  children = "Vamos conversar",
  light = false,
}: {
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      className={`button ${light ? "button-light" : "button-dark"}`}
      href={contact.whatsapp || "/contato"}
      {...(contact.whatsapp
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function ServiceGrid() {
  const icons = [
    Compass,
    ChartNoAxesCombined,
    Calculator,
    UsersRound,
    Files,
    Building2,
  ];
  return (
    <div className="service-grid">
      {services.map((s, i) => {
        const Icon = icons[i];
        return (
          <Link className="service-card" href={s.href} key={s.title}>
            <div className="card-top">
              <Icon size={28} strokeWidth={1.25} />
              <span>0{i + 1}</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <span className="card-link">
              Saiba mais <ArrowUpRight size={17} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="intro-copy">{text}</p>
      </div>
    </section>
  );
}
export function ContactStrip() {
  return (
    <section className="contact-strip">
      <div className="container">
        <div>
          <p className="eyebrow">O PRÓXIMO PASSO COMEÇA COM UMA CONVERSA</p>
          <h2>
            Vamos olhar para o futuro
            <br />
            do seu negócio?
          </h2>
        </div>
        <ContactButton light>Fale com a M D’Freitas</ContactButton>
      </div>
    </section>
  );
}
