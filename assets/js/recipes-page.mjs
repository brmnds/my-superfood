import { recipes } from "./data/recipes.mjs";
import { saveItem } from "./saved-list.mjs";

export function renderRecipes() {
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
