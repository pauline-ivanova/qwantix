import { getAllPosts } from './posts';
import { getAllServiceSlugs } from './services';

export interface TopicCluster {
  topic: string;
  pillarUrl: string;
  clusterUrls: string[];
  keywords: string[];
}

export interface RelatedContent {
  title: string;
  url: string;
  type: 'blog' | 'service';
  relevance: number;
  keywords: string[];
}

/**
 * Extract keywords from text (simple implementation)
 */
export function extractKeywords(text: string, maxKeywords: number = 5): string[] {
  // Remove markdown and HTML
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/#+\s/g, '')
    .toLowerCase();

  // Common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does',
    'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that',
    'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
    'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
    'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
    'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now',
  ]);

  // Extract words
  const words = cleanText
    .split(/\W+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count frequency
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Normalize category for comparison (handles aliases)
 */
function normalizeCategory(category?: string): string {
  if (!category) return '';
  const cat = category.toLowerCase();
  if (cat === 'content' || cat === 'content creation') return 'content creation';
  if (cat === 'smm' || cat === 'social media marketing') return 'smm';
  return cat;
}

/**
 * Calculate relevance score between two pieces of content
 */
function calculateRelevance(
  keywords1: string[],
  keywords2: string[],
  category1?: string,
  category2?: string
): number {
  let score = 0;

  // Keyword overlap
  const commonKeywords = keywords1.filter(k => keywords2.includes(k));
  score += commonKeywords.length * 10;

  // Category match
  const normCat1 = normalizeCategory(category1);
  const normCat2 = normalizeCategory(category2);
  
  if (normCat1 && normCat2 && normCat1 === normCat2) {
    score += 20;
  }

  return score;
}

/**
 * Find related content based on keywords and category
 */
export function findRelatedContent(
  lang: string,
  currentKeywords: string[],
  currentCategory?: string,
  excludeSlug?: string,
  limit: number = 5
): RelatedContent[] {
  const related: RelatedContent[] = [];

  // Get all blog posts
  const posts = getAllPosts(lang);
  posts.forEach(post => {
    if (excludeSlug && post.slug === excludeSlug) return;

    const postKeywords = extractKeywords(
      `${post.title} ${post.excerpt || ''} ${post.category || ''}`
    );

    const relevance = calculateRelevance(
      currentKeywords,
      postKeywords,
      currentCategory,
      post.category
    );

    if (relevance > 0) {
      related.push({
        title: post.title,
        url: `/${lang}/blog/${post.slug}`,
        type: 'blog',
        relevance,
        keywords: postKeywords,
      });
    }
  });

  // Get all services
  const services = getAllServiceSlugs();
  services.forEach(({ params }) => {
    if (params.lang !== lang) return;
    if (excludeSlug && params.slug === excludeSlug) return;

    // Simple keyword extraction from slug
    const serviceKeywords = params.slug.split('-');
    const relevance = calculateRelevance(currentKeywords, serviceKeywords, currentCategory);

    if (relevance > 0) {
      related.push({
        title: params.slug.replace(/-/g, ' '),
        url: `/${params.lang}/services/${params.slug}`,
        type: 'service',
        relevance,
        keywords: serviceKeywords,
      });
    }
  });

  // Sort by relevance and return top results
  return related
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}

/**
 * Generate topic clusters from content
 */
export function generateTopicClusters(lang: string): TopicCluster[] {
  const clusters: Map<string, TopicCluster> = new Map();
  const posts = getAllPosts(lang);

  posts.forEach(post => {
    const category = post.category || 'General';
    const keywords = extractKeywords(`${post.title} ${post.excerpt || ''}`);

    if (!clusters.has(category)) {
      clusters.set(category, {
        topic: category,
        pillarUrl: `/${lang}/blog?category=${encodeURIComponent(category)}`,
        clusterUrls: [],
        keywords: [],
      });
    }

    const cluster = clusters.get(category)!;
    cluster.clusterUrls.push(`/${lang}/blog/${post.slug}`);
    cluster.keywords.push(...keywords);
  });

  // Deduplicate keywords
  clusters.forEach(cluster => {
    cluster.keywords = Array.from(new Set(cluster.keywords));
  });

  return Array.from(clusters.values());
}
