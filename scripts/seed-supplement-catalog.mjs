import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const args = process.argv.slice(2);
const optionsWithValues = new Set(["--product", "--supplement"]);
const optionValue = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
};
const seedPath = args.find((arg, index) => !arg.startsWith("--") && !optionsWithValues.has(args[index - 1])) || "data/supplement-catalog.seed.json";
const selectedProductId = optionValue("--product");
const selectedSupplementId = optionValue("--supplement");

if (args.includes("--product") && !selectedProductId) throw new Error("--product requires a product id.");
if (args.includes("--supplement") && !selectedSupplementId) throw new Error("--supplement requires a supplement id.");
if (selectedProductId && selectedSupplementId) throw new Error("Seed either one product or one supplement at a time.");
const supplementsTable = process.env.SUPPLEMENTS_TABLE || "my-superfood-supplements";
const productsTable = process.env.SUPPLEMENT_PRODUCTS_TABLE || "my-superfood-supplement-products";
const region = process.env.AWS_REGION || "eu-central-1";
const run = promisify(execFile);

function itemForRecord(record) {
  const now = new Date().toISOString();
  return {
    id: { S: record.id },
    name: { S: record.name },
    sourceStatus: { S: record.sourceStatus },
    document: { S: JSON.stringify(record) },
    updatedAt: { S: now },
  };
}

async function putAll(tableName, records) {
  for (const record of records) {
    await run("aws", [
      "dynamodb",
      "put-item",
      "--table-name",
      tableName,
      "--item",
      JSON.stringify(itemForRecord(record)),
      "--region",
      region,
    ]);
  }
}

const seed = JSON.parse(await fs.readFile(path.resolve(seedPath), "utf8"));
const supplements = selectedSupplementId
  ? seed.supplements.filter((record) => record.id === selectedSupplementId)
  : selectedProductId
    ? []
    : seed.supplements;
const products = selectedProductId
  ? seed.supplementProducts.filter((record) => record.id === selectedProductId)
  : selectedSupplementId
    ? []
    : seed.supplementProducts;

if (selectedSupplementId && supplements.length === 0) {
  throw new Error(`Supplement not found in seed: ${selectedSupplementId}`);
}
if (selectedProductId && products.length === 0) {
  throw new Error(`Product not found in seed: ${selectedProductId}`);
}

await putAll(supplementsTable, supplements);
await putAll(productsTable, products);

console.log(`Seeded ${supplements.length} supplements into ${supplementsTable}.`);
console.log(`Seeded ${products.length} products into ${productsTable}.`);
