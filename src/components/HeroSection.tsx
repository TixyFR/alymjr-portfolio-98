import { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toutes les images du site pour le carousel
  const allImages = [
    // Miniatures
    "https://i.imgur.com/xuzJAal.jpeg",
    "https://i.imgur.com/87YPfsX.jpeg",
    "https://i.imgur.com/0GC8OVi.jpeg", 
    "https://i.imgur.com/wdC2AZp.png",
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
    "https://i.imgur.com/D5da0wH.jpeg"
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
    // Mélanger et re-mélanger les images périodiquement
    const updateImages = () => {
      setVisibleImages(shuffleArray(allImages));
    };

    updateImages();
    const interval = setInterval(updateImages, 8000); // Re-mélange toutes les 8 secondes

    return () => clearInterval(interval);
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
    { label: "Autres Créations", path: "/autres", icon: "✨" }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="flex flex-col justify-center h-full gap-4 py-8">
          {Array.from({ length: 6 }).map((_, lineIndex) => {
            const shuffledForLine = shuffleArray(visibleImages);
            return (
              <div key={lineIndex} className="flex whitespace-nowrap overflow-hidden">
                <div 
                   className={`flex gap-4 ${
                     lineIndex % 2 === 0 ? 'carousel-left' : 'carousel-right'
                   }`}
                   style={{ 
                     animationDuration: `${Math.floor(Math.random() * 20) + 20}s` 
                   }}
                 >
                   {[...shuffledForLine, ...shuffledForLine, ...shuffledForLine].map((src, imgIndex) => (
                   <img
                     key={`${lineIndex}-${imgIndex}`}
                     src={src}
                     alt="Portfolio preview"
                     className="w-60 aspect-video object-cover rounded-xl opacity-20 hover:opacity-60 transition-all duration-500 hover:scale-105 hover:shadow-glow"
                     />
                   ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/99 via-background/95 to-background/99" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        
        {/* Effet particules liquides */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="fade-up visible">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Miniatures, affiches{' '}
            <span className="gradient-text relative">
              percutantes
              <div className="absolute inset-0 gradient-text blur-sm opacity-50 animate-pulse"></div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Bienvenue sur mon portfolio. Moi, <span className="text-primary font-semibold">AlymJr</span> réalise des visuels pour tes youtubeurs/streameurs préférés.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" ref={dropdownRef}>
            <div className="relative">
              <Button 
                onClick={() => setShowDropdown(!showDropdown)}
                size="lg"
                className="bg-gradient-primary hover:scale-105 hover:shadow-glow shadow-primary text-lg px-8 py-3 h-auto group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10">Voir mes créations</span>
                <ChevronDown className={`ml-2 w-5 h-5 transition-all duration-300 ${showDropdown ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
              </Button>
              
              {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 liquid-glass shadow-glow border border-primary/20 overflow-hidden z-50 animate-fade-in">
                      {menuItems.map((item, index) => (
                        <button
                          key={item.path}
                          onClick={() => handleMenuClick(item.path)}
                          className="w-full text-left px-6 py-4 hover:bg-white/10 transition-all duration-300 flex items-center space-x-3 group liquid-hover"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                          <span className="font-medium group-hover:text-primary transition-colors duration-200">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
