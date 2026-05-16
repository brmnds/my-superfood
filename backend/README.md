# My Superfood Backend

Small AWS backend for My Superfood saved lists and the read-only supplement catalog.

## Files

- `list-api.mjs` - Lambda handler for list reads/writes plus optional LuminaOS OAuth sign-in routes.
- `lambda-trust-policy.json` - IAM role trust policy for Lambda.
- `list-api-role-policy.json` - least-privilege inline policy for CloudWatch Logs and the DynamoDB table.
- `lambda-env.json` - Lambda environment variables.
- `function-url-cors.json` - Function URL CORS config.
- `catalog-api.mjs` - Lambda handler for read-only supplement catalog routes.
- `catalog-api-role-policy.json` - least-privilege inline policy for catalog reads.
- `catalog-lambda-env.json` - catalog Lambda environment variables.
- `catalog-function-url-cors.json` - catalog Function URL CORS config.
- `catalog-table-supplements.json` - DynamoDB table definition for supplement primitives.
- `catalog-table-products.json` - DynamoDB table definition for supplement products.

## AWS Resources

- DynamoDB table: `my-superfood-list-items`
- Lambda function: `my-superfood-list-api`
- Lambda role: `my-superfood-list-api-role`
- Function URL: `https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws`
- Production API path: `/api/*` routed through CloudFront to `my-superfood-list-api`

Catalog resources:

- DynamoDB table: `my-superfood-supplements`
- DynamoDB table: `my-superfood-supplement-products`
- Lambda function: `my-superfood-catalog-api`
- Lambda role: `my-superfood-catalog-api-role`
- Routes:
  - `GET /supplements`
  - `GET /products`

## Deploy Lambda Code

```bash
zip -j /tmp/my-superfood-list-api.zip backend/list-api.mjs
aws lambda update-function-code \
  --function-name my-superfood-list-api \
  --zip-file fileb:///tmp/my-superfood-list-api.zip \
  --region eu-central-1
aws lambda wait function-updated \
  --function-name my-superfood-list-api \
  --region eu-central-1
```

For LuminaOS sign-in, set real values in AWS before enabling production `/api/*` routing:

```bash
aws lambda update-function-configuration \
  --function-name my-superfood-list-api \
  --environment file://backend/lambda-env.json \
  --region eu-central-1
```

Replace placeholder values in AWS with the real LuminaOS OAuth client id, JWKS URL, issuer, and `MY_SUPERFOOD_SESSION_SECRET`. Do not commit the real session secret or OAuth client secret.

The frontend only uses account sync when the site has a same-origin `/api` path, so local static preview remains anonymous unless you explicitly override `localStorage["my-superfood-account-api-base"]`.

See `docs/luminaos-auth-handover.md` for the exact LuminaOS-side OAuth configuration request and guardrails for keeping the normal LuminaOS login untouched.

The current production LuminaOS client is a public authorization-code + PKCE client. It does not use `LUMINAOS_OAUTH_CLIENT_SECRET`.

Smoke checks:

```bash
curl -s -i https://my-superfood.com/api/auth/session
curl -s -i https://my-superfood.com/api/auth/start
curl -s -i -H "Content-Type: application/json" -X POST https://my-superfood.com/api/auth/logout
curl -s -i "https://my-superfood.com/api/list?clientId=codex-anonymous-smoke"
```

## Deploy Catalog Resources

Create the catalog tables:

```bash
aws dynamodb create-table \
  --cli-input-json file://backend/catalog-table-supplements.json \
  --region eu-central-1
aws dynamodb create-table \
  --cli-input-json file://backend/catalog-table-products.json \
  --region eu-central-1
```

Validate and seed the reviewed catalog:

```bash
node scripts/validate-supplement-catalog.mjs
node scripts/seed-supplement-catalog.mjs
```

Deploy catalog Lambda code after the function and role exist:

```bash
zip -j /tmp/my-superfood-catalog-api.zip backend/catalog-api.mjs
aws lambda update-function-code \
  --function-name my-superfood-catalog-api \
  --zip-file fileb:///tmp/my-superfood-catalog-api.zip \
  --region eu-central-1
aws lambda wait function-updated \
  --function-name my-superfood-catalog-api \
  --region eu-central-1
```

See `docs/database.md` for the data model and cost notes.
