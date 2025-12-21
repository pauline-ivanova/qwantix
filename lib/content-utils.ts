/**
 * Calculate reading time in minutes based on word count
 * Average reading speed for web content: 275-300 words per minute
 * This is more realistic for online articles and blog posts
 * (Typical web reading speed is faster than traditional reading)
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 275): number {
  // Remove markdown syntax and HTML tags
  const text = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert markdown links to text
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/#+\s/g, '') // Remove markdown headers
    .replace(/\*\*?([^\*]+)\*\*?/g, '$1') // Remove bold/italic
    .trim();

  // Count words
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time (round up)
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Format reading time as human-readable string
 * More natural and pleasant formulations with "approximately" indicator
 */
export function formatReadingTime(minutes: number, lang: string = 'en'): string {
  const translations: Record<string, (minutes: number) => string> = {
    en: (min) => {
      const approx = '~';
      if (min === 1) return `${approx}1 minute read`;
      return `${approx}${min} minutes read`;
    },
    es: (min) => {
      const approx = '~';
      if (min === 1) return `${approx}1 minuto de lectura`;
      return `${approx}${min} minutos de lectura`;
    },
    de: (min) => {
      const approx = '~';
      if (min === 1) return `${approx}1 Minute Lesezeit`;
      return `${approx}${min} Minuten Lesezeit`;
    },
    ru: (min) => {
      const approx = '~';
      // Правильное склонение для русского языка
      const lastDigit = min % 10;
      const lastTwoDigits = min % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${approx}${min} минут чтения`;
      } else if (lastDigit === 1) {
        return `${approx}${min} минута чтения`;
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${approx}${min} минуты чтения`;
      } else {
        return `${approx}${min} минут чтения`;
      }
    },
  };

  const formatter = translations[lang] || translations.en;
  return formatter(minutes);
}
