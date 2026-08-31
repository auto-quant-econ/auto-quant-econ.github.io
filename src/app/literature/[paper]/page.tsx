import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { CitationList } from "@/components/content/citation-list";
import { MdxContent } from "@/components/content/mdx-content";
import { ModelMap } from "@/components/content/model-map";
import {
  getPaper,
  readAllSpecifications,
  readPapers,
  readReferences,
  validateContentGraph,
} from "@/lib/content/loader";

export async function generateStaticParams() {
  return (await readPapers()).map(({ id }) => ({ paper: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ paper: string }>;
}): Promise<Metadata> {
  const { paper } = await params;
  const document = await getPaper(paper);
  return document
    ? { title: `${document.title} | Auto Quant Econ`, description: document.citation }
    : {};
}

export default async function PaperPage(_props: {
  params: Promise<{ paper: string }>;
}) {
  const { paper } = await _props.params;
  const document = await getPaper(paper);
  if (!document) notFound();

  const specifications = await readAllSpecifications();
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
      eyebrow="Literature"
      title={document.title}
      lead={document.citation}
      meta={<Link href="/literature">All literature</Link>}
    >
      <h2>Model Map</h2>
      <p>
        The rows below connect the paper&apos;s complete model to reusable
        component specifications.
      </p>
      <ModelMap entries={document.modelMap} titles={titles} />
      {renderedBody}
      <h2>References</h2>
      <CitationList references={references} />
    </ArticleShell>
  );
}
