import { Metadata } from 'next';
import { ShieldCheckIcon, ScaleIcon, DocumentTextIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { i18n } from '@/i18n.config';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  
  const titles = {
    en: 'Terms of Service | Qwantix Agency',
    es: 'Términos de Servicio | Qwantix Agency',
    de: 'Allgemeine Geschäftsbedingungen | Qwantix Agency',
    ru: 'Условия использования | Qwantix Agency',
  };
  
  const descriptions = {
    en: 'Terms and conditions for using Qwantix Agency services and website.',
    es: 'Términos y condiciones para el uso de los servicios y el sitio web de Qwantix Agency.',
    de: 'Allgemeine Geschäftsbedingungen für die Nutzung der Dienste und der Website von Qwantix Agency.',
    ru: 'Условия и положения использования услуг и веб-сайта Qwantix Agency.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/terms`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/terms`);

  return {
    ...generateStandardMetadata({
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      url: currentUrl,
      pagePath: `/${lang}/terms`,
      keywords: ['terms of service', 'terms and conditions', 'legal', 'service agreement'],
      language: lang,
      alternateLanguages,
      image: '/images/og-image.jpg',
      robots: {
        index: true,
        follow: true,
      },
    }),
  };
}

const content = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: December 2025',
    sections: [
      {
        title: '1. Introduction',
        content: 'Welcome to Qwantix Agency. By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services.'
      },
      {
        title: '2. Services',
        content: 'Qwantix Agency provides digital marketing consultancy services, including SEO, PPC, social media marketing, and content strategy. The specific scope of services for each client is defined in individual service agreements or proposals.'
      },
      {
        title: '3. Intellectual Property',
        content: 'All content on this website, including text, graphics, logos, and software, is the property of Qwantix Agency or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any part of this website without our express written permission.'
      },
      {
        title: '4. User Obligations',
        content: 'You agree to use our website and services only for lawful purposes. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.'
      },
      {
        title: '5. Limitation of Liability',
        content: 'Qwantix Agency will not be liable for any indirect, special, or consequential loss or damage arising under these terms and conditions or in connection with our website, whether arising in tort, contract, or otherwise.'
      },
      {
        title: '6. Jurisdiction',
        content: 'These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of England and Wales.'
      }
    ]
  },
  de: {
    title: 'Allgemeine Geschäftsbedingungen',
    lastUpdated: 'Zuletzt aktualisiert: Dezember 2025',
    sections: [
      {
        title: '1. Einleitung',
        content: 'Willkommen bei Qwantix Agency. Durch den Zugriff auf unsere Website und die Nutzung unserer Dienste erklären Sie sich mit diesen Allgemeinen Geschäftsbedingungen einverstanden. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie unsere Website oder Dienste nicht nutzen.'
      },
      {
        title: '2. Dienstleistungen',
        content: 'Qwantix Agency bietet Beratungsdienstleistungen im Bereich digitales Marketing an, einschließlich SEO, PPC, Social-Media-Marketing und Content-Strategie. Der spezifische Leistungsumfang für jeden Kunden wird in individuellen Servicevereinbarungen oder Angeboten festgelegt.'
      },
      {
        title: '3. Geistiges Eigentum',
        content: 'Alle Inhalte auf dieser Website, einschließlich Texte, Grafiken, Logos und Software, sind Eigentum von Qwantix Agency oder seinen Inhaltslieferanten und durch internationale Urheberrechtsgesetze geschützt. Sie dürfen ohne unsere ausdrückliche schriftliche Genehmigung keine Teile dieser Website vervielfältigen, verbreiten oder abgeleitete Werke davon erstellen.'
      },
      {
        title: '4. Nutzerpflichten',
        content: 'Sie erklären sich damit einverstanden, unsere Website und Dienste nur für rechtmäßige Zwecke zu nutzen. Sie dürfen unsere Website nicht in einer Weise nutzen, die Schäden an der Website verursacht oder die Verfügbarkeit oder Zugänglichkeit der Website beeinträchtigt.'
      },
      {
        title: '5. Haftungsbeschränkung',
        content: 'Qwantix Agency haftet nicht für indirekte, spezielle oder Folgeschäden, die im Rahmen dieser Bedingungen oder in Verbindung mit unserer Website entstehen, unabhängig davon, ob es sich um unerlaubte Handlungen, Verträge oder Sonstiges handelt.'
      },
      {
        title: '6. Gerichtsstand',
        content: 'Diese Allgemeinen Geschäftsbedingungen unterliegen dem Recht von England und Wales und werden in Übereinstimmung mit diesem ausgelegt. Alle Streitigkeiten im Zusammenhang mit diesen Bedingungen unterliegen der ausschließlichen Zuständigkeit der Gerichte von England und Wales.'
      }
    ]
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: diciembre de 2025',
    sections: [
      {
        title: '1. Introducción',
        content: 'Bienvenido a Qwantix Agency. Al acceder a nuestro sitio web y utilizar nuestros servicios, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web ni nuestros servicios.'
      },
      {
        title: '2. Servicios',
        content: 'Qwantix Agency ofrece servicios de consultoría de marketing digital, que incluyen SEO, PPC, marketing en redes sociales y estrategia de contenidos. El alcance específico de los servicios para cada cliente se define en acuerdos de servicio o propuestas individuales.'
      },
      {
        title: '3. Propiedad Intelectual',
        content: 'Todo el contenido de este sitio web, incluidos textos, gráficos, logotipos y software, es propiedad de Qwantix Agency o sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor. No puede reproducir, distribuir ni crear obras derivadas de ninguna parte de este sitio web sin nuestro permiso expreso por escrito.'
      },
      {
        title: '4. Obligaciones del Usuario',
        content: 'Usted acepta utilizar nuestro sitio web y servicios únicamente con fines lícitos. No debe utilizar nuestro sitio web de ninguna manera que cause, o pueda causar, daños al sitio web o el deterioro de la disponibilidad o accesibilidad del mismo.'
      },
      {
        title: '5. Limitación de Responsabilidad',
        content: 'Qwantix Agency no será responsable de ninguna pérdida o daño indirecto, especial o consecuente que surja bajo estos términos y condiciones o en relación con nuestro sitio web, ya sea por agravio, contrato o de otro modo.'
      },
      {
        title: '6. Jurisdicción',
        content: 'Estos Términos de Servicio se rigen e interpretan de acuerdo con las leyes de Inglaterra y Gales. Cualquier disputa relacionada con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de Inglaterra y Gales.'
      }
    ]
  },
  ru: {
    title: 'Условия использования',
    lastUpdated: 'Последнее обновление: декабрь 2025',
    sections: [
      {
        title: '1. Введение',
        content: 'Добро пожаловать в Qwantix Agency. Доступ к нашему веб-сайту и использование наших услуг означает ваше согласие с данными Условиями использования. Если вы не согласны с какой-либо частью этих условий, вы не должны использовать наш веб-сайт или услуги.'
      },
      {
        title: '2. Услуги',
        content: 'Qwantix Agency предоставляет консультационные услуги в области цифрового маркетинга, включая SEO, PPC, маркетинг в социальных сетях и контент-стратегию. Конкретный объем услуг для каждого клиента определяется в индивидуальных соглашениях об оказании услуг или предложениях.'
      },
      {
        title: '3. Интеллектуальная собственность',
        content: 'Весь контент на этом веб-сайте, включая текст, графику, логотипы и программное обеспечение, является собственностью Qwantix Agency или его поставщиков контента и защищен международными законами об авторском праве. Вы не можете воспроизводить, распространять или создавать производные работы на основе любой части этого веб-сайта без нашего явного письменного разрешения.'
      },
      {
        title: '4. Обязательства пользователя',
        content: 'Вы соглашаетесь использовать наш веб-сайт и услуги только в законных целях. Вы не должны использовать наш веб-сайт каким-либо образом, который наносит или может нанести ущерб веб-сайту или ухудшить доступность или работоспособность веб-сайта.'
      },
      {
        title: '5. Ограничение ответственности',
        content: 'Qwantix Agency не несет ответственности за любые косвенные, специальные или последующие убытки или ущерб, возникающие в соответствии с этими условиями или в связи с нашим веб-сайтом, независимо от того, возникают ли они в результате деликта, договора или иным образом.'
      },
      {
        title: '6. Юрисдикция',
        content: 'Настоящие Условия использования регулируются и толкуются в соответствии с законодательством Англии и Уэльса. Любые споры, связанные с этими условиями и положениями, подлежат исключительной юрисдикции судов Англии и Уэльса.'
      }
    ]
  }
};

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const currentLang = i18n.locales.includes(lang as any) ? lang : 'en';
  const contentLang = content[currentLang as keyof typeof content] || content.en;

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate bg-gradient-to-b from-[#635bff] to-indigo-800 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,27,75,0.4),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {contentLang.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-indigo-100">
            {contentLang.lastUpdated}
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-20"
          style={{ transform: 'translateY(1px)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          {contentLang.sections.map((section, idx) => (
            <section key={idx} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                {idx === 0 && <ShieldCheckIcon className="w-6 h-6 text-indigo-600" />}
                {idx === 5 && <GlobeAltIcon className="w-6 h-6 text-indigo-600" />}
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
          
          <div className="mt-16 p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <ScaleIcon className="w-6 h-6" />
              Governing Law
            </h3>
            <p className="text-indigo-800">
              For any legal inquiries regarding these terms, please contact Polina Ivanova at <a href="mailto:info@qwantix.agency" className="underline font-semibold">info@qwantix.agency</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
