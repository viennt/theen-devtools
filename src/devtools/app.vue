<template>
  <el-container>
    <el-header>
      <HeaderMenu />
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import HeaderMenu from './components/HeaderMenu'

  export default {
    name: 'App',
    components: {
      HeaderMenu
    }
  }
</script>
