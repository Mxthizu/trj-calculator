document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => {
          function calculateTRJ(odds) {
            let inverseSum = 0;
            odds.forEach((odd) => {
              inverseSum += 1 / parseFloat(odd.replace(",", "."));
            });
            let trj = (1 / inverseSum) * 100;
            return trj.toFixed(2) + "%";
          }

          function getOddsForBetclic() {
            const marketBlock = document.querySelector(
              "sports-match-markets sports-markets-single-market .marketBox.is-table"
            );
            if (!marketBlock) return [];

            const oddsElements = marketBlock.querySelectorAll(
              ".btn.is-odd .btn_label:not(.is-top)"
            );
            let odds = [];
            oddsElements.forEach((element) => {
              const oddValue = element.textContent.trim();
              odds.push(oddValue);
            });

            return odds;
          }

          function getOddsForUnibet() {
            const marketBlock = document.querySelector(
              "section#cps-marketcard.marketcard .marketcard-content"
            );
            if (!marketBlock) return [];

            const oddsElements =
              marketBlock.querySelectorAll(".oddbox-value span");
            let odds = [];
            oddsElements.forEach((element) => {
              const oddValue = element.textContent.trim();
              odds.push(oddValue);
            });

            return odds;
          }

          function getOddsForParionsSport() {
            const marketBlock = document.querySelector(
              ".psel-market-component"
            );
            if (!marketBlock) return [];

            const oddsElements = marketBlock.querySelectorAll(
              ".psel-outcome__data"
            );
            let odds = [];
            oddsElements.forEach((element) => {
              const oddValue = element.textContent.trim();
              odds.push(oddValue);
            });

            return odds;
          }

          let odds = [];
          if (window.location.hostname.includes("betclic.fr")) {
            odds = getOddsForBetclic();
          } else if (window.location.hostname.includes("unibet.fr")) {
            odds = getOddsForUnibet();
          } else if (
            window.location.hostname.includes("enligne.parionssport.fdj.fr")
          ) {
            odds = getOddsForParionsSport();
          }

          if (odds.length === 3) {
            return calculateTRJ(odds);
          } else {
            return "N/A";
          }
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
