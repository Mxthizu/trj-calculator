import { observeMarkets, observeMatchPage } from "./trjBetclic.js";
import { observeWinamaxMarkets } from "./trjWinamax.js";
import { monitorURLChange } from "./urlMonitor.js";
import { calculateAndDisplayTRJ } from "./trjCalculator.js";

window.addEventListener("load", function () {
  if (window.location.hostname.includes("betclic.fr")) {
    // Détection d'une page de match individuel sur Betclic par la structure de la page

    observeMarkets(); // Pour les pages listant plusieurs matchs
    monitorURLChange(observeMarkets); // Recommence l'observation à chaque changement d'URL
  } else if (window.location.hostname.includes("winamax.fr")) {
    observeWinamaxMarkets(); // Pour les pages listant plusieurs matchs sur Winamax
    monitorURLChange(observeWinamaxMarkets); // Recommence l'observation à chaque changement d'URL
  }

  calculateAndDisplayTRJ();
  monitorURLChange(); // Calcul du TRJ sur les pages correspondantes
});
