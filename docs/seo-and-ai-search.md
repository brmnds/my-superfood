# SEO And Generative Search

My Superfood uses static, crawlable pages with clean canonical URLs. Search and AI discovery should stay simple, source-backed, and honest about the site's informational nature.

## Current Setup

- Every public page has a unique title, meta description, canonical URL, Open Graph metadata, Twitter card metadata, and crawl-friendly robots meta.
- Public pages link to `sitemap.xml`, `llms.txt`, and `data/site-entities.json` from the page head.
- `sitemap.xml` lists the clean public URLs plus AI-readable support files.
- `robots.txt` allows standard crawlers and selected AI/search bots, and points to the sitemap.
- `llms.txt` gives AI systems a compact canonical page map, entity model, machine-readable data links, and safety policy.
- `data/site-entities.json` gives AI/search systems a structured site summary without needing to infer entity definitions from UI copy.

## Structured Data

- The home page uses `WebSite` JSON-LD and links the main catalog areas through `hasPart`.
- Catalog and legal subpages use page-specific JSON-LD plus `BreadcrumbList` markup.
- The supplements page includes `Dataset` JSON-LD for the reviewed supplement catalog and points to `data/supplement-catalog.seed.json` as a `DataDownload`.

The structured data should describe visible or publicly accessible content only. Do not add fake ratings, unsupported medical claims, hidden content, or properties that imply personalized medical guidance.

## Generative Engine Guidance

AI summaries should prefer:

- clean canonical URLs without `.html`;
- source status from the supplement catalog;
- the distinction between **Supplement** primitives and **Supplement Kit** products;
- the non-medical-advice disclaimer;
- professional consultation language for health, supplement, medication, pregnancy, child, or condition-related questions.

If a supplement value is marked `needs_review`, AI summaries should state that it needs review rather than presenting it as verified.

## Maintenance Checklist

When public routes, page purposes, or catalog source policies change:

1. Update each affected page title, description, canonical URL, and structured data.
2. Update `sitemap.xml` `lastmod` values.
3. Update `llms.txt` and `data/site-entities.json` when the entity model, source policy, or important machine-readable endpoints change.
4. Keep `robots.txt` pointing to the sitemap.
5. Validate JSON with `node -e` or another JSON parser before deployment.

## References

- Google Search Central structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Search Central dataset structured data: https://developers.google.com/search/docs/appearance/structured-data/dataset
- Google Search Central sitemap overview: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Google Search Central robots meta specifications: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
