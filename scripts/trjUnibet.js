// Importation de la fonction pour calculer le TRJ
import { calculateTRJ } from "./trjCalculator.js";

// Fonction pour extraire et afficher les noms des équipes d'un élément de marché
function logMatchInfoUnibet(marketElement) {
  const teamElements = marketElement.querySelectorAll(".oddbox-label span");
  const teams = Array.from(teamElements, (el) => el.textContent.trim()).filter(
    Boolean
  );

  if (teams.length > 0) {
    console.log(`Match trouvé: ${teams.join(" vs ")}`);
  } else {
    console.log("Match sans équipe identifiable trouvé.");
  }
}

// Fonction pour ajouter le TRJ à un élément de marché
function addTRJToMarketUnibet(marketElement) {
  if (marketElement.querySelector(".trj-element")) {
    console.log("TRJ déjà présent, ajout évité.");
    return;
  }

  const oddsElements = marketElement.querySelectorAll(
    ".oddbox-content .oddbox-value span"
  );
  const odds = Array.from(oddsElements, (el) =>
    el.textContent.trim().replace(/\s+/g, "")
  ).filter((odd) => odd !== "-" && !isNaN(parseFloat(odd)));

  if (odds.length === 0) {
    console.log(
      "Aucune cote trouvée ou cote invalide détectée. TRJ non calculable."
    );
    appendTRJElement(marketElement, "Non calculable", "#FF0000");
    return;
  }

  console.log(`Cotes trouvées: ${odds.join(", ")}`);
  if (odds.length === 2 || odds.length === 3) {
    const trj = calculateTRJ(odds);
    appendTRJElement(marketElement, trj, determineTRJColor(parseFloat(trj)));
    adjustHeight(".odds__wrapper", "auto");
    adjustHeight(".headline-footer", "30vh");
  } else {
    console.log(
      `Nombre de cotes détectées: ${odds.length}. TRJ non calculable.`
    );
  }
}

// Fonction pour ajouter un élément de TRJ au DOM
function appendTRJElement(marketElement, trj, color) {
  const trjElement = document.createElement("div");
  trjElement.className = "trj-element";
  trjElement.textContent = `TRJ: ${trj}`;
  trjElement.style = `
    font-weight: bold;
    margin-top: 10px;
    color: ${color};
    text-align: center;
    z-index: 10;
  `;
  marketElement.appendChild(trjElement);
}

// Fonction pour déterminer la couleur du TRJ en fonction de sa valeur
function determineTRJColor(trjValue) {
  if (trjValue < 80) return "#FF0000";
  if (trjValue < 90) return "#FFA500";
  if (trjValue <= 100) return "#008000";
  return "#0000FF";
}

// Fonction pour ajuster la hauteur des éléments
function adjustHeight(selector, height) {
  document
    .querySelectorAll(selector)
    .forEach((el) => (el.style.height = height));
}

// Fonction principale pour traiter tous les marchés Unibet sur la page
function processUnibetMarkets() {
  const marketElements = document.querySelectorAll(
    ".eventcard-odds, .odds__container"
  );
  console.log(`Nombre total de marchés trouvés: ${marketElements.length}`);

  marketElements.forEach((marketElement, index) => {
    if (!marketElement.hasAttribute("data-trj-processed")) {
      console.log(`Traitement du marché ${index + 1}`);
      logMatchInfoUnibet(marketElement);
      addTRJToMarketUnibet(marketElement);
      marketElement.setAttribute("data-trj-processed", "true");
    }
  });
}

// Fonction pour observer les changements dans le DOM et traiter les nouveaux marchés
export function observeUnibetMarkets() {
  processUnibetMarkets(); // Traiter les éléments présents au chargement de la page

  const observer = new MutationObserver(() => processUnibetMarkets());
  observer.observe(document.body, { childList: true, subtree: true });

  console.log("Observation des changements dans le DOM activée pour Unibet.");
}
