function addClassByBrowser() {
  const agent = window.navigator.userAgent.toLowerCase();
  if (agent.indexOf('msie') !== -1 || agent.indexOf('rv:11.0') !== -1) {
    document.body.classList.add('msie');
  }
}

export function testIsIE() {
  return document.body.classList.contains('msie');
}

export function initializeBody() {
  addClassByBrowser();
}
