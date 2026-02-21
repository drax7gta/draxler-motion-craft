import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sobre = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-36 pb-24" ref={ref}>
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
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
            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-8 rounded-2xl border border-border/40 bg-card/50"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Nome</p>
                  <p className="font-display font-semibold">Gustavo</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Profissional</p>
                  <p className="font-display font-semibold">Draxler</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Idade</p>
                  <p className="font-display font-semibold">18 anos</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Localização</p>
                  <p className="font-display font-semibold">Três Pontas, MG</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Experiência</p>
                  <p className="font-display font-semibold">1 ano como editor</p>
                  <p className="font-display font-semibold">3 meses em motion design</p>
                </div>
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-lg text-foreground/90 leading-relaxed">
                Meu nome é Gustavo, mas no mercado me conhecem como Draxler. Tenho 18 anos e comecei
                a editar vídeos há pouco mais de um ano porque simplesmente não conseguia parar de
                criar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nos últimos meses mergulhei de cabeça no motion design, e foi aí que tudo fez sentido.
                Descobri que meu forte é transformar ideias em vídeos curtos que prendem do primeiro
                ao último segundo. Criativos para anúncios, conteúdos para redes, animações com ritmo
                e propósito.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Trabalho de Três Pontas, em Minas Gerais, e atendo clientes de qualquer lugar. O que
                me move é entregar resultado real: vídeos que performam, que vendem e que fazem as
                pessoas pararem para assistir.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Se você precisa de um criativo que realmente funciona, a gente devia conversar.
              </p>

              <a
                href="https://wa.me/5521979108337?text=Ol%C3%A1%20Draxler%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] mt-4"
              >
                Falar comigo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
