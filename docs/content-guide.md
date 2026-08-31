# Content Contribution Guide

## Workflow

1. Open a structured content issue.
2. Create a short-lived branch from `main`.
3. Edit or add an MDX document under `content/`.
4. Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.
5. Open a pull request and request the automatically assigned review.

## Content locations

```text
content/modules/<family>/index.mdx
content/modules/<family>/specifications/<slug>.mdx
content/literature/<paper-id>.mdx
content/references/references.json
```

## Stable identifiers

Use lowercase words separated by periods or hyphens. A specification ID begins with its family ID, for example `migration.static-destination-choice`. Once published, an ID must not be reused for a different concept.

## Module-family pages

Family pages contain a definition, economic role, baseline, specification menu, selection guidance, literature map, and notation. Add a specification summary to the family front matter before adding its detailed page.

## Specification pages

Use the shared article order: definition, motivation, environment, assumptions, decision problem, derivation, core equations, intuition, empirical interpretation, applications, limitations, literature lineage, and related specifications.

## Paper pages

Map every paper across all seven families. Use an existing specification ID when the mechanism is present. Use `not-applicable` with a precise note when the paper deliberately leaves a component outside the model.
