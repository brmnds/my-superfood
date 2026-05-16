# My Superfood

A bright static food and nutrition website for discovering superfoods, supplements, healthy recipes, saved lists, and a LuminaOS habit handoff.

The first version is intentionally simple: plain HTML, CSS, and JavaScript with local image assets plus a tiny AWS persistence layer for saved lists.

## Pages

- `index.html` - interactive Apple Watch-style superfood landing page.
- `foods.html` - list/catalog view of superfoods.
- `supplements.html` - table-first supplement product and ingredient catalog with source labels.
- `recipes.html` - healthy recipe feature page.
- `lists.html` - saved list powered by browser `localStorage`, anonymous DynamoDB sync, and optional LuminaOS account sync.
- `luminaos.html` - LuminaOS handoff page.

## Local Preview

Serve the folder with a static server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/index.html
```

## Technology

This repo currently has no package manager or frontend build step. It does not require `npm install`.

Saved lists use a small AWS backend:

- DynamoDB table: `my-superfood-list-items`
- Lambda Function URL: `https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws`
- Optional production account sync through `/api/*` on `my-superfood.com`

The supplement catalog has a separate read-only DynamoDB/Lambda path with local seed fallback:

- Seed: `data/supplement-catalog.seed.json`
- Tables: `my-superfood-supplements`, `my-superfood-supplement-products`
- Routes: `GET /supplements`, `GET /products`

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

Backend docs:

- `docs/database.md`
- `backend/README.md`
- `docs/luminaos-auth-handover.md`
- `docs/supplement-catalog-source-policy.md`

## Deployment

The chosen production deployment path is:

- S3 for static files.
- CloudFront for HTTPS and global delivery.
- ACM for TLS certificates.
- Route 53 for `my-superfood.com` and `www.my-superfood.com`.

See `steering/deployment.md` before changing deployment architecture.

## Verification

Run these before committing:

```bash
node --check script.js
node --check backend/list-api.mjs
node --check backend/catalog-api.mjs
node --check scripts/validate-supplement-catalog.mjs
node --check scripts/seed-supplement-catalog.mjs
node scripts/validate-supplement-catalog.mjs
git diff --check
```

For production smoke checks, verify that public pages still return `200`, `/api/auth/session` returns unauthenticated safe JSON without a session, `/api/auth/start` redirects to the configured LuminaOS Cognito client, and anonymous `/api/list` reads/writes still work before login.

## GitHub

This local repository is connected to the online GitHub repository:

https://github.com/brmnds/my-superfood
