# Image Validation

Last validated: 2026-06-28

This report validates current My Superfood images against the picture steering files:

- `steering/pictures-food.md`
- `steering/pictures-recipes.md`
- `steering/pictures-supplements.md`
- `steering/pictures-brand.md`

## Optimization Variants

The original food image files are preserved locally in an ignored backup folder:

```text
assets/images/originals/
```

The public UI uses generated optimized variants:

- Landing-page food bubbles: `assets/images/optimized/landing/*.jpg`, maximum `320x320`.
- Food catalog and landing detail card: `assets/images/optimized/catalog/*.jpg`, maximum `640x640`.
- Variant manifest: `assets/images/optimized/food-image-variants.json`.
- Regeneration script: `scripts/generate-food-image-variants.mjs`.

As of the 2026-05-23 optimization pass, 98 public food image sets were generated. Miso and Kombucha are intentionally omitted from the public food catalog. The original food image set is preserved locally; optimized landing images are roughly `1.5 MB` total, and optimized catalog/detail images are roughly `5.2 MB` total. This keeps the original source assets available locally while avoiding full-size image downloads in the main UI.

## Food Images

| Food | Current asset | Status | Notes |
| --- | --- | --- | --- |
| Broccoli | `assets/images/real/broccoli.jpg` | Pass | Raw broccoli reframed on a square white canvas so it stays centered in catalog cards and circular landing crops. |
| Chickpeas | `assets/images/real/chickpeas.png` | Pass | Full whole chickpeas on a clean white background. |
| Lentils | `assets/images/real/lentils-uncooked.jpg` | Pass | Clean uncooked lentils. |
| Cauliflower | `assets/images/real/cauliflower.png` | Pass | Raw cauliflower head on a clean white background. |
| Banana | `assets/images/real/banana.png` | Pass | Generated product-style banana image on a clean white background. |
| Avocado | `assets/images/real/avocado.jpg` | Pass | Full/halved avocado is recognizable. |
| Blueberries | `assets/images/real/blueberries.jpg` | Pass | Whole blueberries, clean close-up. |
| Spinach | `assets/images/real/spinach.jpg` | Pass | Raw spinach leaves. |
| Salmon | `assets/images/real/salmon.png` | Pass | Clean raw salmon fillet on a white background. |
| Oats | `assets/images/real/oats.png` | Pass | Small mountain of rolled oats on a clean white background. |
| Olive Oil | `assets/images/real/olive-oil.png` | Pass | Generated clean bottle-and-olives image; olives make the oil source identifiable in the circular crop. |
| Walnuts | `assets/images/real/walnuts.png` | Pass | Generated product-style raw walnut image on a clean white background. |
| Coconut Yogurt | `assets/images/real/coconut-yogurt.png` | Pass | Generated coconut yogurt image with a coconut piece in the yogurt on a clean white background. |
| Sweet Potato | `assets/images/real/sweet-potato.png` | Pass | Raw sweet potato with cut pieces on a clean white background. |
| Cacao | `assets/images/real/cacao.png` | Pass | Cacao powder and nibs on a clean white background. |
| Pumpkin Seeds | `assets/images/real/pumpkin-seeds.png` | Pass | Pumpkin seeds on a clean white background. |
| Black Beluga Lentils | `assets/images/real/black-beluga-lentils.png` | Pass | Generated product-style image of raw black beluga lentils on a clean white background. |
| Black Beans | `assets/images/real/black-beans.png` | Pass | Generated product-style image of raw dry black beans on a clean white background. |
| Kidney Beans | `assets/images/real/kidney-beans.png` | Pass | Generated product-style image of raw dry red kidney beans on a clean white background. |
| Cannellini Beans | `assets/images/real/cannellini-beans.png` | Pass | Generated product-style image of raw dry cannellini beans on a clean white background. |
| Green Peas | `assets/images/real/green-peas.png` | Pass | Generated product-style image of fresh green peas and pods on a clean white background. |
| Edamame | `assets/images/real/edamame.png` | Pass | Generated product-style image of edamame pods and beans on a clean white background. |
| Soybeans | `assets/images/real/soybeans.png` | Pass | Generated product-style image of dry soybeans on a clean white background. |
| Tofu | `assets/images/real/tofu.png` | Pass | Generated product-style image of plain tofu blocks on a clean white background. |
| Tempeh | `assets/images/real/tempeh.png` | Pass | Generated product-style image of plain tempeh with visible soybean texture on a clean white background. |
| Broccoli Sprouts | `assets/images/real/broccoli-sprouts.png` | Pass | Generated product-style image of raw broccoli sprouts on a clean white background. |
| Brussels Sprouts | `assets/images/real/brussels-sprouts.png` | Pass | Generated product-style image of raw Brussels sprouts on a clean white background. |
| Kale | `assets/images/real/kale.png` | Pass | Generated product-style image of raw kale leaves on a clean white background. |
| Cabbage | `assets/images/real/cabbage.png` | Pass | Generated product-style image of raw green cabbage on a clean white background. |
| Red Cabbage | `assets/images/real/red-cabbage.png` | Pass | Generated product-style image of raw red cabbage on a clean white background. |
| Watercress | `assets/images/real/watercress.png` | Pass | Generated product-style image of raw watercress on a clean white background. |
| Radishes | `assets/images/real/radishes.png` | Pass | Generated product-style image of raw red radishes on a clean white background. |
| Kohlrabi | `assets/images/real/kohlrabi.png` | Pass | Generated product-style image of raw kohlrabi on a clean white background. |
| Swiss Chard | `assets/images/real/swiss-chard.png` | Pass | Generated product-style image of raw Swiss chard on a clean white background. |
| Romaine Lettuce | `assets/images/real/romaine-lettuce.png` | Pass | Generated product-style image of raw romaine lettuce on a clean white background. |
| Beet Greens | `assets/images/real/beet-greens.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Dandelion Greens | `assets/images/real/dandelion-greens.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Parsley | `assets/images/real/parsley.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Cilantro | `assets/images/real/cilantro.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Microgreens | `assets/images/real/microgreens.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Carrots | `assets/images/real/carrots.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Pumpkin | `assets/images/real/pumpkin.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Beets | `assets/images/real/beets.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Tomatoes | `assets/images/real/tomatoes.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Bell Peppers | `assets/images/real/bell-peppers.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Red Onions | `assets/images/real/red-onions.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Garlic | `assets/images/real/garlic.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Leeks | `assets/images/real/leeks.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Asparagus | `assets/images/real/asparagus.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Artichokes | `assets/images/real/artichokes.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Mushrooms | `assets/images/real/mushrooms.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Seaweed | `assets/images/real/seaweed.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Sauerkraut | `assets/images/real/sauerkraut.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Kimchi | `assets/images/real/kimchi.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Blackberries | `assets/images/real/blackberries.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Acai | `assets/images/real/acai.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Pomegranate | `assets/images/real/pomegranate.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Lemons | `assets/images/real/lemons.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Kiwi | `assets/images/real/kiwi.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Almonds | `assets/images/real/almonds.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Pistachios | `assets/images/real/pistachios.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Hazelnuts | `assets/images/real/hazelnuts.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Cashews | `assets/images/real/cashews.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Brazil Nuts | `assets/images/real/brazil-nuts.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Pecans | `assets/images/real/pecans.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Macadamia Nuts | `assets/images/real/macadamia-nuts.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Chia Seeds | `assets/images/real/chia-seeds.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Flaxseeds | `assets/images/real/flaxseeds.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Hemp Seeds | `assets/images/real/hemp-seeds.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Sunflower Seeds | `assets/images/real/sunflower-seeds.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Sesame Seeds | `assets/images/real/sesame-seeds.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Tahini | `assets/images/real/tahini.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Steel-Cut Oats | `assets/images/real/steel-cut-oats.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Quinoa | `assets/images/real/quinoa.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Buckwheat | `assets/images/real/buckwheat.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Brown Rice | `assets/images/real/brown-rice.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Wild Rice | `assets/images/real/wild-rice.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Farro | `assets/images/real/farro.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Bulgur | `assets/images/real/bulgur.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Millet | `assets/images/real/millet.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Avocado Oil | `assets/images/real/avocado-oil.png` | Pass | Regenerated product-style ingredient image on a clean white background; visible avocado half and wedge make the oil identifiable. |
| Olives | `assets/images/real/olives.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Natto | `assets/images/real/natto.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Sardines | `assets/images/real/sardines.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Mackerel | `assets/images/real/mackerel.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Trout | `assets/images/real/trout.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Herring | `assets/images/real/herring.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Turmeric | `assets/images/real/turmeric.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Ginger | `assets/images/real/ginger.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Cinnamon | `assets/images/real/cinnamon.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Rosemary | `assets/images/real/rosemary.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Oregano | `assets/images/real/oregano.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Thyme | `assets/images/real/thyme.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Green Tea | `assets/images/real/green-tea.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Matcha | `assets/images/real/matcha.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Walnut Oil | `assets/images/real/walnut-oil.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Hemp Seed Oil | `assets/images/real/hemp-seed-oil.png` | Pass | Generated product-style ingredient image on a clean white background. |
| Wheat Germ Oil | `assets/images/real/wheat-germ-oil.png` | Pass | Generated product-style ingredient image on a clean white background. |

## Recipe Images

| Image | Current asset | Status | Notes |
| --- | --- | --- | --- |
| Main recipe | `assets/images/real/recipe-bowl.jpg` | Pass | Bright finished dish. |
| Gallery image | `assets/images/real/recipe-gallery-1.jpg` | Pass | Bright recipe/food context. |
| Roasted vegetable tofu almond cream | `assets/images/recipes/roasted-vegetables-tofu-almond-cream.png` | Pass | Generated 4:5 Boho recipe image; food is clear, warm, bright, and the topping reads as vegan almond cream rather than cheese. |
| Avocado blueberry celery salad | `assets/images/recipes/avocado-blueberry-celery-salad.png` | Pass | Generated 4:5 Boho recipe image; fresh salad ingredients are clear and uncluttered. |
| Tomato herb vegetable bake | `assets/images/recipes/tomato-herb-vegetable-bake.png` | Pass | Generated 4:5 Boho recipe image; baked dish is clear with bright natural styling. |
| Creamy green bean tofu salad | `assets/images/recipes/creamy-green-bean-tofu-salad.png` | Pass | Generated 4:5 Boho recipe image; tofu and green beans remain the clear subject. |
| Spinach avocado lentil salad | `assets/images/recipes/spinach-avocado-lentil-salad.png` | Pass | Generated 4:5 Boho recipe image; leafy greens, avocado, and lentils are distinct. |
| Broccoli chickpea lentil bowl | `assets/images/recipes/broccoli-chickpea-lentil-bowl.png` | Pass | Generated 4:5 Boho recipe image; legumes and broccoli are clear and appetizing. |
| Avocado tomato seeded flatbread | `assets/images/recipes/avocado-tomato-seeded-flatbread.png` | Pass | Generated 4:5 Boho recipe image; flatbread toppings are inspectable. |
| Smoked salmon seeded toast | `assets/images/recipes/smoked-salmon-seeded-toast.png` | Pass | Generated 4:5 Boho recipe image; salmon toasts are clear and bright. |
| Creamy romaine tomato salad | `assets/images/recipes/creamy-romaine-tomato-salad.png` | Pass | Generated 4:5 Boho recipe image; salad is clean and fresh. |
| Avocado nut greens bowl | `assets/images/recipes/avocado-nut-greens-bowl.png` | Pass | Generated 4:5 Boho recipe image; bowl ingredients are clear with organic tabletop styling. |
| Creamy green bean noodle bowl | `assets/images/recipes/creamy-green-bean-noodle-bowl.png` | Pass | Generated 4:5 Boho recipe image; noodles, green beans, and mushrooms are visible. |

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

## Blog Images

| Image | Current asset | Status | Notes |
| --- | --- | --- | --- |
| Supplement protocol hero | `assets/images/blog/supplement-protocol-hero.jpg` | Pass | Generated editorial article image; compressed JPEG, no readable labels or medical claims. |
| Morning supplement routine | `assets/images/blog/morning-supplement-routine.jpg` | Pass | Generated editorial inline image for morning timing section; compressed JPEG, no readable labels. |
| Evening recovery routine | `assets/images/blog/evening-recovery-routine.jpg` | Pass | Generated editorial inline image for evening timing section; compressed JPEG, no readable labels. |
| Morning lion's mane shake | `assets/images/blog/morning-shake-lions-mane.jpg` | Pass | Generated 3:2 editorial image; shake, nuts, hemp seeds, lion's mane mushroom, linseed oil, and olive oil are visible with no labels or medical claims. |

## Required Image Replacement Backlog

No food image replacement backlog remains after the 2026-05-17 generated image pass.

## Acceptance Criteria For Next Image Pass

- Every food card passes the five checks in `steering/pictures-food.md`.
- No food image shows an archived document, cooked dish, dark background, field scene, or unrelated product.
- Landing-page circular crop and catalog-card crop both show the ingredient clearly.
- `assets/images/real/sources.tsv` is updated for every replaced asset.
