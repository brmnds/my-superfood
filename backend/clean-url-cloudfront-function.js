function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var cleanRoutes = {
    "/foods": "/foods.html",
    "/supplements": "/supplements.html",
    "/recipes": "/recipes.html",
    "/lists": "/lists.html",
    "/luminaos": "/luminaos.html"
  };

  if (uri === "/index.html") {
    return permanentRedirect("/", request.querystring);
  }

  if (uri.slice(-5) === ".html") {
    var cleanUri = uri.slice(0, -5);
    if (cleanUri === "") cleanUri = "/";
    if (cleanUri === "/index") cleanUri = "/";
    if (cleanUri === "/" || cleanRoutes[cleanUri]) {
      return permanentRedirect(cleanUri, request.querystring);
    }
  }

  if (uri === "/") {
    request.uri = "/index.html";
    return request;
  }

  if (cleanRoutes[uri]) {
    request.uri = cleanRoutes[uri];
  }

  return request;
}

function permanentRedirect(location, querystring) {
  var query = queryStringToText(querystring);
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: {
      location: { value: location + query },
      "cache-control": { value: "public, max-age=3600" }
    }
  };
}

function queryStringToText(querystring) {
  var keys = Object.keys(querystring || {});
  if (keys.length === 0) return "";

  var pairs = [];
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    var entry = querystring[key];
    if (entry.multiValue) {
      for (var j = 0; j < entry.multiValue.length; j += 1) {
        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(entry.multiValue[j].value));
      }
    } else {
      pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(entry.value || ""));
    }
  }

  return "?" + pairs.join("&");
}
