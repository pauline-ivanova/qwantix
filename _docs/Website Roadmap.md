## 🧩 **Full Strategic & Technical Roadmap — Next.js + Vercel**

| **Layer / Block**                  | **Feature / Idea**                                  | **Purpose & Effect**                          | **Implementation Zone (Cursor hint)**     | **Priority** |
| ---------------------------------- | --------------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------ |
| 🧱 **Core Architecture**           | App Router + ISR/Edge rendering                     | Быстрая загрузка и актуальность данных        | App Router structure, `revalidateTag()`   | 🔺 High      |
|                                    | Fetch wrapper (timeout/retry/backoff)               | Защита от API-сбоев                           | `/lib/fetcher.ts`                         | 🔺 High      |
|                                    | Unified content schema (Zod)                        | Типобезопасность и стабильность данных        | `/lib/types/content.ts`                   | 🔺 High      |
| ⚙️ **Performance**                 | next/font, preload, lazy loading                    | Ускоряет загрузку и CWV                       | `_app.tsx`, Metadata API                  | 🔺 High      |
|                                    | Image optimization (WebP/AVIF)                      | Меньше вес, выше LCP                          | `<Image>` + config in `next.config.js`    | 🔺 High      |
|                                    | Dynamic imports for heavy components                | Сокращение bundle size                        | `next/dynamic`                            | 🔸 Medium    |
| 🧠 **AI & Semantic Layer**         | AI Sitemap + ai.txt                                 | Контроль доступа LLM                          | Root static files                         | 🔺 High      |
|                                    | Conversational search                               | Семантический поиск по смыслу                 | `/api/search`, embeddings store           | 🔺 High      |
|                                    | Internal Knowledge Graph                            | Визуальные связи между контентом              | `/lib/graph.ts`, GraphView component      | 🔸 Medium    |
|                                    | Smart FAQ / AI summaries                            | FAQ и TL;DR на базе контента                  | build script with OpenAI API              | 🔸 Medium    |
|                                    | AI freshness monitor                                | Отслеживание устаревших статей                | `/cron/freshness.ts`                      | 🔸 Medium    |
| 🎨 **UX / UI**                     | Adaptive header + contextual CTA                    | Меняется под сценарий пользователя            | `usePathname()`, conditional CTA          | 🔺 High      |
|                                    | Scroll-driven storytelling                          | Анимированный контент при скролле             | Framer Motion / Lottie                    | 🔸 Medium    |
|                                    | Focus mode                                          | “Режим чтения” без отвлечений                 | toggle class `focus-mode`                 | 🔹 Low       |
|                                    | Dynamic hero banners                                | Меняются по времени суток                     | Edge middleware + props                   | 🔹 Low       |
|                                    | Smart scroll hints / micro-interactions             | Повышают вовлечённость                        | small UI hooks + Framer Motion            | 🔸 Medium    |
| 🌍 **SEO & Discoverability**       | JSON-LD schema (Org, WebPage, Article, FAQ, Review) | Расширенные сниппеты и entity SEO             | `/components/SEO.tsx`                     | 🔺 High      |
|                                    | Canonical + hreflang                                | Корректная индексация мультиязычного контента | Metadata API                              | 🔺 High      |
|                                    | Sitemap + AI Sitemap auto-update                    | Автообновление карт сайта                     | next-sitemap + cron                       | 🔺 High      |
|                                    | Content decay detector                              | Определяет стареющий контент                  | Script via GSC API                        | 🔸 Medium    |
|                                    | OG image generator (Satori)                         | Динамические соц-превью                       | `/api/og/route.ts`                        | 🔸 Medium    |
| 🔒 **Security & Privacy**          | CSP + Permissions-Policy                            | XSS/Clickjacking защита                       | `next.config.js` headers                  | 🔺 High      |
|                                    | Consent Mode v2 + CMP                               | Cookie compliance                             | OneTrust / Cookiebot                      | 🔺 High      |
|                                    | Rate limiting + bot defense                         | API защита                                    | Edge middleware                           | 🔺 High      |
|                                    | Secrets rotation + env protection                   | Безопасность ключей                           | `.env` management + GitHub secrets        | 🔺 High      |
|                                    | C2PA content authenticity                           | Авторство и доверие                           | build script (C2PA metadata)              | 🔹 Low       |
| 🧭 **Accessibility & Inclusivity** | WCAG AA + aria labels                               | Доступность интерфейса                        | eslint-plugin-jsx-a11y                    | 🔺 High      |
|                                    | Voice summaries (TTS)                               | Аудиоверсии статей                            | ElevenLabs / Play.ht API                  | 🔸 Medium    |
|                                    | Accessibility statement page                        | Юридическое и этическое требование            | `/accessibility` static page              | 🔸 Medium    |
| 🔁 **DevOps / Reliability**        | Build-time content validation                       | Проверка alt, meta, schema                    | `/scripts/validate.ts` + CI               | 🔺 High      |
|                                    | Error boundaries / global-error.tsx                 | Безопасная обработка ошибок                   | app root                                  | 🔺 High      |
|                                    | Edge A/B testing                                    | UX эксперименты без JS                        | middleware + EdgeConfig                   | 🔸 Medium    |
|                                    | Cron revalidation                                   | Автообновление ISR                            | Vercel Cron                               | 🔸 Medium    |
| 📈 **Analytics & Growth**          | Server-side conversion tracking                     | Данные без блокировок                         | `/api/track.ts` + GA Measurement Protocol | 🔺 High      |
|                                    | RUM CWV + Speed Insights                            | Реальные метрики                              | Vercel Insights + Sentry                  | 🔸 Medium    |
|                                    | Public analytics dashboard                          | Прозрачность и доверие                        | `/metrics` route                          | 🔹 Low       |
| 🧩 **Content Experience**          | Interactive case studies                            | Challenge → Action → Results + графики        | `<CaseStudy />` component                 | 🔺 High      |
|                                    | Data-backed ROI calculator                          | Подсчёт выгоды клиента                        | `<Calculator />` + Edge compute           | 🔸 Medium    |
|                                    | Content remixing API                                | Собрать свой дайджест                         | `/api/remix.ts`                           | 🔹 Low       |
|                                    | Mini-courses / learning paths                       | Микрообучение и удержание                     | grouped MDX + progress tracking           | 🔹 Low       |
| 🌿 **Ethics & Transparency**       | AI policy + Data usage statement                    | Прозрачность использования данных             | `/ai-policy` page                         | 🔺 High      |
|                                    | Privacy & Cookies policy                            | Юридическое соответствие                      | `/privacy`, `/cookies`                    | 🔺 High      |
|                                    | Carbon tracker                                      | Показ ESG-футпринта                           | `/components/CarbonMeter.tsx`             | 🔸 Medium    |
|                                    | Transparency log / changelog                        | История обновлений сайта                      | `/changelog` auto-generated page          | 🔹 Low       |
| 💬 **Interactivity / Community**   | Commenting via GitHub Issues / Giscus               | Участие пользователей                         | `<Comments />` widget                     | 🔹 Low       |
|                                    | Micro-newsletter                                    | Автоподписка на апдейты                       | Resend API                                | 🔹 Low       |
|                                    | Referral tracker                                    | Отслеживание приглашений                      | `/api/referral` + cookie                  | 🔹 Low       |
| 🚀 **Wow & Brand Layer**           | Interactive team bios                               | Анимированные карточки команды                | `<TeamGrid />`                            | 🔸 Medium    |
|                                    | Scrollytelling stories                              | Эффект живого повествования                   | Lottie + Motion timeline                  | 🔸 Medium    |
|                                    | Mood / theme switcher                               | Темы “Calm / Bold / Elegant”                  | `next-themes` with presets                | 🔸 Medium    |
|                                    | Time capsule / Year in Review                       | Годовой отчёт с графиками                     | `/year-in-review` route                   | 🔹 Low       |
|                                    | Live pulse feed                                     | Последние обновления в реальном времени       | `/api/pulse` → home feed                  | 🔹 Low       |

---

### 📁 **Recommended Folder Structure for Cursor**

```
/app
  /(marketing)
  /(blog)
  /(case-studies)
  /metrics
  /year-in-review
/api
  /search
  /remix
  /track
  /og
  /referral
  /pulse
/cron
  /freshness.ts
  /revalidate.ts
/lib
  /ai/
  /seo/
  /graph/
  /types/
  /fetcher.ts
/components
  /ui/
  /SEO.tsx
  /CaseStudy.tsx
  /CarbonMeter.tsx
  /TeamGrid.tsx
/scripts
  /validate.ts
/public
  /ai.txt
  /robots.txt
  /ai-sitemap.xml
```