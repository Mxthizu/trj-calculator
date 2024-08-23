function calculateTRJ(odds) {
  let inverseSum = 0;
  odds.forEach((odd) => {
    inverseSum += 1 / parseFloat(odd.replace(",", ".")); // Remplacer la virgule par un point pour les nombres décimaux
  });
  let trj = (1 / inverseSum) * 100;
  return trj.toFixed(2) + "%";
}

function getOdds() {
  // Sélectionner le bloc spécifique qui contient les cotes du résultat du match en temps réglementaire
  const marketBlock = document.querySelector(
    "sports-match-markets sports-markets-single-market .marketBox.is-table"
  );

  if (!marketBlock) {
    console.log(
      "Le bloc spécifique pour le marché du résultat du match n'a pas été trouvé."
    );
    return [];
  }

  // Sélectionner les éléments contenant les cotes à l'intérieur de ce bloc spécifique
  const oddsElements = marketBlock.querySelectorAll(
    ".btn.is-odd .btn_label:not(.is-top)"
  );

  let odds = [];
  oddsElements.forEach((element) => {
    const oddValue = element.textContent.trim();
    odds.push(oddValue);
  });

  return odds;
}

function calculateAndDisplayTRJ() {
  let odds = getOdds();
  if (odds.length === 3) {
    // Pour un TRJ à 3 issues
    let trj = calculateTRJ(odds);
    console.log("TRJ calculé : " + trj);
    alert("TRJ calculé : " + trj); // Vous pouvez changer cela pour afficher le TRJ dans l'interface de l'utilisateur si nécessaire
  } else {
    console.log(
      "Nombre de cotes détectées : " +
        odds.length +
        ". Uniquement trois cotes sont nécessaires pour calculer un TRJ à 3 issues."
    );
  }
}

// Exécuter le calcul automatiquement lorsque la page est entièrement chargée
window.addEventListener("load", calculateAndDisplayTRJ);
