# Agent Instructions For My Superfood

## Project Shape

This repository is a static HTML/CSS/JavaScript site for My Superfood with small AWS backends for saved lists, optional LuminaOS sign-in, and the read-only supplement catalog.

There is currently no frontend package manager, build system, OpenAI Agents SDK, or frontend SDK dependency inside this folder. Do not add one unless the feature genuinely requires it.

Frontend JavaScript uses native ES modules without a bundler:

- `script.js` is the small page dispatcher.
- `assets/js/*-page.mjs` and `assets/js/home.mjs` own page behavior.
- `assets/js/data/foods.mjs` and `assets/js/data/recipes.mjs` hold static food and recipe data.
- `assets/js/saved-list.mjs` owns local lists, anonymous sync, and LuminaOS session UI.
- `data/supplement-catalog.seed.json` is the reviewed supplement catalog source of truth and DynamoDB reseed input.

Keep page-specific behavior in its existing module. Extract a shared module only when two or more pages genuinely share the same data flow or behavior.

## Local Preview

Use the local preview server from the repository root:

```bash
node scripts/local-preview-server.mjs
```

Then open:

```text
http://localhost:4173/
```

This local server mirrors the production CloudFront clean URL behavior for `/foods`, `/supplements`, `/supplement-directory`, `/supplement-blog`, `/recipes`, `/lists`, `/luminaos`, `/privacy`, `/terms`, and `/imprint`. If using `python3 -m http.server 4173` as a fallback, open physical `.html` files directly because Python's built-in server does not rewrite clean URLs.

## Browser Preview

Use the Codex in-app browser as the default browser for local preview and QA of this repository, especially for `localhost:4173` pages.

Use Playwright only when Tilman explicitly asks for Playwright, or when the Codex in-app browser is unavailable and a browser automation fallback is needed.

## Implementation Defaults

- Keep the app static for the current version.
- Prefer plain HTML, CSS, and vanilla JavaScript.
- Preserve the native ES module layout; keep `script.js` as a small entrypoint.
- Use the Google Sheet "Superfoods Ingredient List" as the working source of truth for food-catalog expansion: `https://docs.google.com/spreadsheets/d/1dCEn155n5p6si9olz1SYZJUy_Do3g6rTR7k3RLuh4nE/edit?gid=1787756073#gid=1787756073`.
- When adding foods from that sheet, prioritize rows where `Prioritization` is `Show`, preserve `Tilman Protocol` context where relevant, and do not add `Hide` rows unless Tilman explicitly asks for them.
- Keep saved-list persistence, optional LuminaOS account sync, and the catalog backend aligned with `docs/database.md` and `backend/README.md`.
- Keep supplement products linked to their primitive supplement entities. Exact product label amounts belong on product ingredient references; general informational ranges belong on supplement entities.
- Use `data/supplement-catalog.seed.json` as the reviewed catalog source of truth. Validate it before reseeding DynamoDB and never silently replace uncertain facts with guesses.
- Store local visual assets in `assets/images/`.
- Do not commit `.playwright-cli/` browser verification output.
- Keep full-resolution image backups under ignored `assets/images/originals/`. Do not deploy that folder.
- Use optimized food variants for public landing and catalog views. Do not add new public references to full-resolution food sources when an optimized variant exists.
- Keep generated or downloaded image source notes in `assets/images/real/sources.tsv`.
- Follow the picture steering files before adding or replacing visuals:
  - `steering/pictures-food.md`
  - `steering/pictures-recipes.md`
  - `steering/pictures-supplements.md`
  - `steering/pictures-brand.md`
- Update `docs/image-validation.md` after validating or replacing image assets.

## Design And Accessibility

- Follow `docs/design-principles.md` for the current visual system and interaction rules.
- Keep the interface calm, compact, table-first where comparison matters, and green-accented without changing established page structure unless Tilman asks.
- Use semantic buttons, links, headings, labels, and tables. Preserve keyboard focus, useful accessible names, sufficient contrast, and reduced-motion behavior.
- Use the mobile hamburger navigation at `780px` and below. Check mobile layouts for overflow, clipped controls, very long scan paths, and touch targets.
- For large catalogs, prefer search, filters, grouping, pagination, or progressive disclosure over rendering an unstructured wall of items.
- Keep public browsing available without sign-in. Never expose Cognito/OAuth tokens to page JavaScript or `localStorage`.

## Deployment Defaults

The approved deployment direction is AWS static hosting:

- S3 for static files.
- CloudFront for HTTPS, caching, and global delivery.
- ACM certificate in `us-east-1`.
- Route 53 alias records for `my-superfood.com` and `www.my-superfood.com`.
- DynamoDB table `my-superfood-list-items` for saved lists.
- Lambda function `my-superfood-list-api` for browser API access.
- DynamoDB tables `my-superfood-supplements` and `my-superfood-supplement-products` plus Lambda `my-superfood-catalog-api` for public supplement reads.

Do not switch to Amplify, Vercel, Netlify, or a framework deployment without an explicit product or workflow reason.
Do not reuse or modify the LuminaOS database for this project without an explicit product decision.
Keep S3 public access blocked, use CloudFront for public delivery, preserve clean URL rewrites, and keep the production security-headers policy attached.
Do not upload ignored originals, local QA artifacts, or secrets during static deployment.

## Verification

Before committing changes, run:

```bash
node --check script.js
for file in assets/js/*.mjs assets/js/data/*.mjs backend/*.mjs scripts/*.mjs; do node --check "$file" || exit 1; done
node --check scripts/local-preview-server.mjs
node scripts/validate-supplement-catalog.mjs
git diff --check
```

When changing asset references, also verify referenced files exist. For UI changes, use the Codex in-app browser to check the affected route at desktop and mobile widths, confirm there is no document-level horizontal overflow, and check browser warnings/errors. When public routes or entity descriptions change, also update `sitemap.xml`, `llms.txt`, `data/site-entities.json`, canonical metadata, and the relevant docs.
