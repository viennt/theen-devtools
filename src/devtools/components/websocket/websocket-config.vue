<template>
  <el-col
    class="area-theen-first scroll-list"
    :xs="24" :sm="8" ref="scrollList">
      <div class="panel-theen-light border-bottom">
        <WebSocketServer />
      </div>
  </el-col>
</template>

<script>
  import WebSocketServer from './websocket-servers'

  export default {
    components: {
      WebSocketServer
    }
  }
</script>
