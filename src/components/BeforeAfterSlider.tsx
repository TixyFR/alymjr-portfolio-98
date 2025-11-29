import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface BeforeAfterItem {
  id: string;
  before_image_url: string;
  after_image_url: string;
  title: string;
}

interface BeforeAfterSliderProps {
  items: BeforeAfterItem[];
}

const BeforeAfterSlider = ({ items }: BeforeAfterSliderProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="text-muted-foreground font-light">Aucun exercice disponible</p>
      </div>
    );
  }

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <div className="space-y-12">
      {/* Title Section */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
          Entrainement
        </h2>
        <div className="h-px w-16 bg-border mx-auto" />
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
          Cliquez sur une image pour voir l'évolution
        </p>
      </div>

      {/* Grid of thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="zen-card group cursor-pointer overflow-hidden fade-up visible"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="relative overflow-hidden rounded-md aspect-video">
              <OptimizedImage
                src={item.after_image_url}
                alt={`Après - ${item.title}`}
                className="w-full h-full object-cover image-hover"
              />
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs tracking-wider uppercase text-foreground font-light">
                  Voir l'évolution
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full screen comparison modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
          <button
            className="absolute top-6 right-6 z-20 p-2 glass hover:bg-card transition-colors rounded-md"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-6xl">
            <BeforeAfterComparison
              beforeImage={items[selectedIndex].before_image_url}
              afterImage={items[selectedIndex].after_image_url}
              title={items[selectedIndex].title}
            />

            {items.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 glass hover:bg-card transition-colors rounded-md"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 glass hover:bg-card transition-colors rounded-md"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

const BeforeAfterComparison = ({ beforeImage, afterImage, title }: BeforeAfterComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div
        className="relative select-none overflow-hidden rounded-md aspect-video bg-muted touch-none zen-card"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={afterImage}
            alt="Après"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-md glass text-xs tracking-wider uppercase">
            Après
          </div>
        </div>

        {/* Before Image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <OptimizedImage
            src={beforeImage}
            alt="Avant"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-md glass text-xs tracking-wider uppercase">
            Avant
          </div>
        </div>

        {/* Slider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full shadow-lg flex items-center justify-center">
            <ChevronLeft className="w-3 h-3 text-primary-foreground absolute left-2" />
            <ChevronRight className="w-3 h-3 text-primary-foreground absolute right-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
