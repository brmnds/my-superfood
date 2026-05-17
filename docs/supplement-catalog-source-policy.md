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
3. `needs_review` when neither source is exact enough.

The current package-photo evidence folder is:

```text
/Users/tilmanresch/Downloads/iloveimg-converted (1)
```

The package photos are evidence and provenance, not public product thumbnails. For Blueprint/Bryan Johnson products, official Blueprint pages are the preferred source of truth when the exact supplement facts are available online.

## Source Status

Allowed values:

- `package_verified`: package label was readable and used for the relevant amount.
- `website_sourced`: official provider page was used for the relevant amount.
- `needs_review`: amount or interpretation was uncertain.

Do not silently guess unclear amounts. Store an ingredient with `amount: null` and `sourceStatus: "needs_review"` when needed.

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

The frontend falls back to this seed file if the catalog API is unavailable.
