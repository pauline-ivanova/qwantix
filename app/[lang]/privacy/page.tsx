import { Metadata } from 'next';
import { ShieldCheckIcon, InformationCircleIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { getDictionary } from '@/lib/dictionaries';
import { i18n } from '@/i18n.config';
import { generateStandardMetadata, generateAlternateLanguages } from '@/lib/metadata-utils';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const lang = resolvedParams.lang;
  const dict: any = await getDictionary(lang as any);
  
  const titles = {
    en: 'Privacy Policy | Qwantix Agency',
    es: 'Política de Privacidad | Qwantix Agency',
    de: 'Datenschutzerklärung | Qwantix Agency',
    ru: 'Политика конфиденциальности | Qwantix Agency',
  };
  
  const descriptions = {
    en: 'Privacy policy and data protection of Qwantix Agency. Information about how we collect, use, and protect your personal data.',
    es: 'Política de privacidad y protección de datos de Qwantix Agency. Información sobre cómo recopilamos, usamos y protegemos tus datos personales.',
    de: 'Datenschutzerklärung und Datenschutz von Qwantix Agency. Informationen darüber, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen.',
    ru: 'Политика конфиденциальности и защита данных Qwantix Agency. Информация о том, как мы собираем, используем и защищаем ваши персональные данные.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qwantix.com';
  const currentUrl = `${baseUrl}/${lang}/privacy`;
  const alternateLanguages = generateAlternateLanguages(lang, `/${lang}/privacy`);

  return {
    ...generateStandardMetadata({
      title: titles[lang as keyof typeof titles] || titles.en,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
      url: currentUrl,
      pagePath: `/${lang}/privacy`,
      keywords: ['privacy policy', 'data protection', 'GDPR', 'personal data'],
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
    title: 'Privacy Policy',
    lastUpdated: 'Last updated',
    general: {
      title: 'General Information',
      p1: 'We are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website and services.',
      p2: 'By using our website, you agree to the practices described in this policy. If you do not agree with any part of this policy, we recommend that you do not use our website.',
    },
    dataCollection: {
      title: 'Data We Collect',
      direct: {
        title: 'Information you provide directly:',
        items: [
          'Contact data: Name, email address, phone number',
          'Project information: Details about your project when you request a quote',
          'Communications: Messages you send us through contact forms',
        ],
      },
      automatic: {
        title: 'Information collected automatically:',
        items: [
          'Navigation data: IP address, browser type, pages visited, time spent',
          'Cookies: We use cookies to improve your experience. See our Cookie Policy for more information',
        ],
      },
    },
    dataUsage: {
      title: 'How We Use Your Data',
      items: [
        'Respond to your inquiries and quote requests',
        'Provide our digital marketing services',
        'Improve our website and user experience',
        'Send communications related to our services (only if you have given your consent)',
        'Comply with legal and regulatory obligations',
      ],
    },
    legalBasis: {
      title: 'Legal Basis for Processing',
      items: [
        'Consent: When you have given us your explicit consent (Art. 6.1.a GDPR)',
        'Contract performance: To fulfill our contractual obligations (Art. 6.1.b GDPR)',
        'Legitimate interest: To improve our services and communicate with you (Art. 6.1.f GDPR)',
        'Legal obligation: To comply with applicable legal requirements (Art. 6.1.c GDPR)',
      ],
    },
    dataSharing: {
      title: 'Data Sharing',
      p1: 'We do not sell or rent your personal data to third parties. We may share information with:',
      items: [
        'Service providers: Providers that help us operate our business (hosting, email, etc.)',
        'Legal authorities: When required by law or to protect our rights',
      ],
    },
    dataRetention: {
      title: 'Data Retention',
      p1: 'We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.',
      items: [
        'Contact form data: Will be retained for the time necessary to process your request and, subsequently, for the legally established periods (generally 3-6 years according to tax and commercial obligations)',
        'Data for commercial communications: Will be retained until you withdraw your consent',
        'Contractual data: Will be retained during the term of the contract and subsequently for the periods established by applicable legislation',
      ],
    },
    yourRights: {
      title: 'Your Rights',
      p1: 'In accordance with the General Data Protection Regulation (GDPR), you have the right to:',
      items: [
        'Access: Request a copy of your personal data',
        'Rectification: Correct inaccurate or incomplete data',
        'Erasure: Request deletion of your data',
        'Objection: Object to the processing of your data',
        'Portability: Receive your data in a structured format',
        'Restriction: Request limitation of processing',
      ],
      p2: 'To exercise these rights, you can contact us at:',
    },
    security: {
      title: 'Security',
      p1: 'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, loss, or destruction.',
    },
    changes: {
      title: 'Changes to this Policy',
      p1: 'We may update this Privacy Policy occasionally. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.',
    },
    contact: {
      title: 'Contact',
      p1: 'If you have questions about this Privacy Policy or about how we handle your personal data, you can contact us:',
      email: 'Email:',
      address: 'Address:',
    },
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización',
    general: {
      title: 'Información General',
      p1: 'Nos comprometemos a proteger tu privacidad y tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos tu información personal cuando utilizas nuestro sitio web y nuestros servicios.',
      p2: 'Al utilizar nuestro sitio web, aceptas las prácticas descritas en esta política. Si no estás de acuerdo con alguna parte de esta política, te recomendamos que no utilices nuestro sitio web.',
    },
    dataCollection: {
      title: 'Datos que Recopilamos',
      direct: {
        title: 'Información que nos proporcionas directamente:',
        items: [
          'Datos de contacto: Nombre, dirección de correo electrónico, número de teléfono',
          'Información del proyecto: Detalles sobre tu proyecto cuando solicitas un presupuesto',
          'Comunicaciones: Mensajes que nos envías a través de formularios de contacto',
        ],
      },
      automatic: {
        title: 'Información recopilada automáticamente:',
        items: [
          'Datos de navegación: Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia',
          'Cookies: Utilizamos cookies para mejorar tu experiencia. Consulta nuestra Política de Cookies para más información',
        ],
      },
    },
    dataUsage: {
      title: 'Cómo Utilizamos tus Datos',
      items: [
        'Responder a tus consultas y solicitudes de presupuesto',
        'Proporcionar nuestros servicios de marketing digital',
        'Mejorar nuestro sitio web y la experiencia del usuario',
        'Enviar comunicaciones relacionadas con nuestros servicios (solo si has dado tu consentimiento)',
        'Cumplir con obligaciones legales y regulatorias',
      ],
    },
    legalBasis: {
      title: 'Base Legal para el Procesamiento',
      items: [
        'Consentimiento: Cuando nos has dado tu consentimiento explícito (art. 6.1.a RGPD)',
        'Ejecución de contrato: Para cumplir con nuestras obligaciones contractuales (art. 6.1.b RGPD)',
        'Interés legítimo: Para mejorar nuestros servicios y comunicarnos contigo (art. 6.1.f RGPD)',
        'Obligación legal: Para cumplir con requisitos legales aplicables (art. 6.1.c RGPD)',
      ],
    },
    dataSharing: {
      title: 'Compartición de Datos',
      p1: 'No vendemos ni alquilamos tus datos personales a terceros. Podemos compartir información con:',
      items: [
        'Proveedores de servicios: Proveedores que nos ayudan a operar nuestro negocio (hosting, email, etc.)',
        'Autoridades legales: Cuando sea requerido por ley o para proteger nuestros derechos',
      ],
    },
    dataRetention: {
      title: 'Retención de Datos',
      p1: 'Conservamos tus datos personales solo durante el tiempo necesario para cumplir con los propósitos para los que fueron recopilados, o según lo requiera la ley aplicable.',
      items: [
        'Datos de contacto de formularios: Se conservarán durante el tiempo necesario para atender tu solicitud y, posteriormente, durante los plazos legalmente establecidos (generalmente 3-6 años según obligaciones fiscales y comerciales)',
        'Datos para comunicaciones comerciales: Se conservarán hasta que retires tu consentimiento',
        'Datos contractuales: Se conservarán durante la vigencia del contrato y posteriormente durante los plazos establecidos por la legislación aplicable',
      ],
    },
    yourRights: {
      title: 'Tus Derechos',
      p1: 'De acuerdo con el Reglamento General de Protección de Datos (RGPD), tienes derecho a:',
      items: [
        'Acceso: Solicitar una copia de tus datos personales',
        'Rectificación: Corregir datos inexactos o incompletos',
        'Supresión: Solicitar la eliminación de tus datos',
        'Oposición: Oponerte al procesamiento de tus datos',
        'Portabilidad: Recibir tus datos en un formato estructurado',
        'Limitación: Solicitar la limitación del procesamiento',
      ],
      p2: 'Para ejercer estos derechos, puedes contactarnos en:',
    },
    security: {
      title: 'Seguridad',
      p1: 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales contra acceso no autorizado, pérdida o destrucción.',
    },
    changes: {
      title: 'Cambios a esta Política',
      p1: 'Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos cualquier cambio significativo publicando la nueva política en esta página y actualizando la fecha de "Última actualización".',
    },
    contact: {
      title: 'Contacto',
      p1: 'Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tus datos personales, puedes contactarnos:',
      email: 'Email:',
      address: 'Dirección:',
    },
  },
  de: {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Zuletzt aktualisiert',
    general: {
      title: 'Allgemeine Informationen',
      p1: 'Wir verpflichten uns, Ihre Privatsphäre und persönlichen Daten zu schützen. Diese Datenschutzerklärung erläutert, wie wir Ihre persönlichen Informationen sammeln, verwenden, speichern und schützen, wenn Sie unsere Website und unsere Dienste nutzen.',
      p2: 'Durch die Nutzung unserer Website stimmen Sie den in dieser Richtlinie beschriebenen Praktiken zu. Wenn Sie mit einem Teil dieser Richtlinie nicht einverstanden sind, empfehlen wir Ihnen, unsere Website nicht zu nutzen.',
    },
    dataCollection: {
      title: 'Daten, die wir sammeln',
      direct: {
        title: 'Informationen, die Sie uns direkt zur Verfügung stellen:',
        items: [
          'Kontaktdaten: Name, E-Mail-Adresse, Telefonnummer',
          'Projektinformationen: Details zu Ihrem Projekt, wenn Sie ein Angebot anfordern',
          'Kommunikation: Nachrichten, die Sie uns über Kontaktformulare senden',
        ],
      },
      automatic: {
        title: 'Automatisch gesammelte Informationen:',
        items: [
          'Navigationsdaten: IP-Adresse, Browsertyp, besuchte Seiten, Verweildauer',
          'Cookies: Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Weitere Informationen finden Sie in unserer Cookie-Richtlinie',
        ],
      },
    },
    dataUsage: {
      title: 'Wie wir Ihre Daten verwenden',
      items: [
        'Auf Ihre Anfragen und Angebotsanfragen antworten',
        'Unsere digitalen Marketingdienste bereitstellen',
        'Unsere Website und Benutzererfahrung verbessern',
        'Kommunikation in Bezug auf unsere Dienste senden (nur wenn Sie Ihre Zustimmung gegeben haben)',
        'Rechtliche und regulatorische Verpflichtungen erfüllen',
      ],
    },
    legalBasis: {
      title: 'Rechtsgrundlage für die Verarbeitung',
      items: [
        'Zustimmung: Wenn Sie uns Ihre ausdrückliche Zustimmung gegeben haben (Art. 6.1.a DSGVO)',
        'Vertragserfüllung: Zur Erfüllung unserer vertraglichen Verpflichtungen (Art. 6.1.b DSGVO)',
        'Berechtigtes Interesse: Zur Verbesserung unserer Dienste und Kommunikation mit Ihnen (Art. 6.1.f DSGVO)',
        'Rechtliche Verpflichtung: Zur Erfüllung anwendbarer rechtlicher Anforderungen (Art. 6.1.c DSGVO)',
      ],
    },
    dataSharing: {
      title: 'Datenweitergabe',
      p1: 'Wir verkaufen oder vermieten Ihre persönlichen Daten nicht an Dritte. Wir können Informationen teilen mit:',
      items: [
        'Dienstleister: Anbieter, die uns beim Betrieb unseres Geschäfts helfen (Hosting, E-Mail usw.)',
        'Rechtsbehörden: Wenn gesetzlich vorgeschrieben oder zum Schutz unserer Rechte',
      ],
    },
    dataRetention: {
      title: 'Datenspeicherung',
      p1: 'Wir speichern Ihre persönlichen Daten nur so lange, wie es zur Erfüllung der Zwecke, für die sie gesammelt wurden, erforderlich ist, oder wie es das anwendbare Recht vorschreibt.',
      items: [
        'Kontaktformulardaten: Werden für die Zeit gespeichert, die zur Bearbeitung Ihrer Anfrage erforderlich ist, und anschließend für die gesetzlich festgelegten Fristen (in der Regel 3-6 Jahre gemäß steuerlichen und kommerziellen Verpflichtungen)',
        'Daten für kommerzielle Kommunikation: Werden gespeichert, bis Sie Ihre Zustimmung widerrufen',
        'Vertragsdaten: Werden während der Vertragslaufzeit und anschließend für die von der anwendbaren Gesetzgebung festgelegten Fristen gespeichert',
      ],
    },
    yourRights: {
      title: 'Ihre Rechte',
      p1: 'Gemäß der Datenschutz-Grundverordnung (DSGVO) haben Sie das Recht auf:',
      items: [
        'Zugang: Eine Kopie Ihrer persönlichen Daten anfordern',
        'Berichtigung: Unrichtige oder unvollständige Daten korrigieren',
        'Löschung: Löschung Ihrer Daten anfordern',
        'Widerspruch: Der Verarbeitung Ihrer Daten widersprechen',
        'Datenübertragbarkeit: Ihre Daten in einem strukturierten Format erhalten',
        'Einschränkung: Einschränkung der Verarbeitung anfordern',
      ],
      p2: 'Um diese Rechte auszuüben, können Sie uns kontaktieren unter:',
    },
    security: {
      title: 'Sicherheit',
      p1: 'Wir implementieren angemessene technische und organisatorische Sicherheitsmaßnahmen, um Ihre persönlichen Daten vor unbefugtem Zugriff, Verlust oder Zerstörung zu schützen.',
    },
    changes: {
      title: 'Änderungen an dieser Richtlinie',
      p1: 'Wir können diese Datenschutzerklärung gelegentlich aktualisieren. Wir werden Sie über wesentliche Änderungen informieren, indem wir die neue Richtlinie auf dieser Seite veröffentlichen und das Datum "Zuletzt aktualisiert" aktualisieren.',
    },
    contact: {
      title: 'Kontakt',
      p1: 'Wenn Sie Fragen zu dieser Datenschutzerklärung oder zur Handhabung Ihrer persönlichen Daten haben, können Sie uns kontaktieren:',
      email: 'E-Mail:',
      address: 'Adresse:',
    },
  },
  ru: {
    title: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление',
    general: {
      title: 'Общая информация',
      p1: 'Мы обязуемся защищать вашу конфиденциальность и персональные данные. Эта Политика конфиденциальности объясняет, как мы собираем, используем, храним и защищаем вашу личную информацию при использовании нашего веб-сайта и услуг.',
      p2: 'Используя наш веб-сайт, вы соглашаетесь с практиками, описанными в этой политике. Если вы не согласны с какой-либо частью этой политики, мы рекомендуем вам не использовать наш веб-сайт.',
    },
    dataCollection: {
      title: 'Данные, которые мы собираем',
      direct: {
        title: 'Информация, которую вы предоставляете напрямую:',
        items: [
          'Контактные данные: Имя, адрес электронной почты, номер телефона',
          'Информация о проекте: Детали о вашем проекте, когда вы запрашиваете предложение',
          'Коммуникации: Сообщения, которые вы отправляете нам через контактные формы',
        ],
      },
      automatic: {
        title: 'Информация, собираемая автоматически:',
        items: [
          'Данные навигации: IP-адрес, тип браузера, посещенные страницы, время, проведенное на сайте',
          'Файлы cookie: Мы используем файлы cookie для улучшения вашего опыта. См. нашу Политику использования файлов cookie для получения дополнительной информации',
        ],
      },
    },
    dataUsage: {
      title: 'Как мы используем ваши данные',
      items: [
        'Отвечать на ваши запросы и запросы предложений',
        'Предоставлять наши услуги цифрового маркетинга',
        'Улучшать наш веб-сайт и пользовательский опыт',
        'Отправлять коммуникации, связанные с нашими услугами (только если вы дали свое согласие)',
        'Соблюдать правовые и нормативные обязательства',
      ],
    },
    legalBasis: {
      title: 'Правовая основа для обработки',
      items: [
        'Согласие: Когда вы дали нам ваше явное согласие (ст. 6.1.а GDPR)',
        'Исполнение договора: Для выполнения наших договорных обязательств (ст. 6.1.б GDPR)',
        'Законный интерес: Для улучшения наших услуг и общения с вами (ст. 6.1.ф GDPR)',
        'Правовое обязательство: Для соблюдения применимых правовых требований (ст. 6.1.в GDPR)',
      ],
    },
    dataSharing: {
      title: 'Обмен данными',
      p1: 'Мы не продаем и не сдаем в аренду ваши персональные данные третьим лицам. Мы можем делиться информацией с:',
      items: [
        'Поставщиками услуг: Поставщиками, которые помогают нам вести наш бизнес (хостинг, электронная почта и т.д.)',
        'Правовыми органами: Когда это требуется по закону или для защиты наших прав',
      ],
    },
    dataRetention: {
      title: 'Хранение данных',
      p1: 'Мы храним ваши персональные данные только в течение времени, необходимого для выполнения целей, для которых они были собраны, или в соответствии с применимым законодательством.',
      items: [
        'Данные контактных форм: Будут храниться в течение времени, необходимого для обработки вашего запроса, и впоследствии в течение юридически установленных периодов (как правило, 3-6 лет в соответствии с налоговыми и коммерческими обязательствами)',
        'Данные для коммерческих коммуникаций: Будут храниться до тех пор, пока вы не отзовете свое согласие',
        'Договорные данные: Будут храниться в течение срока действия договора и впоследствии в течение периодов, установленных применимым законодательством',
      ],
    },
    yourRights: {
      title: 'Ваши права',
      p1: 'В соответствии с Общим регламентом по защите данных (GDPR), вы имеете право:',
      items: [
        'Доступ: Запросить копию ваших персональных данных',
        'Исправление: Исправить неточные или неполные данные',
        'Удаление: Запросить удаление ваших данных',
        'Возражение: Возразить против обработки ваших данных',
        'Портативность: Получить ваши данные в структурированном формате',
        'Ограничение: Запросить ограничение обработки',
      ],
      p2: 'Чтобы воспользоваться этими правами, вы можете связаться с нами по адресу:',
    },
    security: {
      title: 'Безопасность',
      p1: 'Мы применяем соответствующие технические и организационные меры безопасности для защиты ваших персональных данных от несанкционированного доступа, потери или уничтожения.',
    },
    changes: {
      title: 'Изменения в этой политике',
      p1: 'Мы можем периодически обновлять эту Политику конфиденциальности. Мы уведомим вас о любых значительных изменениях, разместив новую политику на этой странице и обновив дату "Последнее обновление".',
    },
    contact: {
      title: 'Контакты',
      p1: 'Если у вас есть вопросы об этой Политике конфиденциальности или о том, как мы обрабатываем ваши персональные данные, вы можете связаться с нами:',
      email: 'Email:',
      address: 'Адрес:',
    },
  },
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
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
            <ShieldCheckIcon className="w-6 h-6 text-indigo-600" />
            {contentLang.general.title}
          </h2>
          <p>{contentLang.general.p1}</p>
          <p>{contentLang.general.p2}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <InformationCircleIcon className="w-6 h-6 text-indigo-600" />
            {contentLang.dataCollection.title}
          </h2>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{contentLang.dataCollection.direct.title}</h3>
          <ul>
            {contentLang.dataCollection.direct.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6">{contentLang.dataCollection.automatic.title}</h3>
          <ul>
            {contentLang.dataCollection.automatic.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <LockClosedIcon className="w-6 h-6 text-indigo-600" />
            {contentLang.dataUsage.title}
          </h2>
          <ul>
            {contentLang.dataUsage.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.legalBasis.title}</h2>
          <ul>
            {contentLang.legalBasis.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.dataSharing.title}</h2>
          <p>{contentLang.dataSharing.p1}</p>
          <ul>
            {contentLang.dataSharing.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.dataRetention.title}</h2>
          <p>{contentLang.dataRetention.p1}</p>
          <ul>
            {contentLang.dataRetention.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.yourRights.title}</h2>
          <p>{contentLang.yourRights.p1}</p>
          <ul>
            {contentLang.yourRights.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">
            {contentLang.yourRights.p2}{' '}
            <a href="mailto:info@qwantix.com" className="text-indigo-600 hover:underline">
              info@qwantix.com
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.security.title}</h2>
          <p>{contentLang.security.p1}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{contentLang.changes.title}</h2>
          <p>{contentLang.changes.p1}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <EnvelopeIcon className="w-6 h-6 text-indigo-600" />
            {contentLang.contact.title}
          </h2>
          <p>{contentLang.contact.p1}</p>
          <ul>
            <li><strong>{contentLang.contact.email}</strong> <a href="mailto:info@qwantix.com" className="text-indigo-600 hover:underline">info@qwantix.com</a></li>
            <li><strong>{contentLang.contact.address}</strong> Qwantix Agency</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
