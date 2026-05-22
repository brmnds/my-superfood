import { foods } from "./data/foods.mjs";
import { escapeHtml } from "./shared.mjs";
import { saveItem } from "./saved-list.mjs";

export function renderFoods() {
  const catalog = document.querySelector("#food-catalog");
  catalog.innerHTML = foods.map((food) => `
    <article class="catalog-card" id="${escapeHtml(food.id)}">
      <img src="${escapeHtml(food.image)}" alt="${escapeHtml(food.name)}" loading="lazy" decoding="async">
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
      saveItem({ type: "Food", id: food.id, name: food.name, image: food.image, note: food.note });
      button.textContent = "Added";
    });
  });
}
