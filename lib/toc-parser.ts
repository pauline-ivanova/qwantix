// Utility to parse headings from MDX content
export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 for H2, 3 for H3, 4 for H4
}

export function parseTableOfContents(content: string): TocItem[] {
  const toc: TocItem[] = [];
  
  // Regular expression to match markdown headings (## H2, ### H3, #### H4)
  // This pattern matches headings with 2-4 hash symbols
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Count of # symbols (2, 3, or 4)
    const text = match[2].trim();
    
    // Skip if it's a TL;DR or Key Facts section (these are not real headings)
    if (text.toLowerCase().includes('tl;dr') || 
        text.toLowerCase().includes('key facts') ||
        text.toLowerCase().includes('glossary') ||
        text.toLowerCase().includes('terms and abbreviations')) {
      continue;
    }
    
    // Generate ID from text (slugify)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
    
    toc.push({
      id,
      text,
      level,
    });
  }
  
  return toc;
}
