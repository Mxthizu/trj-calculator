import { getOdds } from "./domUtils.js";
import { createOrUpdateTRJWidget } from "./widget.js";

export function calculateTRJ(odds) {
  let inverseSum = 0;
  odds.forEach((odd) => {
    inverseSum += 1 / parseFloat(odd.replace(",", ".")); // Remplacer la virgule par un point pour les nombres décimaux
  });
  let trj = (1 / inverseSum) * 100;
  return trj.toFixed(2) + "%";
}

export function calculateAndDisplayTRJ(singleMatch = false) {
  getOdds()
    .then((odds) => {
      if (odds.length === 2 || odds.length === 3) {
        const trj = calculateTRJ(odds);
        console.log("TRJ calculé : " + trj);

        // Si c'est une page de match unique, on affiche l'encart
        if (singleMatch) {
          createOrUpdateTRJWidget(trj);
        }
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
