import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const supplementsTable = process.env.SUPPLEMENTS_TABLE;
const productsTable = process.env.SUPPLEMENT_PRODUCTS_TABLE;
const ddb = new DynamoDBClient({});
const cacheTtlMs = 5 * 60 * 1000;
const documentCache = new Map();

function headersFor() {
  return {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=300",
  };
}

function response(event, statusCode, body) {
  return {
    statusCode,
    headers: headersFor(event),
    body: JSON.stringify(body),
  };
}

async function scanDocuments(tableName) {
  const items = [];
  let ExclusiveStartKey;

  do {
    const result = await ddb.send(new ScanCommand({ TableName: tableName, ExclusiveStartKey }));
    for (const item of result.Items || []) {
      if (item.document?.S) items.push(JSON.parse(item.document.S));
    }
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return items.sort((a, b) => a.name.localeCompare(b.name));
}

async function cachedDocuments(cacheKey, tableName) {
  const now = Date.now();
  const cached = documentCache.get(cacheKey);
  if (cached && cached.expiresAt > now) return cached.items;

  const items = await scanDocuments(tableName);
  documentCache.set(cacheKey, { expiresAt: now + cacheTtlMs, items });
  return items;
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";
  const rawPath = event.rawPath || event.path || "/";
  const path = rawPath.replace(/\/+$/, "") || "/";

  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        ...headersFor(),
        "access-control-allow-methods": "GET,OPTIONS",
        "access-control-allow-headers": "content-type",
      },
      body: "",
    };
  }

  if (method !== "GET") return response(event, 405, { error: "Method not allowed" });

  try {
    if (path === "/supplements") {
      return response(event, 200, { supplements: await cachedDocuments("supplements", supplementsTable) });
    }

    if (path === "/products") {
      return response(event, 200, { products: await cachedDocuments("products", productsTable) });
    }

    return response(event, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return response(event, 500, { error: "Unexpected server error" });
  }
};
