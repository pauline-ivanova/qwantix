import React from 'react';

export const mdxComponents = {
  h2: (props: any) => (
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-16 mb-8 border-b pb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold tracking-tight text-gray-900 mt-10 mb-4" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg leading-8 text-gray-600" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc space-y-2 pl-6" {...props} />
  ),
  li: (props: any) => (
    <li className="text-lg leading-8 text-gray-600 pl-2" {...props} />
  ),
};



