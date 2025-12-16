/**
 * Генерирует релевантные анкоры для ссылок на статьи
 * на основе текущей статьи и связанной статьи
 * Анкоры должны быть естественными и показывать конкретную тему/ценность
 */
export function generateAnchor(
  currentTitle: string,
  relatedTitle: string,
  lang: string = 'en'
): string {
  // Извлекаем конкретную тему/концепцию из связанной статьи
  const anchorText = extractRelevantAnchor(relatedTitle, lang);
  return anchorText;
}

/**
 * Извлекает релевантный анкор из названия статьи
 * Создает естественный, специфичный анкор без шаблонных формулировок
 */
function extractRelevantAnchor(title: string, lang: string): string {
  const lower = title.toLowerCase();
  
  // Специфичные паттерны для извлечения релевантных тем
  const patterns = [
    // "On-Page SEO Essentials: A Checklist for Success" -> "on-page SEO essentials"
    { pattern: /on-page\s+seo\s+essentials/i, extract: () => 'on-page SEO essentials' },
    { pattern: /on-page\s+seo/i, extract: () => 'on-page SEO' },
    { pattern: /off-page\s+seo/i, extract: () => 'off-page SEO' },
    { pattern: /on-page\s+vs\s+off-page/i, extract: () => 'on-page vs off-page SEO' },
    
    // "PPC Automation: Pros, Cons, and Best Practices" -> "PPC automation"
    { pattern: /ppc\s+automation/i, extract: () => 'PPC automation' },
    { pattern: /advanced\s+ppc\s+strategies/i, extract: () => 'advanced PPC strategies' },
    { pattern: /ppc\s+basics|understanding\s+ppc|ppc\s+beginners/i, extract: () => 'PPC basics' },
    { pattern: /ppc\s+landscape/i, extract: () => 'PPC platforms' },
    { pattern: /ppc\s+campaign\s+analysis/i, extract: () => 'PPC campaign analysis' },
    { pattern: /ppc\s+vs\s+organic/i, extract: () => 'PPC vs organic search' },
    { pattern: /demystifying\s+ppc/i, extract: () => 'PPC fundamentals' },
    
    // "SEO Basics: What Every Business Should Know" -> "SEO basics"
    { pattern: /seo\s+basics/i, extract: () => 'SEO basics' },
    { pattern: /seo\s+myths/i, extract: () => 'SEO myths' },
    { pattern: /seo\s+tools/i, extract: () => 'SEO tools' },
    { pattern: /seo\s+and\s+content/i, extract: () => 'SEO and content' },
    { pattern: /measuring\s+seo\s+success/i, extract: () => 'measuring SEO success' },
    { pattern: /keyword\s+research/i, extract: () => 'keyword research' },
    { pattern: /evolution\s+of\s+search\s+algorithms/i, extract: () => 'search algorithm evolution' },
    
    // "Content Marketing: The Power of Storytelling" -> "content marketing storytelling"
    { pattern: /content\s+marketing.*storytelling/i, extract: () => 'content marketing storytelling' },
    { pattern: /content\s+strategy\s+that\s+converts/i, extract: () => 'content strategy that converts' },
    { pattern: /content\s+strategy/i, extract: () => 'content strategy' },
    { pattern: /content\s+types/i, extract: () => 'content types' },
    { pattern: /content\s+distribution/i, extract: () => 'content distribution' },
    { pattern: /measuring\s+content\s+marketing\s+roi/i, extract: () => 'content marketing ROI' },
    
    // "Social Media Marketing: Building Brand Presence" -> "social media brand building"
    { pattern: /social\s+media\s+marketing.*building/i, extract: () => 'social media brand building' },
    { pattern: /social\s+media\s+roi/i, extract: () => 'social media ROI' },
    { pattern: /social\s+media\s+analytics/i, extract: () => 'social media analytics' },
    { pattern: /choosing.*social\s+platforms/i, extract: () => 'choosing social platforms' },
    { pattern: /organic\s+vs\s+paid.*social/i, extract: () => 'organic vs paid social media' },
  ];

  // Пробуем найти специфичный паттерн
  for (const { pattern, extract } of patterns) {
    if (pattern.test(title)) {
      return extract();
    }
  }

  // Если специфичных паттернов нет, извлекаем ключевую тему более умно
  return extractSmartTopic(title, lang);
}

/**
 * Умное извлечение темы из названия, когда нет специфичных паттернов
 */
function extractSmartTopic(title: string, lang: string): string {
  const lower = title.toLowerCase();
  
  // Удаляем общие слова и извлекаем ключевую концепцию
  const stopWords = [
    'the', 'a', 'an', 'your', 'for', 'to', 'of', 'and', 'or', 'vs', 'versus',
    'pros', 'cons', 'best', 'practices', 'guide', 'strategies', 'strategy',
    'what', 'every', 'should', 'know', 'essentials', 'checklist', 'success',
    'powerful', 'combination', 'difference', 'evolution', 'landscape', 'myths',
    'debunked', 'facts', 'fiction', 'gateway', 'paid', 'search', 'right',
    'platforms', 'balance', 'distribution', 'getting', 'eyes', 'work',
    'creating', 'converts', 'types', 'choosing', 'format', 'building',
    'presence', 'making', 'data', 'driven', 'decisions', 'proving', 'value',
    'measuring', 'analyzing', 'understanding', 'demystifying', 'advanced',
    'beginner', 'beginners', 'ultimate', 'complete', 'comprehensive',
    'discover', 'unlock', 'secrets', 'key', 'essential', 'important',
  ];

  // Извлекаем ключевые слова
  let words = lower
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));

  // Ищем ключевые термины (SEO, PPC, content, social media и т.д.)
  const keyTerms: string[] = [];
  const termPatterns = [
    { pattern: /seo|search\s+engine\s+optimization/i, term: 'SEO' },
    { pattern: /ppc|pay.*per.*click/i, term: 'PPC' },
    { pattern: /content\s+marketing|content\s+creation/i, term: 'content marketing' },
    { pattern: /social\s+media|smm/i, term: 'social media' },
    { pattern: /keyword/i, term: 'keyword' },
    { pattern: /analytics/i, term: 'analytics' },
    { pattern: /automation/i, term: 'automation' },
  ];

  for (const { pattern, term } of termPatterns) {
    if (pattern.test(title)) {
      keyTerms.push(term);
    }
  }

  // Если нашли ключевые термины, комбинируем их с другими значимыми словами
  if (keyTerms.length > 0) {
    const otherWords = words.filter(w => 
      !keyTerms.some(term => w.includes(term.toLowerCase()))
    ).slice(0, 2);
    
    if (otherWords.length > 0) {
      // Формируем естественный анкор
      const result = `${keyTerms[0]} ${otherWords.join(' ')}`;
      // Ограничиваем длину до разумного размера
      return result.length > 40 ? keyTerms[0] : result;
    }
    return keyTerms[0];
  }

  // Если ключевых терминов нет, берем первые 2-3 значимых слова
  const topic = words.slice(0, 3).join(' ');
  // Ограничиваем длину
  return topic.length > 40 ? words.slice(0, 2).join(' ') : topic || 'related topics';
}

/**
 * Извлекает основную тему из названия статьи (для обратной совместимости)
 */
export function extractMainTopic(title: string): string {
  return extractRelevantAnchor(title, 'en');
}
