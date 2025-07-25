chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getPageContent") {
    let content = '';
    if (window.location.hostname.includes('google.com')) {
      // Try to get search results text
      const results = document.querySelectorAll('div#search div.g');
      content = Array.from(results).map(div => div.innerText).join('\n\n');
    }
    if (!content) {
      content = document.body.innerText;
    }
    sendResponse({ content });
  }
  // Required for async sendResponse in MV3
  return true;
}); 