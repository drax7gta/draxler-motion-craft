import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const feedbacks = [
  {
    id: 1,
    name: "Miguel — Lava Jato",
    text: "Curtiu demais o vídeo e ficou animado para projetos futuros juntos. Uma parceria que tá só começando.",
  },
  {
    id: 2,
    name: "QR Mídia",
    text: "A equipe toda aprovou o resultado do vídeo. Quando todo mundo bate o olho e gosta, é porque ficou certo.",
  },
  {
    id: 3,
    name: "Axen",
    text: "Gostaram muito do vídeo. A agência que me contratou destacou a entrega antes do prazo combinado e a qualidade do trabalho.",
  },
  {
    id: 4,
    name: "Conveniência Souza",
    text: "Só elogios. O vídeo superou o que esperavam e o feedback foi extremamente positivo do começo ao fim.",
  },
];

const blurFadeUp = {
  initial: { opacity: 0, y: 25, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Feedbacks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-36 pb-24" ref={ref}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div
            initial={blurFadeUp.initial}
            animate={inView ? blurFadeUp.animate : {}}
            transition={{ duration: 0.7 }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {feedbacks.map((feedback, i) => (
              <motion.div
                key={feedback.id}
                initial={blurFadeUp.initial}
                animate={inView ? blurFadeUp.animate : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group"
              >
                <div className="relative p-7 md:p-8 rounded-2xl border border-border/30 bg-card/40 hover:bg-card/70 hover:border-border/60 transition-all duration-500">
                  {/* Inner glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 80%, hsl(218 80% 45% / 0.03) 0%, transparent 60%)",
                    }}
                  />

                  {/* Quote mark */}
                  <span className="absolute top-5 right-6 text-5xl font-display text-primary/[0.06] select-none leading-none">
                    "
                  </span>

                  <p className="relative text-foreground/85 leading-relaxed text-[15px] mb-6">
                    "{feedback.text}"
                  </p>

                  <div className="relative flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-[10px] font-display font-bold text-primary uppercase">
                        {feedback.name.charAt(0)}
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
