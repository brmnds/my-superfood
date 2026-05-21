import fs from "node:fs/promises";
import path from "node:path";

const seedPath = process.argv[2] || "data/supplement-catalog.seed.json";
const allowedSourceStatuses = new Set(["package_verified", "website_sourced", "needs_review"]);
const allowedSourceTypes = new Set(["package_photo", "official_page", "reference_page"]);
const allowedTimingSlots = new Set(["morning", "daytime", "evening"]);
const allowedTimingSourceStatuses = new Set(["official_page", "ingredient_researched", "needs_review"]);
const allowedStorageModes = new Set(["refrigerate", "cool_dry", "room_temperature", "needs_review"]);
const allowedStorageSourceStatuses = new Set(["official_page", "needs_review"]);

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
const officialSourceUrls = new Set();

function validateTiming(record, label) {
  const timing = record.timing;
  if (!timing || typeof timing !== "object") {
    errors.push(`${label} needs timing.`);
    return;
  }

  if (!Array.isArray(timing.slots)) errors.push(`${label} timing.slots must be an array.`);
  if (!Array.isArray(timing.avoidSlots)) errors.push(`${label} timing.avoidSlots must be an array.`);
  if (!Array.isArray(timing.sourceIds)) errors.push(`${label} timing.sourceIds must be an array.`);
  if (!isNonEmptyString(timing.note)) errors.push(`${label} timing needs a note.`);
  if (!allowedTimingSourceStatuses.has(timing.sourceStatus)) errors.push(`${label} has invalid timing.sourceStatus.`);

  for (const slot of timing.slots || []) {
    if (!allowedTimingSlots.has(slot)) errors.push(`${label} timing has invalid slot: ${slot}`);
  }
  for (const slot of timing.avoidSlots || []) {
    if (!allowedTimingSlots.has(slot)) errors.push(`${label} timing has invalid avoidSlot: ${slot}`);
  }
  for (const sourceId of timing.sourceIds || []) {
    if (!sourceIds.has(sourceId)) errors.push(`${label} timing references missing source ${sourceId}.`);
  }

  if ((timing.slots || []).length > 0 && (!Array.isArray(timing.sourceIds) || timing.sourceIds.length === 0)) {
    errors.push(`${label} has timing slots but no timing sourceIds.`);
  }
  if (timing.sourceStatus !== "needs_review" && (!Array.isArray(timing.sourceIds) || timing.sourceIds.length === 0)) {
    errors.push(`${label} has reviewed timing without timing sourceIds.`);
  }
}

function validateStorage(record, label) {
  const storage = record.storage;
  if (!storage || typeof storage !== "object") {
    errors.push(`${label} needs storage.`);
    return;
  }

  if (typeof storage.requiresRefrigeration !== "boolean") errors.push(`${label} storage.requiresRefrigeration must be boolean.`);
  if (typeof storage.avoidFreezing !== "boolean") errors.push(`${label} storage.avoidFreezing must be boolean.`);
  if (!allowedStorageModes.has(storage.mode)) errors.push(`${label} has invalid storage.mode.`);
  if (!isNonEmptyString(storage.label)) errors.push(`${label} storage needs a label.`);
  if (!isNonEmptyString(storage.note)) errors.push(`${label} storage needs a note.`);
  if (!Array.isArray(storage.sourceIds)) errors.push(`${label} storage.sourceIds must be an array.`);
  if (!allowedStorageSourceStatuses.has(storage.sourceStatus)) errors.push(`${label} has invalid storage.sourceStatus.`);

  for (const sourceId of storage.sourceIds || []) {
    if (!sourceIds.has(sourceId)) errors.push(`${label} storage references missing source ${sourceId}.`);
  }

  if (storage.sourceStatus !== "needs_review" && (!Array.isArray(storage.sourceIds) || storage.sourceIds.length === 0)) {
    errors.push(`${label} has reviewed storage without storage sourceIds.`);
  }
  if (storage.requiresRefrigeration && storage.mode !== "refrigerate") {
    errors.push(`${label} requires refrigeration but storage.mode is not refrigerate.`);
  }
  if (storage.mode === "refrigerate" && !storage.requiresRefrigeration) {
    errors.push(`${label} storage.mode is refrigerate but requiresRefrigeration is false.`);
  }
}

for (const source of seed.sources || []) {
  if (!isNonEmptyString(source.id)) errors.push("Every source needs an id.");
  if (sourceIds.has(source.id)) errors.push(`Duplicate source id: ${source.id}`);
  sourceIds.add(source.id);
  if (!allowedSourceTypes.has(source.type)) errors.push(`Invalid source type for ${source.id}.`);
  if (source.type === "package_photo" && !isNonEmptyString(source.filename)) errors.push(`Package source ${source.id} needs a filename.`);
  if (source.type === "official_page" && !isNonEmptyString(source.url)) errors.push(`Official source ${source.id} needs a URL.`);
  if (source.type === "reference_page" && !isNonEmptyString(source.url)) errors.push(`Reference source ${source.id} needs a URL.`);
  if (source.type === "official_page" && isNonEmptyString(source.url)) officialSourceUrls.add(source.url);
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
  validateTiming(supplement, `Supplement ${supplement.id}`);
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
  if (product.shopUrl !== undefined) {
    if (!isNonEmptyString(product.shopUrl) || !product.shopUrl.startsWith("https://")) {
      errors.push(`Product ${product.id} shopUrl must be an HTTPS URL.`);
    } else if (!officialSourceUrls.has(product.shopUrl)) {
      errors.push(`Product ${product.id} shopUrl must match an official source URL.`);
    }
  }
  validateTiming(product, `Product ${product.id}`);
  validateStorage(product, `Product ${product.id}`);

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
