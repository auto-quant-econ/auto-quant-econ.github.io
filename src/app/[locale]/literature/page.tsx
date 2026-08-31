import Link from "next/link";
import { notFound } from "next/navigation";
import { localizedContentRoot, readPapers } from "@/lib/content/loader";
import { parseLocale } from "@/lib/i18n";

function shortAuthorLine(authors: string[]) {
  const surnames = authors.map((author) => author.split(" ").at(-1));
  if (surnames.length === 1) return surnames[0];
  if (surnames.length === 2) return surnames.join(" and ");
  return `${surnames.slice(0, -1).join(", ")}, and ${surnames.at(-1)}`;
}

export default async function LiteraturePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  const papers = await readPapers(localizedContentRoot(locale));

  return (
    <main className="index-page">
      <header className="index-header">
        <p className="eyebrow">{locale === "en" ? "Paper atlas" : "文献图谱"}</p>
        <h1>{locale === "en" ? "Literature as Model Architecture" : "作为模型架构的文献"}</h1>
        <p>{locale === "en" ? "Each paper is presented as a complete quantitative model, with assumptions, data, fit, counterfactuals, and a seven-component model map." : "每篇论文都作为一个完整定量模型呈现，包括假设、数据、拟合、反事实以及七模块模型图。"}</p>
      </header>

      <div className="paper-index">
        {papers.map((paper) => (
          <article key={paper.id}>
            <p className="paper-year">{paper.year}</p>
            <div>
              <h2>
                <Link href={`/${locale}/literature/${paper.id}/`}>{paper.title}</Link>
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
