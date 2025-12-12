'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n.config'

type CookieType = 'necessary' | 'analytics' | 'preferences'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  preferences: boolean
}

const translations = {
  en: {
    title: 'Cookie Usage',
    description: 'We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking "Accept all", you consent to the use of all cookies. You can manage your preferences at any time.',
    moreInfo: 'More information about cookies',
    acceptAll: 'Accept all',
    necessaryOnly: 'Necessary only',
    customize: 'Customize',
    settingsTitle: 'Cookie Settings',
    settingsDescription: 'You can enable or disable cookies according to your preferences. Necessary cookies cannot be disabled as they are essential for the site to function.',
    necessaryTitle: 'Necessary Cookies',
    necessaryDescription: 'These cookies are essential for the website to function correctly. They cannot be disabled.',
    analyticsTitle: 'Analytics Cookies',
    analyticsDescription: 'These cookies help us understand how visitors interact with our website, providing information about visited areas and time spent.',
    preferencesTitle: 'Preference Cookies',
    preferencesDescription: 'These cookies allow the website to remember information that changes how the site behaves or looks, such as your preferred language.',
    savePreferences: 'Save preferences',
  },
  es: {
    title: 'Uso de Cookies',
    description: 'Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. Al hacer clic en "Aceptar todas", aceptas el uso de todas las cookies. Puedes gestionar tus preferencias en cualquier momento.',
    moreInfo: 'Más información sobre cookies',
    acceptAll: 'Aceptar todas',
    necessaryOnly: 'Solo necesarias',
    customize: 'Personalizar',
    settingsTitle: 'Configuración de Cookies',
    settingsDescription: 'Puedes activar o desactivar las cookies según tus preferencias. Las cookies necesarias no se pueden desactivar ya que son esenciales para el funcionamiento del sitio.',
    necessaryTitle: 'Cookies Necesarias',
    necessaryDescription: 'Estas cookies son esenciales para que el sitio web funcione correctamente. No se pueden desactivar.',
    analyticsTitle: 'Cookies de Análisis',
    analyticsDescription: 'Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, proporcionándonos información sobre las áreas visitadas y el tiempo de permanencia.',
    preferencesTitle: 'Cookies de Preferencias',
    preferencesDescription: 'Estas cookies permiten que el sitio web recuerde información que cambia la forma en que el sitio se comporta o se ve, como tu idioma preferido.',
    savePreferences: 'Guardar preferencias',
  },
  de: {
    title: 'Cookie-Verwendung',
    description: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Website-Traffic zu analysieren und Inhalte zu personalisieren. Durch Klicken auf "Alle akzeptieren" stimmen Sie der Verwendung aller Cookies zu. Sie können Ihre Einstellungen jederzeit verwalten.',
    moreInfo: 'Mehr Informationen über Cookies',
    acceptAll: 'Alle akzeptieren',
    necessaryOnly: 'Nur notwendige',
    customize: 'Anpassen',
    settingsTitle: 'Cookie-Einstellungen',
    settingsDescription: 'Sie können Cookies nach Ihren Präferenzen aktivieren oder deaktivieren. Notwendige Cookies können nicht deaktiviert werden, da sie für die Funktionsweise der Website unerlässlich sind.',
    necessaryTitle: 'Notwendige Cookies',
    necessaryDescription: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie können nicht deaktiviert werden.',
    analyticsTitle: 'Analyse-Cookies',
    analyticsDescription: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, und liefern Informationen über besuchte Bereiche und Verweildauer.',
    preferencesTitle: 'Präferenz-Cookies',
    preferencesDescription: 'Diese Cookies ermöglichen es der Website, Informationen zu speichern, die das Verhalten oder Aussehen der Website ändern, wie z. B. Ihre bevorzugte Sprache.',
    savePreferences: 'Einstellungen speichern',
  },
  ru: {
    title: 'Использование файлов cookie',
    description: 'Мы используем файлы cookie для улучшения вашего опыта, анализа трафика сайта и персонализации контента. Нажимая "Принять все", вы соглашаетесь на использование всех файлов cookie. Вы можете управлять своими предпочтениями в любое время.',
    moreInfo: 'Больше информации о файлах cookie',
    acceptAll: 'Принять все',
    necessaryOnly: 'Только необходимые',
    customize: 'Настроить',
    settingsTitle: 'Настройки файлов cookie',
    settingsDescription: 'Вы можете включать или отключать файлы cookie в соответствии с вашими предпочтениями. Необходимые файлы cookie нельзя отключить, так как они необходимы для работы сайта.',
    necessaryTitle: 'Необходимые файлы cookie',
    necessaryDescription: 'Эти файлы cookie необходимы для правильной работы веб-сайта. Их нельзя отключить.',
    analyticsTitle: 'Аналитические файлы cookie',
    analyticsDescription: 'Эти файлы cookie помогают нам понять, как посетители взаимодействуют с нашим веб-сайтом, предоставляя информацию о посещенных областях и времени, проведенном на сайте.',
    preferencesTitle: 'Файлы cookie предпочтений',
    preferencesDescription: 'Эти файлы cookie позволяют веб-сайту запоминать информацию, которая изменяет поведение или внешний вид сайта, например, ваш предпочтительный язык.',
    savePreferences: 'Сохранить настройки',
  },
}

export default function CookieConsent() {
  const pathname = usePathname()
  const lang = pathname?.split('/')[1] || 'en'
  const currentLang = (i18n.locales.includes(lang as any) ? lang : 'en') as keyof typeof translations
  const t = translations[currentLang]
  
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if consent has been given previously
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 500)
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent)
        setPreferences(savedPreferences)
      } catch (e) {
        // If parsing fails, show banner again
        setIsVisible(true)
      }
    }

    // Listen for custom event to open cookie settings
    const handleOpenCookieSettings = () => {
      setIsVisible(true)
      setShowSettings(true)
      // Load current preferences if they exist
      const savedConsent = localStorage.getItem('cookie-consent')
      if (savedConsent) {
        try {
          const savedPreferences = JSON.parse(savedConsent)
          setPreferences(savedPreferences)
        } catch (e) {
          // Ignore parse errors
        }
      }
    }

    window.addEventListener('openCookieSettings', handleOpenCookieSettings)

    return () => {
      window.removeEventListener('openCookieSettings', handleOpenCookieSettings)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      preferences: true,
    }
    savePreferences(allAccepted)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      preferences: false,
    }
    savePreferences(necessaryOnly)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setIsVisible(false)
    setShowSettings(false)
    
    // Here you would typically initialize analytics or other services based on preferences
    if (prefs.analytics) {
      // Initialize analytics (e.g., Google Analytics)
      // Example: gtag('consent', 'update', { analytics_storage: 'granted' })
    }
  }

  const togglePreference = (type: CookieType) => {
    if (type === 'necessary') return // Cannot disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        {!showSettings ? (
          // Main Cookie Banner
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <InformationCircleIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t.description}{' '}
                  <Link 
                    href={`/${currentLang}/cookies`}
                    className="text-indigo-600 hover:underline font-medium"
                    aria-label={t.moreInfo}
                  >
                    {t.moreInfo}
                  </Link>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors text-sm"
                  >
                    {t.acceptAll}
                  </button>
                  <button
                    onClick={handleAcceptNecessary}
                    className="px-6 py-2.5 bg-gray-100 text-gray-900 rounded-md font-medium hover:bg-gray-200 transition-colors text-sm"
                  >
                    {t.necessaryOnly}
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-6 py-2.5 border border-gray-300 text-gray-900 rounded-md font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    {t.customize}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          // Cookie Settings Panel
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 md:p-8 max-h-[80vh] overflow-y-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <InformationCircleIcon className="w-6 h-6 text-indigo-600" />
                  {t.settingsTitle}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                {t.settingsDescription}
              </p>
            </div>

            <div className="space-y-6 mb-6">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t.necessaryTitle}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.necessaryDescription}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-indigo-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t.analyticsTitle}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.analyticsDescription}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      preferences.analytics 
                        ? 'bg-indigo-600' 
                        : 'bg-gray-300'
                    }`}></div>
                  </label>
                </div>
              </div>

              {/* Preferences Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {t.preferencesTitle}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t.preferencesDescription}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={() => togglePreference('preferences')}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      preferences.preferences 
                        ? 'bg-indigo-600' 
                        : 'bg-gray-300'
                    }`}></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-2.5 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                {t.savePreferences}
              </button>
              <Link
                href={`/${currentLang}/cookies`}
                className="flex items-center justify-center gap-2 px-6 py-2.5 text-indigo-600 hover:underline font-medium text-sm"
              >
                <InformationCircleIcon className="w-5 h-5" />
                {t.moreInfo}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
