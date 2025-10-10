import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Currículo — Marcelo Alberto Alves Nogueira",
  description: "Currículo profissional em layout moderno, versão web + PDF clean",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO base */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content="Marcelo Alberto Alves Nogueira" />
        <meta name="keywords" content="currículo, desenvolvedor full-stack, Next.js, React, Prisma, Python, suporte técnico, design gráfico, Marcelo Nogueira" />

        {/* Open Graph para redes sociais */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:url" content="https://seudominio.com" />
        <meta property="og:site_name" content="Currículo Marcelo Nogueira" />
        <meta property="og:image" content="https://seudominio.com/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://seudominio.com/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Canonical */}
        <link rel="canonical" href="https://seudominio.com/curriculo" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Marcelo Alberto Alves Nogueira",
            jobTitle: "Desenvolvedor Full-Stack",
            url: "https://seudominio.com/curriculo",
            sameAs: [
              "https://www.linkedin.com/in/seuusuario",
              "https://github.com/seuusuario"
            ]
          })
        }} />

        {/* PDF Script */}
        <script
          src="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"
          defer
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}