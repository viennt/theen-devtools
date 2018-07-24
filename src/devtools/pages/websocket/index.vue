<template>
  <el-row>
    <WebsocketHistory />
    <WebsocketRunner />
  </el-row>
</template>

<script>
  import WebsocketHistory from '../../components/WebsocketHistory'
  import WebsocketRunner from '../../components/WebsocketRunner'

  export default {
    components: {
      WebsocketHistory,
      WebsocketRunner
    }
  }
</script>
