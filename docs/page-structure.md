# Page Structure

Last reviewed: 2026-08-09

This is the current implemented page and frontend-module map for My Superfood. Product direction belongs in `docs/product-vision.md`; infrastructure belongs in `steering/deployment.md` and `docs/database.md`.

## Public Routes

| Clean route | HTML document | Page owner | Purpose |
| --- | --- | --- | --- |
| `/` | `index.html` | `assets/js/home.mjs` | Interactive food-bubble explorer with dietary and nutrition filters. |
| `/foods` | `foods.html` | `assets/js/foods-page.mjs` | Food card catalog with Vegan, Pescetarian, and Vegetarian views. |
| `/supplements` | `supplements.html` | `assets/js/supplements-page.mjs` | Searchable supplement and supplement-kit catalog. |
| `/supplement-directory` | `supplement-directory.html` | `assets/js/supplement-directory-page.mjs` | Active supplement primitive and combined-label directory. |
| `/supplement-blog` | `supplement-blog.html` | `assets/js/supplement-blog-page.mjs` | Tilman's expandable morning, daytime, and evening routine article. |
| `/recipes` | `recipes.html` | `assets/js/recipes-page.mjs` | Recipe catalog with Featured and List views. |
| `/lists` | `lists.html` | `assets/js/lists-page.mjs` and `assets/js/saved-list.mjs` | Accessible saved-food, supplement, and recipe tabs with optional LuminaOS sync. |
| `/luminaos` | `luminaos.html` | `assets/js/saved-list.mjs` | LuminaOS sign-in and nutrition-habit handoff. |
| `/privacy`, `/terms`, `/imprint` | matching `.html` files | static HTML | Legal and informational pages. |

`scripts/local-preview-server.mjs` and `backend/clean-url-cloudfront-function.js` must keep this clean-route map aligned. Canonical tags, `sitemap.xml`, `llms.txt`, and `data/site-entities.json` use the clean URLs.

## Shared Page Shell

Public pages use the same primary header and mobile navigation from `assets/js/navigation.mjs`. Foods, Supplements, Recipes, and Lists add a shared secondary headline bar below it. The supplement blog uses the same bar pattern with a back action.

`assets/js/shared.mjs` keeps the secondary bar below the measured primary-header height and hides it after roughly one-third of the page scroll. The bar contains:

- A page title and optional short subtitle.
- A view switcher, dietary selector, or account action when the page needs one.
- Responsive stacking at `780px` and below without document-level horizontal overflow.

Each page then renders one semantic `<main>` followed by the shared legal footer. Public pages remain usable without authentication.

## Frontend Ownership

- `script.js`: small dispatcher based on `body[data-page]`.
- `assets/js/navigation.mjs`: primary desktop/mobile navigation.
- `assets/js/shared.mjs`: shared secondary headline-bar behavior and common helpers.
- `assets/js/data/foods.mjs`: static food records and image references.
- `assets/js/data/recipes.mjs`: static recipe records and template content.
- `assets/js/data/supplement-relationships.mjs`: supplement relationship helpers.
- `assets/js/saved-list.mjs`: local persistence, anonymous sync, LuminaOS session state, saved-list tabs, and logout behavior.
- Page modules: render only their corresponding route-specific UI.

Keep shared behavior in a shared module only when at least two pages genuinely use the same flow. Keep `script.js` free of page implementation details.

## Responsive Baseline

- Main mobile navigation breakpoint: `780px`.
- Narrow-layout refinements: `520px` and below.
- Tables and chip rows may use intentional local horizontal scrolling; the document itself must not overflow horizontally.
- Food cards reserve two label rows so their Add to list buttons align.
- Recipe ingredient chips remain single-line and horizontally scrollable when space is limited.
- The landing food cloud is pannable and may extend beyond its visible stage without extending the document.

The August 9, 2026 review verified the main routes at desktop and mobile widths with no document-level horizontal overflow, broken images, or clipped headline-bar controls.
