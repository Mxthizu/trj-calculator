function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsedTime = 0;

    const checkElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (elapsedTime >= timeout) {
        reject(new Error("Element not found: " + selector));
      } else {
        elapsedTime += interval;
        setTimeout(checkElement, interval);
      }
    };

    checkElement();
  });
}

function findWinamaxElement(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsedTime = 0;

    const checkElement = () => {
      const resultatElement = Array.from(document.querySelectorAll("div")).find(
        (div) =>
          div.textContent.trim() === "Résultat" ||
          div.textContent.trim() === "Vainqueur"
      );

      if (resultatElement) {
        resolve(resultatElement);
      } else if (elapsedTime >= timeout) {
        reject(new Error("Élément 'Résultat' ou 'Vainqueur' non trouvé"));
      } else {
        elapsedTime += interval;
        setTimeout(checkElement, interval);
      }
    };

    checkElement();
  });
}

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
    return waitForElement(
      "sports-match-markets sports-markets-single-market .marketBox.is-table"
    ).then((marketBlock) => {
      const oddsElements = marketBlock.querySelectorAll(
        ".btn.is-odd .btn_label:not(.is-top)"
      );
      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
      return odds;
    });
  } else if (window.location.hostname.includes("unibet.fr")) {
    return waitForElement(
      "section#cps-marketcard.marketcard .marketcard-content"
    ).then((marketBlock) => {
      const oddsElements = marketBlock.querySelectorAll(".oddbox-value span");
      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
      return odds;
    });
  } else if (window.location.hostname.includes("enligne.parionssport.fdj.fr")) {
    return waitForElement(".psel-market-component").then((marketBlock) => {
      const oddsElements = marketBlock.querySelectorAll(".psel-outcome__data");
      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
      return odds;
    });
  } else if (window.location.hostname.includes("winamax.fr")) {
    return findWinamaxElement().then((resultatElement) => {
      const coteContainer =
        resultatElement.closest("div").parentElement.parentElement
          .parentElement;

      const oddsElements = coteContainer.querySelectorAll(".sc-eubriu.lbhvOG");

      oddsElements.forEach((element) => {
        odds.push(element.textContent.trim());
      });
      return odds;
    });
  }

  return Promise.resolve(odds);
}

function getTRJColor(trj) {
  const trjValue = parseFloat(trj.replace("%", ""));

  if (trjValue < 80) {
    return "#FF0000"; // Rouge pour TRJ défavorable
  } else if (trjValue >= 80 && trjValue < 90) {
    return "#FFA500"; // Orange pour TRJ correct
  } else if (trjValue >= 90 && trjValue <= 100) {
    return "#008000"; // Vert pour TRJ favorable
  } else if (trjValue > 100) {
    return "#0000FF"; // Bleu pour situation de surebet
  }
}

function createOrUpdateTRJWidget(trj) {
  let widget = document.getElementById("trj-widget");

  if (!widget) {
    widget = document.createElement("div");
    widget.id = "trj-widget";
    widget.style.position = "fixed";
    widget.style.bottom = "20px";
    widget.style.right = "20px";
    widget.style.padding = "10px";
    widget.style.color = "white";
    widget.style.borderRadius = "8px";
    widget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    widget.style.zIndex = "1000";
    document.body.appendChild(widget);
  }

  const backgroundColor = getTRJColor(trj);
  widget.style.backgroundColor = backgroundColor;
  widget.innerHTML = `<strong>TRJ Calculé :</strong> ${trj}`;
}

function calculateAndDisplayTRJ() {
  getOdds()
    .then((odds) => {
      if (odds.length === 2 || odds.length === 3) {
        const trj = calculateTRJ(odds);
        console.log("TRJ calculé : " + trj);
        createOrUpdateTRJWidget(trj);
      } else {
        console.log(
          "Nombre de cotes détectées : " +
            odds.length +
            ". Deux ou trois cotes sont nécessaires pour calculer un TRJ."
        );
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'obtention des cotes:", error);
    });
}

function monitorURLChange() {
  let lastUrl = window.location.href;

  const observer = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      calculateAndDisplayTRJ(); // Recalculer le TRJ à chaque changement d'URL
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener("load", function () {
  calculateAndDisplayTRJ(); // Calcul initial au chargement de la page
  monitorURLChange(); // Surveiller les changements d'URL
});
