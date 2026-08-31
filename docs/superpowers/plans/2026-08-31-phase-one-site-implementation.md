# Phase One Academic Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the `auto-quant-econ` GitHub Organization and publish a restrained academic knowledge website containing the seven module families, one complete specification example, and a literature section linked back to module specifications.

**Architecture:** The Organization site lives in the public `auto-quant-econ.github.io` repository. Next.js statically generates routes from validated MDX content; module families, specifications, and papers share typed metadata and stable identifiers. Pull requests run content and build checks, while merges to `main` deploy the static export to GitHub Pages.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript, MDX, Zod 4.5.4, gray-matter, remark-math, rehype-katex, KaTeX 0.18.4, Vitest, Testing Library, Playwright, GitHub Actions, GitHub Pages.

---

## File map

```text
auto-quant-econ.github.io/
├── .github/
│   ├── CODEOWNERS
│   ├── ISSUE_TEMPLATE/content.yml
│   ├── ISSUE_TEMPLATE/website.yml
│   ├── pull_request_template.md
│   └── workflows/{ci.yml,pages.yml}
├── content/
│   ├── modules/<family>/index.mdx
│   ├── modules/migration/specifications/static-destination-choice.mdx
│   ├── literature/dekle-eaton-kortum-2008.mdx
│   └── references/references.json
├── docs/
│   ├── content-guide.md
│   ├── citation-guide.md
│   └── superpowers/{plans,specs}/
├── public/
│   └── mark.svg
├── src/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── contribute/page.tsx
│   │   ├── literature/[paper]/page.tsx
│   │   ├── literature/page.tsx
│   │   ├── modules/[family]/[specification]/page.tsx
│   │   ├── modules/[family]/page.tsx
│   │   ├── modules/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── content/article-shell.tsx
│   │   ├── content/citation-list.tsx
│   │   ├── content/model-map.tsx
│   │   ├── content/specification-card.tsx
│   │   ├── layout/site-footer.tsx
│   │   ├── layout/site-header.tsx
│   │   └── mdx-components.tsx
│   └── lib/content/
│       ├── loader.test.ts
│       ├── loader.ts
│       ├── schema.test.ts
│       ├── schema.ts
│       └── types.ts
├── tests/e2e/navigation.spec.ts
├── mdx-components.tsx
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── vitest.setup.ts
└── vitest.config.ts
```

### Task 1: Create the GitHub Organization shell

**Remote resources:**
- Create Organization: `auto-quant-econ`
- Create repository: `auto-quant-econ/.github`
- Create repository: `auto-quant-econ/auto-quant-econ.github.io`
- Create teams: `editors`, `developers`

- [ ] **Step 1: Create the Organization from the signed-in `ALLBLUEUK` account**

Use GitHub's Organization creation page, choose the free plan, set the Organization name to `auto-quant-econ`, set the contact email to the account's verified project email, and keep `ALLBLUEUK` as owner.

- [ ] **Step 2: Create the two public repositories**

Create `.github` with description `Community health files and organization profile for Auto Quant Econ`. Create `auto-quant-econ.github.io` with description `A modular knowledge base for quantitative spatial economics`. Do not initialize either repository with generated sample files because local reviewed files will be pushed.

- [ ] **Step 3: Create teams**

Create visible teams `editors` and `developers`. Grant both teams `Write` access to `auto-quant-econ.github.io`. Keep Organization ownership limited to `ALLBLUEUK` until a trusted backup owner is nominated.

- [ ] **Step 4: Record remote URLs**

Expected URLs:

```text
https://github.com/auto-quant-econ
https://github.com/auto-quant-econ/.github
https://github.com/auto-quant-econ/auto-quant-econ.github.io
```

### Task 2: Establish the tested Next.js project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/not-found.tsx`
- Create: `src/smoke.test.tsx`

- [ ] **Step 1: Write the failing smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("introduces the project", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("heading", { name: /quantitative spatial models/i }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Add package and tool configuration**

Use exact runtime versions listed in the plan header and scripts:

```json
{
  "name": "auto-quant-econ",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Configure `next.config.ts` with `output: "export"` and `trailingSlash: true`. Configure Vitest with the React plugin, jsdom, the `@/` alias, and `vitest.setup.ts` importing `@testing-library/jest-dom/vitest`.

- [ ] **Step 3: Install dependencies and verify the test fails**

Run:

```powershell
npm install next@16.3.3 react@19.2.8 react-dom@19.2.8 zod@4.5.4 gray-matter next-mdx-remote remark-math rehype-katex katex@0.18.4
npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @playwright/test serve
npm test
```

Expected: the smoke test fails because the home page has not yet supplied the required heading.

- [ ] **Step 4: Implement the minimal application shell**

Create a root layout with metadata, serif body typography, the global stylesheet, and a home page containing an `h1` with `Quantitative Spatial Models, Built from Components`.

- [ ] **Step 5: Run base checks**

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit successfully and `out/index.html` exists.

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json next.config.ts tsconfig.json eslint.config.mjs vitest.config.ts vitest.setup.ts playwright.config.ts src
git commit -m "build: establish tested Next.js site"
```

### Task 3: Build the typed MDX content layer

**Files:**
- Create: `src/lib/content/types.ts`
- Create: `src/lib/content/schema.ts`
- Create: `src/lib/content/schema.test.ts`
- Create: `src/lib/content/loader.ts`
- Create: `src/lib/content/loader.test.ts`
- Create: `src/components/mdx-components.tsx`
- Create: `mdx-components.tsx`

- [ ] **Step 1: Write schema tests**

Test that a valid module-family record parses, an unknown family is rejected, duplicate specification IDs are rejected by `validateUniqueIds`, and a paper model map accepts either a specification ID or an explicit `not-applicable` value for each family.

```ts
expect(() => moduleFamilySchema.parse(validFamily)).not.toThrow();
expect(() => moduleFamilySchema.parse({ ...validFamily, id: "unknown" })).toThrow();
expect(() => validateUniqueIds([{ id: "x" }, { id: "x" }])).toThrow(
  /duplicate content id: x/i,
);
```

- [ ] **Step 2: Run the schema tests and confirm failure**

```powershell
npx vitest run src/lib/content/schema.test.ts
```

Expected: failure because schemas and validation functions do not exist.

- [ ] **Step 3: Implement schemas and types**

Define the fixed family enumeration:

```ts
export const familyIds = [
  "preferences",
  "production",
  "commodity-trade",
  "idea-flows",
  "migration",
  "endowments",
  "equilibrium",
] as const;
```

Define Zod schemas for module families, specifications, references, and papers. Require stable IDs, titles, summaries, status, ordering, citations, and the seven-row paper model map.

- [ ] **Step 4: Write loader tests**

Create temporary MDX fixtures during the test and assert that `readModuleFamilies()` sorts by module number, `readSpecifications("migration")` returns only migration specifications, malformed front matter reports the source path, and unknown cross-links fail `validateContentGraph()`.

- [ ] **Step 5: Run loader tests and confirm failure**

```powershell
npx vitest run src/lib/content/loader.test.ts
```

Expected: failure because loaders do not exist.

- [ ] **Step 6: Implement filesystem loaders**

Use `fs/promises`, `path`, `gray-matter`, Zod schemas, and `next-mdx-remote/rsc`. Keep all filesystem access in `src/lib/content/loader.ts`. Export functions for families, specifications, papers, references, static route parameters, and content-graph validation.

- [ ] **Step 7: Add MDX components and verify**

Provide semantic components for headings, links, equations, tables, notes, citations, specification cards, and model maps. Run:

```powershell
npm test
npm run typecheck
```

Expected: all tests pass.

- [ ] **Step 8: Commit**

```powershell
git add src/lib/content src/components/mdx-components.tsx mdx-components.tsx
git commit -m "feat: add validated MDX content layer"
```

### Task 4: Implement the restrained academic visual system

**Files:**
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/content/article-shell.tsx`
- Create: `src/components/content/specification-card.tsx`
- Create: `src/components/content/model-map.tsx`
- Create: `src/components/content/citation-list.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Test: `src/components/layout/site-header.test.tsx`

- [ ] **Step 1: Write the navigation test**

Render `SiteHeader` and assert that Modules, Literature, About, and Contribute links point to their canonical routes and that the site name links to `/`.

- [ ] **Step 2: Run the navigation test and confirm failure**

```powershell
npx vitest run src/components/layout/site-header.test.tsx
```

Expected: failure because `SiteHeader` does not exist.

- [ ] **Step 3: Implement layout components and visual tokens**

Use a paper-white background, near-black ink, muted slate metadata, a single restrained burgundy accent, thin rules, a serif reading face, a sans-serif interface face, generous line height, and a maximum article measure of approximately 72 characters. Avoid gradients, glass effects, oversized rounded cards, decorative dashboards, and saturated color blocks.

CSS tokens:

```css
:root {
  --paper: #f8f7f3;
  --surface: #ffffff;
  --ink: #1b1b1a;
  --muted: #66635d;
  --rule: #d8d4cb;
  --accent: #7a263a;
  --accent-soft: #f2e8ea;
  --measure: 72ch;
}
```

Make focus states visible, support reduced motion, preserve high color contrast, and use responsive typography without layout jumps.

- [ ] **Step 4: Run component and base checks**

```powershell
npm test
npm run typecheck
npm run lint
```

Expected: all commands pass.

- [ ] **Step 5: Commit**

```powershell
git add src/components src/app/layout.tsx src/app/globals.css
git commit -m "feat: add academic visual system"
```

### Task 5: Add the module knowledge structure and seven seed families

**Files:**
- Create: `content/modules/*/index.mdx` for all seven families
- Create: `content/modules/migration/specifications/static-destination-choice.mdx`
- Create: `src/app/modules/page.tsx`
- Create: `src/app/modules/[family]/page.tsx`
- Create: `src/app/modules/[family]/[specification]/page.tsx`
- Test: `src/app/modules/modules.test.tsx`

- [ ] **Step 1: Write module route tests**

Assert that the modules index renders seven numbered families, the migration page renders its baseline and six specification entries, and the static destination-choice page renders Definition, Assumptions, Core Equations, Economic Intuition, Limitations, and Literature Lineage headings.

- [ ] **Step 2: Run the module tests and confirm failure**

```powershell
npx vitest run src/app/modules/modules.test.tsx
```

Expected: failure because routes and content do not exist.

- [ ] **Step 3: Write the seven family seed pages**

Use `D:\Dropbox\[Project]auto-quant-econ\lit\quantitative_spatial_models.pdf` as the seed source. Each family page contains a concise definition, economic role, baseline description, specification menu from the extension tables, comparison dimensions, and initial annotated references. The full Migration family and static destination-choice specification contain the complete first-phase template content.

- [ ] **Step 4: Implement static routes**

Use content loaders and `generateStaticParams()`. Unknown family or specification slugs call `notFound()`. Every page includes breadcrumbs, stable headings, previous/next family navigation, and links from specification cards to existing detail pages.

- [ ] **Step 5: Verify content and routes**

```powershell
npm test
npm run typecheck
npm run build
```

Expected: all seven family routes and the static destination-choice route appear in the static export.

- [ ] **Step 6: Commit**

```powershell
git add content/modules src/app/modules
git commit -m "feat: publish seven module-family foundations"
```

### Task 6: Add the literature model-map experience

**Files:**
- Create: `content/literature/dekle-eaton-kortum-2008.mdx`
- Create: `content/references/references.json`
- Create: `src/app/literature/page.tsx`
- Create: `src/app/literature/[paper]/page.tsx`
- Test: `src/app/literature/literature.test.tsx`

- [ ] **Step 1: Write literature tests**

Assert that the literature index lists the paper with authors and year, the paper page renders all seven model-map rows, linked specifications use canonical routes, and components absent from the model are described explicitly rather than omitted.

- [ ] **Step 2: Run tests and confirm failure**

```powershell
npx vitest run src/app/literature/literature.test.tsx
```

Expected: failure because literature routes and records do not exist.

- [ ] **Step 3: Add the first paper record**

Create an evidence-backed page for Dekle, Eaton, and Kortum (2008), covering the research question, Eaton–Kortum production and sourcing structure, fixed factor endowments, trade-deficit closure, baseline data mapping, counterfactual rebalancing exercise, and limitations. Link every applicable row to an existing or declared specification identifier. Mark idea flows and migration as absent choices where appropriate.

- [ ] **Step 4: Implement literature routes and model map**

Render bibliographic metadata once, a seven-row model map, structured sections, references, and reciprocal links back to module specifications.

- [ ] **Step 5: Verify**

```powershell
npm test
npm run typecheck
npm run build
```

Expected: the index and paper route are statically generated and all content-graph checks pass.

- [ ] **Step 6: Commit**

```powershell
git add content/literature content/references src/app/literature
git commit -m "feat: add literature model-map pages"
```

### Task 7: Add collaboration files, CI, and Pages deployment

**Files:**
- Create: `.github/CODEOWNERS`
- Create: `.github/ISSUE_TEMPLATE/content.yml`
- Create: `.github/ISSUE_TEMPLATE/website.yml`
- Create: `.github/pull_request_template.md`
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/pages.yml`
- Create: `docs/content-guide.md`
- Create: `docs/citation-guide.md`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contribute/page.tsx`
- Create: `tests/e2e/navigation.spec.ts`

- [ ] **Step 1: Write the end-to-end navigation test**

Test home → Modules → Migration → Static Destination Choice, then home → Literature → Dekle–Eaton–Kortum. Assert that no page returns an error and primary headings are visible.

- [ ] **Step 2: Run the end-to-end test and confirm failure**

```powershell
npx playwright install chromium
npm run build
npx serve out -l 4173
npm run test:e2e
```

Expected: failure until route content, Playwright web-server configuration, and navigation links are complete.

- [ ] **Step 3: Add contribution and governance files**

Create templates requiring economic claims, source literature, notation changes, route changes, and verification evidence. Assign content paths to `@auto-quant-econ/editors`, application paths to `@auto-quant-econ/developers`, and `.github` to `@ALLBLUEUK` until a visible owner team is available for CODEOWNERS.

- [ ] **Step 4: Add CI and Pages workflows**

`ci.yml` runs install, tests, typecheck, lint, and build on pull requests and pushes to `main`. `pages.yml` runs only on `main` and manual dispatch, uses `actions/configure-pages`, uploads `out`, and deploys through the `github-pages` environment with `pages: write` and `id-token: write` permissions.

- [ ] **Step 5: Add About, Contribute, and contributor guides**

Document the issue → branch → pull request → review → merge workflow, content locations, front-matter fields, citation annotations, and local commands.

- [ ] **Step 6: Make the end-to-end test pass**

Configure Playwright to serve the static export automatically, then run:

```powershell
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Expected: all checks pass.

- [ ] **Step 7: Commit**

```powershell
git add .github docs/content-guide.md docs/citation-guide.md src/app/about src/app/contribute tests playwright.config.ts
git commit -m "ci: add reviewed contribution and deployment workflow"
```

### Task 8: Publish, protect, and verify the Organization site

**Files:**
- Create in `.github` repository: `profile/README.md`
- Remote settings: Pages, teams, ruleset, repository topics

- [ ] **Step 1: Push the implementation branch**

Add `https://github.com/auto-quant-econ/auto-quant-econ.github.io.git` as `origin`, push `feature/phase-one-site`, and open a pull request into `main` containing the implementation commits.

- [ ] **Step 2: Configure repository access and rules**

Give `editors` and `developers` Write access. Create a `main` ruleset requiring pull requests, one approval, code-owner review, conversation resolution, and required CI checks. Block force pushes and deletions for ordinary contributors.

- [ ] **Step 3: Configure GitHub Pages**

Set the Pages build source to GitHub Actions and restrict deployment to the `main` branch through the `github-pages` environment.

- [ ] **Step 4: Merge after successful review and checks**

Review the branch diff, ensure CI passes, then squash-merge the pull request. Verify that the Pages workflow completes successfully.

- [ ] **Step 5: Create the Organization profile**

Add `profile/README.md` to the `.github` repository with the project mission, seven component families, public-site link, main-repository link, and contribution link. Commit and push it to the `.github` default branch.

- [ ] **Step 6: Verify the public result**

Open:

```text
https://auto-quant-econ.github.io/
```

Verify desktop and mobile layouts, all primary routes, mathematical rendering, paper-to-specification links, public repository visibility, and contribution documentation.

- [ ] **Step 7: Final repository checks**

Run locally from the implementation branch:

```powershell
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
git status --short
```

Expected: all commands pass and the worktree contains no uncommitted implementation changes.
