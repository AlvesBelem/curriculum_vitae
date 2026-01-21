"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const pdfOptions = {
  margin: 5,
  filename: "Curriculo-Marcelo-Alberto-Alves-Nogueira.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
};

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function ExperienceItem({ title, period, items }) {
  return (
    <div className="space-y-1">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-500">{period}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TechnicalList({ entries }) {
  return (
    <>
      {entries.map((entry) => (
        <div key={entry.title}>
          <p className="font-semibold text-slate-800">{entry.title}</p>
          <p className="text-slate-700 text-sm">{entry.detail}</p>
        </div>
      ))}
    </>
  );
}

const sharePdfUrl = "/curriculo%20Marcelo%20Alves%20mobile.pdf";

export default function Page() {
  const [ready, setReady] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    // keep placeholder in case html2pdf is reintroduced
    setReady(true);
  }, []);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const mobileUa = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(mobileUa);
    setShareSupported(mobileUa && !!navigator.share);
  }, []);

  const a4PdfUrl = "/curriculo%20Marcelo%20Alves%20A4.pdf";

  const handleDownload = async () => {
    try {
      const response = await fetch(a4PdfUrl);
      if (!response.ok) return;
      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = fileURL;
      anchor.download = "Curriculo-Marcelo-Alves-Nogueira.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(fileURL);
    } catch {
      // fallback to generated file (if html2pdf available)
      const cv = document.getElementById("cv");
      if (!cv || !window.html2pdf) return;
      window.html2pdf().set(pdfOptions).from(cv).save();
    }
  };

  const handleShare = async () => {
    if (!shareSupported) {
      handleDownload();
      return;
    }

    try {
      const response = await fetch(sharePdfUrl);
      if (!response.ok) {
        handleDownload();
        return;
      }
      const blob = await response.blob();
      const file = new File([blob], "Curriculo-Marcelo-Alves-mobile.pdf", {
        type: "application/pdf",
      });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Currículo Marcelo",
          text: "Currículo Executivo – Marcelo Alberto Alves Nogueira",
          files: [file],
        });
      } else {
        await navigator.share({
          title: "Currículo Marcelo",
          text: "Currículo Executivo – Marcelo Alberto Alves Nogueira",
        });
      }
    } catch {
      handleDownload();
    }
  };

  const shouldShare = isMobile && shareSupported;

  const handlePrimaryAction = async () => {
    if (shouldShare) {
      await handleShare();
      return;
    }
    handleDownload();
  };

  const actionLabel = shouldShare ? "Compartilhar PDF" : "Baixar PDF";

  return (
    <main className="flex min-h-screen justify-center bg-slate-100 py-6 px-4 sm:px-6">
      <div className="w-full max-w-5xl">
        <div
          className="card bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100"
          id="cv"
        >
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <aside className="bg-dark text-white p-6 md:p-8 flex flex-col gap-6 items-start print-condensed-gap">
              <div className="w-full flex justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary">
                  <Image
                    src="/foto.png"
                    alt="Marcelo Nogueira - Desenvolvedor Full-Stack e Especialista em TI"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              <div className="w-full text-left space-y-1">
                <h1 className="text-2xl font-bold">Marcelo Alberto Alves Nogueira</h1>
                <p className="text-sm text-gray-300">
                  Currículo Executivo – Tecnologia, Sistemas & Soluções Digitais
                </p>
              </div>

              <AnimatedSection delay={0.05}>
                <section className="w-full space-y-2 text-sm text-left print-tight print-small print-no-break">
                  <h2 className="text-primary font-semibold text-xs tracking-wide uppercase">
                    Contato
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex flex-wrap items-center gap-2">
                      <FaWhatsapp className="text-white text-base" />
                      <a
                        href="https://wa.me/5591992876466"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                      (91) 99287-6466 (WhatsApp)
                    </a>
                  </li>
                    <li className="flex flex-wrap items-center gap-2">
                      <FaEnvelope className="text-white text-base" />
                      <a
                        href="mailto:marcelo.alves28@gmail.com"
                        className="hover:underline"
                    >
                      marcelo.alves28@gmail.com
                    </a>
                  </li>
                  <li className="flex flex-wrap items-center gap-2">
                      <FaLinkedin className="text-white text-base" />
                      <a
                        href="https://www.linkedin.com/in/alvesbelem/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        linkedin.com/in/alvesbelem
                      </a>
                    </li>
                    <li className="flex flex-wrap items-center gap-2">
                      <FaGithub className="text-white text-base" />
                      <a
                        href="https://github.com/AlvesBelem"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                      github.com/AlvesBelem
                    </a>
                  </li>
                    <li className="flex flex-wrap items-center gap-2">
                      <FaMapMarkerAlt className="text-white text-base" />
                      <span>Belem - PA</span>
                    </li>
                  </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <section className="w-full space-y-2 text-sm text-left print-tight print-small print-no-break">
                  <h2 className="text-primary font-semibold text-xs tracking-wide uppercase">
                    Formação
                  </h2>
                  <ul className="space-y-1">
                    <li>Análise e Desenvolvimento de Sistemas - UNAMA (3º semestre)</li>
                    <li>Ensino Médio Completo</li>
                  </ul>
                </section>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <section className="w-full space-y-2 text-sm text-left print-tight print-small print-no-break">
                  <h2 className="text-primary font-semibold text-xs tracking-wide uppercase">
                    Idiomas
                  </h2>
                  <p>Inglês - Básico</p>
                </section>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <section className="w-full space-y-2 text-sm text-left print-tight print-small print-no-break">
                  <h2 className="text-primary font-semibold text-xs tracking-wide uppercase">
                    Próximos Cursos (2026)
                  </h2>
                  <ul className="space-y-1">
                    <li>Terraform </li>
                    <li>Inglês - Intermediário</li>
                    <li>Agentes de IA com Python: OpenAI, Hugging Face e LangChain</li>
                    <li>n8n Impressionador</li>
                  </ul>
                </section>
              </AnimatedSection>
            </aside>

            <section className="space-y-8 px-4 py-6 sm:px-6 sm:py-8">
              <div className="no-print flex justify-end">
                <button
                  onClick={handlePrimaryAction}
                  disabled={!ready}
                  className="btn w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:shadow-md disabled:opacity-50 md:w-auto"
                >
                  {actionLabel}
                </button>
              </div>

              <AnimatedSection delay={0.25}>
                <div className="space-y-3 print-tight print-small print-no-break">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Posicionamento Profissional
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Especialista em Tecnologia, Sistemas, Suporte, Consultoria e Desenvolvimento de Soluções Digitais, com mais de 20 anos integrando TI, negócios, vendas, marketing e desenvolvimento. Tenho perfil hands-on, consultivo e orientado a resultados, atuando desde suporte técnico e implantação de ERP até programação, automação, dados e inteligência artificial.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="space-y-3 print-tight print-small print-no-break">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Resumo Executivo
                  </h2>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                    <li>+12 anos em suporte, implantação, consultoria e treinamento de sistemas ERP Alterdata.</li>
                    <li>Experiência em vendas consultivas, demonstração técnica comercial e funil de vendas com apoio de marketing digital e tradicional.</li>
                    <li>Atuação empreendedora em gráfica, sublimação, design e produção visual.</li>
                    <li>Profissional full stack com domínio em web, APIs, bancos de dados, automações e integrações.</li>
                    <li>Base sólida em dados, BI, cloud (AWS) e Inteligência Artificial aplicada.</li>
                    <li>Comunicação clara, visão de negócio e facilidade para atuar com clientes e equipes multidisciplinares.</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.35}>
                <div className="space-y-6 text-sm text-slate-700 print-tight print-small print-no-break">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Experiência Profissional
                  </h2>
                  <div className="space-y-5">
                    <ExperienceItem
                      title="Empreendedor - Tecnologia, Sistemas & Design (Autônomo)"
                      period="04/2025 - Atual"
                      items={[
                        "Desenvolvimento de sites, sistemas, landing pages, lojas virtuais e APIs com integrações ERP.",
                        "Consultoria, suporte e implantação presencial do sistema Wshop (Alterdata) e soluções sob medida.",
                        "Produção de materiais gráficos, identidades visuais e atuação estratégica como designer e consultor.",
                      ]}
                    />
                    <ExperienceItem
                      title="Consultor de Soluções - Alterdata Software"
                      period="05/08/2024 - 03/04/2025"
                      items={[
                        "Prospecção e atendimento consultivo a clientes com demonstrações técnicas e comerciais.",
                        "Aplicação de funil de vendas, técnicas de persuasão e fechamento com apoio de marketing digital e tradicional.",
                        "Análise de necessidades e recomendação de soluções adequadas.",
                      ]}
                    />
                    <ExperienceItem
                      title="Fundador / Proprietário - Oficina do Print - Personalizados & Gráfica"
                      period="Período"
                      items={[
                        "Produção de camisas, canecas, sublimação e estamparia.",
                        "Criação de artes visuais, materiais gráficos e gestão completa do negócio.",
                      ]}
                    />
                    <ExperienceItem
                      title="Analista de Suporte - Alterdata Software"
                      period="2010 - 2022"
                      items={[
                        "Instalação, implantação e suporte de ERP e automação comercial com treinamentos presenciais.",
                        "Diagnóstico de redes, migração de dados via Excel e administração de bancos SQL Server e PostgreSQL.",
                        "Atendimento remoto e presencial para empresas de diferentes portes.",
                      ]}
                    />
                    <ExperienceItem
                      title="Digitador / Designer Gráfico - Anny By"
                      period="2007 - 2010"
                      items={[
                        "Criação de layouts para serigrafia e manipulação de bordados digitais.",
                        "Produção gráfica utilizando Corel Draw e implantação de sistemas.",
                      ]}
                    />
                    <ExperienceItem
                      title="Designer Gráfico Autônomo"
                      period="2000 - 2006"
                      items={[
                        "Criação de logomarcas, panfletos e identidade visual com Photoshop e Corel Draw.",
                      ]}
                    />
                    <ExperienceItem
                      title="Diagramador - Diário do Amapá"
                      period="1998 - 1999"
                      items={["Diagramação, tratamento de imagens e impressão de fotolitos para jornais."]}
                    />
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="space-y-4 text-sm text-slate-700 print-tight print-small print-no-break">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Competências Técnicas
                  </h2>
                  <TechnicalList
                    entries={[
                      {
                        title: "Desenvolvimento & Programação",
                        detail: "Python - Node.js - Next.js - APIs REST - Prisma - shadcn/ui",
                      },
                      { title: "Bancos de Dados", detail: "PostgreSQL - SQL Server - Oracle" },
                      {
                        title: "Dados & BI",
                        detail: "Power BI - Excel (Intermediário) - Análise de Dados",
                      },
                      {
                        title: "Cloud & Automação",
                        detail: "AWS (Hashtag Treinamentos) - n8n - Integrações de sistemas",
                      },
                      {
                        title: "Design & Criação",
                        detail: "Corel Draw - Canva - Produção gráfica completa",
                      },
                      {
                        title: "Sistemas & ERP",
                        detail: "Alterdata (suporte, implantação e consultoria) - Wshop",
                      },
                    ]}
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.45}>
                <div className="space-y-3 text-sm text-slate-700 print-tight print-small print-no-break">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Inteligência Artificial & Dados
                  </h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Agentes de IA com Python (OpenAI, Hugging Face, LangChain)</li>
                    <li>Inteligência Artificial aplicada a negócios</li>
                    <li>Automação inteligente de processos</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.5}>
                <div className="space-y-3 text-sm text-slate-700 print-tight print-small print-no-break">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Cursos e Certificações
                  </h2>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Desenvolvedor Full Stack - Digital House (227h)</li>
                    <li>AWS Impressionador - Hashtag Treinamentos</li>
                    <li>SQL Impressionador - Hashtag Treinamentos</li>
                    <li>Python Impressionador - Hashtag Treinamentos</li>
                    <li>Análise de Dados Impressionadora - Hashtag Treinamentos</li>
                    <li>Inteligência Artificial Impressionador - Hashtag Treinamentos</li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.55}>
                <div className="space-y-3 text-sm text-slate-700 print-tight print-small print-no-break">
                  <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Perfil Comportamental
                  </h2>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Visão estratégica de negócio</li>
                    <li>Comunicação clara com áreas técnicas e não técnicas</li>
                    <li>Capacidade analítica e resolução de problemas</li>
                    <li>Perfil consultivo e orientado a resultados</li>
                    <li>Autonomia, responsabilidade e aprendizado contínuo</li>
                  </ul>
                </div>
              </AnimatedSection>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
