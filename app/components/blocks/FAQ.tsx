'use client';
import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQProps {
  title: string;
  description: string;
  faqs: FAQItem[];
  ctaText?: string;
  ctaButtonText?: string;
  background?: 'gray' | 'white';
  categoriesLabel?: string;
}

export default function FAQ({ title, description, faqs, ctaText, ctaButtonText, background = 'white', categoriesLabel }: FAQProps) {
    if (!faqs || faqs.length === 0) {
        return null;
    }
    const categories = Array.from(new Set(faqs.map(faq => faq.category)));
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [openQuestion, setOpenQuestion] = useState<number | null>(0);

    const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);
    const bgClass = background === 'gray' ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-900';

    return (
        <div className={`${bgClass} py-24 sm:py-32`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>{title}</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        {description}
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-4">
                    <div className="col-span-1">
                        <p className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">{categoriesLabel || 'Categories'}</p>
                        <ul role="list" className="mt-4 space-y-2">
                            {categories.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setOpenQuestion(0);
                                        }}
                                        className={`w-full text-left p-3 rounded-md text-base leading-7 transition-colors duration-200 ${activeCategory === category
                                            ? 'bg-indigo-600 text-white shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-3">
                        {categories.map(category => (
                            <div key={category} className={activeCategory !== category ? 'hidden' : ''}>
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {faqs
                                        .filter(faq => faq.category === category)
                                        .map((faq, index) => (
                                            <div key={faq.question} className="py-6">
                                                <h3 className="text-base font-semibold leading-7" suppressHydrationWarning>
                                                    <button
                                                        onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                                                        className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white group"
                                                    >
                                                        <span className={`transition-colors duration-200 ${openQuestion === index ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>{faq.question}</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            <ChevronRightIcon
                                                                className={`h-6 w-6 transform transition-transform duration-300 ${openQuestion === index ? 'rotate-90 text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}`}
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </button>
                                                </h3>
                                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openQuestion === index ? 'max-h-96 mt-2 pr-12' : 'max-h-0'}`}>
                                                    <p className="text-base leading-7 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-20 text-center">
                    <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">{ctaText || "Ready to elevate your digital presence? Let's discuss your project."}</p>
                    <div className="mt-6">
                        <a
                            href="#"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <span className="transition-transform duration-300 group-hover:-translate-x-4">
                                {ctaButtonText || "Schedule a Free Consultation"}
                            </span>
                            <span aria-hidden="true" className="absolute right-6 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                &gt;
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
  