import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    { 
      title: "Miniatures", 
      path: "/miniatures", 
      icon: Zap,
      color: "neon-cyan",
      description: "Thumbnails YouTube" 
    },
    { 
      title: "Affiches", 
      path: "/affiches", 
      icon: Sparkles,
      color: "neon-magenta",
      description: "Creative posters" 
    },
    { 
      title: "Autres", 
      path: "/autres", 
      icon: Zap,
      color: "neon-purple",
      description: "Other creations" 
    },
    { 
      title: "Entrainement", 
      path: "/entrainement", 
      icon: Sparkles,
      color: "primary",
      description: "Training work" 
    }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 fade-up overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30 holographic transition-all duration-300"
        style={{
          transform: `translate(${mousePosition.x / 20}px, ${mousePosition.y / 20}px)`
        }}
      />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-neon-cyan/10 rounded-full blur-3xl animate-float-dramatic" />
        <div className="absolute top-40 right-32 w-48 h-48 bg-neon-magenta/10 rounded-full blur-3xl animate-float-dramatic" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float-dramatic" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Main Title with Neon Effect */}
        <div className="text-center mb-24 space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none animate-pulse-neon">
              <span className="gradient-neon">ALYMJR</span>
            </h1>
            <div className="flex items-center justify-center gap-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
              <p className="text-sm sm:text-base text-muted-foreground tracking-[0.3em] uppercase font-bold">
                Creative Designer
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-neon-magenta to-transparent" />
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Futuristic visual content for<br />
            <span className="text-primary font-bold">YouTubers & Content Creators</span>
          </p>
        </div>

        {/* Category Grid with Glass Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.path}
                to={category.path}
                className="group glass-card p-8 hover-3d"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Icon className={`w-8 h-8 text-${category.color} neon-glow-${category.color} group-hover:scale-125 transition-transform duration-500`} />
                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      {category.description}
                    </p>
                  </div>
                  <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/contact" className="neon-button inline-flex items-center gap-3">
            <span>Start Project</span>
            <Zap className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary neon-glow-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
