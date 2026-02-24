import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@/assets/logo-draxler.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Projetos", path: "/projetos" },
  { label: "Feedbacks", path: "/feedbacks" },
  { label: "Sobre", path: "/sobre" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2">
          <img
            src={logoSrc}
            alt="Draxler"
            className="h-28 md:h-32 w-auto"
            style={{
              filter: "brightness(1.2) contrast(1.15) drop-shadow(0 0 8px hsl(218 90% 55% / 0.12))",
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop - only on Home */}
        {location.pathname === "/" && (
          <a
            href="https://wa.me/+5521979108337"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            Falar comigo
          </a>
        )}

        {/* Spacer when no CTA */}
        {location.pathname !== "/" && <div className="hidden md:block w-[120px]" />}

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-5 h-px bg-foreground"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-5 h-px bg-foreground"
          />
        </button>
      </div>

      {/* Mobile Menu - slide from right, 80% width */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-0 bg-background/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[80%] bg-background/95 backdrop-blur-xl border-l border-border/30 z-50"
            >
              <nav className="flex flex-col px-8 pt-24 gap-6">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      className={`text-xl font-display font-medium tracking-wide ${
                        location.pathname === item.path
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {location.pathname === "/" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    <a
                      href="https://wa.me/+5521979108337"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-full bg-primary text-primary-foreground mt-4"
                    >
                      Falar comigo
                    </a>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
