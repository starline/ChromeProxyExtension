// Load the stored proxy host and populate the input field
function restoreOptions() {
  chrome.storage.sync.get({ proxyHost: '195.189.226.180' }, (data) => {
    document.getElementById('host').value = data.proxyHost;
  });
}

// Save the proxy host entered by the user
function saveOptions() {
  const host = document.getElementById('host').value;
  chrome.storage.sync.set({ proxyHost: host });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
