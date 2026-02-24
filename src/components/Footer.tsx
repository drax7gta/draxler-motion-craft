import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoSrc from "@/assets/logo-draxler.png";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Projetos", path: "/projetos" },
  { label: "Feedbacks", path: "/feedbacks" },
  { label: "Sobre", path: "/sobre" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/draxler.nt/", external: true },
  { label: "Email", href: "mailto:gustavo.editor07@gmail.com", external: false },
  { label: "WhatsApp", href: "https://wa.me/+5521979108337", external: true },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
    >
      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 left-1/4 right-1/4 h-px blur-sm bg-primary/30" />

      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(220 22% 6%) 0%, hsl(222 25% 5%) 50%, hsl(220 20% 4%) 100%)",
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise pointer-events-none opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="inline-block">
              <img
                src={logoSrc}
                alt="Draxler"
                className="h-16 md:h-20 w-auto"
                style={{
                  filter:
                    "brightness(1.15) contrast(1.1) drop-shadow(0 0 12px hsl(218 90% 55% / 0.15))",
                }}
              />
            </Link>
            <p className="text-sm text-muted-foreground/70 max-w-xs leading-relaxed">
              Motion Design de alto impacto para marcas que querem se destacar.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex gap-8 text-sm">
            {footerLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative text-muted-foreground hover:text-primary transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-full h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Separator */}
        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-xs text-muted-foreground/40">
              <p>© {new Date().getFullYear()} Draxler. Todos os direitos reservados.</p>
              <span className="hidden sm:inline text-border/30">|</span>
              <p>CNPJ 64.889.086/0001-38</p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-6 text-xs">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="relative text-muted-foreground/50 hover:text-primary transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px origin-left scale-x-0 bg-primary/60 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
