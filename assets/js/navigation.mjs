export function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-header .nav");
  if (!header || !toggle || !nav) return;

  function setMenuOpen(isOpen) {
    header.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => {
    setMenuOpen(!header.classList.contains("menu-open"));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  const desktopQuery = window.matchMedia("(min-width: 781px)");
  const closeOnDesktop = (event) => {
    if (event.matches) setMenuOpen(false);
  };
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", closeOnDesktop);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(closeOnDesktop);
  }
}
