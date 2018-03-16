export const ENV = {
  DEV: 'ws://192.168.21.226:9000/message',
  LIVE: 'wss://api.freakick.com/message',
  QA: 'ws://113.160.225.76:8753/message',
  UAT: 'ws://113.160.225.76:8743/message'
}

export function getEnvConfig (env) {
  return ENV[env] +
    '?clientId=812741506391.apps.freakick.com' +
    '&clientSecret=85e2121c23db1f64a48670b2011ae0a1a03848213dfaf50df189862e559dd8d6'
}
