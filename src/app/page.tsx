import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <p className="eyebrow">Open research infrastructure</p>
        <h1>Quantitative Spatial Models, Built from Components</h1>
        <p className="hero-lead">
          A structured guide to the preferences, technologies, spatial
          frictions, mobility choices, endowments, and equilibrium conditions
          that make quantitative models work.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/modules">
            Explore the modules
          </Link>
          <Link className="button button-secondary" href="/literature">
            Browse the literature
          </Link>
        </div>
      </section>

      <section className="home-thesis" aria-labelledby="thesis-title">
        <p className="section-number">01</p>
        <div>
          <h2 id="thesis-title">From papers to reusable model knowledge</h2>
          <p>
            Each paper is read as a complete model. Each model is then mapped
            to seven component families, making assumptions, alternatives, and
            intellectual lineages easier to compare.
          </p>
        </div>
      </section>

      <section className="home-grid" aria-label="Project principles">
        <article>
          <p className="section-number">A</p>
          <h2>Learn the parts</h2>
          <p>
            Read a careful account of each component, its equations, economic
            interpretation, and associated literature.
          </p>
        </article>
        <article>
          <p className="section-number">B</p>
          <h2>Read whole models</h2>
          <p>
            See how published papers combine component choices, confront data,
            and organize quantitative counterfactuals.
          </p>
        </article>
        <article>
          <p className="section-number">C</p>
          <h2>Build collaboratively</h2>
          <p>
            Every page is versioned on GitHub, with claims, notation, and
            citations reviewed through transparent pull requests.
          </p>
        </article>
      </section>
    </main>
  );
}
