'use client';

import { useState, useEffect } from 'react';

interface InteractiveCheckboxProps {
  id?: string;
  defaultChecked?: boolean;
  className?: string;
}

export default function InteractiveCheckbox({ 
  id, 
  defaultChecked = false,
  className = ''
}: InteractiveCheckboxProps) {
  // Start with defaultChecked, will be updated from localStorage after mount
  const [checked, setChecked] = useState(defaultChecked);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
    if (id && typeof window !== 'undefined') {
      const saved = localStorage.getItem(id);
      if (saved !== null) {
        setChecked(saved === 'true');
      }
    }
  }, [id]);

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    if (id && typeof window !== 'undefined') {
      localStorage.setItem(id, newChecked.toString());
    }
  };

  // Use checked state after mount, defaultChecked before mount (for SSR)
  const displayChecked = isMounted ? checked : defaultChecked;

  return (
    <input
      type="checkbox"
      id={id}
      checked={displayChecked}
      onChange={handleChange}
      className={className}
    />
  );
}
