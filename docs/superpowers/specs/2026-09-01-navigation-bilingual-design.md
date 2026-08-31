# Navigation and Bilingual Website Design

Date: 2026-09-01
Status: approved

## Objective

Make model components the permanent organizing structure of the website and publish every page in complete English and Chinese versions.

## Routes

The root route redirects to English:

```text
/ → /en/
```

Every public content route has matching locale-prefixed forms:

```text
/en/modules/migration/
/zh/modules/migration/

/en/modules/migration/static-destination-choice/
/zh/modules/migration/static-destination-choice/

/en/literature/dekle-eaton-kortum-2008/
/zh/literature/dekle-eaton-kortum-2008/
```

The language switch replaces only the locale segment and preserves the remainder of the route.

## Navigation

Desktop uses one persistent left sidebar containing every global destination:

```text
Auto Quant Econ
Home
01 Preferences
02 Production Technology
03 Commodity Trade
04 Technology for Idea Flows
05 Migration
06 Endowments
07 Equilibrium
Literature
About
Contribute
Language
```

Each model component is independently expandable. Expanding a component reveals all specifications in that family. The current component expands automatically. The entire sidebar can collapse to a narrow rail.

Mobile uses the same hierarchy inside an accessible navigation drawer. The drawer opens with a labeled button, closes after navigation, and supports keyboard and screen-reader operation.

## Module pages

A module-family page presents its specification menu before long-form explanatory text. Readers see every available specification immediately after the module title and summary.

The sidebar and the specification menu use the same source metadata, preventing navigation labels and page content from diverging.

## Bilingual content

English and Chinese content have equal publication status. Every page contains complete prose in both languages:

- home;
- modules overview;
- seven module-family pages;
- all current specification pages;
- literature index;
- paper pages;
- About;
- Contribute;
- navigation and interface labels.

Formulas, stable identifiers, model maps, citations, URLs, and reference metadata are shared. Explanatory prose, headings, labels, summaries, assumptions, and limitations are localized.

Chinese pages use established economics terminology and retain the English technical term in parentheses on first use when it improves precision.

## Content organization

Locale-specific prose is stored under locale directories:

```text
content/en/modules/...
content/zh/modules/...
content/en/literature/...
content/zh/literature/...
```

Shared bibliographic metadata remains in:

```text
content/references/references.json
```

English and Chinese documents use the same stable ID, family ID, specification links, paper model map, reference IDs, and ordering.

## Validation

`npm run validate:content` fails when:

- a document exists in only one locale;
- matching documents use different stable IDs;
- module numbers or ordering differ;
- specification menus differ;
- related-specification links differ;
- paper model maps differ;
- reference IDs differ;
- a referenced specification or bibliography entry does not exist.

## Visual treatment

The existing restrained academic system remains: paper background, serif reading typography, dark ink, muted metadata, burgundy accent, thin rules, generous spacing, and KaTeX equations.

The sidebar adds structure without dashboard styling, gradients, decorative cards, or saturated panels.

## Acceptance criteria

1. `/` reaches `/en/`.
2. Every English route has a complete Chinese counterpart.
3. Language switching preserves the current page.
4. All global destinations appear in the left sidebar.
5. All seven module families expand and collapse independently.
6. The active module expands automatically.
7. Module pages display specifications before long-form prose.
8. Mobile navigation preserves the complete hierarchy.
9. Locale parity validation, unit tests, type checking, linting, static build, and browser tests pass.
10. GitHub Pages publishes both language trees successfully.
