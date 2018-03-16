<template lang="pug">
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar md-elevation="1">
        <h3 class="md-title text-theen" style="flex: 1">Theen Devtools</h3>
        <md-button :class="{'md-icon-button': windowWidth < 600, 'md-primary': $route.name === 'logs'}" :to="{ name: 'logs' }">
          <md-icon>history</md-icon>
          <span class="md-xsmall-hide">Logs</span>
          <md-tooltip md-direction="bottom">Open Logs</md-tooltip> 
        </md-button>
        <md-button :class="{'md-icon-button': windowWidth < 600, 'md-primary': $route.name === 'websocket'}" :to="{ name: 'websocket' }">
          <md-icon>compare_arrows</md-icon>
          <span class="md-xsmall-hide">Websocket</span>
          <md-tooltip md-direction="bottom">Open Websocket</md-tooltip> 
        </md-button>
        <md-button :class="{'md-icon-button': windowWidth < 600}" @click="clearLogs()">
          <md-icon>refresh</md-icon>
          <span class="md-xsmall-hide">Refresh</span>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip> 
        </md-button>
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
    data: () => ({
      windowWidth: 0
    }),
    methods: mapActions([
      'clearLogs'
    ]),
    mounted () {
      this.$nextTick(() => {
        window.addEventListener('load', (e) => {
          this.windowWidth = window.innerWidth
        })
        window.addEventListener('resize', (e) => {
          this.windowWidth = window.innerWidth
        })
      })
    }
  }
</script>

<style lang="scss">
  *, body {font-family: 'Roboto', sans-serif}

  // Custom vuematerial color
  @import "~vue-material/dist/theme/engine";
  @include md-register-theme("default", (
    primary: #06aed4
  ));
  @import '~vue-material/dist/vue-material.min.css';
  @import "~vue-material/dist/theme/all";

  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
  }
  .md-toolbar {
    background: #ffffff !important;
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

  // Theen devtools custom
  .text-theen {
    color: #06aed4!important;
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
  .area-theen-first {
    height: calc((100vh - 60px) * (1 / 3));
  }
  @media (min-width: 960px) {
    .area-theen-first {
      height: calc(100vh - 60px);
    }
  }
  .area-theen-second {
    height: calc((100vh - 60px) * (2 / 3));
    border-top: 2px solid #00B7C3;
    border-left: none;
  }
  @media (min-width: 960px) {
    .area-theen-second {
      height: calc(100vh - 60px);
      border-top: none;
      border-left: 1px solid rgba(0,0,0,.12);
    }
  }

  .clickable {
    cursor: pointer;
  }

  .text-selection-disabled {
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }

  .json-tree-root {
    background-color: #f5f5f5!important;
    border-radius: 2px!important;
    font-size: 87.5%!important;
    padding: .2rem .4rem!important;
    line-height: 1.3!important;
    min-width: auto!important;
  }
  .json-tree-root * {
    font-family: 'Source Code Pro', sans-seri
  }

  .scroll-list {
    overflow-y: auto;

    &::-webkit-scrollbar-track {
      background-color: #F3F3F3;
      border-radius: 10px;
    }
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #F3F3F3;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #D9D9DE;
      -webkit-transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
      -moz-transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
      transition: display 250ms cubic-bezier(.2,.8,.5,1),top 0s linear 0s,left 250ms ease-in-out;
    }
  }
</style>
