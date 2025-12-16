/**
 * Находит позицию третьего H2 заголовка в markdown контенте
 * Возвращает индекс начала третьего H2 или -1, если его нет
 */
export function findThirdH2Position(content: string): number {
  const headingRegex = /^(##)\s+(.+)$/gm;
  let match;
  let h2Count = 0;
  let lastMatchIndex = -1;

  while ((match = headingRegex.exec(content)) !== null) {
    h2Count++;
    if (h2Count === 3) {
      return match.index;
    }
    lastMatchIndex = match.index;
  }

  return -1; // Третьего H2 нет
}

/**
 * Разделяет markdown контент на две части: до третьего H2 и после
 * Если третьего H2 нет, возвращает весь контент как первую часть
 */
export function splitContentAtThirdH2(content: string): { before: string; after: string } {
  const thirdH2Position = findThirdH2Position(content);

  if (thirdH2Position === -1) {
    // Третьего H2 нет, возвращаем весь контент
    return {
      before: content,
      after: '',
    };
  }

  return {
    before: content.substring(0, thirdH2Position),
    after: content.substring(thirdH2Position),
  };
}
