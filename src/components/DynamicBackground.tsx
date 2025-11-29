import React, { useEffect, useState } from 'react';

const DynamicBackground = React.memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated orbs with mouse parallax */}
      <div 
        className="absolute w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-neon"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.5s ease-out, top 0.5s ease-out'
        }}
      />
      <div 
        className="absolute w-80 h-80 bg-neon-magenta/10 rounded-full blur-3xl animate-pulse-neon"
        style={{
          left: `${100 - mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
          animationDelay: '1s'
        }}
      />
      <div 
        className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-neon"
        style={{
          left: `${mousePosition.x}%`,
          top: `${100 - mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.5s ease-out, top 0.5s ease-out',
          animationDelay: '2s'
        }}
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
});

export default DynamicBackground;
