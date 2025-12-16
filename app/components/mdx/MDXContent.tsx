'use client'

import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from './CustomComponents';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXContent({ source }: MDXContentProps) {
  // Explicitly pass props instead of using spread operator to avoid serialization issues
  // Only pass scope if it exists to avoid undefined issues
  return (
    <MDXRemote 
      compiledSource={source.compiledSource}
      frontmatter={source.frontmatter}
      {...(source.scope && { scope: source.scope })}
      components={mdxComponents} 
    />
  );
}
