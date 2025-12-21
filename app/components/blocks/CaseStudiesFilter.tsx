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
            {focuses.slice(1).map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">{t.byIndustry}: All</option>
            {industries.slice(1).map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">{t.byMarket}: All</option>
            {markets.slice(1).map(m => <option key={m} value={m}>{m}</option>)}
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
                    {f}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{study.title}</h3>
              <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                <span><span className="font-semibold">{t.industry}:</span> {study.industry}</span>
                <span><span className="font-semibold">{t.market}:</span> {study.market}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t.challenge}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t.action}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{study.action}</p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 border-t border-indigo-100 dark:border-indigo-900/30">
              <h4 className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">{t.outcome}</h4>
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

