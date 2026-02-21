import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Roteiro estratégico",
    description:
      "Cada segundo conta num anúncio. Penso na estrutura, no gancho e no ritmo antes de qualquer efeito.",
    icon: "01",
  },
  {
    title: "Narração profissional",
    description:
      "Voz fluida e natural que conecta com o público. Nada robotizado, nada forçado.",
    icon: "02",
  },
  {
    title: "Motion que prende",
    description:
      "Animações com timing preciso para manter a retenção do início ao fim. Cada movimento tem propósito.",
    icon: "03",
  },
  {
    title: "Sound design",
    description:
      "Efeitos sonoros encaixados no ritmo certo. O áudio certo transforma um bom vídeo em algo memorável.",
    icon: "04",
  },
];

const blurFadeUp = {
  initial: { opacity: 0, y: 25, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 md:py-36" ref={ref}>
      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={blurFadeUp.initial}
          animate={inView ? blurFadeUp.animate : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-lg"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-3">
            Processo
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
            O que está incluso
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cada projeto é pensado do roteiro ao áudio final. Nada genérico, tudo com propósito.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20 rounded-2xl overflow-hidden border border-border/30">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={blurFadeUp.initial}
              animate={inView ? blurFadeUp.animate : {}}
              transition={{ duration: 0.6, delay: 0.12 * i }}
              className="group relative p-8 md:p-10 bg-background hover:bg-card/80 transition-all duration-500"
            >
              {/* Inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, hsl(218 80% 45% / 0.04) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <span className="inline-block text-xs font-mono font-medium text-primary/60 tracking-widest mb-5">
                  {service.icon}
                </span>
                <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
