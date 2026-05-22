# Supplement Catalog Source Policy

The supplement catalog is a reviewed informational database. It is not medical advice and does not provide personalized dosing guidance.

## Naming

- **Supplement** means the primitive ingredient or nutrient, for example NAC, Curcumin, Omega-3, DHA, Collagen Peptides, or Ashwagandha.
- **Supplement Product** means a purchasable product, mix, powder, capsule, or bundle from any provider.
- Product ingredient rows must reference primitives with `supplementId`.
- Product display names should follow the package or official provider name. Alternate names go in `aliases`.

## Sources

Use sources in this order:

1. Official provider product pages when they expose exact supplement-facts data, including ingredient amount, unit, and serving basis.
2. Package photos supplied by Tilman as verification evidence, cross-checks, and fallback when official online facts are missing or ambiguous.
3. Reputable ingredient/reference pages when product pages do not specify timing or broader ingredient context.
4. `needs_review` when neither source is exact enough.

The current package-photo evidence folder is:

```text
/Users/tilmanresch/Downloads/iloveimg-converted (1)
```

The package photos are evidence and provenance, not public product thumbnails. For Blueprint/Bryan Johnson products, official Blueprint pages are the preferred source of truth when the exact supplement facts are available online.

For Sunday Natural products, use the exact product page matching the ordered name and SKU. Store the purchased item as a **Supplement Product** and connect its ingredients to primitive **Supplement** rows. Keep prices out of the catalog. The current Sunday Natural research note is:

```text
docs/sunday-natural-supplement-research.md
```

For non-Sunday, non-Blueprint products such as Swanson, NOW Foods, or natural elements, use the exact official provider product page for shop links, supplement facts, directions, and timing context. Use Tilman's package photos as provenance and cross-check evidence. The current mixed-provider research note is:

```text
docs/tilman-additional-supplement-research.md
```

If a photographed product appears to be an older or discontinued formula and the official provider page now points to a newer formula, keep the photographed product as the catalog item, mark uncertain per-ingredient amounts as `needs_review`, and document that the current official page is only being used for provider, shop-link, timing, or storage context.

## Source Status

Allowed values:

- `package_verified`: package label was readable and used for the relevant amount.
- `website_sourced`: official provider page was used for the relevant amount.
- `needs_review`: amount or interpretation was uncertain.

Do not silently guess unclear amounts. Store an ingredient with `amount: null` and `sourceStatus: "needs_review"` when needed.

## Shop Links And Timing

Supplement Products may include a quiet `shopUrl` that points only to the official provider or shop product page. Do not use affiliate links, price-comparison pages, or marketplace mirrors as shop links.

Timing guidance is informational and not a personalized schedule. Store it on both Supplement and Supplement Product rows as:

```json
{
  "slots": ["morning"],
  "avoidSlots": ["evening"],
  "note": "Short hover explanation.",
  "sourceIds": ["website-example"],
  "sourceStatus": "official_page"
}
```

Allowed timing source statuses are:

- `official_page`: the product or provider page gives the timing, directions, or daily routine context.
- `ingredient_researched`: the catalog timing is inferred from ingredient-level references such as NIH ODS, NCCIH, MedlinePlus, or provider education pages.
- `needs_review`: timing is unclear, person-specific, or not backed by enough source context.

Use official product directions first. If they only say "with food" or "before meals", avoid overclaiming exact clock time. If an ingredient can feel stimulating, use conservative earlier-day wording and explain the uncertainty. If timing depends on medication, condition, tolerance, or clinician advice, keep the note neutral.

## Storage And Refrigeration

Supplement Products should include storage guidance when the provider page or package label gives enough evidence. Store it as:

```json
{
  "requiresRefrigeration": false,
  "mode": "cool_dry",
  "label": "Cool, dry",
  "note": "Short hover explanation.",
  "avoidFreezing": false,
  "sourceIds": ["website-example"],
  "sourceStatus": "official_page"
}
```

Allowed storage modes are:

- `refrigerate`: the product should be stored in the refrigerator.
- `cool_dry`: the product should be stored cool and dry, away from heat, sunlight, or moisture; this is not a refrigerator instruction.
- `room_temperature`: the product is described or treated as shelf-stable at normal room temperature.
- `needs_review`: storage is unclear.

Only mark `requiresRefrigeration: true` when the official product page or package label explicitly says to refrigerate or keep refrigerated. Do not treat "cool", "cool dry place", or "protected from heat" as refrigerator guidance. Refrigerators can introduce moisture and may be unsuitable for some capsules, powders, or tablets unless the provider specifically recommends fridge storage.

As of the 2026-05-21 review, the only current Tilman protocol product marked as refrigerator storage is Sunday Natural Liposomal Vitamin C + Zinc. Sunday Natural says refrigeration is ideal before and during use, to use it within 8 weeks after opening, and not to freeze it.

## Reseeding

The reviewed source of truth is:

```text
data/supplement-catalog.seed.json
```

Before seeding:

```bash
node scripts/validate-supplement-catalog.mjs
```

Then import:

```bash
node scripts/seed-supplement-catalog.mjs
```

The frontend tries the live read-only catalog API first:

```text
https://z4kxvkidmk35kelru4rrjbbsbi0gcpqt.lambda-url.eu-central-1.on.aws
```

If the API is unavailable, it falls back to the reviewed seed file so the public page still renders.
