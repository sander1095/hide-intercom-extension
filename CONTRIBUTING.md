# Contributing to Hide Intercom Messenger

Thank you for your interest in contributing! This guide will help you set up the development environment and understand the project structure.

## 🛠 Development Setup

### Prerequisites

- Firefox Browser
- Node.js (v16 or higher)
- Git

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/hide-intercom-extension.git
   cd hide-intercom-extension
   ```

## 🧩 Loading the Extension for Testing

### Method 1: Temporary Installation (Recommended for Development)

1. Open Firefox and navigate to `about:debugging`
2. Click **"This Firefox"** in the left sidebar
3. Click **"Load Temporary Add-on..."**
4. Navigate to the project folder and select `src/manifest.json`
5. The extension should now appear in your Firefox toolbar

### Method 2: Using web-ext (Advanced)

1. **Install web-ext globally**:
   ```bash
   npm install
   ```

2. **Run the extension**:
   ```bash
   npx web-ext run --source-dir=src/
   ```
   This opens a new Firefox instance with the extension pre-loaded.

3. **Auto-reload on changes**:
   ```bash
   npx web-ext run --source-dir=src/ --reload
   ```

## 🧪 Testing the Extension

### Manual Testing

1. **Visit websites with Intercom widgets**:
   - https://robbshop.nl
   - Shopify.com
   - Intercom.com
   - Any SaaS website with customer support chat

2. **Test functionality**:
   - **Enabled state**: Intercom widgets should be hidden, red "!" badge appears
   - **Disabled state**: Intercom widgets visible, red "●" badge appears
   - **Toggle**: Click extension icon to switch between states
   - **Theme switching**: Test light/dark mode icon switching

3. **Verify in different scenarios**:
   - Page load with Intercom already present
   - Dynamically loaded Intercom widgets
   - Multiple tabs with different states
   - Browser restart (state persistence)

## 🔧 Development Workflow

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Edit files in `src/` directory
   - Update documentation if needed

3. **Test your changes**:
   ```bash
   web-ext lint --source-dir=src/
   ```

4. **Load extension in Firefox**:
   - Go to `about:debugging`
   - Remove old temporary extension
   - Load updated extension from `src/manifest.json`

5. **Commit and push**:
   ```bash
   git add .
   git commit -m "describe your changes"
   git push origin feature/your-feature-name
   ```

### Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code formatting

## 📝 Adding New Features

### Before You Start

1. **Check existing issues**: Look for related GitHub issues
2. **Discuss major changes**: Open an issue to discuss significant modifications

### Feature Development Process

1. **Plan the feature**:
   - Define the problem it solves
   - Outline the implementation approach
   - Consider edge cases and error handling

2. **Implement incrementally**:
   - Start with core functionality
   - Add error handling
   - Write comprehensive tests
   - Update documentation

3. **Test thoroughly**:
   - Manual testing in various scenarios
   - Cross-browser compatibility (if applicable)

## 🚀 Pull Request Process

1. **Create descriptive PR title**: Use conventional commit format
2. **Fill out PR template**: Describe changes and testing performed
3. **Ensure CI passes**: All tests and linting must pass
4. **Request review**: Tag maintainers for review
5. **Address feedback**: Make requested changes promptly
6. **Merge**: Maintainers will merge approved PRs

## 🔗 Resources

- [Firefox Extension Development](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [web-ext Documentation](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/)
- [Extension Workshop](https://extensionworkshop.com/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

## ❓ Getting Help

- **GitHub Issues**: Report bugs or request features
- **Documentation**: Check README.md and other docs first
