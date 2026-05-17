import { createHash, createHmac, createPublicKey, createVerify, randomBytes, timingSafeEqual } from "node:crypto";
import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const tableName = process.env.TABLE_NAME;
const sessionSecret = process.env.MY_SUPERFOOD_SESSION_SECRET || "";
const oauthClientId = process.env.LUMINAOS_OAUTH_CLIENT_ID || "";
const oauthClientSecret = process.env.LUMINAOS_OAUTH_CLIENT_SECRET || "";
const oauthAuthorizeUrl = process.env.LUMINAOS_OAUTH_AUTHORIZE_URL || "https://luminaos.app/api/auth/oauth/authorize";
const oauthTokenUrl = process.env.LUMINAOS_OAUTH_TOKEN_URL || "https://luminaos.app/api/auth/oauth/token";
const oauthIssuer = process.env.LUMINAOS_OAUTH_ISSUER || "";
const oauthJwksUrl = process.env.LUMINAOS_OAUTH_JWKS_URL || "";
const configuredRedirectUri = process.env.MY_SUPERFOOD_AUTH_REDIRECT_URI || "";
const configuredBaseUrl = process.env.MY_SUPERFOOD_BASE_URL || "";
const cookieName = process.env.MY_SUPERFOOD_SESSION_COOKIE || "my_superfood_session";
const oauthStateCookie = "my_superfood_oauth_state";
const oauthVerifierCookie = "my_superfood_pkce_verifier";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 14;
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || [
  "https://my-superfood.com",
  "https://www.my-superfood.com",
  "http://localhost:4173",
].join(",")).split(",").map((origin) => origin.trim()).filter(Boolean));
const ddb = new DynamoDBClient({});

let cachedJwks;

function base64Url(input) {
  return Buffer.from(input).toString("base64url");
}

function jsonBase64Url(value) {
  return base64Url(JSON.stringify(value));
}

function parseJsonBase64Url(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

function response(event, statusCode, body, extraHeaders = {}) {
  const cookies = extraHeaders.__cookies || [];
  delete extraHeaders.__cookies;
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...corsHeaders(event),
    ...extraHeaders,
  };

  return {
    statusCode,
    headers,
    cookies,
    body: JSON.stringify(body),
  };
}

function redirect(location, extraHeaders = {}) {
  const cookies = extraHeaders.__cookies || [];
  delete extraHeaders.__cookies;
  return {
    statusCode: 302,
    headers: {
      location,
      "cache-control": "no-store",
      ...extraHeaders,
    },
    cookies,
    body: "",
  };
}

function corsHeaders(event) {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  if (!allowedOrigins.has(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-credentials": "true",
    "vary": "origin",
  };
}

function cookieHeader(name, value, { maxAge, httpOnly = true, secure = true } = {}) {
  const parts = [`${name}=${value}`, "Path=/", "SameSite=Lax"];
  if (httpOnly) parts.push("HttpOnly");
  if (secure) parts.push("Secure");
  if (typeof maxAge === "number") parts.push(`Max-Age=${maxAge}`);
  return parts.join("; ");
}

function clearCookieHeader(name) {
  return cookieHeader(name, "", { maxAge: 0 });
}

function appendCookies(headers, cookies) {
  return {
    ...headers,
    __cookies: cookies,
  };
}

function parseCookies(event) {
  const cookieText = event.headers?.cookie || event.headers?.Cookie || "";
  return Object.fromEntries(cookieText.split(";").map((part) => {
    const [name, ...rest] = part.trim().split("=");
    return [name, rest.join("=")];
  }).filter(([name]) => name));
}

function publicBaseUrl(event) {
  if (configuredBaseUrl) return configuredBaseUrl.replace(/\/+$/, "");
  const origin = event.headers?.origin || event.headers?.Origin;
  if (origin && allowedOrigins.has(origin)) return origin;
  const host = event.headers?.host || event.headers?.Host;
  const proto = event.headers?.["x-forwarded-proto"] || "https";
  return host ? `${proto}://${host}` : "https://my-superfood.com";
}

function redirectUri(event) {
  return configuredRedirectUri || `${publicBaseUrl(event)}/api/auth/callback`;
}

function normalizeClientId(value) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 80);
}

function normalizeItem(value) {
  if (!value || typeof value !== "object") return null;

  const id = String(value.id || "").trim().slice(0, 80);
  const type = String(value.type || "").trim().slice(0, 40);
  const name = String(value.name || "").trim().slice(0, 160);
  const image = String(value.image || "").trim().slice(0, 300);
  const note = String(value.note || "").trim().slice(0, 1000);

  if (!id || !type || !name) return null;

  return {
    id,
    type,
    name,
    image,
    note,
  };
}

function anonymousOwnerKey(clientId) {
  return `anonymous#${clientId}`;
}

function luminaOwnerKey(userId) {
  return `luminaos#${userId}`;
}

function legacyOwnerKeys(clientId) {
  return [anonymousOwnerKey(clientId), clientId];
}

function signSession(payload) {
  const body = jsonBase64Url(payload);
  const signature = createHmac("sha256", sessionSecret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function readSession(event) {
  if (!sessionSecret) return null;
  const raw = parseCookies(event)[cookieName];
  if (!raw || !raw.includes(".")) return null;

  const [body, signature] = raw.split(".");
  const expected = createHmac("sha256", sessionSecret).update(body).digest("base64url");
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  const payload = parseJsonBase64Url(body);
  if (!payload?.userId || !payload?.exp || Date.now() >= payload.exp * 1000) return null;
  return payload;
}

function sessionPublicUser(session) {
  if (!session) return null;
  return {
    userId: session.userId,
    email: session.email || "",
    displayName: session.displayName || session.email || "LuminaOS user",
  };
}

async function queryOwner(ownerKey) {
  const result = await ddb.send(new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: "clientId = :ownerKey",
    ExpressionAttributeValues: {
      ":ownerKey": { S: ownerKey },
    },
    ScanIndexForward: false,
  }));

  return (result.Items || []).map((item) => ({
    id: item.id?.S || "",
    type: item.type?.S || "",
    name: item.name?.S || "",
    image: item.image?.S || "",
    note: item.note?.S || "",
  }));
}

async function putOwnerItem(ownerKey, item) {
  const now = new Date().toISOString();
  await ddb.send(new PutItemCommand({
    TableName: tableName,
    Item: {
      clientId: { S: ownerKey },
      ownerKey: { S: ownerKey },
      itemKey: { S: `${item.type}#${item.id}` },
      id: { S: item.id },
      type: { S: item.type },
      name: { S: item.name },
      image: { S: item.image },
      note: { S: item.note },
      updatedAt: { S: now },
    },
  }));
  return now;
}

async function readListFor(event) {
  const session = readSession(event);
  if (session) return queryOwner(luminaOwnerKey(session.userId));

  const clientId = normalizeClientId(event.queryStringParameters?.clientId);
  if (!clientId) throw Object.assign(new Error("Missing clientId"), { statusCode: 400 });

  const lists = await Promise.all(legacyOwnerKeys(clientId).map(queryOwner));
  const seen = new Set();
  return lists.flat().filter((item) => {
    const key = `${item.type}#${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function writeListItemFor(event, payload) {
  const session = readSession(event);
  const item = normalizeItem(payload.item);
  if (!item) throw Object.assign(new Error("Invalid list item"), { statusCode: 400 });

  if (session) return putOwnerItem(luminaOwnerKey(session.userId), item);

  const clientId = normalizeClientId(payload.clientId);
  if (!clientId) throw Object.assign(new Error("Invalid list item"), { statusCode: 400 });
  return putOwnerItem(anonymousOwnerKey(clientId), item);
}

async function mergeListFor(event, payload) {
  const session = readSession(event);
  if (!session) return response(event, 401, { error: "Authentication required" });

  const items = Array.isArray(payload.items) ? payload.items.map(normalizeItem).filter(Boolean) : [];
  const ownerKey = luminaOwnerKey(session.userId);
  for (const item of items) await putOwnerItem(ownerKey, item);

  return response(event, 200, { merged: items.length, items: await queryOwner(ownerKey) });
}

function oauthReady() {
  return Boolean(sessionSecret && oauthClientId && oauthIssuer && oauthJwksUrl);
}

function codeChallenge(verifier) {
  return createHash("sha256").update(verifier).digest("base64url");
}

async function handleAuthStart(event) {
  if (!oauthReady()) return response(event, 503, { error: "LuminaOS sign-in is not configured yet." });

  const state = randomBytes(24).toString("base64url");
  const verifier = randomBytes(48).toString("base64url");
  const authorize = new URL(oauthAuthorizeUrl);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("client_id", oauthClientId);
  authorize.searchParams.set("redirect_uri", redirectUri(event));
  authorize.searchParams.set("scope", process.env.LUMINAOS_OAUTH_SCOPE || "openid email profile");
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("code_challenge", codeChallenge(verifier));
  authorize.searchParams.set("code_challenge_method", "S256");

  return redirect(authorize.toString(), appendCookies({}, [
    cookieHeader(oauthStateCookie, state, { maxAge: 600 }),
    cookieHeader(oauthVerifierCookie, verifier, { maxAge: 600 }),
  ]));
}

async function exchangeOAuthCode(event, code, verifier) {
  if (!verifier) throw Object.assign(new Error("Missing PKCE verifier"), { statusCode: 400 });

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: oauthClientId,
    code,
    redirect_uri: redirectUri(event),
    code_verifier: verifier,
  });

  const headers = { "content-type": "application/x-www-form-urlencoded" };
  if (oauthClientSecret) {
    headers.authorization = `Basic ${Buffer.from(`${oauthClientId}:${oauthClientSecret}`).toString("base64")}`;
  }

  const tokenResponse = await fetch(oauthTokenUrl, { method: "POST", headers, body });
  const tokenPayload = await tokenResponse.json();
  if (!tokenResponse.ok) throw new Error(tokenPayload.error_description || tokenPayload.error || "OAuth token exchange failed");
  return tokenPayload;
}

async function fetchJwks() {
  if (cachedJwks) return cachedJwks;
  const response = await fetch(oauthJwksUrl, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("Unable to fetch LuminaOS JWKS");
  cachedJwks = await response.json();
  return cachedJwks;
}

async function verifyJwt(idToken) {
  const [encodedHeader, encodedPayload, encodedSignature] = idToken.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature) throw new Error("Invalid ID token");

  const header = parseJsonBase64Url(encodedHeader);
  const payload = parseJsonBase64Url(encodedPayload);
  if (header.alg !== "RS256") throw new Error("Unsupported token algorithm");
  if (oauthIssuer && payload.iss !== oauthIssuer) throw new Error("Unexpected token issuer");
  if (payload.aud !== oauthClientId) throw new Error("Unexpected token audience");
  if (!payload.exp || Date.now() >= payload.exp * 1000) throw new Error("Expired ID token");

  const jwks = await fetchJwks();
  const jwk = (jwks.keys || []).find((key) => key.kid === header.kid);
  if (!jwk) throw new Error("Matching signing key not found");

  const verifier = createVerify("RSA-SHA256");
  verifier.update(`${encodedHeader}.${encodedPayload}`);
  verifier.end();
  const valid = verifier.verify(createPublicKey({ key: jwk, format: "jwk" }), Buffer.from(encodedSignature, "base64url"));
  if (!valid) throw new Error("Invalid ID token signature");

  return payload;
}

async function handleAuthCallback(event) {
  try {
    const params = event.queryStringParameters || {};
    const cookies = parseCookies(event);
    if (!params.code || !params.state || params.state !== cookies[oauthStateCookie]) {
      return response(event, 400, { error: "Invalid LuminaOS sign-in state." });
    }

    const tokenPayload = await exchangeOAuthCode(event, params.code, cookies[oauthVerifierCookie]);
    const idTokenPayload = await verifyJwt(tokenPayload.id_token);
    const userId = idTokenPayload["custom:user_id"] || idTokenPayload.user_id || idTokenPayload.sub;
    if (!userId) throw new Error("LuminaOS token did not include a user id");

    const now = Math.floor(Date.now() / 1000);
    const session = signSession({
      userId,
      email: idTokenPayload.email || "",
      displayName: idTokenPayload.name || idTokenPayload.email || "",
      iat: now,
      exp: now + sessionMaxAgeSeconds,
    });

    return redirect("/lists?luminaos=connected", appendCookies({}, [
      cookieHeader(cookieName, session, { maxAge: sessionMaxAgeSeconds }),
      clearCookieHeader(oauthStateCookie),
      clearCookieHeader(oauthVerifierCookie),
    ]));
  } catch (error) {
    console.error(error);
    return response(event, 500, { error: "LuminaOS sign-in failed." }, appendCookies({}, [
      clearCookieHeader(oauthStateCookie),
      clearCookieHeader(oauthVerifierCookie),
    ]));
  }
}

function handleAuthSession(event) {
  const user = sessionPublicUser(readSession(event));
  return response(event, 200, { authenticated: Boolean(user), user });
}

function handleLogout(event) {
  return response(event, 200, { authenticated: false }, appendCookies({}, [clearCookieHeader(cookieName)]));
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";
  const rawPath = event.rawPath || event.path || "/";
  const path = rawPath.replace(/\/+$/, "") || "/";

  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        ...corsHeaders(event),
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "content-type",
      },
      body: "",
    };
  }

  try {
    if (method === "GET" && path === "/api/auth/start") return handleAuthStart(event);
    if (method === "GET" && path === "/api/auth/callback") return handleAuthCallback(event);
    if (method === "GET" && path === "/api/auth/session") return handleAuthSession(event);
    if (method === "POST" && path === "/api/auth/logout") return handleLogout(event);

    if (method === "GET" && (path === "/" || path === "/api/list")) {
      return response(event, 200, { items: await readListFor(event), authenticated: Boolean(readSession(event)) });
    }

    if (method === "POST" && (path === "/" || path === "/api/list")) {
      const payload = JSON.parse(event.body || "{}");
      const updatedAt = await writeListItemFor(event, payload);
      return response(event, 200, { item: normalizeItem(payload.item), updatedAt, authenticated: Boolean(readSession(event)) });
    }

    if (method === "POST" && path === "/api/list/merge") {
      const payload = JSON.parse(event.body || "{}");
      return mergeListFor(event, payload);
    }

    return response(event, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return response(event, error.statusCode || 500, { error: error.statusCode ? error.message : "Unexpected server error" });
  }
};
