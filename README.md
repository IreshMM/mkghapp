# Automate GitHub App Creation

Simple nodejs application that implements the GitHub app manifest workflow. Given an app manifest, this app would assist automating the creation of application and output the resulting `app_id`, `webhook_secret` and `private_key` to 3 separate files in a designated directory.

# Usage
## Instructions
### Invocation
```bash
docker run -u node \
    -p $LISTEN_PORT:$LISTEN_PORT \
    -v /path/to/output:$OUTPUT_DIR \
    -v /path/to/manifest.json:$MANIFEST_PATH \
    -e MANIFEST_PATH=/manifest.json
    -e GITHUB_ORG=my-org \
    -e LISTEN_PORT=3000 \
    -e OUTPUT_DIR=/output \
    ireshmm/mkghapp:latest
```
### Steps
Open your browser on ```http://localhost:$LISTEN_PORT``` and follow the flow.

## Inputs
### Environment variables
- GITHUB_API_HOST
- GITHUB_ORG
- LISTEN_PORT
- LISTEN_HOST
- OUTPUT_DIR
- MANIFEST_PATH

### Files
- App manifest JSON mounted to $MANIFEST_PATH

## Outputs
### Files
- ```$OUTPUT_DIR/app_id```
- ```$OUTPUT_DIR/webhook_secret```
- ```$OUTPUT_DIR/private_key.pem```

# Inspiration from and contains html from,
[https://github.com/rajbos/create-github-app-from-manifest.git](https://github.com/rajbos/create-github-app-from-manifest.git)