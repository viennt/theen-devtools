<template>
  <el-row :gutter="5">
    <!-- Select server -->
    <el-col :xs="6" :sm="6">
      <el-select
        v-model="server"
        placeholder="Server"
        size="small">
        <el-option
          v-for="item in serverOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>

    <!-- Input server -->
    <el-col :xs="13" :sm="13">
      <el-input
        size="small"
        placeholder="Server"
        v-model="server">
      </el-input>
    </el-col>

    <!-- Connect buttons -->
    <el-col :xs="5" :sm="5">
      <el-tooltip
        :content="(socketState === 1) ? 'Disconnect' : 'Connect'"
        class="item" effect="dark"
        placement="bottom">
        <el-button v-if="socketState === 3"
          @click="connectWebsocket()"
          :style="{width: '100%'}"
          type="info"
          icon="el-icon-sort"
          size="small">
        </el-button>
        <el-button v-else-if="socketState === 0"
          :style="{width: '100%'}"
          disabled
          type="info"
          icon="el-icon-loading"
          size="small">
        </el-button>
        <el-button v-else
          @click="disconnectWebsocket()"
          :style="{width: '100%'}"
          type="primary"
          icon="el-icon-sort"
          size="small">
        </el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: () => ({
      server: null
    }),
    computed: {
      ...mapGetters({
        websocket: 'websocket',
        socketState: 'socketState',
        serverOptions: 'allServers'
      })
    },
    methods: {
      storeServer () {
        let options = {
          server: this.server
        }
        chrome.storage.sync.set({'theenOptions': options})
      },
      connectWebsocket () {
        let ws = new WebSocket(this.server)
        this.setSocketState(0)
        ws.onopen = () => this.onOpenWebSocket()
        ws.onclose = () => this.onCloseWebSocket()
        this.setWebsocket(ws)
      },
      disconnectWebsocket () {
        if (this.websocket) {
          this.websocket.close()
        } else {
          this.setSocketState(3)
        }
      },
      resetWebsocket () {
        this.disconnectWebsocket()
        this.setWebsocket(null)
      },
      onOpenWebSocket () {
        this.setSocketState(1)
        this.$message({
          center: true,
          showClose: true,
          message: 'Websocket was connected.',
          type: 'success'
        })
      },
      onCloseWebSocket () {
        this.setSocketState(3)
        this.$message({
          center: true,
          showClose: true,
          message: 'Websocket was disconnected.',
          type: 'warning'
        })
      },
      ...mapActions([
        'setWebsocket',
        'setSocketState'
      ])
    },
    watch: {
      server: function () {
        this.storeServer()
        this.resetWebsocket()
      }
    },
    mounted () {
      chrome.storage.sync.get(['theenOptions'], (result) => {
        this.server = (!!result.theenOptions && result.theenOptions.server) || 'DEV'
      })
    }
  }
</script>
