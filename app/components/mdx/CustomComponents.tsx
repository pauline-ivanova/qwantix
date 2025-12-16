import React from 'react';
import { slugify } from '@/lib/toc-parser';

// Track ID counts for duplicate headings (same logic as parseTableOfContents)
const idCounts: { [key: string]: number } = {};

// Reset ID tracker (called before rendering each post)
export function resetHeadingIdTracker() {
  Object.keys(idCounts).forEach(key => delete idCounts[key]);
}

// Extract text content from React children
function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (React.isValidElement(children) && children.props.children) {
    return extractText(children.props.children);
  }
  return '';
}

// Generate ID from text (matching parseTableOfContents logic)
function generateHeadingId(text: string): string {
  const baseId = slugify(text);
  
  // Ensure unique ID by appending a counter if needed
  let id = baseId;
  if (idCounts[baseId] !== undefined) {
    idCounts[baseId]++;
    id = `${baseId}-${idCounts[baseId]}`;
  } else {
    idCounts[baseId] = 0;
  }
  
  return id;
}

// Define components separately to avoid serialization issues
function H2(props: React.ComponentProps<'h2'>) {
  const children = props.children;
  const className = props.className;
  const defaultClasses = 'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mt-16 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 scroll-mt-20';
  const mergedClassName = className ? `${defaultClasses} ${className}` : defaultClasses;
  
  // Generate ID from text content
  const text = extractText(children);
  const id = generateHeadingId(text);
  
  return (
    <h2 id={id} className={mergedClassName} suppressHydrationWarning>
      {children}
    </h2>
  );
}

function H3(props: React.ComponentProps<'h3'>) {
  const children = props.children;
  const className = props.className;
  const defaultClasses = 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-20';
  const mergedClassName = className ? `${defaultClasses} ${className}` : defaultClasses;
  
  // Generate ID from text content
  const text = extractText(children);
  const id = generateHeadingId(text);
  
  return (
    <h3 id={id} className={mergedClassName} suppressHydrationWarning>
      {children}
    </h3>
  );
}

function H4(props: React.ComponentProps<'h4'>) {
  const children = props.children;
  const className = props.className;
  const defaultClasses = 'text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-20';
  const mergedClassName = className ? `${defaultClasses} ${className}` : defaultClasses;
  
  // Generate ID from text content
  const text = extractText(children);
  const id = generateHeadingId(text);
  
  return (
    <h4 id={id} className={mergedClassName} suppressHydrationWarning>
      {children}
    </h4>
  );
}

function P(props: React.ComponentProps<'p'>) {
  return (
    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
      {props.children}
    </p>
  );
}

function UL(props: React.ComponentProps<'ul'>) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {props.children}
    </ul>
  );
}

function LI(props: React.ComponentProps<'li'>) {
  return (
    <li className="text-lg leading-8 text-gray-600 dark:text-gray-300 pl-2">
      {props.children}
    </li>
  );
}

// Export as a plain object with direct function references
export const mdxComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: UL,
  li: LI,
};
