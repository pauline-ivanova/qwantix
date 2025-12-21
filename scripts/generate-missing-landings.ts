import * as fs from 'fs';
import * as path from 'path';

const structuredPath = path.join(process.cwd(), 'missing-landings-structured.json');
const structuredData = JSON.parse(fs.readFileSync(structuredPath, 'utf8'));

// Маппинг категорий
const categoryMap: Record<string, string> = {
  'search-ads': 'PPC',
  'display-social-media-ads': 'PPC',
  'shopping-ads': 'PPC',
  'organic-smm': 'SMM',
  'smm-content-creation': 'SMM',
  'smm-community-management': 'SMM',
  'content-strategy': 'Content',
  'copywriting': 'Content',
  'visual-content-production': 'Content',
  'content-localization': 'Content',
};

// Функция для очистки текста от лишних символов
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
}

// Функция для извлечения описания из hero section
function extractDescription(heroItems: any[]): string {
  for (const item of heroItems) {
    if (item.title && !item.level && item.length > 50) {
      // Убираем список преимуществ из описания, если он там есть
      let desc = item.title;
      // Удаляем строки вида "Qwantix ... delivers: ..."
      desc = desc.replace(/Qwantix[^.]*delivers:[^.]*\./g, '');
      desc = desc.replace(/Qwantix[^.]*expertise delivers:[^.]*\./g, '');
      // Берем только первое предложение или первые два
      const sentences = desc.split(/[.!?]+/).filter((s: string) => s.trim().length > 20);
      return sentences.slice(0, 2).join('. ').trim() + '.';
    }
  }
  return '';
}

// Функция для генерации MDX контента
function generateMDX(slug: string, data: any): string {
  const category = categoryMap[slug] || 'Other';
  
  // Извлекаем hero section
  const heroSection = data.sections.find((s: any) => s.title.includes('Hero Section'));
  const heroItems = heroSection?.items || [];
  
  // Извлекаем title и description
  const titleItem = heroItems.find((item: any) => item.level === 'H1');
  const title = titleItem?.title || data.name;
  const description = extractDescription(heroItems) || `${data.name} services from Qwantix.`;
  
  // Генерируем frontmatter
  let mdx = '---\n';
  mdx += `title: "${title}"\n`;
  mdx += `slug: "${slug}"\n`;
  mdx += `category: "${category}"\n`;
  mdx += `description: "${description}"\n`;
  mdx += `faqCtaText: "Still have questions about ${data.name.toLowerCase()}? We're here to help!"\n`;
  mdx += `faqCtaButtonText: "Get Your Free ${data.name} Consultation"\n`;
  mdx += '---\n\n';
  
  // Вводный текст (если есть в hero section)
  const introText = heroItems.find((item: any) => 
    item.title && !item.level && item.length > 50 && !item.type
  );
  if (introText) {
    let intro = cleanText(introText.title);
    // Удаляем список преимуществ, если он есть
    intro = intro.split(/Qwantix[^.]*delivers:/)[0].trim();
    if (intro) {
      mdx += intro + '\n\n';
    }
  }
  
  // Обрабатываем секции
  for (let i = 0; i < data.sections.length; i++) {
    const section = data.sections[i];
    
    // Пропускаем hero section (уже обработали)
    if (section.title.includes('Hero Section')) continue;
    
    // Section #2 - обычно FeatureList или описание
    if (section.title.includes('#2')) {
      const h2Item = section.items.find((item: any) => item.level === 'H2');
      const introItem = section.items.find((item: any) => 
        !item.level && !item.type && item.title && item.length > 30
      );
      const h3Items = section.items.filter((item: any) => item.level === 'H3');
      
      if (h2Item && h3Items.length > 0) {
        mdx += `## ${cleanText(h2Item.title)} {#FeatureList}\n\n`;
        if (introItem) {
          mdx += cleanText(introItem.title) + '\n\n';
        }
        
        for (const h3 of h3Items) {
          mdx += `### ${cleanText(h3.title)}\n`;
          // Ищем описание после H3
          const h3Index = section.items.indexOf(h3);
          const nextItem = section.items[h3Index + 1];
          if (nextItem && !nextItem.level && !nextItem.type) {
            mdx += cleanText(nextItem.title) + '\n\n';
          } else {
            mdx += '\n';
          }
        }
        mdx += '\n';
      }
    }
    
    // Section #3 - StatsGrid
    if (section.title.includes('#3')) {
      const h2Item = section.items.find((item: any) => item.level === 'H2');
      const introItem = section.items.find((item: any) => 
        !item.level && !item.type && item.title && item.length > 30 && 
        !item.title.toLowerCase().includes('qwantix') &&
        !item.title.toLowerCase().includes('our')
      );
      
      // Ищем статистику - элементы с числами, процентами, долларами
      // В Excel статистика часто имеет числовой type (1, 2, 3...) но не level
      const statItems = section.items.filter((item: any) => {
        if (item.level || !item.title) return false;
        // Принимаем элементы с числовым type или без type
        if (item.type && typeof item.type !== 'number') return false;
        const text = item.title;
        // Ищем элементы с числами/процентами/долларами
        const hasNumber = /[\d.%$]/.test(text);
        if (!hasNumber) return false;
        // Исключаем элементы, которые явно не статистика
        const textLower = text.toLowerCase();
        const isNotStat = textLower.includes('qwantix') || 
                         textLower.includes('our approach') ||
                         textLower.includes('we harness') ||
                         textLower.includes('we deliver') ||
                         textLower.includes('driving') ||
                         textLower.includes('at qwantix') ||
                         textLower.includes('our roi-focused');
        // Статистика обычно содержит проценты, числа с контекстом (of, more, than, etc.)
        const looksLikeStat = textLower.includes('%') || 
                              textLower.includes('of') ||
                              textLower.includes('more') ||
                              textLower.includes('than') ||
                              textLower.includes('average') ||
                              textLower.includes('up to') ||
                              textLower.includes('per') ||
                              textLower.includes('x more') ||
                              textLower.includes('times');
        return !isNotStat && looksLikeStat && text.length > 20;
      });
      
      if (h2Item) {
        mdx += `## ${cleanText(h2Item.title)} {#StatsGrid}\n\n`;
        if (introItem && statItems.length > 0) {
          mdx += cleanText(introItem.title) + '\n\n';
        }
        
        if (statItems.length > 0) {
          for (const stat of statItems.slice(0, 7)) {
            mdx += `- ${cleanText(stat.title)}\n`;
          }
        } else {
          // Если нет статистики, делаем обычный текст
          const textItems = section.items.filter((item: any) => 
            !item.level && !item.type && item.title && item.length > 20 &&
            !item.title.toLowerCase().includes('qwantix') &&
            !item.title.toLowerCase().includes('our approach')
          );
          if (textItems.length > 0) {
            mdx += cleanText(textItems[0].title) + '\n\n';
          }
        }
        mdx += '\n';
      }
    }
    
    // Section #4 - Our Comprehensive Approach (FeatureList)
    if (section.title.includes('#4')) {
      const h2Item = section.items.find((item: any) => item.level === 'H2');
      const introItem = section.items.find((item: any) => 
        !item.level && !item.type && item.title && item.length > 30
      );
      const h3Items = section.items.filter((item: any) => item.level === 'H3');
      
      if (h2Item && h3Items.length > 0) {
        mdx += `## ${cleanText(h2Item.title)} {#FeatureList}\n\n`;
        if (introItem) {
          mdx += cleanText(introItem.title) + '\n\n';
        }
        
        for (const h3 of h3Items) {
          mdx += `### ${cleanText(h3.title)}\n`;
          const h3Index = section.items.indexOf(h3);
          // Ищем описание после H3
          let descFound = false;
          for (let j = h3Index + 1; j < section.items.length; j++) {
            const nextItem = section.items[j];
            if (nextItem.level === 'H3') break;
            if (!nextItem.level && !nextItem.type && nextItem.title && !nextItem.title.toLowerCase().includes('edge:') && !nextItem.title.toLowerCase().includes('impact:') && !nextItem.title.toLowerCase().includes('advantage:') && !nextItem.title.toLowerCase().includes('benefit:') && !nextItem.title.toLowerCase().includes('value:')) {
              mdx += cleanText(nextItem.title) + '\n\n';
              descFound = true;
              break;
            }
          }
          if (!descFound) {
            mdx += '\n';
          }
        }
        mdx += '\n';
      }
    }
    
    // Section #5 - Why Choose Qwantix (FeatureList)
    if (section.title.includes('#5')) {
      const h2Item = section.items.find((item: any) => item.level === 'H2');
      const introItem = section.items.find((item: any) => 
        !item.level && !item.type && item.title && item.length > 30
      );
      const h3Items = section.items.filter((item: any) => item.level === 'H3');
      
      if (h2Item && h3Items.length > 0) {
        mdx += `## ${cleanText(h2Item.title)} {#FeatureList}\n\n`;
        if (introItem) {
          mdx += cleanText(introItem.title) + '\n\n';
        }
        
        for (const h3 of h3Items) {
          mdx += `### ${cleanText(h3.title)}\n`;
          const h3Index = section.items.indexOf(h3);
          // Ищем описание после H3
          for (let j = h3Index + 1; j < section.items.length; j++) {
            const nextItem = section.items[j];
            if (nextItem.level === 'H3' || nextItem.type === 'CTA' || nextItem.type === 'Buttom' || nextItem.type === 'Button') break;
            if (!nextItem.level && !nextItem.type && nextItem.title) {
              mdx += cleanText(nextItem.title) + '\n\n';
              break;
            }
          }
        }
        mdx += '\n';
      }
    }
    
    // Section #6 - Process (ProcessSteps)
    if (section.title.includes('#6')) {
      const h2Item = section.items.find((item: any) => item.level === 'H2');
      const introItem = section.items.find((item: any) => 
        !item.level && !item.type && item.title && item.length > 30
      );
      const h3Items = section.items.filter((item: any) => item.level === 'H3');
      
      if (h2Item && h3Items.length > 0) {
        mdx += `## ${cleanText(h2Item.title)} {#ProcessSteps}\n\n`;
        if (introItem) {
          mdx += cleanText(introItem.title) + '\n\n';
        }
        
        for (const h3 of h3Items) {
          mdx += `### ${cleanText(h3.title)}\n`;
          const h3Index = section.items.indexOf(h3);
          // Ищем описание после H3 (первый непустой текст без level/type)
          for (let j = h3Index + 1; j < section.items.length; j++) {
            const nextItem = section.items[j];
            if (nextItem.level === 'H3' || nextItem.type === 'CTA' || nextItem.type === 'Buttom' || nextItem.type === 'Button') break;
            if (!nextItem.level && !nextItem.type && nextItem.title && nextItem.title.length > 20) {
              // Пропускаем короткие фразы типа "Growth:", "Benefit:", "Impact:" и т.д.
              const text = nextItem.title.trim();
              if (!text.match(/^[A-Z][a-z]+:\s*$/) && !text.match(/^[A-Z][a-z]+:\s+[A-Z]/)) {
                mdx += cleanText(nextItem.title) + '\n\n';
                break;
              }
            }
          }
        }
        
        // Ищем заключение (последний большой текст после всех H3)
        let lastH3Index = -1;
        for (let i = section.items.length - 1; i >= 0; i--) {
          if (section.items[i].level === 'H3') {
            lastH3Index = i;
            break;
          }
        }
        if (lastH3Index >= 0) {
          for (let j = lastH3Index + 1; j < section.items.length; j++) {
            const item = section.items[j];
            if (item.type === 'CTA' || item.type === 'Buttom' || item.type === 'Button') break;
            if (!item.level && !item.type && item.title && item.length > 50) {
              // Проверяем, что это не дубликат предыдущего текста
              const isDuplicate = h3Items.some((h3: any) => {
                const h3Index = section.items.indexOf(h3);
                const h3Desc = section.items[h3Index + 1];
                return h3Desc && h3Desc.title === item.title;
              });
              if (!isDuplicate) {
                mdx += cleanText(item.title) + '\n\n';
                break;
              }
            }
          }
        }
        mdx += '\n';
      }
    }
    
    // Section #7 - FAQ (SearchOptimizationFAQ)
    if (section.title.includes('#7')) {
      const h2Item = section.items.find((item: any) => item.level === 'H2');
      const h3Items = section.items.filter((item: any) => item.level === 'H3');
      
      if (h2Item && h3Items.length > 0) {
        mdx += `## ${cleanText(h2Item.title)} {#SearchOptimizationFAQ}\n\n`;
        
        for (const h3 of h3Items) {
          mdx += `### ${cleanText(h3.title)}\n`;
          const h3Index = section.items.indexOf(h3);
          // Ищем ответ после вопроса
          for (let j = h3Index + 1; j < section.items.length; j++) {
            const nextItem = section.items[j];
            if (nextItem.level === 'H3' || nextItem.type === 'CTA' || nextItem.type === 'Buttom' || nextItem.type === 'Button') break;
            if (!nextItem.level && !nextItem.type && nextItem.title) {
              mdx += cleanText(nextItem.title) + '\n\n';
              break;
            }
          }
        }
        mdx += '\n';
      }
    }
  }
  
  return mdx;
}

// Создаем директорию если не существует
const servicesDir = path.join(process.cwd(), 'content', 'services', 'en');
if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
}

// Генерируем MDX файлы
console.log('Generating missing landing pages...\n');

Object.entries(structuredData).forEach(([slug, data]: [string, any]) => {
  const mdxContent = generateMDX(slug, data);
  const filePath = path.join(servicesDir, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent);
  console.log(`✓ Created: ${slug}.mdx`);
});

console.log(`\n✅ Successfully created ${Object.keys(structuredData).length} landing pages!`);

