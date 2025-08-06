/*
  background.js
  Background script for Hide Intercom extension
*/

// Default state: extension enabled
let extensionEnabled = true;

// Initialize extension state on startup
browser.runtime.onStartup.addListener(() => {
  initializeExtension();
});

browser.runtime.onInstalled.addListener(() => {
  initializeExtension();
});

function initializeExtension() {
  // Load saved state or use default
  browser.storage.local.get(['extensionEnabled']).then((result) => {
    extensionEnabled = result.extensionEnabled !== undefined ? result.extensionEnabled : true;
    updateAllTabs();
  });
}

// Handle browser action click (toggle functionality)
browser.browserAction.onClicked.addListener((tab) => {
  toggleExtension(tab);
});

function toggleExtension(tab) {
  extensionEnabled = !extensionEnabled;
  
  // Save state
  browser.storage.local.set({ extensionEnabled: extensionEnabled });
  
  // Update current tab
  updateTab(tab);
  
  // Update all other tabs
  updateAllTabs();
}

function updateAllTabs() {
  browser.tabs.query({}).then((tabs) => {
    tabs.forEach(tab => {
      if (tab.url && !tab.url.startsWith('about:') && !tab.url.startsWith('moz-extension:')) {
        updateTab(tab);
      }
    });
  });
}

function updateTab(tab) {
  // Send message to content script
  browser.tabs.sendMessage(tab.id, {
    action: 'updateState',
    enabled: extensionEnabled
  }).catch(() => {
    // Tab might not have content script loaded, ignore error
  });
  
  // Update badge based on current state
  updateBadge(tab.id);
}

function updateBadge(tabId, intercomDetected = false) {
  if (extensionEnabled && intercomDetected) {
    // Show red exclamation mark when intercom is detected and blocked
    browser.browserAction.setBadgeText({
      text: '!',
      tabId: tabId
    });
    browser.browserAction.setBadgeBackgroundColor({
      color: '#ff4444',
      tabId: tabId
    });
    browser.browserAction.setTitle({
      title: 'Intercom detected and blocked - Click to toggle',
      tabId: tabId
    });
  } else if (!extensionEnabled) {
    // Show disabled state with red orb badge
    browser.browserAction.setBadgeText({
      text: '●',
      tabId: tabId
    });
    browser.browserAction.setBadgeBackgroundColor({
      color: '#ff4444',
      tabId: tabId
    });
    browser.browserAction.setTitle({
      title: 'Intercom blocking disabled - Click to enable',
      tabId: tabId
    });
  } else {
    // Clear badge when no intercom or extension disabled
    browser.browserAction.setBadgeText({
      text: '',
      tabId: tabId
    });
    browser.browserAction.setTitle({
      title: 'Hide Intercom Messenger - Click to toggle',
      tabId: tabId
    });
  }
}

// Update browser action icon based on system theme
function updateIcon() {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const iconFile = isDark ? 'logo-white.png' : 'logo.png';
  browser.browserAction.setIcon({ path: { 16: iconFile, 32: iconFile, 48: iconFile, 128: iconFile } });
}

// Initialize icon and listen for theme changes
updateIcon();
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addListener(updateIcon);
}

// Listen for messages from content scripts and popup
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'intercomDetected') {
    updateBadge(sender.tab.id, true);
  } else if (message.action === 'getState') {
    return Promise.resolve({ enabled: extensionEnabled });
  } else if (message.action === 'toggleExtension') {
    extensionEnabled = message.enabled;
    browser.storage.local.set({ extensionEnabled: extensionEnabled });
    
    if (message.tabId) {
      browser.tabs.get(message.tabId).then((tab) => {
        updateTab(tab);
      });
    }
    updateAllTabs();
  }
});

// Update badge when switching tabs
browser.tabs.onActivated.addListener((activeInfo) => {
  browser.tabs.get(activeInfo.tabId).then((tab) => {
    updateTab(tab);
  });
});

// Clear badge when tab is updated/reloaded
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    updateBadge(tabId, false);
  }
});
