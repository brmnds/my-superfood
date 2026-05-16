import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const supplementsTable = process.env.SUPPLEMENTS_TABLE;
const productsTable = process.env.SUPPLEMENT_PRODUCTS_TABLE;
const allowedOrigins = new Set([
  "https://my-superfood.com",
  "https://www.my-superfood.com",
  "http://localhost:4173",
]);
const ddb = new DynamoDBClient({});

function headersFor(event) {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=300",
  };

  if (allowedOrigins.has(origin)) {
    headers["access-control-allow-origin"] = origin;
    headers["vary"] = "origin";
  }

  return headers;
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

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";
  const rawPath = event.rawPath || event.path || "/";
  const path = rawPath.replace(/\/+$/, "") || "/";

  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        ...headersFor(event),
        "access-control-allow-methods": "GET,OPTIONS",
        "access-control-allow-headers": "content-type",
      },
      body: "",
    };
  }

  if (method !== "GET") return response(event, 405, { error: "Method not allowed" });

  try {
    if (path === "/supplements") {
      return response(event, 200, { supplements: await scanDocuments(supplementsTable) });
    }

    if (path === "/products") {
      return response(event, 200, { products: await scanDocuments(productsTable) });
    }

    return response(event, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return response(event, 500, { error: "Unexpected server error" });
  }
};
