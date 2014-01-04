function onHeadersReceived(details) {
  var updateResponseHeaders = false;
  var i = 0;

  while (i < details.responseHeaders.length) {
    // Switch Content-Disposition to 'inline'.
    if (details.responseHeaders[i].name === 'Content-Disposition') {
      if (details.responseHeaders[i].value === 'attachment;') {
        updateResponseHeaders = true;
        details.responseHeaders[i].value = 'inline;';
      } else {
        break;
      }
    }
    // Remove Content-Type Header.
    if (details.responseHeaders[i].name === 'Content-Type') {
      details.responseHeaders.splice(i, 1);
      continue;
    }
    i++;
  }
  if (updateResponseHeaders) {
    chrome.pageAction.show(details.tabId);
    return { responseHeaders: details.responseHeaders };
  }
}

chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceived,
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"]);
