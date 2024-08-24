import { calculateTRJ } from "./trjCalculator.js";

function logMatchInfoUnibet(marketElement) {
  const teamElements = marketElement.querySelectorAll(".oddbox-label span");
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

function addTRJToMarketUnibet(marketElement) {
  const oddsElements = marketElement.querySelectorAll(
    ".oddbox-content .oddbox-value span"
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
    trjElement.style.color = "#FF0000"; // Rouge pour signaler une erreur
    trjElement.style.marginTop = "10px";
    trjElement.style.zIndex = "10";
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
    trjElement.style.marginTop = "5px"; // Espace entre les cotes et le TRJ
    trjElement.style.zIndex = "10";
    trjElement.style.textAlign = "center";

    // Appliquer la couleur en fonction du TRJ
    const trjValue = parseFloat(trj.replace("%", ""));
    if (trjValue < 80) {
      trjElement.style.color = "#FF0000"; // Rouge pour TRJ défavorable
    } else if (trjValue >= 80 && trjValue < 90) {
      trjElement.style.color = "#FFA500"; // Orange pour TRJ correct
    } else if (trjValue >= 90 && trjValue <= 100) {
      trjElement.style.color = "#008000"; // Vert pour TRJ favorable
    } else if (trjValue > 100) {
      trjElement.style.color = "#0000FF"; // Bleu pour situation de surebet
    }

    // Insérer le TRJ à la fin de l'élément odds__container
    const oddsWrapper = marketElement.closest(".odds__container");
    if (oddsWrapper) {
      oddsWrapper.appendChild(trjElement);

      // Ajouter le style height: auto à l'élément parent contenant la classe odds__wrapper
      const wrapperElement = oddsWrapper.closest(".odds__wrapper");
      if (wrapperElement) {
        wrapperElement.style.height = "auto";
      }
    } else {
      console.log("odds__container introuvable, ajout du TRJ par défaut.");
      marketElement.appendChild(trjElement);
    }
  } else {
    console.log(
      `Nombre de cotes détectées: ${odds.length}. Nécessaire pour calculer un TRJ: 2 ou 3.`
    );
  }
}

function processUnibetMarkets() {
  const marketElements = document.querySelectorAll(".eventcard-footer");

  console.log(`Nombre total de marchés trouvés: ${marketElements.length}`);

  marketElements.forEach((marketElement, index) => {
    try {
      if (!marketElement.hasAttribute("data-trj-processed")) {
        console.log(`Traitement du marché ${index + 1}`);

        logMatchInfoUnibet(marketElement);
        addTRJToMarketUnibet(marketElement);

        // Marquer cet élément comme traité
        marketElement.setAttribute("data-trj-processed", "true");
      }
    } catch (error) {
      console.error(`Erreur lors du traitement du marché ${index + 1}:`, error);
    }
  });
}

export function observeUnibetMarkets() {
  processUnibetMarkets(); // Traiter les éléments déjà présents au chargement de la page

  const observer = new MutationObserver(() => {
    processUnibetMarkets(); // Traiter les nouveaux éléments ajoutés dynamiquement
  });

  observer.observe(document.body, { childList: true, subtree: true });

  console.log("Observation des changements dans le DOM activée pour Unibet.");
}
