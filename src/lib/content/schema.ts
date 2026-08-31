import { z } from "zod";

export const familyIds = [
  "preferences",
  "production",
  "commodity-trade",
  "idea-flows",
  "migration",
  "endowments",
  "equilibrium",
] as const;

export const locales = ["en", "zh"] as const;
export const localeSchema = z.enum(locales);

export const familyIdSchema = z.enum(familyIds);
export const contentStatusSchema = z.enum(["draft", "reviewed", "published"]);

const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "Invalid stable identifier");

export const specificationSummarySchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  mechanism: z.string().min(1),
});

export const moduleFamilySchema = z.object({
  id: familyIdSchema,
  title: z.string().min(1),
  moduleNumber: z.number().int().min(1).max(7),
  summary: z.string().min(1),
  status: contentStatusSchema,
  baseline: z.string().min(1),
  specifications: z.array(specificationSummarySchema),
});

export const specificationSchema = z.object({
  id: stableIdSchema,
  family: familyIdSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  status: contentStatusSchema,
  order: z.number().int().nonnegative(),
  references: z.array(stableIdSchema),
  relatedSpecifications: z.array(stableIdSchema),
});

const linkedModelEntrySchema = z.object({
  kind: z.literal("linked"),
  specificationId: stableIdSchema,
});

const absentModelEntrySchema = z.object({
  kind: z.literal("not-applicable"),
  note: z.string().min(1),
});

export const modelEntrySchema = z.discriminatedUnion("kind", [
  linkedModelEntrySchema,
  absentModelEntrySchema,
]);

export const modelMapSchema = z.object({
  preferences: modelEntrySchema,
  production: modelEntrySchema,
  "commodity-trade": modelEntrySchema,
  "idea-flows": modelEntrySchema,
  migration: modelEntrySchema,
  endowments: modelEntrySchema,
  equilibrium: modelEntrySchema,
});

export const paperSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  authors: z.array(z.string().min(1)).min(1),
  year: z.number().int().min(1900).max(2100),
  status: contentStatusSchema,
  citation: z.string().min(1),
  modelMap: modelMapSchema,
  references: z.array(stableIdSchema),
});

export const referenceSchema = z.object({
  id: stableIdSchema,
  citation: z.string().min(1),
  title: z.string().min(1),
  authors: z.array(z.string().min(1)).min(1),
  year: z.number().int().min(1900).max(2100),
  url: z.url().optional(),
  codeUrl: z.url().optional(),
});

export function validateUniqueIds(records: Array<{ id: string }>) {
  const ids = new Set<string>();
  for (const record of records) {
    if (ids.has(record.id)) {
      throw new Error(`Duplicate content ID: ${record.id}`);
    }
    ids.add(record.id);
  }
}
