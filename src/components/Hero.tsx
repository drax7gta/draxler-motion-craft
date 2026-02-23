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
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden noise">
      {/* Gradient orb - more saturated, deeper, dramatic */}
      <div className="absolute inset-0">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-[900px] h-[900px] md:w-[1400px] md:h-[1400px] rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(218 100% 55% / 0.6) 0%, hsl(218 95% 40% / 0.3) 25%, hsl(218 80% 25% / 0.12) 45%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
        {/* Secondary organic glow */}
        <div
          className="absolute bottom-[-5%] left-[45%] -translate-x-1/2 w-[700px] h-[700px] rounded-[40%_60%_55%_45%] animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(225 100% 58% / 0.22) 0%, transparent 50%)",
            filter: "blur(45px)",
            animationDelay: "2s",
          }}
        />
        {/* Stronger vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 25%, hsl(220 20% 3% / 0.6) 55%, hsl(220 20% 2%) 100%)",
          }}
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(220 20% 2% / 0.3) 0%, transparent 20%, transparent 75%, hsl(220 20% 2% / 0.5) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 py-16 md:py-0">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left max-w-xl">
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 md:left-[25%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
            <span className="font-display text-[10rem] md:text-[18rem] font-bold tracking-tighter text-foreground/[0.02] leading-none">
              D
            </span>
          </div>

          <motion.p
            {...blurFadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs md:text-base font-medium tracking-[0.25em] md:tracking-[0.3em] uppercase text-primary mb-4 md:mb-6"
          >
            Motion Designer
          </motion.p>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-5 md:mb-6 relative inline-block"
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
            {/* Blue underline */}
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
            className="text-base md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 md:mb-10"
          >
            Crio vídeos curtos que param o scroll, prendem a atenção e convertem.
            Cada frame é pensado para seu anúncio performar.
          </motion.p>

          <motion.div
            {...blurFadeUp}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3"
          >
            <a
              href="https://wa.me/+5521979108337"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/40 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
            >
              Falar comigo
            </a>
            <a
              href="/projetos"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full border border-primary/20 text-foreground/80 hover:bg-secondary/40 transition-all duration-300"
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
          className="relative flex-shrink-0 w-[55%] sm:w-[45%] md:w-[36%] lg:w-[30%] mt-2 md:mt-0 self-end md:self-center overflow-hidden md:overflow-visible"
        >
          {/* Vignette behind character for deep integration */}
          <div
            className="absolute inset-0 scale-125 rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 55%, hsl(218 100% 45% / 0.15) 0%, hsl(218 80% 30% / 0.06) 40%, transparent 65%)",
              filter: "blur(35px)",
            }}
          />
          {/* Back-projected shadow */}
          <div
            className="absolute inset-0 scale-110"
            style={{
              background: "radial-gradient(ellipse at 50% 70%, hsl(220 20% 2% / 0.5) 0%, transparent 60%)",
              filter: "blur(20px)",
            }}
          />
          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0 0 22px hsl(218 90% 50% / 0.18))",
            }}
          >
            <img
              src={characterImg}
              alt="Draxler Character"
              className="relative w-full h-auto object-contain"
              style={{
                filter: "drop-shadow(-10px 15px 25px hsl(220 20% 2% / 0.8)) drop-shadow(5px 20px 40px hsl(220 20% 2% / 0.5))",
              }}
            />
          </motion.div>
          {/* Fade at bottom for mobile editorial crop effect */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent md:hidden" />
          {/* Floor shadow - deeper */}
          <motion.div
            animate={{ scale: [1, 0.9, 1], opacity: [0.7, 0.45, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 left-1/2 -translate-x-[55%] w-[75%] h-6"
            style={{
              background: "radial-gradient(ellipse, hsl(220 20% 2% / 0.8) 0%, hsl(220 20% 2% / 0.3) 40%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
