# Technology Steering

## Current Stack

My Superfood is currently a static website with small AWS persistence and catalog layers:

- HTML pages for routes.
- CSS for layout, animation, and responsive behavior.
- Native JavaScript ES modules for catalog rendering, interactions, filters, the draggable detail card, local list persistence, and optional LuminaOS session UI.
- Local image assets under `assets/images/`.
- DynamoDB for saved lists and the separate supplement catalog.
- Lambda Function URLs for list/auth operations and read-only supplement catalog access.

There is no package manager, framework, frontend build step, or frontend SDK dependency in this repository right now.

## Defaults

Keep the current implementation simple and portable:

- Do not introduce React, Next.js, Astro, Vite, or another frontend framework unless the app needs reusable complex components, routing, build-time content, or a backend integration.
- Keep backend work small and AWS-native. For v1 saved lists, use DynamoDB plus Lambda Function URL.
- Do not introduce an OpenAI or agent SDK unless there is an actual AI feature in this repository.
- Keep JavaScript accessible and progressive: buttons should be real buttons, links should be real links, and pages should remain navigable.

## Data And Assets

- Keep food and recipe data in `assets/js/data/` and the reviewed supplement catalog in `data/supplement-catalog.seed.json`.
- Keep `script.js` as the small page dispatcher. Put page behavior in the corresponding module under `assets/js/`.
- Keep supplement catalog caching in the shared public catalog data flow rather than duplicating new cache implementations across pages.
- Use local assets instead of hotlinked images.
- Track image provenance in `assets/images/real/sources.tsv`.
- Keep full-resolution backups under ignored `assets/images/originals/`; deploy optimized public variants rather than originals.
- Use `localStorage` as the fast local cache for saved lists and sync to DynamoDB when the API is available.
- Do not store private health data in the anonymous saved-list table.

## Interaction Standards

- Landing page food bubbles should remain tactile and animated.
- Clicking a food should update the detail card; panning the food cloud must not accidentally open it.
- The detail card should remain draggable on desktop and stable on mobile.
- Mobile layouts should avoid overlapping controls, text clipping, document-level horizontal overflow, inaccessible table content, and unnecessarily long unfiltered catalog walls.

## Future Upgrade Triggers

Consider moving beyond static HTML/CSS/JS when one of these becomes true:

- recipes become a real publishing workflow;
- food/supplement data needs editorial tooling;
- SEO content management becomes important;
- image optimization or repeated page markup becomes difficult to maintain safely without build-time tooling.
