import React from 'react';
import { getCategoryColors } from '@/lib/category-colors';
import PixelBlastBackground from '@/app/components/blocks/PixelBlastBackground';

interface Stat {
  name: string;
  value: string;
}

interface StatsGridProps {
  title: string;
  description: string;
  stats: Stat[];
  category?: string;
  padding?: 'default' | 'top-compact';
  background?: 'gray' | 'dark';
  showPixelBlast?: boolean;
}

const StatsGrid = ({ 
    title, 
    description, 
    stats, 
    category = 'default',
    padding = 'default', 
    background = 'dark', 
    showPixelBlast = false 
}: StatsGridProps) => {
    const colors = getCategoryColors(category);
    const paddingClasses = padding === 'top-compact'
    ? 'pt-16 sm:pt-24 pb-24 sm:pb-32'
    : 'py-24 sm:py-32';
  // Generate section ID from title - handle special characters and colons
  const sectionId = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    return (
        <div id={sectionId} data-section-id={sectionId} data-section-title={title} className={`relative isolate overflow-hidden bg-gray-900 ${paddingClasses}`}>
            {showPixelBlast && (
                <div className="absolute inset-0">
                    <PixelBlastBackground />
                </div>
            )}
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" suppressHydrationWarning>{title}</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">{description}</p>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {stats.map((stat) => (
                            <div 
                                key={stat.name} 
                                className={`flex flex-col-reverse rounded-lg p-6 text-center transition-all duration-300 hover:scale-105 shadow-lg`}
                                style={{ backgroundColor: colors.borderAccentColor }}
                                suppressHydrationWarning
                            >
                                <dt className="text-sm leading-6 text-white/90 font-medium">{stat.name}</dt>
                                <dd className="text-3xl font-bold leading-8 tracking-tight text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default StatsGrid;
