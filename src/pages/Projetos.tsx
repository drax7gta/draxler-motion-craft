import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";

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

const blurFadeUp = {
  initial: { opacity: 0, y: 25, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Projetos = () => {
  const [active, setActive] = useState<Category>("Todos");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 md:pt-36 pb-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <motion.div
            initial={blurFadeUp.initial}
            animate={inView ? blurFadeUp.animate : {}}
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

          {/* Filters - horizontal scroll on mobile */}
          <motion.div
            initial={blurFadeUp.initial}
            animate={inView ? blurFadeUp.animate : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-2.5 md:gap-3 mb-10 md:mb-12 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-none"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid - single column on small mobile */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className={project.isShort ? "" : "sm:col-span-2"}
                  whileTap={{ scale: 0.98 }}
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
  );
};

export default Projetos;
