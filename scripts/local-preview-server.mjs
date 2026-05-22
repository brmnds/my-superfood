import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = normalize(join(dirname(fileURLToPath(import.meta.url)), ".."));
const port = Number(process.env.PORT || 4173);

const cleanRoutes = new Map([
  ["/", "index.html"],
  ["/foods", "foods.html"],
  ["/supplements", "supplements.html"],
  ["/recipes", "recipes.html"],
  ["/lists", "lists.html"],
  ["/luminaos", "luminaos.html"],
  ["/privacy", "privacy.html"],
  ["/terms", "terms.html"],
  ["/imprint", "imprint.html"],
]);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, `http://localhost:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const cleanTarget = cleanRoutes.get(pathname);

  if (cleanTarget) return cleanTarget;
  if (pathname.endsWith(".html")) {
    return pathname.slice(1);
  }
  return pathname.replace(/^\/+/, "");
}

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, { "content-type": "text/plain; charset=utf-8" });
  response.end(message);
}

createServer((request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
    sendText(response, 405, "Method not allowed");
    return;
  }

  const requestPath = resolveRequestPath(request.url);
  const filePath = normalize(join(root, requestPath));

  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    sendText(response, 404, "Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": contentTypes.get(extname(filePath).toLowerCase()) || "application/octet-stream",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`My Superfood preview server running at http://localhost:${port}`);
  console.log("Clean URLs enabled: /foods /supplements /recipes /lists /luminaos /privacy /terms /imprint");
});
