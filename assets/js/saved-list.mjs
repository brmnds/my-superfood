import { foods } from "./data/foods.mjs";
import { recipes } from "./data/recipes.mjs";
import { escapeHtml } from "./shared.mjs";

let authLogoutCallback = null;

export function setAuthLogoutCallback(callback) {
  authLogoutCallback = typeof callback === "function" ? callback : null;
}

export const listApiUrl = "https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws";
export const accountApiBaseUrl = localStorage.getItem("my-superfood-account-api-base") || (["my-superfood.com", "www.my-superfood.com"].includes(location.hostname) ? "/api" : "");
const listStorageKey = "my-superfood-list";
const accountListCacheStorageKey = "my-superfood-account-list-cache";
const clientStorageKey = "my-superfood-client-id";
export const authState = {
  ready: false,
  authenticated: false,
  user: null,
};

function parseStoredList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn(`Ignoring invalid saved list data for ${key}.`, error);
    return [];
  }
}

function getList() {
  return parseStoredList(listStorageKey);
}

function setList(list) {
  localStorage.setItem(listStorageKey, JSON.stringify(list));
}

function getAccountListCache() {
  return parseStoredList(accountListCacheStorageKey);
}

function setAccountListCache(list) {
  localStorage.setItem(accountListCacheStorageKey, JSON.stringify(list));
}

function visibleList() {
  return authState.authenticated ? getAccountListCache() : getList();
}

function setVisibleList(list) {
  if (authState.authenticated) {
    setAccountListCache(list);
  } else {
    setList(list);
  }
}

function itemKey(item) {
  return `${item.type}#${item.id}`;
}

function addUniqueItem(list, item) {
  if (list.some((entry) => itemKey(entry) === itemKey(item))) return list;
  return [...list, item];
}

function getClientId() {
  let clientId = localStorage.getItem(clientStorageKey);
  if (!clientId) {
    clientId = crypto.randomUUID ? crypto.randomUUID() : `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(clientStorageKey, clientId);
  }
  return clientId;
}

function hasListApi() {
  return listApiUrl.startsWith("https://");
}

function hasAccountApi() {
  return accountApiBaseUrl.length > 0;
}

function accountApiPath(path) {
  return `${accountApiBaseUrl}${path}`;
}

async function loadAuthSession() {
  if (!hasAccountApi()) {
    authState.ready = true;
    return authState;
  }

  try {
    const response = await fetch(accountApiPath("/auth/session"), {
      credentials: "include",
      headers: { accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Auth session returned ${response.status}`);
    const payload = await response.json();
    authState.authenticated = Boolean(payload.authenticated);
    authState.user = payload.user || null;
    if (!authState.authenticated) localStorage.removeItem(accountListCacheStorageKey);
  } catch (error) {
    authState.authenticated = false;
    authState.user = null;
    localStorage.removeItem(accountListCacheStorageKey);
    console.warn("LuminaOS session check failed; staying in browser-local mode.", error);
  } finally {
    authState.ready = true;
  }

  return authState;
}

async function mergeLocalListIntoAccount() {
  if (!hasAccountApi() || !authState.authenticated || !authState.user?.userId) return;

  const mergeKey = `my-superfood-merged-${authState.user.userId}`;
  if (localStorage.getItem(mergeKey) === "true") return;

  const items = getList();
  if (items.length === 0) {
    localStorage.setItem(mergeKey, "true");
    return;
  }

  const response = await fetch(accountApiPath("/list/merge"), {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!response.ok) throw new Error(`List merge returned ${response.status}`);

  const payload = await response.json();
  if (Array.isArray(payload.items)) setAccountListCache(payload.items);
  localStorage.setItem(mergeKey, "true");
}

function clearAccountSessionState() {
  authState.authenticated = false;
  authState.user = null;
  localStorage.removeItem(accountListCacheStorageKey);
}

async function fetchRemoteList() {
  if (hasAccountApi() && authState.authenticated) {
    const response = await fetch(accountApiPath("/list"), {
      credentials: "include",
      headers: { accept: "application/json" },
    });
    if (response.status === 401 || response.status === 403) {
      clearAccountSessionState();
      renderAuthControls();
      return fetchRemoteList();
    }
    if (!response.ok) throw new Error(`Account list API returned ${response.status}`);

    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  }

  if (!hasListApi()) return [];

  const url = `${listApiUrl}/?clientId=${encodeURIComponent(getClientId())}`;
  const response = await fetch(url, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`List API returned ${response.status}`);

  const payload = await response.json();
  return Array.isArray(payload.items) ? payload.items : [];
}

async function saveRemoteItem(item) {
  if (hasAccountApi() && authState.authenticated) {
    const response = await fetch(accountApiPath("/list"), {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ item }),
    });

    if (response.status === 401 || response.status === 403) {
      clearAccountSessionState();
      setList(addUniqueItem(getList(), item));
      renderAuthControls();
      return saveRemoteItem(item);
    }
    if (!response.ok) throw new Error(`Account list API returned ${response.status}`);
    return;
  }

  if (!hasListApi()) return;

  const response = await fetch(listApiUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ clientId: getClientId(), item }),
  });

  if (!response.ok) throw new Error(`List API returned ${response.status}`);
}

export function saveItem(item) {
  setVisibleList(addUniqueItem(visibleList(), item));

  saveRemoteItem(item).catch((error) => {
    console.warn("Remote list save failed; local list still saved.", error);
  });
}

export function authStatusText() {
  if (authState.authenticated) {
    return `Synced with LuminaOS${authState.user?.displayName ? ` as ${authState.user.displayName}` : ""}.`;
  }
  if (hasAccountApi()) return "Saved in this browser. Sign in with LuminaOS to sync.";
  return "Saved in this browser. Account sync activates on the My Superfood production domain.";
}

export function renderAuthControls() {
  document.querySelectorAll("[data-auth-status]").forEach((target) => {
    target.textContent = authStatusText();
  });

  document.querySelectorAll("[data-auth-actions]").forEach((target) => {
    if (!hasAccountApi()) {
      target.innerHTML = `<span class="tag">LuminaOS sync available after API deployment</span>`;
      return;
    }

    if (authState.authenticated) {
      target.innerHTML = `<button class="button ghost auth-logout" type="button">Sign out</button>`;
    } else {
      target.innerHTML = `<a class="button primary" href="${accountApiPath("/auth/start")}">Sign in with LuminaOS</a>`;
    }
  });

  document.querySelectorAll(".auth-logout").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!hasAccountApi()) return;
      await fetch(accountApiPath("/auth/logout"), { method: "POST", credentials: "include" });
      clearAccountSessionState();
      renderAuthControls();
      if (authLogoutCallback) authLogoutCallback();
    });
  });
}export function renderSavedList() {
  const target = document.querySelector("#saved-list");
  const intro = document.querySelector("#saved-list-intro");
  const tabs = document.querySelectorAll("[data-list-tab]");
  let activeTab = "foods";
  if (intro) intro.textContent = authStatusText();

  function listGroups(list) {
    return {
      foods: list.filter((item) => item.type === "Food"),
      supplements: list.filter((item) => item.type === "Supplement" || item.type === "Supplement Product"),
      recipes: list.filter((item) => item.type === "Recipe"),
    };
  }

  function foodDetails(item) {
    return foods.find((food) => food.id === item.id) || {};
  }

  function recipeDetails(item) {
    return recipes.find((recipe) => recipe.id === item.id) || {};
  }

  function formatTags(values) {
    return (values || []).map((value) => `<span class="tag">${escapeHtml(value)}</span>`).join("");
  }

  function updateCounts(groups) {
    Object.entries(groups).forEach(([key, items]) => {
      document.querySelectorAll(`[data-list-count="${key}"]`).forEach((target) => {
        target.textContent = items.length;
      });
    });
  }

  function emptyRow(label) {
    return `<tbody><tr><td colspan="5" class="empty-table-cell">No saved ${label} yet.</td></tr></tbody>`;
  }

  function renderFoodTable(items) {
    if (items.length === 0) return emptyRow("foods");
    return `
      <thead>
        <tr>
          <th>Food</th>
          <th>Categories</th>
          <th>Benefits</th>
          <th>Note</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => {
          const detail = foodDetails(item);
          return `
            <tr>
              <td><div class="list-item-cell"><img src="${escapeHtml(item.image)}" alt=""><div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.id)}</span></div></div></td>
              <td><div class="tag-row">${formatTags(detail.categories)}</div></td>
              <td>${escapeHtml((detail.benefits || []).join(", ") || "Saved food")}</td>
              <td>${escapeHtml(item.note)}</td>
              <td>${authState.authenticated ? "LuminaOS sync" : "Browser list"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;
  }

  function renderSupplementTable(items) {
    if (items.length === 0) return emptyRow("supplements");
    return `
      <thead>
        <tr>
          <th>Supplement product</th>
          <th>Type</th>
          <th>Purpose</th>
          <th>List note</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => `
          <tr>
            <td><div class="list-item-cell text-only"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.id)}</span></div></td>
            <td>${escapeHtml(item.type)}</td>
            <td>${escapeHtml(item.note || "Saved supplement")}</td>
            <td>${escapeHtml(item.note)}</td>
            <td>${authState.authenticated ? "LuminaOS sync" : "Browser list"}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
  }

  function renderRecipeTable(items) {
    if (items.length === 0) return emptyRow("recipes");
    return `
      <thead>
        <tr>
          <th>Recipe</th>
          <th>Components</th>
          <th>Focus</th>
          <th>Note</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => {
          const detail = recipeDetails(item);
          return `
            <tr>
              <td><div class="list-item-cell"><img src="${escapeHtml(item.image)}" alt=""><div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.id)}</span></div></div></td>
              <td>${escapeHtml((detail.components || []).join(", ") || "Saved recipe")}</td>
              <td><div class="tag-row">${formatTags(detail.focus)}</div></td>
              <td>${escapeHtml(item.note)}</td>
              <td>${authState.authenticated ? "LuminaOS sync" : "Browser list"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;
  }

  function render(list) {
    const groups = listGroups(list);
    updateCounts(groups);

    if (activeTab === "foods") target.innerHTML = renderFoodTable(groups.foods);
    if (activeTab === "supplements") target.innerHTML = renderSupplementTable(groups.supplements);
    if (activeTab === "recipes") target.innerHTML = renderRecipeTable(groups.recipes);
  }

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.listTab;
      tabs.forEach((entry) => {
        entry.classList.toggle("active", entry === button);
        entry.setAttribute("aria-selected", entry === button ? "true" : "false");
      });
      render(visibleList());
    });
  });

  render(visibleList());
  renderAuthControls();

  const remoteLoad = authReady
    .then(() => mergeLocalListIntoAccount().catch((error) => {
      console.warn("LuminaOS list merge failed; local list still works.", error);
    }))
    .then(fetchRemoteList);

  remoteLoad
    .then((remoteList) => {
      if (remoteList.length === 0) return;
      setVisibleList(remoteList);
      render(remoteList);
      if (intro) intro.textContent = authStatusText();
    })
    .catch((error) => {
      console.warn("Remote list load failed; showing local list.", error);
    });
}
export const authReady = loadAuthSession().then(() => {
  renderAuthControls();
  return authState;
});
