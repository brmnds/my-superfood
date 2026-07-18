import { escapeHtml } from "./shared.mjs";
import { supplementRelationshipGroups } from "./data/supplement-relationships.mjs";

function productLinks(product) {
  const internalUrl = `/supplements#product-${encodeURIComponent(product.id)}`;
  const shop = product.shopUrl
    ? `<a class="relationship-shop-link" href="${escapeHtml(product.shopUrl)}" target="_blank" rel="noopener">Shop</a>`
    : "";
  return `<span class="relationship-product"><a href="${internalUrl}">${escapeHtml(product.name)}</a>${shop}</span>`;
}

export async function renderSupplementBlog() {
  const relationshipTable = document.querySelector("[data-supplement-relationships]");

  try {
    const response = await fetch("/data/supplement-catalog.seed.json");
    if (!response.ok) throw new Error(`Catalog request failed with ${response.status}.`);
    const catalog = await response.json();
    const products = catalog.supplementProducts || [];
    const productById = new Map(products.map((product) => [product.id, product]));

    document.querySelectorAll('.blog-article h3 a[href^="/supplements#product-"]').forEach((link) => {
      const productId = decodeURIComponent(link.getAttribute("href").split("#product-")[1] || "");
      const product = productById.get(productId);
      if (!product?.shopUrl || link.closest("h3")?.querySelector(".blog-shop-link")) return;
      const shopLink = document.createElement("a");
      shopLink.className = "blog-shop-link";
      shopLink.href = product.shopUrl;
      shopLink.target = "_blank";
      shopLink.rel = "noopener";
      shopLink.textContent = "Official shop";
      link.closest("h3")?.append(shopLink);
    });

    if (!relationshipTable) return;
    relationshipTable.innerHTML = `
      <table class="relationship-table">
        <thead><tr><th>Category</th><th>Products</th><th>How to read it</th></tr></thead>
        <tbody>
          ${supplementRelationshipGroups.map((group) => {
            const groupProducts = group.productIds.map((id) => productById.get(id)).filter(Boolean);
            return `<tr>
              <th scope="row">${escapeHtml(group.category)}</th>
              <td><div class="relationship-products">${groupProducts.map(productLinks).join("")}</div></td>
              <td><span class="relationship-status relationship-${escapeHtml(group.status)}">${escapeHtml(group.label)}</span><p>${escapeHtml(group.summary)}</p></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>`;
  } catch (error) {
    console.error("Supplement blog enhancements could not load.", error);
    if (relationshipTable) relationshipTable.textContent = "Overlap notes are temporarily unavailable.";
  }
}
