import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { MdxContent } from "@/components/content/mdx-content";
import {
  getSpecification,
  readAllSpecifications,
} from "@/lib/content/loader";
import { familyIdSchema } from "@/lib/content/schema";

export async function generateStaticParams() {
  return (await readAllSpecifications()).map((specification) => ({
    family: specification.family,
    specification: specification.id.split(".").at(-1),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string; specification: string }>;
}): Promise<Metadata> {
  const { family, specification } = await params;
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success) return {};
  const document = await getSpecification(parsed.data, specification);
  return document
    ? { title: `${document.title} | Auto Quant Econ`, description: document.summary }
    : {};
}

export default async function SpecificationPage(_props: {
  params: Promise<{ family: string; specification: string }>;
}) {
  const { family, specification } = await _props.params;
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success) notFound();

  const document = await getSpecification(parsed.data, specification);
  if (!document) notFound();
  const renderedBody = await MdxContent({ source: document.body });

  return (
    <ArticleShell
      eyebrow="Specification"
      title={document.title}
      lead={document.summary}
      meta={
        <Link href={`/modules/${document.family}`}>
          Return to {document.family.replaceAll("-", " ")}
        </Link>
      }
    >
      {renderedBody}
    </ArticleShell>
  );
}
