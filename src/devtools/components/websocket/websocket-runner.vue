<template>
  <el-col
    class="area-theen-second scroll-list"
    :xs="24" :sm="16">
    <!-- <el-tabs type="card">
      <el-tab-pane :label="'New Tab'" closable>

      </el-tab-pane>
      <el-tab-pane :label="'+'" disabled></el-tab-pane>
    </el-tabs> -->
    <div class="panel-theen-light border-bottom">
      <WebSocketServer />
    </div>

    <!-- Send Request -->
    <div class="panel-theen">
        <el-button v-if="socketState === 1"
          @click="sendMessage()"
          type="primary"
          icon="el-icon-caret-right"
          size="small">Send
        </el-button>
        <el-button v-else
          disabled
          type="info"
          icon="el-icon-caret-right"
          size="small">Send
        </el-button>
    </div>
    <div class="panel-theen-light">
      <strong class="text-theen">Request:</strong>
      <codemirror v-model="wsRequestMessage">
      </codemirror>
    </div>

    <!-- Parse Response -->
    <div v-if="wsResponseMessage.trim()"
      class="panel-theen-light">
      <strong class="text-theen">Response:</strong>
      <JsonTree :raw="jsonTreeData" :level="0"></JsonTree>
      <el-tooltip
        :content="!copySucceeded ? 'Click to copy' : 'Copied!'"
        class="item" effect="dark" placement="top">
        <div
          v-clipboard:copy="wsResponseMessage"
          v-clipboard:success="handleCopyStatus"
          class="panel-theen clickable">
          <span class="text-grey" v-html="wsResponseMessage"></span>
        </div>
      </el-tooltip>
    </div>
  </el-col>
</template>

<script>
  import { mapGetters } from 'vuex'

  import JsonTree from 'vue-json-tree'
  import WebSocketServer from './websocket-servers'

  export default {
    data: () => ({
      wsRequestMessage: `
`,
      wsResponseMessage: `
`,
      copySucceeded: null
    }),
    computed: {
      jsonTreeData: function () {
        try {
          let parseData = this.wsResponseMessage
          if (typeof this.wsResponseMessage === 'string') {
            parseData = JSON.parse(this.wsResponseMessage)
          }
          for (let key in parseData) {
            if (parseData.hasOwnProperty(key) &&
                typeof parseData[key] === 'string') {
              try {
                parseData[key] = JSON.parse(parseData[key])
              } catch (e) {
                //
              }
            }
          }
          return JSON.stringify(parseData)
        } catch (e) {
          return ''
        }
      },
      ...mapGetters({
        websocket: 'websocket',
        socketState: 'socketState'
      })
    },
    watch: {
      websocket: function (val) {
        if (val) {
          this.websocket.onmessage = (m) => this.handleMessage(m.data)
        }
      },
      copySucceeded: function (val) {
        if (val) {
          setTimeout(() => {
            this.copySucceeded = false
          }, 1000)
        }
      }
    },
    methods: {
      sendMessage () {
        if (this.websocket && this.wsRequestMessage) {
          this.websocket.send(this.wsRequestMessage)
        }
      },
      handleMessage (message) {
        this.wsResponseMessage = message
      },
      handleCopyStatus () {
        this.copySucceeded = true
      }
    },
    components: {
      JsonTree,
      WebSocketServer
    }
  }
</script>

<style lang="scss" scoped>
  .area-theen-second * {
    font-family: 'Source Code Pro', sans-seri
  }
</style>