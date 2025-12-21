'use client';

import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { getCategoryColors } from '@/lib/category-colors';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQProps {
  title: string;
  description: string;
  faqs: FAQItem[];
  category?: string;
  ctaText?: string;
  ctaButtonText?: string;
  background?: 'gray' | 'white';
  categoriesLabel?: string;
}

export default function FAQ({ 
    title, 
    description, 
    faqs, 
    category: serviceCategory = 'default',
    ctaText, 
    ctaButtonText, 
    background = 'white', 
    categoriesLabel 
}: FAQProps) {
    const colors = getCategoryColors(serviceCategory);
    if (!faqs || faqs.length === 0) {
        return null;
    }
    const categories = Array.from(new Set(faqs.map(faq => faq.category)));
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [openQuestion, setOpenQuestion] = useState<number | null>(0);

    const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);
    const bgClass = background === 'gray' ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-900';
    // Generate section ID from title - handle special characters and colons
    const sectionId = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '') || 'faq'; // Remove leading/trailing hyphens

    return (
        <div id={sectionId} data-section-id={sectionId} data-section-title={title} className={`${bgClass} py-24 sm:py-32`} suppressHydrationWarning>
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
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => {
                                            setActiveCategory(cat);
                                            setOpenQuestion(0);
                                        }}
                                        className={`w-full text-left p-3 rounded-md text-base leading-7 transition-colors duration-200 ${activeCategory === cat
                                            ? 'text-white shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }`}
                                        style={activeCategory === cat ? { backgroundColor: colors.borderAccentColor } : {}}
                                        suppressHydrationWarning
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-3">
                        {categories.map(cat => (
                            <div key={cat} className={activeCategory !== cat ? 'hidden' : ''}>
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {faqs
                                        .filter(faq => faq.category === cat)
                                        .map((faq, index) => (
                                            <div key={faq.question} className="py-6">
                                                <h3 className="text-base font-semibold leading-7" suppressHydrationWarning>
                                                    <button
                                                        onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                                                        className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white group"
                                                    >
                                                        <span 
                                                            className={`transition-colors duration-200`}
                                                            style={openQuestion === index ? { color: colors.borderAccentColor } : {}}
                                                            suppressHydrationWarning
                                                        >
                                                            {faq.question}
                                                        </span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            <ChevronRightIcon
                                                                className={`h-6 w-6 transform transition-transform duration-300`}
                                                                style={openQuestion === index ? { color: colors.borderAccentColor } : {}}
                                                                aria-hidden="true"
                                                                suppressHydrationWarning
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
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300"
                            style={{ backgroundColor: colors.borderAccentColor }}
                            suppressHydrationWarning
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
  