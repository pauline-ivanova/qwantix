import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { detectFunnelStage, getUpperFunnelStage, type FunnelStage } from '@/lib/funnel-utils';
import { generateAnchor, extractMainTopic } from '@/lib/anchor-generator';

interface FunnelCTAProps {
  lang: string;
  category: string;
  currentSlug: string;
  currentTitle: string;
}

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

const FunnelCTA = ({ lang, category, currentSlug, currentTitle }: FunnelCTAProps) => {
  // Определяем уровень воронки текущей статьи
  const currentStage = detectFunnelStage(currentTitle);
  const upperStage = getUpperFunnelStage(currentStage);

  // Получаем все статьи той же категории
  const allPosts = getAllPosts(lang);
  const categoryPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase() && post.slug !== currentSlug
  );

  // Фильтруем статьи по уровню воронки
  const relatedPosts: Post[] = [];
  
  // Добавляем статьи того же уровня
  const sameStagePosts = categoryPosts
    .filter((post) => detectFunnelStage(post.title) === currentStage)
    .slice(0, 2); // Максимум 2 статьи того же уровня
  
  relatedPosts.push(...sameStagePosts);

  // Добавляем статьи верхнего уровня (относительно текущей статьи)
  if (upperStage) {
    const upperStagePosts = categoryPosts
      .filter((post) => detectFunnelStage(post.title) === upperStage)
      .slice(0, 3 - relatedPosts.length); // Дополняем до 3 статей
    
    relatedPosts.push(...upperStagePosts);
  }

  // Если нет связанных статей, не показываем CTA
  if (relatedPosts.length === 0) {
    return null;
  }

  // Генерируем органичный анонс
  const generateAnnouncement = (): string => {
    const translations = {
      en: {
        sameLevel: () => `You might also find these related topics valuable`,
        upperLevel: () => `To build a stronger base, review these core concepts`,
        mixed: () => `Explore these related articles to deepen your understanding`,
      },
      es: {
        sameLevel: () => `También podrías encontrar útiles estos temas relacionados`,
        upperLevel: () => `Para construir una base más sólida, revisa estos conceptos fundamentales`,
        mixed: () => `Explora estos artículos relacionados para profundizar tu comprensión`,
      },
      de: {
        sameLevel: () => `Diese verwandten Themen könnten Ihnen auch nützlich sein`,
        upperLevel: () => `Um eine stärkere Basis aufzubauen, überprüfen Sie diese Kernkonzepte`,
        mixed: () => `Erkunden Sie diese verwandten Artikel, um Ihr Verständnis zu vertiefen`,
      },
      ru: {
        sameLevel: () => `Также могут быть полезны эти связанные темы`,
        upperLevel: () => `Чтобы укрепить базу знаний, изучите эти основные концепции`,
        mixed: () => `Изучите эти связанные статьи для более глубокого понимания`,
      },
    };

    const t = translations[lang as keyof typeof translations] || translations.en;
    
    // Определяем тип анонса
    const hasSameLevel = relatedPosts.some(p => detectFunnelStage(p.title) === currentStage);
    const hasUpperLevel = relatedPosts.some(p => detectFunnelStage(p.title) === upperStage);
    
    if (hasSameLevel && hasUpperLevel) {
      return t.mixed();
    } else if (hasUpperLevel) {
      return t.upperLevel();
    } else {
      return t.sameLevel();
    }
  };

  const announcement = generateAnnouncement();

  // Генерируем уникальные анкоры, избегая повторений
  const usedAnchors = new Set<string>();
  const postsWithAnchors = relatedPosts.map((post, index) => {
    let anchor = generateAnchor(currentTitle, post.title, lang);
    let attempts = 0;
    
    // Если анкор уже использован, добавляем вариацию или используем более специфичную тему
    while (usedAnchors.has(anchor.toLowerCase()) && attempts < 3) {
      // Пробуем извлечь более специфичную тему из названия
      const moreSpecific = extractMoreSpecificTopic(post.title, lang);
      if (moreSpecific && moreSpecific !== anchor) {
        anchor = moreSpecific;
      } else {
        // Если не получилось, добавляем индекс для уникальности
        anchor = `${anchor} (${index + 1})`;
      }
      attempts++;
    }
    
    usedAnchors.add(anchor.toLowerCase());
    return { ...post, anchor };
  });

  // Определяем цвета категории (более мягкие для компактного дизайна)
  const categoryColors: { [key: string]: { link: string; bg: string; border: string } } = {
    'SEO': {
      link: 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300',
      bg: 'bg-indigo-50/50 dark:bg-indigo-900/10',
      border: 'border-indigo-500',
    },
    'PPC': {
      link: 'text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300',
      bg: 'bg-pink-50/50 dark:bg-pink-900/10',
      border: 'border-pink-500',
    },
    'Content': {
      link: 'text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300',
      bg: 'bg-pink-50/50 dark:bg-pink-900/10',
      border: 'border-pink-500',
    },
    'Content Creation': {
      link: 'text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300',
      bg: 'bg-pink-50/50 dark:bg-pink-900/10',
      border: 'border-pink-500',
    },
    'Social Media Marketing': {
      link: 'text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300',
      bg: 'bg-orange-50/50 dark:bg-orange-900/10',
      border: 'border-orange-500',
    },
    'SMM': {
      link: 'text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300',
      bg: 'bg-orange-50/50 dark:bg-orange-900/10',
      border: 'border-orange-500',
    },
  };

  const colors = categoryColors[category] || {
    link: 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300',
    bg: 'bg-gray-50/50 dark:bg-gray-900/10',
    border: 'border-gray-500',
  };

  return (
    <div className={`my-8 rounded-lg ${colors.bg} p-4 border-l-4 ${colors.border}`}>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-0">
        {announcement}:{' '}
        {postsWithAnchors.map((post, index) => {
          const anchor = post.anchor;
          const isLast = index === postsWithAnchors.length - 1;
          const isSecondToLast = index === postsWithAnchors.length - 2;
          
          let separator = '';
          if (!isLast) {
            if (isSecondToLast && relatedPosts.length > 1) {
              // Предпоследний элемент
              separator = lang === 'ru' ? ' и ' : lang === 'de' ? ' und ' : lang === 'es' ? ' y ' : ' and ';
            } else {
              // Обычный разделитель
              separator = ', ';
            }
          }
          
          return (
            <span key={post.slug}>
              <Link 
                href={`/${lang}/blog/${post.slug}`}
                className={`font-medium underline ${colors.link} transition-colors`}
              >
                {anchor}
              </Link>
              {separator}
            </span>
          );
        })}.
      </p>
    </div>
  );
};

/**
 * Извлекает более специфичную тему из названия статьи
 */
function extractMoreSpecificTopic(title: string, lang: string): string | null {
  const lower = title.toLowerCase();
  
  // Пытаемся найти более конкретные термины
  if (lower.includes('on-page')) return 'on-page SEO techniques';
  if (lower.includes('off-page')) return 'off-page SEO strategies';
  if (lower.includes('keyword research')) return 'keyword research methods';
  if (lower.includes('ppc automation')) return 'PPC automation tools';
  if (lower.includes('content strategy')) return 'content strategy planning';
  if (lower.includes('social media analytics')) return 'social media analytics tools';
  
  // Извлекаем ключевые слова после двоеточия
  const colonMatch = title.match(/:\s*(.+)/);
  if (colonMatch) {
    const afterColon = colonMatch[1].toLowerCase();
    const words = afterColon.split(/\s+/).filter(w => w.length > 3).slice(0, 3);
    if (words.length > 0) {
      return words.join(' ');
    }
  }
  
  return null;
}

/**
 * Извлекает тему из названия статьи (legacy, для обратной совместимости)
 */
function extractTopic(title: string): string {
  const lower = title.toLowerCase();
  
  // Ищем ключевые слова категорий
  if (lower.includes('seo')) return 'SEO';
  if (lower.includes('ppc')) return 'PPC';
  if (lower.includes('content marketing') || lower.includes('content creation')) return 'content marketing';
  if (lower.includes('social media')) return 'social media marketing';
  
  // Удаляем общие слова и извлекаем основную тему
  const stopWords = ['the', 'a', 'an', 'your', 'for', 'to', 'of', 'and', 'or', 'vs', 'versus'];
  const words = title.split(/\s+/).filter(w => !stopWords.includes(w.toLowerCase()));
  
  // Берем первые 2-3 значимых слова
  const topic = words.slice(0, 3).join(' ').toLowerCase();
  
  // Убираем двоеточие и все после него, если есть
  return topic.split(':')[0].trim();
}

export default FunnelCTA;
