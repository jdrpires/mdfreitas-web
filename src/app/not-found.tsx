import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section container not-found">
      <p className="eyebrow">PÁGINA NÃO ENCONTRADA</p>
      <h1>
        Vamos encontrar
        <br />
        um novo caminho?
      </h1>
      <p>O endereço acessado não está disponível.</p>
      <Link className="button button-dark" href="/">
        Voltar ao início ↗
      </Link>
    </section>
  );
}
