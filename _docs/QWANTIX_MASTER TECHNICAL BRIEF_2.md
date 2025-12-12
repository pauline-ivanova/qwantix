# 📘 QWANTIX AGENCY — MASTER TECHNICAL BRIEF

### (Part 2 — Appendices and Implementation Guides)

---

## 📌 Appendix A — Brand Design Tokens

```ts
// tokens/colors.ts
export const colors = {
  seo: {
    primary: "#635bff",
  },
  content: {
    primary: "#19c9c9",
  },
  ppc: {
    primary: "#ff629c",
  },
  smm: {
    primary: "#ff8319",
  },
  general: {
    primary: "#0a2540",
  },
  neutral: {
    white: "#ffffff",
    black: "#0b0f19",
    light: "#f5f7fb",
  },
};
```

Spacing tokens:

```ts
export const spacing = {
  section: "96px",
  sectionLg: "120px",
};
```

Typography:

```css
--font-body: Inter, sans-serif;
--font-heading: Inter, sans-serif;
```

---

## 📌 Appendix B — Category Immersion Logic

```ts
// lib/category.ts
export function getCategoryTheme(category: string) {
  return colors[category.toLowerCase()] || colors.general;
}
```

Usage:

* Hero background accent
* CTA primary color
* Active nav link
* Category badge
* Scroll progress bar

✅ Other service categories show *neutral* UI until user switches context.

---

## 📌 Appendix C — Admin Panel Requirements

Route: `/admin`

Authentication:

* JWT + refresh
* Optional IP whitelist

Features:

* Content Manager (MDX CRUD)
* Internal links suggestions + “orphan” pages report
* Version control (history)
* SEO warnings per page
* Feature flags UI
* Upload manager w/ WebP
* Quick preview mode

Permissions:

* **Only Owner** can access for MVP

---

## 📌 Appendix D — SEO Implementation Playbook

### ✅ OpenGraph defaults

* og:image per page (generated)
* og:locale per language
* `twitter:card` = summary_large_image

### ✅ Indexability rules

Frontmatter flags:

```md
index: false
```

→ set robots=`noindex, nofollow`

### ✅ Crawl-budget control

* Paginated blog pages `noindex`
* Auto-redirect old slugs → canonical target

### ✅ Entity-based schema linking

Cross-link:

* Service ↔ Case
* Case ↔ Tool (Ahrefs, GSC) — Mention relationship
* Organization ↔ ContactPoint ↔ Language regions

---

## 📌 Appendix E — Internal Linking Intelligence

### Data structure:

```ts
{
  target: "/services/technical-seo",
  keywords: ["technical seo", "site audit", "CWV"],
  minInbound: 3
}
```

### Build process:

1. MDX scanner finds matching anchors
2. Suggest or auto-insert links
3. Dashboard displays pages with low inbound links
4. Link-check on build (no internal 404)

✅ Critical for SEO authority distribution

---

## 📌 Appendix F — Performance

* `next/image` with `sizes` attribute
* preload critical assets
* dynamic import for charts
* no layout shift animations
* video lazy-load (if present)

**Metrics enforcement** via CI:

```json
"lighthouse": {
  "performance": 95,
  "accessibility": 95,
  "seo": 95,
  "best-practices": 95
}
```

---

## 📌 Appendix G — Security Configuration

Headers:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

CSP:

* script-src strict with nonce
* disallow external if not whitelisted

Forms:

* Bot detection: Turnstile / hCaptcha
* Rate-limit serverless API

---

## 📌 Appendix H — Analytics & DX

Tracking events:

* CTA Click → `strategy_call_click`
* Contact form success → `lead_submitted`
* Scroll depth → `content_engaged`
* Navigation between services → `category_interest`

Web Vitals logging via:

```ts
export function reportWebVitals(metric) { ... }
```

---

## 📌 Appendix I — Sitemap & Robots

Sitemap:

* Generated per locale
* Split by content type

Robots:

```
Allow: /
Disallow: /*?*
Disallow: /tags/
```

---

## 📌 Appendix J — Dashboard Widgets

* Inbound Link Score per page
* Cases with missing KPIs
* Blog posts missing TOC
* Service pages missing CTA above fold
* Preview “How Google sees this page” (no CSS/JS)

💡 RU: Это killer-proof для твоего агентства — очевидная польза для клиентов.

---

## 📌 Appendix K — Visual Content Rules

* Max 200kb per hero image
* SVG optimization required (`svgo`)
* Icons via Lucide

Fallbacks:

* no-JS → plain `<img>` and `<form>`

---

## 📌 Appendix L — Accepted Deliverables

**Production-ready** website must include:
✅ EN/ES/DE switch
✅ Admin Panel
✅ Internal Linking Engine
✅ OG-image generation working
✅ All schemas valid (Rich Results Test)
✅ No broken links
✅ Category Immersion polished
✅ No console errors in browser
✅ LIVE “Book a Strategy Call” form

---

## 📌 Appendix M — MVP Roadmap

Stage 1 — Foundation
✅ Home / Services / Projects / Contact
✅ SEO / Performance / Security
✅ Admin basics

Stage 2 — Growth
✅ Blog
✅ Dashboard reports
✅ Content Intelligence

Stage 3 — Automation
✅ Auto OG-image
✅ A/B tests activation
✅ CRM-lite flows

---
