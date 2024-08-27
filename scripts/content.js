import { calculateAndDisplayTRJ } from "./trjCalculator.js";
import { observeBetclicMarkets } from "./trjBetclic.js";
import { observeWinamaxMarkets } from "./trjWinamax.js";
import { observeUnibetMarkets } from "./trjUnibet.js";
import { observeParionsSportMarkets } from "./trjParionssport.js";
import { monitorURLChange } from "./urlMonitor.js";

function isParionsSportMatchPage(url) {
  const match = url.match(/\/(\d+)\//);
  return match ? match[1] : null;
}

function isBetclicMatchPage(url) {
  const match = url.match(/-m(\d{4,})/);
  return match ? match[1] : null;
}

function handlePageLogic() {
  const hostname = window.location.hostname;
  const currentUrl = window.location.href;

  console.log(`Host: ${hostname}, URL: ${currentUrl}`);

  if (hostname.includes("betclic.fr")) {
    const isMatchPage = isBetclicMatchPage(currentUrl);

    if (isMatchPage) {
      calculateAndDisplayTRJ(true);
    } else {
      observeBetclicMarkets(); // Utilisation de la nouvelle fonction
      calculateAndDisplayTRJ(false); // Page listant plusieurs matchs
    }
  } else if (hostname.includes("winamax.fr")) {
    const isMatchPage = currentUrl.includes("match");

    if (isMatchPage) {
      calculateAndDisplayTRJ(true); // Page de match unique
    } else {
      observeWinamaxMarkets();
      calculateAndDisplayTRJ(false); // Page listant plusieurs matchs
    }
  } else if (hostname.includes("unibet.fr")) {
    const isMatchPage = currentUrl.includes("event");

    if (isMatchPage) {
      calculateAndDisplayTRJ(true); // Page de match unique
    } else {
      console.log("Observation des marchés Unibet démarrée");
      observeUnibetMarkets();
      calculateAndDisplayTRJ(false); // Page listant plusieurs matchs
    }
  } else if (hostname.includes("enligne.parionssport.fdj.fr")) {
    const isMatchPage = isParionsSportMatchPage(currentUrl);

    if (isMatchPage) {
      calculateAndDisplayTRJ(true); // Page de match unique
    } else {
      observeParionsSportMarkets();
      calculateAndDisplayTRJ(false); // Page listant plusieurs matchs
    }
  }
}

window.addEventListener("load", function () {
  console.log("Page complètement chargée");
  handlePageLogic();

  // Surveiller les changements d'URL pour appliquer la logique TRJ
  monitorURLChange(handlePageLogic);
});
