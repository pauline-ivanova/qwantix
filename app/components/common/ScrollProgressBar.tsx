'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Avoid division by zero on pages that don't scroll
    if (docHeight > 0) {
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercentage(scrolled);
    } else {
      setScrollPercentage(0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Set initial scroll percentage in case the page loads scrolled down
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{
        height: '6px',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        className="h-full bg-indigo-500"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
