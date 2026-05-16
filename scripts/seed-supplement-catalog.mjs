import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const seedPath = process.argv[2] || "data/supplement-catalog.seed.json";
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

await putAll(supplementsTable, seed.supplements);
await putAll(productsTable, seed.supplementProducts);

console.log(`Seeded ${seed.supplements.length} supplements into ${supplementsTable}.`);
console.log(`Seeded ${seed.supplementProducts.length} products into ${productsTable}.`);
