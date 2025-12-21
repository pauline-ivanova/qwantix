'use client'

import React, { useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents, resetHeadingIdTracker } from './CustomComponents';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXContent({ source }: MDXContentProps) {
  // Reset heading ID tracker before rendering
  React.useMemo(() => {
    resetHeadingIdTracker();
  }, [source.compiledSource]);

  return (
    <MDXRemote 
      compiledSource={source.compiledSource}
      frontmatter={source.frontmatter}
      {...(source.scope && { scope: source.scope })}
      components={mdxComponents} 
    />
  );
}
