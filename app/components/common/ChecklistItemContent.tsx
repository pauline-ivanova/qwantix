'use client';

import React from 'react';

interface ChecklistItemContentProps {
  children: React.ReactNode;
}

export default function ChecklistItemContent({ children }: ChecklistItemContentProps) {
  const childrenArray = React.Children.toArray(children);
  
  // Filter out checkbox inputs and InteractiveCheckbox components
  const filteredChildren = childrenArray.filter((child: any) => {
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<any>;
      if (element.type === 'input' && element.props?.type === 'checkbox') {
        return false;
      }
      if (element.type && typeof element.type !== 'string') {
        const type = element.type as any;
        const componentName = type.displayName || type.name || '';
        if (componentName.includes('InteractiveCheckbox')) {
          return false;
        }
      }
    }
    return true;
  });
  
  // Convert all children to a flat text representation
  const getAllText = (nodes: React.ReactNode[]): string => {
    return nodes.map(node => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (React.isValidElement(node)) {
        if (node.props?.children) {
          return getAllText(React.Children.toArray(node.props.children));
        }
      }
      return '';
    }).join('');
  };
  
  // Try to find split point (colon)
  let titlePart: React.ReactNode = null;
  let descriptionParts: React.ReactNode[] = [];
  let foundSplit = false;
  
  for (let i = 0; i < filteredChildren.length; i++) {
    const child = filteredChildren[i];
    
    if (foundSplit) {
      descriptionParts.push(child);
      continue;
    }
    
    if (React.isValidElement(child)) {
      const childText = getAllText([child]);
      
      if (childText.includes(':')) {
        // Colon inside the element
        if (child.props?.children) {
          const innerChildren = React.Children.toArray(child.props.children);
          const innerText = getAllText(innerChildren);
          const colonIndex = innerText.indexOf(':');
          
          const titleText = innerText.substring(0, colonIndex).trim();
          const afterColonText = innerText.substring(colonIndex + 1).trim();
          
          titlePart = (
            <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              {titleText}
            </div>
          );
          
          if (afterColonText) {
             descriptionParts.push(<span key="after-colon">{afterColonText} </span>);
          }
          
          foundSplit = true;
          
          // Add remaining siblings to description
          const remaining = filteredChildren.slice(i + 1);
          descriptionParts.push(...remaining);
          break;
        }
      } else {
        // Check if next sibling starts with colon
        const nextChild = filteredChildren[i + 1];
        if (typeof nextChild === 'string' && nextChild.trim().startsWith(':')) {
             titlePart = (
                <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {child}
                </div>
             );
             
             const afterColon = nextChild.replace(/^:\s*/, '');
             if (afterColon) {
               descriptionParts.push(<span key="after-colon-text">{afterColon}</span>);
             }
             
             descriptionParts.push(...filteredChildren.slice(i + 2));
             foundSplit = true;
             break;
        }
      }
    } else if (typeof child === 'string') {
      if (child.includes(':')) {
         // Colon in text node
         const colonIndex = child.indexOf(':');
         const titleText = child.substring(0, colonIndex).trim();
         const afterColonText = child.substring(colonIndex + 1).trim();
         
         titlePart = (
            <div className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              {titleText}
            </div>
         );
         
         if (afterColonText) {
           descriptionParts.push(<span key="after-colon-string">{afterColonText} </span>);
         }
         
         descriptionParts.push(...filteredChildren.slice(i + 1));
         foundSplit = true;
         break;
      }
    }
  }
  
  if (foundSplit && titlePart) {
    return (
      <div className="flex flex-col">
        {titlePart}
        <div className="text-sm font-normal text-gray-600 dark:text-gray-400 leading-relaxed">
          {descriptionParts}
        </div>
      </div>
    );
  }
  
  // If no split found, render as is
  return <div className="text-base font-normal text-gray-700 dark:text-gray-300">{filteredChildren}</div>;
}
