"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

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

export default function Page() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.html2pdf) {
        setReady(true);
        clearInterval(timer);
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    const cv = document.getElementById("cv");
    const opt = {
      margin: 5,
      filename: "Curriculo-Marcelo-Alberto-Alves-Nogueira.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    window.html2pdf().set(opt).from(cv).save();
  };

  return (
    <main className="flex justify-center py-8 px-4">
      <div
        className="card bg-white shadow-2xl max-w-5xl w-full overflow-hidden"
        id="cv"
      >
        <div className="flex flex-col md:flex-row">
          {/* Coluna Esquerda */}
          <aside className="bg-dark text-white w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center">
            {/* Foto */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-4">
              <Image
                src="/foto.png"
                alt="Foto de Marcelo"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>

            <h1 className="text-2xl font-bold text-center">
              Marcelo Alberto Alves Nogueira
            </h1>
            <p className="text-sm text-gray-300 mb-6 text-center">
              Analista de Suporte & Dev FullStack
            </p>

            <AnimatedSection delay={0.1}>
              <section className="w-full mb-6">
                <h2 className="text-primary font-semibold text-sm mb-2">
                  CONTATO
                </h2>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-400" />
                    <a
                      href="https://wa.me/5591992876466"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      (91) 99287-6466
                    </a>
                  </li>
                  <li>✉️ marcelo.alves28@gmail.com</li>
                  <li>📍 Belém – PA</li>
                </ul>
              </section>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <section className="w-full mb-6">
                <h2 className="text-primary font-semibold text-sm mb-2">
                  FORMAÇÃO
                </h2>
                <ul className="text-sm space-y-2">
                  <li>🎓 Segundo grau completo</li>
                  <li>💻 Curso Full Stack – Digital House</li>
                  <li>
                    🎓 Em curso Análise e desenvolvimento de sistema - Unama
                  </li>
                </ul>
              </section>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <section className="w-full">
                <h2 className="text-primary font-semibold text-sm mb-2">
                  HABILIDADES
                </h2>
                <ul className="text-sm space-y-1">
                  <li>• Suporte técnico e redes</li>
                  <li>• Windows, Word, Excel</li>
                  <li>• SQL Server / PostgreSQL</li>
                  <li>• CorelDRAW / Photoshop</li>
                  <li>• Comunicação e atendimento</li>
                  <li>• Nextjs / Python / Prisma / Chadcn</li>
                </ul>
              </section>
            </AnimatedSection>
          </aside>

          {/* Coluna Direita */}
          <section className="w-full md:w-2/3 p-6 md:p-10 space-y-8">
            <div className="no-print flex justify-end">
              <button
                onClick={handleDownload}
                disabled={!ready}
                className="btn border border-slate-300 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
              >
                📄 Baixar PDF
              </button>
            </div>

            <AnimatedSection delay={0.1}>
              <div>
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3">
                  PERFIL PROFISSIONAL
                </h2>
                <p className="text-slate-700 text-sm leading-6">
                  Com uma trajetória sólida em <strong>tecnologia</strong> e{" "}
                  <strong>design gráfico</strong>, iniciei meu contato com a
                  computação aos 9 anos de idade e logo mergulhei no design
                  utilizando o CorelDRAW desde os 12 anos. Ao longo de mais de
                  uma década, acumulei experiência em <strong>design</strong> e{" "}
                  <strong>diagramação</strong>, atuando inclusive em jornais de
                  diferentes estados, como em Macapá, no Amapá.
                </p>
                <p className="text-slate-700 text-sm leading-6 mt-4">
                  Minha transição para a área de{" "}
                  <strong>suporte técnico</strong> aconteceu em 2010, quando
                  ingressei na Alterdata, onde permaneci por 12 anos. Durante
                  esse período, desenvolvi habilidades técnicas robustas,
                  incluindo conhecimento avançado em{" "}
                  <strong>bancos de dados</strong> e suporte a sistemas.
                </p>
                <p className="text-slate-700 text-sm leading-6 mt-4">
                  A partir de 2019, aprofundei meus conhecimentos em{" "}
                  <strong>programação</strong> e{" "}
                  <strong>desenvolvimento full-stack</strong>, dominando
                  ferramentas modernas como <strong>Next.js</strong>,{" "}
                  <strong>Prisma</strong>, <strong>ChadCN</strong> e{" "}
                  <strong>Python</strong>.
                </p>
                <p className="text-slate-700 text-sm leading-6 mt-4">
                  Estou sempre em busca de unir <strong>design</strong> e{" "}
                  <strong>desenvolvimento</strong> com <strong>inovação</strong>
                  , criando soluções tecnológicas completas e eficientes. Meu
                  foco é oferecer um trabalho de alta qualidade, com base em
                  anos de experiência e uma constante evolução profissional.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3">
                  EXPERIÊNCIA PROFISSIONAL
                </h2>
                <ul className="text-sm text-slate-700 space-y-3">
                  <li>
                    <strong>Alterdata Software</strong> — Analista de Suporte
                    (2010–2022)
                    <br />
                    Instalação, implantação e treinamento de sistemas ERP e
                    automação comercial. Diagnóstico de rede e migração de bases
                    via Excel → SQL Server / PostgreSQL.
                  </li>
                  <li>
                    <strong>Anny By</strong> — Digitador, Designer Gráfico
                    (2007–2010)
                    <br />
                    Criação de layouts de serigrafia e manipulação de bordados
                    digitais.
                  </li>
                  <li>
                    <strong>Autônomo</strong> — Designer Gráfico (2000–2006)
                    <br />
                    Criação de logomarcas, panfletos e materiais impressos.
                  </li>
                  <li>
                    <strong>Diário do Amapá</strong> — Diagramador (1998–1999)
                    <br />
                    Diagramação e tratamento de imagens para mídia impressa.
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div>
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-1 mb-3">
                  QUALIFICAÇÕES E CURSOS
                </h2>
                <ul className="text-sm text-slate-700 list-disc ml-6 space-y-1">
                  <li>Inglês básico</li>
                  <li>Curso avançado de Excel, Word e Windows</li>
                  <li>Redes de computadores e manutenção</li>
                  <li>Digital House — Desenvolvedor Full Stack (227h)</li>
                </ul>
              </div>
            </AnimatedSection>
          </section>
        </div>
      </div>
    </main>
  );
}
