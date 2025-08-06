/*
  popup.js
  Script for the browser action popup
*/

document.addEventListener('DOMContentLoaded', function() {
  const statusDiv = document.getElementById('status');
  const toggleBtn = document.getElementById('toggleBtn');
  const intercomStatusDiv = document.getElementById('intercomStatus');
  
  // Get current state and update UI
  browser.storage.local.get(['extensionEnabled']).then((result) => {
    const enabled = result.extensionEnabled !== undefined ? result.extensionEnabled : true;
    updateUI(enabled);
  });
  
  // Check if current tab has Intercom
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    if (tabs[0]) {
      browser.tabs.sendMessage(tabs[0].id, { action: 'checkIntercom' }).then((response) => {
        if (response && response.detected) {
          updateIntercomStatus(true);
        } else {
          updateIntercomStatus(false);
        }
      }).catch(() => {
        updateIntercomStatus(false);
      });
    }
  });
  
  function updateUI(enabled) {
    if (enabled) {
      statusDiv.textContent = 'Extension is enabled';
      statusDiv.className = 'status enabled';
      toggleBtn.textContent = 'Disable Extension';
      toggleBtn.className = 'toggle-btn disable';
    } else {
      statusDiv.textContent = 'Extension is disabled';
      statusDiv.className = 'status disabled';
      toggleBtn.textContent = 'Enable Extension';
      toggleBtn.className = 'toggle-btn enable';
    }
  }
  
  function updateIntercomStatus(detected) {
    if (detected) {
      intercomStatusDiv.textContent = '⚠️ Intercom detected on this page';
      intercomStatusDiv.className = 'intercom-status intercom-detected';
    } else {
      intercomStatusDiv.textContent = 'No Intercom detected';
      intercomStatusDiv.className = 'intercom-status intercom-not-detected';
    }
  }
  
  // Handle toggle button click
  toggleBtn.addEventListener('click', function() {
    browser.storage.local.get(['extensionEnabled']).then((result) => {
      const currentEnabled = result.extensionEnabled !== undefined ? result.extensionEnabled : true;
      const newEnabled = !currentEnabled;
      
      // Save new state
      browser.storage.local.set({ extensionEnabled: newEnabled }).then(() => {
        updateUI(newEnabled);
        
        // Get current tab and simulate browser action click
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
          if (tabs[0]) {
            // Send message to background script to update all tabs
            browser.runtime.sendMessage({
              action: 'toggleExtension',
              enabled: newEnabled,
              tabId: tabs[0].id
            });
          }
        });
        
        // Close popup after a short delay
        setTimeout(() => {
          window.close();
        }, 300);
      });
    });
  });
});
