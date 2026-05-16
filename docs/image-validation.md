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
| Chickpeas | `assets/images/real/chickpeas.jpg` | Fail | Current source appears to be chickpea flour/ground gram, not full chickpeas. Replace with full real chickpeas on a clean bright background. |
| Lentils | `assets/images/real/lentils-uncooked.jpg` | Pass | Clean uncooked lentils. |
| Cauliflower | `assets/images/real/cauliflower-market.jpg` | Fail | Better than the archived document thumbnail, but still has market/background context. Replace with raw cauliflower on transparent or very bright empty background. |
| Banana | `assets/images/real/banana-transparent.png` | Pass | Transparent-background banana asset. |
| Avocado | `assets/images/real/avocado.jpg` | Pass | Full/halved avocado is recognizable. |
| Blueberries | `assets/images/real/blueberries.jpg` | Pass | Whole blueberries, clean close-up. |
| Spinach | `assets/images/real/spinach.jpg` | Pass | Raw spinach leaves. |
| Salmon | `assets/images/real/salmon.jpg` | Fail | Current image reads as food/dish context. Replace with a clean raw salmon fillet or piece on bright neutral/transparent background. |
| Oats | `assets/images/real/oats.jpg` | Fail | Current image has an unsuitable blue/background cast. Replace with a small mountain of oats, scoop, or cup on bright neutral background. |
| Olive Oil | `assets/images/real/olive-oil.jpg` | Pass | Clean bottle/product-style image. |
| Walnuts | `assets/images/real/walnuts.jpg` | Pass | Raw walnuts are recognizable. |
| Yogurt | `assets/images/real/yogurt.jpg` | Fail | Current image is not suitable for the intended protein yogurt card. Replace with clean protein yogurt in a white bowl/cup on bright background. |
| Sweet Potato | `assets/images/real/sweet-potato.jpg` | Fail | Current image is not the raw ingredient. Replace with raw sweet potato, whole or cut, on bright neutral background. |
| Cacao | `assets/images/real/cacao.jpg` | Fail | Needs a cleaner, brighter background. Prefer cacao powder/nibs in a clean bowl, spoon, or small pile. |
| Pumpkin Seeds | `assets/images/real/pumpkin-seeds.jpg` | Fail | Current image has a dark/black background. Replace with pumpkin seeds on transparent, white, or bright neutral background. |

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

Replace these before calling the food image set production-ready:

1. Chickpeas: full real chickpeas, no flour/powder.
2. Cauliflower: raw cauliflower on transparent or very bright empty background.
3. Salmon: raw clean salmon fillet/piece, not a dish.
4. Oats: small mountain, scoop, or cup on bright neutral background.
5. Cacao: cleaner bright background.
6. Pumpkin seeds: bright or transparent background, no black background.
7. Yogurt: protein yogurt in a clean bowl/cup.
8. Sweet potato: raw sweet potato, not a dish.

## Acceptance Criteria For Next Image Pass

- Every food card passes the five checks in `steering/pictures-food.md`.
- No food image shows an archived document, cooked dish, dark background, field scene, or unrelated product.
- Landing-page circular crop and catalog-card crop both show the ingredient clearly.
- `assets/images/real/sources.tsv` is updated for every replaced asset.
