import fs from "node:fs/promises";
import path from "node:path";

const seedPath = process.argv[2] || "data/supplement-catalog.seed.json";
const allowedSourceStatuses = new Set(["package_verified", "website_sourced", "needs_review"]);

function fail(errors) {
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

const seed = JSON.parse(await fs.readFile(path.resolve(seedPath), "utf8"));
const errors = [];
const supplementIds = new Set();
const sourceIds = new Set();

for (const source of seed.sources || []) {
  if (!isNonEmptyString(source.id)) errors.push("Every source needs an id.");
  if (sourceIds.has(source.id)) errors.push(`Duplicate source id: ${source.id}`);
  sourceIds.add(source.id);
  if (!["package_photo", "official_page"].includes(source.type)) errors.push(`Invalid source type for ${source.id}.`);
  if (source.type === "package_photo" && !isNonEmptyString(source.filename)) errors.push(`Package source ${source.id} needs a filename.`);
  if (source.type === "official_page" && !isNonEmptyString(source.url)) errors.push(`Official source ${source.id} needs a URL.`);
  if (!isNonEmptyString(source.captureDate)) errors.push(`Source ${source.id} needs a captureDate.`);
}

for (const supplement of seed.supplements || []) {
  if (!isNonEmptyString(supplement.id)) errors.push("Every supplement needs an id.");
  if (supplementIds.has(supplement.id)) errors.push(`Duplicate supplement id: ${supplement.id}`);
  supplementIds.add(supplement.id);
  if (!isNonEmptyString(supplement.name)) errors.push(`Supplement ${supplement.id} needs a name.`);
  if (!Array.isArray(supplement.aliases)) errors.push(`Supplement ${supplement.id} aliases must be an array.`);
  if (!Array.isArray(supplement.categories) || supplement.categories.length === 0) errors.push(`Supplement ${supplement.id} needs categories.`);
  if (!allowedSourceStatuses.has(supplement.sourceStatus)) errors.push(`Supplement ${supplement.id} has invalid sourceStatus.`);
  if (!supplement.recommendedDailyAmount || typeof supplement.recommendedDailyAmount !== "object") {
    errors.push(`Supplement ${supplement.id} needs recommendedDailyAmount.`);
  } else if (!isNonEmptyString(supplement.recommendedDailyAmount.basis) || !isNonEmptyString(supplement.recommendedDailyAmount.source)) {
    errors.push(`Supplement ${supplement.id} recommendedDailyAmount needs basis and source.`);
  }
}

for (const product of seed.supplementProducts || []) {
  if (!isNonEmptyString(product.id)) errors.push("Every supplement product needs an id.");
  if (!isNonEmptyString(product.name)) errors.push(`Product ${product.id} needs a name.`);
  if (!isNonEmptyString(product.provider)) errors.push(`Product ${product.id} needs a provider.`);
  if (!isNonEmptyString(product.productType)) errors.push(`Product ${product.id} needs a productType.`);
  if (!Array.isArray(product.categories) || product.categories.length === 0) errors.push(`Product ${product.id} needs categories.`);
  if (!allowedSourceStatuses.has(product.sourceStatus)) errors.push(`Product ${product.id} has invalid sourceStatus.`);
  if (!Array.isArray(product.ingredients) || product.ingredients.length === 0) errors.push(`Product ${product.id} needs ingredients.`);
  if (!Array.isArray(product.contains)) errors.push(`Product ${product.id} contains must be an array.`);
  if (!Array.isArray(product.sources) || product.sources.length === 0) errors.push(`Product ${product.id} needs sources.`);

  for (const sourceId of product.sources || []) {
    if (!sourceIds.has(sourceId)) errors.push(`Product ${product.id} references missing source ${sourceId}.`);
  }

  for (const ingredient of product.ingredients || []) {
    if (!supplementIds.has(ingredient.supplementId)) errors.push(`Product ${product.id} references missing supplement ${ingredient.supplementId}.`);
    if (!product.contains.includes(ingredient.supplementId)) errors.push(`Product ${product.id} ingredient ${ingredient.supplementId} is missing from contains.`);
    if (ingredient.amount === undefined) errors.push(`Product ${product.id} ingredient ${ingredient.supplementId} needs amount, even if null.`);
    if (!isNonEmptyString(ingredient.unit)) errors.push(`Product ${product.id} ingredient ${ingredient.supplementId} needs unit.`);
    if (!isNonEmptyString(ingredient.perServing)) errors.push(`Product ${product.id} ingredient ${ingredient.supplementId} needs perServing.`);
    if (!Array.isArray(ingredient.sourceIds) || ingredient.sourceIds.length === 0) errors.push(`Product ${product.id} ingredient ${ingredient.supplementId} needs sourceIds.`);
    for (const sourceId of ingredient.sourceIds || []) {
      if (!sourceIds.has(sourceId)) errors.push(`Product ${product.id} ingredient ${ingredient.supplementId} references missing source ${sourceId}.`);
    }
    if (ingredient.amount === null && product.sourceStatus !== "needs_review") {
      errors.push(`Product ${product.id} has a null ingredient amount but is not marked needs_review.`);
    }
  }
}

if (errors.length > 0) fail(errors);

console.log(`Validated ${seed.supplements.length} supplements, ${seed.supplementProducts.length} products, and ${seed.sources.length} sources.`);
