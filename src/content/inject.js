var content = chrome.extension.getURL('js/content.js')
var script = document.createElement('script')
script.setAttribute('type', 'text/javascript')
script.setAttribute('src', content)
document.body.appendChild(script)

// Get message from Angular Application
document.addEventListener('eJXWq60Ageoxz1lm0vzmsuR32chqrsbk5M8xWRXx', (data) => {
  // Send message to background script  (background.js)
  chrome.runtime.sendMessage(data.detail)
})
