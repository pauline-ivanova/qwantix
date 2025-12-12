'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

const sectionsBase = [
  { id: 'core-services', title: 'Services', titleEs: 'Servicios', titleDe: 'Leistungen', titleRu: 'Услуги' },
  { id: 'why-choose-us', title: 'Why Us', titleEs: 'Por qué nosotros', titleDe: 'Warum wir', titleRu: 'Почему мы' },
  { id: 'our-impact', title: 'Impact', titleEs: 'Impacto', titleDe: 'Wirkung', titleRu: 'Результаты' },
  { id: 'industry-solutions', title: 'Industries', titleEs: 'Industrias', titleDe: 'Branchen', titleRu: 'Отрасли' },
  { id: 'our-approach', title: 'Our Approach', titleEs: 'Nuestro enfoque', titleDe: 'Unser Ansatz', titleRu: 'Наш подход' },
  { id: 'case-studies', title: 'Case Studies', titleEs: 'Casos', titleDe: 'Case Studies', titleRu: 'Кейсы' },
  { id: 'budget-calculator', title: 'Calculator', titleEs: 'Calculadora', titleDe: 'Rechner', titleRu: 'Калькулятор' },
  { id: 'faq', title: 'FAQ', titleEs: 'FAQ', titleDe: 'FAQ', titleRu: 'FAQ' },
  { id: 'contact-us', title: 'Contact', titleEs: 'Contacto', titleDe: 'Kontakt', titleRu: 'Контакты' },
];

export default function DotNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const detectedLang = (() => {
    const first = pathname?.split('/')[1] || ''
    return i18n.locales.includes(first as any) ? first : i18n.defaultLocale
  })();
  const isEs = detectedLang === 'es';
  const isDe = detectedLang === 'de';
  const isRu = detectedLang === 'ru';
  const sections = sectionsBase.map(s => ({ id: s.id, title: isEs ? (s as any).titleEs : isDe ? (s as any).titleDe : isRu ? (s as any).titleRu : s.title }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } 
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  const getVisibleSections = () => {
    let start = Math.max(0, activeIndex - 2);
    let end = Math.min(sections.length, activeIndex + 3);

    if (end - start < 5) {
      if (start === 0) {
        end = Math.min(sections.length, 5);
      } else {
        start = Math.max(0, sections.length - 5);
      }
    }
    
    return sections.slice(start, end);
  };

  const visibleSections = getVisibleSections();

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <ul className="flex flex-col items-end space-y-4">
        {visibleSections.map((section) => {
          const sectionIndexInVisible = visibleSections.findIndex(s => s.id === section.id);
          const activeIndexInVisible = visibleSections.findIndex(s => s.id === activeSection);
          const distance = Math.abs(sectionIndexInVisible - activeIndexInVisible);

          let scale = 'scale-50';
          let opacity = 'opacity-40';
          let bgColor = 'bg-gray-500/50';

          if (distance === 0) { // Active
            scale = 'scale-125';
            opacity = 'opacity-100';
            bgColor = 'bg-indigo-500';
          } else if (distance === 1) { // Neighbors
            scale = 'scale-100';
            opacity = 'opacity-70';
          }

          return (
            <li key={section.id} className="flex items-center group justify-end" style={{ height: '20px', width: '150px' }}>
              <span 
                className="mr-3 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900/50 rounded-md px-2 py-1 whitespace-nowrap text-right"
              >
                {section.title}
              </span>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${bgColor} ${scale} ${opacity} group-hover:!bg-indigo-400 group-hover:!opacity-100`}
                aria-label={isEs ? `Ir a la sección ${section.title}` : isDe ? `Zur Sektion ${section.title} springen` : isRu ? `Перейти к секции ${section.title}` : `Go to ${section.title} section`}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
