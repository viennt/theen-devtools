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
          <el-button
            @click="doLogin()"
            icon="el-icon-d-arrow-right"
            type="primary"></el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col v-else :xs="18" :sm="18">
      <el-row :gutter="5">
        <el-col :xs="18" :sm="18">
          <el-input
            placeholder="Access Token"
            v-model="accessToken">
          </el-input>
        </el-col>
        <el-col :xs="6" :sm="6">
          <el-button
            @click="openLogin()"
            icon="el-icon-d-arrow-left"
            type="primary"></el-button>
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
        this.getAccessToken(this.server, this.username, this.password)
        this.storeCredentials(this.server, this.username, this.password)
      },
      openLogin () {
        this.accessToken = null
        this.websocket = new WebSocket(getEnvConfig(this.server))
      },
      storeCredentials (server, username, password) {
        let options = {
          server: server,
          username: username,
          password: password
        }
        chrome.storage.sync.set({'theenOptions': options})
      },
      storeAccessToken (accessToken) {
        let options = {
          accessToken: accessToken
        }
        chrome.storage.sync.set({'theenOptions': options})
      },
      getAccessToken (server, username, password) {
        this.websocket.onmessage = (message) => {
          try {
            let content = JSON.parse(message.data)
            this.accessToken = JSON.parse(content.data).accessToken.accessToken
          } catch (e) {
            this.accessToken = null
          }
          this.websocket.close()
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
      })
    }
  }
</script>
