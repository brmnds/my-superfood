# My Superfood Backend

Small AWS backend for My Superfood saved lists.

## Files

- `list-api.mjs` - Lambda handler for list reads and writes.
- `lambda-trust-policy.json` - IAM role trust policy for Lambda.
- `list-api-role-policy.json` - least-privilege inline policy for CloudWatch Logs and the DynamoDB table.
- `lambda-env.json` - Lambda environment variables.
- `function-url-cors.json` - Function URL CORS config.

## AWS Resources

- DynamoDB table: `my-superfood-list-items`
- Lambda function: `my-superfood-list-api`
- Lambda role: `my-superfood-list-api-role`
- Function URL: `https://l36bksjavuxnp45gl5fel2jkbq0ertbm.lambda-url.eu-central-1.on.aws`

## Deploy Lambda Code

```bash
zip -j /tmp/my-superfood-list-api.zip backend/list-api.mjs
aws lambda update-function-code \
  --function-name my-superfood-list-api \
  --zip-file fileb:///tmp/my-superfood-list-api.zip \
  --region eu-central-1
aws lambda wait function-updated \
  --function-name my-superfood-list-api \
  --region eu-central-1
```

See `docs/database.md` for the data model and cost notes.
