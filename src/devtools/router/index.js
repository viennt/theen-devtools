import Vue from 'vue'
import Router from 'vue-router'
import logs from '../pages/logs'
import websocket from '../pages/websocket'
import jsonParser from '../pages/json-parser'
import settings from '../pages/settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/logs'
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
      name: 'json-parser',
      component: jsonParser
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    }
  ]
})
