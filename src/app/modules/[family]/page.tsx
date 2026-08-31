import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { MdxContent } from "@/components/content/mdx-content";
import { SpecificationCard } from "@/components/content/specification-card";
import {
  getModuleFamily,
  readModuleFamilies,
  readSpecifications,
} from "@/lib/content/loader";
import { familyIdSchema } from "@/lib/content/schema";

export async function generateStaticParams() {
  return (await readModuleFamilies()).map(({ id }) => ({ family: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string }>;
}): Promise<Metadata> {
  const { family } = await params;
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success) return {};
  const document = await getModuleFamily(parsed.data);
  return document
    ? { title: `${document.title} | Auto Quant Econ`, description: document.summary }
    : {};
}

export default async function ModuleFamilyPage(_props: {
  params: Promise<{ family: string }>;
}) {
  const { family } = await _props.params;
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success) notFound();

  const document = await getModuleFamily(parsed.data);
  if (!document) notFound();
  const detailedSpecifications = await readSpecifications(parsed.data);
  const detailedIds = new Set(detailedSpecifications.map(({ id }) => id));
  const renderedBody = await MdxContent({ source: document.body });

  return (
    <ArticleShell
      eyebrow={`Module ${document.moduleNumber}`}
      title={document.title}
      lead={document.summary}
      meta={
        <>
          <Link href="/modules">All modules</Link>
          <span aria-hidden="true"> · </span>
          <span>Baseline: {document.baseline}</span>
        </>
      }
    >
      {renderedBody}

      <h2>Specification Menu</h2>
      <p>
        Each specification isolates a different adjustment margin. Detailed
        pages are added as the literature review develops.
      </p>
      <div className="specification-grid">
        {document.specifications.map((specification) => (
          <SpecificationCard
            href={
              detailedIds.has(specification.id)
                ? `/modules/${document.id}/${specification.id.split(".").at(-1)}`
                : undefined
            }
            key={specification.id}
            mechanism={specification.mechanism}
            summary={specification.summary}
            title={specification.title}
          />
        ))}
      </div>
    </ArticleShell>
  );
}
