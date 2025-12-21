import Link from 'next/link';
import React from 'react';
import { getCategoryColors } from '@/lib/category-colors';

interface Service {
  name: string;
  description?: string; // Kept for backward compatibility
  leadText?: string;
  features?: string[];
  href: string;
  icon: React.ElementType;
  buttonText: string;
}

interface ServiceCardGridProps {
  services: Service[];
  title: string;
  category?: string;
  description?: string;
  padding?: 'default' | 'top-compact';
  background?: 'gray' | 'white';
}

const ServiceCardGrid = ({ 
  services, 
  title, 
  category = 'default',
  description, 
  padding = 'default', 
  background = 'gray' 
}: ServiceCardGridProps) => {
  const colors = getCategoryColors(category);
  const paddingClasses = padding === 'top-compact'
    ? 'pt-16 sm:pt-24 pb-20 sm:pb-32'
    : 'py-20 sm:py-32';
  
  const bgClass = background === 'gray' ? 'bg-gray-50 dark:bg-[#061423]' : 'bg-white dark:bg-gray-900';
  // Generate section ID from title - handle special characters and colons
  const sectionId = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // Determine grid columns based on number of services
  const getGridCols = () => {
    const count = services.length;
    if (count === 3) {
      return 'lg:grid-cols-3';
    } else if (count === 2) {
      return 'lg:grid-cols-2';
    } else if (count === 1) {
      return 'lg:grid-cols-1';
    } else {
      return 'lg:grid-cols-4';
    }
  };

  return (
    <section id={sectionId} data-section-id={sectionId} data-section-title={title} className={`${bgClass} ${paddingClasses}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description || "We offer a comprehensive suite of digital marketing services designed to elevate your brand and drive measurable results."}
          </p>
        </div>
        <div className={`mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none ${getGridCols()} lg:gap-8`}>
          {services.map((service) => (
            <div key={service.name} className="flex flex-col items-start justify-between rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700/50">
              <div className="relative flex items-center gap-x-4">
                <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-lg ${colors.bgAccent}`}>
                  <service.icon className={`h-8 w-8`} style={{ color: colors.borderAccentColor }} aria-hidden="true" suppressHydrationWarning />
                </div>
                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white no-hyphen-break" suppressHydrationWarning>{service.name}</h3>
              </div>
              {service.leadText && <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.leadText}</p>}
              {service.features && service.features.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex gap-x-2">
                      <span style={{ color: colors.borderAccentColor }} suppressHydrationWarning>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {service.description && <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.description}</p>}
              <div className="mt-6">
                <Link 
                  href={service.href} 
                  className={`text-sm font-semibold leading-6 transition-colors duration-200 no-hyphen-break`}
                  style={{ color: colors.borderAccentColor }}
                  suppressHydrationWarning
                >
                  {service.buttonText} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCardGrid;
