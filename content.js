function calculateTRJ(odds) {
  let inverseSum = 0;
  odds.forEach((odd) => {
    inverseSum += 1 / parseFloat(odd.replace(",", ".")); // Remplacer la virgule par un point pour les nombres décimaux
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
  } else if (window.location.hostname.includes("winamax.fr")) {
    // Trouver l'élément contenant le texte "Résultat"
    const resultatElement = Array.from(document.querySelectorAll("div")).find(
      (div) =>
        div.textContent.trim() === "Résultat" ||
        div.textContent.trim() === "Vainqueur"
    );

    if (resultatElement) {
      // Remonter aux parents pertinents jusqu'à la div qui englobe toutes les cotes
      const coteContainer =
        resultatElement.closest("div").parentElement.parentElement
          .parentElement;

      // Extraire les cotes dans cet ensemble
      const oddsElements = coteContainer.querySelectorAll(".sc-eubriu.lbhvOG");

      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
    }
  }

  return odds;
}

function calculateAndDisplayTRJ() {
  const odds = getOdds();
  if (odds.length === 2 || odds.length === 3) {
    // Gérer 2 ou 3 cotes
    const trj = calculateTRJ(odds);
    console.log("TRJ calculé : " + trj);
    return trj;
  } else {
    console.log(
      "Nombre de cotes détectées : " +
        odds.length +
        ". Deux ou trois cotes sont nécessaires pour calculer un TRJ."
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
    } else if (window.location.hostname.includes("winamax.fr")) {
      marketBlock = Array.from(document.querySelectorAll("div")).find(
        (div) => div.textContent.trim() === "Résultat"
      );
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
    window.location.hostname.includes("enligne.parionssport.fdj.fr") ||
    window.location.hostname.includes("winamax.fr")
  ) {
    observeDOMForDynamicSites();
  } else {
    calculateAndDisplayTRJ();
  }
});
