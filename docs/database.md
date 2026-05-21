# Database

My Superfood now has a small AWS-backed persistence layer for saved list items and a separate read-only supplement catalog.

## Saved List Storage

Use DynamoDB with provisioned capacity:

- Table: `my-superfood-list-items`
- Region: `eu-central-1`
- Billing mode: provisioned capacity
- Capacity: `1` read capacity unit, `1` write capacity unit
- Primary key:
  - Partition key: `clientId` string
  - Sort key: `itemKey` string

This is intentionally cheap and low-maintenance. It avoids running a relational database instance and keeps list data separate from the LuminaOS production database.

## API

The browser does not talk to DynamoDB directly. It calls a Lambda Function URL:

```text
https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws
```

Lambda:

- Function: `my-superfood-list-api`
- Runtime: Node.js 20
- Memory: 128 MB
- Timeout: 10 seconds
- Role: `my-superfood-list-api-role`
- Production path when CloudFront is configured: `/api/*`

Allowed CORS origins:

- `https://my-superfood.com`
- `https://www.my-superfood.com`
- `http://localhost:4173`

## Data Model

Each browser gets an anonymous client id stored in local storage under:

```text
my-superfood-client-id
```

The physical DynamoDB partition key is still named `clientId` for backward compatibility. Application code treats it as an owner key:

```text
anonymous mode: clientId = anonymous#<browser client id>
legacy anonymous rows: clientId = <browser client id>
LuminaOS sync mode: clientId = luminaos#<LuminaOS user id>
itemKey = <type>#<id>
```

Stored fields:

- `id`
- `type`
- `name`
- `image`
- `note`
- `updatedAt`

This is not a sensitive-data store and should not be used for private health data.

## Optional LuminaOS Sign-In

Browsing remains public. Saved-list sync can optionally use LuminaOS identity:

- `GET /api/auth/start` starts LuminaOS/Cognito OAuth with PKCE.
- `GET /api/auth/callback` exchanges the code server-side, verifies the ID token, and sets a My Superfood httpOnly session cookie.
- `GET /api/auth/session` returns safe session state.
- `POST /api/auth/logout` clears the My Superfood session cookie.
- `GET /api/list` reads the signed-in LuminaOS-owned list when a valid session exists; otherwise it reads the anonymous list by `clientId`.
- `POST /api/list` writes to the signed-in LuminaOS-owned list when a valid session exists; otherwise it writes to the anonymous list.
- `POST /api/list/merge` merges browser-local items into the LuminaOS-owned list after login.

The browser never receives or stores LuminaOS/Cognito tokens. The Lambda derives `luminaos#<userId>` only after server-side token verification.

## Frontend Behavior

The frontend still writes to `localStorage` first so the UI stays responsive. Anonymous saved items use:

```text
my-superfood-list
```

Signed-in LuminaOS list rows use a separate browser cache:

```text
my-superfood-account-list-cache
```

That account cache stores only saved-list display rows, never LuminaOS tokens. It is cleared on logout or session expiry. After each local write, the frontend tries to save the same item to DynamoDB through the Lambda API. If the API is unavailable, the current browser list still works.

`lists.html` renders saved rows as a tabbed table workspace:

- Food lists
- Supplement lists
- Recipe lists

The tabs are a frontend view over the same saved-list rows. The saved item `type` field determines which table receives each row.

In local static preview, account sync is shown as unavailable until a same-origin `/api` route exists. In production, CloudFront should route `/api/*` to the list Lambda so My Superfood session cookies are scoped to `my-superfood.com`.

## Cost Guardrails

- Keep DynamoDB provisioned at `1` RCU / `1` WCU until usage proves otherwise.
- Keep Lambda at 128 MB.
- Do not add API Gateway unless Function URL becomes too limited.
- Do not use the LuminaOS database unless My Superfood becomes a real LuminaOS product surface with shared auth and a deliberate data model.
- Do not store secrets or medical/private health data in this v1 list table.
- Store OAuth client secrets and My Superfood session secrets only in AWS Lambda environment variables or a secrets manager. Do not commit real values.

## Verification

Smoke test save:

```bash
curl -s -i \
  -H 'Origin: http://localhost:4173' \
  -H 'Content-Type: application/json' \
  -X POST 'https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws/' \
  --data '{"clientId":"codex-smoke-test","item":{"type":"Food","id":"broccoli","name":"Broccoli","image":"assets/images/real/broccoli.jpg","note":"Smoke test item"}}'
```

Smoke test read:

```bash
curl -s -i \
  -H 'Origin: http://localhost:4173' \
  'https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws/?clientId=codex-smoke-test'
```

## Supplement Catalog Storage

The supplement catalog is intentionally separate from saved lists. It stores reviewed public catalog data, not user health data.

Tables:

- `my-superfood-supplements`
- `my-superfood-supplement-products`

Both tables use:

- Region: `eu-central-1`
- Billing mode: provisioned capacity
- Capacity: `1` read capacity unit, `1` write capacity unit
- Primary key: `id` string

Records store a small query envelope plus the reviewed JSON document:

- `id`
- `name`
- `sourceStatus`
- `document`
- `updatedAt`

The document payload preserves catalog fields such as `shopUrl`, `timing`, and `storage` unchanged. `shopUrl` is limited to official provider/shop pages. `timing` is source-backed informational guidance for morning/daytime/evening UI hints; it is not medical advice or a personalized schedule. `storage` distinguishes true refrigerator storage from ordinary cool/dry or room-temperature storage so the UI can show the subtle snowflake filter without implying that all cool-storage products belong in the fridge.

The repo source of truth is:

```text
data/supplement-catalog.seed.json
```

## Supplement Catalog API

The catalog API is read-only and separate from the saved-list Lambda:

- Function: `my-superfood-catalog-api`
- Function URL: `https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws`
- Runtime: Node.js 20
- Memory: 128 MB
- Timeout: 3 seconds
- Routes:
  - `GET /supplements`
  - `GET /products`

Allowed CORS origins:

- `https://my-superfood.com`
- `https://www.my-superfood.com`
- `http://localhost:4173`

The UI still calls these rows "Supplement Products" in docs and user-facing copy. The API route is shorter: `/products`.

`supplements.html` fetches the catalog API first. If the API fails or is unavailable, the page renders the reviewed static fallback from:

```text
data/supplement-catalog.seed.json
```

This keeps the public catalog usable while preserving DynamoDB as the deployed source for catalog reads.

Smoke test catalog reads:

```bash
curl -s -i \
  -H 'Origin: http://localhost:4173' \
  'https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws/supplements'

curl -s -i \
  -H 'Origin: http://localhost:4173' \
  'https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws/products'
```

## Catalog Source Policy

Use official provider product pages first when they expose exact supplement-facts data, including ingredient amount, unit, and serving basis. Use package photos supplied by Tilman as verification evidence, cross-checks, and fallback when official online facts are missing or ambiguous.

The current reviewed seed uses the JPEG package evidence in:

```text
/Users/tilmanresch/Downloads/iloveimg-converted (1)
```

Package photos are evidence/provenance and are not public product thumbnails in this pass. For Blueprint/Bryan Johnson products, official Blueprint pages are the preferred source of truth when exact supplement facts are available online.

For Sunday Natural products, use the exact official product page that matches the ordered name and SKU. The current research note is:

```text
docs/sunday-natural-supplement-research.md
```

Mixed-provider products from Swanson, NOW Foods, natural elements, and similar brands follow the same rule: exact official product page first, Tilman's package photo as provenance, and ingredient rows linked back to primitive supplements. The current mixed-provider research note is:

```text
docs/tilman-additional-supplement-research.md
```

Every product ingredient must reference a supplement primitive through `supplementId`. Exact per-serving product amounts live on product ingredient rows. General daily recommendation ranges live on supplement rows and are informational only, not medical advice.

Storage guidance follows the same source policy. Only products with explicit provider/package refrigerator guidance should set `storage.requiresRefrigeration: true`; "cool dry place" remains `cool_dry`.

Allowed source statuses:

- `package_verified`
- `website_sourced`
- `needs_review`

Unclear label reads must stay `needs_review`; do not guess.
