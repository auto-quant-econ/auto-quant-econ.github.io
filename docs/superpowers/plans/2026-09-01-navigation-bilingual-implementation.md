# Navigation and Bilingual Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the split top/left navigation with one collapsible left hierarchy and publish complete English and Chinese versions of every existing page.

**Architecture:** Locale-prefixed routes read matching MDX documents from `content/en` and `content/zh`. Shared stable IDs and a parity validator guarantee that navigation, module menus, model maps, and references remain identical across languages. One client-side sidebar owns global navigation, independent module expansion, full-sidebar collapse, mobile drawer behavior, and route-preserving language switching.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, MDX, Zod, Vitest, Testing Library, Playwright, GitHub Actions, GitHub Pages.

---

### Task 1: Add locale types and parity validation

**Files:**
- Modify: `src/lib/content/types.ts`
- Modify: `src/lib/content/schema.ts`
- Modify: `src/lib/content/loader.ts`
- Modify: `src/lib/content/loader.test.ts`
- Modify: `src/scripts/validate-content.ts`

- [ ] Write a failing test that loads matching `content/en` and `content/zh` fixtures and rejects a missing Chinese document.
- [ ] Run `npm test -- src/lib/content/loader.test.ts`; confirm failure because loaders are not locale-aware.
- [ ] Add `locales = ["en", "zh"]`, `Locale`, locale-root helpers, and locale arguments to all module, specification, and paper loaders.
- [ ] Add `validateLocaleParity()` comparing document IDs, module order, specification summaries, related links, paper model maps, and reference IDs.
- [ ] Update `validate-content.ts` to load and compare both languages.
- [ ] Run loader tests and `npm run validate:content`; confirm success.
- [ ] Commit with `feat: enforce bilingual content parity`.

### Task 2: Migrate and translate all content

**Files:**
- Move English module and paper MDX into `content/en/`
- Create complete Chinese counterparts under `content/zh/`
- Keep: `content/references/references.json`

- [ ] Move all seven English module-family files, six specification files, and the paper file into the English locale tree without changing stable IDs.
- [ ] Create Chinese translations for the seven family pages.
- [ ] Create Chinese translations for One-Sector CES, Constant versus Increasing Returns, Eaton–Kortum Sourcing, Static Destination Choice, Fixed Labor Endowment, and Trade-Balance Closure.
- [ ] Create the complete Chinese Dekle–Eaton–Kortum paper page, including model environment, data, fit, counterfactuals, findings, limitations, and resources.
- [ ] Run `npm run validate:content`; confirm equal English and Chinese document sets.
- [ ] Commit with `content: publish complete English and Chinese corpus`.

### Task 3: Add locale-prefixed routes and route-preserving switching

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/lib/i18n.test.ts`
- Move routes under: `src/app/[locale]/`
- Replace: `src/app/page.tsx`
- Modify route tests under `src/app/`

- [ ] Write failing tests for `localizedPath("zh", "/en/modules/migration/")`, locale parsing, and `/` redirect behavior.
- [ ] Run the tests and confirm failure because i18n helpers and locale routes do not exist.
- [ ] Implement locale parsing, localized labels, and path replacement.
- [ ] Move home, modules, specification, literature, About, and Contribute pages under `[locale]` and pass locale into loaders.
- [ ] Make `/` redirect to `/en/` and generate static parameters for both locales.
- [ ] Run unit tests, type checking, and static build; confirm both route trees are generated.
- [ ] Commit with `feat: add complete locale-prefixed routes`.

### Task 4: Implement the all-left collapsible navigation

**Files:**
- Replace: `src/components/layout/site-header.tsx`
- Replace: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/site-sidebar.tsx`
- Create: `src/components/layout/site-sidebar.test.tsx`
- Create: `src/components/layout/site-shell.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] Write failing component tests asserting that all global destinations are in the sidebar, seven module buttons expose `aria-expanded`, Migration expands to six specifications, collapse changes accessible state, and the language link preserves the current path.
- [ ] Run the sidebar tests and confirm failure because the component does not exist.
- [ ] Implement one sidebar containing brand, Home, seven independently expandable modules, Literature, About, Contribute, and language switch.
- [ ] Automatically expand the family identified by the current route and support an explicit whole-sidebar collapse control.
- [ ] Implement a mobile drawer using the same semantic navigation tree.
- [ ] Move each module page's specification grid above its long-form MDX body.
- [ ] Run component tests, type checking, linting, and static build.
- [ ] Commit with `feat: make modules the permanent navigation`.

### Task 5: Verify and publish

**Files:**
- Modify: `tests/e2e/navigation.spec.ts`
- Modify: `.github/workflows/ci.yml` only if commands change

- [ ] Extend browser tests to cover `/ → /en/`, English-to-Chinese route-preserving switching, Chinese headings, sidebar module expansion, sidebar collapse, mobile drawer navigation, and specification visibility before article prose.
- [ ] Run `npm run validate:content`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run test:e2e` in a clean non-Dropbox clone.
- [ ] Visually inspect English and Chinese module pages at desktop and mobile widths; confirm zero horizontal overflow and zero console errors.
- [ ] Push `feature/navigation-bilingual`, open a pull request, wait for CI, merge, and verify both live locale trees return HTTP 200.
