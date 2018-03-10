import Vue from 'vue'
import Router from 'vue-router'
import Logs from '../components/Logs'
import Websocket from '../components/Websocket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'logs',
      component: Logs
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: Websocket
    }
  ]
})
