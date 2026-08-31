import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { SiteSidebar } from "./site-sidebar";

const families = [
  "preferences", "production", "commodity-trade", "idea-flows",
  "migration", "endowments", "equilibrium",
].map((id, index) => ({
  id,
  title: id === "migration" ? "Migration" : id,
  moduleNumber: index + 1,
  specifications: id === "migration" ? [{
    id: "migration.static-destination-choice",
    title: "Static Destination Choice",
    hasPage: true,
  }] : [],
}));

test("keeps every global destination and module in the left sidebar", () => {
  render(
    <SiteSidebar
      collapsed={false}
      families={families}
      locale="en"
      mobileOpen={true}
      onCollapse={vi.fn()}
      onMobileClose={vi.fn()}
      pathname="/en/modules/migration/"
    />,
  );

  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en");
  expect(screen.getByRole("link", { name: "Literature" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contribute" })).toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: /module/i })).toHaveLength(7);
  expect(screen.getByRole("button", { name: /module 5.*migration/i })).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: "Static Destination Choice" })).toHaveAttribute("href", "/en/modules/migration/static-destination-choice");
  expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh/modules/migration");
});
