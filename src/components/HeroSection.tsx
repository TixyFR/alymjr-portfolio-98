import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toutes les images du site pour le carousel
  const allImages = [
    // Miniatures
    "https://i.imgur.com/aZXDQiC.jpeg",
    "https://i.imgur.com/87YPfsX.jpeg",
    "https://i.imgur.com/0GC8OVi.jpeg", 
    "https://i.imgur.com/wdC2AZp.png",
    "https://i.imgur.com/xuzJAal.jpeg",
    "https://i.imgur.com/SUU9T3i.png",
    "https://i.imgur.com/SlPHPIU.png",
    "https://i.imgur.com/VEEOan5.png",
    "https://i.imgur.com/tY3LzGE.jpeg",
    "https://i.imgur.com/BRjjMBD.jpeg",
    "https://i.imgur.com/VvsTs5m.jpeg",
    "https://i.imgur.com/GAq9uPd.jpeg",
    "https://i.imgur.com/RyW1zt9.jpeg",
    "https://i.imgur.com/inenxOt.png",
    "https://i.imgur.com/krcDOBd.png",
    "https://i.imgur.com/EZQduv4.jpeg",
    "https://i.imgur.com/1hks5NY.jpeg",
    "https://i.imgur.com/bCAAAWM.png",
    "https://i.imgur.com/wwiwKAh.png",
    "https://i.imgur.com/D5da0wH.jpeg",
    // Affiches
    "https://i.imgur.com/JC8B9Qn.jpeg",
    "https://i.imgur.com/1Y9lMAK.jpeg", 
    "https://i.imgur.com/P34l3Kj.jpeg",
    "https://i.imgur.com/VxBiPui.jpeg",
    "https://i.imgur.com/0QT6eUc.png",
    "https://i.imgur.com/mUSQobw.png",
    "https://i.imgur.com/i2Hsfe5.png",
    "https://i.imgur.com/l3ngypK.png",
    "https://i.imgur.com/r6Hzujt.png",
    "https://i.imgur.com/fucbF6f.jpeg",
    "https://i.imgur.com/38s3zPS.png",
    "https://i.imgur.com/hjOHkcP.png",
    "https://i.imgur.com/HyT4YeO.png",
    "https://i.imgur.com/JUvzinj.jpeg",
    // Autres
    "https://i.imgur.com/qnd1D2P.png",
    "https://i.imgur.com/MS4deQ7.jpeg"
  ];

  const shuffleArray = (array: string[]) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  useEffect(() => {
    // Mélanger les images une seule fois au chargement pour éviter les re-renders
    setVisibleImages(shuffleArray(allImages));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Miniatures YouTube", path: "/miniatures", icon: "🎬" },
    { label: "Affiches Créatives", path: "/affiches", icon: "🎨" },
    { label: "Autres Créations", path: "/autres", icon: "✨" },
    { label: "Me Contacter", path: "/contact", icon: "📧" }
  ];

  const handleMenuClick = () => {
    setShowDropdown(false);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-muted/20" />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto py-20">
        <div className="fade-up visible space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight">
            <span className="block mb-4">Miniatures,</span>
            <span className="block mb-4">affiches</span>
            <span className="block gradient-text font-semibold">percutantes</span>
          </h1>
          
          <div className="h-px w-24 bg-border mx-auto my-12" />
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Bienvenue sur mon portfolio. <span className="text-foreground font-medium">AlymJr</span> réalise des visuels pour tes youtubeurs et streameurs préférés.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center" ref={dropdownRef}>
            <div className="relative">
              <Button 
                onClick={() => setShowDropdown(!showDropdown)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-md group"
              >
                <span>Voir mes créations</span>
                <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              </Button>
              
              {/* Dropdown Menu - Clean version */}
              {showDropdown && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64 glass rounded-lg overflow-hidden z-50 animate-fade-in">
                  {menuItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={handleMenuClick}
                      className="block px-6 py-3 hover:bg-muted/50 transition-colors duration-200 border-b border-border last:border-0"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="animate-float">
          <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
