import React from 'react';
import AuroraBackground from '@/app/components/blocks/AuroraBackground';
import { getCategoryColors } from '@/lib/category-colors';

interface ServicePageLayoutProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
}

const ServicePageLayout = ({ title, description, category, children }: ServicePageLayoutProps) => {
  const colors = getCategoryColors(category);
  
  return (
    <>
      {/* Hero Section */}
      <div id="hero" className={`relative isolate bg-gradient-to-b ${colors.heroGradient} overflow-hidden`}>
        <AuroraBackground blendMode="overlay" category={category} />
        {/* Top-left darkening overlay for better logo visibility on bright backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.3)_0%,transparent_50%)] pointer-events-none z-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
            <div className="text-left">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl" style={{ textWrap: 'balance' }} suppressHydrationWarning>{title}</h1>
                <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl">{description}</p>
                <div className="mt-10 flex items-center justify-start gap-x-6">
                    <a
                        href="#"
                        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-300`}
                        style={{ backgroundColor: colors.borderAccentColor }}
                        suppressHydrationWarning
                    >
                         <span className="transition-transform duration-300 group-hover:-translate-x-4">
                            Get a Free Strategy Session
                         </span>
                         <span aria-hidden="true" className="absolute right-6 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                             &gt;
                         </span>
                    </a>
                </div>
            </div>
        </div>
        <div
            className="absolute z-10 bottom-0 left-0 w-full h-20"
            style={{ transform: 'translateY(1px)' }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
              <path
                className="fill-white dark:fill-gray-900"
                fillOpacity="1"
                d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white dark:bg-gray-900">
        {children}
      </div>
    </>
  );
};

export default ServicePageLayout;
