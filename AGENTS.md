# Agent Instructions For My Superfood

## Project Shape

This repository is a static HTML/CSS/JavaScript site for My Superfood with a small AWS backend for saved lists.

There is currently no frontend package manager, build system, OpenAI Agents SDK, or frontend SDK dependency inside this folder. Do not add one unless the feature genuinely requires it.

## Local Preview

Use the local preview server from the repository root:

```bash
node scripts/local-preview-server.mjs
```

Then open:

```text
http://localhost:4173/
```

This local server mirrors the production CloudFront clean URL behavior for `/foods`, `/supplements`, `/recipes`, `/lists`, and `/luminaos`. If using `python3 -m http.server 4173` as a fallback, open physical `.html` files directly because Python's built-in server does not rewrite clean URLs.

## Browser Preview

Use the Codex in-app browser as the default browser for local preview and QA of this repository, especially for `localhost:4173` pages.

Use Playwright only when Tilman explicitly asks for Playwright, or when the Codex in-app browser is unavailable and a browser automation fallback is needed.

## Implementation Defaults

- Keep the app static for the current version.
- Prefer plain HTML, CSS, and vanilla JavaScript.
- Keep shared data in `script.js` until the project needs a structured data source.
- Keep saved-list persistence on the existing DynamoDB + Lambda Function URL backend documented in `docs/database.md`.
- Store local visual assets in `assets/images/`.
- Do not commit `.playwright-cli/` browser verification output.
- Keep generated or downloaded image source notes in `assets/images/real/sources.tsv`.
- Follow the picture steering files before adding or replacing visuals:
  - `steering/pictures-food.md`
  - `steering/pictures-recipes.md`
  - `steering/pictures-supplements.md`
  - `steering/pictures-brand.md`
- Update `docs/image-validation.md` after validating or replacing image assets.

## Deployment Defaults

The approved deployment direction is AWS static hosting:

- S3 for static files.
- CloudFront for HTTPS, caching, and global delivery.
- ACM certificate in `us-east-1`.
- Route 53 alias records for `my-superfood.com` and `www.my-superfood.com`.
- DynamoDB table `my-superfood-list-items` for saved lists.
- Lambda function `my-superfood-list-api` for browser API access.

Do not switch to Amplify, Vercel, Netlify, or a framework deployment without an explicit product or workflow reason.
Do not reuse or modify the LuminaOS database for this project without an explicit product decision.

## Verification

Before committing changes, run:

```bash
node --check script.js
node --check scripts/local-preview-server.mjs
git diff --check
```

When changing asset references, also verify referenced files exist.
