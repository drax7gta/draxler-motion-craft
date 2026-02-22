import { motion } from "framer-motion";
import characterImg from "@/assets/character-draxler.png";

const blurFadeUp = {
  initial: { opacity: 0, y: 25, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const draxlerLetters = "Draxler".split("");

const letterVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)", rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: 0.35 + i * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
      {/* Gradient orb background - more vibrant & saturated */}
      <div className="absolute inset-0">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-[1000px] h-[1000px] md:w-[1400px] md:h-[1400px] rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(218 95% 50% / 0.55) 0%, hsl(218 90% 35% / 0.25) 30%, hsl(218 75% 22% / 0.1) 50%, transparent 65%)",
            filter: "blur(55px)",
          }}
        />
        {/* Secondary glow for organic distortion */}
        <div
          className="absolute bottom-[-5%] left-[45%] -translate-x-1/2 w-[700px] h-[700px] rounded-[40%_60%_55%_45%] animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(225 95% 55% / 0.2) 0%, transparent 50%)",
            filter: "blur(45px)",
            animationDelay: "2s",
          }}
        />
        {/* Stronger vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, hsl(220 20% 4%) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 py-20 md:py-0">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left max-w-xl">
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 md:left-[25%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
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
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6 relative inline-block"
          >
            <span className="flex overflow-hidden" style={{ perspective: "600px" }}>
              {draxlerLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            {/* Blue underline forming */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-primary origin-left rounded-full"
            />
          </motion.h1>

          <motion.p
            {...blurFadeUp}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Crio vídeos curtos que param o scroll, prendem a atenção e convertem.
            Cada frame é pensado para seu anúncio performar.
          </motion.p>

          <motion.div
            {...blurFadeUp}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
          >
            <a
              href="https://wa.me/+5521979108337"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/40 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
            >
              Falar comigo
            </a>
            <a
              href="/projetos"
              className="inline-flex items-center px-8 py-4 text-sm font-medium rounded-full border border-border/50 text-foreground hover:bg-secondary/50 transition-all duration-300"
            >
              Ver projetos
            </a>
          </motion.div>
        </div>

        {/* Right: Character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 80, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative flex-shrink-0 w-[70%] sm:w-[50%] md:w-[36%] lg:w-[30%] mt-4 md:mt-0 self-end md:self-center"
        >
          {/* Atmospheric blur behind character */}
          <div
            className="absolute inset-0 scale-110 rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, hsl(218 90% 50% / 0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0 0 18px hsl(218 90% 55% / 0.15))",
            }}
          >
            <img
              src={characterImg}
              alt="Draxler Character"
              className="relative w-full h-auto object-contain"
              style={{
                filter: "drop-shadow(-8px 12px 20px hsl(220 20% 2% / 0.7))",
              }}
            />
          </motion.div>
          {/* Floor shadow */}
          <motion.div
            animate={{ scale: [1, 0.92, 1], opacity: [0.6, 0.4, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-2 left-1/2 -translate-x-[55%] w-[70%] h-5"
            style={{
              background: "radial-gradient(ellipse, hsl(220 20% 2% / 0.6) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
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
