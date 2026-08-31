import { describe, expect, test } from "vitest";
import { localizedPath, parseLocale } from "./i18n";

describe("locale routing", () => {
  test("replaces the locale while preserving the current route", () => {
    expect(localizedPath("zh", "/en/modules/migration/")).toBe(
      "/zh/modules/migration/",
    );
    expect(localizedPath("en", "/zh/literature/paper/")).toBe(
      "/en/literature/paper/",
    );
  });

  test("accepts only supported locale segments", () => {
    expect(parseLocale("en")).toBe("en");
    expect(parseLocale("zh")).toBe("zh");
    expect(parseLocale("fr")).toBeUndefined();
  });
});
