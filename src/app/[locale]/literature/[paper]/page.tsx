import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { CitationList } from "@/components/content/citation-list";
import { MdxContent } from "@/components/content/mdx-content";
import { ModelMap } from "@/components/content/model-map";
import {
  getPaper,
  localizedContentRoot,
  readAllSpecifications,
  readPapers,
  readReferences,
  validateContentGraph,
} from "@/lib/content/loader";
import { locales } from "@/lib/content/schema";
import { parseLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  return (await Promise.all(locales.map(async (locale) =>
    (await readPapers(localizedContentRoot(locale))).map(({ id }) => ({ locale, paper: id }))
  ))).flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; paper: string }>;
}): Promise<Metadata> {
  const { locale: localeValue, paper } = await params;
  const locale = parseLocale(localeValue);
  if (!locale) return {};
  const document = await getPaper(paper, localizedContentRoot(locale));
  return document
    ? { title: `${document.title} | Auto Quant Econ`, description: document.citation }
    : {};
}

export default async function PaperPage(_props: {
  params: Promise<{ locale: string; paper: string }>;
}) {
  const { locale: localeValue, paper } = await _props.params;
  const locale = parseLocale(localeValue);
  if (!locale) notFound();
  const root = localizedContentRoot(locale);
  const document = await getPaper(paper, root);
  if (!document) notFound();

  const specifications = await readAllSpecifications(root);
  const allReferences = await readReferences();
  validateContentGraph({
    specifications,
    papers: [document],
    references: allReferences,
  });
  const titles = Object.fromEntries(
    specifications.map((specification) => [
      specification.id,
      specification.title,
    ]),
  );
  const references = allReferences.filter((reference) =>
    document.references.includes(reference.id),
  );
  const renderedBody = await MdxContent({ source: document.body });

  return (
    <ArticleShell
      eyebrow={locale === "en" ? "Literature" : "文献"}
      title={document.title}
      lead={document.citation}
      meta={<Link href={`/${locale}/literature/`}>{locale === "en" ? "All literature" : "全部文献"}</Link>}
    >
      <h2>{locale === "en" ? "Model Map" : "模型模块图"}</h2>
      <p>{locale === "en" ? "The rows below connect the paper's complete model to reusable component specifications." : "下列各行把论文的完整模型连接到可复用的模块设定。"}</p>
      <ModelMap entries={document.modelMap} titles={titles} locale={locale} />
      {renderedBody}
      <h2>{locale === "en" ? "References" : "参考文献"}</h2>
      <CitationList references={references} />
    </ArticleShell>
  );
}
