import React from 'react';
import InteractiveCheckbox from '@/app/components/common/InteractiveCheckbox';
import ChecklistWrapper from '@/app/components/common/ChecklistWrapper';
import ChecklistItemContent from '@/app/components/common/ChecklistItemContent';

export const mdxComponents = {
  h2: (props: any) => {
    // Generate ID from text for TOC navigation
    const text = typeof props.children === 'string' ? props.children : '';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    return (
      <h2 
        id={id}
        className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mt-16 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 scroll-mt-20" 
        {...props} 
      />
    );
  },
  h3: (props: any) => {
    // Generate ID from text for TOC navigation
    const text = typeof props.children === 'string' ? props.children : '';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    return (
      <h3 
        id={id}
        className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-20" 
        {...props} 
      />
    );
  },
  h4: (props: any) => {
    // Generate ID from text for TOC navigation
    const text = typeof props.children === 'string' ? props.children : '';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    return (
      <h4 
        id={id}
        className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-20" 
        {...props} 
      />
    );
  },
  p: (props: any) => (
    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc space-y-2 pl-6" {...props} />
  ),
  li: (props: any) => (
    <li className="text-lg leading-8 text-gray-600 dark:text-gray-300 pl-2" {...props} />
  ),
  // Checklist components
  ChecklistWrapper,
  ChecklistItemContent,
  InteractiveCheckbox,
};



