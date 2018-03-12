<template lang="pug">
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-accent" md-elevation="1">
        <h3 class="md-title text-theen" style="flex: 1">Theen Devtools</h3>
        <md-button class="text-theen" :to="{ name: 'logs' }">Logs</md-button>
        <md-button class="text-theen" :to="{ name: 'websocket' }">Websocket</md-button>
        <md-button class="text-theen" @click="clearLogs()">Refresh</md-button>
      </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'App',
    methods: mapActions([
      'clearLogs'
    ])
  }
</script>

<style>
  *, body {font-family: 'Source Code Pro', sans-serif!important;}
  .text-theen {
    color: #06aed4!important;
  }
  .text-grey {
    color: #424242!important;
  }
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
  }
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }
  .md-app-content {
    padding: 0;
  }
  .md-list-item-content {
    min-height: 2rem!important;
    color: #424242!important;
  }
  .json-tree-root {
    background-color: #f5f5f5!important;
    border-radius: 2px!important;
    font-size: 87.5%!important;
    padding: .2rem .4rem!important;
    line-height: 1.3!important;
    min-width: auto!important;
  }
</style>
