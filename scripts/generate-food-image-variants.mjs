import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { foods } from "../assets/js/data/foods.mjs";

const run = promisify(execFile);
const variants = [
  { name: "landing", maxSize: 320, quality: "70" },
  { name: "catalog", maxSize: 640, quality: "78" },
];
const originalRoot = "assets/images/originals";
const outputRoot = "assets/images/optimized";

function uniqueFoodImages() {
  return [...new Set(foods.map((food) => food.image))].sort();
}

function optimizedPath(sourcePath, variant) {
  const fileName = `${basename(sourcePath, extname(sourcePath))}.jpg`;
  return join(outputRoot, variant.name, fileName);
}

async function ensureParent(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

async function copyOriginal(sourcePath) {
  const backupPath = join(originalRoot, sourcePath.replace(/^assets\/images\//, ""));
  await ensureParent(backupPath);
  try {
    await stat(backupPath);
  } catch {
    await copyFile(sourcePath, backupPath);
  }
}

async function makeVariant(sourcePath, variant) {
  const targetPath = optimizedPath(sourcePath, variant);
  await ensureParent(targetPath);
  await run("sips", [
    "-s",
    "format",
    "jpeg",
    "-s",
    "formatOptions",
    variant.quality,
    "-Z",
    String(variant.maxSize),
    sourcePath,
    "--out",
    targetPath,
  ]);
  return targetPath;
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: "assets/js/data/foods.mjs",
  ignoredOriginalBackup: originalRoot,
  variants: variants.map(({ name, maxSize, quality }) => ({ name, maxSize, format: "jpeg", quality })),
  images: [],
};

for (const sourcePath of uniqueFoodImages()) {
  await copyOriginal(sourcePath);
  const outputs = {};
  for (const variant of variants) {
    outputs[variant.name] = await makeVariant(sourcePath, variant);
  }
  manifest.images.push({ source: sourcePath, ...outputs });
}

await writeFile(join(outputRoot, "food-image-variants.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${manifest.images.length} food image variant sets.`);
