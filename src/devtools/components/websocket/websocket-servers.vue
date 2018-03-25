<template>
  <el-row :gutter="5">
    <el-col :xs="6" :sm="6">
      <el-select
        v-model="server"
        placeholder="Server"
        size="small">
        <el-option
          v-for="item in serverOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :xs="13" :sm="13">
      <el-input
        size="small"
        placeholder="Server"
        v-model="server">
      </el-input>
    </el-col>
    <el-col :xs="5" :sm="5">
      <el-tooltip
        :content="true ? 'Connect' : 'Connected'"
        class="item" effect="dark"
        placement="bottom">
        <el-button
          @click="openLogin()"
          :style="{width: '100%'}"
          :type="true ? 'info' : 'primary'"
          icon="el-icon-sort"
          size="small">
        </el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script>
  import { getEnvConfig } from '../../tools/backend/index'

  export default {
    data: () => ({
      serverOptions: [
        {value: getEnvConfig('DEV'), label: 'Dev'},
        {value: getEnvConfig('QA'), label: 'QA'},
        {value: getEnvConfig('UAT'), label: 'Uat'},
        {value: getEnvConfig('LIVE'), label: 'Live'}
      ],
      server: null,
      websocket: null
    }),
    methods: {
      storeServer () {
        let options = {
          server: this.server
        }
        chrome.storage.sync.set({'theenOptions': options})
      }
    },
    watch: {
      server: function () {
        this.storeServer()
      }
    },
    mounted () {
      chrome.storage.sync.get(['theenOptions'], (result) => {
        this.server = (!!result.theenOptions && result.theenOptions.server) || 'DEV'
      })
    }
  }
</script>
