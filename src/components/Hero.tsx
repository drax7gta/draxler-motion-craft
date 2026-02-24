import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import characterImg from "@/assets/character-draxler.png";

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
      delay: 0.8 + i * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const blurFadeUp = {
  initial: { opacity: 0, y: 25, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [characterHovered, setCharacterHovered] = useState(false);

  // Mouse position for energy reactivity
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring for 3D tilt
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 150, damping: 25 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 150, damping: 25 });

  // Aura intensity reacting to mouse proximity
  const auraIntensity = useSpring(0.5, { stiffness: 100, damping: 20 });

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const characterParallax = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Scan line reveal trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);

      // Calculate proximity to character (center-right area)
      if (characterRef.current) {
        const charRect = characterRef.current.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2;
        const charCenterY = charRect.top + charRect.height / 2;
        const dist = Math.sqrt(
          Math.pow(e.clientX - charCenterX, 2) + Math.pow(e.clientY - charCenterY, 2)
        );
        const maxDist = 500;
        const proximity = Math.max(0, 1 - dist / maxDist);
        auraIntensity.set(0.4 + proximity * 0.6);
      }
    },
    [mouseX, mouseY, auraIntensity]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    auraIntensity.set(0.4);
  }, [mouseX, mouseY, auraIntensity]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden noise"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layer 1: Background gradients with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgParallax }}>
        {/* Initial dark state → scan reveal */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute inset-0 bg-background z-10 pointer-events-none"
        />

        {/* Horizontal scan line */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={isRevealed ? { x: "200%" } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 w-[30%] z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(218 90% 55% / 0.15) 40%, hsl(218 90% 55% / 0.3) 50%, hsl(218 90% 55% / 0.15) 60%, transparent 100%)",
            filter: "blur(30px)",
          }}
        />

        {/* Primary radial gradient orb */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-[900px] h-[900px] md:w-[1400px] md:h-[1400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(218 100% 55% / 0.6) 0%, hsl(218 95% 40% / 0.3) 25%, hsl(218 80% 25% / 0.12) 45%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />

        {/* Secondary organic glow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            x: [0, 15, 0],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-5%] left-[45%] -translate-x-1/2 w-[700px] h-[700px] rounded-[40%_60%_55%_45%]"
          style={{
            background:
              "radial-gradient(circle, hsl(225 100% 58% / 0.22) 0%, transparent 50%)",
            filter: "blur(45px)",
          }}
        />

        {/* Vignettes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 25%, hsl(220 20% 3% / 0.6) 55%, hsl(220 20% 2%) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(220 20% 2% / 0.3) 0%, transparent 20%, transparent 75%, hsl(220 20% 2% / 0.5) 100%)",
          }}
        />
      </motion.div>

      {/* Layer 2: Energy field (reactive) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: auraIntensity }}
      >
        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{
              top: `${45 + Math.sin(i * 1.2) * 15}%`,
              left: `${55 + Math.cos(i * 1.2) * 18}%`,
              width: "1px",
              height: "1px",
              transformOrigin: `${-30 - i * 15}px ${-20 - i * 10}px`,
            }}
          >
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full"
              style={{ background: "hsl(218 90% 65%)", boxShadow: "0 0 6px hsl(218 90% 55% / 0.5)" }}
            />
          </motion.div>
        ))}

        {/* HUD-style digital lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1000 800">
          <motion.line
            x1="600" y1="350" x2="750" y2="300"
            stroke="hsl(218 90% 55%)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.5 }}
          />
          <motion.line
            x1="620" y1="400" x2="780" y2="420"
            stroke="hsl(218 90% 55%)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.8 }}
          />
          <motion.circle
            cx="750" cy="300" r="3"
            fill="none"
            stroke="hsl(218 90% 55%)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: [0, 0.6, 0.3] } : {}}
            transition={{ duration: 2, delay: 2 }}
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 py-16 md:py-0">
        {/* Left: Text with parallax offset */}
        <motion.div className="flex-1 text-center md:text-left max-w-xl" style={{ y: textParallax }}>
          {/* Watermark */}
          <div className="absolute top-1/2 left-1/2 md:left-[25%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
            <span className="font-display text-[10rem] md:text-[18rem] font-bold tracking-tighter text-foreground/[0.02] leading-none">
              D
            </span>
          </div>

          <motion.p
            {...blurFadeUp}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-xs md:text-base font-medium tracking-[0.25em] md:tracking-[0.3em] uppercase text-primary mb-4 md:mb-6"
          >
            Motion Designer
          </motion.p>

          <motion.h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-5 md:mb-6 relative inline-block">
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
            {/* Title glitch on character hover */}
            <motion.span
              animate={characterHovered ? { x: [0, -1, 1, 0], opacity: [1, 0.85, 1] } : {}}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 pointer-events-none"
              style={{ mixBlendMode: "screen" }}
            />
            {/* Blue underline with connection to character */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-primary origin-left rounded-full"
            />
          </motion.h1>

          <motion.p
            {...blurFadeUp}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-base md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 md:mb-10"
          >
            Crio vídeos curtos que param o scroll, prendem a atenção e convertem.
            Cada frame é pensado para seu anúncio performar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3"
          >
            <motion.a
              href="https://wa.me/+5521979108337"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/40 hover:shadow-xl hover:shadow-primary/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Falar comigo
            </motion.a>
            <motion.a
              href="/projetos"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-medium rounded-full border border-primary/20 text-foreground/80 hover:bg-secondary/40 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver projetos
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Character with cinematic reveal + 3D tilt + energy */}
        <motion.div
          ref={characterRef}
          style={{
            y: characterParallax,
            rotateX: tiltX,
            rotateY: tiltY,
            perspective: 800,
          }}
          className="relative flex-shrink-0 w-[55%] sm:w-[45%] md:w-[36%] lg:w-[30%] mt-2 md:mt-0 self-end md:self-center overflow-hidden md:overflow-visible"
          onMouseEnter={() => setCharacterHovered(true)}
          onMouseLeave={() => setCharacterHovered(false)}
        >
          {/* Reactive energy aura */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: characterHovered ? 0.35 : 0.18,
            }}
            transition={{ scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.4 } }}
            className="absolute inset-0 scale-[1.4] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 55%, hsl(218 100% 50% / 0.25) 0%, hsl(218 80% 35% / 0.08) 40%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />

          {/* Back-projected shadow */}
          <div
            className="absolute inset-0 scale-110 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 70%, hsl(220 20% 2% / 0.5) 0%, transparent 60%)",
              filter: "blur(20px)",
            }}
          />

          {/* Character reveal sequence */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(25px)" }}
            animate={isRevealed ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Neon outline effect during reveal */}
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.0, delay: 1.2 }}
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "transparent",
                filter: "drop-shadow(0 0 8px hsl(218 90% 55% / 0.6)) drop-shadow(0 0 16px hsl(218 90% 55% / 0.3))",
                mixBlendMode: "screen",
              }}
            />

            {/* Floating animation */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Character hover zoom */}
              <motion.div
                animate={characterHovered ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

                {/* Glasses reflection - subtle light sweep */}
                <motion.div
                  animate={{ x: ["-120%", "250%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  className="absolute pointer-events-none"
                  style={{
                    top: "18%",
                    left: "25%",
                    width: "50%",
                    height: "8%",
                    background: "linear-gradient(90deg, transparent 0%, hsl(218 90% 80% / 0.12) 45%, hsl(218 90% 90% / 0.2) 50%, hsl(218 90% 80% / 0.12) 55%, transparent 100%)",
                    transform: "rotate(-8deg)",
                    filter: "blur(2px)",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Fade at bottom for mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent md:hidden pointer-events-none" />

          {/* Floor shadow */}
          <motion.div
            animate={{ scale: [1, 0.9, 1], opacity: [0.7, 0.45, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 left-1/2 -translate-x-[55%] w-[75%] h-6 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, hsl(220 20% 2% / 0.8) 0%, hsl(220 20% 2% / 0.3) 40%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </motion.div>
      </div>

      {/* Digital connection line: character → title */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5] hidden md:block" preserveAspectRatio="none">
        <motion.line
          x1="58%" y1="48%" x2="42%" y2="52%"
          stroke="hsl(218 90% 55%)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isRevealed ? { pathLength: 1, opacity: 0.08 } : {}}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ scaleY: [1, 0.6, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
