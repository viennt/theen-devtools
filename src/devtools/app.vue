<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        :default-active="$route.name">

        <el-tooltip
          :disabled="!isMobile"
          class="item"
          effect="dark"
          content="Logs"
          placement="bottom-start">
          <el-menu-item index="logs">
            <i class="el-icon-time"></i>
            <span class="hidden-xs-only">Logs</span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip
          :disabled="!isMobile"
          class="item"
          effect="dark"
          content="Websocket"
          placement="bottom-start">
          <el-menu-item index="websocket">
            <i class="el-icon-sort"></i>
            <span class="hidden-xs-only">Websocket</span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip
          :disabled="!isMobile"
          class="item"
          effect="dark"
          content="JSON Parser"
          placement="bottom-start">
          <el-menu-item index="json-parser">
            <i class="el-icon-news"></i>
            <span class="hidden-xs-only">JSON Parser</span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip
          :disabled="!isMobile"
          class="item"
          effect="dark"
          content="Settings"
          placement="bottom-start">
          <el-menu-item index="settings">
            <i class="el-icon-setting"></i>
            <span class="hidden-xs-only">Settings</span>
          </el-menu-item>
        </el-tooltip>

        <el-button
          @click="clearLogs()">
          <i class="el-icon-refresh"></i>
          <span class="hidden-xs-only">Refresh</span>
        </el-button>

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
    computed: {
      isMobile () {
        return this.windowWidth < 768
      }
    },
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
