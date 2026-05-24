import { escapeHtml } from "./shared.mjs";

const catalogApiUrl = "https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws";
const catalogCacheKey = "my-superfood-supplement-catalog-cache-v1";
const catalogCacheTtlMs = 5 * 60 * 1000;

const activeProductIds = [
  "blueprint-essential-capsules",
  "blueprint-longevity-mix-blood-orange",
  "blueprint-collagen-peptides",
  "blueprint-advanced-antioxidants",
  "blueprint-ashwagandha-rhodiola",
  "blueprint-nac-ginger-curcumin",
  "blueprint-omega-3",
  "altapharma-d3-k2-drops",
  "sunday-magnesium-complex-11-ultra-xl",
  "sunday-magnesium-active-calm",
  "natural-elements-magnesium-bisglycinat",
  "swanson-apigenin-50mg-90-caps",
  "now-l-theanine-double-strength-200mg",
  "sunday-muscle-recover-ashwa-pro-complex",
  "sunday-vitamin-b-complex-extra-forte",
  "sunday-nadh-50-d-ribose-galactose",
  "sunday-vitamin-d3-k2-mk7-20000-iu-200mcg",
  "sunday-hyaluronic-acid-250-high-dose",
  "sunday-astaxanthin-12-bioastin",
  "sunday-coenzyme-q10-kaneka-ubiquinol-200",
  "weightworld-trans-resveratrol-510-red-wine-polyphenols",
  "sunday-liposomal-vitamin-c-zinc",
];

function readCatalogCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(catalogCacheKey) || "null");
    if (!parsed || typeof parsed.cachedAt !== "number" || !parsed.catalog) return null;
    return parsed;
  } catch (error) {
    console.warn("Ignoring invalid supplement catalog cache.", error);
    return null;
  }
}

function writeCatalogCache(catalog) {
  try {
    localStorage.setItem(catalogCacheKey, JSON.stringify({ cachedAt: Date.now(), catalog }));
  } catch (error) {
    console.warn("Supplement catalog cache could not be stored.", error);
  }
}

async function fetchSeedCatalog() {
  const seedResponse = await fetch("data/supplement-catalog.seed.json", { headers: { accept: "application/json" } });
  if (!seedResponse.ok) throw new Error("Local catalog seed could not be loaded.");
  const seed = await seedResponse.json();
  return { supplements: seed.supplements || [], products: seed.supplementProducts || [], sources: seed.sources || [] };
}

async function fetchLiveCatalog() {
  const [supplementsResponse, productsResponse] = await Promise.all([
    fetch(`${catalogApiUrl}/supplements`, { headers: { accept: "application/json" } }),
    fetch(`${catalogApiUrl}/products`, { headers: { accept: "application/json" } }),
  ]);
  if (!supplementsResponse.ok || !productsResponse.ok) throw new Error("Catalog API returned an error.");
  const [supplementsPayload, productsPayload] = await Promise.all([supplementsResponse.json(), productsResponse.json()]);
  const seed = await fetchSeedCatalog();
  return {
    supplements: supplementsPayload.supplements || [],
    products: productsPayload.products || [],
    sources: seed.sources || [],
  };
}

async function loadCatalog() {
  const cached = readCatalogCache();
  if (cached && Date.now() - cached.cachedAt < catalogCacheTtlMs) return cached.catalog;

  try {
    const liveCatalog = await fetchLiveCatalog();
    writeCatalogCache(liveCatalog);
    return liveCatalog;
  } catch (error) {
    if (cached?.catalog) {
      console.warn("Catalog API failed; using cached supplement catalog.", error);
      return cached.catalog;
    }
    console.warn("Catalog API failed; loading local seed fallback.", error);
    return fetchSeedCatalog();
  }
}

function amountText(ingredient) {
  if (ingredient.amount === null || ingredient.amount === undefined) return "Needs review";
  return `${ingredient.amount} ${ingredient.unit || ""}`.trim();
}

function amountToMicrograms(ingredient) {
  if (typeof ingredient.amount !== "number") return null;
  if (ingredient.unit === "g") return ingredient.amount * 1000 * 1000;
  if (ingredient.unit === "mg") return ingredient.amount * 1000;
  if (ingredient.unit === "mcg") return ingredient.amount;
  return null;
}

function formatMassFromMicrograms(totalMicrograms) {
  if (totalMicrograms >= 1000 * 1000) return `${formatNumber(totalMicrograms / 1000 / 1000)} g`;
  if (totalMicrograms >= 1000) return `${formatNumber(totalMicrograms / 1000)} mg`;
  return `${formatNumber(totalMicrograms)} mcg`;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function totalAmount(entries) {
  const compatibleMass = [];
  const byUnit = new Map();
  let needsReview = false;

  entries.forEach(({ ingredient }) => {
    const micrograms = amountToMicrograms(ingredient);
    if (micrograms !== null) {
      compatibleMass.push(micrograms);
      return;
    }
    if (typeof ingredient.amount === "number" && ingredient.unit) {
      byUnit.set(ingredient.unit, (byUnit.get(ingredient.unit) || 0) + ingredient.amount);
      return;
    }
    needsReview = true;
  });

  const totals = [];
  if (compatibleMass.length) totals.push(formatMassFromMicrograms(compatibleMass.reduce((sum, value) => sum + value, 0)));
  byUnit.forEach((value, unit) => totals.push(`${formatNumber(value)} ${unit}`));
  if (needsReview) totals.push("needs review");
  return totals.join(" + ") || "Needs review";
}

function buildRows(catalog) {
  const supplementById = new Map(catalog.supplements.map((supplement) => [supplement.id, supplement]));
  const activeProducts = activeProductIds
    .map((id) => catalog.products.find((product) => product.id === id))
    .filter(Boolean);
  const rowMap = new Map();

  activeProducts.forEach((product) => {
    (product.ingredients || []).forEach((ingredient) => {
      const supplement = supplementById.get(ingredient.supplementId) || {
        id: ingredient.supplementId,
        name: ingredient.supplementId,
        aliases: [],
      };
      if (!rowMap.has(supplement.id)) {
        rowMap.set(supplement.id, { supplement, entries: [] });
      }
      rowMap.get(supplement.id).entries.push({ product, ingredient });
    });
  });

  return [...rowMap.values()].sort((a, b) => a.supplement.name.localeCompare(b.supplement.name));
}

function inclusionList(entries) {
  return `
    <div class="directory-inclusion-list">
      ${entries.map(({ product, ingredient }) => `
        <a class="directory-inclusion" href="/supplements#product-${escapeHtml(product.id)}">
          <strong>${escapeHtml(product.name)}</strong>
          <span>${escapeHtml(amountText(ingredient))}${ingredient.perServing ? ` / ${escapeHtml(ingredient.perServing)}` : ""}</span>
        </a>
      `).join("")}
    </div>
  `;
}

function supplementCell(supplement) {
  return `
    <div class="catalog-name-cell">
      <strong>${escapeHtml(supplement.name)}</strong>
      <span>${escapeHtml((supplement.aliases || []).join(", "))}</span>
    </div>
  `;
}

export function renderSupplementDirectory() {
  const table = document.querySelector("#supplement-directory-table");
  const summary = document.querySelector("[data-directory-summary]");
  if (!table) return;

  table.innerHTML = `<tbody><tr><td>Loading supplement directory...</td></tr></tbody>`;

  loadCatalog()
    .then((catalog) => {
      const rows = buildRows(catalog);
      if (summary) {
        summary.textContent = `${rows.length} supplement primitives across ${activeProductIds.length} active supplement kits.`;
      }
      table.innerHTML = `
        <thead>
          <tr>
            <th>Supplement</th>
            <th>Included in active supplement kits</th>
            <th>Total active amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(({ supplement, entries }) => `
            <tr id="supplement-${escapeHtml(supplement.id)}">
              <td>${supplementCell(supplement)}</td>
              <td>${inclusionList(entries)}</td>
              <td><strong class="directory-total">${escapeHtml(totalAmount(entries))}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      `;
    })
    .catch((error) => {
      console.error(error);
      table.innerHTML = `<tbody><tr><td>Supplement directory could not be loaded.</td></tr></tbody>`;
    });
}
