import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { getCategoryColors } from '@/lib/category-colors';

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
}

interface FeatureListProps {
  title: string;
  description: string;
  features: Feature[];
  category?: string;
  padding?: 'default' | 'top-compact';
  background?: 'white' | 'transparent';
}

const FeatureList = ({ 
  title, 
  description, 
  features, 
  category = 'default',
  padding = 'default', 
  background = 'white' 
}: FeatureListProps) => {
  const colors = getCategoryColors(category);
  const paddingClasses = padding === 'top-compact'
    ? 'pt-16 sm:pt-24 pb-24 sm:pb-32'
    : 'py-24 sm:py-32';
  const bgClass = background === 'transparent' ? 'bg-transparent' : 'bg-white dark:bg-gray-900';
  // Generate section ID from title - handle special characters and colons
  const sectionId = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  return (
    <div id={sectionId} data-section-id={sectionId} data-section-title={title} className={`${bgClass} ${paddingClasses}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg shadow-sm`} style={{ backgroundColor: colors.borderAccentColor }} suppressHydrationWarning>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg" suppressHydrationWarning>{feature.name}</h3>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FeatureList;
