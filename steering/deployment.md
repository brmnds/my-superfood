# Deployment Steering

## Production Target

Deploy My Superfood as a static website on AWS.

Primary domain:

```text
my-superfood.com
```

Also support:

```text
www.my-superfood.com
```

## Chosen Architecture

Use:

- Amazon S3 for private static asset storage.
- Amazon CloudFront for public delivery, HTTPS, compression, caching, and custom domain support.
- AWS Certificate Manager in `us-east-1` for the CloudFront TLS certificate.
- Route 53 for DNS alias records.

This is preferred over Amplify for the current version because the app is static and does not need a framework build pipeline, branch previews, or managed backend workflows yet.

## Live AWS Resources

- AWS account: `803663093100`
- Route 53 hosted zone: `Z0623703111ISXQN9E14T`
- S3 bucket: `my-superfood-com-site`
- CloudFront distribution: `E35C2BOUS31X5M`
- CloudFront domain: `d9jbqlvbu2y8q.cloudfront.net`
- CloudFront Origin Access Control: `ERNA4ANKIMX0O`
- ACM certificate: `arn:aws:acm:us-east-1:803663093100:certificate/950fa921-7eca-4bce-bc3e-a0f9d61ee14c`

## Deployment Flow

1. Verify AWS identity before making infrastructure changes:

   ```bash
   aws sts get-caller-identity
   ```

2. Confirm the Route 53 hosted zone for `my-superfood.com`.

3. Create or reuse an S3 bucket for the site files.

4. Upload the static site files:

   - `*.html`
   - `styles.css`
   - `script.js`
   - `favicon.ico`
   - `assets/`

5. Create or reuse an ACM certificate in `us-east-1` for:

   - `my-superfood.com`
   - `www.my-superfood.com`

6. Validate the certificate with DNS records in Route 53.

7. Create or update a CloudFront distribution:

   - Origin: S3 bucket.
   - Default root object: `index.html`.
   - Viewer protocol policy: redirect HTTP to HTTPS.
   - Alternate domain names: `my-superfood.com`, `www.my-superfood.com`.

8. Add Route 53 alias records:

   - `A`/`AAAA` for `my-superfood.com` to CloudFront.
   - `A`/`AAAA` for `www.my-superfood.com` to CloudFront.

9. Invalidate CloudFront after uploads.

## Operational Notes

- Keep S3 bucket public access blocked; use CloudFront for public access.
- Prefer long-lived cache headers for image assets and shorter cache headers for HTML.
- Keep deployment commands in docs or scripts once the first deployment is complete.
- Do not commit AWS credentials, account secrets, or generated credential files.

## Post-Deployment Checks

Verify:

- `https://my-superfood.com`
- `https://www.my-superfood.com`
- direct navigation to static pages such as `/foods.html`
- image assets load correctly
- browser console has no missing asset errors
