<template>
  <el-row :gutter="5">
    <!-- Select server -->
    <el-col :xs="6" :sm="6">
      <el-select
        v-model="server"
        placeholder="Server"
        size="small"
        @change="onChangeServer">
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
        allServers: 'allServers',
        serverOptions: 'allServers',
        selectedServer: 'selectedServer',
        selectedRequest: 'selectedRequest'
      })
    },
    methods: {
      connectWebsocket () {
        let ws = new WebSocket(this.server)
        this.setSocketState(0)
        ws.onopen = () => this.onOpenWebSocket()
        ws.onclose = () => this.onCloseWebSocket()
        this.setWebsocket(ws)
        // Check if server is new one, then add to server list
        let index = this.allServers.findIndex(
          server => server.value === this.server
        )
        if (index < 0) {
          this.addServer({name: this.server.split('?')[0], value: this.server})
        }
        this.selectServerByAddress(this.server)
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
      onChangeServer (serverValue) {
        this.selectRequest(undefined)
        this.selectServerByAddress(serverValue)
      },
      ...mapActions([
        'setWebsocket',
        'setSocketState',
        'addServer',
        'selectRequest',
        'selectServerByAddress'
      ])
    },
    watch: {
      server: function () {
        this.resetWebsocket()
      },
      selectedRequest: function (request) {
        if (request) {
          this.server = request.server.value
        }
      }
    },
    mounted () {
      if (this.selectedRequest && this.selectedRequest.server) {
        this.server = this.selectedRequest.server.value
      } else if (this.selectedServer) {
        this.server = this.selectedServer.value
      }
    }
  }
</script>
