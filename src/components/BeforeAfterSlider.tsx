import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="text-center py-20">
        <p className="text-muted-foreground">Aucun exercice d'entrainement disponible</p>
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
    <div className="space-y-8">
      {/* Grid of "After" thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video bg-muted hover:scale-105 transition-transform"
            onClick={() => setSelectedIndex(index)}
          >
            <OptimizedImage
              src={item.after_image_url}
              alt={`Après - ${item.title}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-semibold">Voir avant/après</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full screen modal for before/after comparison */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-20"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="relative w-full max-w-6xl">
            <BeforeAfterComparison
              beforeImage={items[selectedIndex].before_image_url}
              afterImage={items[selectedIndex].after_image_url}
              title={items[selectedIndex].title}
            />

            {items.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
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
    <div className="max-w-4xl mx-auto">
      <div
        className="relative select-none overflow-hidden rounded-lg aspect-video bg-muted touch-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After Image (Full) */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={afterImage}
            alt="Après"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Après
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <OptimizedImage
            src={beforeImage}
            alt="Avant"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Avant
          </div>
        </div>

        {/* Slider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <ChevronLeft className="w-3 h-3 absolute left-1" />
            <ChevronRight className="w-3 h-3 absolute right-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;