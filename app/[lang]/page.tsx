import type { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionaries';
import Hero from '@/app/components/blocks/Hero';
import ServiceCardGrid from '@/app/components/blocks/ServiceCardGrid';
import FeatureList from '@/app/components/blocks/FeatureList';
import StatsGrid from '@/app/components/blocks/StatsGrid';
import IndustrySolutions from '@/app/components/blocks/IndustrySolutions';
import ProcessSteps from '@/app/components/blocks/ProcessSteps';
import CaseStudies from '@/app/components/blocks/CaseStudies';
import BudgetCalculator from '@/app/components/blocks/BudgetCalculator';
import CTA from '@/app/components/blocks/CTA';
import FAQ from '@/app/components/blocks/FAQ';
import BlogPreview from '@/app/components/blocks/BlogPreview';
import ContactUs from '@/app/components/blocks/ContactUs';
import { getAllPosts } from '@/lib/posts';
import AuroraSingle from '@/app/components/blocks/AuroraSingle';
import JsonLd, { generateOrganizationSchema, generateWebSiteSchema, generateReviewSchema, generateFAQSchema } from '@/app/components/common/JsonLd';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  SquaresPlusIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  RocketLaunchIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}`;
  
  let title: string;
  let description: string;
  let keywords: string[];

  if (lang === 'es') {
    title = 'Qwantix: Marketing digital impulsado por analítica';
    description = 'Haz crecer tu negocio con marketing digital basado en datos: SEO, PPC y contenido para maximizar el ROI.';
    keywords = ['marketing digital', 'SEO', 'PPC', 'publicidad online', 'marketing en redes sociales', 'content marketing', 'analítica web'];
  } else if (lang === 'de') {
    title = 'Qwantix: Digital Marketing – datengetrieben';
    description = 'Wachstum mit datengetriebenem Online‑Marketing: SEO, PPC & Content für maximalen ROI.';
    keywords = ['Digital Marketing', 'SEO', 'PPC', 'Online-Werbung', 'Social Media Marketing', 'Content Marketing', 'Web-Analyse'];
  } else if (lang === 'ru') {
    const dict: any = await getDictionary('ru' as any);
    title = dict?.home?.meta?.title ?? 'Qwantix: цифровой маркетинг на основе аналитики';
    description = dict?.home?.meta?.description ?? 'Рост бизнеса с digital‑маркетингом на основе данных: SEO, PPC и контент для максимального ROI.';
    keywords = ['цифровой маркетинг', 'SEO', 'PPC', 'онлайн-реклама', 'маркетинг в соцсетях', 'контент-маркетинг', 'веб-аналитика'];
  } else {
    title = 'Qwantix: Digital Marketing Powered by Analytics';
    description = 'Grow your business with analytics‑powered SEO, PPC & content strategies to maximize your online ROI.';
    keywords = ['digital marketing', 'SEO', 'PPC', 'online advertising', 'social media marketing', 'content marketing', 'web analytics'];
  }

  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}`);

  return {
    ...generateStandardMetadata({
      title,
      description,
      url: currentUrl,
      pagePath: `/${lang}`,
      keywords,
      language: lang,
      alternateLanguages,
      image: '/images/og-image.jpg',
    }),
  };
}

const faqsEn = [
  {
    question: "What services does Qwantix offer?",
    answer: "Qwantix offers a comprehensive suite of online marketing solutions, including Search Engine Optimization (SEO), Pay-Per-Click Advertising (PPC), Social Media Marketing, and Content Creation. We tailor our services to meet the unique needs of each client.",
    category: "General"
  },
  {
    question: "What makes Qwantix different from other digital marketing agencies?",
    answer: "Qwantix stands out through our data-driven approach, integrated solutions, innovative strategies, and commitment to transparency. We focus on delivering measurable results and maintaining clear communication throughout our partnership.",
    category: "General"
  },
  {
    question: "Do you work with businesses in specific industries?",
    answer: "While we have expertise across various industries, we specialize in E-commerce, Health & Beauty, Fitness, Restaurants & Cafes, Technology, Fashion, Travel & Hospitality, and Education. However, our strategies can be adapted to virtually any industry.",
    category: "General"
  },
  {
    question: "How long does it take to see results from online promotion efforts?",
    answer: "The timeline for results can vary depending on the specific strategies and your industry. Generally, you may start seeing improvements in some areas within a few months, but significant results often take 6-12 months, especially for search optimization initiatives.",
    category: "Process & Results"
  },
  {
    question: "How do you measure the success of your marketing campaigns?",
    answer: "We use a variety of metrics to measure success, including website traffic, conversion rates, engagement rates, and ROI. We provide regular reports and analytics to keep you informed about the performance of your campaigns.",
    category: "Process & Results"
  },
  {
    question: "How often will I receive updates on my campaigns?",
    answer: "We provide regular reports and updates, typically on a monthly basis. However, we're always available for questions or discussions, and we can adjust the frequency of updates based on your preferences.",
    category: "Process & Results"
  },
  {
    question: "How much does it cost to work with Qwantix?",
    answer: "Our pricing varies based on the scope of services and your specific needs. We offer customized packages to ensure you're getting the most value for your investment. Contact us for a free consultation and personalized quote.",
    category: "Financial"
  },
  {
    question: "Do I need to have a large budget to work with Qwantix?",
    answer: "We work with businesses of all sizes and can tailor our strategies to fit various budgets. Our goal is to maximize your ROI, regardless of the size of your investment.",
    category: "Financial"
  },
  {
      question: "Are there any long-term contracts?",
      answer: "We offer flexible engagement models. While we recommend a commitment of at least 6 months to see significant results from strategies like SEO, we also offer project-based work and monthly retainers. Our goal is to find a solution that fits your business needs and comfort level.",
      category: "Financial"
  }
]

const faqsEs = [
  {
    question: "¿Qué servicios ofrece Qwantix?",
    answer: "Qwantix ofrece un conjunto integral de soluciones de marketing digital, incluyendo Posicionamiento en Buscadores (SEO), Publicidad de Pago por Clic (PPC), Marketing en Redes Sociales y Creación de Contenido. Adaptamos nuestros servicios a las necesidades de cada cliente.",
    category: "General"
  },
  {
    question: "¿Qué diferencia a Qwantix de otras agencias de marketing digital?",
    answer: "Destacamos por nuestro enfoque basado en datos, soluciones integrales, estrategias innovadoras y compromiso con la transparencia. Nos enfocamos en resultados medibles y comunicación clara durante toda la colaboración.",
    category: "General"
  },
  {
    question: "¿Trabajan con empresas de sectores específicos?",
    answer: "Aunque tenemos experiencia en diversos sectores, nos especializamos en E‑commerce, Salud y Belleza, Fitness, Restaurantes y Cafeterías, Tecnología, Moda, Viajes y Hostelería, y Educación. Sin embargo, nuestras estrategias se adaptan prácticamente a cualquier sector.",
    category: "General"
  },
  {
    question: "¿Cuánto tiempo se tarda en ver resultados?",
    answer: "El tiempo varía según las estrategias y el sector. En general, se pueden ver mejoras en algunos frentes en unos meses, pero los resultados significativos suelen requerir 6‑12 meses, especialmente en iniciativas de SEO.",
    category: "Proceso y resultados"
  },
  {
    question: "¿Cómo miden el éxito de las campañas?",
    answer: "Utilizamos métricas como tráfico web, tasas de conversión, engagement y ROI. Proporcionamos informes y analíticas periódicas para mantenerle al tanto del rendimiento.",
    category: "Proceso y resultados"
  },
  {
    question: "¿Con qué frecuencia recibiré actualizaciones?",
    answer: "Enviamos informes y actualizaciones periódicas, normalmente mensuales. Siempre estamos disponibles para dudas, y podemos ajustar la frecuencia según sus preferencias.",
    category: "Proceso y resultados"
  },
  {
    question: "¿Cuánto cuesta trabajar con Qwantix?",
    answer: "El precio depende del alcance y sus necesidades. Ofrecemos paquetes personalizados para maximizar el valor de su inversión. Contáctenos para una consulta gratuita y presupuesto.",
    category: "Finanzas"
  },
  {
    question: "¿Necesito un gran presupuesto para trabajar con Qwantix?",
    answer: "Trabajamos con empresas de todos los tamaños y adaptamos las estrategias a distintos presupuestos. Nuestro objetivo es maximizar su ROI, sea cual sea la inversión.",
    category: "Finanzas"
  },
  {
    question: "¿Existen contratos a largo plazo?",
    answer: "Ofrecemos modelos flexibles. Aunque recomendamos al menos 6 meses para ver resultados sólidos en SEO, también trabajamos por proyecto y con mensualidades. Buscamos la modalidad que mejor encaje con su negocio.",
    category: "Finanzas"
  }
]

const faqsDe = [
  {
    question: "Welche Dienstleistungen bietet Qwantix an?",
    answer: "Qwantix bietet ein umfassendes Spektrum an Online‑Marketing‑Lösungen: Suchmaschinenoptimierung (SEO), Pay‑per‑Click‑Werbung (PPC), Social‑Media‑Marketing und Content‑Erstellung. Wir passen unsere Leistungen an Ihre spezifischen Ziele an.",
    category: "Allgemein"
  },
  {
    question: "Wodurch unterscheidet sich Qwantix von anderen Agenturen?",
    answer: "Durch unseren datengestützten Ansatz, integrierte Lösungen, innovative Strategien und volle Transparenz. Wir liefern messbare Ergebnisse und kommunizieren klar während der gesamten Zusammenarbeit.",
    category: "Allgemein"
  },
  {
    question: "Arbeitet ihr mit bestimmten Branchen?",
    answer: "Wir haben Erfahrung in vielen Branchen: E‑Commerce, Gesundheit & Beauty, Fitness, Restaurants & Cafés, Technologie, Fashion, Reisen & Hospitality sowie Bildung. Unsere Strategien lassen sich jedoch auf nahezu jede Branche übertragen.",
    category: "Allgemein"
  },
  {
    question: "Wie lange dauert es, bis Ergebnisse sichtbar sind?",
    answer: "Das hängt von Strategie und Branche ab. Erste Verbesserungen zeigen sich oft nach wenigen Monaten, signifikante Resultate meist nach 6–12 Monaten – insbesondere bei SEO‑Initiativen.",
    category: "Prozess & Ergebnisse"
  },
  {
    question: "Wie messt ihr den Erfolg eurer Kampagnen?",
    answer: "Wir messen u. a. Website‑Traffic, Conversion‑Rates, Engagement und ROI. Sie erhalten regelmäßige Reports und Analytics mit klaren Einblicken in die Performance.",
    category: "Prozess & Ergebnisse"
  },
  {
    question: "Wie oft erhalte ich Updates zu meinen Kampagnen?",
    answer: "In der Regel monatlich – bei Bedarf auch häufiger. Wir sind jederzeit für Fragen erreichbar und passen die Frequenz gerne an Ihre Präferenzen an.",
    category: "Prozess & Ergebnisse"
  },
  {
    question: "Was kostet die Zusammenarbeit mit Qwantix?",
    answer: "Die Kosten richten sich nach Leistungsumfang und Bedarf. Wir schnüren individuelle Pakete, damit Sie das Maximum aus Ihrem Budget holen. Kontaktieren Sie uns für ein unverbindliches Gespräch und ein Angebot.",
    category: "Finanzielles"
  },
  {
    question: "Brauche ich ein großes Budget?",
    answer: "Wir arbeiten mit Unternehmen jeder Größe und passen Strategien an unterschiedliche Budgets an. Unser Ziel ist maximaler ROI – unabhängig vom Investitionsvolumen.",
    category: "Finanzielles"
  },
  {
    question: "Gibt es langfristige Verträge?",
    answer: "Wir sind flexibel. Für starke SEO‑Ergebnisse empfehlen wir mindestens 6 Monate, bieten aber auch projektbezogene Zusammenarbeit und monatliche Retainer an – so wie es zu Ihrem Business passt.",
    category: "Finanzielles"
  }
]

const faqsRu = [
  {
    question: "Какие услуги вы предоставляете?",
    answer: "Мы предлагаем комплексные решения: SEO, PPC‑реклама, маркетинг в соцсетях и контент‑маркетинг. Подбираем стратегию под задачи каждого клиента.",
    category: "Общее"
  },
  {
    question: "Чем Qwantix отличается от других агентств?",
    answer: "Мы опираемся на данные, работаем комплексно, тестируем гипотезы и прозрачно отчитываемся. Фокус на измеримых результатах и понятной коммуникации.",
    category: "Общее"
  },
  {
    question: "С какими отраслями вы работаете?",
    answer: "Опыт есть в e‑commerce, beauty, фитнесе, HoReCa, технологиях, fashion, travel и образовании. Стратегии адаптируем под любую нишу.",
    category: "Общее"
  },
  {
    question: "Когда ждать результатов?",
    answer: "Зависит от канала и рынка. Первые сдвиги возможны через несколько месяцев, устойчивый эффект по SEO чаще всего 6–12 месяцев.",
    category: "Процесс и результаты"
  },
  {
    question: "Как вы измеряете эффективность?",
    answer: "Смотрим трафик, конверсии, вовлечённость, ROI. Предоставляем регулярные отчёты и аналитические срезы.",
    category: "Процесс и результаты"
  },
  {
    question: "Какова стоимость?",
    answer: "Стоимость зависит от объёма и задач. Формируем пакет под цели и бюджет. Запишитесь на консультацию — рассчитаем предложение.",
    category: "Финансы"
  }
]


export default async function Home({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;

  const allPosts = getAllPosts(lang);
  const dict: any = await getDictionary(lang as any);

  const isEs = lang === 'es';
  const isDe = lang === 'de';
  const isRu = lang === 'ru';

  const services = isEs ? [
    {
      name: "SEO",
      description: "Aumenta tu visibilidad con estrategias SEO basadas en datos. Optimizamos tu presencia online para atraer más leads cualificados y crecer en tráfico orgánico.",
      href: `/${lang}/services/seo`,
      icon: ChartBarIcon,
      buttonText: "Sube en los rankings"
    },
    {
      name: "Publicidad PPC",
      description: "Impulsa tráfico y conversiones con campañas PPC de precisión. Optimizamos tu inversión publicitaria para maximizar el retorno en las principales plataformas.",
      href: `/${lang}/services/ppc-advertising`,
      icon: CursorArrowRaysIcon,
      buttonText: "Mejora el rendimiento de tus anuncios"
    },
    {
      name: "Marketing en redes sociales",
      description: "Construye una presencia sólida en redes que conecte con tu audiencia. Nuestras campañas a medida impulsan el engagement, la fidelidad y las conversiones.",
      href: `/${lang}/services/social-media-marketing`,
      icon: SpeakerWaveIcon,
      buttonText: "Amplía tu alcance social"
    },
    {
      name: "Creación de contenido",
      description: "Cuenta la historia de tu marca con contenido impactante y optimizado para SEO. Creamos desde posts hasta vídeos que informan, atraen y convierten.",
      href: `/${lang}/services/content-creation`,
      icon: DocumentTextIcon,
      buttonText: "Crea contenido ganador"
    },
  ] : isDe ? [
    {
      name: "SEO",
      description: "Steigern Sie Ihre Sichtbarkeit mit datengestützten SEO‑Strategien. Wir optimieren Ihre Online‑Präsenz, um mehr qualifizierte Leads zu gewinnen und organischen Traffic zu erhöhen.",
      href: `/${lang}/services/seo`,
      icon: ChartBarIcon,
      buttonText: "In den Rankings steigen"
    },
    {
      name: "PPC‑Werbung",
      description: "Lenken Sie gezielten Traffic und Conversions mit präzisen PPC‑Kampagnen. Wir maximieren den ROI Ihres Werbebudgets auf führenden Plattformen.",
      href: `/${lang}/services/ppc-advertising`,
      icon: CursorArrowRaysIcon,
      buttonText: "Anzeigenleistung steigern"
    },
    {
      name: "Social-Media-Marketing",
      description: "Bauen Sie eine starke Präsenz auf, die Ihre Zielgruppe erreicht. Unsere maßgeschneiderten Kampagnen fördern Engagement, Loyalität und Conversions.",
      href: `/${lang}/services/social-media-marketing`,
      icon: SpeakerWaveIcon,
      buttonText: "Soziale Reichweite erhöhen"
    },
    {
      name: "Content‑Erstellung",
      description: "Erzählen Sie die Geschichte Ihrer Marke mit wirkungsvollem, SEO‑optimiertem Content – von Blogposts bis Videos, die informieren, begeistern und konvertieren.",
      href: `/${lang}/services/content-creation`,
      icon: DocumentTextIcon,
      buttonText: "Überzeugenden Content erstellen"
    },
  ] : isRu ? (
    (dict?.home?.coreServices?.items as any[] | undefined)?.length
      ? (dict.home.coreServices.items as any[]).map((item, idx) => {
          const mapping = [
            { icon: ChartBarIcon, slug: 'seo' },
            { icon: CursorArrowRaysIcon, slug: 'ppc-advertising' },
            { icon: SpeakerWaveIcon, slug: 'social-media-marketing' },
            { icon: DocumentTextIcon, slug: 'content-creation' }
          ][idx] || { icon: DocumentTextIcon, slug: '#' };
          return {
            name: item.name,
            description: item.description,
            href: `/${lang}/services/${mapping.slug}`,
            icon: mapping.icon,
            buttonText: item.buttonText
          };
        })
      : [
          {
            name: "SEO",
            description: "Повышайте видимость с помощью data‑driven SEO. Мы оптимизируем присутствие онлайн, чтобы привлекать больше целевых лидов и наращивать органический трафик.",
            href: `/${lang}/services/seo`,
            icon: ChartBarIcon,
            buttonText: "Расти в поисковой выдаче"
          },
          {
            name: "PPC‑реклама",
            description: "Ведите целевой трафик и конверсии с точными PPC‑кампаниями. Оптимизируем расходы, максимизируя ROI на ключевых платформах.",
            href: `/${lang}/services/ppc-advertising`,
            icon: CursorArrowRaysIcon,
            buttonText: "Усиливать эффективность рекламы"
          },
          {
            name: "Маркетинг в соцсетях",
            description: "Стройте сильное присутствие, которое откликается аудитории. Наши кампании повышают вовлечённость, лояльность и конверсии.",
            href: `/${lang}/services/social-media-marketing`,
            icon: SpeakerWaveIcon,
            buttonText: "Увеличивать охват в соцсетях"
          },
          {
            name: "Контент‑маркетинг",
            description: "Расскажите историю бренда с сильным, SEO‑оптимизированным контентом. От статей до видео — создаём то, что вовлекает и конвертирует.",
            href: `/${lang}/services/content-creation`,
            icon: DocumentTextIcon,
            buttonText: "Создавать победный контент"
          }
        ]
  ) : [
    {
      name: "SEO",
      description: "Boost your visibility with our data-driven SEO strategies. We optimize your online presence to attract more qualified leads and increase organic traffic.",
      href: `/${lang}/services/seo`,
      icon: ChartBarIcon,
      buttonText: "Climb Search Rankings"
    },
    {
      name: "PPC Advertising",
      description: "Drive targeted traffic and conversions with precision-targeted PPC campaigns. We optimize your ad spend for maximum return across major platforms.",
      href: `/${lang}/services/ppc-advertising`,
      icon: CursorArrowRaysIcon,
      buttonText: "Boost Ad Performance"
    },
    {
      name: "Social Media Marketing",
      description: "Build a strong social media presence that resonates with your target audience. Our tailored campaigns drive engagement, brand loyalty, and conversions.",
      href: `/${lang}/services/social-media-marketing`,
      icon: SpeakerWaveIcon,
      buttonText: "Amplify Social Reach"
    },
    {
      name: "Content Creation",
      description: "Tell your brand's story with impactful, SEO-optimized content. From blog posts to videos, we create content that informs, engages, and converts.",
      href: `/${lang}/services/content-creation`,
      icon: DocumentTextIcon,
      buttonText: "Craft Winning Content"
    },
  ];

  const baseWhyChooseUsFeatures = isEs ? [
    { name: 'Enfoque basado en datos', description: 'Aplicamos analítica avanzada en cada estrategia para garantizar resultados medibles.', icon: ChartBarIcon },
    { name: 'Soluciones integrales', description: 'Un enfoque holístico que combina SEO, PPC, redes sociales y contenido para un mayor impacto.', icon: SquaresPlusIcon },
    { name: 'Estrategias innovadoras', description: 'Nos adelantamos a las tendencias y evolucionamos tácticas para mantenerte a la vanguardia.', icon: CursorArrowRaysIcon },
    { name: 'Campañas a medida', description: 'Cada negocio es único. Diseñamos estrategias a la medida de tus objetivos y audiencia.', icon: ShieldCheckIcon },
    { name: 'Comunicación transparente', description: 'Informes claros y honestos. Siempre sabrás cómo van tus campañas.', icon: ChatBubbleLeftRightIcon },
    { name: 'Optimización ágil', description: 'Monitoreamos y ajustamos continuamente para un rendimiento óptimo.', icon: ArrowPathIcon },
  ] : isDe ? [
    { name: 'Datengestützter Ansatz', description: 'Wir nutzen moderne Analysen in jeder Strategie – für messbare Ergebnisse.', icon: ChartBarIcon },
    { name: 'Integrierte Lösungen', description: 'Ein ganzheitlicher Mix aus SEO, PPC, Social Media und Content für maximalen Impact.', icon: SquaresPlusIcon },
    { name: 'Innovative Strategien', description: 'Wir sind Trends voraus und entwickeln Taktiken kontinuierlich weiter.', icon: CursorArrowRaysIcon },
    { name: 'Maßgeschneiderte Kampagnen', description: 'Jedes Unternehmen ist einzigartig. Wir richten Strategien exakt auf Ihre Ziele aus.', icon: ShieldCheckIcon },
    { name: 'Transparente Kommunikation', description: 'Klar, ehrlich, nachvollziehbar – Sie wissen stets, wie Ihre Kampagnen performen.', icon: ChatBubbleLeftRightIcon },
    { name: 'Agile Optimierung', description: 'Wir überwachen und justieren laufend, um die Performance zu maximieren.', icon: ArrowPathIcon },
  ] : [
    { name: 'Data-Informed Approach', description: 'We leverage cutting-edge analytics to inform every strategy, ensuring measurable results.', icon: ChartBarIcon },
    { name: 'Integrated Solutions', description: 'Our holistic approach combines SEO, PPC, SMM, and content creation for maximum impact.', icon: SquaresPlusIcon },
    { name: 'Innovative Strategies', description: 'We stay ahead of online marketing trends, constantly evolving our tactics to keep you at the forefront.', icon: CursorArrowRaysIcon },
    { name: 'Tailored Campaigns', description: 'Every business is unique. We craft customized strategies that align with your specific goals and audience.', icon: ShieldCheckIcon },
    { name: 'Transparent Communication', description: "We believe in clear, honest reporting. You'll always know exactly how your campaigns are performing.", icon: ChatBubbleLeftRightIcon },
    { name: 'Agile Optimization', description: 'We continuously monitor and adjust our strategies, ensuring your campaigns always deliver optimal performance.', icon: ArrowPathIcon },
  ]

  const whyChooseUsFeatures = isRu && Array.isArray(dict?.home?.whyChooseUs?.features)
    ? baseWhyChooseUsFeatures.map((item, idx) => {
        const override = (dict.home.whyChooseUs.features as any[])[idx];
        return override ? { ...item, name: override.name ?? item.name, description: override.description ?? item.description } : item;
      })
    : baseWhyChooseUsFeatures;

  const baseImpactStats = isEs ? [
    { name: 'Aumento medio del tráfico orgánico', value: '150%+' },
    { name: 'Mejora típica en tasas de conversión', value: '30%' },
    { name: 'Crecimiento medio del engagement en redes', value: '200%' },
    { name: 'ROAS en nuestras campañas de PPC', value: '3x' },
  ] : isDe ? [
    { name: 'Durchschnittlicher Zuwachs im organischen Traffic', value: '150%+' },
    { name: 'Typische Verbesserung der Conversion‑Rates', value: '30%' },
    { name: 'Ø Wachstum beim Social‑Engagement', value: '200%' },
    { name: 'ROAS unserer PPC‑Kampagnen', value: '3x' },
  ] : [
    { name: 'Average increase in organic search traffic', value: '150%+' },
    { name: 'Typical improvement in conversion rates', value: '30%' },
    { name: 'Average growth in social media engagement', value: '200%' },
    { name: 'Return on ad spend for our PPC campaigns', value: '3x' },
  ]

  const ourImpactStats = isRu && Array.isArray(dict?.home?.ourImpact?.stats)
    ? (dict.home.ourImpact.stats as any[]).map((s, idx) => ({ name: s.name ?? baseImpactStats[idx]?.name ?? '', value: s.value ?? baseImpactStats[idx]?.value ?? '' }))
    : baseImpactStats;

  const baseApproachSteps = isEs ? [
    { name: 'Descubrimiento', description: 'Empezamos entendiendo tu negocio, objetivos y audiencia. Este análisis nos permite adaptar la estrategia a tus necesidades.', icon: MagnifyingGlassIcon },
    { name: 'Desarrollo de la estrategia', description: 'Con base en los hallazgos, diseñamos una estrategia de marketing digital alineada con tus objetivos y presupuesto.', icon: ClipboardDocumentListIcon },
    { name: 'Ejecución', description: 'Ponemos el plan en marcha utilizando las mejores prácticas en SEO, publicidad de pago, gestión de redes y creación de contenido.', icon: RocketLaunchIcon },
    { name: 'Monitoreo y análisis', description: 'Seguimos el rendimiento con analítica avanzada para tomar decisiones siempre basadas en datos.', icon: ChartBarIcon },
    { name: 'Optimización', description: 'Refinamos y ajustamos en tiempo real para maximizar el ROI y los resultados.', icon: ArrowTrendingUpIcon },
    { name: 'Informes y comunicación', description: 'Recibirás informes claros de forma regular y acceso continuo a nuestro equipo para cualquier consulta.', icon: ChatBubbleLeftRightIcon },
  ] : isDe ? [
    { name: 'Discovery', description: 'Wir starten mit einem klaren Bild Ihres Geschäfts, Ihrer Ziele und Zielgruppe – als Basis für passgenaue Strategien.', icon: MagnifyingGlassIcon },
    { name: 'Strategie‑Entwicklung', description: 'Aus den Erkenntnissen entwickeln wir einen Marketing‑Plan, der zu Zielen und Budget passt.', icon: ClipboardDocumentListIcon },
    { name: 'Umsetzung', description: 'Wir setzen den Plan mit Best Practices in SEO, Paid, Social und Content zuverlässig um.', icon: RocketLaunchIcon },
    { name: 'Monitoring & Analyse', description: 'Wir tracken die Performance mit fortgeschrittener Analytik – Entscheidungen bleiben datenbasiert.', icon: ChartBarIcon },
    { name: 'Optimierung', description: 'Auf Basis von Echtzeit‑Daten verfeinern wir fortlaufend zur Maximierung des ROI.', icon: ArrowTrendingUpIcon },
    { name: 'Reporting & Kommunikation', description: 'Regelmäßige, verständliche Reports; direkter Zugang zu unserem Team für Fragen.', icon: ChatBubbleLeftRightIcon },
  ] : [
    { name: 'Discovery', description: 'We start by understanding your business, goals, and target audience. This deep dive helps us tailor our strategies to your unique needs.', icon: MagnifyingGlassIcon },
    { name: 'Strategy Development', description: 'Based on our findings, we create a comprehensive online marketing strategy that aligns with your objectives and budget.', icon: ClipboardDocumentListIcon },
    { name: 'Execution', description: 'Our team of experts puts the plan into action, leveraging the latest tools and techniques in search optimization, paid advertising, social media management, and content creation.', icon: RocketLaunchIcon },
    { name: 'Monitoring and Analysis', description: "We continuously track the performance of your campaigns using advanced analytics tools, ensuring we're always data-driven.", icon: ChartBarIcon },
    { name: 'Optimization', description: 'Based on real-time data, we refine and adjust our strategies to maximize your ROI and achieve optimal results.', icon: ArrowTrendingUpIcon },
    { name: 'Reporting and Communication', description: "You'll receive regular, easy-to-understand reports and have ongoing access to our team for questions and discussions.", icon: ChatBubbleLeftRightIcon },
  ]

  const ourApproachSteps = isRu && Array.isArray(dict?.home?.ourApproach?.steps)
    ? baseApproachSteps.map((step, idx) => {
        const override = (dict.home.ourApproach.steps as any[])[idx];
        return override ? { ...step, name: override.name ?? step.name, description: override.description ?? step.description } : step;
      })
    : baseApproachSteps;


  return (
    <>
      <section id="hero">
        <Hero 
          title={
            isEs ? "Qwantix: Marketing digital impulsado por analítica"
            : isDe ? "Qwantix: Digital Marketing – datengetrieben"
            : isRu ? (dict?.home?.hero?.title ?? "Qwantix: цифровой маркетинг на основе аналитики")
            : "Qwantix: Digital Marketing Powered by Analytics"
          }
          subtitle={
            isEs ? "Aprovecha la analítica para SEO, redes sociales y contenido. Nuestras estrategias transforman tu presencia digital, generando crecimiento medible y maximizando tu ROI."
            : isDe ? "Nutzen Sie Analytics für SEO, Social Media und Content. Unsere Strategien stärken Ihre Online‑Präsenz, treiben messbares Wachstum und maximieren den ROI."
            : isRu ? (dict?.home?.hero?.subtitle ?? "Используйте аналитику для SEO, соцсетей и контента. Наши стратегии трансформируют присутствие онлайн, обеспечивая измеримый рост и максимальный ROI.")
            : "Harness the power of analytics-based search optimization, engaging social media, and compelling content. Our innovative strategies transform your online presence, driving measurable growth and maximizing your digital ROI."
          }
          buttonText={
            isEs ? "Empieza tu transformación digital"
            : isDe ? "Starten wir Ihre digitale Transformation"
            : isRu ? (dict?.home?.hero?.buttonText ?? "Начать цифровую трансформацию")
            : "Start Your Digital Transformation"
          }
        />
      </section>
      <section id="core-services">
        <ServiceCardGrid 
          title={
            isEs ? "Nuestros servicios principales"
            : isDe ? "Unsere Kernleistungen"
            : isRu ? (dict?.home?.coreServices?.title ?? "Наши ключевые услуги")
            : "Our Core Services"
          }
          description={
            isEs
              ? "Ofrecemos un conjunto completo de servicios de marketing digital para elevar tu marca y generar resultados medibles."
              : isDe
              ? "Wir bieten ein umfassendes Leistungspaket im Digital‑Marketing, das Ihre Marke stärkt und messbare Ergebnisse liefert."
              : isRu
              ? (dict?.home?.coreServices?.description ?? "Мы предлагаем комплекс услуг цифрового маркетинга, чтобы усилить видимость бренда и добиться измеримого роста.")
              : undefined
          }
          services={services}
        />
      </section>
      <section id="why-choose-us">
        <div className="relative isolate overflow-hidden">
          {/* Single traveling aurora background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0">
              {/* Background animation */}
              {/**/}
              <AuroraSingle />
            </div>
          </div>
          <FeatureList 
            title={
              isEs ? "Tus socios en crecimiento digital"
              : isDe ? "Ihr Partner für digitales Wachstum"
              : isRu ? (dict?.home?.whyChooseUs?.title ?? "Ваш партнёр в цифровом росте")
              : "Your Partners in Digital Growth"
            }
            description={
              isEs ? "En Qwantix no somos una agencia más: somos tus socios en crecimiento, dedicados a liberar todo el potencial de tu marca en el entorno digital."
              : isDe ? "Wir sind mehr als eine Agentur: Wir sind Ihr Wachstumspartner – mit Fokus darauf, das volle Potenzial Ihrer Marke im digitalen Raum freizusetzen."
              : isRu ? (dict?.home?.whyChooseUs?.description ?? "Мы — больше, чем агентство. Мы партнёры по росту, раскрывающие полный потенциал вашего бренда в цифровой среде.")
              : "At Qwantix, we're more than just another digital marketing agency. We're your partners in growth, dedicated to unleashing your brand's full potential in the digital landscape."
            }
            features={whyChooseUsFeatures}
            background="transparent"
          />
        </div>
      </section>
      <section id="our-impact">
        <StatsGrid 
          title={
            isEs ? "Nuestro impacto"
            : isDe ? "Unsere Wirkung"
            : isRu ? (dict?.home?.ourImpact?.title ?? "Наши результаты")
            : "Our Impact"
          }
          description={
            isEs ? "En Qwantix, nos comprometemos a ofrecer resultados tangibles. Esto es un vistazo de lo que podemos lograr juntos."
            : isDe ? "Wir liefern messbare Ergebnisse. Ein Einblick, was wir gemeinsam erreichen können."
            : isRu ? (dict?.home?.ourImpact?.description ?? "В Qwantix мы ориентируемся на измеримые результаты. Вот что мы можем достигать вместе.")
            : "At Qwantix, we're committed to delivering tangible outcomes for our clients. Here's a glimpse of what we can achieve together."
          }
          stats={ourImpactStats}
        />
      </section>
      <section id="industry-solutions" style={{ contentVisibility: 'auto' }}>
        <IndustrySolutions lang={lang} />
      </section>
      <section id="our-approach" style={{ contentVisibility: 'auto' }}>
        <ProcessSteps 
          title={
            isEs ? "Nuestro enfoque: tu camino al éxito digital"
            : isDe ? "Unser Ansatz: Ihr Weg zum digitalen Erfolg"
            : isRu ? (dict?.home?.ourApproach?.title ?? "Наш подход: ваш путь к цифровому успеху")
            : "Our Approach: Your Journey to Digital Success"
          }
          description={
            isEs ? "Creemos en un enfoque transparente y colaborativo. Nuestro proceso te mantiene informado e involucrado en cada etapa para estar siempre alineados con tu visión y objetivos."
            : isDe ? "Transparenz und Zusammenarbeit stehen bei uns im Mittelpunkt. Unser Prozess hält Sie in jeder Phase informiert und eingebunden – stets im Einklang mit Ihrer Vision und Ihren Zielen."
            : (dict?.home?.ourApproach?.description ?? "At Qwantix, we believe in a transparent, collaborative approach. Our process is designed to keep you informed and involved every step of the way, ensuring we're always aligned with your vision and goals.")
          }
          steps={ourApproachSteps}
          buttonText={
            isEs ? "Hablemos de tu proyecto"
            : isDe ? "Sprechen wir über Ihr Projekt"
            : isRu ? (dict?.home?.ourApproach?.buttonText ?? "Обсудить проект")
            : undefined
          }
        />
      </section>
      <section id="case-studies" style={{ contentVisibility: 'auto' }}>
        <CaseStudies lang={lang} />
      </section>
      <section id="budget-calculator" style={{ contentVisibility: 'auto' }}>
        <BudgetCalculator lang={lang} />
      </section>
      <section id="cta" style={{ contentVisibility: 'auto' }}>
        <CTA lang={lang} />
      </section>
      <section id="faq" style={{ contentVisibility: 'auto' }}>
        <FAQ 
          title={
            isEs ? "Preguntas frecuentes"
            : isDe ? "Häufige Fragen"
            : isRu ? (dict?.home?.faq?.title ?? "Частые вопросы")
            : "Frequently Asked Questions"
          } 
          description={
            isEs ? "¿Dudas? Tenemos respuestas. Estas son algunas de las preguntas más comunes que recibimos de nuestros clientes."
            : isDe ? "Fragen? Wir haben Antworten. Hier finden Sie häufige Fragen unserer Kundinnen und Kunden."
            : isRu ? (dict?.home?.faq?.description ?? "Вопросы? У нас есть ответы. Ниже — самые частые вопросы от клиентов.")
            : "Have questions? We have answers. Here are some of the most common questions we get from our clients."
          } 
          faqs={
            isEs ? faqsEs : isDe ? faqsDe : isRu && Array.isArray(dict?.home?.faq?.items)
            ? (dict.home.faq.items as any[])
            : isRu ? faqsRu : faqsEn
          }
          ctaText={
            isEs ? "¿Listo para dar el siguiente paso? Hablemos de tu proyecto."
            : isDe ? "Bereit für den nächsten Schritt? Sprechen wir über Ihr Projekt."
            : isRu ? (dict?.home?.faq?.ctaText ?? "Готовы сделать следующий шаг? Обсудим ваш проект.")
            : undefined
          }
          ctaButtonText={
            isEs ? "Agendar una consulta"
            : isDe ? "Kostenloses Beratungsgespräch buchen"
            : isRu ? (dict?.home?.faq?.ctaButtonText ?? "Записаться на консультацию")
            : undefined
          }
          categoriesLabel={
            isEs ? "Categorías"
            : isDe ? "Kategorien"
            : isRu ? (dict?.home?.faq?.categoriesLabel ?? "Категории")
            : undefined
          }
        />
      </section>
      <section id="blog-preview" style={{ contentVisibility: 'auto' }}>
        <BlogPreview initialPosts={allPosts} lang={lang} baseUrl={process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'} />
      </section>
      <section id="contact-us" style={{ contentVisibility: 'auto' }}>
        <ContactUs lang={lang} />
      </section>
      {/* JSON-LD Schema */}
      <JsonLd
        data={[
          generateOrganizationSchema({
            name: 'Qwantix Agency',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com',
            description: isEs 
              ? 'Agencia de marketing digital impulsada por analítica. Transformamos tu presencia online generando crecimiento medible y maximizando tu ROI digital.'
              : isDe
              ? 'Digital Marketing Agentur, datengetrieben. Wir transformieren Ihre Online-Präsenz, treiben messbares Wachstum voran und maximieren Ihren digitalen ROI.'
              : isRu
              ? 'Цифровое маркетинговое агентство на основе аналитики. Трансформируем ваше онлайн-присутствие, обеспечивая измеримый рост и максимальный цифровой ROI.'
              : 'Digital Marketing Agency Powered by Analytics. We transform your online presence, driving measurable growth and maximizing your digital ROI.',
            contactPoint: {
              contactType: 'Customer Service',
              email: 'info@qwantix.com',
            },
            slogan: isEs 
              ? 'Marketing digital impulsado por analítica'
              : isDe
              ? 'Digital Marketing – datengetrieben'
              : isRu
              ? 'Цифровой маркетинг на основе аналитики'
              : 'Digital Marketing Powered by Analytics',
            knowsAbout: [
              'SEO',
              'PPC Advertising',
              'Social Media Marketing',
              'Content Creation',
              'Technical SEO',
              'Local SEO',
              'Digital Marketing Analytics',
              'Search Engine Optimization',
            ],
            // Regional SEO targeting for Spain, Germany, and UK
            areaServed: [
              { '@type': 'Country', name: 'Spain' },
              { '@type': 'Country', name: 'Germany' },
              { '@type': 'Country', name: 'United Kingdom' },
            ],
          }),
          generateWebSiteSchema({
            name: 'Qwantix Agency',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'}/${lang}`,
            description: isEs 
              ? 'Agencia de marketing digital impulsada por analítica'
              : isDe
              ? 'Digital Marketing Agentur, datengetrieben'
              : isRu
              ? 'Цифровое маркетинговое агентство на основе аналитики'
              : 'Digital Marketing Agency Powered by Analytics',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com'}/${lang}/?s={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
          // Review and AggregateRating schema for trust signals
          generateReviewSchema({
            aggregateRating: {
              ratingValue: 4.8,
              bestRating: 5,
              worstRating: 1,
              ratingCount: 127,
            },
          }),
          // FAQ schema for homepage FAQs
          ...(lang === 'en' ? [generateFAQSchema(faqsEn.map(faq => ({
            question: faq.question,
            answer: faq.answer,
          })))] : lang === 'es' ? [generateFAQSchema(faqsEs.map(faq => ({
            question: faq.question,
            answer: faq.answer,
          })))] : lang === 'de' ? [generateFAQSchema(faqsDe.map(faq => ({
            question: faq.question,
            answer: faq.answer,
          })))] : []),
        ]}
      />
      {/* Other sections will go here */}
    </>
  );
}
