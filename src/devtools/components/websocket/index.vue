<template>
  <el-row>
    <WebsocketConfig />
    <WebsocketRunner />
  </el-row>
</template>

<script>
  import WebsocketConfig from './websocket-config'
  import WebsocketRunner from './websocket-runner'

  export default {
    components: {
      WebsocketConfig,
      WebsocketRunner
    }
  }
</script>
