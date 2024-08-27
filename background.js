chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["dist/main.js"], // Chemin mis à jour pour pointer vers le fichier minifié
  });
});
