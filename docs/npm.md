# Aegis npm package

Aegis publishes `@aegis-oss/aegis` as the official npm entrypoint
for the Web viewer and command dispatcher.

The npm `aegis` command has two responsibilities:

- `aegis web`, `aegis serve`, and `aegis open` serve the bundled
  Web UI for exported snapshots.
- `aegis record`, `aegis top`, `aegis monitor`,
  `aegis stat`, and `aegis report` delegate to a real Rust Aegis
  collector binary when one is available.

The npm package does not run privileged commands, download hidden binaries, or
execute a `postinstall` installer.

## Build locally

```bash
npm ci --prefix frontend
node frontend/scripts/prepare-sample.mjs
npm run build --prefix frontend
node script/npm/sync-version.mjs
node script/npm/prepare-aegis.mjs
```

## Validate locally

```bash
cd package/npm/aegis
npm test
npm pack --dry-run
```

## Publish

Publishing is handled by `.github/workflows/npm-publish.yml` on
`workflow_dispatch`, GitHub Release publish, or `v*` tag push. The workflow uses
npm Trusted Publishing with GitHub Actions OIDC and skips versions that already
exist.

Configure npm Trusted Publishing for:

- Package: `@aegis-oss/aegis`
- Publisher: GitHub Actions
- GitHub organization/user: `aegis-oss`
- Repository: `aegis`
- Workflow filename: `npm-publish.yml`
- Allowed action: `npm publish`

Manual local publishing is equivalent to:

```bash
cd package/npm/aegis
npm publish --access public
```
