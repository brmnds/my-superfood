export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function optimizedFoodImagePath(image, variant = "catalog") {
  const fileName = String(image || "").split("/").pop() || "";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  if (!baseName) return image;
  return `/assets/images/optimized/${variant}/${baseName}.jpg`;
}
