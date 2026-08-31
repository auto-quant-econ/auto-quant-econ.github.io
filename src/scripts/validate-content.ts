import {
  readLocalizedContent,
  readReferences,
  validateContentGraph,
  validateLocaleParity,
} from "../lib/content/loader";

const [english, chinese, references] = await Promise.all([
  readLocalizedContent("en"),
  readLocalizedContent("zh"),
  readReferences(),
]);

validateContentGraph({ ...english, references });
validateContentGraph({ ...chinese, references });
validateLocaleParity(english, chinese);

console.log(
  `Validated bilingual parity for ${english.families.length} families, ${english.specifications.length} specifications, ${english.papers.length} papers, and ${references.length} references.`,
);
