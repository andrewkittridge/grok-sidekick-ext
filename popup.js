document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveKeyBtn = document.getElementById('saveKey');
  const modelSelect = document.getElementById('model');
  const queryTextarea = document.getElementById('query');
  const fetchBtn = document.getElementById('fetchSelection');
  const submitBtn = document.getElementById('submit');
  const responseDiv = document.getElementById('response');
  const fetchPageBtn = document.getElementById('fetchPage');

  // Load saved API key and model
  chrome.storage.sync.get(['apiKey', 'model'], (data) => {
    if (data.apiKey) apiKeyInput.value = data.apiKey;
    if (data.model) modelSelect.value = data.model;
  });

  // Save API key and model
  saveKeyBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.sync.set({ apiKey }, () => {
        alert('API key saved!');
      });
    } else {
      alert('Please enter a valid API key.');
    }
  });

  modelSelect.addEventListener('change', () => {
    chrome.storage.sync.set({ model: modelSelect.value });
  });

  // Fetch selected text from active tab
  fetchBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString(),
      });
      const selectedText = results[0].result.trim();
      if (selectedText) {
        queryTextarea.value = selectedText;
      } else {
        alert('No text selected on the page.');
      }
    } catch (error) {
      console.error('Error fetching selection:', error);
      alert('Failed to fetch selected text. Ensure permissions are granted.');
    }
  });

  // Fetch full page content from active tab
  fetchPageBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.tabs.sendMessage(tab.id, { action: 'getPageContent' }, (response) => {
        if (response && response.content) {
          // Limit to 4000 chars for API safety
          queryTextarea.value = response.content.slice(0, 4000);
        } else {
          alert('Could not read page content.');
        }
      });
    } catch (error) {
      console.error('Error fetching page content:', error);
      alert('Failed to fetch page content.');
    }
  });

  // Submit query to Grok API
  submitBtn.addEventListener('click', async () => {
    const query = queryTextarea.value.trim();
    if (!query) {
      alert('Please enter a query.');
      return;
    }

    const data = await chrome.storage.sync.get(['apiKey', 'model']);
    const apiKey = data.apiKey;
    const model = data.model || 'grok-3'; // Default model

    if (!apiKey) {
      alert('Please save your API key first.');
      return;
    }

    responseDiv.textContent = 'Loading...';

    try {
      const res = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' }, // Optional system prompt
            { role: 'user', content: query },
          ],
          temperature: 0.7, // Adjustable
          max_tokens: 500, // Adjustable
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const json = await res.json();
      const content = json.choices[0].message.content.trim();
      responseDiv.textContent = content;
    } catch (error) {
      console.error('API call failed:', error);
      responseDiv.textContent = `Error: ${error.message}`;
    }
  });
}); 