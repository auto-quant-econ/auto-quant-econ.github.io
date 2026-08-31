import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LiteraturePage from "./page";
import PaperPage from "./[paper]/page";

describe("literature routes", () => {
  test("lists papers with authors and year", async () => {
    render(await LiteraturePage());

    expect(
      screen.getByRole("link", {
        name: /global rebalancing with gravity/i,
      }),
    ).toHaveAttribute("href", "/literature/dekle-eaton-kortum-2008");
    expect(
      screen.getByText(/Dekle, Eaton, and Kortum · 2008/i),
    ).toBeInTheDocument();
  });

  test("maps a paper across all seven module families", async () => {
    render(
      await PaperPage({
        params: Promise.resolve({ paper: "dekle-eaton-kortum-2008" }),
      }),
    );

    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Production Technology")).toBeInTheDocument();
    expect(screen.getByText("Commodity Trade")).toBeInTheDocument();
    expect(screen.getByText("Technology for Idea Flows")).toBeInTheDocument();
    expect(screen.getByText("Migration")).toBeInTheDocument();
    expect(screen.getByText("Endowments")).toBeInTheDocument();
    expect(screen.getByText("Equilibrium")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Eaton–Kortum Sourcing" }),
    ).toHaveAttribute("href", "/modules/commodity-trade/eaton-kortum");
    expect(
      screen.getByText("International labor mobility is not modeled."),
    ).toBeInTheDocument();
  });
});
