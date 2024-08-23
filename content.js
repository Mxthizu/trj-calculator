function calculateTRJ(odds) {
  let inverseSum = 0;
  odds.forEach((odd) => {
    inverseSum += 1 / parseFloat(odd.replace(",", ".")); // Remplacer la virgule par un point pour les nombres décimaux
  });
  let trj = (1 / inverseSum) * 100;
  return trj.toFixed(2) + "%";
}

function getOddsForBetclic() {
  const marketBlock = document.querySelector(
    "sports-match-markets sports-markets-single-market .marketBox.is-table"
  );

  if (!marketBlock) {
    console.log("MarketBlock non trouvé sur Betclic.");
    return [];
  }

  const oddsElements = marketBlock.querySelectorAll(
    ".btn.is-odd .btn_label:not(.is-top)"
  );
  let odds = [];
  oddsElements.forEach((element) => {
    const oddValue = element.textContent.trim();
    odds.push(oddValue);
  });

  console.log("Cotes trouvées sur Betclic :", odds);
  return odds;
}

function getOddsForUnibet() {
  const marketBlock = document.querySelector(
    "section#cps-marketcard.marketcard .marketcard-content"
  );

  if (!marketBlock) {
    console.log("MarketBlock non trouvé sur Unibet.");
    return [];
  }

  const oddsElements = marketBlock.querySelectorAll(".oddbox-value span");
  let odds = [];
  oddsElements.forEach((element) => {
    const oddValue = element.textContent.trim();
    odds.push(oddValue);
  });

  console.log("Cotes trouvées sur Unibet :", odds);
  return odds;
}

function getOddsForParionsSport() {
  const marketBlock = document.querySelector(".psel-market-component");

  if (!marketBlock) {
    console.log("MarketBlock non trouvé sur ParionsSport.");
    return [];
  }

  const oddsElements = marketBlock.querySelectorAll(".psel-outcome__data");
  let odds = [];
  oddsElements.forEach((element) => {
    const oddValue = element.textContent.trim();
    odds.push(oddValue);
  });

  console.log("Cotes trouvées sur ParionsSport :", odds);
  return odds;
}

function calculateAndDisplayTRJ() {
  let odds = [];

  if (window.location.hostname.includes("betclic.fr")) {
    odds = getOddsForBetclic();
  } else if (window.location.hostname.includes("unibet.fr")) {
    odds = getOddsForUnibet();
  } else if (window.location.hostname.includes("enligne.parionssport.fdj.fr")) {
    odds = getOddsForParionsSport();
  }

  if (odds.length === 3) {
    let trj = calculateTRJ(odds);
    console.log("TRJ calculé : " + trj);
    return trj;
  } else {
    console.log(
      "Nombre de cotes détectées : " +
        odds.length +
        ". Uniquement trois cotes sont nécessaires pour calculer un TRJ à 3 issues."
    );
    return "N/A";
  }
}

// Utilisation d'un MutationObserver pour les sites qui chargent dynamiquement le contenu
function observeDOMForDynamicSites() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        let marketBlock = null;

        if (window.location.hostname.includes("unibet.fr")) {
          marketBlock = document.querySelector(
            "section#cps-marketcard.marketcard .marketcard-content"
          );
        } else if (
          window.location.hostname.includes("enligne.parionssport.fdj.fr")
        ) {
          marketBlock = document.querySelector(".psel-market-component");
        }

        if (marketBlock) {
          console.log("MarketBlock trouvé, arrêt de l'observation.");
          observer.disconnect(); // Arrête d'observer après avoir trouvé le marketBlock
          const trj = calculateAndDisplayTRJ();
          return trj;
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

window.addEventListener("load", function () {
  if (
    window.location.hostname.includes("unibet.fr") ||
    window.location.hostname.includes("enligne.parionssport.fdj.fr")
  ) {
    observeDOMForDynamicSites();
  } else {
    calculateAndDisplayTRJ();
  }
});
