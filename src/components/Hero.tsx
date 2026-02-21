import { motion } from "framer-motion";

const blurFadeUp = {
  initial: { opacity: 0, y: 25, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
      {/* Gradient orb background - more vibrant */}
      <div className="absolute inset-0">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-[1000px] h-[1000px] md:w-[1400px] md:h-[1400px] rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(218 90% 45% / 0.45) 0%, hsl(218 85% 30% / 0.2) 35%, hsl(218 70% 20% / 0.08) 55%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Secondary glow for organic distortion feel */}
        <div
          className="absolute bottom-[-5%] left-[45%] -translate-x-1/2 w-[700px] h-[700px] rounded-[40%_60%_55%_45%] animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(225 95% 55% / 0.15) 0%, transparent 55%)",
            filter: "blur(50px)",
            animationDelay: "2s",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, hsl(220 20% 4%) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span className="font-display text-[12rem] md:text-[18rem] font-bold tracking-tighter text-foreground/[0.02] leading-none">
            D
          </span>
        </div>

        <motion.p
          {...blurFadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-primary mb-6"
        >
          Motion Designer
        </motion.p>

        <motion.h1
          {...blurFadeUp}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
        >
          Draxler
        </motion.h1>

        <motion.p
          {...blurFadeUp}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10"
        >
          Crio vídeos curtos que param o scroll, prendem a atenção e convertem.
          Cada frame é pensado para seu anúncio performar.
        </motion.p>

        <motion.div
          {...blurFadeUp}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/+5521979108337"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
          >
            Falar comigo
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/projetos"
            className="inline-flex items-center px-8 py-4 text-sm font-medium rounded-full border border-border/50 text-foreground hover:bg-secondary/50 transition-all duration-300"
          >
            Ver projetos
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
