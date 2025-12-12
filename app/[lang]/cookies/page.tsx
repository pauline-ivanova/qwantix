import { Metadata } from 'next';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { i18n } from '@/i18n.config';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const titles = {
    en: 'Cookie Policy | Qwantix Agency',
    es: 'Política de Cookies | Qwantix Agency',
    de: 'Cookie-Richtlinie | Qwantix Agency',
    ru: 'Политика использования файлов cookie | Qwantix Agency',
  };
  
  const descriptions = {
    en: 'Cookie policy of Qwantix Agency. Information about the use of cookies on our website.',
    es: 'Política de cookies de Qwantix Agency. Información sobre el uso de cookies en nuestro sitio web.',
    de: 'Cookie-Richtlinie von Qwantix Agency. Informationen über die Verwendung von Cookies auf unserer Website.',
    ru: 'Политика использования файлов cookie Qwantix Agency. Информация об использовании файлов cookie на нашем веб-сайте.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/cookies`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/cookies`);

  return {
    ...generateStandardMetadata({
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      url: currentUrl,
      pagePath: `/${lang}/cookies`,
      keywords: ['cookie policy', 'cookies', 'privacy', 'data protection'],
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
    title: 'Cookie Policy',
    lastUpdated: 'Last updated',
    whatAre: {
      title: 'What are Cookies?',
      p1: 'Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. Cookies allow the website to remember your actions and preferences over a period of time, so you don\'t have to keep re-entering them whenever you come back to the site.',
    },
    types: {
      title: 'Types of Cookies We Use',
      necessary: {
        title: 'Technical Cookies (Necessary)',
        p1: 'These cookies are essential for the website to function correctly. They enable navigation and the use of basic site functions.',
        items: [
          'Session cookies: Keep the user session active',
          'Security cookies: Detect unauthorized access attempts',
        ],
      },
      analytics: {
        title: 'Analytics Cookies',
        p1: 'These cookies help us understand how visitors interact with our website, providing us with information about the areas visited, time spent, etc. This information helps us improve the website\'s performance.',
      },
      preferences: {
        title: 'Preference Cookies',
        p1: 'These cookies allow the website to remember information that changes how the site behaves or looks, such as your preferred language or the region you are in.',
      },
    },
    thirdParty: {
      title: 'Third-Party Cookies',
      p1: 'Some cookies are placed by third-party services that appear on our pages. We do not control the setting of these cookies, so we recommend that you check the third-party websites for more information about their cookies and how to manage them.',
    },
    management: {
      title: 'Cookie Management',
      p1: 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.',
      p2: 'However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.',
      instructions: 'Instructions for the most common browsers:',
      items: [
        'Chrome: Settings → Privacy and security → Cookies and other site data',
        'Firefox: Options → Privacy & Security → Cookies and Site Data',
        'Safari: Preferences → Privacy → Cookies and website data',
        'Edge: Settings → Cookies and site permissions → Cookies and site data',
      ],
    },
    consent: {
      title: 'Consent',
      p1: 'By continuing to browse our website after being informed about the use of cookies, we understand that you accept the use of cookies in accordance with this policy.',
      p2: 'You can withdraw your consent at any time by deleting cookies from your browser or by contacting us at',
    },
    updates: {
      title: 'Updates to this Policy',
      p1: 'We may update this Cookie Policy occasionally to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. We recommend that you review this page periodically to stay informed about our use of cookies.',
    },
    contact: {
      title: 'Contact',
      p1: 'If you have questions about our Cookie Policy, you can contact us at:',
    },
  },
  es: {
    title: 'Política de Cookies',
    lastUpdated: 'Última actualización',
    whatAre: {
      title: '¿Qué son las Cookies?',
      p1: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) cuando visitas un sitio web. Las cookies permiten que el sitio web recuerde tus acciones y preferencias durante un período de tiempo, por lo que no tienes que volver a configurarlas cada vez que regresas al sitio.',
    },
    types: {
      title: 'Tipos de Cookies que Utilizamos',
      necessary: {
        title: 'Cookies Técnicas (Necesarias)',
        p1: 'Estas cookies son esenciales para que el sitio web funcione correctamente. Permiten la navegación y el uso de las funciones básicas del sitio.',
        items: [
          'Cookies de sesión: Mantienen la sesión del usuario activa',
          'Cookies de seguridad: Detectan intentos de acceso no autorizado',
        ],
      },
      analytics: {
        title: 'Cookies de Análisis',
        p1: 'Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, proporcionándonos información sobre las áreas visitadas, el tiempo de permanencia, etc. Esta información nos ayuda a mejorar el funcionamiento del sitio web.',
      },
      preferences: {
        title: 'Cookies de Preferencias',
        p1: 'Estas cookies permiten que el sitio web recuerde información que cambia la forma en que el sitio se comporta o se ve, como tu idioma preferido o la región en la que te encuentras.',
      },
    },
    thirdParty: {
      title: 'Cookies de Terceros',
      p1: 'Algunas cookies son colocadas por servicios de terceros que aparecen en nuestras páginas. No controlamos el establecimiento de estas cookies, por lo que te recomendamos que consultes los sitios web de terceros para obtener más información sobre sus cookies y cómo gestionarlas.',
    },
    management: {
      title: 'Gestión de Cookies',
      p1: 'Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu ordenador y puedes configurar la mayoría de los navegadores para impedir que se coloquen.',
      p2: 'Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.',
      instructions: 'Instrucciones para los navegadores más comunes:',
      items: [
        'Chrome: Configuración → Privacidad y seguridad → Cookies y otros datos de sitios',
        'Firefox: Opciones → Privacidad y seguridad → Cookies y datos del sitio',
        'Safari: Preferencias → Privacidad → Cookies y datos de sitios web',
        'Edge: Configuración → Cookies y permisos del sitio → Cookies y datos del sitio',
      ],
    },
    consent: {
      title: 'Consentimiento',
      p1: 'Al continuar navegando por nuestro sitio web después de haber sido informado sobre el uso de cookies, entendemos que aceptas el uso de cookies de acuerdo con esta política.',
      p2: 'Puedes retirar tu consentimiento en cualquier momento eliminando las cookies de tu navegador o contactándonos en',
    },
    updates: {
      title: 'Actualizaciones de esta Política',
      p1: 'Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en las cookies que utilizamos o por otras razones operativas, legales o regulatorias. Te recomendamos que revises esta página periódicamente para estar informado sobre nuestro uso de cookies.',
    },
    contact: {
      title: 'Contacto',
      p1: 'Si tienes preguntas sobre nuestra Política de Cookies, puedes contactarnos en:',
    },
  },
  de: {
    title: 'Cookie-Richtlinie',
    lastUpdated: 'Zuletzt aktualisiert',
    whatAre: {
      title: 'Was sind Cookies?',
      p1: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät (Computer, Tablet oder Mobiltelefon) gespeichert werden, wenn Sie eine Website besuchen. Cookies ermöglichen es der Website, Ihre Aktionen und Präferenzen über einen Zeitraum zu speichern, sodass Sie sie nicht jedes Mal erneut eingeben müssen, wenn Sie zur Website zurückkehren.',
    },
    types: {
      title: 'Arten von Cookies, die wir verwenden',
      necessary: {
        title: 'Technische Cookies (Notwendig)',
        p1: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie ermöglichen die Navigation und die Nutzung der grundlegenden Website-Funktionen.',
        items: [
          'Sitzungs-Cookies: Halten die Benutzersitzung aktiv',
          'Sicherheits-Cookies: Erkennen unbefugte Zugriffsversuche',
        ],
      },
      analytics: {
        title: 'Analyse-Cookies',
        p1: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, und liefern uns Informationen über besuchte Bereiche, Verweildauer usw. Diese Informationen helfen uns, die Leistung der Website zu verbessern.',
      },
      preferences: {
        title: 'Präferenz-Cookies',
        p1: 'Diese Cookies ermöglichen es der Website, Informationen zu speichern, die das Verhalten oder Aussehen der Website ändern, wie z. B. Ihre bevorzugte Sprache oder die Region, in der Sie sich befinden.',
      },
    },
    thirdParty: {
      title: 'Cookies von Drittanbietern',
      p1: 'Einige Cookies werden von Drittanbieterdiensten platziert, die auf unseren Seiten erscheinen. Wir kontrollieren nicht die Einstellung dieser Cookies, daher empfehlen wir Ihnen, die Websites von Drittanbietern zu überprüfen, um weitere Informationen über ihre Cookies und deren Verwaltung zu erhalten.',
    },
    management: {
      title: 'Cookie-Verwaltung',
      p1: 'Sie können Cookies nach Belieben steuern und/oder löschen. Sie können alle Cookies löschen, die sich bereits auf Ihrem Computer befinden, und Sie können die meisten Browser so einstellen, dass sie verhindern, dass Cookies platziert werden.',
      p2: 'Wenn Sie dies tun, müssen Sie möglicherweise jedes Mal, wenn Sie eine Website besuchen, einige Präferenzen manuell anpassen, und einige Dienste und Funktionen funktionieren möglicherweise nicht.',
      instructions: 'Anweisungen für die gängigsten Browser:',
      items: [
        'Chrome: Einstellungen → Datenschutz und Sicherheit → Cookies und andere Websitedaten',
        'Firefox: Optionen → Datenschutz & Sicherheit → Cookies und Website-Daten',
        'Safari: Einstellungen → Datenschutz → Cookies und Websitedaten',
        'Edge: Einstellungen → Cookies und Websiteberechtigungen → Cookies und Websitedaten',
      ],
    },
    consent: {
      title: 'Zustimmung',
      p1: 'Durch das weitere Durchsuchen unserer Website nach der Information über die Verwendung von Cookies verstehen wir, dass Sie der Verwendung von Cookies gemäß dieser Richtlinie zustimmen.',
      p2: 'Sie können Ihre Zustimmung jederzeit widerrufen, indem Sie Cookies aus Ihrem Browser löschen oder uns kontaktieren unter',
    },
    updates: {
      title: 'Aktualisierungen dieser Richtlinie',
      p1: 'Wir können diese Cookie-Richtlinie gelegentlich aktualisieren, um Änderungen an den von uns verwendeten Cookies oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen widerzuspiegeln. Wir empfehlen Ihnen, diese Seite regelmäßig zu überprüfen, um über unsere Verwendung von Cookies informiert zu bleiben.',
    },
    contact: {
      title: 'Kontakt',
      p1: 'Wenn Sie Fragen zu unserer Cookie-Richtlinie haben, können Sie uns kontaktieren unter:',
    },
  },
  ru: {
    title: 'Политика использования файлов cookie',
    lastUpdated: 'Последнее обновление',
    whatAre: {
      title: 'Что такое файлы cookie?',
      p1: 'Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютер, планшет или мобильный телефон), когда вы посещаете веб-сайт. Файлы cookie позволяют веб-сайту запоминать ваши действия и предпочтения в течение определенного периода времени, поэтому вам не нужно вводить их заново каждый раз, когда вы возвращаетесь на сайт.',
    },
    types: {
      title: 'Типы файлов cookie, которые мы используем',
      necessary: {
        title: 'Технические файлы cookie (Необходимые)',
        p1: 'Эти файлы cookie необходимы для правильной работы веб-сайта. Они обеспечивают навигацию и использование основных функций сайта.',
        items: [
          'Сессионные файлы cookie: Поддерживают активную сессию пользователя',
          'Файлы cookie безопасности: Обнаруживают попытки несанкционированного доступа',
        ],
      },
      analytics: {
        title: 'Аналитические файлы cookie',
        p1: 'Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим веб-сайтом, предоставляя нам информацию о посещенных областях, времени, проведенном на сайте и т.д. Эта информация помогает нам улучшить работу веб-сайта.',
      },
      preferences: {
        title: 'Файлы cookie предпочтений',
        p1: 'Эти файлы cookie позволяют веб-сайту запоминать информацию, которая изменяет поведение или внешний вид сайта, например, ваш предпочтительный язык или регион, в котором вы находитесь.',
      },
    },
    thirdParty: {
      title: 'Файлы cookie третьих сторон',
      p1: 'Некоторые файлы cookie размещаются сторонними сервисами, которые появляются на наших страницах. Мы не контролируем установку этих файлов cookie, поэтому мы рекомендуем вам проверить веб-сайты третьих сторон для получения дополнительной информации об их файлах cookie и способах их управления.',
    },
    management: {
      title: 'Управление файлами cookie',
      p1: 'Вы можете контролировать и/или удалять файлы cookie по своему желанию. Вы можете удалить все файлы cookie, которые уже находятся на вашем компьютере, и вы можете настроить большинство браузеров, чтобы предотвратить их размещение.',
      p2: 'Однако, если вы это сделаете, вам, возможно, придется вручную настраивать некоторые предпочтения каждый раз, когда вы посещаете сайт, и некоторые сервисы и функции могут не работать.',
      instructions: 'Инструкции для наиболее распространенных браузеров:',
      items: [
        'Chrome: Настройки → Конфиденциальность и безопасность → Файлы cookie и другие данные сайтов',
        'Firefox: Параметры → Конфиденциальность и безопасность → Файлы cookie и данные сайтов',
        'Safari: Настройки → Конфиденциальность → Файлы cookie и данные веб-сайтов',
        'Edge: Параметры → Файлы cookie и разрешения сайтов → Файлы cookie и данные сайтов',
      ],
    },
    consent: {
      title: 'Согласие',
      p1: 'Продолжая просматривать наш веб-сайт после получения информации об использовании файлов cookie, мы понимаем, что вы принимаете использование файлов cookie в соответствии с этой политикой.',
      p2: 'Вы можете отозвать свое согласие в любое время, удалив файлы cookie из вашего браузера или связавшись с нами по адресу',
    },
    updates: {
      title: 'Обновления этой политики',
      p1: 'Мы можем периодически обновлять эту Политику использования файлов cookie, чтобы отразить изменения в используемых нами файлах cookie или по другим операционным, правовым или нормативным причинам. Мы рекомендуем вам периодически просматривать эту страницу, чтобы быть в курсе нашего использования файлов cookie.',
    },
    contact: {
      title: 'Контакты',
      p1: 'Если у вас есть вопросы о нашей Политике использования файлов cookie, вы можете связаться с нами по адресу:',
    },
  },
};

export default async function CookiesPolicyPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const currentLang = i18n.locales.includes(lang as any) ? lang : 'en';
  const contentLang = content[currentLang as keyof typeof content] || content.en;
  const currentDate = new Date();
  const lastUpdated = currentDate.toLocaleDateString(
    currentLang === 'es' ? 'es-ES' : currentLang === 'de' ? 'de-DE' : currentLang === 'ru' ? 'ru-RU' : 'en-US',
    { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {contentLang.title}
        </h1>
        <p className="text-gray-600">
          {contentLang.lastUpdated}: {lastUpdated}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <InformationCircleIcon className="w-6 h-6 text-indigo-600" />
            {contentLang.whatAre.title}
          </h2>
          <p>{contentLang.whatAre.p1}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <InformationCircleIcon className="w-6 h-6 text-indigo-600" />
            {contentLang.types.title}
          </h2>
          
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{contentLang.types.necessary.title}</h3>
          <p>{contentLang.types.necessary.p1}</p>
          <ul>
            {contentLang.types.necessary.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">{contentLang.types.analytics.title}</h3>
          <p>{contentLang.types.analytics.p1}</p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">{contentLang.types.preferences.title}</h3>
          <p>{contentLang.types.preferences.p1}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.thirdParty.title}</h2>
          <p>{contentLang.thirdParty.p1}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.management.title}</h2>
          <p>{contentLang.management.p1}</p>
          <p>{contentLang.management.p2}</p>
          <p className="mt-4">
            <strong>{contentLang.management.instructions}</strong>
          </p>
          <ul>
            {contentLang.management.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.consent.title}</h2>
          <p>{contentLang.consent.p1}</p>
          <p>
            {contentLang.consent.p2}{' '}
            <a href="mailto:info@qwantix.com" className="text-indigo-600 hover:underline">info@qwantix.com</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.updates.title}</h2>
          <p>{contentLang.updates.p1}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.contact.title}</h2>
          <p>
            {contentLang.contact.p1}{' '}
            <a href="mailto:info@qwantix.com" className="text-indigo-600 hover:underline">
              info@qwantix.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
