import { describe, expect, test } from "vitest";
import {
  moduleFamilySchema,
  paperSchema,
  validateUniqueIds,
} from "./schema";

const validFamily = {
  id: "migration",
  title: "Migration",
  moduleNumber: 5,
  summary: "How workers choose where to live and work.",
  status: "published",
  baseline: "Static destination choice",
  specifications: [
    {
      id: "migration.static-destination-choice",
      title: "Static Destination Choice",
      summary: "Workers choose among locations in a single period.",
      mechanism: "Location utility and idiosyncratic preferences",
    },
  ],
};

describe("content schemas", () => {
  test("accepts a complete module family", () => {
    expect(() => moduleFamilySchema.parse(validFamily)).not.toThrow();
  });

  test("rejects an unknown module family", () => {
    expect(() =>
      moduleFamilySchema.parse({ ...validFamily, id: "unknown" }),
    ).toThrow();
  });

  test("rejects duplicate stable identifiers", () => {
    expect(() => validateUniqueIds([{ id: "x" }, { id: "x" }])).toThrow(
      /duplicate content id: x/i,
    );
  });

  test("requires a paper to map all seven module families", () => {
    const paper = {
      id: "dekle-eaton-kortum-2008",
      title: "Global Rebalancing with Gravity",
      authors: ["Robert Dekle", "Jonathan Eaton", "Samuel Kortum"],
      year: 2008,
      status: "published",
      citation: "Dekle, Eaton, and Kortum (2008).",
      modelMap: {
        preferences: {
          kind: "linked",
          specificationId: "preferences.ces",
        },
        production: {
          kind: "linked",
          specificationId: "production.eaton-kortum",
        },
        "commodity-trade": {
          kind: "linked",
          specificationId: "commodity-trade.iceberg",
        },
        "idea-flows": {
          kind: "not-applicable",
          note: "Technology is exogenous in the counterfactual exercise.",
        },
        migration: {
          kind: "not-applicable",
          note: "International labor mobility is not modeled.",
        },
        endowments: {
          kind: "linked",
          specificationId: "endowments.fixed-factors",
        },
        equilibrium: {
          kind: "linked",
          specificationId: "equilibrium.trade-deficits",
        },
      },
      references: ["dekle-eaton-kortum-2008"],
    };

    expect(() => paperSchema.parse(paper)).not.toThrow();
    const incompleteMap = Object.fromEntries(
      Object.entries(paper.modelMap).filter(([key]) => key !== "equilibrium"),
    );
    expect(() =>
      paperSchema.parse({ ...paper, modelMap: incompleteMap }),
    ).toThrow();
  });
});
