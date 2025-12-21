'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { openCookieSettings } from '@/lib/cookie-utils';
import { Disclosure, Transition } from '@headlessui/react';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const navBase = {
  services: [
    { 
      name: 'SEO', 
      nameEs: 'SEO', 
      nameDe: 'SEO', 
      nameRu: 'SEO', 
      slug: 'seo', 
      subservices: [
        { name: 'Overview', nameEs: 'Vista general', nameDe: 'Übersicht', nameRu: 'Обзор', slug: 'seo' },
        { name: 'Comprehensive SEO', nameEs: 'SEO Integral', nameDe: 'Umfassendes SEO', nameRu: 'Комплексное SEO', slug: 'comprehensive-seo' },
        { name: 'Local SEO', nameEs: 'SEO Local', nameDe: 'Lokales SEO', nameRu: 'Локальное SEO', slug: 'local-seo' },
        { name: 'Technical SEO', nameEs: 'SEO Técnico', nameDe: 'Technisches SEO', nameRu: 'Техническое SEO', slug: 'technical-seo' },
        { name: 'E-commerce SEO', nameEs: 'SEO para E-commerce', nameDe: 'E-Commerce SEO', nameRu: 'SEO для магазинов', slug: 'e-commerce-seo' },
      ]
    },
    { 
      name: 'PPC Advertising', 
      nameEs: 'Publicidad PPC', 
      nameDe: 'PPC‑Werbung', 
      nameRu: 'PPC‑реклама', 
      slug: 'ppc-advertising', 
      subservices: [
        { name: 'Overview', nameEs: 'Vista general', nameDe: 'Übersicht', nameRu: 'Обзор', slug: 'ppc-advertising' },
        { name: 'Search Ads', nameEs: 'Anuncios de Búsqueda', nameDe: 'Suchanzeigen', nameRu: 'Поисковая реклама', slug: 'search-ads' },
        { name: 'Shopping Ads', nameEs: 'Anuncios de Shopping', nameDe: 'Shopping-Anzeigen', nameRu: 'Торговая реклама', slug: 'shopping-ads' },
        { name: 'Display & Social Ads', nameEs: 'Display y Redes Sociales', nameDe: 'Display & Social Ads', nameRu: 'Медийная реклама', slug: 'display-social-media-ads' },
      ]
    },
    { 
      name: 'Social Media', 
      nameEs: 'Redes Sociales', 
      nameDe: 'Social-Media', 
      nameRu: 'Социальные сети', 
      slug: 'social-media-marketing', 
      subservices: [
        { name: 'Overview', nameEs: 'Vista general', nameDe: 'Übersicht', nameRu: 'Обзор', slug: 'social-media-marketing' },
        { name: 'Organic SMM', nameEs: 'SMM Orgánico', nameDe: 'Organisches SMM', nameRu: 'Органический SMM', slug: 'organic-smm' },
        { name: 'SMM Content', nameEs: 'Contenido SMM', nameDe: 'SMM-Content-Erstellung', nameRu: 'Контент для SMM', slug: 'smm-content-creation' },
        { name: 'Community Management', nameEs: 'Gestión de Comunidad', nameDe: 'Community-Management', nameRu: 'Комьюнити-менеджмент', slug: 'smm-community-management' },
      ]
    },
    { 
      name: 'Content Marketing', 
      nameEs: 'Marketing de Contenidos', 
      nameDe: 'Content-Marketing', 
      nameRu: 'Контент-маркетинг', 
      slug: 'content-creation', 
      subservices: [
        { name: 'Overview', nameEs: 'Vista general', nameDe: 'Übersicht', nameRu: 'Обзор', slug: 'content-creation' },
        { name: 'Content Strategy', nameEs: 'Estrategia de Contenido', nameDe: 'Content-Strategie', nameRu: 'Стратегия контента', slug: 'content-strategy' },
        { name: 'Content Localization', nameEs: 'Localización de Contenido', nameDe: 'Content-Lokalisierung', nameRu: 'Локализация контента', slug: 'content-localization' },
        { name: 'Copywriting', nameEs: 'Copywriting', nameDe: 'Copywriting', nameRu: 'Копирайтинг', slug: 'copywriting' },
        { name: 'Visual Production', nameEs: 'Producción Visual', nameDe: 'Visuelle Produktion', nameRu: 'Визуальный контент', slug: 'visual-content-production' },
      ]
    },
  ],
  company: [
    { name: 'About Us', nameEs: 'Sobre nosotros', nameDe: 'Über uns', nameRu: 'О нас', path: '/about' },
    { name: 'Case Studies', nameEs: 'Casos', nameDe: 'Case Studies', nameRu: 'Кейсы', path: '/case-studies' },
    { name: 'Blog', nameEs: 'Blog', nameDe: 'Blog', nameRu: 'Блог', path: '/blog' },
    { name: 'Contact', nameEs: 'Contacto', nameDe: 'Kontakt', nameRu: 'Контакты', anchor: '#contact-us' },
  ],
  legal: [
    { name: 'Legal Notice', nameEs: 'Aviso Legal', nameDe: 'Impressum', nameRu: 'Правовая информация', path: '/impressum' },
    { name: 'Privacy Policy', nameEs: 'Política de privacidad', nameDe: 'Datenschutz', nameRu: 'Политика конфиденциальности', path: '/privacy' },
    { name: 'Cookie Policy', nameEs: 'Política de cookies', nameDe: 'Cookie-Richtlinie', nameRu: 'Файлы cookie', path: '/cookies' },
    { name: 'Terms of Service', nameEs: 'Términos de servicio', nameDe: 'AGB', nameRu: 'Условия использования', path: '/terms' },
    { name: 'AI Policy', nameEs: 'Política de IA', nameDe: 'KI-Richtlinie', nameRu: 'Политика использования ИИ', path: '/ai-policy' },
    { name: 'Accessibility', nameEs: 'Accesibilidad', nameDe: 'Barrierefreiheit', nameRu: 'Доступность', path: '/accessibility' },
  ],
};

const social = [
    {
        name: 'Facebook',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 012.153 2.153c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 3.808s-.012 2.74-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-2.153 2.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-3.808.06s-2.74-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.153-2.153c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-3.808s.012-2.74.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 012.153-2.153c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 0C9.58 0 9.22.01 8.134.059 7.05.108 6.223.284 5.514.549a6.907 6.907 0 00-3.041 3.041c-.265.71-.437 1.537-.486 2.622C2.01 9.22 2 9.58 2 12s.01 2.78.059 3.866c.049 1.085.221 1.912.486 2.622a6.907 6.907 0 003.041 3.041c.71.265 1.537.437 2.622.486C9.22 21.99 9.58 22 12 22s2.78-.01 3.866-.059c1.085-.049 1.912-.221 2.622-.486a6.907 6.907 0 003.041-3.041c.265-.71.437-1.537.486-2.622C21.99 14.78 22 14.42 22 12s-.01-2.78-.059-3.866c-.049-1.085-.221-1.912-.486-2.622a6.907 6.907 0 00-3.041-3.041c-.71-.265-1.537-.437-2.622-.486C14.78 2.01 14.42 2 12 2z"
                clipRule="evenodd"
                />
                <path
                fillRule="evenodd"
                d="M12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zM12 15a3 3 0 110-6 3 3 0 010 6z"
                />
                 <path d="M16.95 6.405a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
            </svg>
        ),
    },
    {
        name: 'X',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                fillRule="evenodd"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                clipRule="evenodd"
                />
            </svg>
        ),
    },
];

export default function Footer() {
  const pathname = usePathname();
  const detectedLang = (() => {
    const first = pathname?.split('/')[1] || ''
    return i18n.locales.includes(first as any) ? first : i18n.defaultLocale
  })();
  const isEs = detectedLang === 'es';
  const isDe = detectedLang === 'de';
  const isRu = detectedLang === 'ru';

  const navigation = {
    services: navBase.services.map(s => ({
      name: isEs ? (s as any).nameEs : isDe ? (s as any).nameDe : isRu ? (s as any).nameRu : s.name,
      href: `/${detectedLang}/services/${s.slug}`,
      subservices: s.subservices
        .filter(sub => sub.slug !== s.slug) // Remove "Overview" which points to the same slug as parent
        .map(sub => ({
          name: isEs ? (sub as any).nameEs : isDe ? (sub as any).nameDe : isRu ? (sub as any).nameRu : sub.name,
          href: `/${detectedLang}/services/${sub.slug}`
        }))
    })),
    company: navBase.company.map(c => {
      if ('path' in c && (c as any).path) {
        return { name: isEs ? (c as any).nameEs : isDe ? (c as any).nameDe : isRu ? (c as any).nameRu : c.name, href: `/${detectedLang}${(c as any).path}` }
      }
      if ('anchor' in c && (c as any).anchor) {
        return { name: isEs ? (c as any).nameEs : isDe ? (c as any).nameDe : isRu ? (c as any).nameRu : c.name, href: `/${detectedLang}${(c as any).anchor}` }
      }
      return { name: isEs ? (c as any).nameEs : isDe ? (c as any).nameDe : isRu ? (c as any).nameRu : c.name, href: '#' }
    }),
    legal: navBase.legal.map(l => ({ 
      name: isEs ? (l as any).nameEs : isDe ? (l as any).nameDe : isRu ? (l as any).nameRu : l.name, 
      href: `/${detectedLang}${(l as any).path || '#'}` 
    }))
  };

  return (
    <footer className="bg-gray-900" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Logo and Slogan Block */}
          <div className="lg:col-span-4 space-y-8">
            <Link href={`/${detectedLang}`} className="inline-block">
              <Image
                  className="h-7 w-auto"
                  src="/images/qwantix-logo-white.svg"
                  alt="Qwantix Agency"
                  width={100}
                  height={28}
              />
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              {isEs ? 'Marketing digital impulsado por analítica. Transformamos tu presencia online generando crecimiento medible y maximizando tu ROI.' : isDe ? 'Digital Marketing Powered by Analytics. We transform your online presence, driving measurable growth and maximizing your digital ROI.' : isRu ? 'Цифровой маркетинг на основе аналитики. Трансформируем ваше онлайн‑присутствие, обеспечивая измеримый рост и максимальный ROI.' : 'Digital Marketing Powered by Analytics. We transform your online presence, driving measurable growth and maximizing your digital ROI.'}
            </p>
            <div className="flex space-x-6">
              {social.map((item, index) => (
                <a key={`${item.name}-${index}`} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* 4 Columns of Services */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {navigation.services.map((category) => (
              <div key={category.name}>
                <Link 
                  href={category.href}
                  className="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors"
                  suppressHydrationWarning
                >
                  {category.name}
                </Link>
                <ul role="list" className="mt-6 space-y-4">
                  {category.subservices.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row: About, Case Studies, Blog, Contact + Legal Dropdown */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {navigation.company.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium leading-6 text-gray-300 hover:text-white transition-colors">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="relative">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center gap-2 text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors focus:outline-none">
                    <span>{isEs ? 'Legal' : isDe ? 'Rechtliches' : isRu ? 'Правовая информация' : 'Legal'}</span>
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                  </Disclosure.Button>
                  
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0 translate-y-2"
                    enterTo="transform scale-100 opacity-100 translate-y-0"
                    leave="transition duration-150 ease-in"
                    leaveFrom="transform scale-100 opacity-100 translate-y-0"
                    leaveTo="transform scale-95 opacity-0 translate-y-2"
                  >
                    <Disclosure.Panel className="absolute bottom-full right-0 mb-4 w-56 overflow-hidden rounded-xl bg-gray-800 border border-white/10 shadow-2xl z-50">
                      <div className="p-2 space-y-1">
                        {navigation.legal.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                        <button
                          onClick={openCookieSettings}
                          className="w-full text-left rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          {isEs ? 'Gestionar Cookies' : isDe ? 'Cookies verwalten' : isRu ? 'Файлы cookie' : 'Manage Cookies'}
                        </button>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2025 Qwantix Agency. {isEs ? 'Todos los derechos reservados.' : isDe ? 'Alle Rechte vorbehalten.' : isRu ? 'Все права защищены.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
