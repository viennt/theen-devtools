<template>
  <el-menu
    class="height-100"
    :router="true"
    :default-active="$route.name">
    <el-menu-item index="settings-log" :route="{name:'settings-log'}">
      <span>Logs</span>
    </el-menu-item>
    <el-menu-item index="settings-server" :route="{name:'settings-server'}">
      <span>Servers</span>
    </el-menu-item>
    <el-menu-item index="settings-advanced" :route="{name:'settings-advanced'}">
      <span>Advanced</span>
    </el-menu-item>
    <el-menu-item index="settings-theen" :route="{name:'settings-theen'}">
      <span>Theen</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
</style>
