'use client';

import React from 'react';

type AuroraVariant = 'hero' | 'compact';

interface AuroraBackgroundProps {
  variant?: AuroraVariant;
  blendMode?: 'multiply' | 'screen' | 'normal' | 'overlay';
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ variant = 'hero', blendMode }) => {
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
    : 'mix-blend-multiply';

  const animate = !reduceMotion && inView

  return (
    <>
      <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Aurora effect layers (two blobs: top-left and bottom-right) */}
        <div className={`absolute ${isCompact ? 'inset-0' : '-inset-20'} ${isCompact ? 'opacity-70' : blendMode === 'screen' ? 'opacity-80' : blendMode === 'normal' ? 'opacity-100' : 'opacity-40'}`}>
          {/* Top-left */}
          <div
            className={`absolute ${isCompact ? 'top-[10%] -left-[6%] w-[22rem] h-[22rem] md:w-[26rem] md:h-[26rem]' : '-top-[15%] -left-[10%] w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem]'} rounded-full ${mixClass} filter ${isCompact ? 'blur-xl' : blendMode === 'normal' ? 'blur-md' : 'blur-2xl'}`}
            style={{
              background: isCompact
                ? 'linear-gradient(135deg, rgba(124, 95, 255, 0.85) 0%, rgba(99, 91, 255, 0.65) 45%, transparent 100%)'
                : blendMode === 'screen'
                  ? 'linear-gradient(135deg, rgba(219, 234, 254, 1) 0%, rgba(147, 197, 253, 0.9) 50%, transparent 100%)'
                  : blendMode === 'normal'
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 1) 0%, rgba(79, 70, 229, 0.8) 50%, transparent 100%)'
                    : 'linear-gradient(135deg, rgba(99, 91, 255, 0.65) 0%, rgba(79, 70, 229, 0.45) 50%, transparent 100%)',
              animation: animate ? `${isCompact ? 'aurora-blob 20s infinite ease-in-out' : 'aurora-blob 18s infinite ease-in-out'}` : 'none',
            }}
          />

          {/* Bottom-right */}
          <div
            className={`absolute ${isCompact ? 'bottom-[-6%] -right-[6%] w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem]' : '-bottom-[14%] -right-[10%] w-[26rem] h-[26rem] md:w-[34rem] md:h-[34rem]'} rounded-full ${mixClass} filter ${isCompact ? 'blur-xl' : blendMode === 'normal' ? 'blur-md' : 'blur-2xl'}`}
            style={{
              background: isCompact
                ? 'linear-gradient(135deg, rgba(140, 130, 255, 0.8) 0%, rgba(99, 102, 241, 0.6) 50%, transparent 100%)'
                : blendMode === 'screen'
                  ? 'linear-gradient(135deg, rgba(191, 219, 254, 1) 0%, rgba(147, 197, 253, 0.9) 50%, transparent 100%)'
                  : blendMode === 'normal'
                    ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(99, 102, 241, 0.8) 50%, transparent 100%)'
                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.65) 0%, rgba(79, 70, 229, 0.45) 50%, transparent 100%)',
              animation: animate ? `${isCompact ? 'aurora-blob-strong 14s infinite ease-in-out' : 'aurora-blob-strong 12s infinite ease-in-out'}` : 'none',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AuroraBackground;
