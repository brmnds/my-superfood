import { escapeHtml } from "./shared.mjs";
import { saveItem } from "./saved-list.mjs";

const catalogApiUrl = "https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws";
const catalogCacheKey = "my-superfood-supplement-catalog-cache-v1";
const catalogCacheTtlMs = 5 * 60 * 1000;

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

export function renderSupplements() {
  const table = document.querySelector("#supplement-catalog-table");
  const tabs = document.querySelectorAll(".tab-button");
  const filters = document.querySelectorAll("[data-catalog-filter]");
  const searchInput = document.querySelector("[data-catalog-search]");
  const protocolTimingButtons = document.querySelectorAll("[data-protocol-timing]");
  const protocolStorageButtons = document.querySelectorAll("[data-protocol-storage]");
  let activeTab = "ingredients";
  let activeFilter = "all";
  let activeSearch = "";
  let activeProtocolTiming = "all";
  let activeProtocolStorage = "all";
  let catalog = { supplements: [], products: [] };
  const expandedProducts = new Set();
  let highlightedSupplementId = "";
  let highlightedProductId = "";

  const referenceSources = {
    "vitamin-c": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/" },
    "magnesium": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/" },
    "creatine-monohydrate": { label: "ISSN", url: "https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0173-z" },
    "omega-3": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" },
    "epa": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" },
    "dha": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/" },
    "vitamin-d3": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/" },
    "vitamin-e": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/" },
    "vitamin-k1": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/" },
    "vitamin-k2-mk4": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/" },
    "vitamin-k2-mk7": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/" },
    "thiamin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/" },
    "riboflavin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Riboflavin-HealthProfessional/" },
    "niacin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Niacin-HealthProfessional/" },
    "vitamin-b6": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/" },
    "folate": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/" },
    "vitamin-b12": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/" },
    "biotin": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/" },
    "pantothenic-acid": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/PantothenicAcid-HealthProfessional/" },
    "calcium": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/" },
    "iodine": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/" },
    "zinc": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/" },
    "selenium": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/" },
    "manganese": { label: "NIH ODS", url: "https://ods.od.nih.gov/factsheets/Manganese-HealthProfessional/" },
    "curcumin": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/turmeric/ataglance.htm" },
    "ginger-extract": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/ginger" },
    "ashwagandha": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/ashwagandha" },
    "rhodiola-rosea": { label: "NCCIH", url: "https://www.nccih.nih.gov/health/rhodiola" },
    "trans-resveratrol": { label: "Linus Pauling Institute", url: "https://lpi.oregonstate.edu/mic/dietary-factors/phytochemicals/resveratrol" },
    "red-wine-polyphenols": { label: "Linus Pauling Institute", url: "https://lpi.oregonstate.edu/mic/dietary-factors/phytochemicals/resveratrol" },
  };

  const officialSourceUrls = {
    "website-longevity-mix": "https://blueprint.bryanjohnson.com/products/longevity-blend-multinutrient-drink-mix-blood-orange-flavor",
    "website-essential-capsules": "https://blueprint.bryanjohnson.com/products/essentials-capsules",
    "website-omega-3": "https://blueprint.bryanjohnson.com/products/omega-3",
    "website-collagen": "https://blueprint.bryanjohnson.com/products/collagen",
    "website-nac-ginger-curcumin": "https://blueprint.bryanjohnson.com/products/nac-ginger-capsules",
    "website-ashwagandha-rhodiola": "https://blueprint.bryanjohnson.com/products/ashwagandha-rhodiola-120mg",
    "website-advanced-antioxidants": "https://blueprint.bryanjohnson.com/products/advanced-antioxidants",
  };

  function formatCategories(categories) {
    return (categories || []).map((category) => `<span class="tag">${escapeHtml(category)}</span>`).join("");
  }

  function timingStatusLabel(status) {
    if (status === "official_page") return "Official page";
    if (status === "ingredient_researched") return "Ingredient research";
    return "Timing needs review";
  }

  function timingSlotLabel(slot) {
    if (slot === "morning") return "Morning";
    if (slot === "daytime") return "Daytime";
    if (slot === "evening") return "Evening";
    return slot;
  }

  function storageStatusLabel(status) {
    if (status === "official_page") return "Official page";
    return "Storage needs review";
  }

  function storageModeLabel(mode) {
    if (mode === "refrigerate") return "Refrigerate";
    if (mode === "cool_dry") return "Cool, dry";
    if (mode === "room_temperature") return "Room temp";
    return "Storage review";
  }

  function timingMarkup(entry) {
    const timing = entry?.timing;
    if (!timing || timing.sourceStatus === "needs_review" || !(timing.slots || []).length) {
      const note = timing?.note || "Timing needs review.";
      return `<div class="timing-row"><span class="timing-review" title="${escapeHtml(note)}">Timing needs review</span></div>`;
    }

    const note = `${timing.note} Source status: ${timingStatusLabel(timing.sourceStatus)}.`;
    const slots = ["morning", "daytime", "evening"].filter((slot) => timing.slots.includes(slot));
    return `
      <div class="timing-row" aria-label="${escapeHtml(note)}">
        ${slots.map((slot) => `
          <span class="timing-chip timing-${escapeHtml(slot)}" tabindex="0" aria-label="${escapeHtml(`${timingSlotLabel(slot)} timing. ${note}`)}">
            <span class="timing-icon timing-icon-${escapeHtml(slot)}" aria-hidden="true"></span>
            <span class="timing-tooltip" role="tooltip">${escapeHtml(`${timingSlotLabel(slot)}. ${note}`)}</span>
          </span>
        `).join("")}
        ${(timing.avoidSlots || []).map((slot) => `
          <span class="timing-avoid" tabindex="0" aria-label="${escapeHtml(`Avoid ${timingSlotLabel(slot)}. ${note}`)}">
            Avoid ${escapeHtml(timingSlotLabel(slot).toLowerCase())}
            <span class="timing-tooltip" role="tooltip">${escapeHtml(`Avoid ${timingSlotLabel(slot).toLowerCase()}. ${note}`)}</span>
          </span>
        `).join("")}
      </div>
    `;
  }

  function shopLink(product) {
    if (!product.shopUrl) return "";
    return `<a class="shop-link" href="${escapeHtml(product.shopUrl)}" target="_blank" rel="noopener">Official shop</a>`;
  }

  function storageMarkup(product) {
    const storage = product?.storage;
    if (!storage || storage.sourceStatus === "needs_review") {
      const note = storage?.note || "Storage guidance needs review.";
      return `<div class="storage-row"><span class="storage-review" title="${escapeHtml(note)}">Storage needs review</span></div>`;
    }

    const label = storage.label || storageModeLabel(storage.mode);
    const noteParts = [
      storage.note,
      storage.avoidFreezing ? "Do not freeze." : "",
      `Source status: ${storageStatusLabel(storage.sourceStatus)}.`,
    ].filter(Boolean);
    const note = noteParts.join(" ");
    const isFridge = storage.requiresRefrigeration === true || storage.mode === "refrigerate";
    return `
      <div class="storage-row" aria-label="${escapeHtml(note)}">
        <span class="storage-chip ${isFridge ? "storage-refrigerate" : "storage-cool"}" tabindex="0" aria-label="${escapeHtml(`${label}. ${note}`)}">
          ${isFridge ? `
            <span class="storage-snowflake" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3v18M5 7l14 10M19 7 5 17M8 4l4 3 4-3M8 20l4-3 4 3M3.5 10.5l4.5 1.5-4.5 1.5M20.5 10.5 16 12l4.5 1.5" />
              </svg>
            </span>
          ` : ""}
          <span>${escapeHtml(label)}</span>
          <span class="timing-tooltip" role="tooltip">${escapeHtml(note)}</span>
        </span>
      </div>
    `;
  }

  function productNameCell(product) {
    return `
      <div class="catalog-name-cell">
        <strong>${escapeHtml(product.name)}</strong>
        <span>${escapeHtml(product.productType)}</span>
        ${timingMarkup(product)}
        ${storageMarkup(product)}
        ${shopLink(product)}
      </div>
    `;
  }

  function supplementNameCell(supplement) {
    return `
      <div class="catalog-name-cell">
        <strong>${escapeHtml(supplement.name)}</strong>
        <span>${escapeHtml((supplement.aliases || []).join(", "))}</span>
        ${timingMarkup(supplement)}
      </div>
    `;
  }

  function formatAmount(amount) {
    if (!amount) return "Needs review";
    const values = [amount.min, amount.medium, amount.max].filter((value) => value !== null && value !== undefined);
    if (values.length === 0) return "Needs review";
    const uniqueValues = [...new Set(values)];
    let numberText = uniqueValues[0];
    if (uniqueValues.length > 1) {
      if (amount.min === null || amount.min === undefined) numberText = `Up to ${amount.max}`;
      else if (amount.max === null || amount.max === undefined) numberText = `${amount.min}+`;
      else numberText = `${amount.min}-${amount.max}`;
    }
    return `${numberText} ${amount.unit || ""}`.trim();
  }

  function sourceById(sourceId) {
    const source = catalog.sources?.find((entry) => entry.id === sourceId);
    if (!source?.url) return null;
    return source;
  }

  function blueprintSourcesForSupplement(supplementId) {
    const sources = [];
    catalog.products.forEach((product) => {
      (product.ingredients || [])
        .filter((ingredient) => ingredient.supplementId === supplementId)
        .forEach((ingredient) => {
          (ingredient.sourceIds || []).forEach((sourceId) => {
            const source = sourceById(sourceId);
            const sourceUrl = source?.url || officialSourceUrls[sourceId];
            if (sourceUrl) {
              sources.push({
                label: product.provider.includes("Blueprint") ? "Blueprint" : product.provider,
                url: sourceUrl,
                amount: ingredient.amount === null ? "" : `${ingredient.amount} ${ingredient.unit}`,
                product: product.name,
              });
            }
          });
        });
    });
    return sources;
  }

  function amountSources(supplement) {
    const blueprintSources = blueprintSourcesForSupplement(supplement.id);
    const reference = referenceSources[supplement.id];
    const uniqueBlueprintSources = [];
    const seen = new Set();
    blueprintSources.forEach((source) => {
      const key = `${source.url}-${source.amount}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueBlueprintSources.push(source);
      }
    });
    return reference ? [...uniqueBlueprintSources.slice(0, 2), reference] : uniqueBlueprintSources.slice(0, 2);
  }

  function amountWithSources(supplement) {
    const amountText = formatAmount(supplement.recommendedDailyAmount);
    const sources = amountSources(supplement);
    const sourceLinks = sources.length ? sources.map((source) => {
      const prefix = source.amount ? `${source.label}: ${source.amount}` : source.label;
      return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(prefix)}</a>`;
    }).join("") : `<span>Source needs review</span>`;
    const basis = supplement.recommendedDailyAmount?.basis || "Informational amount; not medical advice.";

    return `
      <div class="amount-source-cell">
        <div class="amount-main">
          <strong>${escapeHtml(amountText)}</strong>
          <button class="amount-info" type="button" title="${escapeHtml(basis)}" aria-label="${escapeHtml(basis)}">i</button>
        </div>
        <div class="amount-sources" aria-label="Amount sources">${sourceLinks}</div>
      </div>
    `;
  }

  function productIngredientItems(product) {
    return (product.ingredients || []).map((ingredient) => {
      const supplement = catalog.supplements.find((entry) => entry.id === ingredient.supplementId);
      const name = supplement?.name || ingredient.supplementId;
      const amount = ingredient.amount === null ? "needs review" : `${ingredient.amount} ${ingredient.unit}`;
      return { ...ingredient, name, amount };
    });
  }

  function productIngredientList(product) {
    const ingredients = productIngredientItems(product);
    const expanded = expandedProducts.has(product.id);
    const visibleIngredients = expanded ? ingredients : ingredients.slice(0, 3);
    const hiddenCount = Math.max(ingredients.length - visibleIngredients.length, 0);

    return `
      <div class="ingredient-link-list" data-product-ingredients="${escapeHtml(product.id)}">
        ${visibleIngredients.map((ingredient) => `
          <button class="ingredient-entity-link" type="button" data-supplement-id="${escapeHtml(ingredient.supplementId)}">
            <span>${escapeHtml(ingredient.name)}</span>
            <small>${escapeHtml(ingredient.amount)}</small>
          </button>
        `).join("")}
        ${hiddenCount > 0 ? `
          <button class="ingredient-show-more" type="button" data-expand-product="${escapeHtml(product.id)}">
            Show more
          </button>
        ` : ""}
      </div>
    `;
  }

  function productsForSupplement(supplementId) {
    return catalog.products
      .filter((product) => (product.contains || []).includes(supplementId))
      .map((product) => product.name)
      .join(", ") || "Not in current products";
  }

  function matchesFilter(entry) {
    if (activeFilter === "all") return true;
    if (activeFilter === "needs review") return entry.sourceStatus === "needs_review" || entry.categories.includes("needs review");
    return entry.categories.includes(activeFilter);
  }

  function normalizeSearch(value) {
    return String(value || "").trim().toLowerCase();
  }

  function searchTextForProduct(product) {
    const ingredients = productIngredientItems(product)
      .map((ingredient) => `${ingredient.name} ${ingredient.supplementId}`)
      .join(" ");
    return normalizeSearch([
      product.name,
      (product.aliases || []).join(" "),
      product.provider,
      product.productType,
      product.purpose,
      (product.categories || []).join(" "),
      ingredients,
    ].join(" "));
  }

  function searchTextForSupplement(supplement) {
    return normalizeSearch([
      supplement.name,
      (supplement.aliases || []).join(" "),
      supplement.purpose,
      (supplement.categories || []).join(" "),
    ].join(" "));
  }

  function matchesSearch(entry) {
    if (!activeSearch) return true;
    const haystack = activeTab === "products" ? searchTextForProduct(entry) : searchTextForSupplement(entry);
    return haystack.includes(activeSearch);
  }

  function renderProducts() {
    const products = catalog.products.filter((product) => matchesFilter(product) && matchesSearch(product));
    table.innerHTML = `
      <thead>
        <tr>
          <th>Supplement Kit</th>
          <th>Provider</th>
          <th>Purpose</th>
          <th>Categories</th>
          <th>Key ingredients</th>
          <th>Add to list</th>
        </tr>
      </thead>
      <tbody>
        ${products.map((product) => `
          <tr id="product-${escapeHtml(product.id)}" class="${product.id === highlightedProductId ? "row-highlight" : ""}">
            <td>${productNameCell(product)}</td>
            <td>${escapeHtml(product.provider)}</td>
            <td>${escapeHtml(product.purpose)}</td>
            <td><div class="tag-row">${formatCategories(product.categories)}</div></td>
            <td>${productIngredientList(product)}</td>
            <td><button class="button ghost table-action save-catalog-item" type="button" data-kind="Supplement Product" data-id="${escapeHtml(product.id)}">Add</button></td>
          </tr>
        `).join("") || `<tr><td colspan="6">No supplement kits match this search or filter.</td></tr>`}
      </tbody>
    `;
  }

  function renderIngredients() {
    const ingredients = catalog.supplements.filter((supplement) => matchesFilter(supplement) && matchesSearch(supplement));
    table.innerHTML = `
      <thead>
        <tr>
          <th>Supplement</th>
          <th>Purpose</th>
          <th>Recommended daily amount</th>
          <th>Included in products</th>
        </tr>
      </thead>
      <tbody>
        ${ingredients.map((supplement) => `
          <tr id="supplement-${escapeHtml(supplement.id)}" class="${supplement.id === highlightedSupplementId ? "row-highlight" : ""}">
            <td>${supplementNameCell(supplement)}</td>
            <td>${escapeHtml(supplement.purpose)}</td>
            <td>${amountWithSources(supplement)}</td>
            <td>${escapeHtml(productsForSupplement(supplement.id))}</td>
          </tr>
        `).join("") || `<tr><td colspan="4">No supplements match this search or filter.</td></tr>`}
      </tbody>
    `;
  }

  function bindSaveButtons() {
    document.querySelectorAll(".save-catalog-item").forEach((button) => {
      button.addEventListener("click", () => {
        const product = catalog.products.find((entry) => entry.id === button.dataset.id);
        if (!product) return;
        saveItem({
          type: button.dataset.kind,
          id: product.id,
          name: product.name,
          image: product.image,
          note: product.purpose,
        });
        button.textContent = "Added";
      });
    });
  }

  function setActiveTab(nextTab) {
    activeTab = nextTab;
    tabs.forEach((entry) => {
      const selected = entry.dataset.tab === nextTab;
      entry.classList.toggle("active", selected);
      entry.setAttribute("aria-selected", selected ? "true" : "false");
    });
    if (searchInput) {
      searchInput.placeholder = nextTab === "products" ? "Search supplement kits" : "Search supplements";
      searchInput.setAttribute("aria-label", searchInput.placeholder);
    }
  }

  function setActiveFilter(nextFilter) {
    activeFilter = nextFilter;
    filters.forEach((entry) => entry.classList.toggle("active", entry.dataset.catalogFilter === nextFilter));
  }

  function setActiveProtocolTiming(nextTiming) {
    activeProtocolTiming = nextTiming;
    protocolTimingButtons.forEach((entry) => {
      const selected = entry.dataset.protocolTiming === nextTiming;
      entry.classList.toggle("active", selected);
      entry.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    updateProtocolFilters();
  }

  function setActiveProtocolStorage(nextStorage) {
    activeProtocolStorage = nextStorage;
    protocolStorageButtons.forEach((entry) => {
      const selected = entry.dataset.protocolStorage === nextStorage;
      entry.classList.toggle("active", selected);
      entry.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    updateProtocolFilters();
  }

  function updateProtocolFilters() {
    document.querySelectorAll("[data-protocol-product]").forEach((button) => {
      const product = catalog.products.find((entry) => entry.id === button.dataset.protocolProduct);
      const slots = product?.timing?.slots || [];
      const matchesTiming = activeProtocolTiming === "all" || slots.includes(activeProtocolTiming);
      const matchesStorage = activeProtocolStorage === "all" || product?.storage?.requiresRefrigeration === true;
      const matches = matchesTiming && matchesStorage;
      button.classList.toggle("protocol-muted", !matches);
      const titleParts = [product?.timing?.note, product?.storage?.note].filter(Boolean);
      if (titleParts.length) button.title = titleParts.join(" ");
    });
  }

  function bindIngredientLinks() {
    document.querySelectorAll(".ingredient-entity-link").forEach((button) => {
      button.addEventListener("click", () => {
        highlightedSupplementId = button.dataset.supplementId || "";
        setActiveTab("ingredients");
        setActiveFilter("all");
        render();
        document.getElementById(`supplement-${highlightedSupplementId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });

    document.querySelectorAll("[data-expand-product]").forEach((button) => {
      button.addEventListener("click", () => {
        expandedProducts.add(button.dataset.expandProduct);
        render();
      });
    });
  }

  function openProduct(productId) {
    highlightedProductId = productId;
    highlightedSupplementId = "";
    setActiveTab("products");
    setActiveFilter("all");
    render();
    document.getElementById(`product-${productId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function render() {
    if (activeTab === "products") renderProducts();
    if (activeTab === "ingredients") renderIngredients();
    bindSaveButtons();
    bindIngredientLinks();
    updateProtocolFilters();
  }

  async function fetchCatalog() {
    async function fetchSeedCatalog() {
      const seedResponse = await fetch("data/supplement-catalog.seed.json", { headers: { accept: "application/json" } });
      if (!seedResponse.ok) throw new Error("Local catalog seed could not be loaded.");
      return seedResponse.json();
    }

    async function fetchSeedSources() {
      try {
        const seed = await fetchSeedCatalog();
        return seed.sources || [];
      } catch (error) {
        console.warn("Catalog source metadata could not be loaded.", error);
        return [];
      }
    }

    async function fetchLiveCatalog() {
      const [supplementsResponse, productsResponse] = await Promise.all([
        fetch(`${catalogApiUrl}/supplements`, { headers: { accept: "application/json" } }),
        fetch(`${catalogApiUrl}/products`, { headers: { accept: "application/json" } }),
      ]);
      if (!supplementsResponse.ok || !productsResponse.ok) throw new Error("Catalog API returned an error.");
      const [supplementsPayload, productsPayload] = await Promise.all([supplementsResponse.json(), productsResponse.json()]);
      return {
        supplements: supplementsPayload.supplements || [],
        products: productsPayload.products || [],
        sources: await fetchSeedSources(),
      };
    }

    const cached = readCatalogCache();
    if (cached && Date.now() - cached.cachedAt < catalogCacheTtlMs) return cached.catalog;

    if (catalogApiUrl) {
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
      }
    }

    const seed = await fetchSeedCatalog();
    return { supplements: seed.supplements || [], products: seed.supplementProducts || [], sources: seed.sources || [] };
  }

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab);
      render();
    });
  });

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      highlightedSupplementId = "";
      highlightedProductId = "";
      setActiveFilter(button.dataset.catalogFilter);
      render();
    });
  });

  searchInput?.addEventListener("input", () => {
    highlightedSupplementId = "";
    highlightedProductId = "";
    activeSearch = normalizeSearch(searchInput.value);
    render();
  });

  document.querySelectorAll("[data-protocol-product]").forEach((button) => {
    button.addEventListener("click", () => {
      openProduct(button.dataset.protocolProduct);
    });
  });

  protocolTimingButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
    button.addEventListener("click", () => {
      setActiveProtocolTiming(button.dataset.protocolTiming || "all");
    });
  });

  protocolStorageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextStorage = activeProtocolStorage === button.dataset.protocolStorage ? "all" : button.dataset.protocolStorage;
      setActiveProtocolStorage(nextStorage || "all");
    });
  });

  fetchCatalog()
    .then((loadedCatalog) => {
      catalog = loadedCatalog;
      render();
    })
    .catch((error) => {
      console.error(error);
      table.innerHTML = `<tbody><tr><td>Catalog could not be loaded.</td></tr></tbody>`;
    });
}
