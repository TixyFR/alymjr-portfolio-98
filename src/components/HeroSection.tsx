import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && heroRef.current) {
          heroRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { title: "Miniatures", path: "/miniatures", number: "01" },
    { title: "Affiches", path: "/affiches", number: "02" },
    { title: "Autres", path: "/autres", number: "03" },
    { title: "Entrainement", path: "/entrainement", number: "04" }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 fade-up"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Main Title */}
        <div className="text-center mb-24 space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none">
              AlymJr
            </h1>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-16 bg-border" />
              <p className="text-sm text-muted-foreground tracking-[0.2em] uppercase">
                Designer Graphique
              </p>
              <div className="h-px w-16 bg-border" />
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-light leading-relaxed">
            Création de visuels percutants pour<br />
            youtubeurs et créateurs de contenu
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Link
              key={category.path}
              to={category.path}
              className="group relative zen-card p-8 hover:shadow-elevated transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="text-5xl font-light text-muted-foreground/30 group-hover:text-primary/30 transition-colors">
                  {category.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-normal tracking-tight">
                    {category.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Découvrir</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
              
              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* Contact Link */}
        <div className="text-center mt-16">
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground link-underline transition-colors"
          >
            Me contacter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
