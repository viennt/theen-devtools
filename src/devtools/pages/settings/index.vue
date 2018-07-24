<template>
  <el-container class="area-theen-full">
    <el-aside width="105px">
      <SettingAsideMenu />
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import SettingAsideMenu from '../../components/SettingAsideMenu'

  export default {
    components: {
      SettingAsideMenu
    }
  }
</script>
