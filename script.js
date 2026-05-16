const foods = [
  { id: "broccoli", name: "Broccoli", image: "assets/images/broccoli.svg", categories: ["fiber", "advanced"], benefits: ["Fiber rich", "Vitamin C", "Supports gut health"], note: "Cruciferous vegetable with fiber, vitamin C, and plant compounds.", x: "50%", y: "47%", center: true },
  { id: "chickpeas", name: "Chickpeas", image: "assets/images/chickpeas.svg", categories: ["protein", "carbs", "fiber"], benefits: ["Plant protein", "Slow carbs", "High fiber"], note: "A practical base for bowls, hummus, and satisfying meals.", x: "24%", y: "20%" },
  { id: "lentils", name: "Lentils", image: "assets/images/lentils.svg", categories: ["protein", "carbs", "fiber"], benefits: ["Protein", "Iron", "Folate"], note: "A dense pantry staple for soups, salads, and meal prep.", x: "39%", y: "16%" },
  { id: "cauliflower", name: "Cauliflower", image: "assets/images/cauliflower.svg", categories: ["fiber", "advanced"], benefits: ["Light fiber", "Vitamin C", "Cruciferous"], note: "Mild, flexible, and easy to use as a vegetable base.", x: "63%", y: "17%" },
  { id: "banana", name: "Banana", image: "assets/images/banana.svg", categories: ["carbs", "fiber"], benefits: ["Quick carbs", "Potassium", "Portable"], note: "A simple energy fruit for breakfast or training snacks.", x: "79%", y: "20%" },
  { id: "avocado", name: "Avocado", image: "assets/images/avocado.svg", categories: ["oils", "fiber"], benefits: ["Healthy fats", "Potassium", "Satisfying"], note: "Creamy fats and fiber that make simple meals feel complete.", x: "18%", y: "43%" },
  { id: "blueberries", name: "Blueberries", image: "assets/images/blueberries.svg", categories: ["carbs", "advanced", "fiber"], benefits: ["Polyphenols", "Vitamin C", "Fresh sweetness"], note: "A colorful fruit for breakfast bowls and snacks.", x: "34%", y: "38%" },
  { id: "spinach", name: "Spinach", image: "assets/images/spinach.svg", categories: ["fiber", "advanced"], benefits: ["Leafy minerals", "Vitamin K", "Easy greens"], note: "Quick greens for bowls, eggs, smoothies, and soups.", x: "17%", y: "70%" },
  { id: "salmon", name: "Salmon", image: "assets/images/salmon.svg", categories: ["protein", "oils"], benefits: ["Protein", "Omega-3 fats", "Recovery"], note: "A protein-rich fish with naturally occurring omega-3 fats.", x: "35%", y: "69%" },
  { id: "oats", name: "Oats", image: "assets/images/oats.svg", categories: ["carbs", "fiber"], benefits: ["Beta-glucan", "Slow carbs", "Breakfast base"], note: "A steady breakfast grain with soluble fiber.", x: "28%", y: "88%" },
  { id: "olive-oil", name: "Olive Oil", image: "assets/images/olive-oil.svg", categories: ["oils", "advanced"], benefits: ["Monounsaturated fats", "Polyphenols", "Kitchen staple"], note: "A classic fat for salads, vegetables, and sauces.", x: "48%", y: "83%" },
  { id: "walnuts", name: "Walnuts", image: "assets/images/walnuts.svg", categories: ["oils", "protein", "fiber"], benefits: ["Healthy fats", "Minerals", "Crunch"], note: "A dense topping for breakfast bowls and salads.", x: "62%", y: "87%" },
  { id: "yogurt", name: "Yogurt", image: "assets/images/yogurt.svg", categories: ["protein", "advanced"], benefits: ["Protein", "Fermented", "Calcium"], note: "A fermented base for breakfast, sauces, or snacks.", x: "73%", y: "72%" },
  { id: "sweet-potato", name: "Sweet Potato", image: "assets/images/sweet-potato.svg", categories: ["carbs", "fiber"], benefits: ["Slow carbs", "Beta carotene", "Comforting"], note: "A bright, filling carbohydrate for bowls and plates.", x: "88%", y: "62%" },
  { id: "cacao", name: "Cacao", image: "assets/images/cacao.svg", categories: ["advanced", "oils"], benefits: ["Polyphenols", "Magnesium", "Deep flavor"], note: "A rich ingredient for smoothies, yogurt, and warm drinks.", x: "91%", y: "38%" },
  { id: "pumpkin-seeds", name: "Pumpkin Seeds", image: "assets/images/pumpkin-seeds.svg", categories: ["protein", "oils", "fiber"], benefits: ["Zinc", "Magnesium", "Protein"], note: "A small topping with useful minerals and texture.", x: "86%", y: "87%" }
];

const supplements = [
  { id: "vitamin-d3-k2", name: "Vitamin D3 + K2", image: "assets/images/vitamin-d3-k2.svg", labels: ["Taking: Tilman Resch", "Generally recommended"], note: "Often discussed for vitamin D status and bone-support context. Use with personal lab context." },
  { id: "creatine", name: "Creatine", image: "assets/images/creatine.svg", labels: ["Taking: Tilman Resch", "Recommended by: Bryan Johnson"], note: "Commonly used for strength, power, and muscle-support routines." },
  { id: "omega-3", name: "Omega-3", image: "assets/images/omega-3.svg", labels: ["Recommended by: Bryan Johnson", "Generally recommended"], note: "A supplement category often used when fatty fish intake is low." },
  { id: "magnesium", name: "Magnesium Glycinate", image: "assets/images/magnesium.svg", labels: ["Taking: Tilman Resch", "Recommended by: Bryan Johnson"], note: "Often used in evening routines; tolerance and dosage are individual." }
];

const page = document.body.dataset.page;

function getList() {
  return JSON.parse(localStorage.getItem("my-superfood-list") || "[]");
}

function saveItem(item) {
  const list = getList();
  if (!list.some((entry) => entry.id === item.id)) {
    list.push(item);
    localStorage.setItem("my-superfood-list", JSON.stringify(list));
  }
}

function renderHome() {
  const orbit = document.querySelector("#food-orbit");
  const detailTitle = document.querySelector("#detail-title");
  const detailBenefits = document.querySelector("#detail-benefits");
  const addButton = document.querySelector("#add-to-list");
  const openDetail = document.querySelector("#open-detail");
  const savedNote = document.querySelector("#saved-note");
  const detailCard = document.querySelector("#detail-card");
  const closeDetail = document.querySelector(".close-detail");
  let selected = foods[0];
  let activeFilter = "fiber";

  function updateDetail(food) {
    selected = food;
    detailTitle.textContent = food.name;
    detailBenefits.innerHTML = food.benefits.map((benefit) => `<li>${benefit}</li>`).join("");
    openDetail.href = `foods.html#${food.id}`;
    savedNote.textContent = "";
    detailCard.classList.remove("is-hidden");
    document.querySelectorAll(".food-bubble").forEach((button) => {
      button.classList.toggle("is-focused", button.dataset.food === food.id);
    });
  }

  function renderBubbles() {
    orbit.innerHTML = foods.map((food) => `
      <button class="food-bubble ${food.center ? "is-center" : ""} ${food.categories.includes(activeFilter) ? "" : "is-muted"}" type="button" data-food="${food.id}" style="--x:${food.x}; --y:${food.y};" aria-label="${food.name}">
        <img src="${food.image}" alt="">
        <span class="bubble-label">${food.name}<span class="mini-action">View benefits</span></span>
      </button>
    `).join("");

    document.querySelectorAll(".food-bubble").forEach((button) => {
      const food = foods.find((entry) => entry.id === button.dataset.food);
      button.addEventListener("mouseenter", () => updateDetail(food));
      button.addEventListener("focus", () => updateDetail(food));
      button.addEventListener("click", () => updateDetail(food));
    });
  }

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((entry) => entry.classList.toggle("active", entry === button));
      renderBubbles();
      const firstMatch = foods.find((food) => food.categories.includes(activeFilter)) || foods[0];
      updateDetail(firstMatch);
    });
  });

  addButton.addEventListener("click", () => {
    saveItem({ type: "Food", id: selected.id, name: selected.name, image: selected.image, note: selected.note });
    savedNote.textContent = `${selected.name} added to your list.`;
  });

  closeDetail.addEventListener("click", () => {
    detailCard.classList.add("is-hidden");
  });

  renderBubbles();
  updateDetail(selected);
}

function renderFoods() {
  const catalog = document.querySelector("#food-catalog");
  catalog.innerHTML = foods.map((food) => `
    <article class="catalog-card" id="${food.id}">
      <img src="${food.image}" alt="${food.name}">
      <h2>${food.name}</h2>
      <p>${food.note}</p>
      <div class="tag-row">${food.benefits.map((benefit) => `<span class="tag">${benefit}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderSupplements() {
  const catalog = document.querySelector("#supplement-catalog");
  catalog.innerHTML = supplements.map((supplement) => `
    <article class="catalog-card" id="${supplement.id}">
      <img src="${supplement.image}" alt="${supplement.name}">
      <h2>${supplement.name}</h2>
      <p>${supplement.note}</p>
      <div class="tag-row">${supplement.labels.map((label) => `<span class="tag">${label}</span>`).join("")}</div>
      <button class="button ghost save-supplement" type="button" data-supplement="${supplement.id}">Add to list</button>
    </article>
  `).join("");

  document.querySelectorAll(".save-supplement").forEach((button) => {
    button.addEventListener("click", () => {
      const supplement = supplements.find((entry) => entry.id === button.dataset.supplement);
      saveItem({ type: "Supplement", id: supplement.id, name: supplement.name, image: supplement.image, note: supplement.note });
      button.textContent = "Added";
    });
  });
}

function renderSavedList() {
  const target = document.querySelector("#saved-list");
  const list = getList();

  if (list.length === 0) {
    target.innerHTML = `<article class="empty-state">No saved items yet. Add foods from the landing page or supplements from the supplement catalog.</article>`;
    return;
  }

  target.innerHTML = list.map((item) => `
    <article class="catalog-card">
      <img src="${item.image}" alt="${item.name}">
      <span class="tag">${item.type}</span>
      <h2>${item.name}</h2>
      <p>${item.note}</p>
    </article>
  `).join("");
}

if (page === "home") renderHome();
if (page === "foods") renderFoods();
if (page === "supplements") renderSupplements();
if (page === "lists") renderSavedList();
