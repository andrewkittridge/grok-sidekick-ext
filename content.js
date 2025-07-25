chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getPageContent") {
    sendResponse({ content: document.body.innerText });
  }
  // Required for async sendResponse in MV3
  return true;
}); 