import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Draxler<span className="text-primary">.</span>
            </span>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Motion Design de alto impacto para marcas que querem se destacar.
            </p>
          </div>

          <nav className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/projetos" className="hover:text-foreground transition-colors">Projetos</Link>
            <Link to="/feedbacks" className="hover:text-foreground transition-colors">Feedbacks</Link>
            <Link to="/sobre" className="hover:text-foreground transition-colors">Sobre</Link>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs text-muted-foreground/60">
            <p>© {new Date().getFullYear()} Draxler. Todos os direitos reservados.</p>
            <span className="hidden sm:inline">·</span>
            <p>CNPJ 64.889.086/0001-38</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
            <a
              href="https://www.instagram.com/draxler.nt/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:gustavo.editor07@gmail.com"
              className="hover:text-primary transition-colors"
            >
              Email
            </a>
            <a
              href="https://wa.me/+5521979108337"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
