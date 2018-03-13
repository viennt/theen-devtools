<template lang="pug">
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar md-elevation="1">
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

<style lang="scss">
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("default", (
    primary: #00B7C3
  ));

  @import '~vue-material/dist/vue-material.min.css';
  @import "~vue-material/dist/theme/all";

  *, body {font-family: 'Source Code Pro', sans-serif}
  .text-theen {
    color: #00B7C3!important;
  }
  .text-grey {
    color: #4C4A48!important;
  }

  .panel-theen {
    background-color: #f5f5f5;
    border-radius: 2px;
    font-size: 87.5%;
    padding: .2rem .4rem;
    word-break: break-word;
    line-height: 1.3;
  }

  .clickable {
    cursor: pointer;
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
  .md-app-content .md-card {
    margin: 0;
    box-shadow: none;
  }
  .md-list-item-content {
    min-height: 2rem!important;
    color: #424242!important;
  }
  .md-card-content {
    padding: .5rem!important;
  }

  .json-tree-root {
    background-color: #f5f5f5!important;
    border-radius: 2px!important;
    font-size: 87.5%!important;
    padding: .2rem .4rem!important;
    line-height: 1.3!important;
    min-width: auto!important;
  }

  .scroll-list-bar::-webkit-scrollbar-track {
    background-color: #F3F3F3;
    border-radius: 10px;
  }
  .scroll-list-bar::-webkit-scrollbar {
    width: 10px;
    background-color: #F3F3F3;
  }
  .scroll-list-bar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #D9D9DE;
    -webkit-transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
    -moz-transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
    transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
  }
</style>
