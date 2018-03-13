import Vue from 'vue'
import Router from 'vue-router'
import logs from '../components/logs/index'
import Websocket from '../components/Websocket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logs',
      component: logs
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: Websocket
    }
  ]
})
