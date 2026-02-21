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
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Draxler. Todos os direitos reservados.
          </p>
          <a
            href="https://wa.me/5521979108337?text=Ol%C3%A1%20Draxler%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20falar%20sobre%20um%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/60 hover:text-primary transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
