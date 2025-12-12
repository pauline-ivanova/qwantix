import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import {
  ChartBarIcon,
  CursorArrowRaysIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  LightBulbIcon,
  PresentationChartLineIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  NewspaperIcon,
  LinkIcon,
  DocumentChartBarIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const servicesDirectory = path.join(process.cwd(), 'content', 'services');

export function getSortedServicesData(lang: string) {
  const langDirectory = path.join(servicesDirectory, lang);
  const fileNames = fs.readdirSync(langDirectory);
  const allServicesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(langDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as { title: string; description: string }),
    };
  });
  return allServicesData;
}

export function getAllServiceSlugs() {
  const languages = fs.readdirSync(servicesDirectory);
  let paths: { params: { lang: string, slug: string } }[] = [];

  languages.forEach((lang) => {
    const langDirectory = path.join(servicesDirectory, lang);
    if (fs.statSync(langDirectory).isDirectory()) {
      const fileNames = fs.readdirSync(langDirectory);
      const langPaths = fileNames.map((fileName) => {
        return {
          params: {
            lang: lang,
            slug: fileName.replace(/\.mdx$/, ''),
          },
        };
      });
      paths = paths.concat(langPaths);
    }
  });

  return paths;
}

export type ServiceContentBlock =
  | { type: 'FeatureList'; data: { title: string; description: string; features: { name: string; description: string; icon: React.ElementType }[] } }
  | { type: 'StatsGrid'; data: { title: string; description: string; stats: { name: string; value: string }[] } }
  | { type: 'ServiceCardGrid'; data: { title: string; description: string; services: { name: string; leadText: string; features: string[]; icon: React.ElementType; href: string; buttonText: string }[] } }
  | { type: 'ProcessSteps'; data: { title: string; description: string; steps: { name: string; description: string; icon: React.ElementType }[]; conclusion: string } }
  | { type: 'MdxContent'; source: any };

export type ServiceData = {
  slug: string;
  frontmatter: { [key: string]: any };
  contentBlocks: ServiceContentBlock[];
  faqData: null | { title: string; description: string; faqs: { question: string; answer: string; category: string }[] };
  rawContent?: string; // Qwantix: raw MDX content for TOC parsing
};

export async function getServiceData(lang: string, slug: string): Promise<ServiceData> {
  // Try requested language first, then gracefully fall back to English
  const candidateLanguages = [lang, 'en'];
  let fileContents = '';
  let resolvedPath = '';

  for (const candidateLang of candidateLanguages) {
    const attemptPath = path.join(servicesDirectory, candidateLang, `${slug}.mdx`);
    if (fs.existsSync(attemptPath)) {
      resolvedPath = attemptPath;
      fileContents = fs.readFileSync(attemptPath, 'utf8');
      break;
    }
  }

  if (!fileContents) {
    // Preserve original behavior if nothing found at all
    const directPath = path.join(servicesDirectory, lang, `${slug}.mdx`);
    fileContents = fs.readFileSync(directPath, 'utf8');
    resolvedPath = directPath;
  }

  const { data, content } = matter(fileContents);

  // New parsing logic
  const sections = content.split(/(?=^##\s)/m);

  const parsedData: { [key: string]: any } = {
    contentBlocks: [],
    faqData: null
  };

  const iconMap: { [key: string]: React.ElementType } = {
    'Data-Driven Strategies': PresentationChartLineIcon,
    'Customized Solutions': AdjustmentsHorizontalIcon,
    'Transparent Reporting': DocumentChartBarIcon,
    'Continuous Optimization': ChartBarIcon,
    'Integrated Approach': PuzzlePieceIcon,
    'Ethical & Future-Proof SEO': ShieldCheckIcon,
    'Comprehensive SEO': ClipboardDocumentListIcon,
    'Local SEO': MapPinIcon,
    'E-commerce SEO': BuildingStorefrontIcon,
    'Technical SEO': WrenchScrewdriverIcon,
    'Keyword Research & Strategy': MagnifyingGlassIcon,
    'On-Page SEO': DocumentTextIcon,
    'Link Building': LinkIcon,
    // Icons for Our Search Optimization Methodology
    'Comprehensive Website Audit': ClipboardDocumentCheckIcon,
    'Keyword Research and Analysis': MagnifyingGlassIcon,
    'On-Page Optimization': DocumentTextIcon,
    'Content Strategy and Creation': NewspaperIcon,
    'Link Building and Outreach': LinkIcon,
    'Performance Tracking and Reporting': PresentationChartLineIcon,
    // Icons for Our SEO Process
    'Discovery and Goal Setting': MagnifyingGlassIcon,
    'In-Depth SEO Audit': ClipboardDocumentCheckIcon,
    'Strategy Development': ClipboardDocumentListIcon,
    'Implementation': RocketLaunchIcon,
    'Monitoring and Optimization': ArrowTrendingUpIcon,
    'Regular Reporting': ChatBubbleLeftRightIcon,
  };

  const leadingContent = sections[0].match(/^##\s/m) ? '' : sections.shift();

  if (leadingContent && leadingContent.trim()) {
   parsedData.contentBlocks.push({
       type: 'MdxContent',
       source: await serialize(leadingContent.trim())
   });
  }

  for (const section of sections) {
      const titleMatch = section.match(/^##\s(.*)/);
      if (titleMatch) {
      const fullTitle = titleMatch[1].trim();
      const idMatch = fullTitle.match(/\{#(.*?)\}/);
      const blockType = idMatch ? idMatch[1].trim() : null;
      const title = idMatch ? fullTitle.replace(idMatch[0], '').trim() : fullTitle;
      let sectionContent = section.substring(titleMatch[0].length).trim();
      const introMatch = sectionContent.match(/^([\s\S]*?)(?=^###\s|- )/m);
      const description = introMatch ? introMatch[1].trim() : '';

      if (introMatch) {
        sectionContent = sectionContent.substring(introMatch[0].length).trim();
      }

      let blockProcessed = false;
      switch (blockType) { // Use blockType from ID for explicit mapping
        case 'FeatureList':
          const features = sectionContent.split(/(?=^###\s)/m).map(featureText => {
            const nameMatch = featureText.match(/^###\s(.*)/);
            const name = nameMatch ? nameMatch[1].trim() : '';
            const description = featureText.substring(nameMatch ? nameMatch[0].length : 0).trim();
            return { name, description, icon: (iconMap[name] || LightBulbIcon) };
          }).filter(f => f.name);
          parsedData.contentBlocks.push({ type: 'FeatureList', data: { title, description, features } });
          blockProcessed = true;
          break;

        case 'StatsGrid':
          const stats = sectionContent
            .split('\n')
            .filter((line) => line.startsWith('- '))
            .map((line) => {
              const content = line.replace('- ', '').trim();
              const firstSpaceIndex = content.indexOf(' ');
              if (firstSpaceIndex === -1) {
                return { value: content, name: '' };
              }
              const value = content.substring(0, firstSpaceIndex);
              const name = content.substring(firstSpaceIndex + 1);
              return { value, name };
            });
          parsedData.contentBlocks.push({ type: 'StatsGrid', data: { title, description, stats } });
          blockProcessed = true;
          break;

        case 'ServiceCardGrid':
          const services = sectionContent.split(/(?=^###\s)/m).map(serviceText => {
              const nameMatch = serviceText.match(/^###\s(.*)/);
              const name = nameMatch ? nameMatch[1].trim() : '';
              const contentAfterTitle = serviceText.substring(nameMatch ? nameMatch[0].length : 0).trim();

              const listStartIndex = contentAfterTitle.search(/-\s/);
              let leadText = '';
              let features: string[] = [];

              if (listStartIndex !== -1) {
                  leadText = contentAfterTitle.substring(0, listStartIndex).trim();
                  const featuresText = contentAfterTitle.substring(listStartIndex);
                  features = featuresText.split(/\r?\n/).map(line => line.replace(/-\s*/, '').trim()).filter(line => line);
              } else {
                  leadText = contentAfterTitle;
              }

              return { name, leadText, features, icon: (iconMap[name] || WrenchScrewdriverIcon), href: '#', buttonText: 'Learn More' };
          }).filter(s => s.name);
          parsedData.contentBlocks.push({ type: 'ServiceCardGrid', data: { title, description, services } });
          blockProcessed = true;
          break;

        case 'ProcessSteps':
            let conclusion = '';
            let currentContent = sectionContent;

            const parts = currentContent.split(/(?=^###\s)/m);
            if (parts.length > 0) {
                let lastPart = parts[parts.length - 1];
                // Split by double newline, accommodating both Windows (\r\n) and Unix (\n) line endings
                const contentParts = lastPart.split(/\r?\n\r?\n/);

                if (contentParts.length > 1) {
                    conclusion = contentParts.pop()?.trim() || '';
                    lastPart = contentParts.join('\n\n'); // Re-join with standard newlines
                }
                parts[parts.length - 1] = lastPart;
                currentContent = parts.join('');
            }

          const stepRegex = /^###\s(.*?)(?:\n|\r\n)([\s\S]*?)(?=(?:^###\s)|$)/gm;
          const stepMatches = Array.from(currentContent.matchAll(stepRegex));

          const steps = stepMatches.map(match => {
              const name = match[1].trim();
              const description = match[2].trim();
              return { name, description, icon: iconMap[name] };
          }).filter((s): s is { name: string; description: string; icon: React.ElementType } => s !== null && s.name !== '');

          parsedData.contentBlocks.push({ type: 'ProcessSteps', data: { title, description, steps, conclusion } });
          blockProcessed = true;
          break;

        case 'SearchOptimizationFAQ': // Renamed from 'Search Optimization FAQ' for ID
          const faqItems: { question: string; answer: string; category: string; }[] = [];
          const questions = sectionContent.split(/(?=^###\s)/m).filter(q => q.trim() !== '');
          questions.forEach(qText => {
              const qMatch = qText.match(/^###\s(.*)/);
              if (!qMatch) return;
              const question = qMatch ? qMatch[1].trim() : '';
              const answer = qText.substring(qMatch ? qMatch[0].length : 0).trim();
              let category = 'SEO Fundamentals';
              const questionLower = question.toLowerCase();
              if (questionLower.includes('how long') || questionLower.includes('how often') || questionLower.includes('guarantee')) {
                category = 'Process & Expectations';
              }
              faqItems.push({ question, answer, category });
          });
          parsedData.faqData = { title, description, faqs: faqItems.filter(f => f.question) };
          blockProcessed = true;
          break;
        default:
            // This is the default case for sections with ## titles but no recognized ID
            parsedData.contentBlocks.push({
                type: 'MdxContent',
                source: await serialize(section.trim())
            });
            blockProcessed = true; // Mark as processed to avoid double-adding
            break;
      }
    }
  }

  return {
    slug,
    frontmatter: data,
    rawContent: content, // Qwantix: include raw content for TOC parsing
    ...parsedData
  } as ServiceData;
}
