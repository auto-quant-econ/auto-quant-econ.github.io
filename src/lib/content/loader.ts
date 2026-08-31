import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import {
  moduleFamilySchema,
  paperSchema,
  referenceSchema,
  specificationSchema,
  validateUniqueIds,
} from "./schema";
import type {
  FamilyId,
  Locale,
  LocalizedContent,
  ModuleFamilyDocument,
  PaperDocument,
  Reference,
  SpecificationDocument,
} from "./types";

export const defaultContentRoot = path.join(process.cwd(), "content");

export function localizedContentRoot(
  locale: Locale,
  root = defaultContentRoot,
) {
  return path.join(root, locale);
}

async function parseDocument<T>(
  sourcePath: string,
  schema: z.ZodType<T>,
): Promise<T & { sourcePath: string; body: string }> {
  const source = await readFile(sourcePath, "utf8");
  const parsed = matter(source);
  const result = schema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(
      `Invalid front matter in ${sourcePath}: ${result.error.message}`,
    );
  }
  return { ...result.data, sourcePath, body: parsed.content.trim() };
}

async function listMdxFiles(directory: string) {
  try {
    return (await readdir(directory, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => path.join(directory, entry.name))
      .sort();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function readModuleFamilies(
  root = defaultContentRoot,
): Promise<ModuleFamilyDocument[]> {
  const modulesRoot = path.join(root, "modules");
  let entries;
  try {
    entries = await readdir(modulesRoot, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const documents = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) =>
        parseDocument(
          path.join(modulesRoot, entry.name, "index.mdx"),
          moduleFamilySchema,
        ),
      ),
  );
  validateUniqueIds(documents);
  return documents.sort((a, b) => a.moduleNumber - b.moduleNumber);
}

export async function readSpecifications(
  family: FamilyId,
  root = defaultContentRoot,
): Promise<SpecificationDocument[]> {
  const files = await listMdxFiles(
    path.join(root, "modules", family, "specifications"),
  );
  const documents = await Promise.all(
    files.map((file) => parseDocument(file, specificationSchema)),
  );
  validateUniqueIds(documents);
  return documents.sort((a, b) => a.order - b.order);
}

export async function readAllSpecifications(root = defaultContentRoot) {
  const families = await readModuleFamilies(root);
  return (
    await Promise.all(
      families.map(({ id }) => readSpecifications(id, root)),
    )
  ).flat();
}

export async function readPapers(
  root = defaultContentRoot,
): Promise<PaperDocument[]> {
  const files = await listMdxFiles(path.join(root, "literature"));
  const documents = await Promise.all(
    files.map((file) => parseDocument(file, paperSchema)),
  );
  validateUniqueIds(documents);
  return documents.sort((a, b) => b.year - a.year);
}

export async function readReferences(
  root = defaultContentRoot,
): Promise<Reference[]> {
  const sourcePath = path.join(root, "references", "references.json");
  const source = await readFile(sourcePath, "utf8");
  const result = referenceSchema.array().safeParse(JSON.parse(source));
  if (!result.success) {
    throw new Error(
      `Invalid references in ${sourcePath}: ${result.error.message}`,
    );
  }
  validateUniqueIds(result.data);
  return result.data;
}

export async function getModuleFamily(
  family: FamilyId,
  root = defaultContentRoot,
) {
  return (await readModuleFamilies(root)).find(({ id }) => id === family);
}

export async function getSpecification(
  family: FamilyId,
  specificationSlug: string,
  root = defaultContentRoot,
) {
  return (await readSpecifications(family, root)).find(
    ({ id }) => id.split(".").at(-1) === specificationSlug,
  );
}

export async function getPaper(paperId: string, root = defaultContentRoot) {
  return (await readPapers(root)).find(({ id }) => id === paperId);
}

export function validateContentGraph({
  specifications,
  papers,
  references,
}: {
  specifications: SpecificationDocument[];
  papers: PaperDocument[];
  references: Reference[];
}) {
  validateUniqueIds(specifications);
  validateUniqueIds(papers);
  validateUniqueIds(references);
  const specificationIds = new Set(specifications.map(({ id }) => id));
  const referenceIds = new Set(references.map(({ id }) => id));
  for (const specification of specifications) {
    for (const relatedId of specification.relatedSpecifications) {
      if (!specificationIds.has(relatedId)) {
        throw new Error(`Unknown specification: ${relatedId}`);
      }
    }
    for (const referenceId of specification.references) {
      if (!referenceIds.has(referenceId)) {
        throw new Error(`Unknown reference: ${referenceId}`);
      }
    }
  }
  for (const paper of papers) {
    for (const entry of Object.values(paper.modelMap)) {
      if (
        entry.kind === "linked" &&
        !specificationIds.has(entry.specificationId)
      ) {
        throw new Error(`Unknown specification: ${entry.specificationId}`);
      }
    }
    for (const referenceId of paper.references) {
      if (!referenceIds.has(referenceId)) {
        throw new Error(`Unknown reference: ${referenceId}`);
      }
    }
  }
}

function parityShape(content: LocalizedContent) {
  return {
    families: content.families.map((family) => ({
      id: family.id,
      moduleNumber: family.moduleNumber,
      specifications: family.specifications.map(({ id }) => id),
    })),
    specifications: content.specifications.map((specification) => ({
      id: specification.id,
      family: specification.family,
      order: specification.order,
      references: specification.references,
      relatedSpecifications: specification.relatedSpecifications,
    })),
    papers: content.papers.map((paper) => ({
      id: paper.id,
      year: paper.year,
      modelMap: Object.fromEntries(
        Object.entries(paper.modelMap).map(([family, entry]) => [
          family,
          entry.kind === "linked"
            ? { kind: entry.kind, specificationId: entry.specificationId }
            : { kind: entry.kind },
        ]),
      ),
      references: paper.references,
    })),
  };
}

export function validateLocaleParity(
  english: LocalizedContent,
  chinese: LocalizedContent,
) {
  const enShape = parityShape(english);
  const zhShape = parityShape(chinese);
  if (JSON.stringify(enShape) === JSON.stringify(zhShape)) return;

  const enIds = [
    ...enShape.families.map(({ id }) => id),
    ...enShape.specifications.map(({ id }) => id),
    ...enShape.papers.map(({ id }) => id),
  ];
  const zhIds = new Set([
    ...zhShape.families.map(({ id }) => id),
    ...zhShape.specifications.map(({ id }) => id),
    ...zhShape.papers.map(({ id }) => id),
  ]);
  const missing = enIds.find((id) => !zhIds.has(id));
  throw new Error(
    `Locale parity mismatch${missing ? `: ${missing}` : ": structural metadata differs"}`,
  );
}

export async function readLocalizedContent(
  locale: Locale,
  root = defaultContentRoot,
): Promise<LocalizedContent> {
  const localeRoot = localizedContentRoot(locale, root);
  const families = await readModuleFamilies(localeRoot);
  const specifications = await readAllSpecifications(localeRoot);
  const papers = await readPapers(localeRoot);
  return { families, specifications, papers };
}
