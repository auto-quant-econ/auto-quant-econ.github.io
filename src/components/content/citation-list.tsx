import type { Reference } from "@/lib/content/types";

export function CitationList({ references }: { references: Reference[] }) {
  return (
    <ol className="citation-list">
      {references.map((reference) => (
        <li id={`reference-${reference.id}`} key={reference.id}>
          {reference.url ? (
            <a href={reference.url} rel="noreferrer" target="_blank">
              {reference.citation}
            </a>
          ) : (
            reference.citation
          )}
        </li>
      ))}
    </ol>
  );
}
