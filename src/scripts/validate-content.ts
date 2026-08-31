import {
  readAllSpecifications,
  readPapers,
  readReferences,
  validateContentGraph,
} from "../lib/content/loader";

const [specifications, papers, references] = await Promise.all([
  readAllSpecifications(),
  readPapers(),
  readReferences(),
]);

validateContentGraph({ specifications, papers, references });

console.log(
  `Validated ${specifications.length} specifications, ${papers.length} papers, and ${references.length} references.`,
);
