import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const tableName = process.env.TABLE_NAME;
const ddb = new DynamoDBClient({});

function response(statusCode, body) {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  };

  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
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

export const handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || "GET";

  if (method === "OPTIONS") {
    return response(204, {});
  }

  try {
    if (method === "GET") {
      const clientId = normalizeClientId(event.queryStringParameters?.clientId);
      if (!clientId) return response(400, { error: "Missing clientId" });

      const result = await ddb.send(new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: "clientId = :clientId",
        ExpressionAttributeValues: {
          ":clientId": { S: clientId },
        },
        ScanIndexForward: false,
      }));

      const items = (result.Items || []).map((item) => ({
        id: item.id?.S || "",
        type: item.type?.S || "",
        name: item.name?.S || "",
        image: item.image?.S || "",
        note: item.note?.S || "",
      }));
      return response(200, { items });
    }

    if (method === "POST") {
      const payload = JSON.parse(event.body || "{}");
      const clientId = normalizeClientId(payload.clientId);
      const item = normalizeItem(payload.item);

      if (!clientId || !item) return response(400, { error: "Invalid list item" });

      const now = new Date().toISOString();
      await ddb.send(new PutItemCommand({
        TableName: tableName,
        Item: {
          clientId: { S: clientId },
          itemKey: { S: `${item.type}#${item.id}` },
          id: { S: item.id },
          type: { S: item.type },
          name: { S: item.name },
          image: { S: item.image },
          note: { S: item.note },
          updatedAt: { S: now },
        },
      }));

      return response(200, { item, updatedAt: now });
    }

    return response(405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return response(500, { error: "Unexpected server error" });
  }
};
