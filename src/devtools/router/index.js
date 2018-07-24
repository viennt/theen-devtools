import Vue from 'vue'
import Router from 'vue-router'
import logs from '../pages/logs'
import websocket from '../pages/websocket'
import jsonParser from '../pages/json-parser'
import settings from '../pages/settings'
import logSettings from '../pages/settings/log-settings.vue'
import serverSettings from '../pages/settings/server-settings.vue'
import advancedSettings from '../pages/settings/advanced-settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/logs'
    },
    {
      path: '/logs',
      name: 'logs',
      component: logs
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: websocket
    },
    {
      path: '/json-parser',
      name: 'jsonParser',
      component: jsonParser
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings,
      children: [
        {
          path: 'logs',
          name: 'settings-log',
          component: logSettings
        },
        {
          path: 'servers',
          name: 'settings-server',
          component: serverSettings
        },
        {
          path: 'advanced',
          name: 'settings-advanced',
          component: advancedSettings
        },
        {
          path: 'theen',
          name: 'settings-theen',
          component: advancedSettings
        }
      ]
    }
  ]
})
