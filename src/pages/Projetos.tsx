import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import PageTransition from "@/components/PageTransition";

type Category = "Todos" | "Motion" | "Criativos Dinâmicos" | "Color Correction";

const projects = [
  { id: "xXLsVEQ4hF0", title: "Motion 01", category: "Motion" as const, isShort: true },
  { id: "PQjxOhCd5XE", title: "Motion 02", category: "Motion" as const, isShort: true },
  { id: "V0gFtQLfDtI", title: "Motion 03", category: "Motion" as const, isShort: true },
  { id: "SmZU3TFwfo4", title: "Motion 04", category: "Motion" as const, isShort: true },
  { id: "2FgwytjGN4A", title: "Motion 05", category: "Motion" as const, isShort: true },
  { id: "BguBenUEO6I", title: "Motion 06", category: "Motion" as const, isShort: true },
  { id: "GyKlRIqp_2U", title: "Motion 07", category: "Motion" as const, isShort: true },
  { id: "lRqI-AzQUJg", title: "Motion 08", category: "Motion" as const, isShort: true },
  { id: "uVitu7JJb6c", title: "Criativo Dinâmico 01", category: "Criativos Dinâmicos" as const, isShort: true },
  { id: "Cf87H0pZaeU", title: "Color Correction", category: "Color Correction" as const, isShort: false },
];

const categories: Category[] = ["Todos", "Motion", "Criativos Dinâmicos", "Color Correction"];

const Projetos = () => {
  const [active, setActive] = useState<Category>("Todos");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 md:pt-36 pb-24" ref={ref}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7 }}
              className="mb-10 md:mb-12"
            >
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-3">
                Portfólio
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                Projetos
              </h1>
            </motion.div>

            {/* Filters - smooth horizontal scroll on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex gap-2.5 md:gap-3 mb-10 md:mb-12 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActive(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 snap-start ${
                    active === cat
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>

            {/* Grid - single column on mobile for premium feel */}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className={project.isShort ? "" : "col-span-2"}
                    whileTap={{ scale: 0.97 }}
                  >
                    <VideoPlayer
                      videoId={project.id}
                      title={project.title}
                      isShort={project.isShort}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Projetos;
