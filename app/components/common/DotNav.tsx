'use client';

import { useEffect, useState, useMemo } from 'react';
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
  const [dynamicSections, setDynamicSections] = useState<Array<{ id: string; title: string }>>([]);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const pathname = usePathname();
  const detectedLang = (() => {
    const first = pathname?.split('/')[1] || ''
    return i18n.locales.includes(first as any) ? first : i18n.defaultLocale
  })();
  
  // Hide DotNav on blog pages (they have TableOfContents instead)
  const isBlogPage = pathname?.includes('/blog') || false;
  // Check if we're on a service page
  const isServicePage = pathname?.includes('/services/') || false;

  const isEs = detectedLang === 'es';
  const isDe = detectedLang === 'de';
  const isRu = detectedLang === 'ru';
  
  // Use dynamic sections for service pages, static sections for homepage
  const staticSections = useMemo(() => 
    sectionsBase.map(s => ({ 
      id: s.id, 
      title: isEs ? (s as any).titleEs : isDe ? (s as any).titleDe : isRu ? (s as any).titleRu : s.title 
    })), 
    [isEs, isDe, isRu]
  );
  
  const sections = isServicePage ? dynamicSections : staticSections;

  // Detect sections dynamically from page for service pages
  useEffect(() => {
    if (!isServicePage || isBlogPage) {
      setDynamicSections([]);
      if (!isServicePage) {
        // Set first non-hero section as active for homepage
        const firstSection = staticSections.find(s => s.id.toLowerCase() !== 'hero');
        setActiveSection(firstSection?.id || staticSections[0]?.id || 'core-services');
      }
      return;
    }

    // Function to detect sections
    const detectSections = () => {
      // Find all elements with data-section-id attribute, ordered by their position in DOM
      const sectionElements = Array.from(document.querySelectorAll('[data-section-id]'))
        .sort((a, b) => {
          // Sort by DOM position first (more reliable)
          const position = a.compareDocumentPosition(b);
          if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
            return -1;
          }
          if (position & Node.DOCUMENT_POSITION_PRECEDING) {
            return 1;
          }
          // Fallback to getBoundingClientRect if compareDocumentPosition doesn't work
          const aRect = a.getBoundingClientRect();
          const bRect = b.getBoundingClientRect();
          return aRect.top - bRect.top;
        });
      
      const detectedSections = sectionElements
        .map((el) => {
          const id = el.getAttribute('data-section-id');
          const title = el.getAttribute('data-section-title') || id || '';
          // Only include sections with valid ID (title can be empty, we'll use id as fallback)
          if (!id || id.length === 0) return null;
          
          // Exclude hero section and footer
          const idLower = id.toLowerCase();
          if (idLower === 'hero' || idLower.includes('footer')) {
            return null;
          }
          
          // Check if element is inside footer
          const isInFooter = el.closest('footer') !== null;
          if (isInFooter) {
            return null;
          }
          
          return { id, title: title || id };
        })
        .filter((s): s is { id: string; title: string } => s !== null);

      if (detectedSections.length > 0) {
        setDynamicSections(detectedSections);
        // Set first section as active initially (skip hero if it exists)
        const firstNonHeroSection = detectedSections.find(s => s.id.toLowerCase() !== 'hero') || detectedSections[0];
        setActiveSection(firstNonHeroSection.id);
      } else if (isServicePage) {
        // Debug: check if elements exist but validation failed
        const allWithId = Array.from(document.querySelectorAll('[data-section-id]'));
        if (allWithId.length > 0) {
          console.log('[DotNav Debug] Found elements but validation failed:', 
            allWithId.map(el => ({
              id: el.getAttribute('data-section-id'),
              title: el.getAttribute('data-section-title'),
              hasId: !!el.getAttribute('data-section-id'),
              idLength: el.getAttribute('data-section-id')?.length || 0
            }))
          );
        } else {
          console.log('[DotNav Debug] No elements with data-section-id found on service page');
        }
      }
    };

    // Try multiple times to catch dynamically loaded content
    // Use requestAnimationFrame for first attempt to ensure DOM is ready
    requestAnimationFrame(() => {
      detectSections();
    });
    // Also try immediately after a microtask
    Promise.resolve().then(() => detectSections());
    const timeoutId1 = setTimeout(detectSections, 100);
    const timeoutId2 = setTimeout(detectSections, 300);
    const timeoutId3 = setTimeout(detectSections, 600);
    const timeoutId4 = setTimeout(detectSections, 1000);
    const timeoutId5 = setTimeout(detectSections, 2000);
    
    // Also listen for DOM changes
    const observer = new MutationObserver(() => {
      detectSections();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      clearTimeout(timeoutId4);
      clearTimeout(timeoutId5);
      observer.disconnect();
    };
  }, [isServicePage, isBlogPage, pathname]);

  useEffect(() => {
    // Early return if blog page - don't set up observer
    if (isBlogPage) {
      return;
    }
    
    // Wait for dynamic sections on service pages
    if (isServicePage && dynamicSections.length === 0) {
      return;
    }
    
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
  }, [isBlogPage, isServicePage, sections, dynamicSections]);

  // Monitor hero section visibility
  useEffect(() => {
    if (isBlogPage) {
      return;
    }

    let heroObserver: IntersectionObserver | null = null;

    const checkHero = () => {
      const heroSection = document.getElementById('hero');
      if (!heroSection) {
        // If no hero section, assume we're past it
        setIsHeroVisible(false);
        return;
      }

      // Check initial state - if hero is at top of page, it's visible
      const rect = heroSection.getBoundingClientRect();
      const isInitiallyVisible = rect.top >= 0 && rect.top < window.innerHeight;
      setIsHeroVisible(isInitiallyVisible);

      heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hero is visible when it intersects with viewport
            // We hide dots when hero is visible (user hasn't scrolled past it yet)
            setIsHeroVisible(entry.isIntersecting);
          });
        },
        { 
          rootMargin: '0px 0px -80% 0px', // Trigger when hero is less than 80% visible (more aggressive)
          threshold: [0, 0.1, 0.5, 1] // Multiple thresholds for better detection
        }
      );

      heroObserver.observe(heroSection);
    };

    // Try immediately
    checkHero();
    
    // Also try after delays to catch dynamically loaded content
    const timeoutId1 = setTimeout(checkHero, 100);
    const timeoutId2 = setTimeout(checkHero, 300);

    return () => {
      if (heroObserver) {
        heroObserver.disconnect();
      }
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [isBlogPage, pathname]);

  // Monitor footer visibility
  useEffect(() => {
    if (isBlogPage) {
      return;
    }

    const footer = document.querySelector('footer');
    if (!footer) {
      return;
    }

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Footer is visible when it intersects with viewport
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { 
        rootMargin: '-20% 0px 0px 0px', // Trigger when footer is 20% from bottom
        threshold: 0.1 
      }
    );

    footerObserver.observe(footer);

    return () => {
      footerObserver.disconnect();
    };
  }, [isBlogPage, pathname]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  // If activeIndex is -1 (not found), use 0 as fallback
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  const getVisibleSections = () => {
    if (sections.length === 0) return [];
    
    let start = Math.max(0, safeActiveIndex - 2);
    let end = Math.min(sections.length, safeActiveIndex + 3);

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

  // Don't render on blog pages
  if (isBlogPage) {
    return null;
  }
  
  // Hide dots when hero section is still visible (user hasn't scrolled to first H2 yet)
  if (isHeroVisible) {
    return null;
  }
  
  // Hide dots when footer is visible
  if (isFooterVisible) {
    return null;
  }
  
  // For homepage, always use static sections (excluding hero and footer)
  if (!isServicePage) {
    // Filter out hero and footer from static sections
    const homeSections = staticSections.filter(s => {
      const idLower = s.id.toLowerCase();
      return idLower !== 'hero' && !idLower.includes('footer');
    });
    
    if (homeSections.length === 0) {
      return null;
    }
    
    // If activeSection is 'hero', set it to first available section
    const effectiveActiveSection = activeSection === 'hero' ? homeSections[0].id : activeSection;
    const homeActiveIndex = homeSections.findIndex((s) => s.id === effectiveActiveSection);
    const safeHomeActiveIndex = homeActiveIndex >= 0 ? homeActiveIndex : 0;
    
    const homeVisibleSections = (() => {
      let start = Math.max(0, safeHomeActiveIndex - 2);
      let end = Math.min(homeSections.length, safeHomeActiveIndex + 3);
      if (end - start < 5) {
        if (start === 0) {
          end = Math.min(homeSections.length, 5);
        } else {
          start = Math.max(0, homeSections.length - 5);
        }
      }
      return homeSections.slice(start, end);
    })();

    if (homeVisibleSections.length === 0) {
      return null;
    }

    return (
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:block" style={{ pointerEvents: 'auto' }}>
        <ul className="flex flex-col items-end space-y-4">
          {homeVisibleSections.map((section) => {
            const sectionIndexInVisible = homeVisibleSections.findIndex(s => s.id === section.id);
            const activeIndexInVisible = homeVisibleSections.findIndex(s => s.id === effectiveActiveSection);
            const distance = Math.abs(sectionIndexInVisible - activeIndexInVisible);

            let scale = 'scale-75';
            let opacity = 'opacity-60';
            let bgColor = 'bg-gray-400';

            if (distance === 0) {
              scale = 'scale-125';
              opacity = 'opacity-100';
              bgColor = 'bg-indigo-500';
            } else if (distance === 1) {
              scale = 'scale-100';
              opacity = 'opacity-80';
              bgColor = 'bg-gray-300';
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${bgColor} ${scale} ${opacity} group-hover:!bg-indigo-400 group-hover:!opacity-100 border border-gray-300 dark:border-gray-600 shadow-sm`}
                  style={{ minWidth: '12px', minHeight: '12px' }}
                  aria-label={isEs ? `Ir a la sección ${section.title}` : isDe ? `Zur Sektion ${section.title} springen` : isRu ? `Перейти к секции ${section.title}` : `Go to ${section.title} section`}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
  
  // For service pages, render when we have sections
  if (isServicePage) {
    // If we have no sections yet, don't render (but detection is still running)
    if (sections.length === 0) {
      return null;
    }
    
    // Always render if we have sections, even if visibleSections is empty
    // This handles edge cases where activeIndex calculation might fail
    const sectionsToRender = visibleSections.length > 0 ? visibleSections : sections.slice(0, Math.min(5, sections.length));
    
    if (sectionsToRender.length === 0) {
      return null;
    }
    
    return (
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:block" style={{ pointerEvents: 'auto' }}>
        <ul className="flex flex-col items-end space-y-4">
          {sectionsToRender.map((section) => {
            const sectionIndexInVisible = sectionsToRender.findIndex(s => s.id === section.id);
            const activeIndexInVisible = sectionsToRender.findIndex(s => s.id === activeSection);
            const distance = Math.abs(sectionIndexInVisible - activeIndexInVisible);

            let scale = 'scale-75';
            let opacity = 'opacity-60';
            let bgColor = 'bg-gray-400';

            if (distance === 0) { // Active
              scale = 'scale-125';
              opacity = 'opacity-100';
              bgColor = 'bg-indigo-500';
            } else if (distance === 1) { // Neighbors
              scale = 'scale-100';
              opacity = 'opacity-80';
              bgColor = 'bg-gray-300';
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${bgColor} ${scale} ${opacity} group-hover:!bg-indigo-400 group-hover:!opacity-100 border border-gray-300 dark:border-gray-600 shadow-sm`}
                  style={{ minWidth: '12px', minHeight: '12px' }}
                  aria-label={isEs ? `Ir a la sección ${section.title}` : isDe ? `Zur Sektion ${section.title} springen` : isRu ? `Перейти к секции ${section.title}` : `Go to ${section.title} section`}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:block" style={{ pointerEvents: 'auto' }}>
      <ul className="flex flex-col items-end space-y-4">
        {visibleSections.map((section) => {
          const sectionIndexInVisible = visibleSections.findIndex(s => s.id === section.id);
          const activeIndexInVisible = visibleSections.findIndex(s => s.id === activeSection);
          const distance = Math.abs(sectionIndexInVisible - activeIndexInVisible);

          let scale = 'scale-75';
          let opacity = 'opacity-60';
          let bgColor = 'bg-gray-400';

          if (distance === 0) { // Active
            scale = 'scale-125';
            opacity = 'opacity-100';
            bgColor = 'bg-indigo-500';
          } else if (distance === 1) { // Neighbors
            scale = 'scale-100';
            opacity = 'opacity-80';
            bgColor = 'bg-gray-300';
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
