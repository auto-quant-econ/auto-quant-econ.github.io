import Link from "next/link";
import { familyIds } from "@/lib/content/schema";
import type { ModelEntry } from "@/lib/content/types";
import type { Locale } from "@/lib/content/types";

const familyLabels: Record<(typeof familyIds)[number], string> = {
  preferences: "Preferences",
  production: "Production Technology",
  "commodity-trade": "Commodity Trade",
  "idea-flows": "Technology for Idea Flows",
  migration: "Migration",
  endowments: "Endowments",
  equilibrium: "Equilibrium",
};

const chineseFamilyLabels: typeof familyLabels = {
  preferences: "偏好",
  production: "生产技术",
  "commodity-trade": "商品贸易",
  "idea-flows": "思想与技术流动",
  migration: "迁移",
  endowments: "禀赋",
  equilibrium: "均衡",
};

export function ModelMap({
  entries,
  titles,
  locale = "en",
}: {
  entries: Record<(typeof familyIds)[number], ModelEntry>;
  titles: Record<string, string>;
  locale?: Locale;
}) {
  const labels = locale === "en" ? familyLabels : chineseFamilyLabels;
  return (
    <div className="model-map">
      {familyIds.map((family, index) => {
        const entry = entries[family];
        return (
          <div className="model-map-row" key={family}>
            <p className="model-map-family">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {labels[family]}
            </p>
            {entry.kind === "linked" ? (
              <Link
                href={`/${locale}/modules/${family}/${entry.specificationId.split(".").at(-1)}/`}
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
