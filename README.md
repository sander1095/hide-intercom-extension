# Hide Intercom Messenger – Firefox Extension

[![Firefox Add-ons](https://img.shields.io/amo/v/hide-intercom-messenger?style=for-the-badge&logo=firefox&color=FF6611)](https://addons.mozilla.org/firefox/addon/hide-intercom-messenger/)
[![Firefox Users](https://img.shields.io/amo/users/hide-intercom-messenger?style=for-the-badge&logo=firefox&color=FF6611)](https://addons.mozilla.org/firefox/addon/hide-intercom-messenger/)
[![GitHub Release](https://img.shields.io/github/v/release/sander1095/hide-intercom-extension?style=for-the-badge&logo=github)](../../releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/sander1095/hide-intercom-extension/release.yml?style=for-the-badge&logo=github)](../../actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

This is a lightweight Firefox extension that automatically hides the Intercom chat widget (messenger) on all websites. Made to reduce noise from customer support widgets across the web.

## 📦 Installation

### 🦊 Install from Firefox Add-ons (Recommended)

**[📥 Install from Firefox Add-ons Store](https://addons.mozilla.org/firefox/addon/hide-intercom-messenger/)**

### 🔧 Development Installation

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development setup instructions.

## 🚀 Features
- Hides Intercom launcher and iframe popups automatically
- Works on all pages where Intercom is detected
- **Toggle functionality** - Click the extension icon to enable/disable blocking
- **Visual indicators** - Red (!) badge appears when Intercom is detected and blocked
- **Browser action popup** - Shows current status and allows easy toggling
- No configuration needed - works out of the box

## 📁 Project Structure
```
.
├── .github/workflows/         # GitHub Actions for automated releases
├── src/
│   ├── manifest.json          # Firefox extension manifest with browser action
│   ├── hide-intercom.js       # Content script that removes Intercom UI elements
│   ├── background.js          # Background script for state management and badges
│   ├── popup.html             # Browser action popup interface
│   ├── popup.js               # Popup functionality script
│   ├── logo.png               # Extension icon (light theme)
│   └── logo-white.png         # Extension icon (dark theme)
├── CONTRIBUTING.md            # Development setup and guidelines
├── RELEASE.md                 # Release process documentation
└── README.md                  # Project documentation
```

## 🎮 Usage
- **Auto-blocking**: When enabled, Intercom widgets are automatically hidden on all sites
- **Toggle**: Click the extension icon to enable/disable blocking
- **Visual feedback**: 
  - Red **!** badge = Intercom detected and blocked
  - Red **●** badge = Extension disabled
  - No badge = Extension enabled, no Intercom found
- **Status popup**: Click the icon to see current status and toggle functionality
- **Theme support**: Automatically switches icon for light/dark browser themes

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup instructions  
- Local testing guidelines
- Code style requirements
- Pull request process

## 🚀 Releases

This project uses automated releases via GitHub Actions. See [RELEASE.md](RELEASE.md) for:
- Automated release process
- Manual release instructions  
- Troubleshooting guide

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---