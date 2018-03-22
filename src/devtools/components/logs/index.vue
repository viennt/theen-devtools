<template lang="pug">
  <el-row :gutter="10">
    <LogsList />
    <LogsDetail />
  </el-row>
</template>

<script>
  import LogsList from './logs-list'
  import LogsDetail from './logs-detail'

  export default {
    components: {
      LogsList,
      LogsDetail
    }
  }
</script>
