import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { localizedContentRoot, readModuleFamilies, readSpecifications } from "@/lib/content/loader";
import { locales } from "@/lib/content/schema";
import { parseLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  const root = localizedContentRoot(locale);
  const families = await readModuleFamilies(root);
  const sidebarFamilies = await Promise.all(families.map(async (family) => {
    const detailIds = new Set((await readSpecifications(family.id, root)).map(({ id }) => id));
    return {
      id: family.id,
      title: family.title,
      moduleNumber: family.moduleNumber,
      specifications: family.specifications.map(({ id, title }) => ({ id, title, hasPage: detailIds.has(id) })),
    };
  }));
  return <SiteShell locale={locale} families={sidebarFamilies}>{children}</SiteShell>;
}
