import { calculateTRJ } from "./trjCalculator.js";
import { getTRJColor } from "./widget.js";

function logMatchInfoBetclic(marketElement) {
  const teamElements = marketElement.querySelectorAll(
    ".btn.is-odd .btn_label.is-top"
  );
  const teams = [];

  teamElements.forEach((element) => {
    const teamName = element.textContent.trim().replace(/\s+/g, " ");
    if (teamName) {
      teams.push(teamName);
    }
  });

  if (teams.length > 0) {
    console.log(`Match trouvé: ${teams.join(" vs ")}`);
  } else {
    console.log("Match sans équipe identifiable trouvé.");
  }
}

function addTRJToMarketBetclic(marketElement) {
  const oddsElements = marketElement.querySelectorAll(
    ".btn.is-odd .btn_label:not(.is-top)"
  );
  const odds = [];
  let invalidOddFound = false;

  oddsElements.forEach((element) => {
    const oddValue = element.textContent.trim().replace(/\s+/g, "");
    if (oddValue === "-" || isNaN(parseFloat(oddValue))) {
      invalidOddFound = true;
    } else {
      odds.push(oddValue);
    }
  });

  if (invalidOddFound) {
    console.log("Cote invalide détectée. TRJ non calculable pour ce match.");
    const trjElement = document.createElement("div");
    trjElement.textContent = "TRJ: Non calculable";
    trjElement.style.fontWeight = "bold";
    trjElement.style.color = "#FF0000";
    trjElement.style.marginTop = "10px";
    trjElement.style.fontSize = "16px";
    trjElement.style.textAlign = "center";
    marketElement.appendChild(trjElement);
    return;
  }

  if (odds.length > 0) {
    console.log(`Cotes trouvées: ${odds.join(", ")}`);
  } else {
    console.log("Aucune cote trouvée dans cet élément de marché.");
  }

  if (odds.length === 2 || odds.length === 3) {
    const trj = calculateTRJ(odds);
    const trjElement = document.createElement("div");
    trjElement.textContent = `TRJ: ${trj}`;
    trjElement.style.fontWeight = "bold";
    trjElement.style.marginTop = "10px";
    trjElement.style.zIndex = "10";
    trjElement.style.fontSize = "16px";
    trjElement.style.textAlign = "center";

    // Appliquer la couleur en fonction du TRJ
    const trjColor = getTRJColor(trj);
    trjElement.style.color = trjColor;

    // Trouver la div <sports-row-col> et insérer le TRJ à l'intérieur à la fin
    const sportsRowColElement = marketElement.querySelector("sports-row-col");
    if (sportsRowColElement) {
      sportsRowColElement.appendChild(trjElement); // Insérer le TRJ à la fin
    } else {
      console.log("<sports-row-col> introuvable, ajout du TRJ par défaut.");
      marketElement.appendChild(trjElement);
    }
  } else {
    console.log(
      `Nombre de cotes détectées: ${odds.length}. Nécessaire pour calculer un TRJ: 2 ou 3.`
    );
  }
}

function processBetclicMarketElements() {
  const marketElements = document.querySelectorAll("sports-markets-default-v2");

  console.log(`Nombre total de marchés trouvés: ${marketElements.length}`);

  marketElements.forEach((marketElement, index) => {
    try {
      if (!marketElement.hasAttribute("data-trj-processed")) {
        console.log(`Traitement du marché ${index + 1}`);

        logMatchInfoBetclic(marketElement);
        addTRJToMarketBetclic(marketElement);

        marketElement.setAttribute("data-trj-processed", "true");
      }
    } catch (error) {
      console.error(`Erreur lors du traitement du marché ${index + 1}:`, error);
    }
  });
}

export function observeBetclicMarkets() {
  processBetclicMarketElements(); // Traiter les éléments déjà présents au chargement de la page

  const observer = new MutationObserver(() => {
    processBetclicMarketElements(); // Traiter les nouveaux éléments ajoutés dynamiquement
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log("Observation des changements dans le DOM pour Betclic activée.");
}
