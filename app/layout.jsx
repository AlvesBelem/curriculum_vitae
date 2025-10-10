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
        <script
          src="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"
          defer
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
