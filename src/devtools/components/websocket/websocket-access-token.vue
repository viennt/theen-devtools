<template>
  <el-row :gutter="5">
    <el-col :xs="6" :sm="6">
      <el-select v-model="server" placeholder="Server">
        <el-option
          v-for="item in serverOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col v-if="!accessToken" :xs="18" :sm="18">
      <el-row :gutter="5">
        <el-col :xs="10" :sm="10">
          <el-input
            placeholder="Username"
            v-model="username" clearable>
          </el-input>
        </el-col>
        <el-col :xs="8" :sm="8">
          <el-input
            placeholder="Password" type="password"
            v-model="password" clearable>
          </el-input>
        </el-col>
        <el-col :xs="6" :sm="6">
          <el-tooltip
            class="item"
            effect="dark"
            content="Login and Get Access Token"
            placement="bottom-end">
            <el-button plain
              @click="doLogin()"
              :style="{width: '100%'}"
              icon="el-icon-d-arrow-right"
              type="primary">
            </el-button>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-col>
    <el-col v-else :xs="18" :sm="18">
      <el-row :gutter="5">
        <el-col :xs="12" :sm="12">
          <el-input
            placeholder="Access Token"
            v-model="accessToken">
          </el-input>
        </el-col>
        <el-col :xs="6" :sm="6">
          <el-tooltip
            class="item"
            effect="dark"
            content="Inject Access Token to Request"
            placement="bottom-end">
            <el-button plain
              @click="openLogin()"
              :style="{width: '100%'}"
              icon="el-icon-arrow-down"
              type="info">
            </el-button>
          </el-tooltip>
        </el-col>
        <el-col :xs="6" :sm="6">
          <el-tooltip
            class="item"
            effect="dark"
            content="Back to Login Form"
            placement="bottom-end">
            <el-button plain
              @click="openLogin()"
              :style="{width: '100%'}"
              icon="el-icon-d-arrow-left"
              type="info">
            </el-button>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import md5 from 'js-md5'
  import { getEnvConfig } from '../../tools/backend/index'

  export default {
    data: () => ({
      serverOptions: [
        {value: 'DEV', label: 'Dev'},
        {value: 'QA', label: 'QA'},
        {value: 'UAT', label: 'Uat'},
        {value: 'LIVE', label: 'Live'}
      ],
      server: null,
      username: null,
      password: null,
      accessToken: null,
      websocket: null
    }),
    methods: {
      doLogin () {
        this.storeCredentials()
        this.getAccessToken(this.server, this.username, this.password)
      },
      openLogin () {
        this.accessToken = null
        this.websocket = new WebSocket(getEnvConfig(this.server))
      },
      storeCredentials () {
        let options = {
          server: this.server,
          username: this.username,
          password: this.password
        }
        chrome.storage.sync.set({'theenOptions': options})
      },
      storeAccessToken () {
        let options = {
          accessToken: this.accessToken
        }
        chrome.storage.sync.set({'theenOptions': options})
      },
      getAccessToken (server, username, password) {
        this.websocket.onmessage = (message) => {
          try {
            let content = JSON.parse(message.data)
            content.data = JSON.parse(content.data)
            if (content.messageType === 'REQUEST_ERROR') {
              this.$message.error(content.data.message)
            } else {
              this.accessToken = content.data.accessToken.accessToken
              this.storeAccessToken()
              this.websocket.close()
              this.$message.success('Login successfull!')
            }
          } catch (e) {
            this.accessToken = null
          }
        }
        this.websocket.onerror = (error) => { console.error(error) }
        this.websocket.onclose = () => {}
        this.websocket.send(JSON.stringify({
          messageType: 'USER_LOGIN',
          data: JSON.stringify({username: username, password: md5(password), latitude: 0, longitude: 0})
        }))
      }
    },
    watch: {
      server: function (val) {
        this.websocket = new WebSocket(getEnvConfig(val))
      }
    },
    mounted () {
      chrome.storage.sync.get(['theenOptions'], (result) => {
        this.server = (!!result.theenOptions && result.theenOptions.server) || 'DEV'
        this.username = (result.theenOptions && result.theenOptions.username) || 'city.boston'
        this.password = (result.theenOptions && result.theenOptions.password) || 'password@2017'
        this.accessToken = (result.theenOptions && result.theenOptions.accessToken) || null
        this.websocket = new WebSocket(getEnvConfig(this.server))
      })
    }
  }
</script>
