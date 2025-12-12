# 📘 QWANTIX AGENCY — MASTER TECHNICAL BRIEF

### (Part 1 — Core Specification, ready for Cursor)

> *EN is primary technical language. RU comments added for clarity during build phase.*

---

## 1️⃣ Project Overview

**Project name:** Qwantix Agency Website
**Goal:** Convert B2B audience through case-driven SEO service positioning.
**Primary CTA:** “Book a Strategy Call”

**Target audience:**

* Business owners, marketing managers, founders
* EU/UK markets focus

**Primary success metrics (KPI):**

* Form submissions (Strategy Call)
* Case Study depth & engagement
* Navigation to Contact page

---

## 2️⃣ Tech Stack Requirements

* **Next.js (App Router)**
* **TypeScript strict mode**
* **TailwindCSS**
* **shadcn/ui** + **Radix UI**
* **Vercel deployment**
* **ESLint + Prettier**
* **No WordPress / No CMS**
* **MDX-based content system**
* **GitHub + CI/CD**

💡 RU note: максимально простой билд-процесс и контроль качества.

---

## 3️⃣ UX Structure (Information Architecture)

**Pages (Routes):**

```
/ (Home)
/services
/services/[slug]
/projects
/projects/[slug]
/blog
/blog/[slug]
/about
/contact
/admin       # protected
/legal/privacy
/legal/cookies
/legal/terms
/not-found
```

✅ Only **one CTA** per page type
✅ Clear **SEO > Case > Contact** funnel
✅ Breadcrumbs everywhere except homepage

---

## 4️⃣ Internationalization (i18n)

Languages: **EN + ES + DE**
Requirements:

* Localized routing
* `hreflang` + `x-default`
* Localized OG titles/descriptions
* Localized schema

```
/en
/es
/de
```

🔒 RU: Если язык недоступен → fallback EN

---

## 5️⃣ Content Storage and Models (MDX)

All content = MDX with frontmatter.
**Three models: Services, Projects, Blog.**

### Service frontmatter:

```md
---
title: "Technical SEO Audits"
slug: "technical-seo"
category: "SEO"
description: "Fix technical blockers…"
lang: "en"
deliverables: ["Audit", "CWV", "Schema"]
---
```

### Project frontmatter:

```md
---
title: "Harley Ultrasound — SEO Recovery"
slug: "harley-ultrasound"
category: "SEO"
market: "UK"
lang: "en"
metrics:
  rank_before: 23
  rank_after: 3
  leads_growth_pct: 180
---
```

🧠 RU: структура позволяет auto-internal linking & analytics

---

## 6️⃣ Brand Color Architecture

**Category-based theme:**

| Category            | Primary color |
| ------------------- | ------------- |
| SEO                 | #635bff       |
| Content/Copywriting | #19c9c9       |
| PPC                 | #ff629c       |
| SMM                 | #ff8319       |
| General / Agency    | #0a2540       |

✅ “**Category Immersion Mode**”:
Inside category pages → **use that category primary**
Other services: neutral styling

✅ White backgrounds
✅ Pill-rounded CTAs
✅ Soft, premium UI

---

## 7️⃣ Design System Standards

* Accessible **WCAG AA contrast**
* Visual consistency via design tokens
* Reusable UI blocks (Atomic Design):

  * Buttons, Cards, Hero, Stats, TOC, Contact Form

Layout rules:

* Max width: 1200px
* Section padding: 96–120px desktop
* Line length: 65–75 chars

---

## 8️⃣ SEO System (Rank Math Replacement)

✅ Managed by **next-seo**
✅ Auto-title patterns
✅ Canonical rules
✅ Dynamic Open Graph
✅ Multi-sitemap with split:

```
/sitemap-services.xml
/sitemap-projects.xml
/sitemap-blog.xml
```

✅ JSON-LD everywhere:

* Organization (+ contactPoint, address placeholder)
* Service
* Article (Projects + Blog)
* BreadcrumbList
* FAQPage (where relevant)

💡 RU: реализуем E-E-A-T через сущности + internal graph

---

## 9️⃣ Internal Linking Intelligence (Link Whisper Replacement)

* Auto-suggest internal links on MDX build
* **Dashboard for orphan pages**
* Anchor-text policy enforcement
* Auto 301 redirects when slug changes
* Min internal links per page:

  * Service → 3
  * Project → 3
  * Blog → 2

✅ Auto linkage via category
✅ Link check on build

---

## 🔟 Performance & Core Web Vitals

**Minimum thresholds:**

| Metric           | Requirement        |
| ---------------- | ------------------ |
| LCP              | ≤ 2.5s             |
| CLS              | ≤ 0.1              |
| Lighthouse Score | 95+ all categories |

Technical:

* Smart hydration + dynamic import
* next/image with WebP/AVIF + LQIP blur
* Prefetch user path prediction
* Edge caching strategy by route

---

## 1️⃣1️⃣ Security & Privacy

* CSP strict
* HSTS
* Permissions Policy
* Turnstile/hCaptcha for forms
* Rate limiting
* International GDPR compliance
* Cookie banner (consent-based analytics)

---

## 1️⃣2️⃣ Admin System

Route: `/admin`
Protection: JWT + IP whitelist

Capabilities:

* CRUD for MDX content
* Preview before publish
* WebP conversion
* Feature flags interface
* SEO audits & link suggestions dashboard

---

## 1️⃣3️⃣ Analytics

* GA4 + conversion events
* Web Vitals logging
* Form tracking
* Error logging (Sentry compatible)

---

## 1️⃣4️⃣ QA Automation (CI/CD)

* Lighthouse CI blocking <95
* SEO checks on build
* Broken link checker on build
* Markdown linter
* Visual regression testing

---

## 1️⃣5️⃣ Contact & Tracking

**Primary CTA → Book a Strategy Call**
Forms:

* Contact API (serverless)
* Error, spam detection logging

---

## ✅ Acceptance Criteria (Definition of Done)

When delivered:

* 0 console errors
* Lighthouse ≥95 everywhere
* All content validated
* No internal 404 links
* Sitemap valid and complete
* i18n routes + hreflang operational
* Internal link system active
* Contact form fully functional
* Category Immersion working

---

# 🟦 END OF PART 1

📌 Part 2 → Data tables, schemas, tokens, workflows, admin UI specifics, dashboards, A/B test scaffolding.

---

### ❗Что делать сейчас?

📥 **Скопируй Part 1 в Cursor**
и скажи:

> ✅ Part 1 loaded.
> Continue with Part 2 when ready.

Когда хочешь — я пришлю **Part 2** → полностью завершит ТЗ ✅

---

Если захочешь — могу также:

✨ Добавить **авто-генерацию OG-images**
✨ Создать **roadmap** разработки и миграций
✨ Начать **генерацию проекта прямо в Cursor**

---
