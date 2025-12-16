import React from 'react';
import { slugify } from '@/lib/toc-parser';

// Minimal test version without client components
export const mdxComponentsTest = {
  h2: (props: { children?: React.ReactNode; className?: string }) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = slugify(text);
    const defaultClasses = 'text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mt-16 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 scroll-mt-20';
    const className = props.className ? `${defaultClasses} ${props.className}` : defaultClasses;
    
    return (
      <h2 id={id} className={className} suppressHydrationWarning>
        {props.children}
      </h2>
    );
  },
  h3: (props: { children?: React.ReactNode; className?: string }) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = slugify(text);
    const defaultClasses = 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-20';
    const className = props.className ? `${defaultClasses} ${props.className}` : defaultClasses;
    
    return (
      <h3 id={id} className={className} suppressHydrationWarning>
        {props.children}
      </h3>
    );
  },
  h4: (props: { children?: React.ReactNode; className?: string }) => {
    const text = typeof props.children === 'string' ? props.children : '';
    const id = slugify(text);
    const defaultClasses = 'text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-20';
    const className = props.className ? `${defaultClasses} ${props.className}` : defaultClasses;
    
    return (
      <h4 id={id} className={className} suppressHydrationWarning>
        {props.children}
      </h4>
    );
  },
  p: (props: { children?: React.ReactNode }) => (
    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">{props.children}</p>
  ),
  ul: (props: { children?: React.ReactNode }) => (
    <ul className="list-disc space-y-2 pl-6">{props.children}</ul>
  ),
  li: (props: { children?: React.ReactNode }) => (
    <li className="text-lg leading-8 text-gray-600 dark:text-gray-300 pl-2">{props.children}</li>
  ),
};
