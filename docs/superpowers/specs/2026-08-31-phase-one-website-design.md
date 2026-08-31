# Auto Quant Econ — Phase One Website Design

Date: 2026-08-31
Status: proposed for user review

## 1. Objective

Phase one creates a public, collaborative knowledge website for quantitative spatial economics. The site organizes model knowledge around seven component families and connects each component specification to papers that use it. The initial release establishes the durable content structure, one complete vertical content example, contribution rules, and automatic publication through GitHub Pages.

The public site will be available at:

```text
https://auto-quant-econ.github.io/
```

## 2. Phase-one scope

Phase one contains:

- a GitHub Organization named `auto-quant-econ`;
- an Organization profile repository named `.github`;
- a public website repository named `auto-quant-econ.github.io`;
- a Next.js, TypeScript, and MDX static website;
- a modules overview page;
- seven module-family landing pages;
- a reusable specification-detail template;
- a literature index and reusable paper-detail template;
- one complete module-family example;
- one complete paper example linked to its component specifications;
- contributor documentation, review ownership, issue templates, and pull-request templates;
- automated content checks, build checks, and GitHub Pages deployment.

## 3. Domain structure

The seven top-level model component families follow the course document `lit/quantitative_spatial_models.pdf`:

1. Preferences
2. Production Technology
3. Commodity Trade
4. Technology for Idea Flows
5. Migration
6. Endowments
7. Equilibrium

Each family contains concrete specifications. For example, the Migration family contains static destination choice, bilateral migration costs, dynamic migration, residence–workplace choice, worker heterogeneity, and transportation congestion.

The website distinguishes three content objects:

### 3.1 Module family

A module family explains one broad part of a quantitative spatial model. It contains:

- a concise definition;
- the economic questions governed by the family;
- its role in a complete model;
- the baseline specification;
- a menu of alternative specifications;
- a comparison of those specifications;
- guidance on choosing among them;
- a structured literature map;
- terminology and notation.

### 3.2 Specification

A specification is one concrete formulation inside a module family. It contains:

- a definition and economic motivation;
- environment and timing;
- assumptions;
- decision problem;
- step-by-step derivation;
- core equations and symbol definitions;
- economic intuition and comparative statics;
- empirical interpretation;
- typical applications;
- limitations;
- literature lineage;
- related specifications.

### 3.3 Paper

A paper page presents the paper's complete model as an assembly of existing specifications. It contains:

- full bibliographic metadata;
- research question;
- principal mechanism and contribution;
- the full model environment;
- the specification selected for each of the seven component families;
- links from each selected component to the relevant specification page;
- parameters, data, calibration, and estimation strategy;
- model fit or targeted moments;
- counterfactual exercises reported in the paper;
- central findings and limitations;
- replication code and related resources when available.

A paper can reference multiple specifications. A specification can be used by multiple papers. Bibliographic metadata is stored once and reused by every page that cites the paper.

## 4. Information architecture

Phase-one navigation is:

```text
Home
Modules
Literature
About
Contribute
```

Routes are:

```text
/
/modules
/modules/{family}
/modules/{family}/{specification}
/literature
/literature/{paper}
/about
/contribute
```

### 4.1 Home

The home page introduces quantitative spatial models as assemblies of economic components. It provides direct entry points to the seven module families, a featured baseline model assembled from the lecture, a featured paper, and contribution links.

### 4.2 Modules overview

The modules overview explains the seven-family framework and the relationship between a module family and a concrete specification. It presents one card per family and a baseline model table showing one possible selection across all seven families.

### 4.3 Module-family page

All seven family pages use one common layout:

1. summary;
2. core economic questions;
3. economic role in a complete model;
4. baseline specification;
5. specification menu;
6. comparison table;
7. specification-selection guide;
8. literature map;
9. terminology and notation.

### 4.4 Specification page

All specification pages use one common layout:

1. definition;
2. economic motivation;
3. environment;
4. assumptions;
5. decision problem;
6. derivation;
7. core equations;
8. economic intuition;
9. empirical interpretation;
10. typical applications;
11. limitations;
12. literature lineage;
13. related specifications.

### 4.5 Literature index

The literature index supports browsing by paper, author, year, module family, specification, research topic, and availability of replication code.

### 4.6 Paper page

The paper page uses a seven-row model map. Each row identifies the selected specification and links to the corresponding specification page. If a component is absent, the page records that choice explicitly, such as `No idea flows; exogenous productivity`.

## 5. Content organization

The website source keeps prose close to structured metadata while separating reusable bibliographic records.

```text
content/
├── modules/
│   ├── preferences/
│   │   ├── index.mdx
│   │   └── specifications/
│   ├── production/
│   ├── commodity-trade/
│   ├── idea-flows/
│   ├── migration/
│   ├── endowments/
│   └── equilibrium/
├── literature/
│   └── papers/
└── references/
```

Each MDX page begins with validated metadata. Stable identifiers are independent of display titles, allowing page titles to improve without breaking links.

Example module-family metadata:

```yaml
id: migration
title: Migration
moduleNumber: 5
summary: How workers choose where to live and work.
status: draft
```

Example specification metadata:

```yaml
id: migration.static-destination-choice
family: migration
title: Static Destination Choice
status: draft
references:
  - paper-id
relatedSpecifications:
  - migration.bilateral-costs
  - migration.dynamic-migration
```

Example paper metadata:

```yaml
id: author-year-short-title
title: Full paper title
authors:
  - Author Name
year: 2020
modelMap:
  preferences: preferences.specification-id
  production: production.specification-id
  commodityTrade: commodity-trade.specification-id
  ideaFlows: idea-flows.specification-id
  migration: migration.specification-id
  endowments: endowments.specification-id
  equilibrium: equilibrium.specification-id
```

## 6. Technical architecture

The phase-one site uses:

- Next.js with the App Router;
- TypeScript;
- MDX for mathematical prose and reusable presentation components;
- KaTeX for mathematical notation;
- a structured reference store for bibliographic metadata;
- static export through `output: "export"`;
- GitHub Actions for validation, build, and deployment;
- GitHub Pages for public hosting.

GitHub Pages organization sites require a repository named `<organization>.github.io`. The website repository is therefore `auto-quant-econ.github.io`. The default public URL has no repository subpath, which keeps routes and assets simple.

The site remains statically generated in phase one. All published content is inspectable in Git, reviewable in pull requests, and reproducible from the repository.

## 7. GitHub Organization design

The Organization contains two repositories in phase one:

### 7.1 `.github`

Purpose:

- Organization profile;
- shared contribution guidance;
- community health files where appropriate;
- links to the public website and main repository.

### 7.2 `auto-quant-econ.github.io`

Purpose:

- application source;
- module-family and specification content;
- paper pages and references;
- visual assets;
- tests and validation;
- GitHub Pages deployment.

## 8. Teams and permissions

The Organization starts with three teams:

### 8.1 `owners`

Responsibilities:

- Organization security and settings;
- repository administration;
- team membership;
- rulesets and deployment settings.

Membership is limited to the project lead and one trusted backup owner. Routine content and code work is performed through ordinary teams rather than owner access.

### 8.2 `editors`

Repository role: `Write`.

Responsibilities:

- module-family and specification prose;
- mathematical derivations;
- paper summaries and model maps;
- citation review;
- content pull-request review.

### 8.3 `developers`

Repository role: `Write`.

Responsibilities:

- application code;
- reusable MDX components;
- styling and accessibility;
- content validation;
- deployment workflow;
- technical pull-request review.

One person may belong to both `editors` and `developers`. Additional contributors can open pull requests from forks without Organization membership.

GitHub documents repository roles from Read through Admin and recommends granting the least access needed. Write access is sufficient for active contributors to push branches, open pull requests, review changes, and merge when repository rules permit. Admin remains limited to owners.

## 9. Review ownership

The main repository includes `.github/CODEOWNERS` so GitHub automatically requests the correct reviewers.

Intended ownership pattern:

```text
/content/                         @auto-quant-econ/editors
/content/modules/preferences/     @auto-quant-econ/editors
/content/modules/production/      @auto-quant-econ/editors
/content/modules/commodity-trade/ @auto-quant-econ/editors
/content/modules/idea-flows/      @auto-quant-econ/editors
/content/modules/migration/       @auto-quant-econ/editors
/content/modules/endowments/      @auto-quant-econ/editors
/content/modules/equilibrium/     @auto-quant-econ/editors
/app/                             @auto-quant-econ/developers
/components/                      @auto-quant-econ/developers
/.github/                         @auto-quant-econ/owners
```

The teams named in `CODEOWNERS` must be visible and have write access to the repository. The repository rules require a code-owner review for changes to owned paths.

## 10. Collaboration workflow

### 10.1 Joining the project

1. The project lead invites the collaborator using their GitHub username or verified email.
2. The collaborator accepts the invitation. GitHub Organization invitations expire after seven days.
3. The project lead adds the collaborator to `editors`, `developers`, or both.
4. Team membership grants the appropriate repository access.

### 10.2 Starting a contribution

Every substantive change begins with a GitHub Issue describing:

- the page or feature being changed;
- the proposed contribution;
- relevant papers or sources;
- completion criteria;
- responsible contributor and reviewer.

The contributor creates a short-lived branch from `main`:

```text
content/migration-dynamic
paper/monte-redding-rossi-hansberg-2018
site/module-navigation
fix/citation-rendering
```

### 10.3 Local workflow

```bash
git clone https://github.com/auto-quant-econ/auto-quant-econ.github.io.git
cd auto-quant-econ.github.io
git switch -c content/migration-dynamic
```

After editing and local validation:

```bash
git add <changed-files>
git commit -m "Add dynamic migration specification"
git push -u origin content/migration-dynamic
```

The contributor then opens a pull request into `main`.

### 10.4 Pull-request requirements

Every pull request states:

- what changed;
- why the change is needed;
- which module families and specifications are affected;
- which papers support substantive claims;
- whether notation or shared definitions changed;
- how the contributor verified rendering and links.

The `main` branch uses a repository ruleset requiring:

- changes through a pull request;
- at least one approving review;
- approval from the relevant code owner;
- all required automated checks to pass;
- resolution of review conversations;
- the branch to be current with `main` before merge;
- no direct pushes by ordinary contributors;
- no force pushes or branch deletion.

Owners retain emergency administration capability but use the same pull-request workflow for routine work.

### 10.5 Content review

An editor reviews:

- economic accuracy;
- relationship between module family and specification;
- assumptions and notation;
- derivation clarity;
- accuracy and relevance of citations;
- correct linkage between paper pages and specification pages.

### 10.6 Technical review

A developer reviews:

- build success;
- type and metadata validation;
- route and link integrity;
- equation rendering;
- responsive layout;
- accessibility;
- absence of unintended changes.

Changes affecting both content and application code receive both reviews.

### 10.7 Merge and publication

Pull requests are squash-merged into `main`. The merge commit title summarizes the contribution. A successful merge triggers a GitHub Actions deployment to GitHub Pages. The public site therefore reflects only reviewed content from `main`.

## 11. Contribution paths

Collaborators have three ways to contribute:

### 11.1 Edit in GitHub

Suitable for small prose corrections. The collaborator edits the MDX file in GitHub, creates a branch, and opens a pull request.

### 11.2 Work locally

Suitable for new specifications, paper pages, equations, and application changes. The collaborator clones the repository, creates a branch, validates locally, pushes, and opens a pull request.

### 11.3 Fork-based contribution

Suitable for external contributors who are not Organization members. They fork the public repository and open a pull request from their fork.

## 12. Automated checks

Every pull request runs:

- dependency installation from the lockfile;
- formatting and lint checks;
- TypeScript checks;
- content-schema validation;
- duplicate stable-ID detection;
- broken internal-link detection;
- missing-reference detection;
- MDX compilation;
- production static build.

The deployment workflow runs only from reviewed content merged into `main` and deploys the static export through the `github-pages` environment.

## 13. Initial content milestone

The first public milestone contains:

- a complete home page;
- a complete modules overview;
- seven family landing pages with definitions, economic roles, baseline descriptions, and initial specification menus derived from the lecture;
- one fully developed family used to validate the content template;
- one fully developed specification page;
- a literature index;
- one complete paper page whose seven-part model map links to existing specifications;
- About and Contribute pages;
- Organization profile and collaboration documentation.

Migration is the initial fully developed family because the lecture provides a clear baseline and a well-separated extension menu covering bilateral costs, dynamics, commuting, worker heterogeneity, and congestion.

## 14. Acceptance criteria

Phase one is complete when:

1. `https://auto-quant-econ.github.io/` loads successfully;
2. navigation reaches all phase-one page types;
3. every module family has a valid page and specification menu;
4. the completed example specification renders prose, equations, citations, and related literature correctly;
5. the completed example paper displays its full seven-part model map and links to specification pages;
6. a collaborator can follow the contribution guide, open a pull request, receive the correct code-owner review request, and see automated checks;
7. direct unreviewed changes to `main` are prevented for ordinary contributors;
8. merging an approved pull request publishes the updated static site through GitHub Pages.

## 15. Official platform references

- [About GitHub Organizations](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/about-organizations)
- [Inviting users to join an Organization](https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization)
- [Repository roles for an Organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
- [Creating an Organization team](https://docs.github.com/en/organizations/organizing-members-into-teams/creating-a-team)
- [Managing and standardizing pull requests](https://docs.github.com/en/pull-requests/reference/managing-and-standardizing-pull-requests)
- [About CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Pages site types](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
