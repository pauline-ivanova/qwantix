import {
    BuildingOffice2Icon,
    CodeBracketSquareIcon,
    ShoppingCartIcon,
    BanknotesIcon,
    HeartIcon,
    TrophyIcon,
    SunIcon,
    SparklesIcon,
    AcademicCapIcon,
    CakeIcon
  } from '@heroicons/react/24/outline'

const industriesEn = [
  {
    name: 'E-commerce',
    description: 'Boost online sales and improve user experience with our analytics-based search optimization and PPC strategies.',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Health & Beauty',
    description: 'Enhance your online presence and attract more clients through targeted social media campaigns and content marketing.',
    icon: HeartIcon,
  },
  {
    name: 'Fitness',
    description: 'Grow your client base and increase engagement with innovative digital marketing solutions for gyms and fitness professionals.',
    icon: TrophyIcon,
  },
  {
      name: 'Restaurants & Cafes',
      description: 'Increase foot traffic and online orders with local SEO optimization and engaging social media management.',
      icon: CakeIcon,
  },
  {
      name: 'Technology',
      description: 'Stand out in the competitive tech landscape with cutting-edge digital strategies and thought leadership content.',
      icon: CodeBracketSquareIcon,
  },
  {
      name: 'Fashion',
      description: 'Showcase your brand and products with visually stunning campaigns and influencer partnerships.',
      icon: SparklesIcon,
  },
  {
      name: 'Travel & Hospitality',
      description: 'Attract more bookings and enhance customer experience with SEO-optimized content and targeted advertising.',
      icon: BuildingOffice2Icon,
  },
    {
        name: 'Education',
        description: 'Reach potential students and increase enrollments through strategic content marketing and PPC campaigns.',
        icon: AcademicCapIcon,
    }
]

const industriesEs = [
  {
    name: 'E‑commerce',
    description: 'Impulsa las ventas online y mejora la UX con SEO y PPC basados en datos.',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Salud y belleza',
    description: 'Refuerza tu presencia online y atrae más clientes con campañas en redes y contenido.',
    icon: HeartIcon,
  },
  {
    name: 'Fitness',
    description: 'Haz crecer tu base de clientes con soluciones de marketing digital para gimnasios y coaches.',
    icon: TrophyIcon,
  },
  {
      name: 'Restaurantes y cafeterías',
      description: 'Aumenta visitas y pedidos con SEO local y gestión de redes sociales efectiva.',
      icon: CakeIcon,
  },
  {
      name: 'Tecnología',
      description: 'Destaca en un mercado competitivo con estrategias digitales de vanguardia y contenido experto.',
      icon: CodeBracketSquareIcon,
  },
  {
      name: 'Moda',
      description: 'Muestra tu marca y productos con campañas visuales y colaboraciones con influencers.',
      icon: SparklesIcon,
  },
  {
      name: 'Viajes y hostelería',
      description: 'Consigue más reservas y mejora la experiencia con contenido SEO y anuncios segmentados.',
      icon: BuildingOffice2Icon,
  },
    {
        name: 'Educación',
        description: 'Llega a estudiantes potenciales y aumenta inscripciones con contenido y PPC estratégicos.',
        icon: AcademicCapIcon,
    }
]

const industriesDe = [
  {
    name: 'E‑Commerce',
    description: 'Steigern Sie Online‑Umsätze und UX mit Analytics‑basiertem SEO und PPC.',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Health & Beauty',
    description: 'Mehr Sichtbarkeit und Kunden dank gezielter Social‑Media‑Kampagnen und Content.',
    icon: HeartIcon,
  },
  {
    name: 'Fitness',
    description: 'Wachsen Sie mit digitalen Lösungen für Studios, Coaches und Programme.',
    icon: TrophyIcon,
  },
  {
    name: 'Restaurants & Cafés',
    description: 'Mehr Laufkundschaft und Bestellungen via Local‑SEO und Social‑Kampagnen.',
    icon: CakeIcon,
  },
  {
    name: 'Technologie',
    description: 'Heben Sie sich mit modernen Digital‑Strategien und Thought‑Leadership‑Content ab.',
    icon: CodeBracketSquareIcon,
  },
  {
    name: 'Fashion',
    description: 'Präsentieren Sie Marke und Produkte mit starken Visuals und Creator‑Partnerschaften.',
    icon: SparklesIcon,
  },
  {
    name: 'Reisen & Hospitality',
    description: 'Mehr Buchungen und bessere Experience mit SEO‑Content und gezielter Werbung.',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'Bildung',
    description: 'Erreichen Sie Studierende und erhöhen Sie Anmeldungen mit Content und PPC.',
    icon: AcademicCapIcon,
  }
]

import ruDict from '@/dictionaries/ru.json'

const industriesRu = [
  {
    name: 'E‑commerce',
    description: 'Увеличивайте онлайн‑продажи и улучшайте UX с SEO и PPC на основе аналитики.',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Красота и здоровье',
    description: 'Усиливайте присутствие онлайн и привлекайте клиентов с помощью SMM и контента.',
    icon: HeartIcon,
  },
  {
    name: 'Фитнес',
    description: 'Растите клиентскую базу с цифровыми решениями для залов и тренеров.',
    icon: TrophyIcon,
  },
  {
      name: 'Рестораны и кафе',
      description: 'Больше гостей и заказов благодаря локальному SEO и управлению соцсетями.',
      icon: CakeIcon,
  },
  {
      name: 'Технологии',
      description: 'Выделяйтесь в конкурентной среде с современными digital‑стратегиями и экспертным контентом.',
      icon: CodeBracketSquareIcon,
  },
  {
      name: 'Мода',
      description: 'Показывайте бренд и продукты через визуальные кампании и коллаборации с создателями.',
      icon: SparklesIcon,
  },
  {
      name: 'Путешествия и гостеприимство',
      description: 'Привлекайте больше бронирований с SEO‑контентом и таргетированной рекламой.',
      icon: BuildingOffice2Icon,
  },
  {
      name: 'Образование',
      description: 'Привлекайте абитуриентов и увеличивайте заявки через контент и PPC‑кампании.',
      icon: AcademicCapIcon,
  }
]

export default function IndustrySolutions({ lang = 'en' }: { lang?: string }) {
  const isEs = lang === 'es';
  const isDe = lang === 'de';
  const isRu = lang === 'ru';
  const industries = isEs ? industriesEs : isDe ? industriesDe : isRu ? industriesRu : industriesEn;
  const ru = (ruDict as any)?.home?.industrySolutions;
  return (
    <div className="bg-white dark:bg-[#061423] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-200">{isEs ? 'Soluciones por industria' : isDe ? 'Lösungen nach Branche' : isRu ? (ru?.eyebrow ?? 'Решения по отраслям') : 'Industry Solutions'}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl no-hyphen-break" suppressHydrationWarning>
            {isEs ? 'Soluciones digitales a medida para cada sector' : isDe ? 'Maßgeschneiderte digitale Lösungen für jede Branche' : isRu ? (ru?.title ?? 'Цифровые решения под задачи каждой отрасли') : 'Tailored Digital Solutions Across Industries'}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-100">
           {isEs ? 'En Qwantix entendemos que cada sector tiene retos digitales únicos. Nuestra experiencia en múltiples industrias nos permite ofrecer estrategias personalizadas que generan resultados.' : isDe ? 'Jede Branche hat eigene digitale Herausforderungen. Unsere Erfahrung in vielen Sektoren ermöglicht individuelle Strategien, die Ergebnisse liefern.' : isRu ? (ru?.description ?? 'Каждая отрасль сталкивается с уникальными digital‑вызовами. Наш опыт в разных сферах помогает создавать стратегии, которые дают результат.') : 'At Qwantix, we understand that each industry faces unique digital challenges. Our expertise spans across various sectors, allowing us to deliver customized strategies that drive results.'}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {(isRu && Array.isArray(ru?.items) ? (ru!.items as any[]).map((it, idx) => ({...industries[idx], name: it.name ?? industries[idx]?.name, description: it.description ?? industries[idx]?.description })) : industries).map((industry) => (
              <div key={industry.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                      <industry.icon className="h-8 w-8 flex-none text-indigo-600 dark:text-indigo-200" aria-hidden="true" />
                      <h3 suppressHydrationWarning>{industry.name}</h3>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-100">
                      <p className="flex-auto">{industry.description}</p>
                  </dd>
              </div>
            ))}
          </dl>
          {/* We might add a button here later if needed */}
        </div>
      </div>
    </div>
  )
}
