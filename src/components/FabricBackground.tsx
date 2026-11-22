import React from 'react';

/**
 * FabricBackground
 * Creates a soft, breathing silk fabric undulating wave effect
 * with irregular blossom pink and pure white gradients.
 * Completely free of horizontal lines and sharp bands.
 */
export const FabricBackground: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Base Pure White Canvas */}
      <div className="irregular-mesh-canvas" />

      {/* 4. Tactile Micro-Weave Linen & Silk Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#34141D 0.75px, transparent 0.75px), radial-gradient(#FCE0E6 0.75px, transparent 0.75px)`,
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 8px 8px'
        }}
      />
    </div>
  );
};

