import { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  liquidStyle?: boolean;
}

const Gallery = ({ id, title, description, images, liquidStyle = false }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [id]);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section 
        id={id} 
        className={`py-20 px-4 transition-all duration-700 ${
          isVisible ? 'fade-up visible' : 'fade-up'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {liquidStyle ? (
              <div className="inline-block relative group mb-4">
                <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
                <h2 className="relative text-4xl md:text-5xl font-bold gradient-text liquid-glass px-8 py-4 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                  {title}
                </h2>
              </div>
            ) : (
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                {title}
              </h2>
            )}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {liquidStyle ? (
            <div className="relative p-8">
              {/* Contour liquide animé */}
              <div className="absolute inset-0 liquid-border">
                <div className="absolute inset-2 rounded-3xl border-2 border-primary/20 animate-pulse"></div>
              </div>
              
              <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                {images.map((image, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className={`group relative liquid-card cursor-pointer fade-up ${
                        isVisible ? 'visible' : ''
                      } ${isEven ? 'organic-shape-1' : 'organic-shape-2'}`}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        aspectRatio: '16/9'
                      }}
                      onClick={() => openLightbox(image)}
                    >
                      <img
                        src={image}
                        alt={`${title} ${index + 1}`}
                        className={`w-full h-full object-cover image-hover ${isEven ? 'organic-shape-1' : 'organic-shape-2'}`}
                        loading="lazy"
                      />
                      
                      {/* Overlay liquide */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center ${isEven ? 'organic-shape-1' : 'organic-shape-2'}`}>
                        <ZoomIn className="w-8 h-8 text-primary drop-shadow-lg" />
                      </div>
                      
                      {/* Effet de brillance */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${isEven ? 'organic-shape-1' : 'organic-shape-2'}`}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl bg-gradient-card shadow-card transition-all duration-300 hover:shadow-glow cursor-pointer glow-effect fade-up ${
                    isVisible ? 'visible' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={image}
                    alt={`${title} ${index + 1}`}
                    className="w-full aspect-video object-cover image-hover"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox liquide */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-2xl">
          <div className="relative max-w-[90vw] max-h-[90vh] p-4">
            <button
              onClick={closeLightbox}
              className="absolute -top-4 -right-4 z-10 p-3 liquid-glass hover:scale-110 transition-all duration-300 shadow-glow"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="liquid-glass p-2">
              <img
                src={selectedImage}
                alt="Vue agrandie"
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;