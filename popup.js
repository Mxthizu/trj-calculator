document.getElementById("calculate-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: calculateTRJ,
      },
      (results) => {
        document.getElementById("result").textContent =
          "TRJ: " + results[0].result;
      }
    );
  });
});
