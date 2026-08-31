import { expect, test } from "vitest";
import { validateLocaleParity } from "./loader";

const family = {
  id: "migration" as const,
  title: "Migration",
  moduleNumber: 5,
  summary: "Worker location choice.",
  status: "published" as const,
  baseline: "Static choice",
  specifications: [
    {
      id: "migration.static-choice",
      title: "Static Choice",
      summary: "One-period choice.",
      mechanism: "Location utility",
    },
  ],
  sourcePath: "content/en/modules/migration/index.mdx",
  body: "English text",
};

test("accepts locale documents with matching structural metadata", () => {
  expect(() =>
    validateLocaleParity(
      { families: [family], specifications: [], papers: [] },
      {
        families: [
          {
            ...family,
            title: "迁移",
            summary: "劳动者区位选择。",
            baseline: "静态选择",
            body: "中文正文",
            sourcePath: "content/zh/modules/migration/index.mdx",
            specifications: [
              {
                ...family.specifications[0],
                title: "静态区位选择",
                summary: "单期选择。",
                mechanism: "区位效用",
              },
            ],
          },
        ],
        specifications: [],
        papers: [],
      },
    ),
  ).not.toThrow();
});

test("rejects a page that exists in only one language", () => {
  expect(() =>
    validateLocaleParity(
      { families: [family], specifications: [], papers: [] },
      { families: [], specifications: [], papers: [] },
    ),
  ).toThrow(/locale parity.*migration/i);
});
