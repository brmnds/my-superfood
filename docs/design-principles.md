# My Superfood Design Principles

My Superfood should feel calm, practical, and trustworthy: a lightweight nutrition workspace rather than a marketing site. Keep the original page content and workflows intact unless a product decision explicitly changes them.

## Brand Mark

Use the generated My Superfood leaf icon as the primary app mark:

- Browser and app icon, 512px: [`assets/images/my-superfood-icon-512.png`](../assets/images/my-superfood-icon-512.png)
- Menu bar icon and Apple touch icon, 180px: [`assets/images/my-superfood-icon.png`](../assets/images/my-superfood-icon.png)

The icon should appear next to the `My Superfood` wordmark in the site header. Do not use package evidence photos, supplement label photos, or LuminaOS artwork as My Superfood brand marks.

## Visual Direction

- Use green as the primary accent color, with darker green for selected states and important actions.
- Keep the base surface quiet: off-white page background, white content surfaces, light gray borders, and soft shadows.
- Prefer compact, useful layouts over decorative sections.
- Keep rounded edges restrained. Navigation pills and cards should feel soft but not bubbly.
- Use clear tabular views for saved lists, supplement products, ingredients, and comparison-heavy content.
- Keep landing-page content stable unless the product concept changes. Design refinements should improve polish without replacing the page structure.

## Layout

- Keep the header sticky, white, and compact.
- Keep page containers centered with generous but practical spacing.
- Use cards only for real grouped content, repeated items, status panels, or modals.
- Avoid adding dashboard summary sections unless they serve an existing workflow.
- On mobile, preserve access to navigation, filters, tabs, and primary actions without horizontal text overflow.
- The landing-page food explorer must use responsive, non-overlapping food-circle placement that still feels organic and random. As more foods are added, reflow the circles into a balanced scattered cloud rather than a visibly ordered list, lonely single-item bands, blank corridors, or fixed coordinates that collide.
- The food cloud does not need to fit every item into one viewport. When the cloud is larger than the visible stage, users should be able to pan it with mouse or touch to reach off-screen foods.
- The default landing-page nutrition filter is `View all`; category filters such as Protein, Carbs, Oils, Fiber, Advanced nutrients, and Tilman should rebuild the cloud with only matching foods.
- The landing-page dietary toggle uses `dietType` values on food records. `Vegan` shows only vegan foods, `Pescatarian` shows vegan plus pescatarian foods such as fish, and `Vegetarian` shows vegan plus vegetarian non-fish foods when those are added.

## Components

- Active navigation and active tabs should use the green system, not gray.
- Buttons should be direct and plain: primary actions use green, secondary actions use white with borders.
- Tables should use readable spacing, visible headers, and non-overflowing cells.
- Source/status badges should be visible but quiet.
- The saved-list tabs are the structure; do not add extra list-summary cards unless requested.
- Protocol chips, such as Tilman's supplement stack, should behave as navigation controls when they reference catalog entities: clicking a chip should open the relevant tab, scroll to the row, and use a quiet green highlight.

## Content Tone

- Use plain nutrition language.
- Avoid medical claims, personalized dosing claims, and overconfident supplement guidance.
- Keep supplement data provenance visible where relevant.
- Keep LuminaOS references as optional account sync and habit handoff, not as the main My Superfood identity.
- Keep a simple footer on public pages with Privacy Policy, Terms, and Imprint links.
- Legal and informational pages should clearly state that My Superfood is an informational catalog by Tilman Resch and not medical advice. Users should be pointed toward qualified health professionals for personal nutrition, food, and supplement decisions.
