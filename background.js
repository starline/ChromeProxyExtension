
let proxyEnabled = true;

const directConfig = { mode: "direct" };

function buildProxyConfig(host) {
    return {
        mode: "fixed_servers",
        rules: {
            singleProxy: {
                scheme: "http",
                host: host,
                port: 3128
            },
            bypassList: ["<local>"]
        }
    };
}

function setProxy(enable) {
    chrome.storage.sync.get({ proxyHost: '' }, (data) => {
        const host = data.proxyHost;
        if (!host) {
            // No host configured; fall back to direct connection
            chrome.proxy.settings.set(
                { value: directConfig, scope: "regular" },
                () => {
                    chrome.action.setBadgeText({ text: "OFF" });
                }
            );
            return;
        }
        const proxyConfig = buildProxyConfig(host);
        chrome.proxy.settings.set(
            {
                value: enable ? proxyConfig : directConfig,
                scope: "regular"
            },
            () => {
                chrome.action.setBadgeText({ text: enable ? "ON" : "OFF" });
            }
        );
    });
}

// Ensure the badge reflects the default state when the script loads
setProxy(proxyEnabled);

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ proxyHost: '' }, (data) => {
        chrome.storage.sync.set({ proxyHost: data.proxyHost }, () => {
            setProxy(true);
        });
    });
});

chrome.action.onClicked.addListener(() => {
    proxyEnabled = !proxyEnabled;
    setProxy(proxyEnabled);
});
