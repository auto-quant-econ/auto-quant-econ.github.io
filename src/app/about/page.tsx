import Link from "next/link";
import { ArticleShell } from "@/components/content/article-shell";

export default function AboutPage() {
  return (
    <ArticleShell
      eyebrow="About"
      title="A Common Language for Quantitative Models"
      lead="Auto Quant Econ organizes spatial models as transparent, citable, and reusable economic components."
    >
      <h2>Purpose</h2>
      <p>
        Quantitative papers often differ by a small number of consequential
        modeling choices. Those choices are difficult to compare when every
        paper introduces its own notation and presentation. This project gives
        each recurring component a stable home, then maps complete papers back
        to those components.
      </p>

      <h2>Editorial Principles</h2>
      <ul>
        <li>State the economic question before presenting equations.</li>
        <li>Separate baseline assumptions from substantive extensions.</li>
        <li>Connect every important claim to primary literature.</li>
        <li>Explain how theoretical objects correspond to observed data.</li>
        <li>Keep all published changes inspectable through Git history.</li>
      </ul>

      <h2>Current Coverage</h2>
      <p>
        The first release follows seven component families used in quantitative
        spatial economics: preferences, production, commodity trade, idea
        flows, migration, endowments, and equilibrium. Coverage will deepen
        through reviewed contributions.
      </p>

      <p>
        <Link href="/modules">Explore the module structure</Link> or read the{" "}
        <Link href="/contribute">contribution guide</Link>.
      </p>
    </ArticleShell>
  );
}
