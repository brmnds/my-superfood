import { foods } from "./data/foods.mjs";
import { escapeHtml, optimizedFoodImagePath } from "./shared.mjs";
import { saveItem } from "./saved-list.mjs";

export function renderFoods() {
  const catalog = document.querySelector("#food-catalog");
  const dietButtons = [...document.querySelectorAll("[data-food-diet]")];
  if (!catalog || !dietButtons.length) return;

  const linkedFoodId = decodeURIComponent(location.hash.replace(/^#/, ""));
  const linkedFood = foods.find((food) => food.id === linkedFoodId);
  let activeDiet = linkedFood?.dietType === "pescatarian" ? "pescatarian" : "vegan";

  function matchesDiet(food) {
    const dietType = food.dietType || "vegan";
    if (activeDiet === "vegan") return dietType === "vegan";
    if (activeDiet === "pescatarian") return dietType === "vegan" || dietType === "pescatarian";
    if (activeDiet === "vegetarian") return dietType === "vegan" || dietType === "vegetarian";
    return true;
  }

  function updateDietButtons() {
    dietButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.foodDiet === activeDiet));
    });
  }

  function renderCatalog() {
    catalog.innerHTML = foods.filter(matchesDiet).map((food) => `
      <article class="catalog-card" id="${escapeHtml(food.id)}">
        <img src="${escapeHtml(optimizedFoodImagePath(food.image, "catalog"))}" alt="${escapeHtml(food.name)}" loading="lazy" decoding="async">
        <h2>${escapeHtml(food.name)}</h2>
        <p>${escapeHtml(food.note)}</p>
        <div class="tag-row">${food.benefits.map((benefit) => `<span class="tag">${escapeHtml(benefit)}</span>`).join("")}</div>
        <button class="button ghost save-food-card" type="button" data-food-id="${escapeHtml(food.id)}">Add to list</button>
      </article>
    `).join("");

    catalog.querySelectorAll(".save-food-card").forEach((button) => {
      button.addEventListener("click", () => {
        const food = foods.find((entry) => entry.id === button.dataset.foodId);
        if (!food) return;
        saveItem({ type: "Food", id: food.id, name: food.name, image: optimizedFoodImagePath(food.image, "catalog"), note: food.note });
        button.textContent = "Added";
      });
    });
  }

  dietButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeDiet = button.dataset.foodDiet;
      updateDietButtons();
      renderCatalog();
    });
  });

  updateDietButtons();
  renderCatalog();
}
