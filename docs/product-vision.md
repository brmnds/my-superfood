# My Superfood Product Vision

## Core Concept

My Superfood is a bright, organic food and nutrition website/app that helps users discover healthy foods, understand what they are good for, and save inspiring foods into personal lists.

This document records product direction. The implemented route and module structure is maintained separately in `docs/page-structure.md`.

The landing page should feel visual, exploratory, and alive. It should not start as a static article page. The primary first-screen experience is an interactive field of food symbols and images.

## Landing Page Experience

The main landing page should include an Apple Watch-style symbol field:

- A large open space filled with round food symbols or food image bubbles.
- Example foods: broccoli, chickpeas, lentils, cauliflower, banana, and other superfoods.
- Users can move through or hover over the symbols.
- The symbol under the mouse, or the one in the center/focus position, becomes larger.
- The focused symbol reveals the food name and a clear click affordance.
- Clicking a food opens a focused overlay.

The focused overlay should:

- Use a bright white overlay treatment.
- Place the selected food in focus.
- Explain what the food/superfood is.
- Explain what it is good for nutritionally.
- Offer an action to add the food to a list.

## Filters

The main page should include prominent simple filters:

- Vegan / Pescatarian / Vegetarian dietary modes
- View all
- Protein
- Carbs
- Oils / fats
- Fiber
- Tilman protocol

`View all` is the default category filter. Category filters should show only foods that contain a lot of the selected category. The Tilman filter should show only foods marked `Yes` in the sheet's Tilman Protocol column. Dietary modes are broader: Vegan shows vegan foods, Pescatarian includes vegan foods plus fish, and Vegetarian includes vegan foods plus vegetarian non-fish foods such as eggs or dairy if those are added later.

There should also be advanced filters where users can filter by highly represented nutrients. Examples can include vitamins, minerals, amino acids, fatty acids, antioxidants, or other meaningful nutrition attributes.

## List-Based Browsing

In addition to the interactive landing page, the site should have a more structured list-view experience with the same food content.

The implemented `/foods` catalog provides one consistent card-based list view with a shared dietary selector. Additional nutrient-focused category routes remain optional future scope; they should only be introduced when a single catalog plus filters is no longer sufficient.

## User Lists And Accounts

Users can save foods, supplements, and recipes. `/lists` presents the three item types as accessible tabs over one saved-list store. Browser-local persistence and anonymous AWS sync work without sign-in; optional LuminaOS sign-in provides account-backed synchronization.

## LuminaOS Connection

When a user has created or gathered a nutrition plan, the site should offer a next step:

Create habits, goals, standards, and accountability in LuminaOS.

This should connect to the LuminaOS website/app and support account creation or account handoff. The local LuminaOS repository on this computer can be used later to understand the product, language, and integration path.

## Healthy Recipes Section

The site should include a healthy recipes section that works like a blog from Tilman Resch.

Recipe cards include:

- A high-quality 4:5 dish image with a readable two-line title overlay.
- A concise description, preparation steps, and Superfood Benefits.
- Ingredient chips with hover and keyboard-focus details.
- Consistent actions for saving the recipe and exploring its ingredients.
- A Featured view for the two primary recipes and a List view for the full recipe catalog.

This section should support frequently posted recipes over time.

## Supplements Section

The site should also show supplements.

Supplements can include:

- Supplements Tilman Resch is actually using.
- Supplements that are generally recommended.
- Supplements recommended by specific public figures, protocols, or sources.
- Supplement kits from multiple providers, including Blueprint/Bryan Johnson, Sunday Natural, Swanson, NOW Foods, natural elements, and future brands.

Each supplement should be able to show recommendation/source labels, for example:

- Taking: Tilman Resch
- Recommended by: Bryan Johnson
- Generally recommended
- Recommended by another named person, protocol, or expert source

There should be a dedicated section for supplements recommended by Bryan Johnson.

The same supplement may have multiple labels. For example, a supplement can be both recommended by Bryan Johnson and marked as actually taken by Tilman Resch.

Tilman's supplement protocol should act as a navigation layer into the catalog: clicking a named supplement kit in the stack should switch to the Supplement Kits tab, scroll to the matching product row, and highlight it.

Each Supplement Kit must reference primitive supplements rather than storing ingredients only as free text. For example, the Sunday Natural Green Tea Extract L-Theanine product references `l-theanine`; a magnesium bisglycinate kit references `magnesium`; a Swanson Apigenin kit references `apigenin`.

Supplement cards or detail pages should make the distinction clear between:

- Who recommends it.
- Who is taking it.
- What it is used for.
- Any relevant caution, context, or evidence level.

The supplement area should avoid making unsupported medical claims. It should feel like a curated discovery and tracking layer, not a diagnosis or prescription tool.

## Visual Direction

The whole site/app should be bright, fresh, organic, and high quality.

Food imagery should:

- Show the actual food clearly.
- Use high-quality photography.
- Avoid generic dark, blurred, or stock-like visuals.
- Feel natural, tactile, and appetizing.

Dish photography should have a refined boho presentation style:

- Nicely presented plates and bowls.
- Natural materials.
- Bright daylight.
- Organic textures.
- Calm, warm, healthy atmosphere.

The interface should feel premium but practical: visual and inspiring on the landing page, structured and efficient in list views.

## Open Design Questions

- Which LuminaOS flow should be triggered: account creation, habit creation, goal creation, or a nutrition-plan import?
- What should count as a "high representation" of a nutrient for filtering?
- Which supplement sources should be included beyond Tilman Resch and Bryan Johnson?
- How should evidence level and health cautions be represented for supplements?
