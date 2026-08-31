import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { AcademicLink, Note } from "./mdx-components";

test("marks external academic links without changing internal navigation", () => {
  const { rerender } = render(
    <AcademicLink href="https://example.org/paper">Paper</AcademicLink>,
  );
  expect(screen.getByRole("link", { name: "Paper" })).toHaveAttribute(
    "rel",
    "noreferrer",
  );

  rerender(<AcademicLink href="/modules">Modules</AcademicLink>);
  expect(screen.getByRole("link", { name: "Modules" })).not.toHaveAttribute(
    "target",
  );
});

test("renders notes as labelled complementary material", () => {
  render(<Note title="Interpretation">Economic meaning.</Note>);

  expect(
    screen.getByRole("complementary", { name: "Interpretation" }),
  ).toHaveTextContent("Economic meaning.");
});
