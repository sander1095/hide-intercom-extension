# Hide Intercom Messenger – Firefox Extension

This is a lightweight Firefox extension that automatically hides the Intercom chat widget (messenger) on all websites. Made to reduce noise from customer support widgets across the web.


## 🚀 Features
- Hides Intercom launcher and iframe popups
- Works automatically on all pages
- No configuration needed

## 📁 File Structure
```
.
├── src/manifest.json          # Firefox extension manifest
├── src/hide-intercom.js       # Content script that removes Intercom UI elements
├── .gitignore                 # Ignore temp, log, and build files
├── .gitattributes             # Enforce consistent line endings and binary file handling
└── README.md                  # Project documentation
```

## 🧩 How to Install (Temporary Testing)
1. Open Firefox and go to `about:debugging`
2. Click **This Firefox** > **Load Temporary Add-on**
3. Select the `manifest.json` file from the project folder
4. Visit a site with Intercom to see the widget hidden automatically

## 🛠 How It Works
The content script:
- Injects CSS to hide common Intercom classes and frames
- Observes the DOM for dynamically loaded elements (via MutationObserver)

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
