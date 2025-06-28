
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

async function checkProxyConnection() {
    try {
        const response = await fetch('https://www.google.com/generate_204');
        if (response.ok) {
            chrome.action.setBadgeText({ text: 'ON' });
        } else {
            chrome.action.setBadgeText({ text: 'OFF' });
        }
    } catch (err) {
        chrome.action.setBadgeText({ text: 'OFF' });
    }
}

function setProxy(enable) {
    chrome.storage.sync.get({ proxyHost: '' }, (data) => {
        const host = data.proxyHost;
        if (!host) {
            // No host configured; fall back to direct connection
            chrome.proxy.settings.set(
                { value: directConfig, scope: "regular" },
                () => {
                    chrome.action.setBadgeText({ text: 'OFF' });
                }
            );
            return;
        }
        const proxyConfig = buildProxyConfig(host);
        chrome.proxy.settings.set(
            {
                value: enable ? proxyConfig : directConfig,
                scope: 'regular'
            },
            () => {
                if (enable) {
                    checkProxyConnection();
                } else {
                    chrome.action.setBadgeText({ text: 'OFF' });
                }
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
