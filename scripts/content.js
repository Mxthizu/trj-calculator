import { observeMarkets, observeMatchPage } from "./trjBetclic.js";
import { monitorURLChange } from "./urlMonitor.js";
import { calculateAndDisplayTRJ } from "./trjCalculator.js";

window.addEventListener("load", function () {
  if (window.location.hostname.includes("betclic.fr")) {
    if (window.location.pathname.includes("match")) {
      observeMatchPage(); // Pour les pages de matchs individuels
    } else {
      observeMarkets(); // Pour les pages listant plusieurs matchs
      monitorURLChange(observeMarkets); // Recommence l'observation à chaque changement d'URL
    }
  }
  calculateAndDisplayTRJ();
  monitorURLChange();
});
