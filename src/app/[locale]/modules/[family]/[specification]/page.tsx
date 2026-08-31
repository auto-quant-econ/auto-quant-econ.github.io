import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { MdxContent } from "@/components/content/mdx-content";
import {
  getSpecification,
  localizedContentRoot,
  readAllSpecifications,
} from "@/lib/content/loader";
import { familyIdSchema, locales } from "@/lib/content/schema";
import { parseLocale } from "@/lib/i18n";

export async function generateStaticParams() {
  return (await Promise.all(locales.map(async (locale) =>
    (await readAllSpecifications(localizedContentRoot(locale))).map((specification) => ({
      locale, family: specification.family, specification: specification.id.split(".").at(-1),
    }))
  ))).flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; family: string; specification: string }>;
}): Promise<Metadata> {
  const { locale: localeValue, family, specification } = await params;
  const locale = parseLocale(localeValue);
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success || !locale) return {};
  const document = await getSpecification(parsed.data, specification, localizedContentRoot(locale));
  return document
    ? { title: `${document.title} | Auto Quant Econ`, description: document.summary }
    : {};
}

export default async function SpecificationPage(_props: {
  params: Promise<{ locale: string; family: string; specification: string }>;
}) {
  const { locale: localeValue, family, specification } = await _props.params;
  const locale = parseLocale(localeValue);
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success || !locale) notFound();

  const document = await getSpecification(parsed.data, specification, localizedContentRoot(locale));
  if (!document) notFound();
  const renderedBody = await MdxContent({ source: document.body });

  return (
    <ArticleShell
      eyebrow="Specification"
      title={document.title}
      lead={document.summary}
      meta={
        <Link href={`/${locale}/modules/${document.family}/`}>
          {locale === "en" ? `Return to ${document.family.replaceAll("-", " ")}` : "返回模块概览"}
        </Link>
      }
    >
      {renderedBody}
    </ArticleShell>
  );
}
