import { recipes } from "./data/recipes.mjs";
import { saveItem } from "./saved-list.mjs";
import { escapeHtml } from "./shared.mjs";

export function renderRecipes() {
  const featuredRoot = document.querySelector("#featured-recipes");
  const libraryRoot = document.querySelector("#recipe-library");
  if (!featuredRoot || !libraryRoot) return;

  const featuredRecipes = recipes.filter((recipe) => recipe.featured);
  const libraryRecipes = recipes.filter((recipe) => !recipe.featured);

  featuredRoot.innerHTML = featuredRecipes.map((recipe) => recipeCardTemplate(recipe, "featured")).join("");
  libraryRoot.innerHTML = libraryRecipes.map((recipe) => recipeCardTemplate(recipe, "compact")).join("");

  document.querySelectorAll(".save-recipe").forEach((button) => {
    button.addEventListener("click", () => {
      const recipe = recipes.find((entry) => entry.id === button.dataset.recipe);
      if (!recipe) return;
      saveItem({
        type: "Recipe",
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        note: recipe.note,
      });
      button.textContent = "Added";
      const savedNote = document.querySelector("#recipe-saved-note");
      if (savedNote) savedNote.textContent = `${recipe.name} added to your recipe list.`;
    });
  });
}

function recipeCardTemplate(recipe, density) {
  const isCompact = density === "compact";
  const titleLines = recipe.titleLines?.length === 2 ? recipe.titleLines : splitTitle(recipe.name);
  const cardClasses = ["recipe-card", `recipe-card-${recipe.template || "boho"}`, isCompact ? "recipe-card-compact" : "recipe-card-featured"].join(" ");

  return `
    <article class="${cardClasses}">
      <div class="recipe-image-panel">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}">
        <div class="recipe-title-overlay">
          <h2><span>${escapeHtml(titleLines[0])}</span><span>${escapeHtml(titleLines[1])}</span></h2>
        </div>
        <div class="recipe-meta-row" aria-label="${escapeHtml(recipe.name)} summary">
          ${(recipe.meta || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>

      <div class="recipe-story">
        <p>${escapeHtml(recipe.summary)}</p>
        <div class="recipe-chip-grid" aria-label="${escapeHtml(recipe.name)} ingredients">
          ${(recipe.ingredients || []).map((ingredient) => ingredientChipTemplate(recipe.id, ingredient)).join("")}
        </div>
        <div class="recipe-detail-grid">
          <section class="recipe-detail-block">
            <h3>How it comes together</h3>
            <ol>${(recipe.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
          </section>
          <section class="recipe-detail-block">
            <h3>Superfood Benefits</h3>
            <ul>${(recipe.benefits || []).map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("")}</ul>
          </section>
        </div>
        <div class="lumina-actions">
          <button class="button ghost save-recipe" type="button" data-recipe="${escapeHtml(recipe.id)}">Add to recipe list</button>
          <a class="button primary" href="/foods">Explore ingredients</a>
        </div>
      </div>
    </article>
  `;
}

function ingredientChipTemplate(recipeId, ingredient) {
  const tooltipId = `tip-${slugify(recipeId)}-${slugify(ingredient.name)}`;
  return `
    <span class="recipe-chip">
      <button type="button" aria-describedby="${tooltipId}">${escapeHtml(ingredient.name)}</button>
      <span class="recipe-chip-tooltip" id="${tooltipId}" role="tooltip">${escapeHtml(ingredient.detail)}</span>
    </span>
  `;
}

function splitTitle(name) {
  const words = String(name || "").split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ") || words[0] || ""];
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
