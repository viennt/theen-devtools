<template>
  <el-col
    class="area-theen-first text-selection-disabled scroll-list"
    :xs="24" :sm="12" ref="scrollList">
      <div class="panel-theen">
        <WebSocketAccessToken />
      </div>
      <div class="panel-theen">
        <codemirror v-model="code"></codemirror>
      </div>
  </el-col>
</template>

<script>
  import WebSocketAccessToken from './websocket-access-token'

  export default {
    data: () => ({
      //
    }),
    components: {
      WebSocketAccessToken
    }
  }
</script>
