/*
  hide-intercom.js
  Firefox content script to hide Intercom Messenger widgets on all sites.
*/

(function hideIntercom() {
  const hideCSS = document.createElement('style');
  hideCSS.innerHTML = `
    .intercom-lightweight-app,
    .intercom-launcher-frame,
    iframe[src*="intercom.io"],
    iframe[src*="intercom.com"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }
  `;
  document.head.appendChild(hideCSS);

  const observer = new MutationObserver(() => {
    const intercomEls = document.querySelectorAll('[class*="intercom"], iframe[src*="intercom"]');
    intercomEls.forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      el.style.opacity = '0';
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
