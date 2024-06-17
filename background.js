chrome.tabs.onCreated.addListener(function(tab) {
  if (!tab.url) {
    // If the URL is not available, wait for the tab to be updated
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
      // Ensure the event is for the same tab and the URL has changed
      if (tabId === tab.id && changeInfo.url) {
        console.log("Updated tab URL:", changeInfo.url);
        if (changeInfo.url.startsWith("chrome://startpageshared/")) {
          chrome.tabs.update(tab.id, { url: "tab_override.html" });
        }
      }
    });
  }
});