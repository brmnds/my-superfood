const mealIdeas = {
  energy: {
    grain: ["Quinoa, chickpea, avocado, spinach, lemon tahini", "Balanced slow carbs, plant protein, fats, and bright greens for a steady afternoon."],
    greens: ["Kale, roasted sweet potato, lentils, pumpkin seeds", "Fiber-rich greens and slow carbohydrates help keep energy smooth."],
    toast: ["Sourdough, ricotta, tomato, basil, olive oil", "A simple plate with protein, color, and fat for a calm start."],
    soup: ["Miso lentil soup with carrots, greens, and brown rice", "Warm, mineral-rich, and built for long-lasting fullness."]
  },
  recovery: {
    grain: ["Brown rice, salmon, edamame, cucumber, ginger dressing", "Protein, omega-3 fats, and carbs support training recovery."],
    greens: ["Spinach, chicken, quinoa, berries, walnuts", "Lean protein and colorful plants make a high-recovery salad."],
    toast: ["Eggs, avocado, chili flakes, sauerkraut on sourdough", "Protein, fats, and fermented crunch after a hard session."],
    soup: ["Chicken, white bean, spinach, and lemon soup", "A cozy protein-forward bowl with minerals and hydration."]
  },
  focus: {
    grain: ["Farro, tofu, broccoli, sesame, kimchi", "Steady carbs, plant protein, and fermented heat for deep work."],
    greens: ["Arugula, sardines, white beans, herbs, citrus", "Omega-3 fats and fiber without a heavy afternoon slump."],
    toast: ["Almond butter, berries, hemp seeds on rye", "Quick, crisp, and balanced for a focused morning."],
    soup: ["Tomato, red lentil, spinach, and olive oil soup", "Bright and grounding with fiber and plant protein."]
  },
  light: {
    grain: ["Millet, cucumber, herbs, feta, lemon, pistachio", "Fresh, mineral-rich, and easy to eat when you want lightness."],
    greens: ["Romaine, chickpeas, radish, avocado, green goddess", "Crunchy plants with enough protein and fat to satisfy."],
    toast: ["Cottage cheese, cucumber, dill, pepper on sourdough", "Cool, high-protein, and ready in minutes."],
    soup: ["Zucchini, pea, mint, and white bean soup", "Green, quick, and gently filling."]
  }
};

const form = document.querySelector("#goal-form");
const result = document.querySelector("#meal-result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const goal = formData.get("goal");
  const base = formData.get("base");
  const [title, description] = mealIdeas[goal][base];

  result.innerHTML = `
    <p class="eyebrow">Suggested plate</p>
    <h3>${title}</h3>
    <p>${description}</p>
  `;
});
