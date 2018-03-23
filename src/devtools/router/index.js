import Vue from 'vue'
import Router from 'vue-router'
import logs from '../components/logs/index'
import websocket from '../components/websocket/index'
import jsonParser from '../components/json-parser/index'

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
    }
  ]
})
