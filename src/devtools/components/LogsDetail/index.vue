<template>
  <el-col
    class="area-theen-second scroll-list"
    :xs="24" :sm="16" v-loading="isLoading">

    <div v-if="!isLoading">
      <div v-if="!!selectedLog"
        class="selection-black">
        <div style="font-size: 16px; word-wrap: break-word;">
          {{ selectedLog.title || 'Unknown Log' }}
        </div>

        <JsonTree :raw="selectedLogMessage" :level="0"></JsonTree>

        <el-tooltip v-if="!!selectedLog.moreData"
          :content="!copySucceeded ? 'Click to copy' : 'Copied!'"
          class="item" effect="dark" placement="top">
          <div
            v-clipboard:copy="slackMessageToCopy"
            v-clipboard:success="handleCopyStatus"
            class="panel-theen clickable">
            <template v-for="infor in selectedLog.moreData">
              <div :key="infor.name + 'line'">
                <strong class="text-theen">{{ infor.name || '-' }} </strong>
                <span class="text-grey" v-html="infor.value"></span>
              </div>
              <br :key="infor.name + 'break-line'"/>
            </template>
          </div>
        </el-tooltip>
      </div>

      <el-alert v-else
        title="Select a log to show detail"
        type="info"
        :closable="false"
        center>
      </el-alert>
    </div>

  </el-col>
</template>

<script>
  import { mapGetters } from 'vuex'

  import JsonTree from 'vue-json-tree'

  export default {
    data: () => ({
      isLoading: false,
      slackMessageToCopy: 'Nothing!',
      copySucceeded: null
    }),
    computed: {
      selectedLogMessage: function () {
        if (!!this.selectedLog && !!this.selectedLog.jsonTreeData) {
          return JSON.stringify(this.selectedLog.jsonTreeData)
        } else {
          return JSON.stringify({})
        }
      },
      ...mapGetters({
        selectedLog: 'selectedLog'
      })
    },
    watch: {
      selectedLog: function (log) {
        this.isLoading = true
        setTimeout(() => { this.isLoading = false }, 500)

        if (!log || !log.moreData) {
          return
        }
        this.slackMessageToCopy = ''
        for (var key in log.moreData) {
          if (!log.moreData.hasOwnProperty(key)) continue
          var infor = log.moreData[key]
          this.slackMessageToCopy += `${infor.name} ${infor.label}\n`
        }
        this.slackMessageToCopy = this.slackMessageToCopy.replace(new RegExp('<br><br>', 'g'), '\n')
        this.slackMessageToCopy = this.slackMessageToCopy.replace(new RegExp('<br>', 'g'), '\n')
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
      handleCopyStatus () {
        this.copySucceeded = true
      }
    },
    components: {
      JsonTree
    }
  }
</script>

<style lang="scss" scoped>
  .area-theen-second * {
    font-family: 'Source Code Pro', sans-seri
  }
  .area-theen-second .selection-black {
    padding: 8px 8px;
  }
</style>
