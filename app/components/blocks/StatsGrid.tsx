import React from 'react';

interface Stat {
  name: string;
  value: string;
}

interface StatsGridProps {
  title: string;
  description: string;
  stats: Stat[];
  padding?: 'default' | 'top-compact';
  background?: 'gray' | 'dark';
  showPixelBlast?: boolean;
}

import PixelBlastBackground from '@/app/components/blocks/PixelBlastBackground';

const StatsGrid: React.FC<StatsGridProps> = ({ title, description, stats, padding = 'default', background = 'dark', showPixelBlast = false }) => {
  const paddingClasses = padding === 'top-compact'
    ? 'pt-16 sm:pt-24 pb-24 sm:pb-32'
    : 'py-24 sm:py-32';

    return (
        <div className={`relative isolate overflow-hidden bg-gray-900 ${paddingClasses}`}>
            {showPixelBlast && (
                <div className="absolute inset-0">
                    <PixelBlastBackground />
                </div>
            )}
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">{description}</p>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse rounded-lg bg-indigo-600 p-6 text-center hover:bg-indigo-500 transition-colors duration-300">
                                <dt className="text-sm leading-6 text-white font-medium">{stat.name}</dt>
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
