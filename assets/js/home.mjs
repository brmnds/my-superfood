import { foods } from "./data/foods.mjs";
import { escapeHtml, optimizedFoodImagePath } from "./shared.mjs";
import { saveItem } from "./saved-list.mjs";

export function renderHome() {
  const orbit = document.querySelector("#food-orbit");
  const detailTitle = document.querySelector("#detail-title");
  const detailImage = document.querySelector("#detail-image");
  const detailBenefits = document.querySelector("#detail-benefits");
  const addButton = document.querySelector("#add-to-list");
  const openDetail = document.querySelector("#open-detail");
  const savedNote = document.querySelector("#saved-note");
  const detailCard = document.querySelector("#detail-card");
  const closeDetail = document.querySelector(".close-detail");
  if (!orbit || !detailTitle || !detailImage || !detailBenefits || !addButton || !openDetail || !detailCard || !closeDetail) return;
  let selected = foods[0];
  let activeFilter = "all";
  let activeDiet = "pescatarian";
  let cloudX = 0;
  let cloudY = 0;
  let didPan = false;
  let clickToOpenOnly = true;
  let panBlockUntil = 0;

  function hideDetail() {
    clickToOpenOnly = true;
    detailCard.classList.add("is-hidden");
    document.querySelectorAll(".food-bubble").forEach((button) => button.classList.remove("is-selected"));
  }

  function updateDetail(food, options = {}) {
    if (clickToOpenOnly && !options.fromClick) return;
    selected = food;
    detailTitle.textContent = food.name;
    detailImage.src = optimizedFoodImagePath(food.image, "catalog");
    detailImage.alt = food.name;
    detailImage.draggable = false;
    detailBenefits.innerHTML = food.benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("");
    openDetail.href = `/foods#${food.id}`;
    savedNote.textContent = "";
    detailCard.classList.remove("is-hidden");
    document.querySelectorAll(".food-bubble").forEach((button) => button.classList.toggle("is-selected", button.dataset.food === food.id));
  }

  function setCloudPosition(x, y) {
    const cloud = orbit.querySelector(".food-cloud");
    if (!cloud) return;

    const orbitRect = orbit.getBoundingClientRect();
    const cloudRect = cloud.getBoundingClientRect();
    const minX = Math.min(0, orbitRect.width - cloudRect.width);
    const minY = Math.min(0, orbitRect.height - cloudRect.height);

    cloudX = Math.min(0, Math.max(minX, x));
    cloudY = Math.min(0, Math.max(minY, y));
    cloud.style.transform = `translate3d(${cloudX}px, ${cloudY}px, 0)`;
  }

  function layoutCloud() {
    const cloud = orbit.querySelector(".food-cloud");
    if (!cloud) return;

    const orbitRect = orbit.getBoundingClientRect();
    const orbitWidth = orbitRect.width;
    const orbitHeight = orbitRect.height;
    const bubbles = Array.from(cloud.querySelectorAll(".food-bubble"));
    const isFullCloud = activeFilter === "all" && bubbles.length > 60;
    const widthScale = isFullCloud ? (orbitWidth < 560 ? 3.1 : 3.2) : (orbitWidth < 560 ? 2.15 : 1.52);
    const heightScale = isFullCloud ? (orbitWidth < 560 ? 1.9 : 1.72) : (orbitWidth < 560 ? 1.65 : 1.38);
    const cloudWidth = Math.round(Math.max(orbitWidth * widthScale, orbitWidth + (isFullCloud ? 920 : 420)));
    const cloudHeight = Math.round(Math.max(orbitHeight * heightScale, orbitHeight + (isFullCloud ? 340 : 210)));
    const edgePadding = orbitWidth < 560 ? 88 : 120;
    const rowCount = orbitWidth < 560 ? 7 : 5;
    const usableWidth = cloudWidth - edgePadding * 2;
    const usableHeight = cloudHeight - edgePadding * 2;
    const cellHeight = usableHeight / rowCount;
    const baseBubbleSize = orbitWidth < 560 ? 82 : orbitWidth < 900 ? 100 : 112;

    cloud.style.width = `${cloudWidth}px`;
    cloud.style.height = `${cloudHeight}px`;

    const rowBuckets = Array.from({ length: rowCount }, () => []);
    bubbles
      .slice()
      .sort((a, b) => seededFraction(`food:${a.dataset.food}`) - seededFraction(`food:${b.dataset.food}`))
      .forEach((button, index) => {
        rowBuckets[index % rowCount].push(button);
      });

    rowBuckets.forEach((row, rowIndex) => {
      row
        .slice()
        .sort((a, b) => seededFraction(`row:${rowIndex}:${a.dataset.food}`) - seededFraction(`row:${rowIndex}:${b.dataset.food}`))
        .forEach((button, slotIndex) => {
          const foodId = button.dataset.food || "";
          const bubbleSize = Math.round(baseBubbleSize * (0.84 + seededFraction(`${foodId}:size`) * 0.2));
          const slotWidth = usableWidth / row.length;
          const rowOffset = (seededFraction(`row-offset:${rowIndex}`) - 0.5) * slotWidth * 0.42;
          const jitterX = (seededFraction(`${foodId}:x`) - 0.5) * Math.max(20, slotWidth - bubbleSize - 24);
          const jitterY = (seededFraction(`${foodId}:y`) - 0.5) * Math.max(12, cellHeight - bubbleSize - 34);
          const x = edgePadding + slotIndex * slotWidth + (slotWidth - bubbleSize) / 2 + rowOffset + jitterX;
          const y = edgePadding + rowIndex * cellHeight + (cellHeight - bubbleSize) / 2 + jitterY;
          button.style.setProperty("--bubble-size", `${bubbleSize}px`);
          button.style.setProperty("--bubble-x", `${Math.max(edgePadding, Math.min(cloudWidth - bubbleSize - edgePadding, x))}px`);
          button.style.setProperty("--bubble-y", `${Math.max(edgePadding, Math.min(cloudHeight - bubbleSize - edgePadding, y))}px`);
        });
    });

    setCloudPosition(cloudX, cloudY);
  }

  function seededFraction(value) {
    let hash = 2166136261;
    const input = `my-superfood:${value}`;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0) / 4294967295;
  }

  function filteredFoods() {
    const dietFoods = foods.filter((food) => matchesDiet(food));
    if (activeFilter === "all") return dietFoods;
    if (activeFilter === "tilman") return dietFoods.filter((food) => food.tilmanProtocol);
    return dietFoods.filter((food) => food.categories.includes(activeFilter));
  }

  function matchesDiet(food) {
    const dietType = food.dietType || "vegan";
    if (activeDiet === "vegan") return dietType === "vegan";
    if (activeDiet === "pescatarian") return dietType === "vegan" || dietType === "pescatarian";
    if (activeDiet === "vegetarian") return dietType === "vegan" || dietType === "vegetarian";
    return true;
  }

  function renderBubbles() {
    const visibleFoods = filteredFoods();
    if (!visibleFoods.some((food) => food.id === selected.id)) {
      selected = visibleFoods[0] || foods[0];
    }

    orbit.innerHTML = `
      <div class="food-cloud" id="food-cloud">
        ${visibleFoods.map((food, index) => {
          const duration = (6.1 + seededFraction(`${food.id}:motion-duration`) * 2.3).toFixed(2);
          const float = Math.round(14 + seededFraction(`${food.id}:motion-float`) * 10);
          const floatSoft = Math.round(7 + seededFraction(`${food.id}:motion-float-soft`) * 7);
          const drift = Math.round((seededFraction(`${food.id}:motion-drift`) - 0.5) * 24);
          const driftAlt = Math.round((seededFraction(`${food.id}:motion-drift-alt`) - 0.5) * 18);
          const tilt = (seededFraction(`${food.id}:motion-tilt`) - 0.5) * 5.2;
          const tiltAlt = (seededFraction(`${food.id}:motion-tilt-alt`) - 0.5) * 3.8;
          const motionStyle = [
            `--delay:${(index * -0.43).toFixed(2)}s`,
            `--duration:${duration}s`,
            `--float:${float}px`,
            `--float-soft:${floatSoft}px`,
            `--drift:${drift}px`,
            `--drift-alt:${driftAlt}px`,
            `--tilt:${tilt.toFixed(2)}deg`,
            `--tilt-alt:${tiltAlt.toFixed(2)}deg`
          ].join("; ");

          return `
          <button class="food-bubble" type="button" data-food="${escapeHtml(food.id)}" style="${motionStyle};" aria-label="${escapeHtml(food.name)}">
            <img src="${escapeHtml(optimizedFoodImagePath(food.image, "landing"))}" alt="" draggable="false" loading="lazy" decoding="async">
            <span class="bubble-label">${escapeHtml(food.name)}</span>
          </button>
        `;
        }).join("")}
      </div>
    `;

    document.querySelectorAll(".food-bubble").forEach((button) => {
      const food = foods.find((entry) => entry.id === button.dataset.food);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        if (didPan || Date.now() < panBlockUntil) {
          event.preventDefault();
          return;
        }
        clickToOpenOnly = false;
        updateDetail(food, { fromClick: true });
      });
    });

    layoutCloud();
    updateDetail(selected);
  }

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((entry) => entry.classList.toggle("active", entry === button));
      renderBubbles();
      hideDetail();
    });
  });

  document.querySelectorAll(".diet-toggle-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeDiet = button.dataset.diet;
      document.querySelectorAll(".diet-toggle-button").forEach((entry) => entry.classList.toggle("active", entry === button));
      renderBubbles();
      hideDetail();
    });
  });

  addButton.addEventListener("click", () => {
    saveItem({ type: "Food", id: selected.id, name: selected.name, image: optimizedFoodImagePath(selected.image, "catalog"), note: selected.note });
    savedNote.textContent = `${selected.name} added to your list.`;
  });

  closeDetail.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    hideDetail();
  });

  document.addEventListener("pointerdown", (event) => {
    if (detailCard.classList.contains("is-hidden")) return;
    if (event.target.closest(".detail-card, .food-bubble")) return;
    hideDetail();
  });

  detailCard.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 780px)").matches) return;
    if (event.target.closest("button, a")) return;

    const stage = document.querySelector(".bubble-stage");
    const stageRect = stage.getBoundingClientRect();
    const cardRect = detailCard.getBoundingClientRect();
    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    detailCard.classList.add("is-dragging");
    detailCard.setPointerCapture(event.pointerId);

    const moveCard = (moveEvent) => {
      const nextX = Math.min(
        Math.max(8, moveEvent.clientX - stageRect.left - offsetX),
        stageRect.width - cardRect.width - 8
      );
      const nextY = Math.min(
        Math.max(8, moveEvent.clientY - stageRect.top - offsetY),
        stageRect.height - cardRect.height - 8
      );

      detailCard.style.left = `${nextX}px`;
      detailCard.style.top = `${nextY}px`;
      detailCard.style.right = "auto";
      detailCard.style.bottom = "auto";
    };

    const stopDrag = () => {
      detailCard.classList.remove("is-dragging");
      detailCard.removeEventListener("pointermove", moveCard);
      detailCard.removeEventListener("pointerup", stopDrag);
      detailCard.removeEventListener("pointercancel", stopDrag);
    };

    detailCard.addEventListener("pointermove", moveCard);
    detailCard.addEventListener("pointerup", stopDrag);
    detailCard.addEventListener("pointercancel", stopDrag);
  });

  orbit.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary) return;

    const startX = event.clientX;
    const startY = event.clientY;
    const originX = cloudX;
    const originY = cloudY;
    const startBubble = event.target.closest(".food-bubble");
    didPan = false;

    orbit.classList.add("is-panning");
    orbit.setPointerCapture(event.pointerId);

    const moveCloud = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const hasMovedEnoughToPan = Math.hypot(deltaX, deltaY) > 12;
      if (!hasMovedEnoughToPan && !didPan) return;
      didPan = true;
      setCloudPosition(originX + deltaX, originY + deltaY);
    };

    const stopPan = () => {
      orbit.classList.remove("is-panning");
      orbit.removeEventListener("pointermove", moveCloud);
      orbit.removeEventListener("pointerup", stopPan);
      orbit.removeEventListener("pointercancel", stopPan);
      if (didPan) panBlockUntil = Date.now() + 180;
      if (!didPan && startBubble) {
        const food = foods.find((entry) => entry.id === startBubble.dataset.food);
        if (food) {
          clickToOpenOnly = false;
          updateDetail(food, { fromClick: true });
        }
      }
      window.setTimeout(() => {
        didPan = false;
      }, 180);
    };

    orbit.addEventListener("pointermove", moveCloud);
    orbit.addEventListener("pointerup", stopPan);
    orbit.addEventListener("pointercancel", stopPan);
  });

  window.addEventListener("resize", layoutCloud);
  renderBubbles();
  updateDetail(selected);
}
