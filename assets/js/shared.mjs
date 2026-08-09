export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function optimizedFoodImagePath(image, variant = "catalog") {
  const fileName = String(image || "").split("/").pop() || "";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  if (!baseName) return image;
  return `/assets/images/optimized/${variant}/${baseName}.jpg`;
}

export function initSecondaryHeader() {
  const secondaryHeader = document.querySelector("[data-secondary-header]");
  const siteHeader = document.querySelector(".site-header");
  if (!secondaryHeader || !siteHeader) return;

  let ticking = false;

  const updateVisibility = () => {
    const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const hideAfter = scrollableHeight / 3;
    secondaryHeader.classList.toggle("is-hidden", hideAfter > 0 && window.scrollY > hideAfter);
    ticking = false;
  };

  const updateHeaderOffset = () => {
    secondaryHeader.style.setProperty("--secondary-header-offset", `${Math.round(siteHeader.getBoundingClientRect().height)}px`);
    updateVisibility();
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateVisibility);
  }, { passive: true });
  window.addEventListener("resize", updateHeaderOffset);

  if ("ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(updateHeaderOffset);
    headerObserver.observe(siteHeader);
  }

  updateHeaderOffset();
}
