import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export interface PostMetadata {
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  date?: string;
}

export function getPostsByCategory(lang: string, category: string) {
  const langDirectory = path.join(postsDirectory, lang);
  if (!fs.existsSync(langDirectory) || !fs.lstatSync(langDirectory).isDirectory()) {
    return [];
  }
  const fileNames = fs.readdirSync(langDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(langDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as PostMetadata),
    };
  });

  const normalize = (cat: string) => {
    const c = cat.toLowerCase();
    if (c === 'content' || c === 'content creation') return 'content creation';
    if (c === 'smm' || c === 'social media marketing') return 'smm';
    return c;
  };

  const normalizedTargetCategory = normalize(category);

  const filteredPosts = allPostsData.filter(
    (post) => normalize(post.category) === normalizedTargetCategory
  );

  // Here you could add sorting if needed, e.g., by title
  return filteredPosts;
}

export function getPostsByAuthor(lang: string, authorSlug: string) {
  const langDirectory = path.join(postsDirectory, lang);
  if (!fs.existsSync(langDirectory) || !fs.lstatSync(langDirectory).isDirectory()) {
    return [];
  }
  const fileNames = fs.readdirSync(langDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(langDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as PostMetadata),
    };
  });

  // Default author is 'polina-ivanova'
  const defaultAuthor = 'polina-ivanova';
  
  const filteredPosts = allPostsData.filter(
    (post) => {
      const postAuthor = post.author || defaultAuthor;
      return postAuthor.toLowerCase() === authorSlug.toLowerCase();
    }
  );

  // Sort by date (newest first) if available, otherwise by title
  return filteredPosts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });
}

export function getAllPosts(lang: string) {
  const langDirectory = path.join(postsDirectory, lang);
  if (!fs.existsSync(langDirectory) || !fs.lstatSync(langDirectory).isDirectory()) {
    return [];
  }
  const fileNames = fs.readdirSync(langDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(langDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as PostMetadata),
    };
  });

  return allPostsData;
}
