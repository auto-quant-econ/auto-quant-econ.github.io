import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/[locale]/page";

test("introduces quantitative spatial models as components", async () => {
  render(await HomePage({ params: Promise.resolve({ locale: "en" }) }));

  expect(
    screen.getByRole("heading", {
      name: /quantitative spatial models, built from components/i,
    }),
  ).toBeInTheDocument();
});
