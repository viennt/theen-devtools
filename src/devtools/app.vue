<template lang="pug">
  <el-container>
    <el-header>
      <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal" :router="true">

        <el-tooltip class="item" effect="dark" content="Open Logs" placement="bottom-start">
          <el-menu-item index="logs">
            <i class="el-icon-time"></i> <span v-if="windowWidth >= 600">Logs</span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="Open Websocket" placement="bottom-start">
          <el-menu-item index="websocket">
            <i class="el-icon-sort"></i> <span v-if="windowWidth >= 600">Websocket</span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="Refresh" placement="bottom-start">
          <el-button id="btn-refresh" type="primary" plain @click="clearLogs()">
            <i class="el-icon-refresh"></i> <span v-if="windowWidth >= 600">Refresh</span>
          </el-button>
        </el-tooltip>

      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
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
  @import "~element-ui/lib/theme-chalk/index.css";

  *, body {
    font-family: 'Roboto', sans-serif
  }
  body {
    margin: 0
  }

  .el-header {
    padding-left: 0;
    padding-right: 0;
  }
  .el-main {
    padding: 1px 0 0 0;
    margin: 0 0 -20px 0;
  }
  .el-menu .el-button {
    float: right;
    margin: 10px;
  }

  // Theen devtools custom
  .text-theen {
    color: #409EFF!important;
  }
  .text-grey {
    color: #4C4A48!important;
  }
  .panel-theen {
    background-color: #f5f5f5;
    border-radius: 2px;
    padding: .2rem .4rem;
    word-break: break-word;
    line-height: 1.3;
  }
  .area-theen-first {
    height: calc((100vh - 60px) * (1 / 3));
  }
  @media (min-width: 768px) {
    .area-theen-first {
      height: calc(100vh - 60px);
    }
  }
  .area-theen-second {
    height: calc((100vh - 60px) * (2 / 3));
    border-top: 2px solid #409EFF;
    border-left: none;
  }
  @media (min-width: 768px) {
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
