import {
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { getCategoryColors } from '@/lib/category-colors';

interface Step {
    name: string;
    description: string;
    icon?: React.ElementType;
}

interface ProcessStepsProps {
    title: string;
    description: string;
    steps: Step[];
    category?: string;
    conclusion?: string;
    padding?: 'default' | 'top-compact';
    buttonText?: string;
}

const ProcessSteps = ({ 
    title, 
    description, 
    steps, 
    category = 'default',
    conclusion, 
    padding = 'default', 
    buttonText 
}: ProcessStepsProps) => {
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
        <div id={sectionId} data-section-id={sectionId} data-section-title={title} className={`bg-gray-50 dark:bg-gray-900 ${paddingClasses}`} suppressHydrationWarning>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl" suppressHydrationWarning>{title}</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        {description}
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-none grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.name} className={`relative ${Icon ? 'pl-16' : ''}`}>
                                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                        {Icon && (
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg shadow-sm" style={{ backgroundColor: colors.borderAccentColor }} suppressHydrationWarning>
                                                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </div>
                                        )}
                                        <h3 className="text-lg" suppressHydrationWarning>{step.name}</h3>
                                    </dt>
                                    <dd className={`mt-2 text-base leading-7 text-gray-600 dark:text-gray-300 ${!Icon ? 'ml-4 border-l-2 pl-4 border-gray-200 dark:border-gray-700' : ''}`}>{step.description}</dd>
                                </div>
                            )
                        })}
                    </dl>
                </div>
                {conclusion && (
                    <div className="mt-16 mx-auto max-w-2xl text-center">
                        <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
                            {conclusion}
                        </p>
                    </div>
                )}
                <div className={`flex items-center justify-center gap-x-6 ${conclusion ? 'mt-10' : 'mt-16'}`}>
                    <a
                        href="#"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300"
                        style={{ backgroundColor: colors.borderAccentColor }}
                        suppressHydrationWarning
                    >
                        <span className="transition-transform duration-300 group-hover:-translate-x-4">
                            {buttonText || 'Discuss Your Project'}
                        </span>
                        <span aria-hidden="true" className="absolute right-6 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                            &gt;
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProcessSteps;
