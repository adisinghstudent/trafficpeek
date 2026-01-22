// TrafficPeek Background Service Worker

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('TrafficPeek installed');
  }
});

// Handle messages from popup if needed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_TRAFFIC') {
    // Could be used for background data fetching
    sendResponse({ success: true });
  }
  return true;
});
