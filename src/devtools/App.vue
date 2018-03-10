<template lang="pug">
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-accent" md-elevation="1">
        <h3 class="md-title text-theen" style="flex: 1">Theen Devtools</h3>
        <md-button class="text-theen" :to="{ name: 'logs' }">Logs</md-button>
        <md-button class="text-theen" :to="{ name: 'websocket' }">Websocket</md-button>
        <md-button class="text-theen">Refresh</md-button>
      </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .text-theen {
    color: #DA272A!important;
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
</style>
