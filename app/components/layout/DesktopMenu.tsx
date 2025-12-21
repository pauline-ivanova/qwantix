'use client'

import { Fragment, useState, useRef } from 'react'
import Link from 'next/link'
import { Menu, Popover, Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
const StarBorder = dynamic(() => import('@/app/components/StarBorder'), { ssr: false })

// Inline SVG icons to avoid loading @heroicons/react bundle
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
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

interface DesktopMenuProps {
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

export default function DesktopMenu({
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
}: DesktopMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsServicesOpen(true)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 200)
  }

  const isServicesActive = pathname.includes('/services/')

  const isItemActive = (href: string) => {
    // For services, we handle it separately
    if (href.includes('/services/')) return false
    
    // For anchor links, we don't highlight them as "active page" 
    // unless we want to implement scroll-spy, which is more complex.
    // For now, only highlight actual page changes.
    if (href.includes('#')) return false

    // Exact match for pages like /blog
    return pathname === href
  }

  return (
    <>
      <div className="hidden lg:flex lg:items-center lg:gap-x-8 lg:flex-none">
        <div 
          className="static flex items-center h-full"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <Popover className="static flex items-center">
            <Popover.Button 
              className={`group flex items-center gap-x-1.5 text-sm font-semibold leading-none transition-all duration-200 relative outline-none py-2 whitespace-nowrap ${isServicesOpen || isServicesActive ? 'text-gray-300' : 'text-white hover:text-gray-300'}`}
            >
              <span>{isEs ? 'Servicios' : isDe ? 'Leistungen' : isRu ? 'Услуги' : 'Services'}</span>
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-200 ${isServicesOpen || isServicesActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Popover.Button>

            <Transition
              show={isServicesOpen}
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-[0.98]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-[0.98]"
            >
              <Popover.Panel static className="absolute left-0 right-0 top-full z-50 mx-auto mt-4 w-[calc(100vw-2rem)] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 border border-gray-100">
                <div className="p-10">
                <div className="grid grid-cols-4 gap-10">
                  {services.map((service) => {
                    // Map category colors from technical brief
                    const getCategoryColor = (name: string) => {
                      if (name.includes('SEO')) return 'text-[#635bff] bg-[#635bff]/10'
                      if (name.includes('PPC') || name.includes('Ads')) return 'text-[#ff629c] bg-[#ff629c]/10'
                      if (name.includes('SMM') || name.includes('Social')) return 'text-[#ff8319] bg-[#ff8319]/10'
                      if (name.includes('Content')) return 'text-[#19c9c9] bg-[#19c9c9]/10'
                      return 'text-gray-600 bg-gray-50 group-hover:bg-gray-100'
                    }
                    
                    const colorClasses = getCategoryColor(service.name)
                    
                    return (
                      <div key={service.name} className="flex flex-col h-full">
                        <div className="flex items-center gap-x-3 mb-6">
                          <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${colorClasses}`}>
                            <service.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <Link href={service.href} className="text-[15px] font-bold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors whitespace-nowrap">
                            {service.name}
                          </Link>
                        </div>
                        
                        <div className="flex flex-col flex-1">
                          <ul className="space-y-3 mb-6">
                            {service.subservices.map((subservice) => {
                              const active = subservice.href === pathname
                              return (
                                <li key={subservice.name}>
                                  <Link
                                    href={subservice.href}
                                    className={`group/item flex items-center text-[13px] transition-colors duration-200 whitespace-nowrap ${active ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors ${active ? 'bg-indigo-600' : 'bg-gray-200 group-hover/item:bg-indigo-500'}`}></span>
                                    {subservice.name}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                          
                          <div className="mt-auto pt-4 border-t border-gray-50">
                            <Link
                              href={service.href}
                              className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.1em] text-indigo-600 hover:text-indigo-700 transition-colors whitespace-nowrap"
                            >
                              {isEs ? 'Explorar todo' : isDe ? 'Alle ansehen' : isRu ? 'Смотреть всё' : 'Explore All'}
                              <svg className="ml-1.5 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="bg-gray-50/80 backdrop-blur-sm px-10 py-5 border-t border-gray-100">
                <div className="flex items-center gap-x-6">
                  <div className="flex items-center gap-x-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <p className="text-[13px] font-medium text-gray-600 leading-none whitespace-nowrap">
                      {isEs ? '¿Necesitas una solución a medida?' : isDe ? 'Maßgeschneiderte Lösung?' : isRu ? 'Нужно индивидуальное решение?' : 'Need a custom solution?'}
                    </p>
                  </div>
                  <Link 
                    href={`/${detectedLang}#contact-us`} 
                    className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group/talk transition-all duration-200 border-b border-transparent hover:border-indigo-600 pb-0.5 leading-none whitespace-nowrap"
                  >
                    {isEs ? 'Hablemos' : isDe ? 'Kontakt' : isRu ? 'Связаться с нами' : 'Talk to us'} 
                    <svg className="w-4 h-4 transition-transform group-hover/talk:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>

        {navigation.map((item) => {
          const active = isItemActive(item.href)
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`relative text-sm font-semibold leading-none transition-all duration-200 group/nav py-2 whitespace-nowrap ${active ? 'text-gray-300' : 'text-white hover:text-gray-300'}`}
            >
              <span className="relative z-10">{item.name}</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-200 ${active ? 'w-full' : 'w-0 group-hover/nav:w-full'}`}></span>
            </Link>
          )
        })}
      </div>
      <div className="hidden lg:flex lg:items-center lg:gap-x-6 lg:flex-none">
        <Popover className="relative">
          <Popover.Button className="flex items-center gap-x-1 rounded-lg px-2 py-1.5 text-xs font-semibold leading-6 text-white hover:bg-white/10 whitespace-nowrap">
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
            padding: '10px 14px',   /* py-2.5 px-3.5 */
            whiteSpace: 'nowrap'
          }}
        >
          {isEs ? 'Agendar una llamada' : isDe ? 'Gespräch vereinbaren' : isRu ? 'Записаться на консультацию' : 'Schedule a Call'}
        </StarBorder>
      </div>
    </>
  )
}

