export function waitForElement(selector, timeout = 5000) {
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

export function findWinamaxElement(timeout = 5000) {
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

export function getOdds() {
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
