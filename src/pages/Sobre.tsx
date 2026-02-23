import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Sobre = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 md:pt-36 pb-24" ref={ref}>
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7 }}
              className="mb-16"
            >
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-3">
                Quem sou
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                Sobre
              </h1>
            </motion.div>

            <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="p-8 rounded-2xl border border-border/30 bg-card/40"
              >
                <div className="space-y-4">
                  {[
                    { label: "Nome", value: "Gustavo" },
                    { label: "Profissional", value: "Draxler" },
                    { label: "Idade", value: "18 anos" },
                    { label: "Localização", value: "Três Pontas, MG" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="font-display font-semibold">{item.value}</p>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.62 }}
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Experiência</p>
                    <p className="font-display font-semibold">1 ano como editor</p>
                    <p className="font-display font-semibold">3 meses em motion design</p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                {[
                  { text: "Meu nome é Gustavo, mas no mercado me conhecem como Draxler. Tenho 18 anos e comecei a editar vídeos há pouco mais de um ano porque simplesmente não conseguia parar de criar.", highlight: true },
                  { text: "Nos últimos meses mergulhei de cabeça no motion design, e foi aí que tudo fez sentido. Descobri que meu forte é transformar ideias em vídeos curtos que prendem do primeiro ao último segundo. Criativos para anúncios, conteúdos para redes, animações com ritmo e propósito." },
                  { text: "Trabalho de Três Pontas, em Minas Gerais, e atendo clientes de qualquer lugar. O que me move é entregar resultado real: vídeos que performam, que vendem e que fazem as pessoas pararem para assistir." },
                  { text: "Se você precisa de um criativo que realmente funciona, a gente devia conversar." },
                ].map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className={para.highlight ? "text-lg text-foreground/90 leading-relaxed" : "text-muted-foreground leading-relaxed"}
                  >
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Sobre;
