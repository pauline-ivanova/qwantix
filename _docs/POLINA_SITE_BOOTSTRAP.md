# ✳️ Polina Consulting — Bootstrap Playbook

> **Purpose**: give Cursor (or any operator) a deterministic list of actions for cloning `qwantix-agency` into the new project `polina-consulting` while keeping shared foundations (layout, i18n, infra) and stripping Qwantix-specific content.
> **Assumes**: you work on this same machine (`C:\Users\anato\Documents\PROJECTS`) and have access to the original repo.

---

## 0. Quick Answer — Can Cursor follow this checklist automatically?

- Yes. Create a fresh Cursor workspace for `polina-consulting`, add this file to the workspace root (or link to it via `cursor.json`), and instruct Cursor to execute the steps in order.
- Confirm after each major section that the commands ran successfully; Cursor may need nudge when prompts require manual choices (e.g., git remote rename).
- Whenever a server is launched, explicitly ask to stop any running servers first, per house rules.

---

## 1. Prerequisites

- **Source repo**: `C:\Users\anato\Documents\PROJECTS\qwantix-agency`
- **Target root**: `C:\Users\anato\Documents\PROJECTS\polina-consulting`
- **Node / PNPM versions**: reuse the versions already defined in the `qwantix-agency` repo (`.nvmrc`, `package.json` engines). Install globally if missing.
- **Domain prep**: make sure DNS for `polina.consulting` will point to the new deployment platform (Vercel recommended).
- **Secrets**: prepare new `.env.local` (copy the template, but populate new analytics keys, emails, etc.). Never overwrite existing `.env` files without confirmation.

---

## 2. Create the New Repo Snapshot

1. Ensure no dev servers are running (`pnpm dev`, etc.). If any are, terminate them.
2. Duplicate the directory:
   - Option A (fast copy):
     ```powershell
     robocopy "C:\Users\anato\Documents\PROJECTS\qwantix-agency" "C:\Users\anato\Documents\PROJECTS\polina-consulting" /MIR /XD .git node_modules .turbo .next
     ```
   - Option B (git clone mirror):
     ```powershell
     cd C:\Users\anato\Documents\PROJECTS
     git clone --origin upstream "C:\Users\anato\Documents\PROJECTS\qwantix-agency" polina-consulting
     ```
3. If you used the robocopy method, initialize git afterwards:
   ```powershell
   cd C:\Users\anato\Documents\PROJECTS\polina-consulting
   git init
   git remote add upstream ..\qwantix-agency
   ```
4. Add a new origin remote (GitHub or other):
   ```powershell
   git remote add origin <your-new-remote-url>
   ```
5. Install dependencies:
   ```powershell
   pnpm install
   ```

---

## 3. Strip Qwantix Branding & Content

> **Goal**: keep layout/i18n/infra, remove brand-specific assets.

- **Images & logos**: replace files under `public/` (logos, favicons, social images). Start by deleting Qwantix logos to avoid accidental reuse.
- **Copy**: sweep `content/`, `dictionaries/`, and `app/[lang]/**/*.mdx|tsx` for Qwantix wording. Replace with Polina Consulting messaging.
- **Metadata**: update `app/layout.tsx`, any `metadata` exports, and `next-sitemap.config.js` to reference `polina.consulting`.
- **Env references**: duplicate `.env.example` into `.env.local` with Polina-specific keys.
- **Analytics / integrations**: remove GA IDs, HubSpot tokens, etc., replacing with placeholders until you have new credentials.

---

## 4. Refresh Configurations

- `next.config.js`: adjust `images.domains`, rewrites, or redirects that mention Qwantix.
- `package.json`: rename project fields (`name`, `description`, `author`).
- `README.md`: rewrite intro and getting-started sections for Polina.
- check `public/locales/*` for translation keys; update top-level brand name.
- search for `Qwantix` string via `rg "Qwantix" -n` and address remaining references.

---

## 5. Reusable Blocks Checklist

- ✅ Keep: `app/components/Header.tsx`, `Footer.tsx`, shared layout wrappers, `i18n` utilities, fetcher libs, SEO helpers, block scaffolds (IndustrySolutions, CTA, CaseStudies) as structural templates.
- 🔄 Adapt: block props, copy, images, CTA URLs to match Polina.
- 🗑️ Remove: case-study data or client names that cannot be repurposed. Replace with Polina portfolio or hide the block until ready.
- 🧩 Optional: if a block is too coupled to Qwantix, move it into `components/legacy/` and rebuild a leaner variant for Polina.

---

## 6. Testing & Validation

- Run linters/tests:
  ```powershell
  pnpm lint
  pnpm test
  pnpm typecheck
  ```
- Start dev server (after verifying no other servers are running):
  ```powershell
  pnpm dev
  ```
- Verify locales (`/en`, `/ru`, etc.), nav links, metadata, and contact forms.
- Stop the dev server once checks are done.

---

## 7. Deployment Prep

- Configure new project in Vercel (or platform of choice) with the `polina-consulting` repo.
- Set environment variables through the hosting dashboard (never commit secrets).
- Update DNS to point `polina.consulting`  ➜ hosting provider once preview builds are stable.
- Ensure `robots.txt`, `sitemap.xml`, `ai.txt` reference the new domain.

---

## 8. Optional Enhancements

- Extract reusable modules (e.g., typography system, block registry) into a private package if you expect more sister sites.
- Document brand-specific content strategy in `_docs/PolinaContentPlan.md` to keep Qwantix and Polina narratives separated.
- Schedule recurring audits to keep both codebases in sync for shared infrastructure updates (security patches, dependency bumps).

---

## 9. Using This Playbook with Cursor

- Place this file in the root of the new Cursor workspace and pin it in the session.
- Start by telling Cursor: “Follow `_docs/POLINA_SITE_BOOTSTRAP.md` step by step. Confirm after each section.”
- Monitor outputs: Cursor may need manual approvals for file deletions/additions or environment variable setup.
- Keep terminal sessions tidy: remind Cursor to kill any running processes before starting new ones, in line with the house rules.

---

## 10. Completion Criteria

- `pnpm build` succeeds locally.
- All `Qwantix` references are removed or intentionally retained with justification.
- Brand assets and metadata represent Polina Consulting.
- Repo is pushed to its new remote and first deployment (preview) is live.


