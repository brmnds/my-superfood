# LuminaOS Auth Handover

This documents the optional LuminaOS sign-in integration for My Superfood saved-list sync.

## What My Superfood Already Handles

My Superfood remains public and browsable without an account. The optional account flow is limited to saved lists.

Implemented in this repository:

- A My Superfood auth bridge in `backend/list-api.mjs`.
- OAuth authorization-code + PKCE start and callback routes:
  - `GET /api/auth/start`
  - `GET /api/auth/callback`
- Session routes:
  - `GET /api/auth/session`
  - `POST /api/auth/logout`
- Account-aware saved-list routes:
  - `GET /api/list`
  - `POST /api/list`
  - `POST /api/list/merge`
- Server-side ID token verification using LuminaOS JWKS, issuer, and audience.
- A My Superfood-only signed httpOnly session cookie.
- DynamoDB owner keys:
  - anonymous: `anonymous#<clientId>`
  - LuminaOS user: `luminaos#<userId>`
- Browser fallback to local saved lists if account sync is unavailable.

My Superfood does not store LuminaOS passwords. It does not expose Cognito/LuminaOS tokens to page JavaScript.

## Current Production Status

LuminaOS OAuth is enabled for My Superfood through a dedicated public authorization-code + PKCE client.

Configured non-secret values:

- Client id: `2gl4uui60sb1ghqlv43m5nfcq`
- Issuer: `https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_8BAkGVFmj`
- JWKS: `https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_8BAkGVFmj/.well-known/jwks.json`
- Authorize URL: `https://luminaos-dev-auth-dev.auth.eu-central-1.amazoncognito.com/oauth2/authorize`
- Token URL: `https://luminaos-dev-auth-dev.auth.eu-central-1.amazoncognito.com/oauth2/token`
- Client secret: none

My Superfood production routes `/api/*` through CloudFront to `my-superfood-list-api`, so the My Superfood session cookie is scoped to `my-superfood.com`.

## LuminaOS Backend Request

Keep My Superfood as a separate OAuth relying party for LuminaOS identity.

Prefer a dedicated OAuth/Cognito app client for My Superfood instead of changing the existing LuminaOS web, mobile, or watch login clients.

Required production callback:

```text
https://my-superfood.com/api/auth/callback
```

Add `https://www.my-superfood.com/api/auth/callback` only if `www` will also be a login entrypoint instead of redirecting to the apex domain.

Required scopes:

```text
openid email profile
```

The ID token must include a stable LuminaOS user identifier. Preferred claim order on the My Superfood side is:

```text
custom:user_id
user_id
sub
```

If LuminaOS already uses `custom:user_id` for its own app session identity, keep that behavior. If not, confirm that `sub` is stable enough for My Superfood saved-list ownership.

## Values For My Superfood Deploy

These values belong in the My Superfood Lambda environment:

```text
LUMINAOS_OAUTH_CLIENT_ID
LUMINAOS_OAUTH_ISSUER
LUMINAOS_OAUTH_JWKS_URL
LUMINAOS_OAUTH_AUTHORIZE_URL
LUMINAOS_OAUTH_TOKEN_URL
```

`LUMINAOS_OAUTH_CLIENT_SECRET` is only needed if the app client is confidential. Do not commit it to this repository.

My Superfood also needs its own secret:

```text
MY_SUPERFOOD_SESSION_SECRET
```

That is generated and owned by My Superfood, not LuminaOS.

## Non-Goals And Guardrails

Do not change the normal LuminaOS login page, session cookie, app session table, mobile app auth flow, watch app auth flow, or existing LuminaOS login redirects for this integration.

Do not make My Superfood write to the LuminaOS database. Saved-list data stays in `my-superfood-list-items`.

Do not add broad CORS access. The browser-facing My Superfood origins remain:

```text
https://my-superfood.com
https://www.my-superfood.com
http://localhost:4173
```

Do not put LuminaOS tokens in `localStorage`, `sessionStorage`, or readable cookies.

## Acceptance Checks

- Existing LuminaOS login still works normally after the OAuth client/config change.
- Existing LuminaOS web and mobile app clients are unchanged or explicitly verified after any shared config touch.
- My Superfood can redirect to LuminaOS, complete authorization-code + PKCE, and receive an ID token.
- The ID token validates against the provided JWKS, issuer, and My Superfood client id.
- The token includes a stable user id claim.
- My Superfood `/api/auth/session` returns only safe public profile fields.
- My Superfood `/api/list` reads and writes `luminaos#<userId>` rows only after server-side session verification.
