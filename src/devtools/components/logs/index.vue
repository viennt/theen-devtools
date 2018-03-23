<template>
  <el-row>
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
