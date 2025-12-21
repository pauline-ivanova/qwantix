'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Disclosure, Transition } from '@headlessui/react'

// Inline SVG icons to avoid loading @heroicons/react bundle
const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773l-1.591-1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
)

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
)

interface Subservice {
  name: string
  href: string
}

interface Service {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  subservices: Subservice[]
}

interface NavigationItem {
  name: string
  href: string
}

interface MobileMenuProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  services: Service[]
  navigation: NavigationItem[]
  detectedLang: string
  pathname: string
  switchableLocales: string[]
  buildLocaleHref: (locale: string) => string
  FlagIcon: React.ComponentType<{ locale: string }>
  getLocaleLabel: (locale: string) => string
  isDark: boolean
  setTheme: (theme: 'light' | 'dark') => void
  isEs: boolean
  isDe: boolean
  isRu: boolean
}

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  services,
  navigation,
  detectedLang,
  pathname,
  switchableLocales,
  buildLocaleHref,
  FlagIcon,
  getLocaleLabel,
  isDark,
  setTheme,
  isEs,
  isDe,
  isRu,
}: MobileMenuProps) {
  const isServicesActive = pathname.includes('/services/')

  const isItemActive = (href: string) => {
    if (href.includes('/services/')) return false
    if (href.includes('#')) return false
    return pathname === href
  }

  return (
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-50" />
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="ease-in duration-200 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href={`/${detectedLang}`} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
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
                      <Disclosure.Button className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-800 ${isServicesActive ? 'text-indigo-400 bg-gray-800/50' : 'text-white'}`}>
                        {isEs ? 'Servicios' : isDe ? 'Leistungen' : isRu ? 'Услуги' : 'Services'}
                        <ChevronDownIcon
                          className={`h-5 w-5 flex-none ${open ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-1">
                        {services.map((service) => (
                          <div key={service.name} className="mb-2">
                            <div className="px-6 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                              {service.name}
                            </div>
                            {service.subservices.map((subservice) => {
                              const active = subservice.href === pathname
                              return (
                                <Disclosure.Button
                                  key={subservice.name}
                                  as="a"
                                  href={subservice.href}
                                  className={`block rounded-lg py-2 pl-8 pr-3 text-sm leading-6 transition-colors ${active ? 'text-indigo-400 font-bold bg-gray-800/30' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subservice.name}
                                </Disclosure.Button>
                              )
                            })}
                          </div>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {navigation.map((item) => {
                  const active = isItemActive(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-800 ${active ? 'text-indigo-400 bg-gray-800/50' : 'text-white'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
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
                            onClick={() => setMobileMenuOpen(false)}
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isEs ? 'Agendar una llamada' : isDe ? 'Gespräch vereinbaren' : isRu ? 'Записаться на консультацию' : 'Schedule a Call'}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  )
}

