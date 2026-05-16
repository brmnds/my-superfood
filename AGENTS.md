# Agent Instructions For My Superfood

## Project Shape

This repository is a static HTML/CSS/JavaScript site for My Superfood.

There is currently no Node, Python, OpenAI Agents SDK, or backend SDK dependency inside this folder. Do not add a package manager, build system, or SDK unless the feature genuinely requires one.

## Local Preview

Use a simple static server from the repository root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/index.html
```

## Implementation Defaults

- Keep the app static for the current version.
- Prefer plain HTML, CSS, and vanilla JavaScript.
- Keep shared data in `script.js` until the project needs a structured data source.
- Store local visual assets in `assets/images/`.
- Do not commit `.playwright-cli/` browser verification output.
- Keep generated or downloaded image source notes in `assets/images/real/sources.tsv`.

## Deployment Defaults

The approved deployment direction is AWS static hosting:

- S3 for static files.
- CloudFront for HTTPS, caching, and global delivery.
- ACM certificate in `us-east-1`.
- Route 53 alias records for `my-superfood.com` and `www.my-superfood.com`.

Do not switch to Amplify, Vercel, Netlify, or a framework deployment without an explicit product or workflow reason.

## Verification

Before committing changes, run:

```bash
node --check script.js
git diff --check
```

When changing asset references, also verify referenced files exist.
