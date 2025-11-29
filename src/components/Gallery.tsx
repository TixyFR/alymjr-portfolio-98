import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const isMobile = useIsMobile();

  // Responsive columns based on device
  const displayColumns = isMobile ? Math.min(columns, 2) : columns;

  // Memoize grid classes for better performance
  const gridCols = useMemo(() => {
    const cols = displayColumns;
    switch (cols) {
      case 6: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
      case 5: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 1: return 'grid-cols-1';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  }, [displayColumns]);

  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [id]);

  // Optimized lightbox functions
  const openLightbox = useCallback((image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (selectedIndex - 1 + images.length) % images.length
      : (selectedIndex + 1) % images.length;
    
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [selectedIndex, images]);

  // Keyboard navigation
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
  }, [selectedImage, navigateImage, closeLightbox]);

  // Optimized image loading
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  // Memoized image component for better performance
  const ImageComponent = useMemo(() => {
    return images.map((image, index) => (
      <div
        key={`${image}-${index}`} // Better key for potential duplicates
        className={`modern-card group cursor-pointer fade-up transition-all duration-300 hover:scale-[1.02] ${
          isVisible ? 'visible' : ''
        } ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 30}ms` }} // Reduced delay for smoother loading
        onClick={() => openLightbox(image, index)}
      >
        <div className="relative overflow-hidden rounded-lg">
          <OptimizedImage
            src={image}
            alt={`${title} ${index + 1}`}
            className={`w-full ${displayColumns === 6 ? 'h-auto' : 'aspect-video'} object-cover image-hover transition-transform duration-500 group-hover:scale-110`}
            onLoad={() => handleImageLoad(index)}
            onError={() => handleImageLoad(index)}
            lazy={false}
          />
          
          {/* Loading placeholder */}
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <ZoomIn className="w-8 h-8 text-primary drop-shadow-lg" />
          </div>
        </div>
      </div>
    ));
  }, [images, title, displayColumns, isVisible, loadedImages, openLightbox, handleImageLoad]);

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
            <div className="mt-4 text-sm text-muted-foreground">
              {images.length} image{images.length > 1 ? 's' : ''} disponible{images.length > 1 ? 's' : ''}
            </div>
          </div>

          <div className="relative p-6 liquid-glass">
            {images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Aucune image à afficher pour le moment.</p>
              </div>
            ) : (
              <div className={`grid ${gridCols} gap-6`}>
                {ImageComponent}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Optimized Apple-style Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-2xl"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-4 -right-4 z-10 p-3 liquid-glass hover:scale-110 transition-all duration-300"
              aria-label="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 liquid-glass hover:scale-110 transition-all duration-300"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 liquid-glass hover:scale-110 transition-all duration-300"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
            
            <div className="liquid-glass p-4">
              <img
                src={selectedImage}
                alt="Vue agrandie"
                className="max-w-full max-h-full object-contain rounded-xl"
                loading="eager"
              />
            </div>
            
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 liquid-glass px-4 py-2 text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;