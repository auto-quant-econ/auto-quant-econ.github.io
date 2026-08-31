import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/page";

test("introduces quantitative spatial models as components", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      name: /quantitative spatial models, built from components/i,
    }),
  ).toBeInTheDocument();
});
