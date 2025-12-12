/**
 * Category color mapping for Qwantix services
 */

export interface CategoryColors {
  bg: string;
  text: string;
  textAccent: string;
  border: string;
  borderAccent: string;
  borderAccentColor: string;
  hoverBg: string;
  hoverText: string;
  fromGradient: string;
  viaGradient: string;
  toGradient: string;
  bgAccent: string;
}

const categoryColorMap: Record<string, CategoryColors> = {
  SEO: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-900 dark:text-indigo-100',
    textAccent: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    borderAccent: 'border-indigo-600 dark:border-indigo-400',
    borderAccentColor: '#4f46e5',
    hoverBg: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/50',
    hoverText: 'hover:text-indigo-900 dark:hover:text-indigo-100',
    fromGradient: 'from-indigo-50 dark:from-indigo-900/20',
    viaGradient: 'via-indigo-100 dark:via-indigo-900/30',
    toGradient: 'to-indigo-50 dark:to-indigo-900/20',
    bgAccent: 'bg-indigo-200/50 dark:bg-indigo-800/30',
  },
  PPC: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-900 dark:text-pink-100',
    textAccent: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-200 dark:border-pink-800',
    borderAccent: 'border-pink-600 dark:border-pink-400',
    borderAccentColor: '#db2777',
    hoverBg: 'hover:bg-pink-50 dark:hover:bg-pink-900/50',
    hoverText: 'hover:text-pink-900 dark:hover:text-pink-100',
    fromGradient: 'from-pink-50 dark:from-pink-900/20',
    viaGradient: 'via-pink-100 dark:via-pink-900/30',
    toGradient: 'to-pink-50 dark:to-pink-900/20',
    bgAccent: 'bg-pink-200/50 dark:bg-pink-800/30',
  },
  'Social Media Marketing': {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-900 dark:text-orange-100',
    textAccent: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    borderAccent: 'border-orange-600 dark:border-orange-400',
    borderAccentColor: '#ea580c',
    hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/50',
    hoverText: 'hover:text-orange-900 dark:hover:text-orange-100',
    fromGradient: 'from-orange-50 dark:from-orange-900/20',
    viaGradient: 'via-orange-100 dark:via-orange-900/30',
    toGradient: 'to-orange-50 dark:to-orange-900/20',
    bgAccent: 'bg-orange-200/50 dark:bg-orange-800/30',
  },
  SMM: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-900 dark:text-orange-100',
    textAccent: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    borderAccent: 'border-orange-600 dark:border-orange-400',
    borderAccentColor: '#ea580c',
    hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/50',
    hoverText: 'hover:text-orange-900 dark:hover:text-orange-100',
    fromGradient: 'from-orange-50 dark:from-orange-900/20',
    viaGradient: 'via-orange-100 dark:via-orange-900/30',
    toGradient: 'to-orange-50 dark:to-orange-900/20',
    bgAccent: 'bg-orange-200/50 dark:bg-orange-800/30',
  },
  'Content Creation': {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-900 dark:text-cyan-100',
    textAccent: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-800',
    borderAccent: 'border-cyan-600 dark:border-cyan-400',
    borderAccentColor: '#0891b2',
    hoverBg: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/50',
    hoverText: 'hover:text-cyan-900 dark:hover:text-cyan-100',
    fromGradient: 'from-cyan-50 dark:from-cyan-900/20',
    viaGradient: 'via-cyan-100 dark:via-cyan-900/30',
    toGradient: 'to-cyan-50 dark:to-cyan-900/20',
    bgAccent: 'bg-cyan-200/50 dark:bg-cyan-800/30',
  },
  Content: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-900 dark:text-cyan-100',
    textAccent: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-800',
    borderAccent: 'border-cyan-600 dark:border-cyan-400',
    borderAccentColor: '#0891b2',
    hoverBg: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/50',
    hoverText: 'hover:text-cyan-900 dark:hover:text-cyan-100',
    fromGradient: 'from-cyan-50 dark:from-cyan-900/20',
    viaGradient: 'via-cyan-100 dark:via-cyan-900/30',
    toGradient: 'to-cyan-50 dark:to-cyan-900/20',
    bgAccent: 'bg-cyan-200/50 dark:bg-cyan-800/30',
  },
  // Default colors
  default: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-900 dark:text-gray-100',
    textAccent: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-700',
    borderAccent: 'border-gray-600 dark:border-gray-400',
    borderAccentColor: '#4b5563',
    hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-900',
    hoverText: 'hover:text-gray-900 dark:hover:text-gray-100',
    fromGradient: 'from-gray-50 dark:from-gray-900',
    viaGradient: 'via-gray-100 dark:via-gray-800',
    toGradient: 'to-gray-50 dark:to-gray-900',
    bgAccent: 'bg-gray-200/50 dark:bg-gray-700/30',
  },
};

/**
 * Get category colors for a given category
 */
export function getCategoryColors(category: string): CategoryColors {
  return categoryColorMap[category] || categoryColorMap.default;
}
