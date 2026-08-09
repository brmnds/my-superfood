function renderSupplementDisclosures() {
  document.querySelectorAll(".blog-section-card").forEach((section) => {
    const headings = Array.from(section.children).filter((child) => child.tagName === "H3");

    headings.forEach((heading) => {
      const details = document.createElement("details");
      details.className = "supplement-entry";
      const productLink = heading.querySelector('a[href^="/supplements#product-"]');
      if (productLink) {
        details.dataset.productId = decodeURIComponent(productLink.getAttribute("href").split("#product-")[1] || "");
      }

      const summary = document.createElement("summary");
      summary.className = "supplement-entry-summary";
      summary.addEventListener("keydown", (event) => {
        if (event.target !== summary || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        details.open = !details.open;
      });
      const body = document.createElement("div");
      body.className = "supplement-entry-body";

      section.insertBefore(details, heading);
      details.append(summary, body);
      summary.append(heading);

      while (
        details.nextElementSibling
        && details.nextElementSibling.tagName !== "H3"
        && !details.nextElementSibling.classList.contains("blog-section-image")
      ) {
        body.append(details.nextElementSibling);
      }
    });
  });
}

function initBlogSubnav() {
  const subnav = document.querySelector("[data-blog-subnav]");
  const header = document.querySelector(".site-header");
  if (!subnav || !header) return;

  let ticking = false;

  const updatePosition = () => {
    const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const hideAfter = scrollableHeight / 3;
    subnav.classList.toggle("is-hidden", hideAfter > 0 && window.scrollY > hideAfter);
    ticking = false;
  };

  const updateHeaderOffset = () => {
    subnav.style.setProperty("--blog-header-offset", `${Math.round(header.getBoundingClientRect().height)}px`);
    updatePosition();
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updatePosition);
  }, { passive: true });
  window.addEventListener("resize", updateHeaderOffset);

  if ("ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(updateHeaderOffset);
    headerObserver.observe(header);
  }

  updateHeaderOffset();
}

function initBlogSectionNav() {
  const nav = document.querySelector("[data-blog-section-nav]");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  let ticking = false;

  const updateCurrentSection = () => {
    const marker = window.innerHeight * 0.42;
    let currentSection = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) currentSection = section;
    });

    links.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${currentSection.id}`;
      if (isCurrent) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateCurrentSection);
  }, { passive: true });
  window.addEventListener("resize", updateCurrentSection);
  updateCurrentSection();
}

export async function renderSupplementBlog() {
  initBlogSubnav();
  initBlogSectionNav();
  renderSupplementDisclosures();

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

  } catch (error) {
    console.error("Supplement blog enhancements could not load.", error);
  }
}
