import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Roteiro estratégico",
    description:
      "Cada segundo conta num anúncio. Penso na estrutura, no gancho e no ritmo antes de qualquer efeito.",
  },
  {
    title: "Narração profissional",
    description:
      "Voz fluida e natural que conecta com o público. Nada robotizado, nada forçado.",
  },
  {
    title: "Motion que prende",
    description:
      "Animações com timing preciso para manter a retenção do início ao fim. Cada movimento tem propósito.",
  },
  {
    title: "Sound design",
    description:
      "Efeitos sonoros encaixados no ritmo certo. O áudio certo transforma um bom vídeo em algo memorável.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-3">
            Processo
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            O que está incluso
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group relative p-8 rounded-2xl border border-border/40 bg-card/50 hover:bg-card hover:border-border/80 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute top-8 right-8 text-6xl font-display font-bold text-foreground/[0.03] select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
