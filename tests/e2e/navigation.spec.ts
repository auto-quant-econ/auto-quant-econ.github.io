import { expect, test } from "@playwright/test";

test("navigates the module and literature knowledge paths", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore the modules" }).click();
  await page.getByRole("link", { name: "Module 5: Migration" }).click();
  await page.getByRole("link", { name: "Static Destination Choice" }).click();
  await expect(
    page.getByRole("heading", { name: "Static Destination Choice" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Literature" }).click();
  await page
    .getByRole("link", { name: /Global Rebalancing with Gravity/i })
    .click();
  await expect(page.getByRole("heading", { name: "Model Map" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Eaton–Kortum Sourcing" }),
  ).toBeVisible();
});

test("explains the reviewed contribution workflow", async ({ page }) => {
  await page.goto("/contribute/");

  await expect(
    page.getByRole("heading", { name: "Contribute through review" }),
  ).toBeVisible();
  await expect(page.getByText("Issue → Branch → Pull Request")).toBeVisible();
});
