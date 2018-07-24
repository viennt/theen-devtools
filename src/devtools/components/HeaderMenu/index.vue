<template>
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
      <el-menu-item index="logs" :route="{name:'logs'}">
        <i class="el-icon-time"></i>
        <span class="hidden-xs-only">Logs</span>
      </el-menu-item>
    </el-tooltip>

    <el-tooltip
      :disabled="!isMobile"
      class="item"
      effect="dark"
      content="Websocket"
      placement="bottom">
      <el-menu-item index="websocket" :route="{name:'websocket'}">
        <i class="el-icon-sort"></i>
        <span class="hidden-xs-only">Websocket</span>
      </el-menu-item>
    </el-tooltip>

    <el-tooltip
      :disabled="!isMobile"
      class="item"
      effect="dark"
      content="JSON Parser"
      placement="bottom">
      <el-menu-item index="jsonParser" :route="{name:'jsonParser'}">
        <i class="el-icon-news"></i>
        <span class="hidden-xs-only">JSON Parser</span>
      </el-menu-item>
    </el-tooltip>

    <el-tooltip
      :disabled="!isMobile"
      class="item"
      effect="dark"
      content="Settings"
      placement="bottom">
      <el-menu-item index="settings-log" :route="{name:'settings-log'}">
        <i class="el-icon-setting"></i>
        <span class="hidden-xs-only">Settings</span>
      </el-menu-item>
    </el-tooltip>

    <el-button
      @click="refresh()">
      <i class="el-icon-refresh"></i>
      <span class="hidden-xs-only">Refresh</span>
    </el-button>

  </el-menu>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data: () => ({
      windowWidth: 0
    }),
    computed: {
      isMobile () {
        return this.windowWidth < 768
      }
    },
    methods: {
      refresh () {
        if (this.$route.name === 'logs') {
          this.clearLogs()
        }
        if (this.$route.name === 'websocket') {
          this.clearRequests()
        }
      },
      ...mapActions([
        'clearLogs',
        'clearRequests'
      ])
    },
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

<style lang="scss" scoped>
</style>
