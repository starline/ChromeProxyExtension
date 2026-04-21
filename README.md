# Proxy Injector V3

A **Google Chrome** extension (Manifest V3) that routes browser traffic through an **HTTP proxy** on a fixed port **3128**. The proxy server address is configured in the options page.

## Features

- **Toggle proxy on/off** with one click on the extension icon in the toolbar.
- **Configurable proxy host** (port is hardcoded: `3128`).
- **Auto-start**: optional “enable proxy when the browser starts”.
- **Badge on the icon**: when proxy is on, the badge shows `ON` after a successful connectivity check via `https://www.google.com/generate_204`; otherwise `OFF`.
- **Local bypass**: `<local>` is listed in the bypass list.

## Installation (developer mode)

1. Open `chrome://extensions/`.
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select this project folder.

## Configuration

1. Open the extension options (right-click the icon → **Options**, or from the extensions list).
2. Set **Proxy Host** (hostname or IP without port).
3. Optionally enable **Enable proxy on browser startup**.
4. Click **Save**.

If no host is set, the extension keeps a direct connection and does not enable the proxy.

## Project layout

| Path | Purpose |
|------|---------|
| `manifest.json` | MV3 manifest, `proxy` and `storage` permissions, service worker |
| `src/background/service-worker.js` | Proxy logic, click-to-toggle, connection check |
| `src/options/options.html` / `options.js` | Options page for host and auto-start |
| `assets/icons/` | Placeholder for extension icons (optional) |

## Requirements

- A Chromium-based browser with Manifest V3 and the `chrome.proxy` API.

## Note

Proxy port **3128** and scheme **http** are defined in `src/background/service-worker.js` in `buildProxyConfig`. To use a different port or proxy type, edit the code accordingly.
