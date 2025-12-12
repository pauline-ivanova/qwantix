# 📂 Структура Проекта QWANTIX AGENCY

Этот документ описывает согласованную структуру папок и файлов для проекта веб-сайта Qwantix Agency.

```
/
├── .vscode/               # Настройки VS Code
├── .next/                 # Кэш сборки Next.js
├── node_modules/          # Зависимости проекта
│
├── app/                   # App Router (основная директория)
│   ├── [lang]/            # Динамический роутинг для i18n (en, es, de)
│   │   ├── (main)/        # Группа роутов с общим лейаутом (header/footer)
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   │   └── [slug]/
│   │   │   ├── contact/
│   │   │   ├── projects/
│   │   │   │   └── [slug]/
│   │   │   ├── services/
│   │   │   │   └── [slug]/
│   │   │   └── page.tsx   # Главная страница (/)
│   │   │
│   │   ├── (legal)/       # Группа роутов для юридических страниц
│   │   │   ├── cookies/
│   │   │   ├── privacy/
│   │   │   └── terms/
│   │   │
│   │   ├── admin/         # Защищенная админ-панель
│   │   ├── layout.tsx     # Корневой лейаут для каждого языка
│   │   └── not-found.tsx  # Страница 404
│   │
│   ├── api/               # API роуты (например, для формы контактов)
│   │   └── contact/
│   │       └── route.ts
│   │
│   ├── sitemap.xml/       # Динамическая генерация sitemap
│   │   └── route.ts
│   │
│   ├── globals.css        # Глобальные стили Tailwind
│   └── layout.tsx         # Самый корневой лейаут (шрифты, метаданные)
│
├── components/            # Переиспользуемые React-компоненты
│   ├── ui/                # Базовые UI-компоненты (shadcn/ui: Button, Card)
│   ├── blocks/            # Крупные блоки страниц (Hero, Stats, ContactForm)
│   ├── layout/            # Компоненты разметки (Header, Footer, Breadcrumbs)
│   └── icons/             # Иконки (Lucide)
│
├── content/               # Хранилище всего MDX контента
│   ├── blog/
│   ├── projects/
│   └── services/
│
├── lib/                   # Вспомогательные функции и утилиты
│   ├── mdx.ts             # Логика для парсинга MDX
│   ├── i18n.ts            # Конфигурация интернационализации
│   ├── utils.ts           # Общие утилиты
│   ├── seo.ts             # SEO-хелперы
│   └── types.ts           # Глобальные TypeScript-типы
│
├── public/                # Статические ассеты
│   ├── images/
│   └── fonts/
│
├── config/                # Файлы конфигурации проекта
│   └── site.ts            # Метаданные сайта (имя, URL, SEO по умолчанию)
│
├── .eslintrc.json         # Конфигурация ESLint
├── .gitignore
├── next.config.mjs        # Конфигурация Next.js
├── package.json
├── postcss.config.js      # Конфигурация PostCSS (для Tailwind)
├── tailwind.config.ts     # Конфигурация Tailwind CSS
└── tsconfig.json          # Конфигурация TypeScript
```

### Пояснения

*   **`app/[lang]/`**: Реализация локализованного роутинга (`/en/services`, `/es/servicios`).
*   **`app/(main)` и `app/(legal)`**: Группы роутов для применения разных лейаутов к разным секциям сайта без изменения URL.
*   **`components/`**: Разделение на `ui` (атомы), `blocks` (молекулы/организмы) и `layout` (шаблоны) следует принципам атомарного дизайна.
*   **`content/`**: Выделенная директория для MDX-файлов для удобства управления контентом.
*   **`lib/`**: Централизованное место для всей переиспользуемой бизнес-логики.
