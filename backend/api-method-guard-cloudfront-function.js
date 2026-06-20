function handler(event) {
  var request = event.request;
  var allowedMethods = {
    GET: true,
    HEAD: true,
    OPTIONS: true,
    POST: true
  };

  if (allowedMethods[request.method]) return request;

  return {
    statusCode: 405,
    statusDescription: "Method Not Allowed",
    headers: {
      allow: { value: "GET, HEAD, OPTIONS, POST" },
      "cache-control": { value: "no-store" }
    }
  };
}
