import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';

const sourceDir = path.resolve('_source_content');
const targetDir = path.resolve('content/services/en');

// Function to convert kebab-case to Title Case
function kebabToTitleCase(kebab) {
    return kebab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Function to create a URL-friendly slug
function toSlug(text) {
    return text
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

async function convertCsvToMdx() {
    try {
        console.log(`Source directory resolved to: ${sourceDir}`);
        await fs.mkdir(targetDir, { recursive: true });
        const files = await fs.readdir(sourceDir);
        console.log(`Found files in source directory:`, files);

        for (const file of files) {
            if (path.extname(file) === '.csv' && !file.includes('Home page') && !file.includes('Localization')) {
                const csvPath = path.join(sourceDir, file);
                const content = await fs.readFile(csvPath, 'utf-8');

                const records = parse(content, { bom: true });
                
                if (records.length < 4) continue;

                const title = records[2][1] || '';
                const description = records[3][1] || '';
                
                if (!title || !description) {
                    console.log(`Skipping ${file} due to missing title or description.`);
                    continue;
                }

                const fileNameWithoutExt = path.basename(file, '.csv')
                    .replace('Qwantix site structure - ', '');

                const slug = toSlug(fileNameWithoutExt);
                const firstSlugWord = slug.split('-')[0];
                let category = 'General';
                if (['seo', 'smm', 'ppc'].includes(firstSlugWord)) {
                    category = firstSlugWord.toUpperCase();
                } else if (['content', 'copywriting', 'visual'].includes(firstSlugWord)) {
                    category = 'Content';
                }


                let mdxContent = '';
                
                // Start from row 7 to skip hero section
                for (let i = 7; i < records.length; i++) {
                    const record = records[i];
                    if (!record || record.length < 2) continue;

                    const level = (record[4] || '').trim();
                    const text = (record[1] || '').trim();

                    if (!text || text.startsWith('#')) continue;

                    if (level === 'H2') {
                        mdxContent += `## ${text}\n\n`;
                    } else if (level === 'H3') {
                        mdxContent += `### ${text}\n\n`;
                    } else {
                        mdxContent += `${text}\n\n`;
                    }
                }


                const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${category}"
description: "${description.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
---

`;
                const finalContent = frontmatter + mdxContent;
                const newFilePath = path.join(targetDir, `${slug}.mdx`);
                await fs.writeFile(newFilePath, finalContent);
                console.log(`Converted ${file} to ${slug}.mdx`);
            }
        }
    } catch (error) {
        console.error('Error during CSV to MDX conversion:', error);
    }
}

convertCsvToMdx();
