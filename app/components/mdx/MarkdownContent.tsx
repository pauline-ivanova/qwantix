import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from './CustomComponents';
import { splitContentAtThirdH2 } from '@/lib/markdown-utils';
import { ReactNode } from 'react';

interface MarkdownContentProps {
  content: string;
  insertBeforeThirdH2?: ReactNode; // Компонент для вставки перед третьим H2
}

export default function MarkdownContent({ content, insertBeforeThirdH2 }: MarkdownContentProps) {
  // Если нужно вставить компонент перед третьим H2, разделяем контент
  if (insertBeforeThirdH2) {
    const { before, after } = splitContentAtThirdH2(content);

    return (
      <>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: mdxComponents.h2,
            h3: mdxComponents.h3,
            h4: mdxComponents.h4,
            p: mdxComponents.p,
            ul: mdxComponents.ul,
            li: mdxComponents.li,
          }}
        >
          {before}
        </ReactMarkdown>
        {after && insertBeforeThirdH2}
        {after && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: mdxComponents.h2,
              h3: mdxComponents.h3,
              h4: mdxComponents.h4,
              p: mdxComponents.p,
              ul: mdxComponents.ul,
              li: mdxComponents.li,
            }}
          >
            {after}
          </ReactMarkdown>
        )}
      </>
    );
  }

  // Обычный рендеринг без вставки
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: mdxComponents.h2,
        h3: mdxComponents.h3,
        h4: mdxComponents.h4,
        p: mdxComponents.p,
        ul: mdxComponents.ul,
        li: mdxComponents.li,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
