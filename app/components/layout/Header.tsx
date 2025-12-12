'use client'

import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n.config'
import Image from 'next/image'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import { useTheme } from '@/lib/theme'
const StarBorder = dynamic(() => import('@/app/components/StarBorder'), { ssr: false })

// hrefs will be filled dynamically using the detected lang; strings localized later
const baseServices = [
  { name: 'SEO', nameEs: 'SEO', nameDe: 'SEO', nameRu: 'SEO', description: 'Boost your visibility in search rankings', descriptionEs: 'Aumenta tu visibilidad en los resultados de búsqueda', descriptionDe: 'Steigern Sie Ihre Sichtbarkeit in den Suchergebnissen', descriptionRu: 'Повышайте видимость в поисковой выдаче', slug: 'seo', icon: ChartBarIcon },
  { name: 'PPC Advertising', nameEs: 'Publicidad PPC', nameDe: 'PPC‑Werbung', nameRu: 'PPC‑реклама', description: 'Maximize your return on ad spend', descriptionEs: 'Maximiza el retorno de tu inversión publicitaria', descriptionDe: 'Maximieren Sie den ROAS Ihrer Werbeausgaben', descriptionRu: 'Максимизируйте возврат на рекламные расходы', slug: 'ppc-advertising', icon: CursorArrowRaysIcon },
  { name: 'Social Media Marketing', nameEs: 'Marketing en redes sociales', nameDe: 'Social-Media-Marketing', nameRu: 'Маркетинг в соцсетях', description: 'Engage and grow your audience', descriptionEs: 'Impulsa y haz crecer tu audiencia', descriptionDe: 'Binden Sie Ihre Zielgruppe ein und lassen Sie sie wachsen', descriptionRu: 'Увлекайте аудиторию и растите охват', slug: 'social-media-marketing', icon: SpeakerWaveIcon },
  { name: 'Content Creation', nameEs: 'Creación de contenido', nameDe: 'Content‑Erstellung', nameRu: 'Контент‑маркетинг', description: 'Captivate with compelling content', descriptionEs: 'Cautiva con contenido de alto impacto', descriptionDe: 'Überzeugen Sie mit starkem Content', descriptionRu: 'Увлекайте сильным контентом', slug: 'content-creation', icon: DocumentTextIcon },
]

// hrefs will be filled dynamically using the detected lang
const baseNavigation = [
  { name: 'Case Studies', nameEs: 'Casos', nameDe: 'Case Studies', nameRu: 'Кейсы', anchor: '#case-studies' },
  { name: 'About Us', nameEs: 'Sobre nosotros', nameDe: 'Über uns', nameRu: 'О нас', anchor: '#why-choose-us' },
  { name: 'Blog', nameEs: 'Blog', nameDe: 'Blog', nameRu: 'Блог', path: '/blog' },
  { name: 'Contact', nameEs: 'Contacto', nameDe: 'Kontakt', nameRu: 'Контакты', anchor: '#contact-us' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // Determine current language from path; fallback to default
  const detectedLang = (() => {
    const first = pathname?.split('/')[1] || ''
    return i18n.locales.includes(first as any) ? first : i18n.defaultLocale
  })()
  
  useEffect(() => {
    if (theme === 'system') {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    } else {
      setIsDark(theme === 'dark')
    }
  }, [theme])

  // Build a localized href for the current path with the chosen locale
  const buildLocaleHref = (locale: string) => {
    const path = pathname || '/'
    const withoutLocale = path.replace(/^\/(en|de|es|ru)(?=\/|$)/, '') || '/'
    return `/${locale}${withoutLocale}`
  }

  const FlagIcon = ({ locale }: { locale: string }) => {
    if (locale === 'ru') {
      return (
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" className="shrink-0">
          <rect width="16" height="12" rx="2" fill="#E5E7EB" />
          <rect width="16" height="4" fill="#FFFFFF" />
          <rect y="4" width="16" height="4" fill="#2563EB" />
          <rect y="8" width="16" height="4" fill="#DC2626" />
        </svg>
      )
    }
    if (locale === 'de') {
      return (
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" className="shrink-0">
          <rect width="16" height="12" rx="2" fill="#0F172A" />
          <rect y="4" width="16" height="4" fill="#B91C1C" />
          <rect y="8" width="16" height="4" fill="#F59E0B" />
        </svg>
      )
    }
    if (locale === 'es') {
      return (
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" className="shrink-0">
          <rect width="16" height="12" rx="2" fill="#991B1B" />
          <rect y="3" width="16" height="6" fill="#F59E0B" />
        </svg>
      )
    }
    // en: Union Jack (simplified for small size)
    return (
      <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" className="shrink-0">
        <defs>
          <clipPath id="uj-clip">
            <rect width="16" height="12" rx="2" />
          </clipPath>
        </defs>
        <g clipPath="url(#uj-clip)">
          <rect width="16" height="12" fill="#012169" />
          <path d="M0 0 L16 12 M16 0 L0 12" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M0 0 L16 12 M16 0 L0 12" stroke="#C8102E" strokeWidth="1.5" />
          <rect x="7" width="2" height="12" fill="#FFFFFF" />
          <rect y="5" width="16" height="2" fill="#FFFFFF" />
          <rect x="7.5" width="1" height="12" fill="#C8102E" />
          <rect y="5.5" width="16" height="1" fill="#C8102E" />
        </g>
      </svg>
    )
  }

  const getLocaleLabel = (locale: string) => {
    if (detectedLang === 'es') {
      if (locale === 'en') return 'Inglés'
      if (locale === 'de') return 'Alemán'
      if (locale === 'es') return 'Español'
      if (locale === 'ru') return 'Ruso'
      return locale.toUpperCase()
    }
    if (detectedLang === 'ru') {
      if (locale === 'en') return 'Английский'
      if (locale === 'de') return 'Немецкий'
      if (locale === 'es') return 'Испанский'
      if (locale === 'ru') return 'Русский'
      return locale.toUpperCase()
    }
    // default labels in English
    if (locale === 'en') return 'English'
    if (locale === 'de') return 'German'
    if (locale === 'es') return 'Spanish'
    if (locale === 'ru') return 'Russian'
    return locale.toUpperCase()
  }

  const switchableLocales = i18n.locales.filter((loc) => loc !== detectedLang)

  const isEs = detectedLang === 'es'
  const isDe = detectedLang === 'de'
  const isRu = detectedLang === 'ru'

  const services = baseServices.map((s) => ({
    name: isEs ? (s as any).nameEs : isDe ? (s as any).nameDe : isRu ? (s as any).nameRu : s.name,
    description: isEs ? (s as any).descriptionEs : isDe ? (s as any).descriptionDe : isRu ? (s as any).descriptionRu : s.description,
    href: `/${detectedLang}/services/${s.slug}`,
    icon: s.icon,
  }))

  const navigation = baseNavigation.map((n) => {
    if ('path' in n && n.path) {
      return { name: isEs ? (n as any).nameEs : isDe ? (n as any).nameDe : isRu ? (n as any).nameRu : n.name, href: `/${detectedLang}${n.path}` }
    }
    if ('anchor' in n && n.anchor) {
      return { name: isEs ? (n as any).nameEs : isDe ? (n as any).nameDe : isRu ? (n as any).nameRu : n.name, href: `/${detectedLang}${n.anchor}` }
    }
    return { name: isEs ? (n as any).nameEs : isDe ? (n as any).nameDe : isRu ? (n as any).nameRu : n.name, href: `/${detectedLang}` }
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href={`/${detectedLang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Qwantix</span>
            <Image
              className="h-8 w-auto"
              src="/images/qwantix-logo-white.svg"
              alt="Qwantix Agency"
              width={115}
              height={32}
              sizes="115px"
              priority
              fetchPriority="high"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{isEs ? 'Abrir menú' : isDe ? 'Hauptmenü öffnen' : isRu ? 'Открыть главное меню' : 'Open main menu'}</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              {isEs ? 'Servicios' : isDe ? 'Leistungen' : isRu ? 'Услуги' : 'Services'}
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0 z-40" />

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {services.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </Link>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:items-center lg:gap-x-6 lg:flex-1 lg:justify-end">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 rounded-lg px-2 py-1.5 text-xs font-semibold leading-6 text-white hover:bg-white/10">
              {detectedLang.toUpperCase()}
              <ChevronDownIcon className="h-4 w-4 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Popover.Overlay className="fixed inset-0 z-40" />
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-1">
                  {switchableLocales.map((loc) => (
                    <Link
                      key={loc}
                      href={buildLocaleHref(loc)}
                      className={`flex items-center gap-x-2 rounded-md px-3 py-2 text-sm ${loc === detectedLang ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FlagIcon locale={loc} />
                      {getLocaleLabel(loc)}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="rounded-lg p-2 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          <StarBorder
            as="a"
            href={`/${detectedLang}#contact-us`}
            color="rgba(255,255,255,0.85)"
            speed="7s"
            thickness={2}
            radius={8}
            className="shadow-sm"
            innerStyle={{
              background: '#4f46e5', /* indigo-600 */
              fontSize: '0.875rem',   /* text-sm */
              padding: '10px 14px'    /* py-2.5 px-3.5 */
            }}
          >
            {isEs ? 'Agendar una llamada' : isDe ? 'Gespräch vereinbaren' : isRu ? 'Записаться на консультацию' : 'Schedule a Call'}
          </StarBorder>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href={`/${detectedLang}`} className="-m-1.5 p-1.5">
              <span className="sr-only">Qwantix</span>
              <Image
                className="h-8 w-auto"
                src="/images/qwantix-logo-white.svg"
                alt="Qwantix Agency"
                width={115}
                height={32}
                sizes="115px"
                priority
                fetchPriority="high"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">{isEs ? 'Cerrar menú' : isDe ? 'Menü schließen' : isRu ? 'Закрыть меню' : 'Close menu'}</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                        {isEs ? 'Servicios' : isDe ? 'Leistungen' : isRu ? 'Услуги' : 'Services'}
                        <ChevronDownIcon
                          className={`h-5 w-5 flex-none ${open ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {services.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-400 hover:bg-gray-800"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                        {isEs ? 'Idioma' : isDe ? 'Sprache' : isRu ? 'Язык' : 'Language'}
                        <ChevronDownIcon className={`h-5 w-5 flex-none ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-1 px-3">
                        {switchableLocales.map((loc) => (
                          <Link
                            key={loc}
                            href={buildLocaleHref(loc)}
                            className={`flex items-center gap-x-2 rounded-lg py-2 pl-2 pr-3 text-sm font-semibold leading-7 ${loc === detectedLang ? 'text-white' : 'text-gray-300 hover:text-white'} hover:bg-gray-800`}
                          >
                            <FlagIcon locale={loc} />
                            {getLocaleLabel(loc)}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="-mx-3 flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  {isDark ? (
                    <>
                      <SunIcon className="h-5 w-5" />
                      {isEs ? 'Modo claro' : isDe ? 'Heller Modus' : isRu ? 'Светлая тема' : 'Light Mode'}
                    </>
                  ) : (
                    <>
                      <MoonIcon className="h-5 w-5" />
                      {isEs ? 'Modo oscuro' : isDe ? 'Dunkler Modus' : isRu ? 'Тёмная тема' : 'Dark Mode'}
                    </>
                  )}
                </button>
              </div>
              <div className="py-6">
                <Link
                  href={`/${detectedLang}#contact-us`}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  {isEs ? 'Agendar una llamada' : isDe ? 'Gespräch vereinbaren' : isRu ? 'Записаться на консультацию' : 'Schedule a Call'}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
