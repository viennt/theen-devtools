<template>
  <el-row>
    <WebsocketHistory />
    <WebsocketRunner />
  </el-row>
</template>

<script>
  import WebsocketHistory from './websocket-history'
  import WebsocketRunner from './websocket-runner'

  export default {
    components: {
      WebsocketHistory,
      WebsocketRunner
    }
  }
</script>
