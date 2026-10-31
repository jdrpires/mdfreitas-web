"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Header({ brand }: { brand: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const links = [
    ["Início", "/"],
    ["Sobre nós", "/sobre"],
    ["Serviços", "/servicos"],
    ["Conteúdos", "/conteudos"],
  ];
  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          href="/"

          onClick={() => setOpen(false)}
        >
          {brand}
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Navegação principal"
          className={open ? "navigation is-open" : "navigation"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contato"
            className="button button-dark header-cta"
            onClick={() => setOpen(false)}
          >
            Vamos conversar <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
