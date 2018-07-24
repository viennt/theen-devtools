<template>
  <el-row>
    <LogsList />
    <LogsDetail />
  </el-row>
</template>

<script>
  import LogsList from '../../components/LogsList'
  import LogsDetail from '../../components/LogsDetail'

  export default {
    components: {
      LogsList,
      LogsDetail
    }
  }
</script>
