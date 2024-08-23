document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => {
          return calculateAndDisplayTRJ();
        },
      },
      function (results) {
        if (results && results[0] && results[0].result) {
          document.getElementById("trj-value").textContent = results[0].result;
        } else {
          document.getElementById("trj-value").textContent = "N/A";
        }
      }
    );
  });
});
