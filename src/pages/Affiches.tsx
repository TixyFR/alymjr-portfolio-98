import { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';

const Affiches = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const affiches = [
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
    "https://i.imgur.com/JUvzinj.jpeg"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (selectedIndex - 1 + affiches.length) % affiches.length
      : (selectedIndex + 1) % affiches.length;
    
    setSelectedIndex(newIndex);
    setSelectedImage(affiches[newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
        if (e.key === 'Escape') closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, selectedIndex]);

  return (
    <>
      <Layout>
        <div className="pt-20">
          <section className={`py-20 px-4 transition-all duration-700 ${
            isVisible ? 'fade-up visible' : 'fade-up'
          }`}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block relative group mb-4">
                  <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
                  <h1 className="relative text-4xl md:text-5xl font-bold gradient-text bg-card/50 px-8 py-4 rounded-lg border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                    Mes Affiches Créatives
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Une collection d'affiches créatives dans leur format original, 
                  optimisées pour différents événements et campagnes.
                </p>
              </div>

              {/* Grille spéciale pour affiches - plus petites pour tout voir */}
              <div className="relative p-6 rounded-2xl">
                {/* Contour dynamique animé */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-sm animate-pulse"></div>
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-2xl border border-primary/10"></div>
                
                <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
                  {affiches.map((image, index) => (
                    <div
                      key={index}
                      className={`group relative overflow-hidden rounded-lg bg-gradient-card shadow-card transition-all duration-300 hover:shadow-glow cursor-pointer glow-effect fade-up ${
                        isVisible ? 'visible' : ''
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => openLightbox(image, index)}
                    >
                    <img
                      src={image}
                      alt={`Affiche ${index + 1}`}
                      className="w-full h-auto object-cover image-hover"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>

      {/* Lightbox avec navigation */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <div className="relative max-w-[90vw] max-h-[90vh] p-4">
            {/* Bouton fermer */}
            <button
              onClick={closeLightbox}
              className="absolute -top-2 -right-2 z-10 p-2 bg-card rounded-full hover:bg-muted transition-colors shadow-glow"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation précédente */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-card/80 rounded-full hover:bg-card transition-colors shadow-glow"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            {/* Navigation suivante */}
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-card/80 rounded-full hover:bg-card transition-colors shadow-glow"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <img
              src={selectedImage}
              alt="Vue agrandie"
              className="max-w-full max-h-full object-contain rounded-xl shadow-glow"
            />
            
            {/* Indicateur de position */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 px-4 py-2 rounded-full text-sm">
              {selectedIndex + 1} / {affiches.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Affiches;