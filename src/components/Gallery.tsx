import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
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
        className={`glass-card group cursor-pointer overflow-hidden fade-up ${
          isVisible ? 'visible' : ''
        } ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 50}ms` }}
        onClick={() => openLightbox(image, index)}
      >
        <div className="relative overflow-hidden rounded-xl aspect-video">
          <OptimizedImage
            src={image}
            alt={`${title} ${index + 1}`}
            className="w-full h-full object-cover image-hover"
            onLoad={() => handleImageLoad(index)}
            onError={() => handleImageLoad(index)}
            lazy={false}
          />
          
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 bg-muted/30 backdrop-blur-sm animate-pulse rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <Maximize2 className="w-10 h-10 text-white neon-glow-primary transform scale-0 group-hover:scale-100 transition-transform duration-500" />
          </div>
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
          <div className="text-center mb-20 space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
              <span className="gradient-neon">{title}</span>
            </h2>
            <div className="flex items-center justify-center gap-6">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
              <p className="text-sm text-muted-foreground tracking-[0.2em] uppercase font-bold">
                {images.length} Works
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-neon-magenta to-transparent" />
            </div>
            <p className="text-base md:text-lg text-foreground/70 max-w-xl mx-auto font-medium">
              {description}
            </p>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-medium">No images available</p>
            </div>
          ) : (
            <div className={`grid ${gridCols} gap-6`}>
              {ImageComponent}
            </div>
          )}
        </div>
      </section>

      {/* Futuristic Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-16 right-0 z-10 p-3 glass-card hover:bg-primary/20 transition-all rounded-2xl neon-button"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 glass-card hover:bg-primary/20 transition-all rounded-2xl"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 glass-card hover:bg-primary/20 transition-all rounded-2xl"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            
            <div className="glass-card p-4">
              <img
                src={selectedImage}
                alt="Full view"
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
                loading="eager"
              />
            </div>
            
            {images.length > 1 && (
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-2xl">
                <span className="text-sm font-bold text-primary">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
