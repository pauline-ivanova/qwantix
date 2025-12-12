'use client';

import React from 'react';

export default function AuroraSingle() {
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

  const animate = !reduceMotion && inView

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute top-[12%] -left-[12%] w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem] rounded-full mix-blend-multiply filter blur-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(139, 92, 246, 0.55) 0%, rgba(99, 102, 241, 0.45) 45%, transparent 100%)',
          animation: animate ? 'aurora-diagonal 26s infinite ease-in-out' : 'none',
        }}
      />
    </div>
  );
}


