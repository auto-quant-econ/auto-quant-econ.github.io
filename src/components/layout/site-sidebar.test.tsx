import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { SiteSidebar } from "./site-sidebar";

const families = [
  "preferences", "production", "commodity-trade", "idea-flows",
  "migration", "endowments", "equilibrium",
].map((id) => ({
  id,
  title: id === "migration" ? "Migration" : id,
  moduleNumber: 1,
  specifications: id === "migration" ? [{ id: "migration.static-destination-choice", title: "Static Destination Choice", hasPage: true }] : [],
}));

test("uses a uniform collapsible primary-menu hierarchy", () => {
  render(<SiteSidebar collapsed={false} families={families} locale="en" mobileOpen onCollapse={vi.fn()} onMobileClose={vi.fn()} pathname="/en/modules/migration/" />);

  expect(screen.getByText("AQE", { exact: true })).toBeVisible();

  for (const label of ["Modules", "Literature", "Build Model", "Simulation"]) {
    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  }
  expect(screen.queryByText("Model components")).not.toBeInTheDocument();
  expect(screen.queryByText("01")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Modules" })).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("button", { name: "Migration" })).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: "Static Destination Choice" })).toBeVisible();

  fireEvent.click(screen.getByRole("button", { name: "Modules" }));
  expect(screen.queryByRole("button", { name: "Migration" })).not.toBeInTheDocument();
});
