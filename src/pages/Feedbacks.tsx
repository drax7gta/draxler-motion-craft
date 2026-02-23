import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const feedbacks = [
  {
    id: 1,
    name: "Miguel — Lava Jato",
    text: "Curtiu demais o vídeo e ficou animado para projetos futuros juntos. Uma parceria que tá só começando.",
    featured: true,
  },
  {
    id: 2,
    name: "QR Mídia",
    text: "A equipe toda aprovou o resultado do vídeo. Quando todo mundo bate o olho e gosta, é porque ficou certo.",
    featured: false,
  },
  {
    id: 3,
    name: "Axen",
    text: "Gostaram muito do vídeo. A agência que me contratou destacou a entrega antes do prazo combinado e a qualidade do trabalho.",
    featured: false,
  },
  {
    id: 4,
    name: "Conveniência Souza",
    text: "Só elogios. O vídeo superou o que esperavam e o feedback foi extremamente positivo do começo ao fim.",
    wide: true,
  },
];

const blurFadeUp = {
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Feedbacks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-36 pb-24" ref={ref}>
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <motion.div
            initial={blurFadeUp.initial}
            animate={inView ? blurFadeUp.animate : {}}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-3">
              Depoimentos
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Feedbacks
            </h1>
            <p className="mt-4 text-muted-foreground max-w-lg">
              O que clientes dizem sobre trabalhar comigo.
            </p>
          </motion.div>

          {/* Bento-style layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbacks.map((feedback, i) => (
              <motion.div
                key={feedback.id}
                initial={blurFadeUp.initial}
                animate={inView ? blurFadeUp.animate : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group ${feedback.wide ? "md:col-span-2" : ""} ${feedback.featured ? "md:row-span-1" : ""}`}
              >
                <div
                  className="relative p-5 md:p-7 rounded-[18px] border border-border/20 bg-card/30 hover:bg-card/55 hover:border-border/40 transition-all duration-500 hover:-translate-y-0.5 h-full flex flex-col justify-between overflow-hidden"
                >
                  {/* Blue left accent line */}
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-primary/40 rounded-full" />

                  <p className="relative text-foreground/90 leading-relaxed text-[14px] md:text-[15px] pl-4 mb-5 flex-1">
                    {feedback.text}
                  </p>

                  <div className="relative pl-4 mt-auto">
                    <span className="text-sm font-medium text-primary/80">
                      {feedback.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedbacks;
