'use client';

import React from 'react';

type Props = React.ComponentProps<'a'> & {
  children: React.ReactNode;
};

export default function StarBorderButton({ children, className = '', ...rest }: Props) {
  return (
    <a
      {...rest}
      className={`relative inline-flex items-center justify-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-white ${className}`}
    >
      {/* Base button background */}
      <span className="absolute inset-0 rounded-md bg-indigo-600 transition-colors duration-300 group-hover:bg-indigo-500" />
      {/* Starry animated border */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/20"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[2px] rounded-[10px] [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[2px] before:absolute before:inset-0 before:rounded-[8px] before:[background:radial-gradient(2px_2px_at_20%_30%,#fff,transparent_40%),radial-gradient(1.5px_1.5px_at_60%_70%,#fff,transparent_40%),radial-gradient(1.2px_1.2px_at_80%_20%,#fff,transparent_40%)] before:opacity-60 before:animate-star-slide"
        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,.35), rgba(99,102,241,.6), rgba(255,255,255,.35)) padding-box' }}
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}



