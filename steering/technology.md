# Technology Steering

## Current Stack

My Superfood is currently a static website:

- HTML pages for routes.
- CSS for layout, animation, and responsive behavior.
- Vanilla JavaScript for catalog rendering, interactions, filters, draggable detail card, and `localStorage` list persistence.
- Local image assets under `assets/images/`.

There is no package manager, framework, backend, database, or SDK dependency in this repository right now.

## Defaults

Keep the current implementation simple and portable:

- Do not introduce React, Next.js, Astro, Vite, or another frontend framework unless the app needs reusable complex components, routing, build-time content, or a backend integration.
- Do not introduce a backend until saved lists, authentication, or LuminaOS handoff require server-side persistence.
- Do not introduce an OpenAI or agent SDK unless there is an actual AI feature in this repository.
- Keep JavaScript accessible and progressive: buttons should be real buttons, links should be real links, and pages should remain navigable.

## Data And Assets

- Keep food and supplement data in `script.js` for now.
- Move data to JSON only when the catalog becomes large enough to justify separation.
- Use local assets instead of hotlinked images.
- Track image provenance in `assets/images/real/sources.tsv`.
- Optimize large image assets before production if page weight becomes a problem.

## Interaction Standards

- Landing page food bubbles should remain tactile and animated.
- Hover/focus behavior should update the detail card.
- The detail card should remain draggable on desktop and stable on mobile.
- Mobile layouts should avoid overlapping controls, text clipping, and off-screen cards.

## Future Upgrade Triggers

Consider moving beyond static HTML/CSS/JS when one of these becomes true:

- users need account-based saved lists;
- LuminaOS integration needs authenticated handoff or API calls;
- recipes become a real publishing workflow;
- food/supplement data needs editorial tooling;
- SEO content management becomes important;
- build-time image optimization becomes necessary.
