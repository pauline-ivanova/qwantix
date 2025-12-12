# ✅ Implementation Checklist — Qwantix Agency

> **Last Updated:** 2025-01-31  
> **Status:** 🟡 In Progress  
> **Based on:** Website Roadmap.md

Этот документ отслеживает прогресс внедрения функций из roadmap. Отмечайте статус каждой задачи по мере реализации.

---

## 🧱 Core Architecture

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| App Router + ISR/Edge rendering | 🔺 High | ✅ Done | Уже используется App Router |
| Fetch wrapper (timeout/retry/backoff) | 🔺 High | ⬜ Not Started | Создать `/lib/fetcher.ts` |
| Unified content schema (Zod) | 🔺 High | ⬜ Not Started | Создать `/lib/types/content.ts` с валидацией |

---

## ⚙️ Performance

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| next/font, preload, lazy loading | 🔺 High | ✅ Done | Inter font настроен |
| Image optimization (WebP/AVIF) | 🔺 High | ✅ Done | next/image используется |
| Dynamic imports for heavy components | 🔸 Medium | 🟡 Partial | Частично реализовано, можно расширить |

---

## 🧠 AI & Semantic Layer

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| AI Sitemap + ai.txt | 🔺 High | ⬜ Not Started | Создать `/public/ai.txt` и `/public/ai-sitemap.xml` |
| Conversational search | 🔺 High | ⬜ Not Started | `/api/search` с embeddings |
| Internal Knowledge Graph | 🔸 Medium | ⬜ Not Started | Визуальные связи между контентом |
| Smart FAQ / AI summaries | 🔸 Medium | ⬜ Not Started | Генерация FAQ через OpenAI API |
| AI freshness monitor | 🔸 Medium | ⬜ Not Started | Скрипт `/cron/freshness.ts` |

---

## 🎨 UX / UI

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Adaptive header + contextual CTA | 🔺 High | 🟡 Partial | Header есть, но CTA не адаптивный |
| Scroll-driven storytelling | 🔸 Medium | ⬜ Not Started | Framer Motion / Lottie анимации |
| Focus mode | 🔹 Low | ⬜ Not Started | "Режим чтения" toggle |
| Dynamic hero banners | 🔹 Low | ⬜ Not Started | Меняются по времени суток |
| Smart scroll hints / micro-interactions | 🔸 Medium | ⬜ Not Started | UI hooks + Framer Motion |

---

## 🌍 SEO & Discoverability

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| JSON-LD schema (Org, WebPage, Article, FAQ, Review) | 🔺 High | ⬜ Not Started | **КРИТИЧНО!** Создать `/components/SEO.tsx` |
| Canonical + hreflang | 🔺 High | 🟡 Partial | Нужно добавить в metadata всех страниц |
| Sitemap + AI Sitemap auto-update | 🔺 High | ⬜ Not Started | **КРИТИЧНО!** Использовать next-sitemap или кастомный |
| Content decay detector | 🔸 Medium | ⬜ Not Started | Скрипт через GSC API |
| OG image generator (Satori) | 🔸 Medium | ⬜ Not Started | `/api/og/route.ts` |

---

## 🔒 Security & Privacy

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| CSP + Permissions-Policy | 🔺 High | ⬜ Not Started | **КРИТИЧНО!** Добавить в `next.config.js` headers |
| Consent Mode v2 + CMP | 🔺 High | ⬜ Not Started | OneTrust / Cookiebot интеграция |
| Rate limiting + bot defense | 🔺 High | ⬜ Not Started | Edge middleware |
| Secrets rotation + env protection | 🔺 High | ⬜ Not Started | GitHub secrets management |
| C2PA content authenticity | 🔹 Low | ⬜ Not Started | C2PA metadata в build script |

---

## 🧭 Accessibility & Inclusivity

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| WCAG AA + aria labels | 🔺 High | 🟡 Partial | Частично реализовано, нужен аудит |
| Voice summaries (TTS) | 🔸 Medium | ⬜ Not Started | ElevenLabs / Play.ht API |
| Accessibility statement page | 🔸 Medium | ⬜ Not Started | `/accessibility` статическая страница |

---

## 🔁 DevOps / Reliability

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Build-time content validation | 🔺 High | ⬜ Not Started | **КРИТИЧНО!** Создать `/scripts/validate.ts` |
| Error boundaries / global-error.tsx | 🔺 High | ⬜ Not Started | **КРИТИЧНО!** Создать в app root |
| Edge A/B testing | 🔸 Medium | ⬜ Not Started | middleware + EdgeConfig |
| Cron revalidation | 🔸 Medium | ⬜ Not Started | Vercel Cron для ISR |

---

## 📈 Analytics & Growth

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Server-side conversion tracking | 🔺 High | ⬜ Not Started | `/api/track.ts` + GA Measurement Protocol |
| RUM CWV + Speed Insights | 🔸 Medium | ⬜ Not Started | Vercel Insights + Sentry |
| Public analytics dashboard | 🔹 Low | ⬜ Not Started | `/metrics` route |

---

## 🧩 Content Experience

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Interactive case studies | 🔺 High | 🟡 Partial | Есть карусель, можно улучшить с графиками |
| Data-backed ROI calculator | 🔸 Medium | ✅ Done | BudgetCalculator уже есть |
| Content remixing API | 🔹 Low | ⬜ Not Started | `/api/remix.ts` |
| Mini-courses / learning paths | 🔹 Low | ⬜ Not Started | Grouped MDX + progress tracking |

---

## 🌿 Ethics & Transparency

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| AI policy + Data usage statement | 🔺 High | ⬜ Not Started | `/ai-policy` страница |
| Privacy & Cookies policy | 🔺 High | ⬜ Not Started | **КРИТИЧНО!** `/privacy`, `/cookies` страницы |
| Carbon tracker | 🔸 Medium | ⬜ Not Started | `/components/CarbonMeter.tsx` |
| Transparency log / changelog | 🔹 Low | ⬜ Not Started | `/changelog` авто-генерируемая страница |

---

## 💬 Interactivity / Community

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Commenting via GitHub Issues / Giscus | 🔹 Low | ⬜ Not Started | `<Comments />` widget |
| Micro-newsletter | 🔹 Low | ⬜ Not Started | Resend API |
| Referral tracker | 🔹 Low | ⬜ Not Started | `/api/referral` + cookie |

---

## 🚀 Wow & Brand Layer

| Task | Priority | Status | Notes |
|------|----------|--------|-------|
| Interactive team bios | 🔸 Medium | ⬜ Not Started | `<TeamGrid />` компонент |
| Scrollytelling stories | 🔸 Medium | ⬜ Not Started | Lottie + Motion timeline |
| Mood / theme switcher | 🔸 Medium | ✅ Done | Dark/Light mode уже есть |
| Time capsule / Year in Review | 🔹 Low | ⬜ Not Started | `/year-in-review` route |
| Live pulse feed | 🔹 Low | ⬜ Not Started | `/api/pulse` → home feed |

---

## 📋 Implementation Phases

### ✅ Phase 1: Critical Foundation (СЕЙЧАС)

**Цель:** Базовые функции для SEO, безопасности и стабильности

- [ ] JSON-LD schema компонент (`/components/SEO.tsx`)
- [ ] Sitemap + robots.txt генерация
- [ ] Canonical + hreflang в metadata всех страниц
- [ ] Security headers в `next.config.js` (CSP, Permissions-Policy)
- [ ] Error boundaries (`app/global-error.tsx`)
- [ ] Fetch wrapper с retry/backoff (`/lib/fetcher.ts`)

**Ожидаемый результат:** Сайт готов к продакшену с базовым SEO и безопасностью

---

### 🔄 Phase 2: Quality & Validation (БЛИЖАЙШЕЕ ВРЕМЯ)

**Цель:** Контроль качества контента и валидация

- [ ] Content validation script (Zod schema)
- [ ] Build-time content validation (`/scripts/validate.ts`)
- [ ] OG image generator (Satori)
- [ ] Privacy/Cookies policy pages
- [ ] Unified content schema (`/lib/types/content.ts`)

**Ожидаемый результат:** Автоматизированный контроль качества и соответствие GDPR

---

### 🚀 Phase 3: Growth & Enhancement (ПО МЕРЕ РОСТА)

**Цель:** Продвинутые функции для роста и вовлечения

- [ ] AI Sitemap + ai.txt
- [ ] Server-side analytics tracking
- [ ] Интерактивные case studies (графики, анимации)
- [ ] Conversational search (если нужно)
- [ ] RUM CWV + Speed Insights

**Ожидаемый результат:** Продвинутые метрики и улучшенный UX

---

## 📝 Notes & Ideas

### Quick Wins
- Добавить robots.txt и sitemap.xml — это быстро и критично для SEO
- Реализовать базовый JSON-LD для Organization — улучшит видимость в поиске
- Добавить security headers — защита от базовых атак

### Technical Debt
- Улучшить типизацию контента (MDX frontmatter)
- Добавить валидацию контента на build-time
- Стандартизировать структуру metadata

### Future Considerations
- AI-powered content generation для FAQ
- Internal linking intelligence система
- Advanced analytics dashboard

---

## 🎯 Progress Tracking

**Overall Progress:** 🟡 15% Complete

- ✅ Completed: 7 tasks
- 🟡 In Progress: 4 tasks  
- ⬜ Not Started: 50+ tasks

**Next Milestone:** Завершить Phase 1 (Critical Foundation)

---

## 📚 Related Documents

- [Website Roadmap.md](./Website%20Roadmap.md) — Исходный roadmap
- [QWANTIX_MASTER TECHNICAL BRIEF_1.md](./QWANTIX_MASTER%20TECHNICAL%20BRIEF_1.md) — Техническая спецификация
- [QWANTIX_MASTER TECHNICAL BRIEF_2.md](./QWANTIX_MASTER%20TECHNICAL%20BRIEF_2.md) — Дополнительные детали

---

**💡 Tip:** Обновляйте статус задач по мере работы. Используйте поиск (Ctrl+F) для быстрого нахождения нужной задачи.
