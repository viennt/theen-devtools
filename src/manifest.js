
module.exports = {
  name: 'Theen Devtools',
  version: '1.2.2',
  description: 'Theen Devtools Chrome Extension',
  author: 'Vien (Vic) T. NGUYEN',
  manifest_version: 2,
  icons: { '16': 'icons/16.png', '128': 'icons/128.png' },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'cookies',
    'background',
    'contextMenus',
    'unlimitedStorage',
    'storage',
    'notifications',
    'identity',
    'identity.email'
  ],
  browser_action: {
    default_title: 'Theen Devtools'
    // default_popup: 'pages/popup.html'
  },
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [{
    js: [ 'js/inject.js' ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval' http://localhost:8098; object-src 'self'",
  web_accessible_resources: [ 'panel.html', 'js/content.js' ]
}
