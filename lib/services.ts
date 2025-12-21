import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { sanitizeSlug } from './security';
import {
  ChartBarIcon,
  CursorArrowRaysIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  LightBulbIcon,
  PresentationChartLineIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  NewspaperIcon,
  LinkIcon,
  DocumentChartBarIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  CheckCircleIcon,
  SparklesIcon,
  CommandLineIcon,
  ChartPieIcon,
  GlobeAltIcon,
  ServerIcon,
  EyeIcon,
  CogIcon,
  AcademicCapIcon,
  BoltIcon,
  StarIcon,
  HandRaisedIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  TagIcon,
  ClipboardIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  ArrowPathIcon,
  WrenchIcon,
  CodeBracketIcon,
  LockClosedIcon,
  CpuChipIcon,
  ClockIcon,
  CheckBadgeIcon,
  Squares2X2Icon,
  CalendarIcon,
  ShieldExclamationIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  InboxIcon,
  ShareIcon,
  ArrowRightCircleIcon,
  PaintBrushIcon,
  MagnifyingGlassPlusIcon,
  FingerPrintIcon,
  HeartIcon,
  FireIcon,
  PlayIcon,
  CameraIcon,
  PhotoIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const servicesDirectory = path.join(process.cwd(), 'content', 'services');

export function getSortedServicesData(lang: string) {
  const langDirectory = path.join(servicesDirectory, lang);
  const fileNames = fs.readdirSync(langDirectory);
  const allServicesData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(langDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as { title: string; description: string }),
    };
  });
  return allServicesData;
}

export function getAllServiceSlugs() {
  const languages = fs.readdirSync(servicesDirectory);
  let paths: { params: { lang: string, slug: string } }[] = [];

  languages.forEach((lang) => {
    const langDirectory = path.join(servicesDirectory, lang);
    if (fs.statSync(langDirectory).isDirectory()) {
      const fileNames = fs.readdirSync(langDirectory);
      const langPaths = fileNames.map((fileName) => {
        return {
          params: {
            lang: lang,
            slug: fileName.replace(/\.mdx$/, ''),
          },
        };
      });
      paths = paths.concat(langPaths);
    }
  });

  return paths;
}

export type ServiceContentBlock =
  | { type: 'FeatureList'; data: { title: string; description: string; features: { name: string; description: string; icon: React.ElementType }[] } }
  | { type: 'StatsGrid'; data: { title: string; description: string; stats: { name: string; value: string }[] } }
  | { type: 'ServiceCardGrid'; data: { title: string; description: string; services: { name: string; leadText: string; features: string[]; icon: React.ElementType; href: string; buttonText: string }[] } }
  | { type: 'ProcessSteps'; data: { title: string; description: string; steps: { name: string; description: string; icon: React.ElementType }[]; conclusion: string } }
  | { type: 'MdxContent'; source: any };

export type ServiceData = {
  slug: string;
  frontmatter: { [key: string]: any };
  contentBlocks: ServiceContentBlock[];
  faqData: null | { title: string; description: string; faqs: { question: string; answer: string; category: string }[] };
  rawContent?: string; // Qwantix: raw MDX content for TOC parsing
};

export async function getServiceData(lang: string, slug: string): Promise<ServiceData> {
  const sanitizedSlug = sanitizeSlug(slug);
  
  // Try requested language first, then gracefully fall back to English
  const candidateLanguages = [lang, 'en'];
  let fileContents = '';
  let resolvedPath = '';

  for (const candidateLang of candidateLanguages) {
    const attemptPath = path.join(servicesDirectory, candidateLang, `${sanitizedSlug}.mdx`);
    if (fs.existsSync(attemptPath)) {
      resolvedPath = attemptPath;
      fileContents = fs.readFileSync(attemptPath, 'utf8');
      break;
    }
  }

  if (!fileContents) {
    // If file not found after checking all candidate languages, throw error
    throw new Error(`Service file not found: ${sanitizedSlug} for language ${lang}`);
  }

  const { data, content } = matter(fileContents);

  // New parsing logic
  const sections = content.split(/(?=^##\s)/m);

  const parsedData: { [key: string]: any } = {
    contentBlocks: [],
    faqData: null
  };

  const iconMap: { [key: string]: React.ElementType } = {
    // SEO
    'Data-Driven Strategies': PresentationChartLineIcon,
    'Customized Solutions': AdjustmentsHorizontalIcon,
    'Transparent Reporting': DocumentChartBarIcon,
    'Continuous Optimization': ChartBarIcon,
    'Integrated Approach': PuzzlePieceIcon,
    'Ethical & Future-Proof SEO': ShieldCheckIcon,
    'Comprehensive SEO': ClipboardDocumentListIcon,
    'Local SEO': MapPinIcon,
    'E-commerce SEO': BuildingStorefrontIcon,
    'Technical SEO': WrenchScrewdriverIcon,
    'Keyword Research & Strategy': MagnifyingGlassIcon,
    'On-Page SEO': DocumentTextIcon,
    'Link Building': LinkIcon,
    'Comprehensive Website Audit': ClipboardDocumentCheckIcon,
    'Keyword Research and Analysis': MagnifyingGlassIcon,
    'On-Page Optimization': DocumentTextIcon,
    'Content Strategy and Creation': NewspaperIcon,
    'Link Building and Outreach': LinkIcon,
    'Performance Tracking and Reporting': PresentationChartLineIcon,
    'Discovery and Goal Setting': MagnifyingGlassIcon,
    'In-Depth SEO Audit': ClipboardDocumentCheckIcon,
    'Strategy Development': ClipboardDocumentListIcon,
    'Comprehensive SEO Audit': ClipboardDocumentCheckIcon,
    'Implementation': RocketLaunchIcon,
    'Monitoring and Optimization': ArrowTrendingUpIcon,
    'Regular Reporting': ChatBubbleLeftRightIcon,
    'Achieve Top Rankings': ChartPieIcon,
    'Build Authority': AcademicCapIcon,
    'Attract Qualified Traffic': CursorArrowRaysIcon,
    'Improve User Experience': SparklesIcon,
    'Generate Measurable ROI': ChartBarIcon,
    'In-Depth Website Analysis': BeakerIcon,
    'Keyword Strategy Development': MagnifyingGlassIcon,
    'Off-Page Optimization': GlobeAltIcon,
    'Technical SEO Foundation': ServerIcon,
    'Performance Monitoring and Reporting': EyeIcon,
    'Holistic Approach': PuzzlePieceIcon,
    'Data-Driven Insights': PresentationChartLineIcon,
    'Customized Strategies': AdjustmentsHorizontalIcon,
    'Proven Track Record': CheckCircleIcon,
    'Content Creation and Optimization': NewspaperIcon,
    'Content and Link Building': NewspaperIcon,
    'Continuous Monitoring and Reporting': ChartBarIcon,
    'Local and E-commerce Optimization': GlobeAltIcon,
    'Expert Team': AcademicCapIcon,
    
    // E-commerce SEO
    'Increase Product Visibility': EyeIcon,
    'Optimize Category Pages': BuildingStorefrontIcon,
    'Enhance Product Discoverability': MagnifyingGlassIcon,
    'Improve Conversion Rates': ChartPieIcon,
    'Maximize Revenue': ChartBarIcon,
    'Boost Mobile Performance': SparklesIcon,
    'Product Page Optimization': DocumentTextIcon,
    'Category Structure Enhancement': BuildingStorefrontIcon,
    'Rich Snippets Implementation': SparklesIcon,
    'Product Schema Markup': CommandLineIcon,
    'Internal Linking Strategy': LinkIcon,
    'Image Optimization': EyeIcon,
    'Site Architecture for E-commerce': ServerIcon,
    'Conversion Rate Optimization': ChartPieIcon,
    'E-commerce Specialization': BuildingStorefrontIcon,
    'Product-Focused Strategies': DocumentTextIcon,
    'Conversion-Oriented Approach': ChartBarIcon,
    'Technical E-commerce Expertise': ServerIcon,
    'Scalable Solutions (E-commerce)': PuzzlePieceIcon,
    'E-commerce Audit': ClipboardDocumentCheckIcon,
    'Product and Category Analysis': BeakerIcon,
    'Implementation and Optimization': RocketLaunchIcon,
    'Technical and Schema Implementation': CommandLineIcon,
    
    // Local SEO
    'Excel in Neighborhood Search Listings': ChartPieIcon,
    'Increase Visibility in Google Maps': MapPinIcon,
    'Attract More Nearby Customers': CursorArrowRaysIcon,
    'Improve Local Brand Recognition': BuildingOfficeIcon,
    'Boost In-Store and Online Sales': CurrencyDollarIcon,
    'Maximize Local Market Share': ChartBarIcon,
    'Google Business Profile Optimization': BuildingOfficeIcon,
    'Area-Specific Keyword Strategy': MagnifyingGlassIcon,
    'Location-Specific Content Creation': MapPinIcon,
    'Citation Building and Management': ClipboardIcon,
    'Review Management': StarIcon,
    'Community-focused Link Building': UserGroupIcon,
    'Schema Markup Implementation': CommandLineIcon,
    'Local Content Optimization': DocumentTextIcon,
    'Hyper-Local Expertise': MapPinIcon,
    'Agile Optimization': ArrowPathIcon,
    'Integrated Marketing Approach': PuzzlePieceIcon,
    'Local Market Analysis': BeakerIcon,
    'Local SEO Audit': ClipboardDocumentCheckIcon,
    'Local Content and Link Building': NewspaperIcon,
    
    // Technical SEO
    'Enhance Site Speed and Performance': BoltIcon,
    'Improve Crawlability and Indexation': GlobeAltIcon,
    'Optimize Site Structure and Architecture': ServerIcon,
    'Implement Structured Data Markup': CommandLineIcon,
    'Resolve Technical Issues and Penalties': WrenchIcon,
    'Boost Mobile Responsiveness and User Experience': DevicePhoneMobileIcon,
    'Site Speed Optimization': BoltIcon,
    'Website Architecture Optimization': ServerIcon,
    'Mobile Responsiveness': DevicePhoneMobileIcon,
    'XML Sitemap Optimization': ClipboardDocumentCheckIcon,
    'Core Web Vitals Optimization': ChartBarIcon,
    'JavaScript SEO': CodeBracketIcon,
    'Security and HTTPS Implementation': LockClosedIcon,
    'Advanced Technical Expertise': CpuChipIcon,
    'Cutting-Edge Tools and Technologies': CogIcon,
    'Data-Driven Approach': PresentationChartLineIcon,
    'Customized Technical Solutions': AdjustmentsHorizontalIcon,
    'Continuous Learning and Adaptation': AcademicCapIcon,
    'Integrated SEO Approach': PuzzlePieceIcon,
    'Technical Site Audit': ClipboardDocumentCheckIcon,
    'Performance Benchmarking': ChartBarIcon,
    'Drive Sustainable Growth': ArrowTrendingUpIcon,
    'Iterative Optimization': ArrowPathIcon,
    
    // PPC
    'Keyword Research and Segmentation': TagIcon,
    'Ad Copy Development and Testing': DocumentTextIcon,
    'Landing Page Creation and Optimization': DevicePhoneMobileIcon,
    'Bid Management and Optimization': AdjustmentsHorizontalIcon,
    'Conversion Tracking and Reporting': DocumentChartBarIcon,
    'Ongoing Optimization and Refinement': ArrowPathIcon,
    'Multi-channel PPC Strategy Development': Squares2X2Icon,
    'Strategic Keyword Management': MagnifyingGlassIcon,
    'Proven PPC Strategies': RocketLaunchIcon,
    'Granular Keyword Targeting': TagIcon,
    'Compelling Ad Copy Creation': DocumentTextIcon,
    'Advanced Bid Optimization': AdjustmentsHorizontalIcon,
    'Seamless Landing Page Integration': DevicePhoneMobileIcon,
    'Rigorous A/B Testing': BeakerIcon,
    'Cross-channel PPC Expertise': Squares2X2Icon,
    'Targeted Ad Campaigns': CursorArrowRaysIcon,
    'Real-time Performance Monitoring': PresentationChartLineIcon,
    'Maximized Ad Visibility': EyeIcon,
    'Continuous ROI Improvement': ArrowTrendingUpIcon,
    'Competitive Edge in Paid Search': RocketLaunchIcon,
    'Keyword Strategy and Account Setup': ClipboardDocumentListIcon,
    'Ad Creation and Launch': RocketLaunchIcon,
    'Search Ads': MagnifyingGlassIcon,
    'Display & Social Media Ads': UsersIcon,
    'Shopping Ads': BuildingStorefrontIcon,
    
    // SMM
    'Audience-Centric Strategy': UsersIcon,
    'Creative Content Production': PaintBrushIcon,
    'Advanced Social Listening': SpeakerWaveIcon,
    'Influencer Network': HeartIcon,
    'Crisis Management Preparedness': ShieldExclamationIcon,
    'ROI-Focused Reporting': DocumentChartBarIcon,
    'Platform Selection and Strategy Development': AdjustmentsHorizontalIcon,
    'Content Strategy and Calendar Creation': CalendarIcon,
    'Community Building and Engagement': UserGroupIcon,
    'Social Listening and Reputation Management': SpeakerWaveIcon,
    'Influencer Identification and Collaboration': UsersIcon,
    'Performance Tracking and Optimization': PresentationChartLineIcon,
    'Strategic Platform Selection': Squares2X2Icon,
    'Content Strategy Development': ClipboardDocumentListIcon,
    'Community Building and Management': UserGroupIcon,
    'Influencer Partnership Management': HeartIcon,
    'Social Media Analytics and Reporting': PresentationChartLineIcon,
    'Crisis Management Planning': ShieldExclamationIcon,
    
    // Content / Copywriting
    'Project Brief and Goal Setting': ClipboardIcon,
    'Audience Research and Persona Development': UsersIcon,
    'Competitive Analysis': MagnifyingGlassIcon,
    'Key Message Development': ChatBubbleOvalLeftEllipsisIcon,
    'Draft Creation': DocumentTextIcon,
    'Editing and Refinement': WrenchScrewdriverIcon,
    'Client Review and Revisions': ClipboardDocumentCheckIcon,
    'Brand Voice Development': SpeakerWaveIcon,
    'SEO-Optimized Web Copy': GlobeAltIcon,
    'Persuasive Sales Copy': CurrencyDollarIcon,
    'Email Marketing Copy': InboxIcon,
    'Social Media Copywriting (Copywriting)': DocumentTextIcon,
    'Ad Copy Creation': TagIcon,
    'Content Marketing Copy': NewspaperIcon,
    'Persuasive Writing Expertise': SparklesIcon,
    'Industry-Specific Knowledge': AcademicCapIcon,
    'SEO-Optimized Copy': GlobeAltIcon,
    'Conversion-Focused Approach': ArrowRightCircleIcon,
    'Brand Voice Consistency (Copywriting)': SpeakerWaveIcon,
    'Multi-format Proficiency': Squares2X2Icon,
    'Data-Driven Refinement': PresentationChartLineIcon,
    'Quick Turnaround Times': ClockIcon,
    'Content Localization': GlobeAltIcon,
    'Visual Content Production': PaintBrushIcon,
    'Copywriting': DocumentTextIcon,
    'Content Strategy': ClipboardDocumentListIcon,

    // Copywriting specific - Section 1
    'Attention-Grabbing Headlines': SpeakerWaveIcon,
    'Targeted Messaging': ChatBubbleBottomCenterTextIcon,
    'Persuasive CTAs': CursorArrowRaysIcon,
    'Brand Storytelling': ChatBubbleOvalLeftEllipsisIcon,
    'Search-Friendly Copy': MagnifyingGlassIcon,
    'Platform-Specific Style': DevicePhoneMobileIcon,
    'Psychological Triggers': BoltIcon,
    'Continuous Improvement': ArrowPathIcon,

    // Content Creation specific
    'Develop a consistent and compelling brand voice across all channels': SpeakerWaveIcon,
    'Create valuable, engaging content that resonates with your target audience': UsersIcon,
    'Improve search engine visibility and organic traffic': GlobeAltIcon,
    'Establish thought leadership in your industry (Content)': AcademicCapIcon,
    'Support your sales funnel at every stage': ArrowPathIcon,
    'Increase audience engagement and retention': UserGroupIcon,
    'Provide measurable ROI for your marketing efforts': ChartBarIcon,
    'Adapt content strategies to evolving market trends and audience needs': ClipboardDocumentListIcon,
    'Multi-Format Content Production': Squares2X2Icon,
    'Visual Content Creation': PaintBrushIcon,
    'Video Content Production': PlayIcon,
    'Content Optimization for SEO': GlobeAltIcon,
    'Content Performance Analysis (Content Creation)': PresentationChartLineIcon,
    'Comprehensive Content Expertise': AcademicCapIcon,
    'SEO-Optimized Content': GlobeAltIcon,
    'Agile Content Creation Process': RocketLaunchIcon,
    'Continuous Performance Analysis': PresentationChartLineIcon,
    'Content Audit and Goal Alignment (Content Creation)': ClipboardDocumentCheckIcon,
    'Content Strategy Formulation': ClipboardDocumentListIcon,
    'Content Calendar Planning (Content Creation)': CalendarIcon,
    'SEO Optimization': GlobeAltIcon,
    'Content Audit and Strategy Assessment': ClipboardDocumentCheckIcon,
    'Content Strategy Workshop': LightBulbIcon,
    'Custom Content Plan Development': ClipboardDocumentListIcon,
    'Multi-Format Content Package': Squares2X2Icon,

    // Russian translations for Content Creation
    'Развить последовательный и убедительный голос бренда на всех каналах': SpeakerWaveIcon,
    'Создать ценный, привлекательный контент, который находит отклик у вашей целевой аудитории': UsersIcon,
    'Улучшить видимость в поисковых системах и органический трафик': GlobeAltIcon,
    'Установить лидерство мнений в вашей отрасли': AcademicCapIcon,
    'Поддержать вашу воронку продаж на каждом этапе': ArrowPathIcon,
    'Увеличить вовлеченность и удержание аудитории': UserGroupIcon,
    'Предоставить измеримый ROI для ваших маркетинговых усилий': ChartBarIcon,
    'Адаптировать контент-стратегии к развивающимся рыночным трендам и потребностям аудитории': ClipboardDocumentListIcon,
    'Разработка контент-стратегии': ClipboardDocumentListIcon,
    'Производство мультиформатного контента': Squares2X2Icon,
    'Создание визуального контента': PaintBrushIcon,
    'Производство видеоконтента': PlayIcon,
    'Оптимизация контента для SEO': GlobeAltIcon,
    'Локализация контента': GlobeAltIcon,
    'Анализ производительности контента': PresentationChartLineIcon,
    'Комплексная контент-экспертиза': AcademicCapIcon,
    'Данные-ориентированная контент-стратегия': PresentationChartLineIcon,
    'SEO-оптимизированный контент': GlobeAltIcon,
    'Консистентность голоса бренда': SpeakerWaveIcon,
    'Возможности локализации контента': GlobeAltIcon,
    'Гибкий процесс создания контента': RocketLaunchIcon,
    'Непрерывный анализ производительности': PresentationChartLineIcon,
    'Аудит контента и согласование целей': ClipboardDocumentCheckIcon,
    'Исследование аудитории и разработка персон': UsersIcon,
    'Формулировка контент-стратегии': ClipboardDocumentListIcon,
    'Планирование календаря контента': CalendarIcon,
    'SEO-оптимизация': GlobeAltIcon,
    'Аудит и оценка контент-стратегии': ClipboardDocumentCheckIcon,
    'Мастер-класс по контент-стратегии': LightBulbIcon,
    'Разработка индивидуального плана контента': ClipboardDocumentListIcon,
    'Пакет мультиформатного контента': Squares2X2Icon,

    // Spanish translations for Content Creation
    'Desarrollar una voz de marca consistente y convincente en todos los canales': SpeakerWaveIcon,
    'Crear contenido valioso y atractivo que resuene con tu audiencia objetivo': UsersIcon,
    'Mejorar la visibilidad en motores de búsqueda y tráfico orgánico': GlobeAltIcon,
    'Establecer liderazgo de pensamiento en tu industria': AcademicCapIcon,
    'Apoyar tu embudo de ventas en cada etapa': ArrowPathIcon,
    'Aumentar el engagement и retención de audiencia': UserGroupIcon,
    'Proporcionar ROI medible para tus esfuerzos de marketing': ChartBarIcon,
    'Adaptar estrategias de contenido a tendencias de mercado y necesidades de audiencia en evolución': ClipboardDocumentListIcon,
    'Desarrollo de Estrategia de Contenido': ClipboardDocumentListIcon,
    'Producción de Contenido Multi-formato': Squares2X2Icon,
    'Creación de Contenido Visual': PaintBrushIcon,
    'Producción de Contenido de Video': PlayIcon,
    'Optimización de Contenido para SEO': GlobeAltIcon,
    'Localización de Contenido': GlobeAltIcon,
    'Análisis de Rendimiento de Contenido': PresentationChartLineIcon,
    'Experience Integral en Contenido': AcademicCapIcon,
    'Estrategia de Contenido Basada en Datos': PresentationChartLineIcon,
    'Contenido Optimizado para SEO': GlobeAltIcon,
    'Consistencia de Voz de Marca': SpeakerWaveIcon,
    'Capacidades de Localización de Contenido': GlobeAltIcon,
    'Proceso Ágil de Creación de Contenido': RocketLaunchIcon,
    'Análisis Continuo de Rendimiento': PresentationChartLineIcon,
    'Auditoría de Contenido и Alineación de Objetivos': ClipboardDocumentCheckIcon,
    'Investigación de Audiencia y Desarrollo de Personas': UsersIcon,
    'Formulación de Estrategia de Contenido': ClipboardDocumentListIcon,
    'Planificación de Calendario de Contenido': CalendarIcon,
    'Optimización SEO': GlobeAltIcon,
    'Auditoría и Evaluación de Estrategia de Contenido': ClipboardDocumentCheckIcon,
    'Taller de Estrategia de Contenido': LightBulbIcon,
    'Desarrollo de Plan de Contenido Personalizado': ClipboardDocumentListIcon,
    'Paquete de Contenido Multi-formato': Squares2X2Icon,

    // German translations for Content Creation
    'Entwickeln Sie eine konsistente und überzeugende Markenstimme auf allen Kanälen': SpeakerWaveIcon,
    'Erstellen Sie wertvollen, ansprechenden Content, der bei Ihrer Zielgruppe Anklang findet': UsersIcon,
    'Verbessern Sie die Sichtbarkeit in Suchmaschinen und organischen Traffic': GlobeAltIcon,
    'Etablieren Sie Thought Leadership in Ihrer Branche': AcademicCapIcon,
    'Unterstützen Sie Ihren Sales-Funnel in jeder Phase': ArrowPathIcon,
    'Erhöhen Sie Zielgruppenengagement und -bindung': UserGroupIcon,
    'Bieten Sie messbaren ROI für Ihre Marketingbemühungen': ChartBarIcon,
    'Passen Sie Content-Strategien an sich entwickelnde Markttrends und Zielgruppenbedürfnisse an': ClipboardDocumentListIcon,
    'Content-Strategieentwicklung': ClipboardDocumentListIcon,
    'Multi-Format-Content-Produktion': Squares2X2Icon,
    'Visuelle Content-Erstellung': PaintBrushIcon,
    'Video-Content-Produktion': PlayIcon,
    'Content-Optimierung für SEO': GlobeAltIcon,
    'Content-Lokalisierung': GlobeAltIcon,
    'Content-Leistungsanalyse': PresentationChartLineIcon,
    'Umfassende Content-Expertise': AcademicCapIcon,
    'Datenbasierte Content-Strategie': PresentationChartLineIcon,
    'SEO-optimierter Content': GlobeAltIcon,
    'Markenstimmen-Konsistenz': SpeakerWaveIcon,
    'Content-Lokalisierungsfähigkeiten': GlobeAltIcon,
    'Agiler Content-Erstellungsprozess': RocketLaunchIcon,
    'Kontinuierliche Leistungsanalyse': PresentationChartLineIcon,
    'Content-Analyse und Zielausrichtung': ClipboardDocumentCheckIcon,
    'Zielgruppenforschung und Persona-Entwicklung': UsersIcon,
    'Content-Strategieformulierung': ClipboardDocumentListIcon,
    'Content-Kalenderplanung': CalendarIcon,
    'SEO-Optimierung': GlobeAltIcon,
    'Content-Analyse und Strategiebewertung': ClipboardDocumentCheckIcon,
    'Content-Strategie-Workshop': LightBulbIcon,
    'Entwicklung eines maßgeschneiderten Content-Plans': ClipboardDocumentListIcon,
    'Multi-Format Content-Paket': Squares2X2Icon,

    // SMM Community Management
    'Foster meaningful interactions between your brand and followers': ChatBubbleLeftRightIcon,
    'Create a sense of belonging among your audience': UserGroupIcon,
    'Increase brand loyalty and customer retention': HeartIcon,
    'Gather valuable feedback and insights from your community': ChartBarIcon,
    'Mitigate potential crises and manage brand reputation': ShieldExclamationIcon,
    'Encourage user-generated content and brand advocacy': SparklesIcon,
    'Provide timely and effective customer support': ChatBubbleBottomCenterTextIcon,
    'Amplify your brand\'s voice through authentic conversations': SpeakerWaveIcon,
    'Proactive Engagement Strategies': ChatBubbleOvalLeftEllipsisIcon,
    'Community Guidelines and Moderation': ShieldCheckIcon,
    'Crisis Management and Reputation Defense': ShieldExclamationIcon,
    'User-Generated Content Curation': SparklesIcon,
    'Community Insights and Feedback Collection': PresentationChartLineIcon,
    'Community Growth Initiatives': ArrowTrendingUpIcon,
    'Cross-Platform Community Synergy': GlobeAltIcon,
    'Community Building Expertise': UserGroupIcon,
    'Real-Time Engagement Strategies': ClockIcon,
    'Community Insights Analysis': PresentationChartLineIcon,
    'Customized Moderation Guidelines': AdjustmentsHorizontalIcon,
    'Scalable Community Solutions': RocketLaunchIcon,
    'Community Audit and Goal Setting': MagnifyingGlassIcon,
    'Community Guidelines Development': ShieldCheckIcon,
    'Engagement Strategy Creation': LightBulbIcon,
    'Proactive Content Curation': NewspaperIcon,
    'Real-Time Moderation and Support': ChatBubbleBottomCenterTextIcon,

    // SMM Content Creation
    'Craft platform-specific content that resonates with each audience': Squares2X2Icon,
    'Develop a consistent brand voice across all social channels': SpeakerWaveIcon,
    'Create visually appealing and shareable multimedia content': PaintBrushIcon,
    'Leverage trending topics and formats to increase visibility': BoltIcon,
    'Tell your brand story through engaging narratives': ChatBubbleOvalLeftEllipsisIcon,
    'Encourage user interaction and community building': UserGroupIcon,
    'Optimize content for social media algorithms': CpuChipIcon,
    'Repurpose content effectively across multiple platforms': ArrowPathIcon,

    // Organic SMM
    'Develop a strong, authentic brand voice': SpeakerWaveIcon,
    'Create and share valuable, engaging content': DocumentTextIcon,
    'Build a loyal community around your brand': UserGroupIcon,
    'Improve customer trust and credibility': ShieldCheckIcon,
    'Increase organic reach and visibility': ArrowTrendingUpIcon,
    'Enhance customer service and support': ChatBubbleBottomCenterTextIcon,
    'Gain deep insights into your audience\'s preferences': ChartBarIcon,
    'Establish thought leadership in your industry (SMM)': AcademicCapIcon,
    'Content Creation Excellence': PaintBrushIcon,
    'Organic Growth Strategies': ArrowTrendingUpIcon,
    'Social Listening Mastery': SpeakerWaveIcon,
    'Authentic Influencer Relationships': HeartIcon,
    'Long-Term Brand Building': BuildingOfficeIcon,
    'Integrated Content Strategy': ClipboardDocumentListIcon,
    'Audience Analysis and Persona Development': UsersIcon,
    'Organic Content Strategy Creation': ClipboardDocumentListIcon,
    'Community Building and Engagement Planning': UserGroupIcon,
    'User-Generated Content Campaign Design': SparklesIcon,
    'Organic Influencer Outreach': HeartIcon,
    'Social Listening and Trend Monitoring': SpeakerWaveIcon,
    'Performance Analysis and Strategy Refinement': PresentationChartLineIcon,

    // Visual Content Production
    'Brand Visual Identity Development': FingerPrintIcon,
    'Custom Graphic Design': PaintBrushIcon,
    'Professional Photography': CameraIcon,
    'Video Production and Editing': VideoCameraIcon,
    'Infographic Creation': PresentationChartLineIcon,
    'Animation and Motion Graphics': SparklesIcon,
    '360° and VR Content Production': GlobeAltIcon,
    'Creative Excellence': StarIcon,
    'Brand-Aligned Visuals': CheckBadgeIcon,
    'Multi-Format Expertise': Squares2X2Icon,
    'Data-Driven Design': PresentationChartLineIcon,
    'Cutting-Edge Technology': CpuChipIcon,
    'SEO-Optimized Visuals': GlobeAltIcon,
    'Rapid Turnaround': ClockIcon,
    'Creative Brief and Goal Setting': ClipboardIcon,
    'Visual Style Development': PaintBrushIcon,
    'Concept Creation and Storyboarding': LightBulbIcon,
    'Asset Creation': PhotoIcon,
    'Post-Production and Optimization': WrenchIcon,
    'Review and Approval': CheckCircleIcon,
    'Performance Analysis (Visual)': ChartBarIcon,

    // Visual Content Production - Russian
    'Разработка визуальной идентичности бренда': FingerPrintIcon,
    'Индивидуальный графический дизайн': PaintBrushIcon,
    'Профессиональная фотография': CameraIcon,
    'Производство и монтаж видео': VideoCameraIcon,
    'Создание инфографики': PresentationChartLineIcon,
    'Анимация и моушн-дизайн': SparklesIcon,
    'Производство 360° и VR контента': GlobeAltIcon,
    'Поддержка UI/UX дизайна': PaintBrushIcon,
    'Дискавери и стратегия': ClipboardDocumentListIcon,
    'Разработка креативной концепции': PaintBrushIcon,
    'Производство активов': PhotoIcon,
    'Оптимизация и доработка': ArrowPathIcon,
    'Обзор и утверждение': CheckCircleIcon,
    'Запуск и анализ эффективности': ChartBarIcon,

    // SMM Content Creation specific
    'Platform-Specific Content Strategy': ClipboardDocumentListIcon,
    'Video Content Development': PlayIcon,
    'Interactive Content Creation': SparklesIcon,
    'User-Generated Content Campaigns': UserGroupIcon,
    'Social Media Copywriting (SMM)': DocumentTextIcon,
    'Content Calendar Management': CalendarIcon,
    'Multimedia Content Production': SparklesIcon,
    'Content Repurposing Mastery': ArrowPathIcon,
    'Social Media Performance Analysis': PresentationChartLineIcon,

    // Content Localization
    'Cultural Nuance Adaptation': GlobeAltIcon,
    'Global Brand Consistency': ShieldCheckIcon,
    'International Conversion': ArrowTrendingUpIcon,
    'PR Risk Mitigation': ShieldExclamationIcon,
    'Local Search Performance': MapPinIcon,
    'Enhanced User Experience': SparklesIcon,
    'Trust and Credibility': CheckBadgeIcon,
    'Competitive Edge': RocketLaunchIcon,
    'Cultural Adaptation': GlobeAltIcon,
    'Linguistic Expertise': AcademicCapIcon,
    'Visual Content Localization': PaintBrushIcon,
    'SEO Localization': GlobeAltIcon,
    'Local Regulatory Compliance': ShieldCheckIcon,
    'Localized User Experience': SparklesIcon,
    'Multilingual Content Management': Squares2X2Icon,
    'Ongoing Maintenance and Updates': ArrowPathIcon,
    'Cultural Expertise': GlobeAltIcon,
    'Linguistic Precision': ChatBubbleLeftRightIcon,
    'Technology-Assisted Localization': CpuChipIcon,
    'Multi-Format Capabilities': Squares2X2Icon,
    'SEO-Integrated Localization': GlobeAltIcon,
    'Quality Assurance Process': CheckBadgeIcon,
    'Scalable Solutions (Localization)': RocketLaunchIcon,
    'Market-Specific Insights': PresentationChartLineIcon,

    // Why Choose Qwantix - SMM Content Creation
    'Platform-Specific Content Expertise': AcademicCapIcon,
    'Creative Storytelling': SparklesIcon,
    'Multimedia Production Capabilities': PlayIcon,
    'Data-Driven Content Strategy': PresentationChartLineIcon,
    'Trend Adaptation': BoltIcon,
    'Engagement-Focused Approach': HeartIcon,

    // SMM Content Creation Process
    'Content Audit and Goal Alignment (SMM)': ClipboardDocumentCheckIcon,
    'Audience Persona Development': UsersIcon,
    'Content Calendar Planning (SMM)': CalendarIcon,
    'Copywriting and Messaging': DocumentTextIcon,
    'Content Performance Analysis (SMM)': PresentationChartLineIcon,
    'Community Engagement Setup': UserGroupIcon,
    'Iterative Strategy Optimization': ArrowPathIcon,

    // Content Strategy specific
    'Strategic Alignment': AdjustmentsHorizontalIcon,
    'Audience Insights': UsersIcon,
    'Brand Voice Consistency (Strategy)': SpeakerWaveIcon,
    'Content Format Optimization': SparklesIcon,
    'Production Efficiency': CogIcon,
    'Intelligent Distribution': RocketLaunchIcon,
    'Performance Analysis (Strategy)': PresentationChartLineIcon,
    'Market Adaptation': ArrowPathIcon,
    'Content Audit and Gap Analysis': ClipboardDocumentCheckIcon,
    'Content Pillars and Themes Identification': PuzzlePieceIcon,
    'Content Mapping and Journey Optimization': MapPinIcon,
    'Channel Strategy Development': Squares2X2Icon,
    'Content Calendar and Workflow Planning': CalendarIcon,
    'Performance Metrics and KPI Setting': ChartBarIcon,
    'Data-Driven Audience Insights': PresentationChartLineIcon,
    'Comprehensive Content Audits': ClipboardDocumentCheckIcon,
    'Cross-Channel Strategy Alignment': PuzzlePieceIcon,
    'SEO-Integrated Planning': GlobeAltIcon,
    'Agile Content Roadmapping': RocketLaunchIcon,
    'ROI-Focused Approach': ArrowTrendingUpIcon,
    'Content Performance Forecasting': ChartBarIcon,
    'Customized Content Workflows': CogIcon,
  };

  // Improved icon resolver with keyword matching
  const getIcon = (title: string): React.ElementType => {
    // 1. Exact match
    if (iconMap[title]) return iconMap[title];

    // 2. Keyword match (case insensitive)
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('awareness') || lowerTitle.includes('scale') || lowerTitle.includes('voice')) return SpeakerWaveIcon;
    if (lowerTitle.includes('interests') || lowerTitle.includes('demographics') || lowerTitle.includes('behavior') || lowerTitle.includes('persona')) return UsersIcon;
    if (lowerTitle.includes('retarget') || lowerTitle.includes('remarketing') || lowerTitle.includes('repurpose')) return ArrowPathIcon;
    if (lowerTitle.includes('interactive') || lowerTitle.includes('format') || lowerTitle.includes('showcase') || lowerTitle.includes('multimedia')) return SparklesIcon;
    if (lowerTitle.includes('storytelling') || lowerTitle.includes('narrative')) return ChatBubbleOvalLeftEllipsisIcon;
    if (lowerTitle.includes('headline') || lowerTitle.includes('заголовок')) return SpeakerWaveIcon;
    if (lowerTitle.includes('cta') || lowerTitle.includes('call to action')) return CursorArrowRaysIcon;
    if (lowerTitle.includes('trigger') || lowerTitle.includes('psychological')) return BoltIcon;
    if (lowerTitle.includes('community') || lowerTitle.includes('nurture') || lowerTitle.includes('user-generated') || lowerTitle.includes('engagement') || lowerTitle.includes('belonging') || lowerTitle.includes('сообщество') || lowerTitle.includes('вовлечение') || lowerTitle.includes('comunidad') || lowerTitle.includes('participación')) return UserGroupIcon;
    if (lowerTitle.includes('app') || lowerTitle.includes('install') || lowerTitle.includes('acquisition')) return DevicePhoneMobileIcon;
    if (lowerTitle.includes('real-time') || lowerTitle.includes('trending') || lowerTitle.includes('instant') || lowerTitle.includes('реальном времени')) return ClockIcon;
    if (lowerTitle.includes('audit') || lowerTitle.includes('analysis') || lowerTitle.includes('assessment') || lowerTitle.includes('аудит') || lowerTitle.includes('анализ')) return ClipboardDocumentCheckIcon;
    if (lowerTitle.includes('keyword') || lowerTitle.includes('ключевые слова')) return MagnifyingGlassIcon;
    if (lowerTitle.includes('strategy') || lowerTitle.includes('plan') || lowerTitle.includes('roadmap') || lowerTitle.includes('стратегия') || lowerTitle.includes('план') || lowerTitle.includes('estrategia') || lowerTitle.includes('strategie')) return ClipboardDocumentListIcon;
    if (lowerTitle.includes('calendar') || lowerTitle.includes('schedule') || lowerTitle.includes('календарь')) return CalendarIcon;
    if (lowerTitle.includes('seo')) return GlobeAltIcon;
    if (lowerTitle.includes('content') || lowerTitle.includes('copy') || lowerTitle.includes('write') || lowerTitle.includes('контент') || lowerTitle.includes('contenido') || lowerTitle.includes('inhalte')) return DocumentTextIcon;
    if (lowerTitle.includes('report') || lowerTitle.includes('analytics') || lowerTitle.includes('tracking') || lowerTitle.includes('attribution') || lowerTitle.includes('modeling') || lowerTitle.includes('listening') || lowerTitle.includes('insight') || lowerTitle.includes('отчет') || lowerTitle.includes('аналитика') || lowerTitle.includes('мониторинг') || lowerTitle.includes('informe') || lowerTitle.includes('analítica') || lowerTitle.includes('monitoreo')) return PresentationChartLineIcon;
    if (lowerTitle.includes('optimize') || lowerTitle.includes('optimization') || lowerTitle.includes('improvement') || lowerTitle.includes('оптимизация') || lowerTitle.includes('улучшение')) return ArrowPathIcon;
    if (lowerTitle.includes('social') || lowerTitle.includes('audience') || lowerTitle.includes('аудитория')) return UsersIcon;
    if (lowerTitle.includes('conversion') || lowerTitle.includes('roi') || lowerTitle.includes('growth') || lowerTitle.includes('performance') || lowerTitle.includes('рост')) return ArrowTrendingUpIcon;
    if (lowerTitle.includes('loyalty') || lowerTitle.includes('retention') || lowerTitle.includes('heart') || lowerTitle.includes('advocacy') || lowerTitle.includes('лояльность') || lowerTitle.includes('lealtad') || lowerTitle.includes('loyalität')) return HeartIcon;
    if (lowerTitle.includes('moderation') || lowerTitle.includes('guidelines') || lowerTitle.includes('policy') || lowerTitle.includes('модерация') || lowerTitle.includes('правила')) return ShieldCheckIcon;
    if (lowerTitle.includes('support') || lowerTitle.includes('customer service') || lowerTitle.includes('help') || lowerTitle.includes('поддержка')) return ChatBubbleBottomCenterTextIcon;
    if (lowerTitle.includes('intent') || lowerTitle.includes('purchase')) return CursorArrowRaysIcon;
    if (lowerTitle.includes('visibility') || lowerTitle.includes('instant') || lowerTitle.includes('appear') || lowerTitle.includes('видимость')) return BoltIcon;
    if (lowerTitle.includes('top') || lowerTitle.includes('rank') || lowerTitle.includes('position')) return StarIcon;
    if (lowerTitle.includes('competitor') || lowerTitle.includes('outperform')) return FireIcon;
    if (lowerTitle.includes('trend') || lowerTitle.includes('seasonal')) return ArrowPathIcon;
    if (lowerTitle.includes('testing') || lowerTitle.includes('a/b')) return BeakerIcon;
    if (lowerTitle.includes('technical') || lowerTitle.includes('architecture') || lowerTitle.includes('speed') || lowerTitle.includes('технический')) return CogIcon;
    if (lowerTitle.includes('local') || lowerTitle.includes('maps') || lowerTitle.includes('area') || lowerTitle.includes('локальное')) return MapPinIcon;
    if (lowerTitle.includes('video') || lowerTitle.includes('видео')) return VideoCameraIcon;
    if (lowerTitle.includes('creative') || lowerTitle.includes('design') || lowerTitle.includes('visual') || lowerTitle.includes('креатив') || lowerTitle.includes('графический') || lowerTitle.includes('дизайн')) return PaintBrushIcon;
    if (lowerTitle.includes('photo') || lowerTitle.includes('фото')) return CameraIcon;
    if (lowerTitle.includes('asset') || lowerTitle.includes('ресурс') || lowerTitle.includes('актив')) return PhotoIcon;
    if (lowerTitle.includes('infographic') || lowerTitle.includes('инфографика') || lowerTitle.includes('data') || lowerTitle.includes('данные') || lowerTitle.includes('visualiz') || lowerTitle.includes('визуализац')) return PresentationChartLineIcon;
    if (lowerTitle.includes('library') || lowerTitle.includes('библиотек') || lowerTitle.includes('asset') || lowerTitle.includes('актив')) return PhotoIcon;
    if (lowerTitle.includes('ad') || lowerTitle.includes('campaign') || lowerTitle.includes('реклама') || lowerTitle.includes('кампания')) return CursorArrowRaysIcon;
    if (lowerTitle.includes('search') || lowerTitle.includes('поиск')) return MagnifyingGlassIcon;
    if (lowerTitle.includes('email') || lowerTitle.includes('рассылка')) return InboxIcon;
    if (lowerTitle.includes('influencer') || lowerTitle.includes('влиятельные лица')) return HeartIcon;
    if (lowerTitle.includes('security')) return ShieldCheckIcon;
    if (lowerTitle.includes('crisis') || lowerTitle.includes('кризис')) return ShieldExclamationIcon;
    if (lowerTitle.includes('expert') || lowerTitle.includes('knowledge') || lowerTitle.includes('эксперт') || lowerTitle.includes('leadership') || lowerTitle.includes('thought')) return AcademicCapIcon;
    if (lowerTitle.includes('implementation') || lowerTitle.includes('launch') || lowerTitle.includes('запуск')) return RocketLaunchIcon;
    if (lowerTitle.includes('funnel') || lowerTitle.includes('воронка')) return ArrowPathIcon;

    if (lowerTitle.includes('distribution') || lowerTitle.includes('reach') || lowerTitle.includes('broadcast')) return RocketLaunchIcon;
    if (lowerTitle.includes('efficiency') || lowerTitle.includes('workflow') || lowerTitle.includes('automation') || lowerTitle.includes('process')) return CogIcon;
    if (lowerTitle.includes('adaptation') || lowerTitle.includes('dynamic') || lowerTitle.includes('agile') || lowerTitle.includes('iterative')) return ArrowPathIcon;
    if (lowerTitle.includes('mapping') || lowerTitle.includes('journey')) return MapPinIcon;
    if (lowerTitle.includes('pillars') || lowerTitle.includes('themes') || lowerTitle.includes('alignment')) return PuzzlePieceIcon;
    if (lowerTitle.includes('metrics') || lowerTitle.includes('kpi') || lowerTitle.includes('roi')) return ChartBarIcon;
    
    // 3. Fallback
    return LightBulbIcon;
  };

  const leadingContentRaw = sections[0].match(/^##\s/m) ? '' : sections.shift();

  if (leadingContentRaw && leadingContentRaw.trim()) {
    let leadingContent = leadingContentRaw.trim();
    
    // Remove duplication of frontmatter description if it exists at the start
    // We normalize whitespace to handle minor differences (e.g. double spaces)
    const normalizedDesc = data.description?.replace(/\s+/g, ' ').trim();
    const normalizedContent = leadingContent.replace(/\s+/g, ' ').trim();
    
    if (normalizedDesc && normalizedContent.startsWith(normalizedDesc)) {
      // Find where the description ends in the original string to preserve the rest
      // We use a regex approach to find the first occurrence regardless of exact whitespace
      const escapedDesc = normalizedDesc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
      const descRegex = new RegExp(`^${escapedDesc}`);
      leadingContent = leadingContent.replace(descRegex, '').trim();
    }

    if (leadingContent) {
      parsedData.contentBlocks.push({
          type: 'MdxContent',
          source: await serialize(leadingContent)
      });
    }
  }

  for (const section of sections) {
      const titleMatch = section.match(/^##\s(.*)/);
      if (titleMatch) {
      const fullTitle = titleMatch[1].trim();
      const idMatch = fullTitle.match(/\{#(.*?)\}/);
      const blockType = idMatch ? idMatch[1].trim() : null;
      const title = idMatch ? fullTitle.replace(idMatch[0], '').trim() : fullTitle;
      let sectionContent = section.substring(titleMatch[0].length).trim();
      const introMatch = sectionContent.match(/^([\s\S]*?)(?=^###\s|- )/m);
      const description = introMatch ? introMatch[1].trim() : '';

      if (introMatch) {
        sectionContent = sectionContent.substring(introMatch[0].length).trim();
      }

      let blockProcessed = false;
      switch (blockType) { // Use blockType from ID for explicit mapping
        case 'FeatureList':
          // Split by next section (##) to avoid capturing general conclusions or text after the list
          const featureListContent = sectionContent.split(/(?=^##\s)/m)[0];
          let features = featureListContent.split(/(?=^###\s)/m).map(featureText => {
            const nameMatch = featureText.match(/^###\s(.*)/);
            if (!nameMatch) return null;
            const name = nameMatch[1].trim();
            let description = featureText.substring(nameMatch[0].length).trim();
            
            // Remove any general conclusion text that starts with company name (Qwantix, etc.)
            const companyNamePattern = /^(Qwantix|En Qwantix|Bei Qwantix|В Qwantix)[\s\S]*$/m;
            if (companyNamePattern.test(description)) {
              description = description.split(companyNamePattern)[0].trim();
            }
            
            // Also remove if description contains company name in the middle (likely a conclusion)
            description = description.split(/\n(?=[A-Z][a-z]+ (leverages|nutzt|aprovecha|использует|utilizes|aprovecha|utiliza))/)[0].trim();
            
            // Convert **Label:** text format to inline text
            description = description.replace(/\*\*([^*:]+):\*\*\s*/g, '');
            
            return { name, description, icon: getIcon(name) };
          }).filter((f): f is { name: string; description: string; icon: React.ElementType } => f !== null && f.name !== '');

          // Balance grid: FeatureList is 2 columns on lg screens.
          // If odd number and > 2, trim to even to avoid hanging items.
          if (features.length > 2 && features.length % 2 !== 0) {
            features = features.slice(0, features.length - 1);
          }

          parsedData.contentBlocks.push({ type: 'FeatureList', data: { title, description, features } });
          blockProcessed = true;
          break;

        case 'StatsGrid':
          const stats = sectionContent
            .split('\n')
            .filter((line) => line.trim().startsWith('- '))
            .map((line) => {
              const content = line.replace(/^- /, '').trim();
              
              // Improved logic to extract the "number" part from a sentence
              // Match patterns like "94%", "$1", "1200%", "3x", "4.48 billion", etc.
              // This regex looks for numbers with common prefixes ($) or suffixes (%, x, billion, etc.)
              const numberMatch = content.match(/((?:[\$\+]?\s*\d+[,.]?\d*\s*(?:%|x|billion|million|times|more|less)?)|(?:\d+[,.]?\d*\s*(?:%|\$|x|billion|million|times|more|less)?))/i);
              
              if (numberMatch) {
                const value = numberMatch[0].trim();
                // Replace the first occurrence of the value with an empty string, but keep the rest
                let name = content.replace(value, '').replace(/\s+/g, ' ').trim();
                
                // Clean up name: remove leading/trailing punctuation often left behind
                name = name.replace(/^[,\.\-\s]+|[,\.\-\s]+$/g, '');
                
                // Capitalize first letter of name
                if (name.length > 0) {
                  name = name.charAt(0).toUpperCase() + name.slice(1);
                }
                return { value, name };
              }

              // Fallback to first word logic if no number found
              const firstSpaceIndex = content.indexOf(' ');
              if (firstSpaceIndex === -1) {
                return { value: content, name: '' };
              }
              const value = content.substring(0, firstSpaceIndex);
              const name = content.substring(firstSpaceIndex + 1);
              return { value, name };
            })
            .slice(0, 4); // User requested only 4 items
          parsedData.contentBlocks.push({ type: 'StatsGrid', data: { title, description, stats } });
          blockProcessed = true;
          break;

        case 'ServiceCardGrid':
          // Map service names to their slugs (if they have separate pages)
          const serviceSlugMap: Record<string, string> = {
            'Local SEO': 'local-seo',
            'SEO Local': 'local-seo',
            'Lokales SEO': 'local-seo',
            'Локальное SEO': 'local-seo',
            'Technical SEO': 'technical-seo',
            'SEO Técnico': 'technical-seo',
            'Technisches SEO': 'technical-seo',
            'Техническое SEO': 'technical-seo',
            'Comprehensive SEO': 'comprehensive-seo',
            'SEO Integral': 'comprehensive-seo',
            'Umfassendes SEO': 'comprehensive-seo',
            'Комплексное SEO': 'comprehensive-seo',
            'E-commerce SEO': 'e-commerce-seo',
            'SEO para E-commerce': 'e-commerce-seo',
            'E-Commerce SEO': 'e-commerce-seo',
            'SEO для электронной коммерции': 'e-commerce-seo',
            // PPC services
            'Search Ads': 'search-ads',
            'Suchanzeigen': 'search-ads',
            'Anuncios de Búsqueda': 'search-ads',
            'Поисковая реклама': 'search-ads',
            'Display & Social Media Ads': 'display-social-media-ads',
            'Display- und Social-Media-Anzeigen': 'display-social-media-ads',
            'Anuncios de Display y Redes Sociales': 'display-social-media-ads',
            'Медийная и реклама в социальных сетях': 'display-social-media-ads',
            'Shopping Ads': 'shopping-ads',
            'Shopping-Anzeigen': 'shopping-ads',
            'Anuncios de Shopping': 'shopping-ads',
            'Торговая реклама': 'shopping-ads',
            // SMM services
            'Organic SMM': 'organic-smm',
            'Organisches SMM': 'organic-smm',
            'SMM Orgánico': 'organic-smm',
            'Органический SMM': 'organic-smm',
            'SMM Content Creation': 'smm-content-creation',
            'Social Media Content Creation': 'smm-content-creation',
            'SMM-Content-Erstellung': 'smm-content-creation',
            'Creación de Contenido SMM': 'smm-content-creation',
            'Создание контента для SMM': 'smm-content-creation',
            'SMM Community Management': 'smm-community-management',
            'Community Management': 'smm-community-management',
            'SMM-Community-Management': 'smm-community-management',
            'Gestión de Comunidad SMM': 'smm-community-management',
            'Управление сообществом SMM': 'smm-community-management',
            'Visual Content Production': 'visual-content-production',
            'Visuelle Content-Produktion': 'visual-content-production',
            'Producción de Contenido Visual': 'visual-content-production',
            'Производство визуального контента': 'visual-content-production',
          };

          let services = sectionContent.split(/(?=^###\s)/m).map(serviceText => {
              const nameMatch = serviceText.match(/^###\s(.*)/);
              const name = nameMatch ? nameMatch[1].trim() : '';
              const contentAfterTitle = serviceText.substring(nameMatch ? nameMatch[0].length : 0).trim();

              const listStartIndex = contentAfterTitle.search(/-\s/);
              let leadText = '';
              let features: string[] = [];

              if (listStartIndex !== -1) {
                  leadText = contentAfterTitle.substring(0, listStartIndex).trim();
                  const featuresText = contentAfterTitle.substring(listStartIndex);
                  features = featuresText.split(/\r?\n/).map(line => line.replace(/-\s*/, '').trim()).filter(line => line);
              } else {
                  leadText = contentAfterTitle;
              }

              // Determine href based on whether service has a separate page
              const serviceSlug = serviceSlugMap[name];
              const href = serviceSlug ? `/${lang}/services/${serviceSlug}` : '#';

              return { name, leadText, features, icon: getIcon(name), href, buttonText: 'Learn More' };
          }).filter(s => s.name);

          // Balance grid: ServiceCardGrid is 4 columns on lg screens.
          // Avoid hanging items on the second row.
          if (services.length > 4 && services.length % 4 !== 0) {
            services = services.slice(0, services.length - (services.length % 4));
          }

          parsedData.contentBlocks.push({ type: 'ServiceCardGrid', data: { title, description, services } });
          blockProcessed = true;
          break;

        case 'ProcessSteps':
            let conclusion = '';
            let currentContent = sectionContent;

            const parts = currentContent.split(/(?=^###\s)/m);
            if (parts.length > 0) {
                let lastPart = parts[parts.length - 1];
                // Split by double newline, accommodating both Windows (\r\n) and Unix (\n) line endings
                const contentParts = lastPart.split(/\r?\n\r?\n/);

                if (contentParts.length > 1) {
                    conclusion = contentParts.pop()?.trim() || '';
                    lastPart = contentParts.join('\n\n'); // Re-join with standard newlines
                }
                parts[parts.length - 1] = lastPart;
                currentContent = parts.join('');
            }

          const stepRegex = /^###\s(.*?)(?:\n|\r\n)([\s\S]*?)(?=(?:^###\s)|$)/gm;
          const stepMatches = Array.from(currentContent.matchAll(stepRegex));

          let steps = stepMatches.map(match => {
              const name = match[1].trim();
              const description = match[2].trim();
              return { name, description, icon: getIcon(name) };
          }).filter((s): s is { name: string; description: string; icon: React.ElementType } => s !== null && s.name !== '');

          // Balance grid: ProcessSteps is 3 columns on lg screens.
          // If > 3 items and not a multiple of 3, trim to avoid hanging items.
          if (steps.length > 3 && steps.length % 3 !== 0) {
            steps = steps.slice(0, steps.length - (steps.length % 3));
          }

          // Localize button text
          const localizedButtonText: Record<string, string> = {
            en: 'Discuss Your Project',
            de: 'Besprechen Sie Ihr Projekt',
            es: 'Hablemos de su proyecto',
            ru: 'Обсудить проект'
          };

          parsedData.contentBlocks.push({ 
            type: 'ProcessSteps', 
            data: { 
              title, 
              description, 
              steps, 
              conclusion,
              buttonText: localizedButtonText[lang] || localizedButtonText.en
            } 
          });
          blockProcessed = true;
          break;

        case 'SearchOptimizationFAQ': // Renamed from 'Search Optimization FAQ' for ID
          const faqItems: { question: string; answer: string; category: string; }[] = [];
          const questions = sectionContent.split(/(?=^###\s)/m).filter(q => q.trim() !== '');
          questions.forEach(qText => {
              const qMatch = qText.match(/^###\s(.*)/);
              if (!qMatch) return;
              const question = qMatch ? qMatch[1].trim() : '';
              const answer = qText.substring(qMatch ? qMatch[0].length : 0).trim();
              let category = 'SEO Fundamentals';
              const questionLower = question.toLowerCase();
              if (questionLower.includes('how long') || questionLower.includes('how often') || questionLower.includes('guarantee')) {
                category = 'Process & Expectations';
              }
              faqItems.push({ question, answer, category });
          });
          parsedData.faqData = { title, description, faqs: faqItems.filter(f => f.question) };
          blockProcessed = true;
          break;
        default:
            // This is the default case for sections with ## titles but no recognized ID
            parsedData.contentBlocks.push({
                type: 'MdxContent',
                source: await serialize(section.trim())
            });
            blockProcessed = true; // Mark as processed to avoid double-adding
            break;
      }
    }
  }

  return {
    slug,
    frontmatter: data,
    rawContent: content, // Qwantix: include raw content for TOC parsing
    ...parsedData
  } as ServiceData;
}
