# My Superfood

A bright static food and nutrition website for discovering superfoods, supplements, healthy recipes, saved lists, and a LuminaOS habit handoff.

The first version is intentionally simple: plain HTML, CSS, and JavaScript with local image assets plus a tiny AWS persistence layer for saved lists.

## Pages

- `index.html` - interactive Apple Watch-style superfood landing page.
- `foods.html` - list/catalog view of superfoods.
- `supplements.html` - searchable table-first supplement product and ingredient catalog with source labels.
- `supplement-directory.html` - active protocol directory that shows each supplement primitive, where it appears, and combined active label amounts.
- `supplement-blog.html` - Tilman Resch's current supplement routine, morning shake, official product links, and product-overlap review, linked from the supplements heading.
- `recipes.html` - healthy recipe feature page.
- `lists.html` - tabbed saved-list workspace for foods, supplements, and recipes, powered by browser `localStorage`, anonymous DynamoDB sync, and optional LuminaOS account sync.
- `luminaos.html` - LuminaOS handoff page.
- `privacy.html`, `terms.html`, `imprint.html` - simple legal and informational pages with clean URL routes.
- `sitemap.xml`, `robots.txt`, `llms.txt` - crawl and AI-search guidance for search engines and generative answer engines.

## Local Preview

Serve the folder with the local preview server:

```bash
node scripts/local-preview-server.mjs
```

Then open:

```text
http://localhost:4173/
```

This mirrors the production clean URL behavior, so `/foods`, `/supplements`, `/supplement-directory`, `/supplement-blog`, `/recipes`, `/lists`, `/luminaos`, `/privacy`, `/terms`, and `/imprint` work locally.

If you use `python3 -m http.server 4173` directly, open the physical `.html` files such as `http://localhost:4173/lists.html`; Python's built-in static server does not rewrite `/lists` to `lists.html`.

## Technology

This repo currently has no package manager or frontend build step. It does not require `npm install`.

Frontend JavaScript uses native ES modules:

- `script.js` is the small browser entrypoint and dispatches by `body[data-page]`.
- `assets/js/data/foods.mjs` and `assets/js/data/recipes.mjs` hold static catalog data.
- `assets/js/home.mjs`, `assets/js/foods-page.mjs`, `assets/js/recipes-page.mjs`, and `assets/js/supplements-page.mjs` render page-specific UI.
- `assets/js/saved-list.mjs` owns saved-list persistence and LuminaOS auth/session helpers.
- `assets/js/navigation.mjs` and `assets/js/shared.mjs` hold shared header and utility code.

All public pages load `script.js` with `<script type="module">`; keep the site no-build unless there is a clear product reason to introduce a bundler.

Saved lists use a small AWS backend:

- DynamoDB table: `my-superfood-list-items`
- Lambda Function URL: `https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws`
- Optional production account sync through `/api/*` on `my-superfood.com`

The Lists page groups saved rows into tabular views:

- Food lists
- Supplement lists
- Recipe lists

The supplement catalog has a separate read-only DynamoDB/Lambda path with local seed fallback:

- Seed: `data/supplement-catalog.seed.json`
- Tables: `my-superfood-supplements`, `my-superfood-supplement-products`
- Catalog API: `https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws`
- Routes: `GET /supplements`, `GET /products`
- Frontend behavior: use a fresh 5-minute local catalog cache, fetch the live catalog API when stale, fall back to stale cache if the API is unavailable, and finally fall back to the reviewed seed JSON.
- Supplement Product rows can include official `shopUrl` links and source-backed `timing` guidance. Timing is informational only and is shown with quiet morning/day/evening icons plus hover notes.
- The supplements page includes a compact search field next to the `Supplements` / `Supplement Kits` tabs. It searches the active tab by title, subtitle/alias metadata, purpose, categories, and kit ingredients where relevant.

See `docs/database.md`.

The local agent instructions are in `AGENTS.md`.

Steering docs:

- `steering/technology.md`
- `steering/deployment.md`
- `steering/pictures-food.md`
- `steering/pictures-recipes.md`
- `steering/pictures-supplements.md`
- `steering/pictures-brand.md`

Image validation:

- `docs/image-validation.md`

Food image optimization:

- Original food image files are backed up locally under ignored `assets/images/originals/`.
- Landing bubbles use generated `assets/images/optimized/landing/*.jpg` variants at up to `320x320`.
- Food catalog cards and landing detail images use generated `assets/images/optimized/catalog/*.jpg` variants at up to `640x640`.
- Regenerate variants with `node scripts/generate-food-image-variants.mjs` after adding or replacing food images.

SEO and generative search:

- Keep clean canonical URLs in page heads.
- Keep `sitemap.xml` updated whenever public routes change.
- Keep `robots.txt` pointing to the sitemap and allowing intended search/AI crawlers.
- Keep `llms.txt` and `data/site-entities.json` updated with the public page map, entity model, machine-readable endpoints, and non-medical-advice context.
- See `docs/seo-and-ai-search.md` before changing crawl, structured data, or generative-search behavior.

Backend docs:

- `docs/database.md`
- `docs/design-principles.md`
- `docs/seo-and-ai-search.md`
- `backend/README.md`
- `docs/luminaos-auth-handover.md`
- `docs/supplement-catalog-source-policy.md`
- `docs/sunday-natural-supplement-research.md`

## Deployment

The chosen production deployment path is:

- S3 for static files.
- CloudFront for HTTPS and global delivery.
- CloudFront Function for clean URL rewrites and `.html` redirects.
- ACM for TLS certificates.
- Route 53 for `my-superfood.com` and `www.my-superfood.com`.

See `steering/deployment.md` before changing deployment architecture.

## Verification

Run these before committing:

```bash
node --check script.js
node --check backend/list-api.mjs
node --check backend/catalog-api.mjs
node --check scripts/local-preview-server.mjs
node --check scripts/validate-supplement-catalog.mjs
node --check scripts/seed-supplement-catalog.mjs
node scripts/validate-supplement-catalog.mjs
git diff --check
```

For production smoke checks, verify that public pages still return `200`, `/api/auth/session` returns unauthenticated safe JSON without a session, `/api/auth/start` redirects to the configured LuminaOS Cognito client, and anonymous `/api/list` reads/writes still work before login.

## GitHub

This local repository is connected to the online GitHub repository:

https://github.com/brmnds/my-superfood
