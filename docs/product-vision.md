# My Superfood Product Vision

## Core Concept

My Superfood is a bright, organic food and nutrition website/app that helps users discover healthy foods, understand what they are good for, and save inspiring foods into personal lists.

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

- View all
- Protein
- Carbs
- Oils / fats
- Fiber

`View all` is the default. Category filters should show or emphasize foods that contain a lot of the selected category.

There should also be advanced filters where users can filter by highly represented nutrients. Examples can include vitamins, minerals, amino acids, fatty acids, antioxidants, or other meaningful nutrition attributes.

## List-Based Browsing

In addition to the interactive landing page, the site should have a more structured list-view experience with the same food content.

There should be subpages or category pages for:

- Protein-rich foods
- Carb-rich foods
- Oil / fat-rich foods
- Fiber-rich foods
- Additional nutrient-focused categories over time

These pages should show foods in a clearer list or catalog view for users who prefer scanning and comparing.

## User Lists And Accounts

Users should be able to add foods to personal lists.

Initial list use cases:

- Foods the user wants to buy.
- Foods the user wants to have at home.
- Foods the user was inspired by and wants to include more often.

Users should be able to log in so their lists can be saved across sessions.

The exact list types and naming will be defined later.

## LuminaOS Connection

When a user has created or gathered a nutrition plan, the site should offer a next step:

Create habits, goals, standards, and accountability in LuminaOS.

This should connect to the LuminaOS website/app and support account creation or account handoff. The local LuminaOS repository on this computer can be used later to understand the product, language, and integration path.

## Healthy Recipes Section

The site should include a healthy recipes section that works like a blog from Tilman Resch.

Recipe posts should include:

- One or several high-quality pictures.
- If there are several pictures, display them as a small gallery.
- A right-side description explaining what the dish is.
- A clear explanation of why the recipe is healthy.
- A visual connection to the relevant foods or superfoods when useful.

This section should support frequently posted recipes over time.

## Supplements Section

The site should also show supplements.

Supplements can include:

- Supplements Tilman Resch is actually using.
- Supplements that are generally recommended.
- Supplements recommended by specific public figures, protocols, or sources.

Each supplement should be able to show recommendation/source labels, for example:

- Taking: Tilman Resch
- Recommended by: Bryan Johnson
- Generally recommended
- Recommended by another named person, protocol, or expert source

There should be a dedicated section for supplements recommended by Bryan Johnson.

The same supplement may have multiple labels. For example, a supplement can be both recommended by Bryan Johnson and marked as actually taken by Tilman Resch.

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

- What exact list types should users be able to create?
- Which authentication provider should be used?
- Should food data start as a curated local dataset or come from a nutrition API?
- Which LuminaOS flow should be triggered: account creation, habit creation, goal creation, or a nutrition-plan import?
- What should count as a "high representation" of a nutrient for filtering?
- Which supplement sources should be included beyond Tilman Resch and Bryan Johnson?
- How should evidence level and health cautions be represented for supplements?
