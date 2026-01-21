import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://marcelo-nogueira.vercel.app"),
  title: {
    default: "Marcelo Nogueira | Desenvolvedor Full-Stack & Especialista em TI",
    template: "%s | Marcelo Nogueira",
  },
  description:
    "Currículo Executivo de Marcelo Nogueira. +20 anos de experiência em Suporte Técnico, Implantação de Sistemas (ERP), Consultoria TI e Desenvolvimento Web Full-Stack (Next.js, Python) em Belém/PA.",
  keywords: [
    "Marcelo Nogueira",
    "Desenvolvedor Full-Stack",
    "Analista de Suporte",
    "Consultor TI",
    "ERP Alterdata",
    "Next.js",
    "React",
    "Python",
    "Design Gráfico",
    "Belém",
    "Pará",
    "Automação",
    "Tecnologia",
    "Web Designer",
  ],
  authors: [{ name: "Marcelo Alberto Alves Nogueira" }],
  creator: "Marcelo Alberto Alves Nogueira",
  publisher: "Marcelo Alberto Alves Nogueira",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://marcelo-nogueira.vercel.app",
    title: "Marcelo Nogueira | Soluções em Tecnologia e Desenvolvimento",
    description:
      "Transformando experiência de +20 anos em soluções digitais. Suporte, Consultoria e Desenvolvimento Web em Belém, PA.",
    siteName: "Portfólio & Currículo Marcelo Nogueira",
    images: [
      {
        url: "/foto.png",
        width: 800,
        height: 600,
        alt: "Marcelo Nogueira - Especialista em TI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo Nogueira | Dev Full-Stack & Suporte",
    description: "Especialista em TI com +20 anos de mercado. Desenvolvimento, Suporte e Inovação.",
    images: ["/foto.png"],
  },
  verification: {
    google: "google-verification-code-placeholder",
  },
};

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcelo Alberto Alves Nogueira",
    jobTitle: "Desenvolvedor Full-Stack & Especialista em TI",
    url: "https://marcelo-nogueira.vercel.app",
    image: "https://marcelo-nogueira.vercel.app/foto.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Belém",
      addressRegion: "PA",
      addressCountry: "BR",
    },
    sameAs: [
      "https://github.com/AlvesBelem",
      "https://www.linkedin.com/in/marcelo-nogueira-alves", // Sugestão: verificar URL correta
    ],
    knowsAbout: [
      "Desenvolvimento de Software",
      "Suporte Técnico",
      "Gestão de ERP",
      "Next.js",
      "React",
      "Python",
      "Banco de Dados SQL",
      "Automação de Processos",
    ],
    description: "Profissional de tecnologia com mais de 20 anos de atuação em suporte, implantação de sistemas e desenvolvimento de software.",
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}