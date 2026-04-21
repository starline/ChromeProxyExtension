// Load the stored proxy host and populate the input field
function restoreOptions() {
  chrome.storage.sync.get({ proxyHost: '', autoStart: false }, (data) => {
    document.getElementById('host').value = data.proxyHost;
    document.getElementById('autostart').checked = data.autoStart;
  });
}

// Save the proxy host entered by the user
function saveOptions() {
  const host = document.getElementById('host').value;
  const autoStart = document.getElementById('autostart').checked;
  chrome.storage.sync.set({ proxyHost: host, autoStart: autoStart });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
