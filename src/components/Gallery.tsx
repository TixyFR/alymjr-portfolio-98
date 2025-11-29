import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const displayColumns = isMobile ? Math.min(columns, 2) : columns;

  const gridCols = useMemo(() => {
    const cols = displayColumns;
    switch (cols) {
      case 6: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
      case 5: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 1: return 'grid-cols-1';
      default: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
    }
  }, [displayColumns]);

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

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  const ImageComponent = useMemo(() => {
    return images.map((image, index) => (
      <div
        key={`${image}-${index}`}
        className={`zen-card group cursor-pointer overflow-hidden fade-up ${
          isVisible ? 'visible' : ''
        } ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 50}ms` }}
        onClick={() => openLightbox(image, index)}
      >
        <div className="relative overflow-hidden rounded-md aspect-video">
          <OptimizedImage
            src={image}
            alt={`${title} ${index + 1}`}
            className="w-full h-full object-cover image-hover"
            onLoad={() => handleImageLoad(index)}
            onError={() => handleImageLoad(index)}
            lazy={false}
          />
          
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-md flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    ));
  }, [images, title, isVisible, loadedImages, openLightbox, handleImageLoad]);

  return (
    <>
      <section 
        id={id} 
        className={`py-24 px-6 transition-all duration-700 ${
          isVisible ? 'fade-up visible' : 'fade-up'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              {title}
            </h2>
            <div className="h-px w-16 bg-border mx-auto" />
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
              {description}
            </p>
            <div className="text-xs text-muted-foreground/70 font-light tracking-wider">
              {images.length} {images.length > 1 ? 'images' : 'image'}
            </div>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-light">Aucune image disponible</p>
            </div>
          ) : (
            <div className={`grid ${gridCols} gap-4`}>
              {ImageComponent}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-14 right-0 z-10 p-2 glass hover:bg-card transition-colors rounded-md"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 glass hover:bg-card transition-colors rounded-md"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 glass hover:bg-card transition-colors rounded-md"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            
            <div className="zen-card p-4">
              <img
                src={selectedImage}
                alt="Vue agrandie"
                className="max-w-full max-h-[85vh] object-contain rounded-md"
                loading="eager"
              />
            </div>
            
            {images.length > 1 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 glass px-3 py-1.5 text-xs rounded-md">
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
