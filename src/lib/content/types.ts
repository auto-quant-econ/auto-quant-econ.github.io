import type { z } from "zod";
import type {
  familyIdSchema,
  localeSchema,
  modelEntrySchema,
  moduleFamilySchema,
  paperSchema,
  referenceSchema,
  specificationSchema,
} from "./schema";

export type FamilyId = z.infer<typeof familyIdSchema>;
export type Locale = z.infer<typeof localeSchema>;
export type ModuleFamilyMetadata = z.infer<typeof moduleFamilySchema>;
export type SpecificationMetadata = z.infer<typeof specificationSchema>;
export type PaperMetadata = z.infer<typeof paperSchema>;
export type ModelEntry = z.infer<typeof modelEntrySchema>;
export type Reference = z.infer<typeof referenceSchema>;

export type ContentDocument<T> = T & {
  sourcePath: string;
  body: string;
};

export type ModuleFamilyDocument = ContentDocument<ModuleFamilyMetadata>;
export type SpecificationDocument = ContentDocument<SpecificationMetadata>;
export type PaperDocument = ContentDocument<PaperMetadata>;

export type LocalizedContent = {
  families: ModuleFamilyDocument[];
  specifications: SpecificationDocument[];
  papers: PaperDocument[];
};
