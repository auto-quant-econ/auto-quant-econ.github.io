import Link from "next/link";
import { notFound } from "next/navigation";
import { localizedContentRoot, readModuleFamilies } from "@/lib/content/loader";
import { parseLocale } from "@/lib/i18n";

export default async function ModulesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  const families = await readModuleFamilies(localizedContentRoot(locale));

  return (
    <main className="index-page">
      <header className="index-header">
        <p className="eyebrow">{locale === "en" ? "Model architecture" : "模型架构"}</p>
        <h1>{locale === "en" ? "Seven Components of a Spatial Model" : "空间模型的七个组成模块"}</h1>
        <p>{locale === "en" ? "A quantitative spatial model selects a concrete specification from each relevant component menu. Read each family's role, compare formulations, and trace them through the literature." : "定量空间模型从相关模块菜单中选择具体设定。这里可以理解各模块的作用、比较不同形式，并追踪相应文献。"}</p>
      </header>

      <ol className="module-index">
        {families.map((family) => (
          <li key={family.id}>
            <Link
              aria-label={`Module ${family.moduleNumber}: ${family.title}`}
              href={`/${locale}/modules/${family.id}/`}
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
