'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

const navBase = {
  services: [
    { name: 'SEO', nameEs: 'SEO', nameDe: 'SEO', nameRu: 'SEO', slug: 'seo' },
    { name: 'PPC Advertising', nameEs: 'Publicidad PPC', nameDe: 'PPC‑Werbung', nameRu: 'PPC‑реклама', slug: 'ppc-advertising' },
    { name: 'Social Media Marketing', nameEs: 'Marketing en redes sociales', nameDe: 'Social‑Media‑Marketing', nameRu: 'Маркетинг в соцсетях', slug: 'social-media-marketing' },
    { name: 'Content Creation', nameEs: 'Creación de contenido', nameDe: 'Content‑Erstellung', nameRu: 'Контент‑маркетинг', slug: 'content-creation' },
  ],
  company: [
    { name: 'About Us', nameEs: 'Sobre nosotros', nameDe: 'Über uns', nameRu: 'О нас', anchor: '#why-choose-us' },
    { name: 'Case Studies', nameEs: 'Casos', nameDe: 'Case Studies', nameRu: 'Кейсы', anchor: '#case-studies' },
    { name: 'Blog', nameEs: 'Blog', nameDe: 'Blog', nameRu: 'Блог', path: '/blog' },
    { name: 'Contact', nameEs: 'Contacto', nameDe: 'Kontakt', nameRu: 'Контакты', anchor: '#contact-us' },
  ],
  legal: [
    { name: 'Privacy Policy', nameEs: 'Política de privacidad', nameDe: 'Datenschutz', nameRu: 'Политика конфиденциальности', href: '#' },
    { name: 'Terms of Service', nameEs: 'Términos del servicio', nameDe: 'Nutzungsbedingungen', nameRu: 'Условия использования', href: '#' },
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
                clipRule="evenodd"
                />
                 <path d="M16.95 6.405a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
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
                clipRule="evenodd"
                />
                 <path d="M16.95 6.405a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
            </svg>
        ),
    },
    {
        name: 'Twitter',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
      href: `/${detectedLang}/services/${s.slug}`
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
    legal: navBase.legal.map(l => ({ name: isEs ? (l as any).nameEs : isDe ? (l as any).nameDe : isRu ? (l as any).nameRu : l.name, href: (l as any).href }))
  };
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
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
              {social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">{isEs ? 'Servicios' : isDe ? 'Services' : isRu ? 'Услуги' : 'Services'}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">{isEs ? 'Empresa' : isDe ? 'Company' : isRu ? 'Компания' : 'Company'}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">{isEs ? 'Legal' : isDe ? 'Legal' : isRu ? 'Правовая информация' : 'Legal'}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} Qwantix Agency. {isEs ? 'Todos los derechos reservados.' : isDe ? 'All rights reserved.' : isRu ? 'Все права защищены.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
}
