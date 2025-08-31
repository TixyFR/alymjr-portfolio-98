import { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  columns?: number;
}

const Gallery = ({ id, title, description, images, columns = 4 }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
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
      ? (selectedIndex - 1 + images.length) % images.length
      : (selectedIndex + 1) % images.length;
    
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
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

  const getGridCols = () => {
    switch (columns) {
      case 6: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
      case 5: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
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
            <div className="liquid-glass inline-block px-8 py-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                {title}
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="relative p-6 liquid-glass">
            <div className={`grid ${getGridCols()} gap-6`}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`modern-card group cursor-pointer fade-up ${
                    isVisible ? 'visible' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image}
                    alt={`${title} ${index + 1}`}
                    className={`w-full ${columns === 6 ? 'h-auto' : 'aspect-video'} object-cover image-hover rounded-lg`}
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <ZoomIn className="w-8 h-8 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apple-style Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-2xl">
          <div className="relative max-w-[90vw] max-h-[90vh] p-4">
            <button
              onClick={closeLightbox}
              className="absolute -top-4 -right-4 z-10 p-3 liquid-glass hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 liquid-glass hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 liquid-glass hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="liquid-glass p-4">
              <img
                src={selectedImage}
                alt="Vue agrandie"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 liquid-glass px-4 py-2 text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;