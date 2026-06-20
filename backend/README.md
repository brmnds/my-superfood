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
- `clean-url-cloudfront-function.js` - CloudFront Function source for clean static page URLs.

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
- Function URL: `https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws`
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

The catalog API is read-only. It serves public supplement catalog documents from DynamoDB and stays separate from the saved-list API.

`backend/catalog-api.mjs` uses short module-scope in-memory caches for `/supplements` and `/products`. Warm Lambda containers reuse scanned DynamoDB results for 5 minutes and responses keep `cache-control: public, max-age=300`. Reseeded data may therefore take up to 5 minutes, or a cold Lambda container, to appear through the Function URL.

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

The seed validator also checks official `shopUrl` values and the supplement `timing` shape. Timing and storage are source-backed informational catalog metadata and are stored inside each DynamoDB document without backend transformation.

If deploying the catalog Lambda from scratch, create the role and attach the read-only policy:

```bash
aws iam create-role \
  --role-name my-superfood-catalog-api-role \
  --assume-role-policy-document file://backend/lambda-trust-policy.json

aws iam put-role-policy \
  --role-name my-superfood-catalog-api-role \
  --policy-name my-superfood-catalog-api-policy \
  --policy-document file://backend/catalog-api-role-policy.json
```

Create the function:

```bash
zip -j /tmp/my-superfood-catalog-api.zip backend/catalog-api.mjs
aws lambda create-function \
  --function-name my-superfood-catalog-api \
  --runtime nodejs20.x \
  --role arn:aws:iam::803663093100:role/my-superfood-catalog-api-role \
  --handler catalog-api.handler \
  --zip-file fileb:///tmp/my-superfood-catalog-api.zip \
  --environment file://backend/catalog-lambda-env.json \
  --region eu-central-1
aws lambda wait function-active \
  --function-name my-superfood-catalog-api \
  --region eu-central-1
```

Create the Function URL and allow public read-only invocation:

```bash
aws lambda create-function-url-config \
  --function-name my-superfood-catalog-api \
  --auth-type NONE \
  --cors file://backend/catalog-function-url-cors.json \
  --region eu-central-1

aws lambda add-permission \
  --function-name my-superfood-catalog-api \
  --statement-id FunctionURLAllowPublicAccess \
  --action lambda:InvokeFunctionUrl \
  --principal '*' \
  --function-url-auth-type NONE \
  --region eu-central-1

aws lambda add-permission \
  --function-name my-superfood-catalog-api \
  --statement-id FunctionURLAllowPublicInvokeFunction \
  --action lambda:InvokeFunction \
  --principal '*' \
  --invoked-via-function-url \
  --region eu-central-1
```

Deploy catalog Lambda code after the function exists:

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

Smoke checks:

```bash
curl -s -i \
  -H 'Origin: http://localhost:4173' \
  https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws/supplements

curl -s -i \
  -H 'Origin: http://localhost:4173' \
  https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws/products
```

See `docs/database.md` for the data model and cost notes.

## Deploy Clean URL Function

The production CloudFront distribution uses `backend/clean-url-cloudfront-function.js` as a viewer request function on the static site behavior. It rewrites clean paths such as `/supplement-directory`, `/supplement-blog`, `/lists`, `/privacy`, `/terms`, and `/imprint` to their physical S3 `.html` objects, and redirects legacy `.html` URLs to their clean canonical URLs.

After changing this function, publish a new CloudFront Function version, associate it with the distribution default cache behavior if needed, and invalidate CloudFront.

## Security Response Headers

CloudFront should attach the custom response headers policy defined in `backend/security-response-headers-policy.json` to the static behavior and the `/api/*` behavior. This adds HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive `Permissions-Policy`.

The policy intentionally does not set a Content Security Policy yet because the supplement page still fetches the public catalog Lambda Function URL directly. Add CSP only after allowing the required `connect-src` origins or moving catalog reads behind same-origin `/api` routing.
