import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

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

const TiltCard = ({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.12 * index, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        whileTap={{ scale: 0.98 }}
        className="group relative p-6 md:p-10 bg-card/30 rounded-[18px] border border-border/20 hover:bg-card/60 transition-all duration-500 cursor-default"
      >
        {/* Animated inner glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-[18px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(218 80% 45% / 0.06) 0%, transparent 70%)",
          }}
        />

        {/* Hover shadow */}
        <motion.div
          animate={{
            boxShadow: hovered
              ? "0 20px 40px hsl(218 90% 40% / 0.12), 0 0 0 1px hsl(218 80% 50% / 0.08)"
              : "0 0 0 hsl(218 90% 40% / 0), 0 0 0 1px hsl(218 80% 50% / 0)",
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-[18px] pointer-events-none"
        />

        <div className="relative z-10">
          {/* Number with glitch-style entry */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.2 + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block text-xs font-mono font-medium text-primary/50 tracking-widest mb-4 md:mb-5"
            style={{ textShadow: "0 0 20px hsl(218 90% 50% / 0.15)" }}
          >
            {service.icon}
          </motion.span>

          <h3 className="font-display text-base md:text-lg font-semibold mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {service.description}
          </p>
        </div>

        {/* Energy line bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-6 right-6 md:left-8 md:right-8 h-px bg-primary/30 origin-left"
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative pt-6 md:pt-16 pb-16 md:pb-24" ref={ref}>
      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-20 max-w-lg"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
