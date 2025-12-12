'use client';

import React from 'react';

// Minimal Pixel Blast style background inspired by ReactBits Pixel Blast
// Reference: https://reactbits.dev/backgrounds/pixel-blast
export default function PixelBlastBackground() {
  // Fewer, subtler elements
  const items = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-28">
        {items.map((_, i) => {
          const size = 5 + ((i * 5) % 6); // 5-10px
          const left = (i * 37) % 100; // percentage
          const top = (i * 23) % 100; // percentage
          const delay = (i * 0.35) % 6; // seconds
          const duration = 10 + (i % 5); // seconds
          const hue = (230 + i * 4) % 360;
          return (
            <span
              key={i}
              className="absolute block rounded-sm will-change-transform"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `linear-gradient(135deg, hsl(${hue} 70% 62% / 0.55), hsl(${(hue + 16) % 360} 70% 52% / 0.55))`,
                filter: 'saturate(0.9)',
                animation: `pixel-float ${duration}s ease-in-out ${delay}s infinite alternate`,
                boxShadow: '0 0 4px rgba(99,102,241,0.16)',
                opacity: 0.75,
              }}
            />
          );
        })}
      </div>
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/20" />
    </div>
  );
}


