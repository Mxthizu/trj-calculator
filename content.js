function calculateTRJ(odds) {
  let inverseSum = 0;
  odds.forEach((odd) => {
    inverseSum += 1 / parseFloat(odd.replace(",", "."));
  });
  let trj = (1 / inverseSum) * 100;
  return trj.toFixed(2) + "%";
}

function getOdds() {
  let odds = [];

  if (window.location.hostname.includes("betclic.fr")) {
    const marketBlock = document.querySelector(
      "sports-match-markets sports-markets-single-market .marketBox.is-table"
    );
    if (marketBlock) {
      const oddsElements = marketBlock.querySelectorAll(
        ".btn.is-odd .btn_label:not(.is-top)"
      );
      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
    }
  } else if (window.location.hostname.includes("unibet.fr")) {
    const marketBlock = document.querySelector(
      "section#cps-marketcard.marketcard .marketcard-content"
    );
    if (marketBlock) {
      const oddsElements = marketBlock.querySelectorAll(".oddbox-value span");
      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
    }
  } else if (window.location.hostname.includes("enligne.parionssport.fdj.fr")) {
    const marketBlock = document.querySelector(".psel-market-component");
    if (marketBlock) {
      const oddsElements = marketBlock.querySelectorAll(".psel-outcome__data");
      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
    }
  }

  return odds;
}

function calculateAndDisplayTRJ() {
  const odds = getOdds();
  if (odds.length === 3) {
    const trj = calculateTRJ(odds);
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

function observeDOMForDynamicSites() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
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
      observer.disconnect();
      const trj = calculateAndDisplayTRJ();
      return trj;
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
