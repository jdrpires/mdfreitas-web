import type { Metadata } from "next";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Brand } from "@/components/brand";
import { isIndexable } from "@/lib/deployment";
import { site, organization } from "@/lib/site";
export const metadata: Metadata = {
  robots: isIndexable(process.env)
    ? { index: true, follow: true }
    : { index: false, follow: false },
  metadataBase: new URL(site.url),
  title: {
    default: "M D’Freitas — Consultoria & Contabilidade",
    template: "%s | M D’Freitas",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header brand={<Brand />} />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
