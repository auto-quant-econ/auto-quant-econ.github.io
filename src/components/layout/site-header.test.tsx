import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SiteHeader } from "./site-header";

test("provides stable primary navigation", () => {
  render(<SiteHeader />);

  expect(screen.getByRole("link", { name: "Auto Quant Econ" })).toHaveAttribute(
    "href",
    "/",
  );
  expect(screen.getByRole("link", { name: "Modules" })).toHaveAttribute(
    "href",
    "/modules",
  );
  expect(screen.getByRole("link", { name: "Literature" })).toHaveAttribute(
    "href",
    "/literature",
  );
  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/about",
  );
  expect(screen.getByRole("link", { name: "Contribute" })).toHaveAttribute(
    "href",
    "/contribute",
  );
});
