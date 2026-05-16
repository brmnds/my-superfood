# Image Validation

Last validated: 2026-05-16

This report validates current My Superfood images against the picture steering files:

- `steering/pictures-food.md`
- `steering/pictures-recipes.md`
- `steering/pictures-supplements.md`
- `steering/pictures-brand.md`

## Food Images

| Food | Current asset | Status | Notes |
| --- | --- | --- | --- |
| Broccoli | `assets/images/real/broccoli.jpg` | Pass | Raw broccoli on bright background. |
| Chickpeas | `assets/images/real/chickpeas.png` | Pass | Full whole chickpeas on a clean white background. |
| Lentils | `assets/images/real/lentils-uncooked.jpg` | Pass | Clean uncooked lentils. |
| Cauliflower | `assets/images/real/cauliflower.png` | Pass | Raw cauliflower head on a clean white background. |
| Banana | `assets/images/real/banana-transparent.png` | Pass | Transparent-background banana asset. |
| Avocado | `assets/images/real/avocado.jpg` | Pass | Full/halved avocado is recognizable. |
| Blueberries | `assets/images/real/blueberries.jpg` | Pass | Whole blueberries, clean close-up. |
| Spinach | `assets/images/real/spinach.jpg` | Pass | Raw spinach leaves. |
| Salmon | `assets/images/real/salmon.png` | Pass | Clean raw salmon fillet on a white background. |
| Oats | `assets/images/real/oats.png` | Pass | Small mountain of rolled oats on a clean white background. |
| Olive Oil | `assets/images/real/olive-oil.jpg` | Pass | Clean bottle/product-style image. |
| Walnuts | `assets/images/real/walnuts.jpg` | Pass | Raw walnuts are recognizable. |
| Yogurt | `assets/images/real/yogurt.png` | Pass | Clean protein-yogurt style bowl on a white background. |
| Sweet Potato | `assets/images/real/sweet-potato.png` | Pass | Raw sweet potato with cut pieces on a clean white background. |
| Cacao | `assets/images/real/cacao.png` | Pass | Cacao powder and nibs on a clean white background. |
| Pumpkin Seeds | `assets/images/real/pumpkin-seeds.png` | Pass | Pumpkin seeds on a clean white background. |

## Recipe Images

| Image | Current asset | Status | Notes |
| --- | --- | --- | --- |
| Main recipe | `assets/images/real/recipe-bowl.jpg` | Pass | Bright finished dish. |
| Gallery image | `assets/images/real/recipe-gallery-1.jpg` | Pass | Bright recipe/food context. |

## Supplement Images

| Supplement | Current asset | Status | Notes |
| --- | --- | --- | --- |
| Vitamin D3 + K2 | `assets/images/vitamin-d3-k2.svg` | Needs review | Current visual is an illustration, not product-style photography. Acceptable for placeholder, but future replacement should follow supplement steering. |
| Creatine | `assets/images/creatine.svg` | Needs review | Current visual is an illustration. Replace with clean supplement powder/tub imagery when polishing supplements. |
| Omega-3 | `assets/images/omega-3.svg` | Needs review | Current visual is an illustration. Replace with clean capsule/oil imagery when polishing supplements. |
| Magnesium Glycinate | `assets/images/magnesium.svg` | Needs review | Current visual is an illustration. Replace with clean capsule/product imagery when polishing supplements. |

## Brand Images

| Brand | Current asset | Status | Notes |
| --- | --- | --- | --- |
| LuminaOS | `assets/images/luminaos-logo.png` | Pass | Real local LuminaOS logo copied from the mobile app repository. |

## Required Image Replacement Backlog

No food image replacement backlog remains after the 2026-05-16 generated image pass.

## Acceptance Criteria For Next Image Pass

- Every food card passes the five checks in `steering/pictures-food.md`.
- No food image shows an archived document, cooked dish, dark background, field scene, or unrelated product.
- Landing-page circular crop and catalog-card crop both show the ingredient clearly.
- `assets/images/real/sources.tsv` is updated for every replaced asset.
