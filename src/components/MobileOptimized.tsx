import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const MobileOptimizedImage = ({ 
  src, 
  alt, 
  className,
  ...props 
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        style={{
          ...(isMobile && {
            maxWidth: '100%',
            height: 'auto'
          })
        }}
        {...props}
      />
      
      {error && (
        <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Image non disponible</span>
        </div>
      )}
    </div>
  );
};

export const MobileOptimizedContainer = ({ children, fallback }: MobileOptimizedProps) => {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="animate-pulse bg-muted h-32 rounded-lg" />;
  }

  if (isMobile && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};