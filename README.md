# Hide Intercom Messenger – Firefox Extension

This is a lightweight Firefox extension that automatically hides the Intercom chat widget (messenger) on all websites. Made to reduce noise from customer support widgets across the web.


## 🚀 Features
- Hides Intercom launcher and iframe popups automatically
- Works on all pages where Intercom is detected
- **Toggle functionality** - Click the extension icon to enable/disable blocking
- **Visual indicators** - Red (!) badge appears when Intercom is detected and blocked
- **Browser action popup** - Shows current status and allows easy toggling
- No configuration needed - works out of the box

## 📁 File Structure
```
.
├── src/
│   ├── manifest.json          # Firefox extension manifest with browser action
│   ├── hide-intercom.js       # Content script that removes Intercom UI elements
│   ├── background.js          # Background script for state management and badges
│   ├── popup.html             # Browser action popup interface
│   ├── popup.js               # Popup functionality script
│   └── logo.png               # Extension icon (For light theme users)
│   └── logo-white.png         # Extension icon (For dark theme users)
├── .gitignore                 # Ignore temp, log, and build files
├── .gitattributes             # Enforce consistent line endings and binary file handling
└── README.md                  # Project documentation
```

## 🧩 How to Install (Temporary Testing)
1. Open Firefox and go to `about:debugging`
2. Click **This Firefox** > **Load Temporary Add-on**
3. Select the `manifest.json` file from the `src` folder
4. Visit a site with Intercom to see the widget hidden automatically
5. Click the extension icon in the toolbar to toggle blocking on/off

## 🛠 How It Works
- **Content Script**: Injects CSS to hide common Intercom classes and frames
- **DOM Observer**: Watches for dynamically loaded elements (via MutationObserver)
- **Background Script**: Manages extension state and badge updates
- **Browser Action**: Shows red (!) badge when Intercom is detected and provides toggle functionality
- **State Persistence**: Remembers your enable/disable preference across browser sessions

## 🎮 Usage
- **Auto-blocking**: When enabled, Intercom widgets are automatically hidden on all sites
- **Toggle**: Click the extension icon to enable/disable blocking
- **Visual feedback**: Red (!) badge appears when Intercom is detected and blocked
- **Status popup**: Click the icon to see current status and toggle functionality

## 📦 Packaging for Distribution (Optional)
To build a `.xpi` file for permanent install or publishing:
```bash
zip -r hide-intercom.xpi *
```

Or use [`web-ext`](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/):
```bash
npm install --global web-ext
web-ext build
```

## 📝 License
MIT License

---
