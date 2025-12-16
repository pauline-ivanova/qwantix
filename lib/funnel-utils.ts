export type FunnelStage = 'TOFU' | 'MOFU' | 'BOFU';

/**
 * Определяет уровень воронки статьи по её названию
 * TOFU: базовые темы, введение, основы, мифы, эволюция, ландшафт
 * MOFU: стратегии, выбор, сравнение, инструменты, создание, распределение
 * BOFU: продвинутые стратегии, измерение, анализ, ROI, доказательство ценности
 */
export function detectFunnelStage(title: string): FunnelStage {
  const lowerTitle = title.toLowerCase();

  // BOFU индикаторы (самые специфичные, проверяем первыми)
  const bofuKeywords = [
    'advanced',
    'measuring',
    'analysis',
    'roi',
    'proving',
    'data-driven',
    'true success',
    'higher roi',
    'kpis',
    'analytics',
    'measuring true',
    'campaign analysis',
  ];

  // MOFU индикаторы
  const mofuKeywords = [
    'strategy',
    'strategies',
    'choosing',
    'choosing the right',
    'vs',
    'versus',
    'comparison',
    'tools',
    'automation',
    'creating',
    'distribution',
    'balance',
    'combination',
    'converts',
    'checklist',
    'essentials',
    'difference',
    'pros and cons',
    'best practices',
  ];

  // TOFU индикаторы
  const tofuKeywords = [
    'basics',
    'beginner',
    'beginners',
    'guide',
    'demystifying',
    'what is',
    'understanding',
    'evolution',
    'landscape',
    'myths',
    'debunked',
    'power of',
    'storytelling',
    'building',
  ];

  // Проверяем BOFU
  if (bofuKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'BOFU';
  }

  // Проверяем MOFU
  if (mofuKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'MOFU';
  }

  // Проверяем TOFU
  if (tofuKeywords.some(keyword => lowerTitle.includes(keyword))) {
    return 'TOFU';
  }

  // По умолчанию считаем TOFU (более безопасный вариант)
  return 'TOFU';
}

/**
 * Возвращает верхний уровень воронки для данного уровня
 */
export function getUpperFunnelStage(stage: FunnelStage): FunnelStage | null {
  switch (stage) {
    case 'BOFU':
      return 'MOFU';
    case 'MOFU':
      return 'TOFU';
    case 'TOFU':
      return null;
    default:
      return null;
  }
}
