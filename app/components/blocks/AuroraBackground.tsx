'use client';

import React from 'react';
import { getCategoryColors } from '@/lib/category-colors';

type AuroraVariant = 'hero' | 'compact';

interface AuroraBackgroundProps {
  variant?: AuroraVariant;
  blendMode?: 'multiply' | 'screen' | 'normal' | 'overlay';
  category?: string;
}

const AuroraBackground = ({ variant = 'hero', blendMode, category = 'default' }: AuroraBackgroundProps) => {
  const colors = getCategoryColors(category);
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = React.useState(true)
  const [reduceMotion, setReduceMotion] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  React.useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return
    const el = containerRef.current
    const io = new IntersectionObserver((entries) => {
      const e = entries[0]
      setInView(e.isIntersecting)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const isCompact = variant === 'compact';
  const mixClass = blendMode
    ? (
        blendMode === 'screen'
          ? 'mix-blend-screen'
          : blendMode === 'multiply'
          ? 'mix-blend-multiply'
          : blendMode === 'overlay'
          ? 'mix-blend-overlay'
          : ''
      )
    : 'mix-blend-overlay'; // Default to overlay for better blending with background gradients

  const animate = !reduceMotion && inView

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const accentColor = colors.borderAccentColor;
  const blob1Color = hexToRgba(accentColor, 0.5);
  const blob2Color = hexToRgba(accentColor, 0.3);

  return (
    <>
      <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Aurora effect layers (two blobs: top-left and bottom-right) */}
        <div className={`absolute ${isCompact ? 'inset-0' : '-inset-20'} ${isCompact ? 'opacity-70' : 'opacity-80'}`}>
          {/* Top-left */}
          <div
            className={`absolute ${isCompact ? 'top-[10%] -left-[6%] w-[22rem] h-[22rem] md:w-[26rem] md:h-[26rem]' : '-top-[15%] -left-[10%] w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem]'} rounded-full ${mixClass} filter ${isCompact ? 'blur-xl' : 'blur-3xl'}`}
            style={{
              background: `linear-gradient(135deg, ${blob1Color} 0%, ${blob2Color} 50%, transparent 100%)`,
              animation: animate ? `${isCompact ? 'aurora-blob 20s infinite ease-in-out' : 'aurora-blob 18s infinite ease-in-out'}` : 'none',
            }}
          />

          {/* Bottom-right */}
          <div
            className={`absolute ${isCompact ? 'bottom-[-6%] -right-[6%] w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem]' : '-bottom-[14%] -right-[10%] w-[26rem] h-[26rem] md:w-[34rem] md:h-[34rem]'} rounded-full ${mixClass} filter ${isCompact ? 'blur-xl' : 'blur-3xl'}`}
            style={{
              background: `linear-gradient(135deg, ${blob2Color} 0%, ${blob1Color} 50%, transparent 100%)`,
              animation: animate ? `${isCompact ? 'aurora-blob-strong 14s infinite ease-in-out' : 'aurora-blob-strong 12s infinite ease-in-out'}` : 'none',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AuroraBackground;
