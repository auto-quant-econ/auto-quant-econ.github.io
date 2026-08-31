import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import {
  readModuleFamilies,
  readSpecifications,
  validateContentGraph,
} from "./loader";

const temporaryRoots: string[] = [];

async function createRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "auto-quant-econ-content-"));
  temporaryRoots.push(root);
  return root;
}

async function writeMdx(root: string, relativePath: string, body: string) {
  const target = path.join(root, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body, "utf8");
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true })),
  );
});

describe("content loaders", () => {
  test("sorts module families by module number", async () => {
    const root = await createRoot();
    await writeMdx(
      root,
      "modules/migration/index.mdx",
      `---\nid: migration\ntitle: Migration\nmoduleNumber: 5\nsummary: Worker location choice.\nstatus: published\nbaseline: Static choice\nspecifications: []\n---\nMigration text.`,
    );
    await writeMdx(
      root,
      "modules/preferences/index.mdx",
      `---\nid: preferences\ntitle: Preferences\nmoduleNumber: 1\nsummary: Household demand and welfare.\nstatus: published\nbaseline: CES demand\nspecifications: []\n---\nPreferences text.`,
    );

    const families = await readModuleFamilies(root);

    expect(families.map(({ id }) => id)).toEqual([
      "preferences",
      "migration",
    ]);
  });

  test("loads specifications only from the selected family", async () => {
    const root = await createRoot();
    await writeMdx(
      root,
      "modules/migration/specifications/static-choice.mdx",
      `---\nid: migration.static-choice\nfamily: migration\ntitle: Static Choice\nsummary: One-period location choice.\nstatus: published\norder: 1\nreferences: []\nrelatedSpecifications: []\n---\nText.`,
    );
    await writeMdx(
      root,
      "modules/preferences/specifications/ces.mdx",
      `---\nid: preferences.ces\nfamily: preferences\ntitle: CES\nsummary: CES demand.\nstatus: published\norder: 1\nreferences: []\nrelatedSpecifications: []\n---\nText.`,
    );

    const specifications = await readSpecifications("migration", root);

    expect(specifications.map(({ id }) => id)).toEqual([
      "migration.static-choice",
    ]);
  });

  test("reports the source path for malformed front matter", async () => {
    const root = await createRoot();
    await writeMdx(
      root,
      "modules/migration/index.mdx",
      `---\nid: migration\ntitle: Migration\n---\nText.`,
    );

    await expect(readModuleFamilies(root)).rejects.toThrow(
      /modules[\\/]migration[\\/]index\.mdx/i,
    );
  });

  test("rejects references to unknown specifications", () => {
    expect(() =>
      validateContentGraph({
        specifications: [
          {
            id: "migration.static-choice",
            family: "migration",
            title: "Static Choice",
            summary: "One-period location choice.",
            status: "published",
            order: 1,
            references: [],
            relatedSpecifications: ["migration.missing"],
            sourcePath: "static-choice.mdx",
            body: "Text.",
          },
        ],
        papers: [],
      }),
    ).toThrow(/unknown specification: migration\.missing/i);
  });
});
