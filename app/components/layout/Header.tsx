'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n.config'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useTheme } from '@/lib/theme'
import MobileMenu from './MobileMenu'

// Inline SVG icons to avoid loading @heroicons/react bundle
const Bars3Icon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
)

const CursorArrowRaysIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M16.5 16.5l1.591 1.591M12 18.75V21m-4.5-4.5L5.909 18.09M3.75 10.5H6m.166-5.834 1.591 1.591" />
  </svg>
)

const SpeakerWaveIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
)

const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

// Dynamic import for DesktopMenu - it uses heavy @headlessui/react, defer loading
// Defer DesktopMenu loading until after page is interactive to reduce TBT
const DesktopMenu = dynamic(() => import('./DesktopMenu'), {
  ssr: false, // Defer @headlessui/react bundle loading
  loading: () => null, // No placeholder to avoid any JS execution
})

// hrefs will be filled dynamically using the detected lang; strings localized later
const baseServices = [
  { 
    name: 'SEO', 
    nameEs: 'SEO', 
    nameDe: 'SEO', 
    nameRu: 'SEO', 
    slug: 'seo', 
    icon: ChartBarIcon,
    subservices: [
      { name: 'Comprehensive SEO', nameEs: 'SEO Integral', nameDe: 'Umfassendes SEO', nameRu: 'Комплексное SEO', slug: 'comprehensive-seo' },
      { name: 'Local SEO', nameEs: 'SEO Local', nameDe: 'Lokales SEO', nameRu: 'Локальное SEO', slug: 'local-seo' },
      { name: 'Technical SEO', nameEs: 'SEO Técnico', nameDe: 'Technisches SEO', nameRu: 'Техническое SEO', slug: 'technical-seo' },
      { name: 'E-commerce SEO', nameEs: 'SEO para E-commerce', nameDe: 'E-Commerce SEO', nameRu: 'SEO для интернет-магазинов', slug: 'e-commerce-seo' },
    ]
  },
  { 
    name: 'PPC Advertising', 
    nameEs: 'Publicidad PPC', 
    nameDe: 'PPC‑Werbung', 
    nameRu: 'PPC‑реклама', 
    slug: 'ppc-advertising', 
    icon: CursorArrowRaysIcon,
    subservices: [
      { name: 'Search Ads', nameEs: 'Anuncios de Búsqueda', nameDe: 'Suchanzeigen', nameRu: 'Поисковая реклама', slug: 'search-ads' },
      { name: 'Shopping Ads', nameEs: 'Anuncios de Shopping', nameDe: 'Shopping-Anzeigen', nameRu: 'Товарные объявления', slug: 'shopping-ads' },
      { name: 'Display & Social Media Ads', nameEs: 'Anuncios Display y Redes Sociales', nameDe: 'Display- und Social-Media-Anzeigen', nameRu: 'Медийная и реклама в соцсетях', slug: 'display-social-media-ads' },
    ]
  },
  { 
    name: 'Social Media Marketing', 
    nameEs: 'Marketing en redes sociales', 
    nameDe: 'Social-Media-Marketing', 
    nameRu: 'Маркетинг в соцсетях', 
    slug: 'social-media-marketing', 
    icon: SpeakerWaveIcon,
    subservices: [
      { name: 'Organic SMM', nameEs: 'SMM Orgánico', nameDe: 'Organisches SMM', nameRu: 'Органический SMM', slug: 'organic-smm' },
      { name: 'SMM Content Creation', nameEs: 'Creación de Contenido SMM', nameDe: 'SMM-Content-Erstellung', nameRu: 'Создание контента для SMM', slug: 'smm-content-creation' },
      { name: 'SMM Community Management', nameEs: 'Gestión de Comunidad SMM', nameDe: 'SMM-Community-Management', nameRu: 'Управление сообществом SMM', slug: 'smm-community-management' },
    ]
  },
  { 
    name: 'Content Creation', 
    nameEs: 'Creación de contenido', 
    nameDe: 'Content‑Erstellung', 
    nameRu: 'Контент‑маркетинг', 
    slug: 'content-creation', 
    icon: DocumentTextIcon,
    subservices: [
      { name: 'Content Strategy', nameEs: 'Estrategia de Contenido', nameDe: 'Content-Strategie', nameRu: 'Стратегия контента', slug: 'content-strategy' },
      { name: 'Content Localization', nameEs: 'Localización de Contenido', nameDe: 'Content-Lokalisierung', nameRu: 'Локализация контента', slug: 'content-localization' },
      { name: 'Copywriting', nameEs: 'Copywriting', nameDe: 'Copywriting', nameRu: 'Копирайтинг', slug: 'copywriting' },
      { name: 'Visual Content Production', nameEs: 'Producción de Contenido Visual', nameDe: 'Visuelle Content-Produktion', nameRu: 'Производство визуального контента', slug: 'visual-content-production' },
    ]
  },
]

// hrefs will be filled dynamically using the detected lang
const baseNavigation = [
  { name: 'Case Studies', nameEs: 'Casos', nameDe: 'Case Studies', nameRu: 'Кейсы', path: '/case-studies' },
  { name: 'About Us', nameEs: 'Sobre nosotros', nameDe: 'Über uns', nameRu: 'О нас', path: '/about' },
  { name: 'Blog', nameEs: 'Blog', nameDe: 'Blog', nameRu: 'Блог', path: '/blog' },
  { name: 'Contact', nameEs: 'Contacto', nameDe: 'Kontakt', nameRu: 'Контакты', anchor: '#contact-us' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [shouldLoadDesktopMenu, setShouldLoadDesktopMenu] = useState(false)
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

  // Defer DesktopMenu loading until after initial render to reduce TBT
  useEffect(() => {
    // Only load on desktop viewport
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      // Load after a short delay to allow critical content to render first
      // Use requestIdleCallback for better performance, but with shorter timeout
      const loadMenu = () => {
        setShouldLoadDesktopMenu(true)
      }

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadMenu, { timeout: 1500 })
      } else {
        // Fallback: load after DOMContentLoaded
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            setTimeout(loadMenu, 500)
          })
        } else {
          setTimeout(loadMenu, 500)
        }
      }
    }
  }, [])

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
    href: `/${detectedLang}/services/${s.slug}`,
    icon: s.icon,
    subservices: s.subservices.map((sub) => ({
      name: isEs ? (sub as any).nameEs : isDe ? (sub as any).nameDe : isRu ? (sub as any).nameRu : sub.name,
      href: `/${detectedLang}/services/${sub.slug}`,
    })),
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
        isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-20" aria-label="Global">
        <div className="flex lg:flex-none">
          <Link href={`/${detectedLang}`} className="-m-1.5 p-1.5 flex items-center">
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
        {/* Desktop menu - lazy loaded, only renders when visible, deferred until interactive */}
        {shouldLoadDesktopMenu && (
          <DesktopMenu
            services={services}
            navigation={navigation}
            detectedLang={detectedLang}
            pathname={pathname || ''}
            switchableLocales={switchableLocales}
            buildLocaleHref={buildLocaleHref}
            FlagIcon={FlagIcon}
            getLocaleLabel={getLocaleLabel}
            isDark={isDark}
            setTheme={setTheme}
            isEs={isEs}
            isDe={isDe}
            isRu={isRu}
          />
        )}
      </nav>
      {mobileMenuOpen && (
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          services={services}
          navigation={navigation}
          detectedLang={detectedLang}
          pathname={pathname || ''}
          switchableLocales={switchableLocales}
          buildLocaleHref={buildLocaleHref}
          FlagIcon={FlagIcon}
          getLocaleLabel={getLocaleLabel}
          isDark={isDark}
          setTheme={setTheme}
          isEs={isEs}
          isDe={isDe}
          isRu={isRu}
        />
      )}
    </header>
  )
}
