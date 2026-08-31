import { expect, test } from "@playwright/test";

test("navigates the module and literature knowledge paths", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en\/$/);
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
  await page.goto("/en/contribute/");

  await expect(
    page.getByRole("heading", { name: "Contribute through review" }),
  ).toBeVisible();
  await expect(page.getByText("Issue → Branch → Pull Request")).toBeVisible();
});

test("switches language without leaving the current module", async ({ page }) => {
  await page.goto("/en/modules/migration/");
  await page.getByRole("link", { name: "中文" }).click();
  await expect(page).toHaveURL(/\/zh\/modules\/migration\/$/);
  await expect(page.getByRole("heading", { name: "迁移", exact: true })).toBeVisible();
  await expect(page.getByText("静态目的地选择", { exact: true }).first()).toBeVisible();
});
