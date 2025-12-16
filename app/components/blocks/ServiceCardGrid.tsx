import Link from 'next/link';
import React from 'react';

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
  description?: string;
  padding?: 'default' | 'top-compact';
  background?: 'gray' | 'white';
}

const ServiceCardGrid: React.FC<ServiceCardGridProps> = ({ services, title, description, padding = 'default', background = 'gray' }) => {
  const paddingClasses = padding === 'top-compact'
    ? 'pt-16 sm:pt-24 pb-20 sm:pb-32'
    : 'py-20 sm:py-32';
  
  const bgClass = background === 'gray' ? 'bg-gray-50 dark:bg-[#061423]' : 'bg-white dark:bg-gray-900';

  return (
    <section className={`${bgClass} ${paddingClasses}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description || "We offer a comprehensive suite of digital marketing services designed to elevate your brand and drive measurable results."}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {services.map((service) => (
            <div key={service.name} className="flex flex-col items-start justify-between rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative flex items-center gap-x-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                  <service.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white no-hyphen-break" suppressHydrationWarning>{service.name}</h3>
              </div>
              {service.leadText && <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.leadText}</p>}
              {service.features && service.features.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex gap-x-2">
                      <span className="text-indigo-600 dark:text-indigo-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {service.description && <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.description}</p>}
              <div className="mt-6">
                <Link href={service.href} className="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 no-hyphen-break">
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
