import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ModulesPage from "./page";
import ModuleFamilyPage from "./[family]/page";
import SpecificationPage from "./[family]/[specification]/page";

describe("module knowledge routes", () => {
  test("lists the seven numbered module families", async () => {
    render(await ModulesPage());

    expect(screen.getAllByRole("link", { name: /module \d/i })).toHaveLength(
      7,
    );
    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Equilibrium")).toBeInTheDocument();
  });

  test("presents the migration baseline and extension menu", async () => {
    render(
      await ModuleFamilyPage({
        params: Promise.resolve({ family: "migration" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "Static Destination Choice" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Bilateral Migration Costs")).toBeInTheDocument();
    expect(screen.getByText("Dynamic Migration")).toBeInTheDocument();
    expect(screen.getByText("Residence–Workplace Choice")).toBeInTheDocument();
    expect(screen.getByText("Worker Heterogeneity")).toBeInTheDocument();
    expect(screen.getByText("Transportation Congestion")).toBeInTheDocument();
  });

  test("uses the common specification article structure", async () => {
    render(
      await SpecificationPage({
        params: Promise.resolve({
          family: "migration",
          specification: "static-destination-choice",
        }),
      }),
    );

    for (const heading of [
      "Definition",
      "Assumptions",
      "Core Equations",
      "Economic Intuition",
      "Limitations",
      "Literature Lineage",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });
});
