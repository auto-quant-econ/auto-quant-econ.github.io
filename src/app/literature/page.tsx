import Link from "next/link";
import { readPapers } from "@/lib/content/loader";

function shortAuthorLine(authors: string[]) {
  const surnames = authors.map((author) => author.split(" ").at(-1));
  if (surnames.length === 1) return surnames[0];
  if (surnames.length === 2) return surnames.join(" and ");
  return `${surnames.slice(0, -1).join(", ")}, and ${surnames.at(-1)}`;
}

export default async function LiteraturePage() {
  const papers = await readPapers();

  return (
    <main className="index-page">
      <header className="index-header">
        <p className="eyebrow">Paper atlas</p>
        <h1>Literature as Model Architecture</h1>
        <p>
          Each paper is presented as a complete quantitative model, with its
          assumptions, data, fit, counterfactuals, and seven-component model map
          linked back to the module library.
        </p>
      </header>

      <div className="paper-index">
        {papers.map((paper) => (
          <article key={paper.id}>
            <p className="paper-year">{paper.year}</p>
            <div>
              <h2>
                <Link href={`/literature/${paper.id}`}>{paper.title}</Link>
              </h2>
              <p>
                {shortAuthorLine(paper.authors)} · {paper.year}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
