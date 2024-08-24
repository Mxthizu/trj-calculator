import { calculateAndDisplayTRJ } from "./trjCalculator.js";
import { monitorURLChange } from "./urlMonitor.js";

window.addEventListener("load", function () {
  calculateAndDisplayTRJ(); // Calcul initial au chargement de la page
  monitorURLChange(); // Surveiller les changements d'URL
});
