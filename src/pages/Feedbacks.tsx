import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const feedbacks = [
  {
    id: 1,
    name: "Cliente 01",
    text: "O Draxler entregou um criativo que superou minhas expectativas. O vídeo performou muito acima da média nas campanhas.",
  },
  {
    id: 2,
    name: "Cliente 02",
    text: "Profissional demais. Roteiro, edição, narração e timing perfeitos. Já estamos no terceiro projeto juntos.",
  },
  {
    id: 3,
    name: "Cliente 03",
    text: "Nunca vi alguém tão novo entregar com tanta qualidade. O cara entende de retenção e sabe o que funciona.",
  },
  {
    id: 4,
    name: "Cliente 04",
    text: "Os criativos do Draxler mudaram o jogo dos meus anúncios. Taxa de conversão subiu 40% depois que começamos a trabalhar juntos.",
  },
  {
    id: 5,
    name: "Cliente 05",
    text: "Rápido, criativo e sempre preocupado com resultado. Recomendo de olhos fechados.",
  },
  {
    id: 6,
    name: "Cliente 06",
    text: "O diferencial dele é pensar no vídeo como estratégia, não só como edição. Isso faz toda a diferença no resultado final.",
  },
];

const Feedbacks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-36 pb-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
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

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {feedbacks.map((feedback, i) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="break-inside-avoid group"
              >
                <div
                  className="relative p-6 md:p-8 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:border-border/80 transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-primary/5"
                  onClick={() => setSelected(selected === feedback.id ? null : feedback.id)}
                >
                  {/* Quote mark */}
                  <span className="absolute top-4 right-6 text-4xl font-display text-foreground/[0.04] select-none leading-none">
                    "
                  </span>
                  <p className="text-foreground/90 leading-relaxed text-sm md:text-base mb-4">
                    "{feedback.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-display font-semibold text-primary">
                        {feedback.name.slice(-2)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
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
