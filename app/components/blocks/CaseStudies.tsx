'use client'

import { useState, useEffect, useRef } from 'react'
import ruDict from '@/dictionaries/ru.json'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const caseStudiesEn = [
    {
        client: "Dog health insurance provider, Germany",
        title: "German Pet Insurance Platform — SEO Migration & Recovery",
        description: "Following a major structural update, high-value pages lost approximately 80% of their organic visibility overnight. We led a full technical audit, rebuilt URL architecture, and reinforced trust signals across key templates. Core commercial keywords recovered to Top 3–5 positions, while non-brand organic traffic grew by +230% month over month.",
        category: "SEO Migration",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Private medical clinic, London (UK)",
        title: "Private Ultrasound Clinic — Local Visibility That Converts",
        description: "The site lacked a clear service hierarchy and medical trust signals. We restructured core pages, implemented MedicalService schema, and improved mobile performance. The result was consistent Top 3 visibility for priority local queries and a +65% uplift in organic appointment bookings.",
        category: "Local SEO",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Statewide mortgage broker, Arizona (US)",
        title: "US Mortgage Brokerage — Scalable Local SEO Framework",
        description: "The business relied on a single landing page with limited search reach. We migrated the site to WordPress and launched 30+ location-specific service pages using a Service + City framework. This unlocked a +200% increase in local impressions and +150% growth in qualified inbound enquiries.",
        category: "Local SEO",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Data and analytics consultancy, California (US)",
        title: "B2B Data & Analytics Consultancy — Turning Expertise into Search Demand",
        description: "Although highly specialised, the website failed to reflect how decision-makers search for solutions. We introduced an entity-driven content structure (Solutions ↔ Use Cases ↔ Industries) and improved semantic alignment across pages, resulting in broader keyword coverage and steady, compounding organic growth.",
        category: "B2B SEO",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
    },
    {
        client: "Service-based business, International",
        title: "International Service Brand — SEO-Led Website Rebuild",
        description: "We supported the rebuild from the planning stage, defining site structure, page purpose, and conversion pathways before development began. The new site launched without traffic loss, achieved fast indexation, and entered SERPs with early non-brand visibility across priority topics.",
        category: "Technical SEO",
        tagBgColor: "bg-indigo-200",
        tagTextColor: "text-indigo-900",
    },
    {
        client: "International company, UK/US/EU markets",
        title: "Multilingual Brand — Market-Focused SEO Localisation",
        description: "Existing content relied on direct translation and underperformed in non-English markets. We reworked pages to reflect local search intent across EN, ES, and DE, improving engagement metrics and driving stronger visibility compared to literal translations.",
        category: "Multilingual SEO",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    }
]

const caseStudiesEs = [
    {
        client: "Proveedor de seguros para mascotas, Alemania",
        title: "Plataforma de Seguros para Mascotas — Migración SEO y Recuperación",
        description: "Tras una actualización estructural masiva, las páginas de alto valor perdieron un 80% de visibilidad orgánica de la noche a la mañana. Lideramos una auditoría técnica total, reconstruimos la arquitectura de URLs y reforzamos señales de confianza. Las palabras clave comerciales volvieron al Top 3–5 y el tráfico no brand creció un +230% mensual.",
        category: "Migración SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Clínica médica privada, Londres (Reino Unido)",
        title: "Clínica de Ultrasonido Privada — Visibilidad Local que Convierte",
        description: "El sitio carecía de jerarquía de servicios y señales de confianza médica. Reestructuramos las páginas principales, implementamos esquema MedicalService y mejoramos el rendimiento móvil. Resultado: visibilidad constante en el Top 3 para consultas locales y un +65% en reservas de citas orgánicas.",
        category: "SEO Local",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Broker hipotecario estatal, Arizona (EE. UU.)",
        title: "Corretaje Hipotecario en EE. UU. — Marco de SEO Local Escalable",
        description: "El negocio dependía de una sola página con alcance limitado. Migramos el sitio a WordPress y lanzamos más de 30 páginas de servicio por ubicación usando el marco Servicio + Ciudad. Esto desbloqueó un +200% en impresiones locales y un +150% en consultas cualificadas.",
        category: "SEO Local",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Consultoría de datos y analítica, California (EE. UU.)",
        title: "Consultoría B2B de Datos — Convirtiendo Experiencia en Demanda",
        description: "Aunque muy especializada, la web no reflejaba cómo buscan soluciones los tomadores de decisiones. Introdujimos una estructura de contenido basada en entidades (Soluciones ↔ Casos de Uso ↔ Industrias) y mejoras semánticas, logrando mayor cobertura de keywords y crecimiento orgánico sostenido.",
        category: "SEO B2B",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
    },
    {
        client: "Negocio de servicios, Internacional",
        title: "Marca de Servicio Internacional — Reconstrucción Web Liderada por SEO",
        description: "Apoyamos la reconstrucción desde la planificación, definiendo estructura, propósito de página y rutas de conversión antes del desarrollo. El sitio lanzó sin pérdida de tráfico, logró indexación rápida y entró en SERPs con visibilidad temprana en temas prioritarios.",
        category: "SEO Técnico",
        tagBgColor: "bg-indigo-200",
        tagTextColor: "text-indigo-900",
    },
    {
        client: "Empresa internacional, mercados UK/US/EU",
        title: "Marca Multilingüe — Localización SEO Enfocada al Mercado",
        description: "El contenido existente dependía de traducción directa y no funcionaba en mercados no ingleses. Rediseñamos las páginas para reflejar la intención de búsqueda local en EN, ES y DE, mejorando el engagement y la visibilidad frente a traducciones literales.",
        category: "SEO Multilingüe",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    }
]

const caseStudiesDe = [
    {
        client: "Hundekrankenversicherer, Deutschland",
        title: "Deutsche Haustierversicherungs-Plattform — SEO-Migration & Erholung",
        description: "Nach einem großen strukturellen Update verloren wertvolle Seiten über Nacht ca. 80 % ihrer organischen Sichtbarkeit. Wir leiteten ein umfassendes technisches Audit, bauten die URL-Architektur neu auf und verstärkten Trust-Signale. Kommerzielle Keywords kehrten in die Top 3–5 zurück, während der Non-Brand-Traffic monatlich um +230 % wuchs.",
        category: "SEO-Migration",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Private medizinische Klinik, London (UK)",
        title: "Private Ultraschallklinik — Lokale Sichtbarkeit, die konvertiert",
        description: "Der Seite fehlte eine klare Servicehierarchie und medizinische Vertrauenssignale. Wir restrukturierten Kernseiten, implementierten MedicalService-Schema und verbesserten die mobile Performance. Ergebnis: Konstante Top-3-Sichtbarkeit für lokale Anfragen und +65 % mehr organische Buchungen.",
        category: "Lokales SEO",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Hypothekenmakler, Arizona (US)",
        title: "US-Hypothekenmakler — Skalierbares lokales SEO-Framework",
        description: "Das Unternehmen verließ sich auf eine einzige Landingpage mit begrenzter Reichweite. Wir migrierten die Seite zu WordPress und launchten 30+ standortspezifische Serviceseiten (Service + Stadt). Dies führte zu +200 % mehr lokalen Impressionen und +150 % Wachstum bei qualifizierten Anfragen.",
        category: "Lokales SEO",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Daten- und Analytikberatung, Kalifornien (US)",
        title: "B2B Daten- & Analytikberatung — Expertise in Suchnachfrage verwandeln",
        description: "Trotz hoher Spezialisierung spiegelte die Website nicht wider, wie Entscheider nach Lösungen suchen. Wir führten eine entitätsbasierte Content-Struktur ein (Lösungen ↔ Use Cases ↔ Branchen) und verbesserten die semantische Ausrichtung, was zu breiterer Keyword-Abdeckung und stetiges Wachstum führte.",
        category: "B2B-SEO",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
    },
    {
        client: "Servicebasiertes Unternehmen, International",
        title: "Internationale Servicemarke — SEO-gestützter Website-Relaunch",
        description: "Wir begleiteten den Relaunch ab der Planungsphase und definierten Struktur, Seitenzweck und Conversion-Pfade vor der Entwicklung. Die neue Seite startete ohne Traffic-Verlust, erreichte eine schnelle Indexierung und erzielte frühzeitig Sichtbarkeit für Prioritätsthemen.",
        category: "Technisches SEO",
        tagBgColor: "bg-indigo-200",
        tagTextColor: "text-indigo-900",
    },
    {
        client: "Internationales Unternehmen, UK/US/EU Märkte",
        title: "Multilinguale Marke — Marktfokussierte SEO-Lokalisierung",
        description: "Bestehende Inhalte basierten auf direkter Übersetzung und unterperformten in nicht-englischen Märkten. Wir überarbeiteten die Seiten für lokale Suchintentionen in EN, ES und DE, was das Engagement verbesserte und die Sichtbarkeit gegenüber wörtlichen Übersetzungen deutlich steigerte.",
        category: "Multilinguales SEO",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    }
]

const caseStudiesRu = [
    {
        client: "Страхование домашних животных, Германия",
        title: "Немецкая платформа страхования — миграция и восстановление SEO",
        description: "После крупного обновления структуры высокоценные страницы потеряли около 80% видимости за ночь. Мы провели полный технический аудит, перестроили архитектуру URL и усилили сигналы доверия. Коммерческие запросы вернулись в Топ 3–5, а небрендовый трафик вырос на +230% за месяц.",
        category: "Миграция SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Частная медицинская клиника, Лондон (Великобритания)",
        title: "Частная клиника УЗИ — локальная видимость с высокой конверсией",
        description: "Сайту не хватало четкой иерархии услуг и медицинских сигналов доверия. Мы реструктурировали основные страницы, внедрили схему MedicalService и улучшили мобильную производительность. Результат: стабильный Топ-3 в локальном поиске и +65% к органическим записям.",
        category: "Локальное SEO",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Ипотечный брокер, Аризона (США)",
        title: "Ипотечный брокер в США — масштабируемая стратегия локального SEO",
        description: "Бизнес полагался на одну страницу с ограниченным охватом. Мы перенесли сайт на WordPress и запустили 30+ локальных страниц услуг по схеме «Услуга + Город». Это принесло +200% к показам и +150% к количеству квалифицированных лидов.",
        category: "Локальное SEO",
        tagBgColor: "bg-blue-200",
        tagTextColor: "text-blue-900",
    },
    {
        client: "Консалтинг по данным и аналитике, Калифорния (США)",
        title: "B2B консалтинг в сфере данных — превращение экспертизы в спрос",
        description: "Несмотря на узкую специализацию, сайт не отражал то, как лица, принимающие решения, ищут решения. Мы внедрили структуру контента на основе сущностей (Решения ↔ Кейсы ↔ Отрасли) и улучшили семантику, что дало рост охвата и стабильный трафик.",
        category: "B2B SEO",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
    },
    {
        client: "Сервисный бизнес, международный рынок",
        title: "Международный сервисный бренд — перезапуск сайта под контролем SEO",
        description: "Мы сопровождали редизайн с этапа планирования, определив структуру сайта и пути конверсии до начала разработки. Новый сайт запустился без потери трафика, быстро индексировался и сразу получил видимость по приоритетным темам.",
        category: "Техническое SEO",
        tagBgColor: "bg-indigo-200",
        tagTextColor: "text-indigo-900",
    },
    {
        client: "Международная компания, рынки UK/US/EU",
        title: "Мультиязычный бренд — локализация SEO под конкретные рынки",
        description: "Контент полагался на прямой перевод и плохо работал вне английского рынка. Мы переработали страницы под локальный интенс в EN, ES и DE, улучшив поведенческие метрики и видимость по сравнению с буквальными переводами.",
        category: "Мультиязычное SEO",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    }
]

export default function CaseStudies({ lang = 'en' }: { lang?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrentIndex((prevIndex) =>
                    prevIndex === (lang === 'es' ? caseStudiesEs.length : lang === 'de' ? caseStudiesDe.length : lang === 'ru' ? caseStudiesRu.length : caseStudiesEn.length) - 1 ? 0 : prevIndex + 1
                ),
            5000
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const total = lang === 'es' ? caseStudiesEs.length : lang === 'de' ? caseStudiesDe.length : lang === 'ru' ? caseStudiesRu.length : caseStudiesEn.length;
        const newIndex = isFirstSlide ? total - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const total = lang === 'es' ? caseStudiesEs.length : lang === 'de' ? caseStudiesDe.length : lang === 'ru' ? caseStudiesRu.length : caseStudiesEn.length;
        const isLastSlide = currentIndex === total - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const ru = (ruDict as any)?.home?.caseStudies;
    const list = lang === 'es' ? caseStudiesEs : lang === 'de' ? caseStudiesDe : lang === 'ru' ? caseStudiesRu : caseStudiesEn;
    const currentStudy = list[currentIndex];

    return (
        <div className="bg-white dark:bg-[#061423] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                    <div className="text-left max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl no-hyphen-break" suppressHydrationWarning>{lang === 'es' ? 'Resultados reales. Estrategia clara. Impacto medible.' : lang === 'de' ? 'Echte Ergebnisse. Klare Strategie. Messbarer Impact.' : lang === 'ru' ? (ru?.title ?? 'Реальные результаты. Понятная стратегия. Измеримый эффект.') : 'Real outcomes. Clear strategy. Measurable impact.'}</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            {lang === 'es' ? 'Nos centramos en decisiones estratégicas de SEO y contenido que se traducen en un crecimiento sostenible. A continuación, presentamos una selección de escenarios de clientes anonimizados.' : lang === 'de' ? 'Wir konzentrieren uns auf strategieorientierte SEO- und Content-Entscheidungen, die zu nachhaltigem Wachstum führen. Nachfolgend finden Sie eine Auswahl anonymisierter Kundenszenarien.' : lang === 'ru' ? (ru?.description ?? 'Мы фокусируемся на стратегических решениях в SEO и контенте, которые обеспечивают устойчивый рост. Ниже — подборка анонимизированных кейсов.') : "We focus on strategy-first SEO and content decisions that translate into sustainable growth. Below is a selection of anonymised client scenarios that reflect the type of challenges we solve."}
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <a href={`/${lang}/case-studies`} className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <span className="transition-transform duration-300 group-hover:-translate-x-4">
                                    {lang === 'es' ? 'Explorar todos los casos' : lang === 'de' ? 'Alle Case Studies erkunden' : lang === 'ru' ? (ru?.ctaAll ?? 'Все кейсы') : 'Explore All Case Studies'}
                                </span>
                                <span aria-hidden="true" className="absolute right-6 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                    &gt;
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="relative h-[30rem] w-full group">
                        <div
                          className="absolute -inset-12 -z-10 rounded-full bg-indigo-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 ring-1 ring-gray-900/10 dark:ring-gray-700/20 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                            <div className="relative flex h-full flex-col p-8 text-gray-900 dark:text-white">
                                <div className="flex-1">
                                    <span className={`inline-block self-start rounded-full px-3 py-1 text-xs font-semibold ${currentStudy.tagBgColor} ${currentStudy.tagTextColor}`}>
                                        {currentStudy.category}
                                    </span>
                                    <h3 className="mt-3 text-xl font-bold leading-7 text-gray-900 dark:text-white" suppressHydrationWarning>{currentStudy.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{currentStudy.client}</p>
                                    <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">{currentStudy.description}</p>
                                </div>
                                <div className="flex items-center gap-x-3 self-end">
                                    <button onClick={prevSlide} className="rounded-full bg-white p-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100">
                                        <span className="sr-only">{lang === 'es' ? 'Diapositiva anterior' : lang === 'de' ? 'Vorherige Folie' : lang === 'ru' ? (ru?.aria?.prev ?? 'Предыдущий слайд') : 'Previous slide'}</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button onClick={nextSlide} className="rounded-full bg-white p-2 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-100">
                                        <span className="sr-only">{lang === 'es' ? 'Siguiente diapositiva' : lang === 'de' ? 'Nächste Folie' : lang === 'ru' ? (ru?.aria?.next ?? 'Следующий слайд') : 'Next slide'}</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-2xl overflow-hidden">
                                <div
                                    key={currentIndex}
                                    className="h-full bg-indigo-500"
                                    style={{ animation: 'progress 5s linear forwards' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
