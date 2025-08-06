/*
  hide-intercom.js
  Firefox content script to hide Intercom Messenger widgets on all sites.
*/

(function hideIntercomExtension() {
  let extensionEnabled = true;
  let intercomDetected = false;
  let hideCSS = null;
  let observer = null;
  
  // Get initial state from background script
  browser.runtime.sendMessage({ action: 'getState' }).then((response) => {
    if (response) {
      extensionEnabled = response.enabled;
      initializeExtension();
    }
  }).catch(() => {
    // Fallback if background script isn't ready
    initializeExtension();
  });

  function initializeExtension() {
    createHideCSS();
    startObserver();
    checkForIntercom();
  }

  function createHideCSS() {
    if (hideCSS) {
      hideCSS.remove();
    }
    
    if (extensionEnabled) {
      hideCSS = document.createElement('style');
      hideCSS.id = 'hide-intercom-css';
      hideCSS.innerHTML = `
        .intercom-lightweight-app,
        .intercom-launcher-frame,
        .intercom-messenger-frame,
        .intercom-namespace,
        iframe[src*="widget.intercom.io"],
        iframe[src*="intercom.io"],
        iframe[src*="intercom.com"],
        [id*="intercom"],
        [class*="intercom"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(hideCSS);
    }
  }

  function startObserver() {
    if (observer) {
      observer.disconnect();
    }

    observer = new MutationObserver(() => {
      if (extensionEnabled) {
        hideIntercomElements();
      }
      checkForIntercom();
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'src']
    });
  }

  function hideIntercomElements() {
    if (!extensionEnabled) return;
    
    const intercomSelectors = [
      '[class*="intercom"]',
      '[id*="intercom"]',
      'iframe[src*="intercom"]',
      'iframe[src*="widget.intercom.io"]'
    ];
    
    intercomSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
      });
    });
  }

  function checkForIntercom() {
    const hasIntercom = document.querySelector('[class*="intercom"], [id*="intercom"], iframe[src*="intercom"], script[src*="intercom"]') !== null;
    
    if (hasIntercom && !intercomDetected) {
      intercomDetected = true;
      // Notify background script that Intercom was detected
      browser.runtime.sendMessage({ 
        action: 'intercomDetected',
        detected: true 
      }).catch(() => {
        // Background script might not be ready, ignore
      });
    }
  }

  function enableIntercom() {
    // Remove hiding CSS
    if (hideCSS) {
      hideCSS.remove();
      hideCSS = null;
    }
    
    // Show any hidden Intercom elements
    const intercomSelectors = [
      '[class*="intercom"]',
      '[id*="intercom"]',
      'iframe[src*="intercom"]',
      'iframe[src*="widget.intercom.io"]'
    ];
    
    intercomSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = '';
        el.style.visibility = '';
        el.style.opacity = '';
        el.style.pointerEvents = '';
      });
    });
  }

  function disableIntercom() {
    createHideCSS();
    hideIntercomElements();
  }

  // Listen for messages from background script and popup
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateState') {
      const wasEnabled = extensionEnabled;
      extensionEnabled = message.enabled;
      if (extensionEnabled) {
        // reset detection so badge can reappear
        intercomDetected = false;
        disableIntercom();
        // re-check for Intercom
        checkForIntercom();
      } else {
        enableIntercom();
      }
    } else if (message.action === 'checkIntercom') {
      return Promise.resolve({ detected: intercomDetected });
    }
  });

  // Initial check and hide if enabled
  if (extensionEnabled) {
    hideIntercomElements();
  }
})();
