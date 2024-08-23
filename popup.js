document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => {
          return calculateAndDisplayTRJ();
        },
      },
      function (results) {
        if (results && results[0] && results[0].result) {
          const trjValue = results[0].result;
          document.getElementById("trj-value").textContent = trjValue;

          // Convertir le TRJ en nombre pour l'analyse
          const trjPercentage = parseFloat(trjValue.replace("%", ""));

          // Analyse du TRJ et détermination de la couleur et du message
          let trjAnalysis = "";
          let analysisColor = "";

          if (trjPercentage < 80) {
            trjAnalysis = "TRJ défavorable";
            analysisColor = "text-red-600";
          } else if (trjPercentage >= 80 && trjPercentage < 90) {
            trjAnalysis = "TRJ correct";
            analysisColor = "text-yellow-600";
          } else if (trjPercentage >= 90 && trjPercentage <= 100) {
            trjAnalysis = "TRJ favorable";
            analysisColor = "text-green-600";
          } else if (trjPercentage > 100) {
            trjAnalysis = "Situation de surebet";
            analysisColor = "text-blue-600";
          }

          const analysisElement = document.getElementById("trj-analysis");
          analysisElement.textContent = trjAnalysis;
          analysisElement.classList.remove(
            "text-red-600",
            "text-orange-600",
            "text-green-600",
            "text-blue-600"
          ); // Supprime les anciennes couleurs
          analysisElement.classList.add(analysisColor); // Ajoute la nouvelle couleur
        } else {
          document.getElementById("trj-value").textContent = "N/A";
          document.getElementById("trj-analysis").textContent = "";
        }
      }
    );
  });
});
