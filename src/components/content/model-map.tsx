import Link from "next/link";
import { familyIds } from "@/lib/content/schema";
import type { ModelEntry } from "@/lib/content/types";

const familyLabels: Record<(typeof familyIds)[number], string> = {
  preferences: "Preferences",
  production: "Production Technology",
  "commodity-trade": "Commodity Trade",
  "idea-flows": "Technology for Idea Flows",
  migration: "Migration",
  endowments: "Endowments",
  equilibrium: "Equilibrium",
};

export function ModelMap({
  entries,
  titles,
}: {
  entries: Record<(typeof familyIds)[number], ModelEntry>;
  titles: Record<string, string>;
}) {
  return (
    <div className="model-map">
      {familyIds.map((family, index) => {
        const entry = entries[family];
        return (
          <div className="model-map-row" key={family}>
            <p className="model-map-family">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {familyLabels[family]}
            </p>
            {entry.kind === "linked" ? (
              <Link
                href={`/modules/${family}/${entry.specificationId.split(".").at(-1)}`}
              >
                {titles[entry.specificationId] ?? entry.specificationId}
              </Link>
            ) : (
              <p className="model-map-note">{entry.note}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
