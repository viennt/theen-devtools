<template lang="html">
  <div class="md-layout">
    <WebsocketConfig />
    <WebsocketRunner />
  </div>
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
