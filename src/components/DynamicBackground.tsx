import React from 'react';

const DynamicBackground = React.memo(() => {

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient de base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Formes géométriques flottantes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-primary-glow/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      
      {/* Particules CSS animées - Performance optimisée */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + (i * 2)}s`,
            }}
          />
        ))}
      </div>

      {/* Lignes de connexion subtiles */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
});

export default DynamicBackground;