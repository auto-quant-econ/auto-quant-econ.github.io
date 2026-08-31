import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { MdxContent } from "@/components/content/mdx-content";
import { SpecificationCard } from "@/components/content/specification-card";
import {
  getModuleFamily,
  localizedContentRoot,
  readModuleFamilies,
  readSpecifications,
} from "@/lib/content/loader";
import { familyIdSchema, locales } from "@/lib/content/schema";
import { parseLocale, ui } from "@/lib/i18n";

export async function generateStaticParams() {
  return (await Promise.all(locales.map(async (locale) =>
    (await readModuleFamilies(localizedContentRoot(locale))).map(({ id }) => ({ locale, family: id }))
  ))).flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; family: string }>;
}): Promise<Metadata> {
  const { family, locale: localeValue } = await params;
  const locale = parseLocale(localeValue);
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success || !locale) return {};
  const document = await getModuleFamily(parsed.data, localizedContentRoot(locale));
  return document
    ? { title: `${document.title} | Auto Quant Econ`, description: document.summary }
    : {};
}

export default async function ModuleFamilyPage(_props: {
  params: Promise<{ locale: string; family: string }>;
}) {
  const { family, locale: localeValue } = await _props.params;
  const locale = parseLocale(localeValue);
  const parsed = familyIdSchema.safeParse(family);
  if (!parsed.success || !locale) notFound();

  const root = localizedContentRoot(locale);
  const document = await getModuleFamily(parsed.data, root);
  if (!document) notFound();
  const detailedSpecifications = await readSpecifications(parsed.data, root);
  const detailedIds = new Set(detailedSpecifications.map(({ id }) => id));
  const renderedBody = await MdxContent({ source: document.body });

  return (
    <ArticleShell
      eyebrow={`Module ${document.moduleNumber}`}
      title={document.title}
      lead={document.summary}
      meta={
        <>
          <Link href={`/${locale}/modules/`}>{locale === "en" ? "All modules" : "全部模块"}</Link>
          <span aria-hidden="true"> · </span>
          <span>Baseline: {document.baseline}</span>
        </>
      }
    >
      <h2>{ui[locale].specifications}</h2>
      <div className="specification-grid">
        {document.specifications.map((specification) => (
          <SpecificationCard
            id={specification.id}
            href={
              detailedIds.has(specification.id)
                ? `/${locale}/modules/${document.id}/${specification.id.split(".").at(-1)}/`
                : undefined
            }
            key={specification.id}
            mechanism={specification.mechanism}
            summary={specification.summary}
            title={specification.title}
          />
        ))}
      </div>
      {renderedBody}
    </ArticleShell>
  );
}
