import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ServicesSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
