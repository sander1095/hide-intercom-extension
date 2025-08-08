# Release Process

This document describes how to release new versions of the Hide Intercom Messenger extension.

## 🤖 Automated Release (Recommended)

The extension uses GitHub Actions for automated releases to both GitHub Releases and Firefox Add-ons (AMO).

### Prerequisites

1. **GitHub Repository Secrets** - Configure these in your repository settings:
   - `AMO_API_KEY` - Your Firefox Add-ons API key
   - `AMO_API_SECRET` - Your Firefox Add-ons API secret

2. **Firefox Add-ons Developer Account**:
   - Create an account at [addons.mozilla.org](https://addons.mozilla.org/developers/)
   - Generate API credentials at [API Key Management](https://addons.mozilla.org/developers/addon/api/key/)

### Release Steps

1. **Update Version Number**:
   ```bash
   # Update version in src/manifest.json
   {
     "version": "1.1.0",
     ...
   }
   ```

2. **Commit Changes**:
   ```bash
   git add .
   git commit -m "chore: bump version to 1.1.0"
   git push origin main
   ```

3. **Create Release Tag**:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

4. **GitHub Actions Workflow**:
   - Automatically runs tests and linting
   - Builds the extension package
   - Creates GitHub Release with artifacts
   - Submits to Firefox Add-ons for review

### Workflow Stages

The automated release process includes:

1. **Build** (`main` branch pushes):
   - Lints extension code
   - Creates build artifacts
   - Available for download for 30 days

2. **Release** (tag pushes starting with `v`):
   - All build & test steps
   - Creates GitHub Release
   - Uploads signed extension to Firefox Add-ons
   - Submits for Mozilla review

## 🔧 Manual Release

If you need to release manually or debug the process:

### Prerequisites

1. **Install web-ext**:
   ```bash
   npm install -g web-ext
   ```

2. **Set up API credentials**:
   ```bash
   export AMO_API_KEY="your_api_key"
   export AMO_API_SECRET="your_api_secret"
   ```

### Manual Steps

1. **Run Tests**:
   ```bash
   npm test
   ```

2. **Lint Extension**:
   ```bash
   web-ext lint --source-dir=src/
   ```

3. **Build Package**:
   ```bash
   cd src
   zip -r ../hide-intercom-extension-v1.1.0.zip .
   cd ..
   ```

4. **Sign and Submit**:
   ```bash
   web-ext sign \
     --source-dir=src/ \
     --api-key=$AMO_API_KEY \
     --api-secret=$AMO_API_SECRET \
     --channel=listed
   ```

5. **Create GitHub Release**:
   - Go to [GitHub Releases](../../releases)
   - Click "Create a new release"
   - Choose tag version (e.g., `v1.1.0`)
   - Upload the built `.zip` file
   - Add release notes

## 📋 Release Checklist

Before creating a release:

- [ ] Update version number in `src/manifest.json`
- [ ] Test extension functionality manually
- [ ] Run `npm test` - all tests pass
- [ ] Run `web-ext lint --source-dir=src/` - no errors
- [ ] Update README.md if needed
- [ ] Commit all changes to `main` branch
- [ ] Create and push version tag

After release:

- [ ] Verify GitHub Release was created
- [ ] Check Firefox Add-ons submission status
- [ ] Monitor for any review feedback from Mozilla
- [ ] Update extension listing if approved

## 🚨 Troubleshooting

### Common Issues

1. **API Key Issues**:
   - Ensure secrets are correctly set in GitHub repository settings
   - Check API key permissions in Firefox Developer Hub

2. **Lint Errors**:
   - Run `web-ext lint --source-dir=src/` locally first
   - Fix any manifest.json or permission issues

3. **Build Failures**:
   - Check that all required files are in `src/` directory
   - Verify `logo.png` and `logo-white.png` are present

4. **Mozilla Review**:
   - Review can take 1-7 days for listed add-ons
   - Check [submission status](https://addons.mozilla.org/developers/addons)
   - Address any reviewer feedback promptly

## 🔗 Useful Links

- [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)
- [web-ext Documentation](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/)
- [Extension Workshop](https://extensionworkshop.com/)
- [AMO Review Policies](https://extensionworkshop.com/documentation/publish/add-on-policies/)
