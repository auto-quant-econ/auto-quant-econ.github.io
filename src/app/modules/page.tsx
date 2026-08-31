import Link from "next/link";
import { readModuleFamilies } from "@/lib/content/loader";

export default async function ModulesPage() {
  const families = await readModuleFamilies();

  return (
    <main className="index-page">
      <header className="index-header">
        <p className="eyebrow">Model architecture</p>
        <h1>Seven Components of a Spatial Model</h1>
        <p>
          A quantitative spatial model selects a concrete specification from
          each relevant component menu. Read the economic role of each family,
          compare alternative formulations, and trace them through the
          literature.
        </p>
      </header>

      <ol className="module-index">
        {families.map((family) => (
          <li key={family.id}>
            <Link
              aria-label={`Module ${family.moduleNumber}: ${family.title}`}
              href={`/modules/${family.id}`}
            >
              <span className="module-number">
                {String(family.moduleNumber).padStart(2, "0")}
              </span>
              <span className="module-index-copy">
                <strong>{family.title}</strong>
                <span>{family.summary}</span>
              </span>
              <span aria-hidden="true" className="module-arrow">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
