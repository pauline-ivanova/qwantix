import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

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
      ...(matterResult.data as { title: string; excerpt: string; category: string; }),
    };
  });

  const filteredPosts = allPostsData.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );

  // Here you could add sorting if needed, e.g., by title
  return filteredPosts;
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
      ...(matterResult.data as { title: string; excerpt: string; category: string; }),
    };
  });

  return allPostsData;
}
