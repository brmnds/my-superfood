import { initMobileMenu } from "./assets/js/navigation.mjs";
import { renderHome } from "./assets/js/home.mjs";
import { renderFoods } from "./assets/js/foods-page.mjs";
import { renderRecipes } from "./assets/js/recipes-page.mjs";
import { renderSupplementDirectory } from "./assets/js/supplement-directory-page.mjs";
import { renderSupplements } from "./assets/js/supplements-page.mjs";
import { renderSupplementBlog } from "./assets/js/supplement-blog-page.mjs";
import { authReady, renderAuthControls, renderSavedList, setAuthLogoutCallback } from "./assets/js/saved-list.mjs";

const page = document.body.dataset.page;

initMobileMenu();
setAuthLogoutCallback(() => {
  if (document.body.dataset.page === "lists") renderSavedList();
});

if (page === "home") renderHome();
if (page === "foods") renderFoods();
if (page === "recipes") renderRecipes();
if (page === "supplement-directory") renderSupplementDirectory();
if (page === "supplements") renderSupplements();
if (page === "supplement-blog") renderSupplementBlog();
if (page === "lists") renderSavedList();
if (page === "luminaos") authReady.then(renderAuthControls);
