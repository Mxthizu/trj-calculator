export function monitorURLChange(callback) {
  let lastUrl = window.location.href;

  const observer = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      callback(); // Exécutez la logique passée en tant que callback lors du changement d'URL
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
