function calculateTRJ(odds) {
  let inverseSum = 0;
  odds.forEach((odd) => {
    inverseSum += 1 / parseFloat(odd.replace(",", ".")); // Remplacer la virgule par un point pour les nombres décimaux
  });
  let trj = (1 / inverseSum) * 100;
  return trj.toFixed(2) + "%";
}

function getOdds() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
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
          },
        },
        (results) => {
          resolve(results[0].result || []);
        }
      );
    });
  });
}

function updateTRJ() {
  getOdds().then((odds) => {
    if (odds.length === 3) {
      // Pour un TRJ à 3 issues
      const trj = calculateTRJ(odds);
      document.getElementById("trj-value").textContent = trj;
    } else {
      document.getElementById("trj-value").textContent = "N/A";
    }
  });
}

// Mise à jour du TRJ à chaque fois que le popup est ouvert
document.addEventListener("DOMContentLoaded", updateTRJ);

// Mettre à jour le TRJ à chaque changement d'URL
chrome.tabs.onUpdated.addListener(updateTRJ);
