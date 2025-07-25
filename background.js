chrome.commands.onCommand.addListener(async (command) => {
  if (command === "move-selection-to-popup") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    }, (results) => {
      const selectedText = results && results[0] && results[0].result ? results[0].result.trim() : "";
      if (selectedText) {
        chrome.storage.sync.set({ grokHotkeySelection: selectedText });
        chrome.action.openPopup();
      }
    });
  }
}); 