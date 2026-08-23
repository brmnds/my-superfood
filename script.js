import { initMobileMenu } from "./assets/js/navigation.mjs";
import { initSecondaryHeader } from "./assets/js/shared.mjs?v=20260809-secondary-header";
import { renderHome } from "./assets/js/home.mjs?v=20260823-viktoria-guidance";
import { renderFoods } from "./assets/js/foods-page.mjs?v=20260809-clean-food-images";
import { renderRecipes } from "./assets/js/recipes-page.mjs?v=20260809-recipe-views";
import { renderSupplementDirectory } from "./assets/js/supplement-directory-page.mjs";
import { renderSupplements } from "./assets/js/supplements-page.mjs?v=20260823-protocol-groups";
import { renderSupplementBlog } from "./assets/js/supplement-blog-page.mjs";
import { initAccountHeader } from "./assets/js/account-header.mjs?v=20260809-lumina-header";
import { authReady, renderAuthControls, renderSavedList, setAuthLogoutCallback } from "./assets/js/saved-list.mjs";

const page = document.body.dataset.page;

initMobileMenu();
initSecondaryHeader();
setAuthLogoutCallback(() => {
  if (document.body.dataset.page === "lists") renderSavedList();
});

if (page === "home") renderHome();
if (page === "foods") renderFoods();
if (page === "recipes") renderRecipes();
if (page === "supplement-directory") renderSupplementDirectory();
if (page === "supplements") renderSupplements();
if (page === "supplement-blog") renderSupplementBlog();
if (page === "lists") {
  initAccountHeader();
  renderSavedList();
}
if (page === "luminaos") {
  initAccountHeader();
  authReady.then(renderAuthControls);
}
