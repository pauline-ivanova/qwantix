'use client'

import { useState, useEffect, useRef } from 'react'
import ruDict from '@/dictionaries/ru.json'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const caseStudiesEn = [
    {
        client: "Dog health insurance provider in Germany",
        title: "DogCare24.de: SEO Migration & Recovery",
        description: "Following a structural update, money-pages lost ~80% of organic traffic overnight. We delivered a full technical audit, clean URL architecture, and E-E-A-T enhancements. Main keyword recovered to Top 3–5 positions, and non-brand organic traffic increased by +230% MoM.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Private ultrasound clinic in London, UK",
        title: "Harley Street Ultrasound: Converting Local Visibility",
        description: "The website lacked structure and trust-builders. We rolled out MedicalService structured data, reworked service pages, and improved mobile PageSpeed. This resulted in Top 3 rankings for local keywords and a +65% uplift in organic bookings.",
        category: "SMM + Content Strategy",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    },
    {
        client: "Mortgage brokerage in Arizona, USA",
        title: "AZ Mortgage Brothers: Scaling Search Demand",
        description: "The site was stuck at a single main page. We migrated it to WordPress and launched 30+ location landing pages with a Service + City keyword matrix. This led to a +200% increase in local impressions and +150% more qualified inquiries.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Data & analytics consultancy in California, USA",
        title: "Data Sleek: Turning Technical Expertise into Search Demand",
        description: "The website couldn’t communicate solutions in a way decision-makers search. We created an entity-based content hierarchy (Solutions ↔ Use Cases ↔ Industries) and made semantic improvements, leading to significantly improved SEO coverage and consistent traffic growth.",
        category: "SEO + Content Strategy",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
    }
]

const caseStudiesEs = [
    {
        client: "Seguro de salud para perros en Alemania",
        title: "DogCare24.de: Migración SEO y recuperación",
        description: "Tras una actualización estructural, páginas clave perdieron ~80% del tráfico orgánico. Entregamos auditoría técnica, arquitectura limpia y mejoras E-E-A-T. Recuperamos el keyword principal al Top 3–5 y +230% MoM en tráfico no brand.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Clínica de ecografías privada en Londres, UK",
        title: "Harley Street Ultrasound: Visibilidad local que convierte",
        description: "Faltaban estructura y factores de confianza. Añadimos datos estructurados médicos, rehicimos páginas de servicio y mejoramos PageSpeed móvil. Resultado: Top 3 para keywords locales y +65% en reservas orgánicas.",
        category: "SMM + Estrategia de contenido",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    },
    {
        client: "Broker hipotecario en Arizona, EE. UU.",
        title: "AZ Mortgage Brothers: Escalar la demanda en búsqueda",
        description: "El sitio tenía una sola página. Migramos a WordPress y lanzamos 30+ páginas locales con matriz Servicio + Ciudad. +200% impresiones locales y +150% consultas cualificadas.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Consultora de datos y analítica en California, EE. UU.",
        title: "Data Sleek: Convertir expertise técnico en demanda de búsqueda",
        description: "La web no comunicaba soluciones como buscan los decisores. Creamos jerarquía basada en entidades (Soluciones ↔ Casos de uso ↔ Industrias) y mejoras semánticas, logrando mejor cobertura SEO y crecimiento sostenido.",
        category: "SEO + Estrategia de contenido",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
    }
]

const caseStudiesDe = [
    {
        client: "Anbieter für Hunde‑Krankenversicherung in Deutschland",
        title: "DogCare24.de: SEO‑Migration & Erholung",
        description: "Nach strukturellen Änderungen verloren Money‑Pages ~80% organischen Traffic über Nacht. Wir lieferten ein technisches Audit, saubere URL‑Architektur und E‑E‑A‑T‑Optimierungen. Haupt‑Keyword zurück in die Top 3–5, nicht‑brand Traffic +230% MoM.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Private Ultraschall‑Klinik in London, UK",
        title: "Harley Street Ultrasound: Lokale Sichtbarkeit, die konvertiert",
        description: "Es fehlten Struktur und Trust‑Signale. Wir implementierten MedicalService‑Schema, überarbeiteten Service‑Seiten und verbesserten mobilen PageSpeed. Ergebnis: Top‑3 für lokale Keywords und +65% mehr organische Buchungen.",
        category: "SMM + Content‑Strategie",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    },
    {
        client: "Hypotheken‑Vermittler in Arizona, USA",
        title: "AZ Mortgage Brothers: Skalierung der Suchnachfrage",
        description: "Website bestand aus nur einer Seite. Wir migrierten zu WordPress und rollten 30+ Standort‑Landingpages mit Service+City‑Matrix aus. +200% lokale Impressions und +150% qualifizierte Anfragen.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Data‑ & Analytics‑Beratung in Kalifornien, USA",
        title: "Data Sleek: Technisches Know‑how in Suchnachfrage verwandeln",
        description: "Die Website spiegelte Lösungen nicht so wider, wie Entscheider suchen. Wir schufen eine Entity‑basierte Struktur (Solutions ↔ Use Cases ↔ Industries) und semantische Verbesserungen. Ergebnis: bessere SEO‑Abdeckung und stetiges Wachstum.",
        category: "SEO + Content‑Strategie",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
    }
]

const caseStudiesRu = [
    {
        client: "Страхование здоровья собак, Германия",
        title: "DogCare24.de: миграция SEO и восстановление",
        description: "После структурных изменений money‑страницы потеряли ~80% органического трафика за ночь. Мы провели технический аудит, выстроили чистую архитектуру URL и усилили E‑E‑A‑T. Основной запрос восстановился в Топ‑3–5, небрендовый трафик +230% MoM.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Частная клиника УЗИ, Лондон, Великобритания",
        title: "Harley Street Ultrasound: локальная видимость, которая конвертирует",
        description: "На сайте не хватало структуры и триггеров доверия. Добавили MedicalService‑схему, переработали сервисные страницы, ускорили мобильный PageSpeed. Итог: Топ‑3 по локальным запросам и +65% органических записей.",
        category: "SMM + Контент‑стратегия",
        tagBgColor: "bg-orange-200",
        tagTextColor: "text-orange-900",
    },
    {
        client: "Ипотечный брокер, Аризона, США",
        title: "AZ Mortgage Brothers: масштабирование спроса в поиске",
        description: "Сайт стоял на одном лендинге. Перенесли на WordPress и запустили 30+ локальных страниц по матрице Услуга+Город. +200% локальных показов и +150% квалифицированных обращений.",
        category: "SEO",
        tagBgColor: "bg-purple-200",
        tagTextColor: "text-purple-900",
    },
    {
        client: "Консалтинг по данным и аналитике, Калифорния, США",
        title: "Data Sleek: превращаем экспертизу в спрос",
        description: "Сайт не отражал решения так, как ищут лица, принимающие решения. Построили иерархию на основе сущностей (Solutions ↔ Use Cases ↔ Industries) и усилили семантику. Получили лучшую SEO‑покрытие и стабильный рост трафика.",
        category: "SEO + Контент‑стратегия",
        tagBgColor: "bg-teal-200",
        tagTextColor: "text-teal-900",
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
                            {lang === 'es' ? 'Estamos orgullosos de los resultados que logramos. Aquí verás cómo hemos ayudado a empresas como la tuya a alcanzar sus objetivos.' : lang === 'de' ? 'Wir sind stolz auf unsere Ergebnisse. So unterstützen wir Unternehmen wie Ihres dabei, ihre digitalen Marketingziele zu erreichen.' : lang === 'ru' ? (ru?.description ?? 'Мы гордимся результатами. Вот как мы помогаем бизнесам достигать маркетинговых целей.') : "We're proud of the results we deliver. Here's a look at how we've helped businesses like yours achieve their digital marketing goals."}
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <a href="#" className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <span className="transition-transform duration-300 group-hover:-translate-x-4">
                                    {lang === 'es' ? 'Ver todos los casos' : lang === 'de' ? 'Alle Case Studies ansehen' : lang === 'ru' ? (ru?.ctaAll ?? 'Все кейсы') : 'Explore All Case Studies'}
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
