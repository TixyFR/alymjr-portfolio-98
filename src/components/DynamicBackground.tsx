import React from 'react';

const DynamicBackground = React.memo(() => {

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Simple zen gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/10" />
      
      {/* Subtle accent areas */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
    </div>
  );
});

export default DynamicBackground;