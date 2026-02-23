import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

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
    wide: true,
  },
];

const Feedbacks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 md:pt-36 pb-24" ref={ref}>
          <div className="max-w-5xl mx-auto px-5 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedbacks.map((feedback, i) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.985 }}
                  className={`group ${feedback.wide ? "md:col-span-2" : ""}`}
                >
                  <div className="relative p-5 md:p-7 rounded-[18px] border border-border/20 bg-card/30 hover:bg-card/55 hover:border-border/40 transition-all duration-500 h-full flex flex-col justify-between overflow-hidden">
                    {/* Blue left accent */}
                    <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-primary/40 rounded-full" />

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 30% 50%, hsl(218 80% 45% / 0.05) 0%, transparent 60%)",
                      }}
                    />

                    <p className="relative text-foreground/90 leading-relaxed text-[14px] md:text-[15px] pl-4 mb-5 flex-1">
                      {feedback.text}
                    </p>

                    <div className="relative pl-4 mt-auto">
                      <motion.span
                        initial={{ backgroundSize: "0% 40%" }}
                        animate={inView ? { backgroundSize: "100% 40%" } : {}}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="text-sm font-medium text-primary/80"
                        style={{
                          backgroundImage: "linear-gradient(to right, hsl(218 90% 50% / 0.12), hsl(218 90% 50% / 0.12))",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "0 80%",
                          padding: "0 2px",
                        }}
                      >
                        {feedback.name}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Feedbacks;
