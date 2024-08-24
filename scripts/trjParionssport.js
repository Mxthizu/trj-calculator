import { calculateTRJ } from "./trjCalculator.js";
import { getTRJColor } from "./widget.js";

function logMatchInfoParionssport(marketElement) {
  const teamElements = marketElement.querySelectorAll(".psel-opponent__name");
  const teams = [];

  teamElements.forEach((element) => {
    const teamName = element.textContent.trim();
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

function addTRJToMarketParionssport(marketElement) {
  const oddsElements = marketElement.querySelectorAll(".psel-outcome__data");
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

    // Trouver la div <psel-row-col> et insérer le TRJ à l'intérieur à la fin
    const pselRowColElement = marketElement.querySelector("psel-row-col");
    if (pselRowColElement) {
      pselRowColElement.appendChild(trjElement); // Insérer le TRJ à la fin
    } else {
      console.log("<psel-row-col> introuvable, ajout du TRJ par défaut.");
      marketElement.appendChild(trjElement);
    }
  } else {
    console.log(
      `Nombre de cotes détectées: ${odds.length}. Nécessaire pour calculer un TRJ: 2 ou 3.`
    );
  }
}

function processParionssportMarketElements() {
  const marketElements = document.querySelectorAll("psel-event-main");

  console.log(`Nombre total de marchés trouvés: ${marketElements.length}`);

  marketElements.forEach((marketElement, index) => {
    try {
      if (!marketElement.hasAttribute("data-trj-processed")) {
        console.log(`Traitement du marché ${index + 1}`);

        logMatchInfoParionssport(marketElement);
        addTRJToMarketParionssport(marketElement);

        marketElement.setAttribute("data-trj-processed", "true");
      }
    } catch (error) {
      console.error(`Erreur lors du traitement du marché ${index + 1}:`, error);
    }
  });
}

export function observeParionsSportMarkets() {
  processParionssportMarketElements();

  const observer = new MutationObserver(() => {
    processParionssportMarketElements();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log(
    "Observation des changements dans le DOM pour ParionsSport activée."
  );
}
