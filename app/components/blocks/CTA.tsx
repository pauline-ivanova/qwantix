'use client'
import dynamic from 'next/dynamic'
import ruDict from '@/dictionaries/ru.json'
const AuroraBackground = dynamic(() => import('./AuroraBackground'), { ssr: false })
const StarBorder = dynamic(() => import('@/app/components/StarBorder'), { ssr: false })

export default function CTA({ lang = 'en' }: { lang?: string }) {
  const isEs = lang === 'es';
  const isDe = lang === 'de';
  const isRu = lang === 'ru';
  const ru = (ruDict as any)?.home?.cta;
  return (
    <div className="bg-white dark:bg-[#061423] py-16 sm:py-24" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <div className="absolute inset-0 pointer-events-none">
            <AuroraBackground variant="compact" blendMode="overlay" />
          </div>
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl no-hyphen-break" suppressHydrationWarning>
              {isEs ? '¿Listo para elevar tu visibilidad online?' : isDe ? 'Bereit, Ihre Online‑Sichtbarkeit zu steigern?' : isRu ? (ru?.title ?? 'Готовы повысить видимость онлайн?') : 'Ready to Elevate Your Online Visibility?'}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              {isEs ? 'Agenda una llamada con nuestros expertos para hablar de tus objetivos y posibles estrategias.' : isDe ? 'Vereinbaren Sie ein persönliches Gespräch mit unseren Expert:innen, um Ziele und passende Strategien zu besprechen.' : isRu ? (ru?.description ?? 'Запишитесь на консультацию с нашими экспертами, чтобы обсудить цели и потенциальные стратегии.') : 'Schedule a one-on-one call with our experts to discuss your goals and potential strategies.'}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <StarBorder
                as="a"
                href={`/${lang}#contact-us`}
                color="rgba(255,255,255,0.95)"
                speed="6s"
                thickness={3}
                radius={8}
                className="shadow-md"
                innerStyle={{
                  background: '#ffffff',
                  color: '#4f46e5',
                  fontSize: '0.875rem',
                  padding: '10px 14px',
                  border: '1px solid rgba(255,255,255,0.35)'
                }}
              >
                {isEs ? 'Reservar consulta' : isDe ? 'Beratung buchen' : isRu ? (ru?.button ?? 'Записаться на консультацию') : 'Book Consultation'}
              </StarBorder>
            </div>
          </div>
          {/* wave divider consistent with hero if needed stays outside */}
        </div>
      </div>
    </div>
  )
}
