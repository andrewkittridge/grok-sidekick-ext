# Grok Sidekick Extension

A modern, open-source browser extension for Chrome (and compatible with Firefox via WebExtensions) that lets you query the xAI Grok API with contextual input from the current webpage, such as selected text.

---

## Features
- **Highlight & Ask:** Highlight text on any page, then press **Ctrl+Shift+X** (Windows) or **⌘+Shift+X** (Mac) to instantly send it to Grok and get a response.
- **Popup UI:** Enter your xAI API key, select a model, fetch selected text, and submit queries directly from the popup.
- **API Key Storage:** Securely stores your API key in browser storage.
- **Model Selection:** Choose between grok-4, grok-3, and grok-3-mini.
- **Modern UI:** Clean, dark-themed, and responsive popup design.
- **No dependencies:** Pure vanilla JS, no build step required.

---

## Setup & Installation

1. **Clone or Download** this repository.
2. **Add your icons:** Place `icon16.png`, `icon48.png`, and `icon128.png` in the root folder (or use the provided SVGs/PNGs).
3. **Load the extension:**
   - **Chrome:**
     1. Go to `chrome://extensions/`
     2. Enable Developer mode
     3. Click "Load unpacked" and select your folder
   - **Firefox:**
     1. Go to `about:debugging#/runtime/this-firefox`
     2. Click "Load Temporary Add-on" and select `manifest.json`

---

## Usage

1. **Click the extension icon** to open the popup.
2. **Enter your xAI API key** (get one at [https://x.ai/api](https://x.ai/api)) and save it.
3. **Select a model** (grok-4, grok-3, or grok-3-mini).
4. **Highlight text** on any webpage and press **Ctrl+Shift+X** (Windows) or **⌘+Shift+X** (Mac) to send it to Grok and get a response automatically.
5. Or, use the popup to fetch selected text, enter a query, and click "Ask Grok".

---

## Privacy & Security
- Your API key is stored locally in browser storage and never shared.
- All queries are sent directly to the xAI API.

---

## Contributing
- Fork this repo and submit pull requests for new features, bug fixes, or UI improvements.
- Ideas: streaming responses, sidebar mode, more model options, improved content extraction.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 