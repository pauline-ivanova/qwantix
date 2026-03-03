'use client'

import { useState, useMemo } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  market: string;
  focus: string[];
  challenge: string;
  action: string;
  outcome: string;
}

const caseStudies: CaseStudy[] = [
  // SEO Migrations & Recovery
  {
    id: 'german-pet-insurance',
    title: 'German Pet Insurance Platform',
    industry: 'Finance & Insurance',
    market: 'Germany (EU)',
    focus: ['SEO Migrations & Recovery'],
    challenge: 'A large-scale structural update caused an overnight loss of ~80% of organic visibility across commercial pages.',
    action: 'Conducted a full technical audit, rebuilt URL architecture, resolved internal linking and indexation issues, and reinforced E-E-A-T signals across key templates.',
    outcome: 'Core keywords recovered to Top 3–5 positions, with non-brand organic traffic growing +230% month over month.'
  },
  {
    id: 'international-ecommerce',
    title: 'International E-commerce Brand',
    industry: 'E-commerce',
    market: 'EU / Multi-market',
    focus: ['SEO Migrations & Recovery'],
    challenge: 'Platform migration introduced crawl inefficiencies and keyword cannibalisation across multiple locales.',
    action: 'Led migration QA, harmonised hreflang and URL logic, and restructured category-level internal linking.',
    outcome: 'Stable rankings post-migration, improved indexation consistency, and restored category-level visibility.'
  },
  // Local & Service-Based SEO
  {
    id: 'private-ultrasound',
    title: 'Private Ultrasound Clinic',
    industry: 'Healthcare & Medical',
    market: 'London (UK)',
    focus: ['Local & Service-Based SEO'],
    challenge: 'Weak local visibility and lack of medical trust signals across core service pages.',
    action: 'Rebuilt service hierarchy, implemented MedicalService structured data, optimised internal linking, and improved mobile performance.',
    outcome: 'Consistent Top 3 local rankings and +65% increase in organic appointment bookings.'
  },
  {
    id: 'multi-location-medical',
    title: 'Multi-Location Medical Practice',
    industry: 'Healthcare & Medical',
    market: 'UK',
    focus: ['Local & Service-Based SEO'],
    challenge: 'Fragmented local presence and inconsistent service page structure across locations.',
    action: 'Standardised local templates, strengthened location-based internal linking, and aligned content with patient search intent.',
    outcome: 'Improved local pack visibility and higher conversion rates from organic traffic.'
  },
  {
    id: 'us-mortgage-brokerage',
    title: 'US Mortgage Brokerage',
    industry: 'Finance & Insurance',
    market: 'Arizona (US)',
    focus: ['Local & Service-Based SEO'],
    challenge: 'Limited search reach due to a single-page website structure.',
    action: 'Migrated the site to WordPress and launched 30+ Service + City landing pages mapped to transactional intent.',
    outcome: '+200% increase in local impressions and +150% growth in qualified inbound enquiries.'
  },
  // Enterprise & Multi-Market SEO
  {
    id: 'b2b-data-analytics',
    title: 'B2B Data & Analytics Consultancy',
    industry: 'B2B SaaS & Technology',
    market: 'California (US)',
    focus: ['Enterprise & Multi-Market SEO'],
    challenge: 'High expertise but poor alignment with how decision-makers search for solutions.',
    action: 'Designed an entity-based content structure (Solutions ↔ Use Cases ↔ Industries) and improved semantic coverage.',
    outcome: 'Broader keyword footprint and steady, compounding organic growth.'
  },
  {
    id: 'enterprise-software-provider',
    title: 'Enterprise Software Provider',
    industry: 'B2B SaaS & Technology',
    market: 'US / EU',
    focus: ['Enterprise & Multi-Market SEO'],
    challenge: 'Complex product offering spread across markets with overlapping keyword intent.',
    action: 'Introduced content governance rules, reduced cannibalisation, and aligned page intent across regions.',
    outcome: 'Clearer topical authority signals and improved non-brand visibility across priority markets.'
  },
  // EEAT & YMYL SEO
  {
    id: 'medical-services-brand',
    title: 'Medical Services Brand',
    industry: 'Healthcare & Medical',
    market: 'EU',
    focus: ['EEAT & YMYL SEO'],
    challenge: 'Visibility volatility following core algorithm updates in a YMYL space.',
    action: 'Strengthened author entities, clarified medical review processes, and expanded structured data coverage.',
    outcome: 'Improved trust signals and gradual recovery of lost rankings.'
  },
  {
    id: 'financial-services-website',
    title: 'Financial Services Website',
    industry: 'Finance & Insurance',
    market: 'US',
    focus: ['EEAT & YMYL SEO'],
    challenge: 'Informational content lacked credibility and failed to support commercial pages.',
    action: 'Reworked content hierarchy, reinforced expertise signals, and improved internal linking between informational and transactional pages.',
    outcome: 'Stronger topical authority and increased qualified organic traffic.'
  },
  // Content & Semantic Strategy
  {
    id: 'professional-services-consultancy',
    title: 'Professional Services Consultancy',
    industry: 'Professional Services',
    market: 'UK',
    focus: ['Content & Semantic Strategy'],
    challenge: 'Expertise-heavy content did not align with commercial search intent.',
    action: 'Mapped MOFU/BOFU topics, restructured service pages, and improved semantic clarity.',
    outcome: 'Higher engagement and improved conversion rates from organic sessions.'
  },
  // Multilingual & Localisation SEO
  {
    id: 'international-service-brand',
    title: 'International Service Brand',
    industry: 'Professional Services',
    market: 'UK, US, EU',
    focus: ['Multilingual & Localisation SEO'],
    challenge: 'Direct translations underperformed in non-English markets.',
    action: 'Localised content based on market-specific search intent across EN, ES, and DE.',
    outcome: 'Improved engagement metrics and stronger organic visibility across secondary markets.'
  },
  // Additional from doc
  {
    id: 'medical-services-recovery',
    title: 'Medical Services Website — Recovery After Core Updates',
    industry: 'Healthcare & Medical',
    market: 'EU / UK',
    focus: ['SEO Migrations & Recovery', 'EEAT & YMYL SEO'],
    challenge: 'Significant volatility and loss of visibility following multiple core updates in a YMYL niche.',
    action: 'Audited content quality, clarified medical authorship and review processes, improved internal linking, and reinforced EEAT signals across key pages.',
    outcome: 'Stabilised rankings and gradual recovery of non-brand visibility across priority medical queries.'
  },
  {
    id: 'static-to-wordpress',
    title: 'Service Business — Static Site to WordPress Migration',
    industry: 'Professional Services',
    market: 'US',
    focus: ['SEO Migrations & Recovery'],
    challenge: 'Legacy static website limited content scalability and organic growth.',
    action: 'Led SEO-safe migration to WordPress, restructured information architecture, and mapped existing URLs to preserve equity.',
    outcome: 'No traffic loss during migration and improved indexation flexibility for future growth.'
  },
  {
    id: 'cctld-migration',
    title: 'International Brand — ccTLD-Based Migration Strategy',
    industry: 'Professional Services',
    market: 'EU / UK / US',
    focus: ['SEO Migrations & Recovery'],
    challenge: 'Fragmented international setup using multiple ccTLDs with inconsistent SEO signals.',
    action: 'Reviewed cross-domain architecture, internal linking, and market-level keyword targeting.',
    outcome: 'Improved clarity between markets and stronger regional visibility without consolidation risks.'
  },
  {
    id: 'city-level-medical',
    title: 'City-Level Medical Services Pages',
    industry: 'Healthcare & Medical',
    market: 'UK',
    focus: ['Local & Service-Based SEO'],
    challenge: 'Core services lacked location-level relevance in competitive urban SERPs.',
    action: 'Designed city-focused service templates aligned with patient search intent and local trust signals.',
    outcome: 'Expanded local keyword footprint and improved conversion rates from organic traffic.'
  },
  {
    id: 'urban-services-rebuild',
    title: 'Competitive Urban Services Market — Local SEO Rebuild',
    industry: 'Professional Services',
    market: 'EU',
    focus: ['Local & Service-Based SEO'],
    challenge: 'High competition and weak differentiation in local organic and map results.',
    action: 'Reworked service positioning, improved local on-page signals, and aligned content with transactional intent.',
    outcome: 'Improved visibility for high-intent local queries and stronger inbound lead quality.'
  },
  {
    id: 'service-area-no-address',
    title: 'Service-Area Business Without Physical Address',
    industry: 'Professional Services',
    market: 'US',
    focus: ['Local & Service-Based SEO'],
    challenge: 'Limited eligibility for local visibility due to lack of physical location.',
    action: 'Built a service-area–focused SEO strategy with intent-driven landing pages and internal linking.',
    outcome: 'Increased organic enquiries despite absence of a brick-and-mortar location.'
  },
  {
    id: 'enterprise-governance',
    title: 'Enterprise Content Governance Framework',
    industry: 'B2B SaaS & Technology',
    market: 'EU / US',
    focus: ['Enterprise & Multi-Market SEO'],
    challenge: 'Content production at scale led to duplication and inconsistent keyword targeting.',
    action: 'Defined content governance rules, intent mapping, and editorial standards for internal teams.',
    outcome: 'Reduced cannibalisation and clearer topical authority across priority themes.'
  },
  {
    id: 'cannibalisation-resolution',
    title: 'Keyword Cannibalisation Resolution at Scale',
    industry: 'B2B SaaS & Technology',
    market: 'Multi-market',
    focus: ['Enterprise & Multi-Market SEO'],
    challenge: 'Multiple pages competing for the same commercial queries across markets.',
    action: 'Consolidated content, clarified page intent, and restructured internal linking.',
    outcome: 'Improved ranking stability and stronger performance for core commercial pages.'
  },
  {
    id: 'author-entity-framework',
    title: 'Author Entity Framework for Medical Content',
    industry: 'Healthcare & Medical',
    market: 'EU',
    focus: ['EEAT & YMYL SEO'],
    challenge: 'Medical content lacked clear expert attribution and trust signals.',
    action: 'Built author entity profiles, clarified credentials, and aligned content with medical review standards.',
    outcome: 'Stronger EEAT footprint and improved confidence signals for both users and search engines.'
  },
  {
    id: 'financial-trust-rebuild',
    title: 'Financial Content — Trust-Led SEO Rebuild',
    industry: 'Finance & Insurance',
    market: 'US',
    focus: ['EEAT & YMYL SEO'],
    challenge: 'Informational pages underperformed due to weak credibility signals.',
    action: 'Reworked content hierarchy, reinforced expertise indicators, and aligned informational content with commercial intent.',
    outcome: 'Improved engagement and increased qualified organic traffic.'
  },
  {
    id: 'entity-clustering-b2b',
    title: 'Entity-Based Topic Clustering for B2B Services',
    industry: 'B2B SaaS & Technology',
    market: 'US',
    focus: ['Content & Semantic Strategy'],
    challenge: 'High-value topics were fragmented across disconnected pages.',
    action: 'Built an entity-driven cluster model connecting services, use cases, and industries.',
    outcome: 'Broader keyword coverage and stronger topical relevance.'
  },
  {
    id: 'mofu-bofu-support',
    title: 'MOFU / BOFU Content Supporting Sales Pages',
    industry: 'Professional Services',
    market: 'EU',
    focus: ['Content & Semantic Strategy'],
    challenge: 'Traffic-heavy informational content failed to support conversions.',
    action: 'Introduced MOFU and BOFU content aligned with sales journeys and internal linking paths.',
    outcome: 'Improved lead quality and stronger contribution from organic traffic.'
  },
  {
    id: 'market-adaptive-localisation',
    title: 'Market-Adaptive SEO Localisation',
    industry: 'Professional Services',
    market: 'UK / US / EU',
    focus: ['Multilingual & Localisation SEO'],
    challenge: 'Literal translations failed to match local search intent.',
    action: 'Reworked content per market, aligning terminology, structure, and intent across EN, ES, and DE.',
    outcome: 'Higher engagement and improved visibility in non-English markets.'
  },
  {
    id: 'language-cannibalisation',
    title: 'Language-Based Cannibalisation Fix',
    industry: 'Professional Services',
    market: 'EU',
    focus: ['Multilingual & Localisation SEO'],
    challenge: 'Overlapping keyword targeting between language versions.',
    action: 'Clarified language intent, adjusted internal linking, and refined keyword mapping.',
    outcome: 'Cleaner SERP signals and improved performance per language.'
  },
  {
    id: 'cwv-optimisation',
    title: 'Core Web Vitals Optimisation for Service Website',
    industry: 'Professional Services',
    market: 'EU',
    focus: ['Technical SEO & Performance'],
    challenge: 'Performance issues affected mobile rankings and UX.',
    action: 'Optimised page templates, asset loading, and rendering without UX compromises.',
    outcome: 'Improved CWV metrics and more stable mobile visibility.'
  },
  {
    id: 'indexation-control',
    title: 'Indexation Control for Large Content Libraries',
    industry: 'Enterprise',
    market: 'Multi-market',
    focus: ['Technical SEO & Performance'],
    challenge: 'Excess low-value URLs diluted crawl budget and relevance.',
    action: 'Implemented indexation rules, content pruning, and internal linking prioritisation.',
    outcome: 'Improved crawl efficiency and stronger performance of priority pages.'
  },
  {
    id: 'niche-ecommerce',
    title: 'Niche E-commerce Store — SEO for Complex Product Catalogue',
    industry: 'E-commerce',
    market: 'EU',
    focus: ['E-commerce SEO'],
    challenge: 'The store operated in a highly specialised niche with a complex product catalogue, including multiple categories, collections, and filter-driven pages.',
    action: 'Reviewed catalogue structure, category logic, and internal navigation. Defined priority categories, clarified filter roles, and improved internal linking.',
    outcome: 'Clearer catalogue hierarchy, improved SEO clarity for priority categories, and stronger alignment with transactional search intent.'
  }
];

const focuses = [
  'All',
  'SEO Migrations & Recovery',
  'Local & Service-Based SEO',
  'Enterprise & Multi-Market SEO',
  'EEAT & YMYL SEO',
  'Content & Semantic Strategy',
  'Multilingual & Localisation SEO',
  'Technical SEO & Performance',
  'E-commerce SEO'
];

const industries = [
  'All',
  'Healthcare & Medical',
  'Finance & Insurance',
  'B2B SaaS & Technology',
  'Professional Services',
  'E-commerce'
];

const markets = [
  'All',
  'UK',
  'US',
  'EU',
  'Germany',
  'Multi-market'
];

const focusLabelMap = {
  en: {
    'SEO Migrations & Recovery': 'SEO Migrations & Recovery',
    'Local & Service-Based SEO': 'Local & Service-Based SEO',
    'Enterprise & Multi-Market SEO': 'Enterprise & Multi-Market SEO',
    'EEAT & YMYL SEO': 'EEAT & YMYL SEO',
    'Content & Semantic Strategy': 'Content & Semantic Strategy',
    'Multilingual & Localisation SEO': 'Multilingual & Localisation SEO',
    'Technical SEO & Performance': 'Technical SEO & Performance',
    'E-commerce SEO': 'E-commerce SEO'
  },
  es: {
    'SEO Migrations & Recovery': 'Migraciones SEO y recuperación',
    'Local & Service-Based SEO': 'SEO local y para servicios',
    'Enterprise & Multi-Market SEO': 'SEO enterprise y multimercado',
    'EEAT & YMYL SEO': 'SEO EEAT y YMYL',
    'Content & Semantic Strategy': 'Estrategia de contenido y semántica',
    'Multilingual & Localisation SEO': 'SEO multilingüe y localización',
    'Technical SEO & Performance': 'SEO técnico y rendimiento',
    'E-commerce SEO': 'SEO para e‑commerce'
  },
  de: {
    'SEO Migrations & Recovery': 'SEO-Migrationen & Recovery',
    'Local & Service-Based SEO': 'Lokales & servicebasiertes SEO',
    'Enterprise & Multi-Market SEO': 'Enterprise- & Multi-Market-SEO',
    'EEAT & YMYL SEO': 'EEAT- & YMYL-SEO',
    'Content & Semantic Strategy': 'Content- & Semantik-Strategie',
    'Multilingual & Localisation SEO': 'Multilinguales & Lokalisierungs-SEO',
    'Technical SEO & Performance': 'Technisches SEO & Performance',
    'E-commerce SEO': 'E‑Commerce‑SEO'
  },
  ru: {
    'SEO Migrations & Recovery': 'Миграции SEO и восстановление',
    'Local & Service-Based SEO': 'Локальное SEO и услуги',
    'Enterprise & Multi-Market SEO': 'Enterprise‑SEO и мульти‑регионы',
    'EEAT & YMYL SEO': 'SEO для EEAT и YMYL',
    'Content & Semantic Strategy': 'Контент‑стратегия и семантика',
    'Multilingual & Localisation SEO': 'Мультиязычное и локализованное SEO',
    'Technical SEO & Performance': 'Техническое SEO и производительность',
    'E-commerce SEO': 'SEO для e‑commerce'
  }
} as const;

const industryLabelMap = {
  en: {
    'Healthcare & Medical': 'Healthcare & Medical',
    'Finance & Insurance': 'Finance & Insurance',
    'B2B SaaS & Technology': 'B2B SaaS & Technology',
    'Professional Services': 'Professional Services',
    'E-commerce': 'E-commerce',
    'Enterprise': 'Enterprise',
    'Multilingual Websites': 'Multilingual Websites',
    'Services': 'Services'
  },
  es: {
    'Healthcare & Medical': 'Salud y servicios médicos',
    'Finance & Insurance': 'Finanzas y seguros',
    'B2B SaaS & Technology': 'SaaS B2B y tecnología',
    'Professional Services': 'Servicios profesionales',
    'E-commerce': 'E‑commerce',
    'Enterprise': 'Empresas / Enterprise',
    'Multilingual Websites': 'Webs multilingües',
    'Services': 'Servicios'
  },
  de: {
    'Healthcare & Medical': 'Gesundheitswesen & Medizin',
    'Finance & Insurance': 'Finanzen & Versicherungen',
    'B2B SaaS & Technology': 'B2B‑SaaS & Technologie',
    'Professional Services': 'Professionelle Dienstleistungen',
    'E-commerce': 'E‑Commerce',
    'Enterprise': 'Enterprise',
    'Multilingual Websites': 'Mehrsprachige Websites',
    'Services': 'Services'
  },
  ru: {
    'Healthcare & Medical': 'Медицина и здравоохранение',
    'Finance & Insurance': 'Финансы и страхование',
    'B2B SaaS & Technology': 'B2B SaaS и технологии',
    'Professional Services': 'Профессиональные услуги',
    'E-commerce': 'E‑commerce',
    'Enterprise': 'Enterprise‑сегмент',
    'Multilingual Websites': 'Мультиязычные сайты',
    'Services': 'Сфера услуг'
  }
} as const;

const marketLabelMap = {
  en: {
    'UK': 'UK',
    'US': 'US',
    'EU': 'EU',
    'EU / Multi-market': 'EU / Multi-market',
    'Germany': 'Germany',
    'Germany (EU)': 'Germany (EU)',
    'EU / UK / US': 'EU / UK / US',
    'EU / US': 'EU / US',
    'EU / UK': 'EU / UK',
    'UK, US, EU': 'UK, US, EU',
    'Multi-market': 'Multi-market'
  },
  es: {
    'UK': 'Reino Unido',
    'US': 'EE. UU.',
    'EU': 'UE',
    'EU / Multi-market': 'UE / varios mercados',
    'Germany': 'Alemania',
    'Germany (EU)': 'Alemania (UE)',
    'EU / UK / US': 'UE / Reino Unido / EE. UU.',
    'EU / US': 'UE / EE. UU.',
    'EU / UK': 'UE / Reino Unido',
    'UK, US, EU': 'Reino Unido, EE. UU., UE',
    'Multi-market': 'Varios mercados'
  },
  de: {
    'UK': 'UK',
    'US': 'USA',
    'EU': 'EU',
    'EU / Multi-market': 'EU / mehrere Märkte',
    'Germany': 'Deutschland',
    'Germany (EU)': 'Deutschland (EU)',
    'EU / UK / US': 'EU / UK / USA',
    'EU / US': 'EU / USA',
    'EU / UK': 'EU / UK',
    'UK, US, EU': 'UK, USA, EU',
    'Multi-market': 'Mehrere Märkte'
  },
  ru: {
    'UK': 'Великобритания',
    'US': 'США',
    'EU': 'ЕС',
    'EU / Multi-market': 'ЕС / несколько рынков',
    'Germany': 'Германия',
    'Germany (EU)': 'Германия (ЕС)',
    'EU / UK / US': 'ЕС / Великобритания / США',
    'EU / US': 'ЕС / США',
    'EU / UK': 'ЕС / Великобритания',
    'UK, US, EU': 'Великобритания, США, ЕС',
    'Multi-market': 'Несколько рынков'
  }
} as const;

type CaseStudyLocalizedFields = Partial<
  Record<'title' | 'challenge' | 'action' | 'outcome', Partial<Record<'es' | 'de' | 'ru', string>>>
>;

const caseStudyTranslations: Record<string, CaseStudyLocalizedFields> = {
  'german-pet-insurance': {
    title: {
      es: 'Plataforma alemana de seguros para mascotas',
      de: 'Deutsche Haustierversicherungs-Plattform',
      ru: 'Немецкая платформа страхования домашних животных'
    },
    challenge: {
      es: 'Una actualización estructural a gran escala provocó una pérdida de ~80 % de visibilidad orgánica en páginas comerciales clave de un día para otro.',
      de: 'Ein groß angelegtes Struktur‑Update führte über Nacht zu einem Verlust von rund 80 % der organischen Sichtbarkeit auf kommerziellen Seiten.',
      ru: 'Крупное обновление структуры сайта привело к потере около 80 % органической видимости коммерческих страниц буквально за одну ночь.'
    },
    action: {
      es: 'Realizamos una auditoría técnica completa, reconstruimos la arquitectura de URLs, resolvimos problemas de enlazado interno e indexación y reforzamos las señales de E‑E‑A‑T en las plantillas clave.',
      de: 'Wir führten ein umfassendes technisches Audit durch, bauten die URL‑Architektur neu auf, lösten Probleme bei interner Verlinkung und Indexierung und stärkten E‑E‑A‑T‑Signale auf zentralen Templates.',
      ru: 'Провели полный технический аудит, перестроили архитектуру URL, исправили проблемы с внутренними ссылками и индексацией и усилили E‑E‑A‑T‑сигналы на ключевых шаблонах.'
    },
    outcome: {
      es: 'Las palabras clave principales volvieron a posiciones Top 3–5 y el tráfico orgánico no de marca creció un +230 % mes a mes.',
      de: 'Kern‑Keywords kehrten in die Top‑3–5‑Positionen zurück, der Non‑Brand‑Traffic wuchs Monat für Monat um +230 %.',
      ru: 'Ключевые запросы вернулись в топ‑3–5, а небрендовый органический трафик вырос более чем на 230 % месяц к месяцу.'
    }
  },
  'international-ecommerce': {
    title: {
      es: 'Marca internacional de e‑commerce',
      de: 'Internationale E‑Commerce‑Marke',
      ru: 'Международный e‑commerce‑бренд'
    },
    challenge: {
      es: 'La migración de plataforma introdujo ineficiencias de rastreo y canibalización de palabras clave en varios idiomas y mercados.',
      de: 'Die Plattformmigration führte zu Crawling‑Ineffizienzen und Keyword‑Kannibalisierung über mehrere Sprachversionen hinweg.',
      ru: 'Миграция на новую платформу вызвала проблемы с обходом сайта и каннибализацию ключей в нескольких локалях.'
    },
    action: {
      es: 'Lideramos el QA de migración, armonizamos la lógica de hreflang y URLs y reestructuramos el enlazado interno a nivel de categorías.',
      de: 'Wir übernahmen das Migrations‑QA, harmonisierten Hreflang‑ und URL‑Logik und strukturierten die interne Verlinkung auf Kategoriesebene neu.',
      ru: 'Провели QA миграции, выровняли логику hreflang и URL, перестроили внутреннюю перелинковку между категориями.'
    },
    outcome: {
      es: 'Posiciones estables tras la migración, mejor consistencia de indexación y recuperación de la visibilidad en categorías clave.',
      de: 'Stabile Rankings nach der Migration, konsistentere Indexierung und wiederhergestellte Sichtbarkeit wichtiger Kategorien.',
      ru: 'Ранжирование сохранилось после миграции, улучшилась стабильность индексации и вернулась видимость ключевых категорий.'
    }
  },
  'private-ultrasound': {
    title: {
      es: 'Clínica privada de ultrasonido',
      de: 'Private Ultraschallklinik',
      ru: 'Частная клиника УЗИ'
    },
    challenge: {
      es: 'Baja visibilidad local y ausencia de señales claras de confianza médica en las páginas principales.',
      de: 'Schwache lokale Sichtbarkeit und fehlende medizinische Vertrauenssignale auf den wichtigsten Serviceseiten.',
      ru: 'Слабая локальная видимость и недостаток медицинских сигналов доверия на ключевых страницах услуг.'
    },
    action: {
      es: 'Reestructuramos la jerarquía de servicios, implementamos schema MedicalService, optimizamos el enlazado interno y mejoramos el rendimiento móvil.',
      de: 'Wir strukturierten die Service‑Hierarchie neu, implementierten MedicalService‑Schema, optimierten interne Verlinkung und verbesserten die mobile Performance.',
      ru: 'Перестроили иерархию услуг, внедрили schema.org MedicalService, оптимизировали внутренние ссылки и ускорили мобильную версию.'
    },
    outcome: {
      es: 'Posiciones constantes en el Top 3 local y +65 % de aumento en reservas de citas orgánicas.',
      de: 'Konstante Top‑3‑Platzierungen im lokalen Ranking und +65 % mehr organische Terminbuchungen.',
      ru: 'Стабильный топ‑3 по локальным запросам и рост органических записей на приём более чем на 65 %.'
    }
  },
  'multi-location-medical': {
    title: {
      es: 'Clínica médica con múltiples ubicaciones',
      de: 'Medizinische Einrichtung mit mehreren Standorten',
      ru: 'Медицинская сеть с несколькими филиалами'
    },
    challenge: {
      es: 'Presencia local fragmentada y estructura de páginas de servicio inconsistente entre ubicaciones.',
      de: 'Zerstreute lokale Präsenz und uneinheitliche Struktur von Serviceseiten an verschiedenen Standorten.',
      ru: 'Фрагментированное локальное присутствие и разная структура страниц услуг в разных городах.'
    },
    action: {
      es: 'Estandarizamos plantillas locales, reforzamos el enlazado interno por ubicación y alineamos el contenido con la intención de búsqueda de los pacientes.',
      de: 'Wir standardisierten lokale Templates, stärkten standortbezogene interne Verlinkung und richteten Inhalte an der Suchintention der Patienten aus.',
      ru: 'Унифицировали шаблоны локальных страниц, усилили перелинковку между филиалами и выровняли контент под поиск пациентов.'
    },
    outcome: {
      es: 'Mejor visibilidad en el paquete local y mayores ratios de conversión desde tráfico orgánico.',
      de: 'Bessere Sichtbarkeit im Local Pack und höhere Conversion‑Rates aus organischem Traffic.',
      ru: 'Рост видимости в локальной выдаче и более высокая конверсия из органического трафика.'
    }
  },
  'us-mortgage-brokerage': {
    title: {
      es: 'Correduría hipotecaria en EE. UU.',
      de: 'US-Hypothekenmakler',
      ru: 'Ипотечный брокер в США'
    },
    challenge: {
      es: 'Alcance de búsqueda limitado debido a una web de una sola página.',
      de: 'Begrenzte Sichtbarkeit, da die Website nur aus einer einzigen Landingpage bestand.',
      ru: 'Ограниченный охват поиска из‑за одностраничного сайта.'
    },
    action: {
      es: 'Migramos el sitio a WordPress y lanzamos más de 30 landing pages de Servicio + Ciudad alineadas con intención transaccional.',
      de: 'Wir migrierten die Seite zu WordPress und erstellten über 30 Service‑+‑Stadt‑Landingpages, ausgerichtet auf transaktionale Suchintention.',
      ru: 'Перенесли сайт на WordPress и запустили 30+ посадочных по модели «услуга + город», заточенных под транзакционные запросы.'
    },
    outcome: {
      es: '+200 % de impresiones locales y +150 % de crecimiento en solicitudes cualificadas.',
      de: '+200 % mehr lokale Impressionen und +150 % Wachstum qualifizierter Anfragen.',
      ru: '+200 % к локальным показам и +150 % к количеству квалифицированных заявок.'
    }
  },
  'b2b-data-analytics': {
    title: {
      es: 'Consultoría B2B de datos y analítica',
      de: 'B2B-Daten- & Analyseberatung',
      ru: 'B2B‑консалтинг по данным и аналитике'
    },
    challenge: {
      es: 'Alta especialización pero poco alineamiento con la forma en que los decisores buscan soluciones.',
      de: 'Hohe Expertise, aber geringe Übereinstimmung mit der Suchweise von Entscheidern.',
      ru: 'Высокая экспертиза, но сайт не совпадал с тем, как ЛПР формулируют запросы.'
    },
    action: {
      es: 'Diseñamos una estructura de contenido basada en entidades (Soluciones ↔ Casos de uso ↔ Industrias) y mejoramos la cobertura semántica.',
      de: 'Wir entwickelten eine entitätsbasierte Content‑Struktur (Lösungen ↔ Use Cases ↔ Branchen) und verbesserten die semantische Abdeckung.',
      ru: 'Построили сущностную структуру контента (решения ↔ кейсы ↔ отрасли) и усилили семантическое покрытие.'
    },
    outcome: {
      es: 'Huella de palabras clave más amplia y crecimiento orgánico sostenido.',
      de: 'Breiterer Keyword‑Footprint und stetiges, kumulierendes Wachstum.',
      ru: 'Расширение семантики и устойчивый, нарастающий органический рост.'
    }
  },
  'enterprise-software-provider': {
    title: {
      es: 'Proveedor de software enterprise',
      de: 'Enterprise-Software-Anbieter',
      ru: 'Enterprise‑провайдер программного обеспечения'
    },
    challenge: {
      es: 'Oferta de producto compleja repartida entre mercados con intención de palabra clave solapada.',
      de: 'Komplexes Produktangebot über mehrere Märkte mit überlappender Keyword‑Intention.',
      ru: 'Сложный продукт в нескольких регионах с пересекающейся семантикой и конкурирующими страницами.'
    },
    action: {
      es: 'Definimos reglas de gobernanza de contenido, reducimos la canibalización y alineamos la intención de página entre regiones.',
      de: 'Wir definierten Content‑Governance‑Regeln, reduzierten Kannibalisierung und harmonisierten die Seitenintention über Regionen hinweg.',
      ru: 'Ввели правила контент‑governance, сократили каннибализацию и выровняли роли страниц по странам.'
    },
    outcome: {
      es: 'Señales de autoridad temática más claras y mejor visibilidad no de marca en mercados prioritarios.',
      de: 'Klarere Signale für thematische Autorität und bessere Non‑Brand‑Sichtbarkeit in Kernmärkten.',
      ru: 'Более понятные сигналы экспертизы и рост небрендовой видимости в приоритетных странах.'
    }
  },
  'medical-services-brand': {
    title: {
      es: 'Marca de servicios médicos',
      de: 'Marke für medizinische Dienstleistungen',
      ru: 'Медицинский бренд услуг'
    },
    challenge: {
      es: 'Volatilidad de visibilidad tras actualizaciones core en un espacio YMYL.',
      de: 'Schwankende Sichtbarkeit nach Core‑Updates in einem YMYL‑Bereich.',
      ru: 'Сильная волатильность видимости после core‑апдейтов в YMYL‑нише.'
    },
    action: {
      es: 'Reforzamos las entidades de autor, aclaramos los procesos de revisión médica y ampliamos la cobertura de datos estructurados.',
      de: 'Wir stärkten Autoren‑Entitäten, klärten medizinische Review‑Prozesse und erweiterten strukturierte Daten.',
      ru: 'Укрепили сущности авторов, формализовали мед.ревью и расширили разметку.'
    },
    outcome: {
      es: 'Mejores señales de confianza y recuperación gradual de los rankings perdidos.',
      de: 'Verbesserte Vertrauenssignale und schrittweise Erholung verlorener Rankings.',
      ru: 'Укрепление сигналов доверия и постепенное восстановление позиций.'
    }
  },
  'financial-services-website': {
    title: {
      es: 'Web de servicios financieros',
      de: 'Website für Finanzdienstleistungen',
      ru: 'Сайт финансовых услуг'
    },
    challenge: {
      es: 'El contenido informativo carecía de credibilidad y no apoyaba a las páginas comerciales.',
      de: 'Informative Inhalte wirkten wenig glaubwürdig und stützten kommerzielle Seiten kaum.',
      ru: 'Информационный контент выглядел недостаточно экспертно и не поддерживал коммерческие страницы.'
    },
    action: {
      es: 'Reestructuramos la jerarquía de contenido, reforzamos señales de expertise y mejoramos el enlazado entre contenido informacional y transaccional.',
      de: 'Wir strukturierten die Content‑Hierarchie neu, stärkten Expertise‑Signale und verbesserten die Verlinkung zwischen informativen und transaktionalen Seiten.',
      ru: 'Пересобрали иерархию контента, усилили сигналы экспертизы и улучшили перелинковку между информационными и коммерческими материалами.'
    },
    outcome: {
      es: 'Mayor autoridad temática y aumento del tráfico orgánico cualificado.',
      de: 'Stärkere thematische Autorität und Zuwachs an qualifiziertem organischen Traffic.',
      ru: 'Рост тематического авторитета и приток более релевантного органического трафика.'
    }
  },
  'professional-services-consultancy': {
    title: {
      es: 'Consultoría de servicios profesionales',
      de: 'Beratung für professionelle Dienstleistungen',
      ru: 'Консалтинг в сфере профессиональных услуг'
    },
    challenge: {
      es: 'Contenido muy experto que no se alineaba con la intención de búsqueda comercial.',
      de: 'Stark expertisegetriebene Inhalte passten nicht zur kommerziellen Suchintention.',
      ru: 'Контент с сильной экспертизой не совпадал с коммерческими запросами аудитории.'
    },
    action: {
      es: 'Mapeamos temas MOFU/BOFU, reestructuramos páginas de servicio y mejoramos la claridad semántica.',
      de: 'Wir mappten MOFU-/BOFU‑Themen, strukturierten Serviceseiten neu und schärften die semantische Klarheit.',
      ru: 'Прописали MOFU/BOFU‑темы, пересобрали страницы услуг и усилили семантическую связность.'
    },
    outcome: {
      es: 'Mayor engagement y mejores tasas de conversión desde sesiones orgánicas.',
      de: 'Höheres Engagement und bessere Conversion‑Rates aus organischem Traffic.',
      ru: 'Рост вовлечённости и конверсий из органики.'
    }
  },
  'international-service-brand': {
    title: {
      es: 'Marca internacional de servicios',
      de: 'Internationale Servicemarke',
      ru: 'Международный сервисный бренд'
    },
    challenge: {
      es: 'Las traducciones directas rendían poco en mercados no angloparlantes.',
      de: 'Direkte Übersetzungen performten in nicht‑englischen Märkten schwach.',
      ru: 'Буквальные переводы плохо работали на неанглоязычных рынках.'
    },
    action: {
      es: 'Localizamos el contenido según la intención de búsqueda específica por mercado en EN, ES y DE.',
      de: 'Wir lokalisierten Inhalte anhand marktspezifischer Suchintentionen in EN, ES und DE.',
      ru: 'Локализовали контент под поисковый интент в EN, ES и DE для приоритетных рынков.'
    },
    outcome: {
      es: 'Mejores métricas de interacción y mayor visibilidad orgánica en mercados secundarios.',
      de: 'Verbesserte Engagement‑Metriken und stärkere organische Sichtbarkeit in Sekundärmärkten.',
      ru: 'Улучшение поведенческих метрик и рост видимости на вторичных рынках.'
    }
  },
  'medical-services-recovery': {
    title: {
      es: 'Web de servicios médicos — recuperación tras core updates',
      de: 'Website für medizinische Leistungen — Recovery nach Core‑Updates',
      ru: 'Медицинский сайт — восстановление после core‑апдейтов'
    },
    challenge: {
      es: 'Alta volatilidad y pérdida de visibilidad tras múltiples core updates en una categoría YMYL.',
      de: 'Deutliche Volatilität und Sichtbarkeitsverluste nach mehreren Core‑Updates in einer YMYL‑Nische.',
      ru: 'Сильная волатильность и падение видимости после серии core‑апдейтов в YMYL‑сегменте.'
    },
    action: {
      es: 'Auditamos la calidad del contenido, aclaramos autoría y revisión médica, mejoramos el enlazado interno y reforzamos señales EEAT.',
      de: 'Wir prüften die Content‑Qualität, klärten medizinische Autorschaft und Review‑Prozesse, verbesserten interne Verlinkung und stärkten EEAT‑Signale.',
      ru: 'Провели аудит качества контента, формализовали авторство и мед.ревью, усилили перелинковку и EEAT‑сигналы.'
    },
    outcome: {
      es: 'Estabilización de rankings y recuperación gradual de la visibilidad no de marca.',
      de: 'Stabilere Rankings und schrittweise Rückgewinnung der Non‑Brand‑Sichtbarkeit.',
      ru: 'Стабилизация позиций и постепенный возврат небрендовой видимости.'
    }
  },
  'static-to-wordpress': {
    title: {
      es: 'Negocio de servicios — migración de sitio estático a WordPress',
      de: 'Serviceunternehmen — Migration von statischer Seite zu WordPress',
      ru: 'Сервисный бизнес — миграция с статического сайта на WordPress'
    },
    challenge: {
      es: 'La web estática limitaba la escalabilidad de contenido y el crecimiento orgánico.',
      de: 'Die statische Website begrenzte Content‑Skalierung und organisches Wachstum.',
      ru: 'Статический сайт ограничивал масштабирование контента и рост органики.'
    },
    action: {
      es: 'Lideramos una migración SEO‑segura a WordPress, reestructuramos la arquitectura de información y mapeamos URLs existentes para preservar la equidad.',
      de: 'Wir führten eine SEO‑sichere Migration zu WordPress durch, strukturierten die Informationsarchitektur neu und mappten bestehende URLs zur Erhaltung des Link‑Equitys.',
      ru: 'Провели безопасную для SEO миграцию на WordPress, пересобрали информационную архитектуру и аккуратно замапили существующие URL.'
    },
    outcome: {
      es: 'Sin pérdida de tráfico durante la migración y mayor flexibilidad de indexación para el crecimiento futuro.',
      de: 'Kein Traffic‑Verlust während der Migration und höhere Flexibilität bei der Indexierung für zukünftiges Wachstum.',
      ru: 'Миграция прошла без потери трафика, появилась большая гибкость для дальнейшего роста.'
    }
  },
  'cctld-migration': {
    title: {
      es: 'Marca internacional — estrategia de migración basada en ccTLD',
      de: 'Internationale Marke — ccTLD‑basierte Migrationsstrategie',
      ru: 'Международный бренд — стратегия миграции на базе ccTLD'
    },
    challenge: {
      es: 'Configuración internacional fragmentada usando múltiples ccTLD con señales SEO inconsistentes.',
      de: 'Zersplittertes internationales Setup mit mehreren ccTLDs und uneinheitlichen SEO‑Signalen.',
      ru: 'Фрагментированная международная структура с несколькими ccTLD и размытыми SEO‑сигналами.'
    },
    action: {
      es: 'Revisamos la arquitectura entre dominios, el enlazado interno y el targeting de palabras clave por mercado.',
      de: 'Wir prüften die Cross‑Domain‑Architektur, interne Verlinkung und marktbezogenes Keyword‑Targeting.',
      ru: 'Проанализировали кросс‑доменную архитектуру, перелинковку и распределение ключей по рынкам.'
    },
    outcome: {
      es: 'Mayor claridad entre mercados y mejor visibilidad regional sin necesidad de consolidación arriesgada.',
      de: 'Mehr Klarheit zwischen Märkten und stärkere regionale Sichtbarkeit ohne riskante Konsolidierung.',
      ru: 'Более понятное разделение рынков и рост региональной видимости без жёсткой консолидации доменов.'
    }
  },
  'city-level-medical': {
    title: {
      es: 'Páginas de servicios médicos a nivel ciudad',
      de: 'Stadtbezogene Seiten für medizinische Leistungen',
      ru: 'Городские посадочные для медицинских услуг'
    },
    challenge: {
      es: 'Los servicios clave carecían de relevancia a nivel de ubicación en SERPs urbanas competitivas.',
      de: 'Kernleistungen fehlte die standortbezogene Relevanz in umkämpften urbanen SERPs.',
      ru: 'Ключевым услугам не хватало локальной релевантности в конкурентной городской выдаче.'
    },
    action: {
      es: 'Diseñamos plantillas de servicio centradas en ciudades alineadas con la intención de búsqueda del paciente y señales locales de confianza.',
      de: 'Wir entwickelten stadtfokussierte Service‑Templates, abgestimmt auf Patientensuchintention und lokale Vertrauenssignale.',
      ru: 'Разработали городские шаблоны услуг под запросы пациентов и локальные сигналы доверия.'
    },
    outcome: {
      es: 'Huella de palabras clave locales ampliada y mejores conversiones desde tráfico orgánico.',
      de: 'Erweiterter lokaler Keyword‑Footprint und höhere Conversion‑Rates aus organischem Traffic.',
      ru: 'Расширение локальной семантики и рост конверсий из органики.'
    }
  },
  'urban-services-rebuild': {
    title: {
      es: 'Mercado de servicios en entorno urbano competitivo — reconstrucción de SEO local',
      de: 'Wettbewerbsintensiver städtischer Servicemarkt — Local‑SEO‑Relaunch',
      ru: 'Конкурентный городской рынок услуг — перестройка локального SEO'
    },
    challenge: {
      es: 'Alta competencia y poca diferenciación en resultados orgánicos locales y de mapas.',
      de: 'Hohe Konkurrenz und geringe Differenzierung in lokalen organischen und Map‑Ergebnissen.',
      ru: 'Высокая конкуренция и слабое отличие в локальной выдаче и картах.'
    },
    action: {
      es: 'Replanteamos el posicionamiento de servicios, mejoramos señales locales on‑page y alineamos el contenido con la intención transaccional.',
      de: 'Wir überarbeiteten die Service‑Positionierung, verbesserten lokale On‑Page‑Signale und richteten Inhalte auf transaktionale Intention aus.',
      ru: 'Перепозиционировали услуги, усилили локальные on‑page‑сигналы и выровняли контент под транзакционные запросы.'
    },
    outcome: {
      es: 'Mayor visibilidad para consultas locales de alta intención y mejor calidad de leads entrantes.',
      de: 'Mehr Sichtbarkeit für lokale High‑Intent‑Suchanfragen und bessere Lead‑Qualität.',
      ru: 'Рост видимости по высокоинтентным локальным запросам и более качественные лиды.'
    }
  },
  'service-area-no-address': {
    title: {
      es: 'Empresa de área de servicio sin dirección física',
      de: 'Service-Area-Business ohne physische Adresse',
      ru: 'Сервисная компания без физического адреса'
    },
    challenge: {
      es: 'Elegibilidad limitada para visibilidad local debido a la ausencia de ubicación física.',
      de: 'Eingeschränkte lokale Sichtbarkeit mangels physischer Adresse.',
      ru: 'Ограниченные возможности локального SEO из‑за отсутствия стационарного офиса.'
    },
    action: {
      es: 'Diseñamos una estrategia SEO centrada en zonas de servicio con landing pages por intención y enlazado interno específico.',
      de: 'Wir entwickelten eine servicegebietsorientierte SEO‑Strategie mit intentgetriebenen Landingpages und gezielter interner Verlinkung.',
      ru: 'Построили SEO‑стратегию вокруг зоны обслуживания с лендингами под intent и продуманной перелинковкой.'
    },
    outcome: {
      es: 'Más consultas orgánicas pese a no tener ubicación física.',
      de: 'Mehr organische Anfragen trotz fehlendem stationären Standort.',
      ru: 'Рост органических обращений даже без офлайн‑адреса.'
    }
  },
  'enterprise-governance': {
    title: {
      es: 'Marco de gobernanza de contenidos para enterprise',
      de: 'Enterprise-Content-Governance-Framework',
      ru: 'Фреймворк контент‑governance для Enterprise'
    },
    challenge: {
      es: 'La producción de contenido a escala generaba duplicados y targeting inconsistente de palabras clave.',
      de: 'Content‑Produktion im großen Stil führte zu Duplikaten und uneinheitlichem Keyword‑Targeting.',
      ru: 'Масштабное производство контента привело к дублям и размытым правилам таргетинга ключей.'
    },
    action: {
      es: 'Definimos reglas de gobernanza, mapas de intención y estándares editoriales para equipos internos.',
      de: 'Wir definierten Governance‑Regeln, Intent‑Mapping und redaktionelle Standards für interne Teams.',
      ru: 'Определили правила governance, карты интентов и редакционные стандарты для внутренних команд.'
    },
    outcome: {
      es: 'Menos canibalización y autoridad temática más clara en temas prioritarios.',
      de: 'Weniger Kannibalisierung und klarere thematische Autorität bei Prioritätsthemen.',
      ru: 'Снижение каннибализации и более ясные сигналы экспертности по ключевым темам.'
    }
  },
  'cannibalisation-resolution': {
    title: {
      es: 'Resolución de canibalización de palabras clave a escala',
      de: 'Keyword-Kannibalisierung in großem Umfang beheben',
      ru: 'Решение проблемы каннибализации ключей на масштабе'
    },
    challenge: {
      es: 'Múltiples páginas competían por las mismas consultas comerciales en varios mercados.',
      de: 'Mehrere Seiten konkurrierten in verschiedenen Märkten um dieselben kommerziellen Suchanfragen.',
      ru: 'Несколько страниц конкурировали за одни и те же коммерческие запросы в разных странах.'
    },
    action: {
      es: 'Consolidamos contenido, aclaramos la intención de cada página y reestructuramos el enlazado interno.',
      de: 'Wir konsolidierten Inhalte, klärten die Seitenintention und strukturierten interne Verlinkung neu.',
      ru: 'Сконсолидировали контент, прояснили роль каждой страницы и перестроили перелинковку.'
    },
    outcome: {
      es: 'Mayor estabilidad en rankings y mejor rendimiento de las páginas comerciales clave.',
      de: 'Stabilere Rankings und bessere Performance zentraler kommerzieller Seiten.',
      ru: 'Более стабильные позиции и лучшая эффективность ключевых коммерческих страниц.'
    }
  },
  'author-entity-framework': {
    title: {
      es: 'Framework de entidades de autor para contenido médico',
      de: 'Author-Entity-Framework für medizinische Inhalte',
      ru: 'Фреймворк авторских сущностей для медицинского контента'
    },
    challenge: {
      es: 'El contenido médico no tenía atribución clara de expertos ni señales de confianza.',
      de: 'Medizinische Inhalte hatten keine klare Expertenzuordnung und schwache Vertrauenssignale.',
      ru: 'У медконтента не было прозрачной экспертизы и сильных сигналов доверия.'
    },
    action: {
      es: 'Creamos perfiles de autor, aclaramos credenciales y alineamos el contenido con estándares de revisión médica.',
      de: 'Wir bauten Autorenprofile auf, klärten Qualifikationen und richteten Inhalte an medizinischen Review‑Standards aus.',
      ru: 'Создали профили авторов, описали квалификацию и выровняли контент под стандарты мед.ревью.'
    },
    outcome: {
      es: 'Huella EEAT más sólida y mayor confianza de usuarios y buscadores.',
      de: 'Stärkerer EEAT‑Footprint und höheres Vertrauen von Nutzern und Suchmaschinen.',
      ru: 'Усиление EEAT‑сигналов и рост доверия со стороны пользователей и поисковых систем.'
    }
  },
  'financial-trust-rebuild': {
    title: {
      es: 'Contenido financiero — reconstrucción SEO basada en confianza',
      de: 'Finanzinhalte — vertrauensbasiertes SEO‑Redesign',
      ru: 'Финансовый контент — SEO‑перезапуск вокруг доверия'
    },
    challenge: {
      es: 'Las páginas informativas rendían por debajo de lo esperado debido a señales de credibilidad débiles.',
      de: 'Informative Seiten performten schwach wegen mangelnder Glaubwürdigkeit.',
      ru: 'Информационные страницы недорабатывали из‑за слабых сигналов доверия.'
    },
    action: {
      es: 'Reordenamos la jerarquía de contenido, reforzamos indicadores de expertise y alineamos el contenido informativo con la intención comercial.',
      de: 'Wir ordneten die Content‑Hierarchie neu, stärkten Expertise‑Indikatoren und passten informative Inhalte an kommerzielle Intentionen an.',
      ru: 'Пересобрали структуру, усилили маркеры экспертизы и связали информационный контент с коммерческими сценариями.'
    },
    outcome: {
      es: 'Mejor engagement y aumento del tráfico orgánico cualificado.',
      de: 'Besseres Engagement und mehr qualifizierter organischer Traffic.',
      ru: 'Рост вовлечённости и доли целевого органического трафика.'
    }
  },
  'entity-clustering-b2b': {
    title: {
      es: 'Clúster de temas basado en entidades para servicios B2B',
      de: 'Entity-basiertes Topic‑Clustering für B2B‑Services',
      ru: 'Кластеризация тем на основе сущностей для B2B‑услуг'
    },
    challenge: {
      es: 'Temas de alto valor estaban fragmentados en páginas desconectadas.',
      de: 'Wichtige Themen waren über mehrere, wenig verbundene Seiten verteilt.',
      ru: 'Ценные темы были размазаны по несвязанным страницам.'
    },
    action: {
      es: 'Construimos un modelo de clúster basado en entidades que conecta servicios, casos de uso e industrias.',
      de: 'Wir bauten ein entitätsgetriebenes Cluster‑Modell, das Services, Use Cases und Branchen verbindet.',
      ru: 'Построили сущностные кластеры, связывающие услуги, кейсы и отрасли.'
    },
    outcome: {
      es: 'Cobertura de keywords más amplia y mayor relevancia temática.',
      de: 'Breitere Keyword‑Abdeckung und stärkere thematische Relevanz.',
      ru: 'Расширение семантики и усиление тематической релевантности.'
    }
  },
  'mofu-bofu-support': {
    title: {
      es: 'Contenido MOFU / BOFU que apoya a páginas de ventas',
      de: 'MOFU-/BOFU‑Content zur Unterstützung von Sales‑Seiten',
      ru: 'MOFU/BOFU‑контент в поддержку продающих страниц'
    },
    challenge: {
      es: 'El contenido informativo con mucho tráfico no apoyaba las conversiones.',
      de: 'Traffic‑starker Informationscontent unterstützte Conversions kaum.',
      ru: 'Информационный контент с хорошим трафиком почти не приводил к заявкам.'
    },
    action: {
      es: 'Introdujimos contenido MOFU y BOFU alineado con los recorridos de compra y rutas de enlazado interno.',
      de: 'Wir ergänzten MOFU‑/BOFU‑Inhalte, abgestimmt auf Kaufprozesse und interne Linkpfade.',
      ru: 'Добавили MOFU/BOFU‑материалы, привязанные к этапам воронки и внутренним маршрутам.'
    },
    outcome: {
      es: 'Mejor calidad de leads y mayor contribución del tráfico orgánico.',
      de: 'Höhere Lead‑Qualität und stärkerer Beitrag des organischen Traffics.',
      ru: 'Рост качества лидов и больший вклад органики в продажи.'
    }
  },
  'market-adaptive-localisation': {
    title: {
      es: 'Localización SEO adaptada al mercado',
      de: 'Marktadaptive SEO‑Lokalisierung',
      ru: 'Рыночно‑адаптивная SEO‑локализация'
    },
    challenge: {
      es: 'Las traducciones literales no coincidían con la intención de búsqueda local.',
      de: 'Wörtliche Übersetzungen passten nicht zur lokalen Suchintention.',
      ru: 'Буквальные переводы не соответствовали локальному поисковому интенту.'
    },
    action: {
      es: 'Reescribimos contenido por mercado, alineando terminología, estructura e intención en EN, ES y DE.',
      de: 'Wir überarbeiteten Inhalte pro Markt und stimmten Terminologie, Struktur und Intention in EN, ES und DE ab.',
      ru: 'Переработали контент под каждый рынок, выровняв терминологию, структуру и интент в EN, ES и DE.'
    },
    outcome: {
      es: 'Mayor engagement y mejor visibilidad en mercados no angloparlantes.',
      de: 'Mehr Engagement und bessere Sichtbarkeit in nicht‑englischen Märkten.',
      ru: 'Рост вовлечённости и видимости на неанглоязычных рынках.'
    }
  },
  'language-cannibalisation': {
    title: {
      es: 'Corrección de canibalización entre idiomas',
      de: 'Beseitigung sprachbasierter Kannibalisierung',
      ru: 'Устранение языковой каннибализации'
    },
    challenge: {
      es: 'Solapamiento de targeting de keywords entre versiones de idioma.',
      de: 'Überlappendes Keyword‑Targeting zwischen Sprachversionen.',
      ru: 'Пересечение семантики между языковыми версиями.'
    },
    action: {
      es: 'Aclaramos la intención por idioma, ajustamos enlazado interno y refinamos el mapping de keywords.',
      de: 'Wir klärten Sprach‑Intentionen, passten interne Verlinkung an und verfeinerten das Keyword‑Mapping.',
      ru: 'Развели интенты по языкам, перенастроили перелинковку и уточнили карту ключей.'
    },
    outcome: {
      es: 'Señales de SERP más limpias y mejor rendimiento por idioma.',
      de: 'Klarere SERP‑Signale und bessere Performance je Sprache.',
      ru: 'Более чистые сигналы в выдаче и рост эффективности каждой языковой версии.'
    }
  },
  'cwv-optimisation': {
    title: {
      es: 'Optimización de Core Web Vitals para web de servicios',
      de: 'Core‑Web‑Vitals‑Optimierung für Service‑Website',
      ru: 'Оптимизация Core Web Vitals для сайта услуг'
    },
    challenge: {
      es: 'Problemas de rendimiento afectaban rankings móviles y experiencia de usuario.',
      de: 'Performance‑Probleme beeinträchtigten mobile Rankings und UX.',
      ru: 'Проблемы с производительностью ухудшали мобильные позиции и UX.'
    },
    action: {
      es: 'Optimizamos plantillas, carga de recursos y renderizado sin sacrificar la experiencia de usuario.',
      de: 'Wir optimierten Seitentemplates, Asset‑Ladung und Rendering ohne UX‑Einbußen.',
      ru: 'Оптимизировали шаблоны, загрузку ресурсов и рендеринг без ущерба для UX.'
    },
    outcome: {
      es: 'Mejores métricas CWV y visibilidad móvil más estable.',
      de: 'Verbesserte CWV‑Metriken und stabilere mobile Sichtbarkeit.',
      ru: 'Улучшение метрик CWV и более стабильная мобильная видимость.'
    }
  },
  'indexation-control': {
    title: {
      es: 'Control de indexación para grandes bibliotecas de contenido',
      de: 'Indexierungssteuerung für große Content‑Bibliotheken',
      ru: 'Управление индексацией для больших контент‑библиотек'
    },
    challenge: {
      es: 'Demasiadas URLs de bajo valor diluían el presupuesto de rastreo y la relevancia.',
      de: 'Zu viele wenig wertvolle URLs verwässerten Crawl‑Budget und Relevanz.',
      ru: 'Избыток малополезных URL размывал crawl‑budget и сигналы релевантности.'
    },
    action: {
      es: 'Aplicamos reglas de indexación, poda de contenido y priorización de enlazado interno.',
      de: 'Wir implementierten Indexierungsregeln, Content‑Pruning und priorisierte interne Verlinkung.',
      ru: 'Ввели правила индексации, почистили лишний контент и переприоритизировали перелинковку.'
    },
    outcome: {
      es: 'Mayor eficiencia de rastreo y mejor rendimiento de páginas prioritarias.',
      de: 'Effizienterer Crawl und bessere Performance von Prioritätsseiten.',
      ru: 'Повышение эффективности обхода и заметный рост ключевых страниц.'
    }
  },
  'niche-ecommerce': {
    title: {
      es: 'Tienda e‑commerce de nicho — SEO para catálogo complejo',
      de: 'Nischen‑E‑Commerce‑Shop — SEO für komplexen Produktkatalog',
      ru: 'Нишевой интернет‑магазин — SEO для сложного каталога'
    },
    challenge: {
      es: 'La tienda operaba en un nicho muy especializado con catálogo complejo, múltiples categorías, colecciones y páginas generadas por filtros.',
      de: 'Der Shop agierte in einer hochspezialisierten Nische mit komplexem Katalog, vielen Kategorien, Kollektionen und Filterseiten.',
      ru: 'Магазин работал в узкой нише с большим и сложным каталогом, множеством категорий, коллекций и фильтрами.'
    },
    action: {
      es: 'Revisamos la estructura del catálogo, la lógica de categorías y la navegación. Definimos categorías prioritarias, aclaramos el rol de las páginas de filtro y mejoramos el enlazado entre colecciones y productos.',
      de: 'Wir analysierten Katalogstruktur, Kategorienlogik und Navigation, definierten Prioritätskategorien, klärten die Rolle von Filterseiten und verbesserten die Verlinkung zwischen Kollektionen und Produkten.',
      ru: 'Пересмотрели структуру каталога, логику категорий и навигацию, выделили приоритетные категории, задали правила для страниц‑фильтров и усилили связи между коллекциями и товарами.'
    },
    outcome: {
      es: 'Jerarquía de catálogo más clara, mejor claridad SEO para categorías clave y mayor alineación con la intención transaccional.',
      de: 'Klarere Kataloghierarchie, bessere SEO‑Transparenz für Prioritätskategorien und stärkere Ausrichtung auf transaktionale Suchintention.',
      ru: 'Более понятная иерархия каталога, лучшая прозрачность для приоритетных категорий и плотное совпадение с транзакционными запросами.'
    }
  }
};

const getLocalizedText = (study: CaseStudy, field: keyof CaseStudy, lang: string): string => {
  if (lang === 'en') return (study as any)[field];
  const translations = caseStudyTranslations[study.id];
  const localized = translations?.[field as keyof typeof translations]?.[lang as 'es' | 'de' | 'ru'];
  return localized || (study as any)[field];
};

const getFocusLabel = (value: string, lang: string) => {
  const map = focusLabelMap[lang as keyof typeof focusLabelMap] || focusLabelMap.en;
  return map[value as keyof typeof map] || value;
};

const getIndustryLabel = (value: string, lang: string) => {
  const map = industryLabelMap[lang as keyof typeof industryLabelMap] || industryLabelMap.en;
  return map[value as keyof typeof map] || value;
};

const getMarketLabel = (value: string, lang: string) => {
  const map = marketLabelMap[lang as keyof typeof marketLabelMap] || marketLabelMap.en;
  return map[value as keyof typeof map] || value;
};

export default function CaseStudiesFilter({ lang = 'en' }: { lang?: string }) {
  const [selectedFocus, setSelectedFocus] = useState('All')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [selectedMarket, setSelectedMarket] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter(study => {
      const matchesFocus = selectedFocus === 'All' || study.focus.includes(selectedFocus)
      const matchesIndustry = selectedIndustry === 'All' || study.industry === selectedIndustry
      const matchesMarket = selectedMarket === 'All' || study.market.includes(selectedMarket)
      const matchesSearch = searchQuery === '' || 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.challenge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.outcome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.market.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesFocus && matchesIndustry && matchesMarket && matchesSearch
    })
  }, [selectedFocus, selectedIndustry, selectedMarket, searchQuery])

  const translations = {
    en: {
      filters: 'Filters',
      byFocus: 'By Focus',
      byIndustry: 'By Industry',
      byMarket: 'By Market',
      search: 'Search cases...',
      results: 'Showing {count} case studies',
      challenge: 'Challenge',
      action: 'Action',
      outcome: 'Outcome',
      industry: 'Industry',
      market: 'Market'
    },
    es: {
      filters: 'Filtros',
      byFocus: 'Por enfoque',
      byIndustry: 'Por industria',
      byMarket: 'Por mercado',
      search: 'Buscar casos...',
      results: 'Mostrando {count} casos de estudio',
      challenge: 'Desafío',
      action: 'Acción',
      outcome: 'Resultado',
      industry: 'Industria',
      market: 'Mercado'
    },
    de: {
      filters: 'Filter',
      byFocus: 'Nach Fokus',
      byIndustry: 'Nach Branche',
      byMarket: 'Nach Markt',
      search: 'Case Studies suchen...',
      results: '{count} Case Studies werden angezeigt',
      challenge: 'Herausforderung',
      action: 'Maßnahme',
      outcome: 'Ergebnis',
      industry: 'Branche',
      market: 'Markt'
    },
    ru: {
      filters: 'Фильтры',
      byFocus: 'По направлению',
      byIndustry: 'По отрасли',
      byMarket: 'По региону',
      search: 'Поиск кейсов...',
      results: 'Показано {count} кейсов',
      challenge: 'Задача',
      action: 'Что сделали',
      outcome: 'Результат',
      industry: 'Отрасль',
      market: 'Регион'
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div>
      {/* Filters Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-8">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedFocus}
            onChange={(e) => setSelectedFocus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">{t.byFocus}: All</option>
            {focuses.slice(1).map(f => (
              <option key={f} value={f}>
                {getFocusLabel(f, lang)}
              </option>
            ))}
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">{t.byIndustry}: All</option>
            {industries.slice(1).map(i => (
              <option key={i} value={i}>
                {getIndustryLabel(i, lang)}
              </option>
            ))}
          </select>

          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">{t.byMarket}: All</option>
            {markets.slice(1).map(m => (
              <option key={m} value={m}>
                {getMarketLabel(m, lang)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 text-gray-600 dark:text-gray-400">
        {t.results.replace('{count}', filteredCaseStudies.length.toString())}
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCaseStudies.map((study) => (
          <div key={study.id} className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="p-6 flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {study.focus.map(f => (
                  <span key={f} className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded">
                    {getFocusLabel(f, lang)}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {getLocalizedText(study, 'title', lang)}
              </h3>
              <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                <span>
                  <span className="font-semibold">{t.industry}:</span> {getIndustryLabel(study.industry, lang)}
                </span>
                <span>
                  <span className="font-semibold">{t.market}:</span> {getMarketLabel(study.market, lang)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t.challenge}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getLocalizedText(study, 'challenge', lang)}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t.action}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getLocalizedText(study, 'action', lang)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 border-t border-indigo-100 dark:border-indigo-900/30">
              <h4 className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">{t.outcome}</h4>
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed">
                {getLocalizedText(study, 'outcome', lang)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

