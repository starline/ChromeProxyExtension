
let proxyEnabled = true;

const proxyConfig = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: "195.189.226.180",
      port: 3128
    },
    bypassList: ["<local>"]
  }
};

const directConfig = { mode: "direct" };

function setProxy(enable) {
  chrome.proxy.settings.set(
    {
      value: enable ? proxyConfig : directConfig,
      scope: "regular"
    },
    () => {
      chrome.action.setBadgeText({ text: enable ? "ON" : "OFF" });
    }
  );
}

chrome.runtime.onInstalled.addListener(() => {
  setProxy(true);
});

chrome.action.onClicked.addListener(() => {
  proxyEnabled = !proxyEnabled;
  setProxy(proxyEnabled);
});
