import { calculateAndDisplayTRJ } from "./trjCalculator.js";

export function monitorURLChange() {
  let lastUrl = window.location.href;

  const observer = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      calculateAndDisplayTRJ(); // Recalculer le TRJ à chaque changement d'URL
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
