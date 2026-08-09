export function initListsHeaderAuth() {
  const actions = document.querySelector('[data-auth-actions="header"]');
  const status = document.querySelector(".header-auth-status[data-auth-status]");
  if (!actions) return;

  const enhanceActions = () => {
    const signInLink = actions.querySelector(":scope > a");
    if (signInLink) {
      signInLink.className = "secondary-header-action header-auth-signin";
      return;
    }

    const signOutButton = actions.querySelector(":scope > .auth-logout");
    if (!signOutButton) return;

    const menu = document.createElement("details");
    menu.className = "header-auth-menu";

    const summary = document.createElement("summary");
    summary.className = "secondary-header-action header-auth-summary";
    summary.append(document.createTextNode("Signed in"));

    const chevron = document.createElement("span");
    chevron.className = "header-auth-chevron";
    chevron.setAttribute("aria-hidden", "true");
    summary.append(chevron);

    const popover = document.createElement("div");
    popover.className = "header-auth-popover";
    signOutButton.className = "header-auth-signout auth-logout";
    popover.append(signOutButton);
    menu.append(summary, popover);
    actions.append(menu);
  };

  const actionsObserver = new MutationObserver(enhanceActions);
  actionsObserver.observe(actions, { childList: true });
  enhanceActions();

  if (status) {
    const updateStatusVisibility = () => {
      const hasError = status.textContent.trim().startsWith("Sign out failed");
      status.classList.toggle("visually-hidden", !hasError);
      status.classList.toggle("is-error", hasError);
    };
    const statusObserver = new MutationObserver(updateStatusVisibility);
    statusObserver.observe(status, { childList: true, characterData: true, subtree: true });
    updateStatusVisibility();
  }
}
